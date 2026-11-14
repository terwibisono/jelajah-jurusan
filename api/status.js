/** Cek apakah penerima hasil sudah dikonfigurasi di Vercel. Tidak membocorkan URL ataupun rahasia. */
module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ready:false,error:'Method not allowed'});
  }
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ready: Boolean(process.env.GOOGLE_SCRIPT_URL && process.env.GOOGLE_SCRIPT_SECRET)});
};
