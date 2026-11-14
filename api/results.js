/**
 * Vercel serverless -> Google Apps Script (konfirmasi nyata via JSON).
 * Rahasia tidak pernah dikirim ke browser. Pengguna wajib memberi izin pada UI.
 */
const MAX_BYTES = 80000;
const ALLOWED_HOST = 'script.google.com';
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ok:false,error:'Method not allowed'});
  }
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.GOOGLE_SCRIPT_SECRET;
  if (!scriptUrl || !secret) return res.status(503).json({ok:false,error:'Penerima Google Sheets belum dikonfigurasi.'});
  try {
    const url = new URL(scriptUrl);
    if (url.protocol !== 'https:' || url.hostname !== ALLOWED_HOST || !/^\/macros\/s\/[^/]+\/exec$/.test(url.pathname)) {
      return res.status(500).json({ok:false,error:'GOOGLE_SCRIPT_URL harus URL Web App /exec Google Apps Script.'});
    }
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!data || typeof data !== 'object' || Array.isArray(data)) return res.status(400).json({ok:false,error:'Body JSON tidak valid.'});
    const bytes = Buffer.byteLength(JSON.stringify(data));
    if (bytes > MAX_BYTES) return res.status(413).json({ok:false,error:'Hasil terlalu besar.'});
    if (data.app !== 'jelajah-jurusan' || typeof data.sid !== 'string' || !/^JJ-[0-9A-F]{12,32}$/.test(data.sid)
      || !Array.isArray(data.rank) || data.rank.length !== 22
      || !data.ans || typeof data.ans !== 'object' || typeof data.t !== 'string') {
      return res.status(400).json({ok:false,error:'Format hasil tidak sesuai.'});
    }
    // Apps Script tidak konsisten mengizinkan POST application/json; kirim sebagai teks JSON.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    let upstream;
    try {
      upstream = await fetch(scriptUrl, {
        method:'POST', redirect:'follow', signal:controller.signal,
        headers:{'Content-Type':'text/plain;charset=utf-8'},
        body: JSON.stringify({...data,auth:secret})
      });
    } finally { clearTimeout(timeout); }
    if (!upstream.ok) throw new Error('Google Apps Script HTTP ' + upstream.status);
    const text = await upstream.text();
    let reply; try { reply = JSON.parse(text); } catch (_) { throw new Error('Apps Script tidak membalas JSON. Periksa deployment /exec.'); }
    if (reply.ok !== true || reply.sid !== data.sid) throw new Error(reply.error || 'Google Sheets tidak mengonfirmasi penerimaan.');
    return res.status(200).json({ok:true,sid:data.sid,updated:!!reply.updated});
  } catch (err) {
    const reason = err && err.name === 'AbortError' ? 'Google Apps Script timeout; periksa Sheet sebelum mengirim ulang.' : 'Pengiriman gagal: '+(err.message||'tidak diketahui');
    // Tidak mengirim detail URL atau secret dalam pesan error.
    return res.status(502).json({ok:false,error:reason.slice(0,200)});
  }
};
