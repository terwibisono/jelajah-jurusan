/**
 * GET /api/stats?k=<STATS_KEY> — ringkasan kunjungan + funnel untuk dashboard pribadi.
 * Sumber: tab "kunjungan" (kejadian) dan "hasil" (hasil terkirim) di Google Sheets.
 */
const WIB = 7 * 3600 * 1000;
const dayWIB = (v) => {
  const d = v instanceof Date ? v : new Date(v);
  if (isNaN(d)) return '';
  return new Date(d.getTime() + WIB).toISOString().slice(0, 10);
};
const num = (v) => { const n = Number(v); return isFinite(n) ? n : 0; };

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const key = String((req.query && req.query.k) || '');
  const want = process.env.STATS_KEY || '';
  if (!want || key !== want) return res.status(403).json({ ok: false, error: 'Kunci dashboard salah.' });

  const scriptUrl = process.env.HIT_SCRIPT_URL;
  const secret = process.env.HIT_SECRET;
  if (!scriptUrl || !secret) return res.status(503).json({ ok: false, error: 'Penerima Sheets belum dikonfigurasi.' });

  let data;
  try {
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), 25000);
    const r = await fetch(`${scriptUrl}?data=1&token=${encodeURIComponent(secret)}`, { signal: ctl.signal, redirect: 'follow' });
    clearTimeout(to);
    data = await r.json();
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'Gagal membaca Sheets: ' + e.message });
  }
  if (!data || data.ok !== true) return res.status(502).json({ ok: false, error: (data && data.error) || 'Balasan Sheets tidak valid.' });

  const hits = Array.isArray(data.hits) ? data.hits : [];

  // Baris hasil diambil dari penerima utama (tab "hasil") karena di situ ada kolom "nama".
  // Kalau gagal, pakai paket lama dari penerima kunjungan (tanpa nama) supaya dasbor tetap jalan.
  let allRows = Array.isArray(data.hasil) ? data.hasil : [];
  const hasilUrl = process.env.GOOGLE_SCRIPT_URL;
  const hasilSecret = process.env.GOOGLE_SCRIPT_SECRET;
  if (hasilUrl && hasilSecret) {
    try {
      const ctl2 = new AbortController();
      const to2 = setTimeout(() => ctl2.abort(), 20000);
      const r2 = await fetch(`${hasilUrl}?data=1&token=${encodeURIComponent(hasilSecret)}`, { signal: ctl2.signal, redirect: 'follow' });
      clearTimeout(to2);
      const d2 = await r2.json();
      if (d2 && d2.ok === true && Array.isArray(d2.hasil)) allRows = d2.hasil;
    } catch (e) { /* pakai data.hasil dari penerima kunjungan */ }
  }
  // Hanya hitung hasil yang masuk sejak pelacakan dipasang, supaya pembandingnya setara.
  let sinceMs = null;
  for (const h of hits) {
    const t = new Date(h[0]).getTime();
    if (!isNaN(t) && (sinceMs === null || t < sinceMs)) sinceMs = t;
  }
  if (sinceMs !== null) sinceMs -= 60000;
  const rows = sinceMs === null ? [] : allRows.filter((r) => {
    const t = new Date(r[0]).getTime();
    return !isNaN(t) && t >= sinceMs;
  });

  const vidMaxB = new Map();
  const vidEvents = new Map();
  let bukaTotal = 0;
  const bukaDay = new Map();
  const kirimVid = new Set();
  const hasilVid = new Set();
  let maxTotal = 0;

  for (const h of hits) {
    const [waktu, vid, ev, babak, total] = h;
    if (!vid) continue;
    const b = num(babak), t = num(total);
    if (t > maxTotal) maxTotal = t;
    if (ev === 'buka') {
      bukaTotal++;
      const d = dayWIB(waktu);
      if (d) bukaDay.set(d, (bukaDay.get(d) || 0) + 1);
    }
    if (ev === 'babak' && b > (vidMaxB.get(vid) || 0)) vidMaxB.set(vid, b);
    if (ev === 'hasil') hasilVid.add(vid);
    if (ev === 'kirim') kirimVid.add(vid);
    if (!vidEvents.has(vid)) vidEvents.set(vid, new Set());
    vidEvents.get(vid).add(ev);
  }

  const visitors = new Set([...vidMaxB.keys(), ...vidEvents.keys()]).size;
  const total = maxTotal || 14;
  const reached = (n) => [...vidMaxB.values()].filter((b) => b >= n).length;

  const stages = [
    ['Buka halaman', visitors],
    ['Lewat halaman kartu', Math.max(reached(2), hasilVid.size)],
    ['Lewat separuh jalan', Math.max(reached(Math.round(total / 2)), hasilVid.size)],
    ['Sampai halaman hasil', Math.max(reached(total), hasilVid.size)],
    ['Hasil terkirim ke Sheets', rows.length],
  ];
  const top = stages[0][1] || 1;
  const funnel = stages.map(([label, n]) => ({ label, n, pct: Math.round((n / top) * 1000) / 10 }));

  const hasilDay = new Map();
  const top1 = new Map();
  for (const r of rows) {
    const d = dayWIB(r[0]);
    if (d) hasilDay.set(d, (hasilDay.get(d) || 0) + 1);
    const t1 = String(r[2] || '').trim();
    if (t1) top1.set(t1, (top1.get(t1) || 0) + 1);
  }
  const days = new Set([...bukaDay.keys(), ...hasilDay.keys()]);
  const daily = [...days].sort().map((d) => ({ d, buka: bukaDay.get(d) || 0, hasil: hasilDay.get(d) || 0 }));

  const recent = rows
    .map((r) => ({ t: r[0], kode: r[1], top1: r[2], top2: r[3], top3: r[4], conf: num(r[5]), nama: String(r[8] || '').trim().slice(0, 40) }))
    .sort((a, b) => new Date(b.t) - new Date(a.t))
    .slice(0, 30);

  return res.status(200).json({
    ok: true,
    ts: new Date().toISOString(),
    total: {
      visitors,
      buka: bukaTotal,
      mulai: Math.max(reached(2), hasilVid.size),
      hasil: rows.length,
      kirim: rows.length,
      hasilTotal: allRows.length,
      konversi: visitors ? Math.round((rows.length / visitors) * 1000) / 10 : 0,
    },
    funnel,
    daily,
    top1: [...top1.entries()].map(([name, n]) => ({ name, n })).sort((a, b) => b.n - a.n).slice(0, 12),
    recent,
  });
};
