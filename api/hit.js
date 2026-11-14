/**
 * POST /api/hit — pencatat kunjungan & progres ringan ke Google Sheets (tab "kunjungan").
 * Tidak menyimpan nama/IP; hanya id perangkat acak, jenis kejadian, dan babak.
 */
const ALLOWED = new Set(['buka', 'babak', 'hasil', 'kirim']);

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }
  const scriptUrl = process.env.HIT_SCRIPT_URL;
  const secret = process.env.HIT_SECRET;
  if (!scriptUrl || !secret) return res.status(204).end();

  let d = req.body;
  if (typeof d === 'string') { try { d = JSON.parse(d); } catch (e) { return res.status(400).json({ ok: false }); } }
  if (!d || typeof d !== 'object') return res.status(400).json({ ok: false });
  if (d.app !== 'jelajah-jurusan') return res.status(400).json({ ok: false });
  const ev = String(d.e || '');
  if (!ALLOWED.has(ev)) return res.status(400).json({ ok: false });
  const vid = String(d.v || '');
  if (!/^V-[0-9a-z]{6,20}$/i.test(vid)) return res.status(400).json({ ok: false });

  const body = {
    kind: 'hit',
    app: 'jelajah-jurusan',
    auth: secret,
    vid,
    e: ev,
    b: Math.max(0, Math.min(99, Number(d.b) || 0)),
    t: Math.max(0, Math.min(99, Number(d.t) || 0)),
    ver: String(d.ver || '').slice(0, 40),
    r: String(d.r || '').slice(0, 140),
    ua: String(req.headers['user-agent'] || '').slice(0, 160),
    t0: new Date().toISOString(),
  };

  try {
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), 8000);
    await fetch(scriptUrl, {
      method: 'POST',
      redirect: 'follow',
      signal: ctl.signal,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
    }).finally(() => clearTimeout(to));
  } catch (e) {
    return res.status(204).end();
  }
  return res.status(204).end();
};
