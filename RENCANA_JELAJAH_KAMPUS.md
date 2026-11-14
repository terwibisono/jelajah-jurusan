# Rencana: Jelajah Kampus

*Lanjutan Jelajah Jurusan: jalani jurusanmu dari daftar kuliah sampai hari pertama kerja.*

Tanggal: 14 November 2026 (revisi 2, menggantikan rencana "Sehari Kuliah, Sehari Kerja")
Status: **menunggu persetujuan**. Mockup 4 layar sudah ada (Psikologi, semester 3), belum ada kode di aplikasi.
Branch kerja: `sehari-kuliah-kerja`.
Nama kerja: **Jelajah Kampus**. Bisa diganti.

---

## Intinya dalam 4 kalimat

1. Pemain membawa jurusan dari hasil Jelajah Jurusan, lalu menjalaninya selama "4 tahun" dalam sekitar 15 menit.
2. Hampir semua aksinya **geser kartu**: tiap pilihan menggerakkan 4 meteran, dan tidak ada pilihan yang benar, hanya tarik-ulur.
3. Tiap jurusan punya **satu mini-game khas** yang membuat pemain merasakan jenis berpikir di jurusan itu.
4. Di akhir ada **ending** sesuai jalan yang dipilih, **kartu momen** untuk dikoleksi, dan **rapor betah** per tahap kuliah.

---

## 1. Aturan tulisan (wajib, supaya tidak jadi bacaan)

| Bagian | Batas |
|---|---|
| Situasi di kartu | paling banyak **15 kata** |
| Pilihan kiri atau kanan | paling banyak **5 kata** |
| Fakta "Ternyata…" | paling banyak **15 kata**, paling banyak 1 per bab |
| Akibat pilihan | tidak ditulis; **ditunjukkan** lewat meteran yang bergerak dan wajah karakter |

Sisanya dibawa gambar: latar adegan, ekspresi karakter, jam, dan meteran. Tanpa emoji; semua gambar SVG dengan gaya yang sama seperti peta pulau.

---

## 2. Mekanik inti: geser kartu dan 4 meteran

```
┌──────────────────────────────────────────┐
│ Semester 3 · Selasa 07.30                │
│ [Energi ▮▮▮▮▯] [Nilai ▮▮▮▯▯]             │
│ [Teman  ▮▮▯▯▯] [Hati  ▮▮▮▮▯]             │
│                                          │
│   ┌────────────────────────────────┐     │
│   │  (latar: ruang kuliah)         │     │
│   │  [wajah dosen]                 │     │
│   │  "Kuis statistik dadakan.      │     │
│   │   Laptop kamu mati."           │     │
│   └────────────────────────────────┘     │
│  ← Pinjam laptop teman   Kerjakan manual →│
└──────────────────────────────────────────┘
```

- **Empat meteran:** Energi, Nilai, Teman, Hati.
- **Saat kartu digeser**, meteran yang akan berubah **menyala** (tanpa angka). Pemain menebak akibatnya sebelum melepas kartu. Inilah yang bikin tiap kartu terasa menegangkan.
- **Terlalu rendah dan terlalu tinggi sama-sama memicu kejadian**, supaya pemain belajar menyeimbangkan, bukan memaksimalkan:

| Meteran | Kalau habis | Kalau penuh |
|---|---|---|
| Energi | Tumbang, satu hari hilang | Terlalu santai, tugas menumpuk |
| Nilai | Surat peringatan akademik | Dianggap kutu buku, jarang diajak |
| Teman | Tugas kelompok sendirian | Kebanyakan organisasi, nilai turun |
| Hati | Butuh jeda: adegan tenang dan ajakan bicara ke orang terdekat | Terlalu nyaman, lupa target |

Tidak ada game over. Tiap kejadian hanya membelokkan cerita.

- **Tokoh yang muncul berulang:** teman sekelas, senior, dosen pembimbing, dan kakak tingkat. Wajahnya SVG dengan 3 ekspresi. Hubungan dengan mereka berubah sesuai pilihan dan muncul lagi di bab berikutnya.
- **Kejadian acak** dari kumpulan bersama (laptop rusak, beasiswa dibuka, dosen pengganti, lomba, kos bocor) supaya tiap main berbeda.
- **Bisa diketuk:** kartu juga bisa dijawab dengan dua tombol, untuk yang tidak suka menggeser.

---

## 3. Peta perjalanan: 7 bab, masing-masing sekitar 2 menit

Bab-bab tampil sebagai jalur kapal antar-pulau kecil, melanjutkan tema Jelajah Jurusan. Tiap bab selesai tersimpan, jadi bisa lanjut besok.

| Bab | Isi | Yang khas |
|---|---|---|
| 0. Daftar kuliah | **Papan strategi:** seret 4 kartu prodi ke slot pilihan. Tiap kartu punya bar keketatan dari data kursi dan peminat. Muncul cap "Nekat", "Seimbang", atau "Aman". | Selalu ada adegan pendek **"kalau tidak lolos"** yang memaksa pemain memilih rencana B. Bukan ramalan lolos atau tidak; setelahnya cerita lanjut di jurusan pilihan. |
| 1. Semester 1 | Kaget mata kuliah dasar, ospek, cari teman, hidup kos | Fakta kejutan jurusan (data `fk`) |
| 2. Semester 3 | Sehari penuh 07.30 sampai 21.00 | **Mini-game jurusan** di jam praktikum |
| 3. Semester 5 | **Pilih peminatan**: kartu-kartu peminatan, dengan saran dari hasil Jelajah Jurusan diberi tanda | Pilihan ini mengubah bab 4 dan ending |
| 4. Semester 7 | Magang: ditolak dulu, lalu diterima, sesuai peminatan | Tokoh senior membantu kalau hubungan baik |
| 5. Semester 8 | Skripsi: revisi, dosen pembimbing, sidang | Mini-game versi lebih sulit |
| 6. Hari pertama kerja | Pilih satu dari 3 pekerjaan sesuai peminatan, lalu satu hari kerja | Keseharian dari data `KERJA` |

Di akhir tiap bab: satu ketukan **"Betah di sini?"** dengan 3 wajah karakter (senang, biasa, cemberut). Ini satu-satunya "pertanyaan" di game, dan inilah data utamanya.

---

## 3b. Isi kartu: rasa jurusannya, dan hidup sebagai mahasiswa

Tiap bab dicampur supaya terasa **jadi mahasiswa**, bukan cuma belajar:

| Jenis kartu | Porsi | Contoh di Psikologi |
|---|---|---|
| **Khas jurusan** (kuliah, praktikum, tugas yang hanya ada di jurusan itu) | sekitar 60% | Kuis uji-t pakai SPSS, praktikum observasi anak TK, laporan observasi |
| **Kehidupan kampus** (himpunan, UKM, kepanitiaan, kantin, perpustakaan, dosen wali) | sekitar 25% | Diajak jadi panitia seminar himpunan, ajakan UKM paduan suara |
| **Di luar kampus** (kos, kerja sampingan, keluarga, teman lama) | sekitar 15% | Jaga stan kopi dibayar per jam, teman curhat jam 22.30 |

- Kartu kehidupan kampus pun diberi warna jurusannya. Contoh: temanmu curhat karena kamu "anak Psikologi", atau anak Teknik diajak ikut lomba robot.
- **Kampus dan tempat tinggal dari Bab 0 mengubah latar.** Kampus negeri besar di kota lain berarti kos dan pulang kampung saat libur. Kampus dekat rumah berarti tinggal bersama keluarga, dengan kartu yang berbeda. Nama kampus sungguhan tidak dipakai di adegan.

## 4. Mini-game per jurusan (30 sampai 45 detik)

Tujuannya **merasakan jenis berpikirnya**, bukan menguji pintar atau tidak. Tidak ada gagal total; nilai rendah hanya mengurangi meteran Nilai sedikit. Setelahnya: "Seru?" dengan 3 wajah.

| Jurusan | Mini-game | Rasanya |
|---|---|---|
| **Teknik Biomedis** | Rangkai sinyal: sambungkan komponen di papan sampai gelombang EKG muncul di layar osiloskop | Teliti, rangkaian, coba-ulang |
| **Psikologi** | Amati: video pendek animasi kelas, ketuk tiap perilaku yang muncul, lalu pilih grafik yang cocok dengan datanya | Observasi lalu data |
| Kedokteran | Triase: seret pasien ke urutan penanganan sebelum waktu habis | Cepat, prioritas, tekanan |
| Informatika | Cari bug: ketuk baris kode yang membuat robot jalan ke arah salah | Logika langkah demi langkah |
| Hukum | Cari celah: dua kesaksian, ketuk kalimat yang bertentangan | Teliti membaca, argumen |
| Manajemen | Warung: atur harga dan stok 5 hari, lihat pembeli datang atau pergi | Angka dan keputusan bisnis |

---

## 5. Yang bikin main lagi

- **Ending ganda:** sekitar 6 per jurusan, dari kombinasi meteran, peminatan, dan pilihan kunci. Contoh untuk Psikologi: *Peneliti muda*, *Aktivis kampus*, *Lulus tepat waktu*, *Banting setir ke HRD*, *Lanjut profesi psikolog*, dan **Pindah jurusan**. Ending terakhir muncul kalau betah terus rendah, dan ditampilkan sebagai pilihan yang sah, bukan kegagalan.
- **Album kartu momen:** 12 per jurusan ditambah 10 umum. Contohnya *Begadang pertama*, *Jadi asisten lab*, *Ditolak magang 3 kali*, *Sidang lancar*. Yang belum didapat tampil sebagai siluet.
- **Coba jurusan lain:** tiap jurusan baru membuka peta, ending, dan kartu momen yang berbeda. Inilah alasan utama untuk main lagi, dan sekaligus tujuan alat ini: membandingkan jurusan.
- **Pamer yang sehat:** poster ending dan album untuk dibagikan.

### Yang sengaja tidak dibuat
Pengguna utamanya anak sekolah, jadi "nagih" yang dipakai hanya yang sehat:
- tidak ada hitungan hari beruntun atau hukuman kalau tidak main,
- tidak ada notifikasi atau pengingat,
- tidak ada papan peringkat IPK,
- tidak ada hadiah acak berbayar atau "terbatas waktu".

---

## 6. Hasil: rapor perjalanan

- **Grafik garis betah per bab**, dari semester 1 sampai kerja. Contoh bacaannya: "Kamu kurang betah di semester awal, tapi naik tajam setelah memilih peminatan."
- Kartu **ending** beserta 3 momen yang paling menentukan.
- Hasil **mini-game** ("Seru?") dibandingkan dengan nilainya.
- **Bandingkan dua jurusan** berdampingan kalau sudah main dua.
- Kembali ke Jelajah Jurusan: kotak jurusan itu mendapat catatan "Sudah dijalani: betah di kuliah, ragu di kerja".
- **Nilai minat 28 jurusan tidak berubah.**

---

## 7. Isi dan ketepatan

| Per jurusan | Jumlah |
|---|---|
| Kartu cerita | sekitar 45 (7 bab × 6 sampai 7) |
| Mini-game | 1, dengan 2 tingkat |
| Ending | sekitar 6 |
| Kartu momen | 12 |
| Kejadian acak (dipakai semua jurusan) | sekitar 30 |

- **Sumber kuliah:** daftar mata kuliah resmi minimal dua kampus per jurusan. Hanya mata kuliah yang muncul di keduanya yang dipakai.
- **Sumber kerja:** data `KERJA` yang sudah ada, dicocokkan dengan daftar tugas O*NET.
- **Penanda "belum dicek mahasiswa"** di tiap jurusan, sampai ada mahasiswa atau alumni sungguhan yang membaca.
- **Tombol kecil "Ada yang tidak sesuai?"** di tiap bab.
- Tidak ada testimoni atau kutipan karangan.

---

## 8. Tahapan

| Tahap | Isi | Tujuan |
|---|---|---|
| **1** | Mesin game, peta 7 bab, dan **2 jurusan lengkap: Teknik Biomedis dan Psikologi** | Membuktikan gamenya seru dan isinya tepat, sebelum menulis isi untuk 26 jurusan lain |
| 2 | Kedokteran, Informatika, Hukum, Manajemen | Jurusan dengan peminat terbanyak |
| 3 | 22 jurusan sisanya | Mini-game sebagian dipakai bersama antar-jurusan yang mirip |

Uji tahap 1 dengan **paling sedikit 5 anak SMA dan 2 mahasiswa** dari tiap jurusan. Ukurannya:
- berapa yang main sampai ending tanpa disuruh,
- berapa yang mencoba jurusan kedua,
- apakah mahasiswanya bilang "iya, memang begini".

---

## 9. Teknis

- **File terpisah `kampus.html`** di situs yang sama, jadi bisa membaca hasil Jelajah Jurusan dari penyimpanan HP. `index.html` tidak makin berat.
- **Isi per jurusan** di `kampus/<id>.json` dan kejadian bersama di `kampus/umum.json`, diunduh saat dipakai.
- Satu mesin untuk semua jurusan. Menambah jurusan cukup dengan menambah file JSON; mini-game baru butuh kode.
- **Masuk dari:** tombol "Jalani jurusan ini" di halaman "Kenalan dengan jurusanmu", dan dari halaman awal untuk yang sudah punya incaran.
- **Data ke Google Sheets:** tab baru `kampus` berisi betah per bab, ending, peminatan, rasa mini-game, dan laporan "tidak sesuai". Butuh perubahan Apps Script dan deploy ulang dari kamu. Usulan: tahap 1 menyimpan di HP dulu, dan pengiriman menyusul setelah gamenya terbukti.
- **Pencatat kunjungan:** kejadian per bab, supaya terlihat di bab mana orang berhenti.
- **Aksesibilitas:** "kurangi gerakan" mematikan animasi, tiap kartu bisa diketuk, dan huruf minimal 13 px.

---

## 10. Cara menguji sebelum tahap 1 dianggap selesai

1. Dua jurusan dimainkan penuh lewat tombol di 360×640 dan 390×844, semua bab, tanpa error.
2. Simulasi 5.000 pemain acak per jurusan: semua ending bisa dicapai, dan tidak ada ending yang lebih dari 40% atau kurang dari 3%.
3. Tiap meteran pernah habis dan pernah penuh di simulasi, dan kejadiannya muncul.
4. Lanjut dari bab tersimpan setelah halaman ditutup.
5. Dengan "kurangi gerakan", tidak ada animasi.
6. `node alat/uji-alur.js` di Jelajah Jurusan tetap sama.
7. Tangkapan layar tiap bab dan mini-game dikirim ke kamu.

---

## Yang perlu kamu jawab

1. **Nama:** "Jelajah Kampus", atau ada ide lain?
2. **Tahap 1:** setuju mulai dengan 2 jurusan (Teknik Biomedis dan Psikologi) saja?
3. **Meteran "Hati":** setuju ada meteran perasaan? Kalau habis, adegannya tenang dan mengajak bicara ke orang terdekat, bukan hukuman.
4. **Data:** setuju tahap 1 simpan di HP dulu, pengiriman ke Google Sheets menyusul?
