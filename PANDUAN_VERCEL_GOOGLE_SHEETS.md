# Jalankan Jelajah Jurusan di Vercel + simpan ke Google Sheets

**Paket ini sudah berisi sistem arsip, kode pengiriman, dan Google Apps Script.** Kamu hanya perlu membuat Google Sheet, memasang Apps Script, dan mengisi dua *Environment Variables* di Vercel. URL Google Sheet, Web App, dan email tidak bisa otomatis diisi tanpa akses ke akunmu.

## 1. Buat Google Sheet dan pasang penerima

1. Buat Google Sheet baru, misalnya **Hasil Jelajah Jurusan**. Biarkan tabnya kosong.
2. Di Google Sheet pilih **Ekstensi → Apps Script**.
3. Hapus kode bawaannya lalu tempel SELURUH isi file `receiver/apps-script.gs`. Simpan.
4. Pilih **Project Settings** (ikon roda gigi) → **Script Properties** → **Add script property**:
   - `INGEST_SECRET` = kata sandi acak yang panjang (mis. hasil perintah di bawah).
   - **Opsional** `NOTIFY_EMAIL` = alamat emailmu jika ingin satu notifikasi ketika ada hasil BARU. Data lengkap tetap di Google Sheets.
5. Pilih **Deploy → New deployment → Select type → Web app**. Isi:
   - **Execute as:** Me (akunmu).
   - **Who has access:** Anyone (publik, agar Vercel bisa mengirim; *secret* tetap diperiksa).
6. Klik **Deploy** lalu **Authorize access**. Salin URL Web App yang berakhir `/exec`, misalnya `https://script.google.com/macros/s/AKfycb.../exec`.

Untuk membuat secret acak dengan Node.js, jalankan pada terminal laptop:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**PENTING:** Secret yang sama harus diisi di dua tempat (Script Properties dan Vercel). Jangan meletakkan secret di `index.html`, GitHub publik, atau mengirimkannya ke peserta.

## 2. Deploy ke Vercel

1. Ekstrak ZIP. Di dalam folder `jelajah-jurusan` terdapat `index.html`, folder `api`, folder `receiver`, dan README. **Deploy isi folder ini sebagai root proyek** (jangan root folder di luarnya).
2. Upload folder tersebut ke GitHub lalu pilih **Vercel → Add New → Project → Import Git Repository**. Atau gunakan Vercel CLI `vercel` dari folder `jelajah-jurusan`.
3. Pilih **Framework Preset: Other**. Tidak perlu `npm install`, framework, atau build command.
4. Di **Settings → Environment Variables** tambahkan:

   | Name | Value |
   |---|---|
   | `GOOGLE_SCRIPT_URL` | URL Web App Apps Script yang berakhir `/exec` |
   | `GOOGLE_SCRIPT_SECRET` | Secret **yang sama persis** dengan `INGEST_SECRET` |

   Pilih environment **Production** (dan Preview jika ingin uji lewat Preview).
5. **Redeploy** proyek setelah mengubah Environment Variables. Pengaturan env tidak otomatis berlaku pada deployment lama.

## 3. Uji sampai benar-benar masuk

1. Buka `https://DOMAIN-VERCELMU.vercel.app/api/status`. Harus tampil `{"ready":true}`. Jika `false`, cek dua environment variable dan redeploy.
2. Buka halaman utama situs. Sekarang kotak **Bantu penelitian (boleh tidak)** muncul.
3. Main sampai selesai, tekan tombol menuju hasil **Buka hasilku**. Pengiriman berjalan otomatis (tidak ada centang persetujuan lagi).
4. Di halaman akhir hasil akan muncul konfirmasi **Terkonfirmasi masuk ke Google Sheets** beserta kode `JJ-...`. Buka Google Sheet, tab **hasil**, dan periksa kolom-kolomnya.
5. Kalau belum masuk, pesan error tampil di aplikasi. Kamu bisa tekan **Kirim ulang**. Kalau Web App diubah, **Deploy → Manage deployments → Edit → New version → Deploy** untuk memperbarui URL aktif tanpa membuat deployment lain.
6. Jika `NOTIFY_EMAIL` diisi, periksa emailmu. Email hanya berisi ringkasan hasil; seluruh jawaban ada di Sheet.

## 4. Bagaimana hasil tetap tersimpan?

- **Selama menjawab:** progres disimpan otomatis di `localStorage` browser. Setelah membuka ulang situs di perangkat/browser yang sama, tersedia tombol **Lanjutkan permainan**.
- **Setelah selesai:** seluruh jawaban, hasil penilaian, hasil uji, dan tanda sudah dibaca disimpan sebagai satu arsip bernomor unik. Mulai lagi tidak menghapus hasil yang lama.
- **Di halaman awal:** bagian **Arsip hasil berlayar** berisi tombol **Lihat hasil** untuk membuka setiap permainan yang pernah diselesaikan, termasuk setelah kembali ke awal.
- **Backup:** pilih **Unduh backup semua hasil** untuk mendapatkan JSON yang dapat disimpan di Google Drive / laptop, dan **Pulihkan dari backup** untuk memasukkannya kembali (atau ke browser/perangkat lain). Di halaman akhir juga ada **Unduh hasil ini**.
- **Sinkronisasi lintas perangkat tidak otomatis:** hasil di Google Sheets adalah salinan untuk pemilik/penelitian; peserta belum punya login untuk membaca arsip pribadinya di perangkat lain. Untuk pindah perangkat gunakan ekspor-impor backup.
- Jika peserta membersihkan data situs, memakai private mode, atau mengganti browser, **arsip di browser dapat hilang**. Karena itu unduh backup. Jangan menyimpan backup publik; berkasnya berisi jawaban dan nama panggilan.

## 5. Privasi, biaya, dan keamanan

- Google Sheets **menerima setiap hasil yang selesai** (dikirim otomatis saat halaman hasil terbuka, tanpa centang persetujuan). Yang terkirim: seluruh jawaban, kode hasil acak, dan **nama panggilan** yang diisi pemain. Avatar, poin, checklist persiapan, dan riwayat tidak dikirim. Isian bebas tentang pekerjaan juga terkirim; hindari data pribadi di sana.
- Script menggunakan **secret server-to-server**. URL Apps Script dan secret disimpan di Vercel env; tidak ada secret di JavaScript browser. Secret hanya diuji Google Apps Script dan tidak ikut ditulis ke Sheet.
- Satu **kode JJ** ditulis sebagai satu baris. Jika pemain menambahkan feedback **Terasa pas?** setelah bermain, baris yang sama diperbarui.
- Endpoint Vercel tetap **publik** dan bisa menerima spam. Shared secret mencegah orang mengirim langsung ke Apps Script, tetapi tidak menggantikan *rate limiting*, CAPTCHA, dan pengawasan untuk trafik besar.
- Google Apps Script, Google Sheets, MailApp, dan Vercel punya batas kuota masing-masing. Email per hasil hanya direkomendasikan untuk jumlah peserta kecil. Jika ramai, lepas `NOTIFY_EMAIL` dan cukup pantau Sheet.
- Pengiriman otomatis berarti data terkumpul tanpa pemberitahuan ke pengisi. Kalau alat ini dipakai untuk responden di bawah umur, sesuaikan dengan aturan privasi/izin yang berlaku di sekolah atau instansi penyelenggara.

## 6. File yang berkaitan

| File | Kegunaan |
|---|---|
| `index.html` | Game dan antarmuka arsip / feedback / persetujuan |
| `api/status.js` | Memberi tahu apakah Google Sheets sudah dikonfigurasi |
| `api/results.js` | Penerima aman di Vercel, meneruskan hasil dan memverifikasi balasan |
| `receiver/apps-script.gs` | Menulis / memperbarui hasil di Google Sheets (termasuk kolom nama panggilan), email opsional |
| `PANDUAN_VERCEL_GOOGLE_SHEETS.md` | Instruksi pemasangan ini |

**Catatan tentang backend:** File `/api/*.js` tidak bekerja kalau `index.html` dibuka langsung dari komputer; backend aktif saat aplikasi dideploy ke Vercel.
