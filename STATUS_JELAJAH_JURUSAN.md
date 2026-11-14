# Status terakhir — Jelajah Jurusan

Tanggal: 14 November 2026 (pagi — kirim otomatis sudah live)

## Kirim otomatis ke Sheets + nama ikut (14 Nov 2026, 13:40 WIB)
- Centang "Bantu penelitian" **dihapus**. Setiap hasil yang selesai (tombol menuju hasil ditekan) langsung dikirim ke `/api/results`; kalau gagal ada tombol "Kirim ulang" dan percobaan ulang saat online.
- Payload sekarang membawa `nama` (nama panggilan, maks 20 huruf) dan `ver` jadi `2026-11-14-autokirim`. Teks di halaman awal tidak lagi menyebut anonim: hanya "Hasil otomatis dikirim… untuk mengecek apakah alat ini tepat".
- Apps Script **sudah di-deploy ulang sebagai Version 5** (14 Nov 2026, 13:43 WIB) lewat editor Apps Script; deployment ID & URL web app tetap sama. Kolom **`nama`** kini jadi kolom ke-23 di tab `hasil` dan terisi otomatis.
- Verifikasi ujung-ke-ujung: hasil uji ditulis ke baris terakhir dengan `nama = UJI-EDITH-2`, header tab `hasil` ikut bertambah jadi 23 kolom. Dua baris uji (`JJ-12EF6E86F7AF77F6`, `JJ-C243A74F1AD481C5`) sudah dihapus lagi; saat ini 18 baris hasil asli.
- Baris lama (sebelum Version 5) kolom `nama`-nya kosong dan namanya **tidak ada** di payload lama (`json lengkap` juga tidak memuat nama), jadi di dasbor tampil `–`.
- Dasbor: kolom **Nama** sudah tampil di tabel "Hasil terbaru" (14 Nov). Ditopang `doGet(?data=1)` di penerima hasil (deployment **Version 7**) + `api/stats.js` mengambil baris hasil dari penerima utama. Uji: kiriman `TRI-UJI` tampil di dasbor, baris ujinya dihapus lagi (18 baris bersih).
- Label `ver` di tab `kunjungan` diperbaiki dari `2026-11-13-malam` (hardcoded) menjadi `2026-11-14-autokirim`, supaya era build lama vs autokirim bisa dipisah saat audit funnel. Selisih funnel 15 vs 8 pada 14 Nov semuanya dari build lama (semua event sebelum deploy 13:40).
- Live: sha256 `7e4e0217…` di `jelajah-jurusan.vercel.app` + mirror; `/api/status` → `{"ready":true}`. Backup: `index.html.bak-sebelum-autokirim`, `index.html.bak-hasil-akhir`.
- Uji: server lokal tiruan (`/api/status` + `/api/results`) → kirim otomatis jalan tanpa centang, payload berisi `nama`, sid `JJ-…`, kotak status "Terkonfirmasi masuk ke Google Sheets". Uji live ujung-ke-ujung: hasil uji `JJ-12EF6E86F7AF77F6` (nama `UJI-EDITH`) → `/api/results` balas `{"ok":true}` dan masuk Sheet (baris uji ini boleh dihapus).
- Saat uji, `/api/stats` menunjukkan 54 pembuka, 13 sampai halaman hasil, 9 terkirim (sesudah perubahan ini, angka terkirim akan mengikuti angka sampai hasil).

## Poster jadi halaman pertama hasil (13 Nov 2026, 23:30 WIB)
Paket `jelajah-jurusan-2026-11-13-poster-duluan.zip` (dibuat 23:27) sudah **live**:
- `index.html` sha256 `a7655d80…0f8f6` di `https://jelajah-jurusan.vercel.app` dan mirror `https://jelajah-jurusan-satu-lapak.vercel.app` (keduanya identik, `/api/status` → `{"ready":true}`). Backup versi sebelumnya: `index.html.bak-hasil-akhir`.
- Isi: halaman hasil sekarang dibuka di **Poster hasil** ("Hasilmu sudah jadi!") + kotak "Mau tahu kenapa hasilnya begini?" + tombol "Baca penjelasan"; **Lembar hasil lengkap** pindah ke halaman terakhir (15) bersama sumber & riwayat; poster tidak diulang di akhir; titik progres hanya menandai halaman yang benar-benar dibuka; `babak` hanya dicatat untuk halaman berurutan.
- Uji headless 430×950 dari file dan dari URL live: 15 halaman, urutan `poster → kartu → cek incaran → minat → peringkat → luar → mantap → diri → 3 jurusan (jeda antar jurusan) → banding → akhir`, tombol "Selesai" balik ke halaman awal + toast "Hasilmu tersimpan…", lembar 1800×1200 dan poster 1080 px ter-render, unduh poster (624 KB) & unduh lembar (570 KB) jalan, checkbox "Sertakan kelebihan" menggambar ulang lembar, konsol bersih (tidak ada "susunan halaman hasil berubah"). `alat/uji-alur.js`: top1 3,6–5,9%, top3 11,5–16,6%, 22/22 tahan salah geser.
- Hanya `index.html` yang berubah; `api/`, `receiver/`, `dashboard.html`, dan env Vercel tidak disentuh. `/api/stats?k=…` masih OK (30 pembuka, 1 hasil terkirim).
- Belum diuji di perangkat sungguhan: unduh/bagikan poster di Android Chrome & iPhone Safari, dan satu pengiriman hasil baru setelah revisi ini.

## Paket sebelumnya
`jelajah-jurusan-2026-11-13-malam-sdm.zip` (13 Nov 2026, 21:45 WIB)

Isi tambahan dibanding paket malam sebelumnya:
- `index.html`: label pulau "Manusia" → **Sumber Daya Manusia** (tombol pilih pulau 2 baris, label peta 10px, poster 2 baris 14px) + blok pelacakan kunjungan di akhir `<body>`.
- baru: `api/hit.js`, `api/stats.js`, `dashboard.html`, `receiver/kunjungan.gs`.
- `receiver/apps-script.gs` dikembalikan ke versi asli (eksperimen menaruh pelacakan di penerima hasil dibatalkan).
- Env Vercel tambahan: `HIT_SCRIPT_URL`, `HIT_SECRET`, `STATS_KEY`.

## Deploy 13 November 2026 (malam)
`index.html` paket malam (sha256 `6835e7ae…b5ebf`) sudah live di `https://jelajah-jurusan.vercel.app` dan mirror `https://jelajah-jurusan-satu-lapak.vercel.app`; `/api/status` → `{"ready":true}`. `api/`, `receiver/`, dan dokumen lain identik dengan versi sebelumnya, jadi hanya `index.html` yang berubah. Backup versi lama: `index.html.bak-prasehari`.

Uji ulang setelah deploy (headless Chrome 430×950, paket `alat/uji-alur.js` angka sama: top1 3,6–5,9%, top3 11,5–16,6%, 22/22 tahan salah geser):
- Kartu "Hasilmu masih tersimpan" tampil paling atas; "Buka hasil terakhir" mendarat di halaman 13 (poster).
- Kotak "Sehari-hari kerja": 5 baris bernomor, semua tertutup di awal, "Lihat" → "Tutup", nomor jadi centang hijau, hanya satu terbuka, "Pekerjaan berikutnya" membuka baris berikutnya dan menggeser layar sampai judulnya di atas.
- Lompat halaman lewat titik dan dropdown jalan; tombol JSON tetap tersembunyi.
- Halaman 13 bertombol "Lanjut", halaman 14 bertombol "Selesai" aktif → balik ke halaman awal + pesan "Hasilmu tersimpan…".

## Yang berubah dari paket sebelumnya
`index.html`, `README.md`, dan file baru `alat/uji-alur.js`. Rinciannya ada di README bagian "Revisi 13 November 2026 (sore)":
pemilih jurusan incaran, petunjuk dan pemberitahuan memilih, penanda gulir, tombol "Buka kotak" di halaman jurusan, tiga grafik baru, poster hasil, dan penyesuaian tampilan HP.

**Pertanyaan dan hitungan nilai berubah** (22 kartu keseharian, 2 pertanyaan kebiasaan nyata, keseharian kerja, jalur kedinasan) dan penyeimbang sudah dihitung ulang. Lihat README bagian "Penajaman pertanyaan dan jalur kedinasan". `api/status.js`, `api/results.js`, dan `receiver/apps-script.gs` tidak disentuh, jadi konfigurasi Vercel dan Google Sheets tetap berlaku.

## Revisi poster (13 November 2026)
Poster hasil dirombak, punya 3 gaya warna, dan ada gambar kedua "Lembar hasil lengkap". Rinciannya di `CATATAN_PERUBAHAN.md`. Hanya `index.html` yang berubah.

## Status
- **Kode paket:** tersedia, sudah dimainkan otomatis dari awal sampai halaman terakhir di ukuran layar HP tanpa error.
- **Deploy:** sudah live 13 Nov 2026 malam (lihat bagian "Deploy" di atas).
- **Belum diuji di perangkat sungguhan:** unduh poster dan bagikan gambar (Android Chrome, iPhone Safari), serta pengiriman ke Google Sheets setelah revisi.

## Pemeriksaan setelah deploy
1. Buka `https://jelajah-jurusan.vercel.app/api/status`; pastikan `ready: true`.
2. Di halaman awal, coba pilih 4 jurusan incaran dan tombol "Belum tahu".
3. Mainkan sampai hasil; di halaman jurusan tekan "Buka kotak" sampai tombol berubah menjadi "Lanjut".
4. Di halaman "Poster hasil", unduh poster dan coba "Bagikan gambar" di HP.
5. Setujui pengiriman, lalu cocokkan kode JJ dengan baris di tab `hasil` Google Sheets.

## Pelacakan & dasbor (13 Nov 2026, malam)
- Tab baru **kunjungan** di Sheet yang sama: satu baris per kejadian (`buka`, `babak`, `hasil`, `kirim`), tanpa nama/IP.
- Apps Script terpisah "JJ Kunjungan" (bukan yang dipakai jalur hasil) → URL di env Vercel `HIT_SCRIPT_URL`.
- Dasbor pribadi: `https://jelajah-jurusan.vercel.app/dashboard.html?k=KUNCI-DASHBOARD-DISIMPAN-DI-VERCEL-ENV` (kunci di `~/.hermes/.jj_stats_key`).
- Rincian: `CATATAN_PERUBAHAN.md` bagian "Pelacakan kunjungan & dasbor pribadi".

## Batasan penting (tidak berubah)
- localStorage hanya di browser dan perangkat yang sama.
- Google Sheets adalah salinan untuk pengelola, bukan sinkronisasi arsip antarperangkat.
- Endpoint publik sebaiknya diberi rate limiting atau CAPTCHA jika trafik besar.
- Jangan membagikan `INGEST_SECRET` atau `GOOGLE_SCRIPT_SECRET`.

## Catatan untuk Google Sheets
Hasil yang dikirim sekarang bertanda versi `2026-11-13-penajaman` dan memuat jawaban baru (kartu `k_...`, `hobi`, `tonton`, `daily`, `dinas`) di dalam kolom jawaban yang sama. Pisahkan baris versi lama dan baru saat menganalisis, karena rumus nilainya berbeda. Hasil lama di arsip browser tetap bisa dibuka, tetapi nilainya dihitung ulang dengan rumus baru.

## Uji peran: tempat kerja dipisah dari peran (13 Nov 2026, sudah live)

- `index.html` versi ini (sha256 `85ae7f05…0aad8d`) sudah live di `https://jelajah-jurusan.vercel.app`; `/api/status` → `{"ready":true}`.
- `receiver/apps-script.gs` sudah dipasang ulang di project penerima hasil ("Jelajah Jurusan receiver v1", deployment `YOUR_DEPLOYMENT_ID`) sebagai **Version 4**. Judul kolom tab `hasil` sekarang **22 kolom**: 20 kolom lama + `industri` + `peminatan kuliah`. Kolom lama tidak bergeser, jadi `/api/stats` dan dasbor tetap jalan.
- Diuji dengan satu baris uji (`JJ-AB12CD34EF56AB78`) yang dikirim langsung ke endpoint penerima: nilai `industri` dan `peminatan` masuk ke dua kolom baru. Baris uji itu **sudah dihapus**, tab `hasil` sekarang 11 baris data.
- Yang belum diuji di perangkat sungguhan: unduh poster/bagikan gambar (Android Chrome, iPhone Safari) dan pengisian formulir uji oleh responden nyata.
