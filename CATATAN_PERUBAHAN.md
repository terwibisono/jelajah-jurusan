# Catatan Perubahan — 14 Nov 2026 (28 jurusan)

## 6 jurusan baru (22 → 28)
- **Pulau Bisnis jadi 6:** baru `keuangan` (Keuangan & Perbankan), `bisdig` (Bisnis Digital & Kewirausahaan), `ekonomi` (Ilmu Ekonomi & Ekonomi Syariah). `akuntansi` berganti nama jadi "Akuntansi & Perpajakan".
- **Naik dari daftar "di luar":** `ekonomi` (Bisnis), `mipa` (Matematika, Statistika & Sains, pulau Teknologi), `nakes2` (Kebidanan, Fisioterapi & Analis Kesehatan, pulau Kesehatan), `sosant` (Sosiologi & Kesejahteraan Sosial, pulau Sumber Daya Manusia). Kode bidang dan kartunya (`x4`, `x8`, `x10`, `x12`) tetap, sekarang jadi kartu topik biasa.
- Daftar "di luar" tinggal 6 bidang: transportasi, kebumian, kedokteran hewan, agama dan filsafat, seni pertunjukan, olahraga.
- Tiap jurusan baru punya isi lengkap: misi, isi kuliah, 5 contoh pekerjaan dengan kesehariannya, 4 peminatan, sisi berat, kampus contoh, kartu topik dan kartu keseharian. Semua blok ada di `index.html` bagian "Jurusan tambahan (14 Nov 2026)".
- **Isi jurusan baru disusun dari pengetahuan umum, belum dicek ke sumber resmi** (daftar kampus, jalur profesi, sertifikat). Belum ada data daya tampung untuk jurusan baru.
- Kartu baru: `t23` (bank, saham, pinjaman), `t24` (toko online, merek sendiri), dan 6 kartu keseharian `k_...`. Beberapa kartu lama dapat bobot tambahan untuk jurusan baru (`t6`, `t7`, `t14`, `t13`, `t4`).
- Semua tulisan "22 jurusan" di aplikasi jadi 28.

## Keadilan (dihitung ulang untuk 28 jurusan)
- `node alat/uji-alur.js`: top1 3,1–5,0% (ideal 3,57%), top3 9,3–14,6% (ideal 10,7%).
- Pemain ideal: 28 dari 28 jadi nomor 1, juga saat 1 kartu utama salah geser dan saat kartu pulaunya dijawab "Bukan aku" atau "Biasa aja".
- Jumlah kartu: pemain ideal 49–67, pemain acak 48–81 (tengah 62).
- Diuji di browser tanpa layar: untuk tiap 28 jurusan, semua halaman hasil dan kotak dibuka, poster dan lembar digambar, tanpa error dan tanpa teks terpotong.

## Data
- `ver` jadi `2026-11-14-28jurusan`. Peringkat sekarang berisi 28 baris dan penyeimbangnya baru; pisahkan dari versi sebelumnya.
- README masih menyebut 22 jurusan di banyak tempat dan belum diperbarui.

# Catatan Perubahan — 14 Nov 2026 (kartu bercabang)

## Alur kartu baru
- **Bagian 1, sama untuk semua (30 kartu):** 24 kartu situasi + 6 **kartu pulau** baru (`GATE`: `g_kes`, `g_man`, `g_tek`, `g_tnk`, `g_bis`, `g_kre`), diselipkan tiap 4 kartu. Judulnya "Dunia ini menarik buatmu?".
- **Pemilihan pulau (`pickIsl`):** nilai pulau = 0,5 × jawaban kartu pulau + kecocokan gaya jurusan terbaiknya. Diambil 2 pulau teratas; pulau ketiga ikut kalau kartunya dijawab "Suka" atau nilainya mepet (selisih ≤ 0,05).
- **Bagian 2, khusus tiap orang (`deckFor`):** kartu topik (bobot ≥ 0,5) dan kartu keseharian dari jurusan di pulau terpilih, ditambah **2 kartu kejutan** dari pulau lain. Kartu kejutan yang dijawab "Suka" membuka kartu pulau itu.
- **Kartu yang tidak muncul** tidak dianggap netral begitu saja: nilainya ditaksir dari kartu pulaunya (`swv`: Bukan aku 0,25; Biasa aja 0,5; Suka 0,75).
- Dek disusun ulang dari jawaban setiap kali berubah, jadi "Batalkan kartu terakhir" dan "Lanjutkan" tetap aman melewati batas bagian.
- Penghitung: "Bagian 1 · kartu x dari 30", lalu "Bagian 2, khusus buatmu · kartu x dari n".

## Keadilan (dihitung ulang)
- `OFF` dan `GN` dihitung ulang dengan `alat/seimbangkan.js`, yang sekarang memainkan pemain acak lewat dek bercabang.
- `node alat/uji-alur.js` (20.000 pemain acak, alur lengkap): top1 3,7–5,9% (sebelumnya 3,6–5,9%), top3 10,8–17,2% (sebelumnya 11,5–16,6%).
- Pemain ideal tiap jurusan: 22 dari 22 jadi nomor 1, juga saat 1 kartu utama salah geser, saat kartu pulaunya sendiri dijawab "Bukan aku", dan saat dijawab "Biasa aja".
- Jumlah kartu: pemain ideal 45–58, pemain acak 45–69 (tengah 56). Sebelumnya semua orang 68.

## Data
- `ver` jadi `2026-11-14-bercabang`. Jawaban tiap orang sekarang memuat kartu yang berbeda-beda (kartu yang tidak muncul tidak ada di `ans`), dan nilainya memakai penyeimbang baru. Pisahkan dari versi sebelumnya saat menganalisis.
- Hasil lama di arsip browser tetap terbuka, tetapi persentasenya bisa bergeser sedikit karena penyeimbang baru.

# Catatan Perubahan — 14 Nov 2026 (kartu bentuk minat dipertajam)

## 1. 24 kartu bentuk minat jadi situasi nyata
- Teks semua kartu `CARDS` (r1–r4, i1–i4, a1–a4, s1–s4, e1–e4, c1–c4) diganti dari kegiatan umum ("Jadi ketua atau koordinator acara") menjadi situasi spesifik ("Grup tugas diam semua, kamu yang mulai bagi tugas"), supaya tidak semua orang menjawab "suka".
- Kode kartu dan tipenya tidak berubah, jadi rumus nilai dan penyeimbang (`OFF`, `GN`) tetap. `alat/uji-alur.js`: top1 3,6–5,9%, top3 11,5–16,6% (sama dengan sebelumnya).

## 2. Pertanyaan dan tombol menyesuaikan jenis kartu
- Kartu bentuk minat (situasi): judul **"Ini kamu banget?"**, tombol **Bukan aku / Kadang / Aku banget**, cap geser "AKU BANGET".
- Kartu topik dan keseharian: tetap "Kegiatan ini seru buatmu?" dengan **Bukan aku / Biasa aja / Suka**.
- Nilai jawaban tetap 0 / 0,5 / 1.

## 3. Label versi data
- `ver` di kiriman hasil dan pelacakan kunjungan jadi `2026-11-14-kartu-tajam`, supaya jawaban kartu lama dan baru bisa dipisah di Google Sheets (kode kartu sama, artinya beda).

# Catatan Perubahan — 14 Nov 2026 (dasbor: nama + label versi)

## 1. Nama peserta muncul di dasbor
- `receiver/apps-script.gs` (Versi 6 → Versi 7 deployment) menambah `doGet(?data=1&token=…)` yang mengirim paket ringkas tab `hasil` termasuk kolom `nama` (posisi 23).
- `api/stats.js` mengambil baris hasil dari penerima utama (`GOOGLE_SCRIPT_URL` + `GOOGLE_SCRIPT_SECRET`) supaya dapat `nama`; kalau gagal, jatuh ke paket lama dari penerima kunjungan (tanpa nama) agar dasbor tetap hidup.
- `dashboard.html` menambah kolom **Nama** di tabel "Hasil terbaru" (fallback `–`) dan menampilkan catatan selisih funnel.
- Baris lama (14 Nov sebelum Versi 5) memang **tidak punya nama sama sekali** (build lama belum mengirim nama, juga tidak ada di `json lengkap`), jadi tampil `–`. Nama terisi untuk kiriman baru.

## 2. Label versi di tab kunjungan
- `hit()` di `index.html` masih mengirim `ver:"2026-11-13-malam"` hardcoded; sekarang `2026-11-14-autokirim` supaya era build lama vs autokirim bisa dibedakan di tab `kunjungan`.
- Catatan analisis: 15 "sampai halaman hasil" vs 8 "terkirim" pada 14 Nov seluruhnya berasal dari pembukaan build lama (kirim manual). Event 13:38 WIB sudah `hasil` tanpa `kirim`; setelah deploy 13:40 setiap `hasil` diikuti `kirim`.

# Catatan Perubahan — 13 Nov 2026 (malam)

Versi aplikasi tetap `2026-11-13-penajaman` (tidak diubah supaya baris data di Google Sheet tidak terpecah).

## 1. Kartu "Hasil sebelumnya" pindah ke paling atas
- Kartu baru `#backCard` di posisi pertama halaman intro: badge "Hasil sebelumnya", judul "Hasilmu masih tersimpan", tombol **Buka hasil terakhir**, plus daftar arsip.
- Tombol "Lihat hasil terakhir" dan blok arsip dihapus dari baris tombol bawah.
- Kartu hanya tampil kalau `S.done` atau ada arsip tersimpan (`syncIntro`).

## 2. Buka hasil lama langsung ke halaman poster
- Fungsi baru `openPosterFirst()`: `renderRes()` → `show("res")` → `showPg(index halaman "poster")`.
- Dipakai oleh tombol **Buka hasil terakhir** dan klik item di daftar arsip.
- Hasil baru selesai main tetap mulai dari halaman 1 (kartu penjelajah).

## 3. Pilih halaman tanpa next-next
- Titik pager (`#pdots`) sekarang `<button>` yang bisa diketuk → `goPg(index)`. Tetap ada `aria-label` dan status `aria-current`.
- Dropdown `#pSel` di bawah titik: isi semua halaman ("1. Kartu penjelajah" … "14. Akhir"), ganti pilihan → langsung lompat.
- Lompatan jurusan → jurusan ke depan tetap melewati layar jeda (`openJeda`).

## 4. Tombol simpan JSON disembunyikan
- `#exportOne` (Unduh hasil ini), `#exportArchive` (Unduh backup semua hasil), `#importArchive` (Pulihkan dari backup) diberi `hidden`.
- Kode dan handler tetap utuh; cukup hapus atribut `hidden` kalau mau dimunculkan lagi.

## 5. Perbaikan poster
- Baris "Incaranmu: …" dibungkus dua baris, sebelumnya terpotong di sisi kanan poster.

## Verifikasi
- Lokal + live (`https://jelajah-jurusan.vercel.app`), headless Chrome 430×950:
  - tanpa hasil tersimpan → kartu atas tidak muncul
  - ada hasil tersimpan → kartu di posisi pertama, arsip tampil
  - Buka hasil terakhir → halaman "Poster hasil 13 dari 14", gambar poster ter-render, tombol unduh aktif
  - lompat via dropdown ke halaman 3 ✓, via titik ke halaman 6 ✓
  - tombol JSON tidak tampil ✓

---

# Catatan Perubahan — 13 Nov 2026 (poster baru)

Versi aplikasi tetap `2026-11-13-penajaman`. Hanya `index.html` yang berubah; rumus nilai, pertanyaan, `api/`, dan `receiver/` tidak disentuh.

## Poster hasil dirombak (tetap 1080 x 1920)
- **Gaya kartu berstiker**: kotak putih bergaris tebal dengan bayangan, sinar di belakang karakter, taburan bintang di tepi, ombak di bawah.
- **Kepala**: karakter dalam lingkaran besar, pita nama, tipe ditulis besar dua baris (tipe utama + tipe kedua).
- **Bentuk minatku**: grafik jaring digambar ulang, dua tipe terkuat diberi tanda kuning.
- **Pulau tujuanku (baru)**: peta enam pulau, pulau dari 3 jurusan teratas berwarna dan bernomor, dihubungkan garis rute.
- **Jurusan nomor 1 (diperkaya)**: kartu besar berwarna pulaunya, cincin persentase, dua alasan bercentang "kenapa nyambung" (sifat yang sama, lalu rasa saat misi / adu pilihan / keseharian / jarak nilai), dan contoh pekerjaan ("Bisa jadi ...").
- **Nomor 2 dan 3**: dua kartu berdampingan dengan batang nilai dan satu keterangan ("Nyambung di sisi ...").
- **Incaranku cocok nggak? (baru)**: tiap incaran dapat urutan dan vonis singkat: Cocok nih, Perlu dicoba langsung, Menarik dicoba, atau Kenali dulu. Aturannya sama dengan halaman "Cek jurusan incaran", hanya kata-katanya diperhalus untuk poster. Tanpa incaran: jarak poin nomor 1 ke nomor 2. Di sebelahnya dua keping ramping: kemantapan dan kekuatan hasil.
- **Kesimpulan (baru)**: satu kalimat rangkuman di kotak kuning (nomor 1, jaraknya dari nomor 2, dan dua alternatif).
- **Ajakan** di bawah: "Kamu tipe yang mana? Main di <alamat>".
- Nama jurusan panjang otomatis dikecilkan atau dipotong dengan "…", tidak ada lagi yang keluar kotak.
- Minat belum terbaca: poster punya versi sendiri (tanpa peringkat, dengan penjelasan dan langkah berikutnya).

## Pilihan gaya poster (baru)
- Tiga tombol di atas gambar: **Warna pulauku** (warna mengikuti pulau jurusan nomor 1), **Laut malam**, **Laut cerah**.
- Pilihan disimpan di browser (`jelajah-poster-gaya`), poster digambar ulang saat diganti.

## Yang tetap
- Kelebihan, kebiasaan, dan jawaban lain tidak ikut di poster.
- Tombol Unduh poster dan Bagikan gambar tidak berubah.

## Verifikasi
- Headless Chrome: 3 gaya x beberapa profil (nama jurusan terpanjang, 4 incaran, tanpa nama, minat belum terbaca), tanpa error.
- Alur di aplikasi: buka hasil → halaman poster → gambar tampil → ganti gaya → gambar berganti.
- `node alat/uji-alur.js` hasilnya sama seperti sebelumnya.
- Belum diuji di HP sungguhan (unduh dan bagikan), sama seperti catatan sebelumnya. Font Baloo 2 dan Nunito Sans baru terlihat saat online.

## Lembar hasil lengkap (baru, 1800 x 1200 mendatar)
- Gambar kedua di halaman "Poster hasil", di bawah poster. Untuk disimpan atau ditunjukkan ke orang tua dan guru.
- Isi: profil dan tipe, jurusan paling nyambung + alasan + contoh pekerjaan, alternatif jurusan, enam jurusan teratas (incaran ditandai), grafik jaring, incaran cocok atau tidak, kesimpulan.
- Kolom kanan berisi **kelebihanku**, **yang perlu kulatih**, dan **yang paling kucari** (yang relevan untuk jurusan nomor 1 dicetak tebal). Ada centang "Sertakan ..." untuk mematikannya; kalau dimatikan, kolom itu diganti persiapan dari sekarang, yang sering bikin kaget, dan jurusan yang mirip.
- Poster story tetap tidak memuat kelebihan, kebiasaan, atau jawaban lain.
- Tidak tampil saat minat belum terbaca.
- Belum ada versi khusus mode uji ketepatan (pekerjaan, kecocokan kerja, kepuasan).

## Bahasa poster dan lembar hasil
- Semua teks di kedua gambar ditulis ulang dengan bahasa sehari-hari anak SMA (contoh: "Butuh orang yang penasaran dan rapi, kayak aku", "Jurusan ini bikin aku penasaran", "Seberapa yakin", "Pilihan lainnya", "menang jauh dari nomor 2").
- Semua kalimat ditulis sebagai perkiraan dari jawaban di permainan ("kelihatannya", "kebayang"), tidak ada yang mengklaim pemain sudah mencoba sungguhan.
- Tidak ada lagi teks yang dipotong dengan "…": nama jurusan memakai nama pendek, kalimat dikecilkan atau turun baris, kelebihan ditampilkan sebagai keping utuh. Kalau tidak muat, sisanya ditulis "+n lagi".

## Revisi gaya bahasa (13 Nov 2026, malam)
- **Poster**: alasan kartu nomor 1 jadi label + keping fakta ("Sifat yang sama: Si Penasaran, Si Rapi", "Menang adu pilihan: 3 dari 3", atau selisih poin kalau tidak ada data adu pilihan). Tidak ada lagi kalimat "aku".
- **Lembar hasil**: alasan jadi kalimat pendek pakai "kamu" ("Kamu suka cari tahu dan teliti. Jurusan ini butuh dua-duanya.", "Dari 3 kali diadu, jurusan ini menang 3 kali.").
- Judul tanpa "-ku": Tipe penjelajah, Bentuk minat, Pulau tujuan, Jurusan incaran, Kelebihan, Yang perlu dilatih, Yang dicari dari pekerjaan.
- **Jurusan incaran** tidak lagi diberi vonis; cukup posisinya: "Masuk 3 besar" (hijau) atau "Urutan 20 dari 22".
- **Kesimpulan diganti "Intinya"**: judul singkat + satu kalimat, dipilih otomatis berurutan:
  1. Ada incaran tapi tidak ada yang masuk 3 besar → "Incaran beda arah"
  2. Selisih nomor 1 dan 2 di bawah 3 poin → "Dua jurusan bersaing ketat"
  3. Hasil masih goyah → "Arahnya masih bisa berubah"
  4. Seberapa yakin di bawah 40% → "Minatnya jelas, yakinnya belum"
  5. Selain itu → "Arahnya sudah jelas"
  6. Minat belum terbaca → "Belum ada yang menonjol"

## Poster jadi kartu identitas (13 Nov 2026, malam)
Tujuannya: orang yang belum main bisa langsung paham "oh dia begini" dan ikut penasaran. Semua istilah permainan dan angka analisis dibuang dari poster (tetap ada di lembar hasil).
- **Julukan** jadi judul besar, dari pasangan tipe terkuat + tipe kedua (30 julukan, daftar di `JULUK`). Contoh: Si Penggerak + Si Penasaran = "Pemimpin yang Kepo". Minat belum terbaca: "Penjelajah Bebas".
- **Ciri-ciri**: 3 stiker kata singkat (2 dari tipe terkuat, 1 dari tipe kedua, daftar di `CIRI`).
- Kartu jurusan: satu alasan "Pas buat yang suka cari tahu dan teliti". "Menang adu pilihan" dihapus di poster dan lembar.
- Dihapus dari poster: seberapa yakin, kekuatan hasil, jurusan incaran, intinya.
- Kotak baru: **Tipe ini sering jadi** (satu pekerjaan dari tiap jurusan 3 teratas). Tidak ada strip kesimpulan di bawah; ruangnya dipakai untuk memperbesar grafik, peta, dan kartu jurusan.
- Lembar hasil: julukan tampil di kartu profil.
- Kartu pertanyaan bentuk minat tidak diubah (tetap 24 kartu).
- Pekerjaan di poster dan lembar memakai daftar nama profesi pendek per jurusan (`PJOBS`, 3 per jurusan), bukan potongan kalimat `jobs`, supaya tidak muncul potongan seperti "Tambang" atau "Atau puskesmas".
- Kartu jurusan nomor 1 di poster tidak lagi punya baris "Bisa jadi"; semua contoh pekerjaan dikumpulkan di kotak "Tipe ini sering jadi" (maks. 6, tanpa dobel) supaya tidak berulang.

## Kotak "Sehari-hari kerja" lebih jelas bisa dipilih (13 Nov 2026, malam)
Masalah: daftar pekerjaan terlihat seperti label biasa, petunjuknya kecil dan abu-abu, dan setelah diketuk isinya berubah di bawah layar sehingga orang tidak sadar ada yang berubah.
- Kotak petunjuk di atas: "Ada 5 contoh pekerjaan dari jurusan ini. Ketuk tiap pekerjaan untuk melihat alat yang dipakai dan apa yang dikerjakan tiap hari."
- Tiap pekerjaan jadi baris bernomor dengan tombol kuning "Lihat" (berubah jadi "Tutup"). Semua tertutup di awal supaya daftarnya langsung terlihat.
- Isi (alat, sehari-harinya, bakal betah kalau) terbuka tepat di bawah barisnya, dan layar bergulir ke judul pekerjaan itu.
- Hanya satu terbuka; yang sudah dilihat nomornya berubah jadi centang hijau.
- Di akhir tiap pekerjaan ada tombol "Pekerjaan berikutnya: …".
- Kotak "Kuliahnya ngapain" punya tombol "Lihat keseharian tiap pekerjaan" yang langsung membuka kotak ini.
- Keterangan kotak di halaman jurusan: "5 pekerjaan, buka satu per satu".

## Tombol di halaman terakhir hasil
- Sebelumnya: halaman kedua dari akhir bertombol "Selesai" (padahal masih ada satu halaman), dan di halaman terakhir tombolnya mati.
- Sekarang: halaman kedua dari akhir bertombol "Lanjut"; halaman terakhir bertombol "Selesai" yang bisa diketuk, kembali ke halaman awal, dan muncul pesan "Hasilmu tersimpan. Buka lagi kapan saja dari halaman awal." Hasil tetap ada di kartu "Hasilmu masih tersimpan" di halaman awal.

## Pelacakan kunjungan & dasbor pribadi (13 November 2026, malam)

Ditambahkan supaya kelihatan berapa yang buka, sampai babak berapa, dan berapa yang benar-benar mengirim hasil.

### Yang dicatat
- `buka` — halaman dibuka (satu baris per kunjungan perangkat).
- `babak` — halaman peta yang pertama kali dicapai (dikirim sekali per babak, tertinggi disimpan).
- `hasil` — tombol menuju halaman hasil ditekan.
- `kirim` — hasil benar-benar diterima Sheets (balasan `/api/results` OK).
Tidak ada nama, IP, atau isi jawaban. Id perangkat acak (`V-…`) disimpan di localStorage.

### Alur data
`index.html` → `POST /api/hit` (rahasia di server) → Apps Script "JJ Kunjungan" → tab **kunjungan** (8 kolom: waktu, perangkat, kejadian, babak, total babak, versi, asal, peramban).
`/api/stats?k=KUNCI` membaca tab `kunjungan` + `hasil` lalu menghitung funnel. Jalur hasil (`api/results.js`, receiver lama) **tidak disentuh**.

### Dasbor
`https://jelajah-jurusan.vercel.app/dashboard.html?k=KUNCI-DASHBOARD-DISIMPAN-DI-VERCEL-ENV`
Isi: pengunjung unik, buka halaman, hasil sejak pelacakan dipasang, konversi, funnel 5 tahap, grafik per hari (WIB), jurusan nomor 1, dan tabel hasil terbaru. Auto-refresh 60 detik.
Kunci disimpan di `~/.hermes/.jj_stats_key` dan di env Vercel `STATS_KEY`. Tanpa kunci → 403.

### Catatan angka
- "Pengunjung unik" = jumlah id perangkat yang pernah mengirim `buka`, bukan orang.
- "Hasil sejak dipasang" hanya menghitung baris `hasil` yang masuk setelah catatan kunjungan pertama ada, supaya pembandingnya setara dengan jumlah pengunjung.
- Kunjungan sebelum 13 Nov 2026 20:07 WIB tidak tercatat dan tidak bisa direkonstruksi.

### Berkas baru/berubah
- baru: `api/hit.js`, `api/stats.js`, `dashboard.html`, `receiver/kunjungan.gs`
- berubah: `index.html` (blok pelacakan di akhir `<body>`)
- env Vercel baru: `HIT_SCRIPT_URL`, `HIT_SECRET`, `STATS_KEY`

## Nama pulau "Manusia" jadi "Sumber Daya Manusia" (13 November 2026, malam)

- Label pulau ungu di peta, tombol pilih pulau, poster hasil, dan teks "Mulai dari Pulau …" sekarang memakai **Sumber Daya Manusia**.
- Karena namanya panjang, label otomatis menyesuaikan: di tombol pilih pulau turun jadi dua baris, di peta kecil ukuran hurufnya 10px, di poster dua baris dengan huruf 14px. Pulau lain tidak berubah.

## Uji ketepatan: tempat kerja dan peran dipisah (13 November 2026, malam)

Masalah: tester IT di rumah sakit memilih "Kesehatan" dan "IT" sebagai bidang kerja, padahal Kesehatan hanya tempat kerjanya. Alat menganggapnya bekerja di dua bidang, sehingga hasil uji bisa salah dinilai.

### Formulir "Sudah kuliah atau bekerja?"
- **Dulu kuliah jurusan apa?** (tetap) + baru: **Peminatan atau konsentrasinya?** Pilihannya muncul sesuai jurusan (dari daftar peminatan yang sudah ada), ditambah "Tidak ada atau lupa". Tidak muncul untuk bidang di luar 22 jurusan.
- Baru: **Sekarang kerja di industri apa?** (pilihan tarik-turun, 15 industri). Hanya catatan, **tidak ikut dihitung**.
- Diubah: **Kerjaan sehari-harimu paling mirip yang mana?** Pilih 1 utama, boleh tambah 1 (sebelumnya sampai 3). Ada contoh: kerja di rumah sakit tapi ngurus sistem dan aplikasi, pilih Informatika, bukan Kedokteran. **Ini yang dinilai.** Data lama dengan 3 bidang dipotong jadi 2 saat dibuka lagi.
- Jabatan dan Betah: tetap.

### Kartu hasil uji
- Menampilkan industri sebagai catatan.
- Kalau peminatan diisi: dibandingkan dengan peminatan yang disarankan alat (urutan ke berapa dari jumlah peminatan jurusan itu).
- Ringkasan teks untuk dikirim ikut memuat industri dan peminatan.

### Data ke Google Sheets
- Payload `uji` dapat dua isian baru: `industri` dan `peminatan`. Langsung tersimpan di kolom "json lengkap" **tanpa deploy ulang**.
- `receiver/apps-script.gs`: dua kolom baru di **paling belakang** (setelah "json lengkap"): "industri", "peminatan kuliah". Kolom lama tidak bergeser, jadi `api/stats.js` dan dasbor aman. Kolom baru aktif setelah Apps Script di-deploy ulang (Deploy > Manage deployments > Edit > Version: New version); judul kolom ditambahkan otomatis.
- Baris yang sudah masuk sebelumnya tidak bisa dipisah otomatis; pakai kolom "catatan kerja" untuk membacanya.

## Hasil dibuka langsung di poster (13 November 2026, malam)

Masalah: setelah main, poster baru muncul di halaman 11 dari 12, jadi kebanyakan orang tidak sampai ke sana.

Urutan halaman hasil sekarang:
1. **Poster hasil** ("Hasilmu sudah jadi!"): pilih gaya, unduh, bagikan. Di bawah poster ada kotak "Mau tahu kenapa hasilnya begini?" + tombol **Baca penjelasan lengkap**; tombol utama di bawah layar bertuliskan "Baca penjelasan".
2. Kartu penjelajah
3. Cek jurusan incaran (kalau ada incaran)
4. Bentuk minat dan asal nilai, Peringkat 22 jurusan, Di luar 22 jurusan
5. Kemantapan pilihan, Kelebihan dan kebiasaan
6. Jurusan nomor 1, 2, 3, lalu jurusan incaran di luar 3 besar (kalau ada)
7. Bandingkan dua jurusan
8. **Lembar hasil, sumber, riwayat** (halaman terakhir): kartu **Lembar hasil lengkap** pindah ke sini, di atas "Penasaran jurusan lain?". Tombol **Selesai** kembali ke halaman awal.

Catatan:
- Poster hanya ada di halaman 1, tidak diulang di akhir.
- Titik progres di bawah hanya menandai halaman yang benar-benar sudah dibuka.
- "Buka hasil terakhir" di halaman awal dan riwayat juga mulai dari poster.
- Pelacakan kunjungan: `babak` hanya dicatat untuk halaman yang dicapai berurutan. Karena poster sekarang halaman 1, angka "Sampai halaman hasil" di dasbor berarti sampai halaman terakhir (Lembar hasil, sumber, riwayat).

### Status pemasangan
Sudah live 13 Nov 2026, 22:30 WIB. Penerima hasil dipasang sebagai **Version 4**; judul kolom tab `hasil` sudah 22 kolom (`industri`, `peminatan kuliah` di paling belakang). Satu baris uji sempat dikirim untuk memastikan dua kolom baru terisi, lalu baris itu dihapus. Tab `kunjungan` (Apps Script "JJ Kunjungan") dan `HIT_SCRIPT_URL` tetap seperti pemasangan 21:45.

## Kirim otomatis saat halaman hasil terbuka (14 November 2026)

Masalah: pengiriman ke Google Sheets bergantung pada centang "Bantu penelitian" di halaman awal. Yang tidak mencentang (atau mencentang lalu gagal) tidak pernah masuk Sheet, padahal sudah sampai halaman hasil.

Yang berubah:
- `index.html`: centang persetujuan dihapus, diganti keterangan "Hasil otomatis dikirim". `sendResult()` jalan otomatis begitu halaman hasil terbuka (`#toRes`), saat halaman dibuka ulang dengan hasil tersimpan, dan saat koneksi kembali online. Tombol "Kirim ulang" tetap ada kalau gagal.
- Payload menambah `nama` (nama panggilan; avatar, poin, dan riwayat tetap tidak dikirim) dan `ver` naik ke `2026-11-14-autokirim`.
- Teks di halaman awal dan footer tidak lagi menyebut "tanpa nama": cukup "dikirim ke pembuat alat ini".
- `receiver/apps-script.gs`: `HEAD` menambah kolom **`nama`** di paling belakang (setelah "peminatan kuliah"), baris data ikut menulis nama. Sudah **terpasang** sebagai Apps Script **Version 5** (14 Nov 2026) pada deployment yang sama, jadi URL web app tidak berubah dan tab `hasil` otomatis bermigrasi ke 23 kolom saat kiriman berikutnya masuk.
