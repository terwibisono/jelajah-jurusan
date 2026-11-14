# Rencana: Jelajah Kampus

*Lanjutan Jelajah Jurusan: jalani jurusanmu dari daftar kuliah sampai hari pertama kerja.*

Tanggal: 14 November 2026 (revisi 3: ditambah kerangka dan dasar penelitian)
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

## 0. Kerangka dan dasar penelitian

Game ini punya tiga lapis. Tiap fitur harus bisa ditunjuk masuk lapis mana dan berdasar riset apa. Fitur yang tidak masuk lapis mana pun tidak dibuat.

```
   ┌─────────────── DAMPAK ───────────────┐
   │ Lebih paham isi kuliah · lebih yakin │   ← diukur sebelum dan sesudah main
   │ dan berani mencari tahu · tahu       │
   │ langkah berikutnya                   │
   └──────────────────▲───────────────────┘
   ┌─────────────── MAIN ─────────────────┐
   │ Bebas memilih · terasa mampu ·       │   ← supaya mau main sampai habis
   │ terhubung dengan tokoh dan teman     │      dan main lagi
   └──────────────────▲───────────────────┘
   ┌─────────────── ISI ──────────────────┐
   │ Kuliah apa adanya, enak dan beratnya,│   ← supaya yang dirasakan benar
   │ dari kurikulum resmi dan mahasiswa   │
   └──────────────────────────────────────┘
```

### Masalah yang dijawab

- Angka "87% mahasiswa Indonesia merasa salah jurusan" (Indonesia Career Center Network, 2017) sering dikutip media. Laporan aslinya belum kami temukan, jadi angka ini tidak dipakai di dalam game.
- Penelitian di satu prodi Teknik Informatika: hampir 50% mahasiswanya merasa tidak cocok, dan banyak yang putus asa dengan kuliahnya.
- 44,7% mahasiswa mengalami *academic culture shock* terhadap tuntutan kuliah, terutama di aspek akademik, sosial, dan psikologis (dikutip dalam tugas akhir UMN).
- Yang paling sering kurang: gambaran nyata isi kuliah sebelum mendaftar. Itu yang dikejar game ini.

### Dasar penelitian dan fitur yang lahir darinya

| Dasar | Temuan intinya | Jadi fitur apa di game |
|---|---|---|
| **Pratinjau realistis** (*realistic job preview*; Premack & Wanous 1985, Phillips 1998, Earnest dkk. 2011) | Informasi yang jujur, sisi enak **dan** beratnya, membuat peran lebih jelas dan menurunkan harapan yang berlebihan. Isinya harus berdasar pemetaan pekerjaan yang teliti. | **Aturan sisi berat:** tiap bab minimal 2 kartu tentang bagian kuliah yang memang berat (revisi, hafalan, praktikum gagal). Semua kartu kuliah diambil dari kurikulum resmi dan dicek mahasiswa. |
| **Lima bahan penting intervensi karier** (Brown & Ryan Krane 2000; direplikasi sebagian oleh Whiston dkk. 2017) | Yang terbukti membantu: latihan tertulis, umpan balik pribadi, informasi dunia kerja, contoh dari yang lebih berpengalaman, dan dukungan orang sekitar. Tiga bahan atau lebih jauh lebih efektif. | Kelimanya dipakai: **Catatan perjalanan** (refleksi satu ketukan per bab), **rapor pribadi**, kartu **"Ternyata"** dan bab kerja, **"Kata kakak tingkat"** dari wawancara mahasiswa sungguhan, dan **"Ajak ngobrol"** untuk orang tua atau guru BK. |
| **Teori Kognitif Sosial Karier dan meta-analisis eksplorasi karier** (Lent dkk.; Kleine dkk. 2021) | Rasa mampu mencari tahu berhubungan kuat dengan perilaku eksplorasi (r = 0,52). Pengaruhnya lewat **tujuan eksplorasi** yang konkret (r = 0,42). | **Misi dunia nyata** di akhir tiap bab: satu langkah kecil yang bisa dilakukan minggu ini, misalnya membuka silabus prodi atau bertanya ke satu mahasiswa. Pemain bisa mencentangnya saat kembali. |
| **Kesulitan memilih karier** (Gati, CDDQ; sudah dipakai di Jelajah Jurusan) | Orang ragu karena kurang siap, kurang informasi, atau informasinya bertentangan. Penanganannya berbeda untuk tiap jenis. | **Rapor menyebut jenis ragunya:** misalnya "masih kurang informasi soal kerjanya" atau "suka kuliahnya, tapi bertentangan dengan keinginan orang tua", lalu memberi langkah yang cocok untuk jenis itu. |
| **Teori Penentuan Diri dalam game** (Ryan, Rigby & Przybylski 2006) | Rasa bebas memilih, rasa mampu, dan rasa terhubung masing-masing memprediksi rasa senang dan keinginan main lagi. Kontrol yang intuitif ikut menentukan rasa mampu. | **Bebas:** benang cerita, pilih peminatan, pilih jurusan lain. **Mampu:** mini-game yang bisa dikuasai dalam 2–3 kali main, kartu yang responsif. **Terhubung:** tokoh yang ingat pilihanmu, membandingkan hasil dengan teman. |
| **Meta-analisis serious game** (Wouters dkk. 2013) | Game lebih efektif untuk belajar dan mengingat, tapi tidak otomatis lebih memotivasi. Efeknya lebih besar kalau dipadu cara lain, dimainkan beberapa sesi, dan berkelompok. | **Bab tersimpan** untuk beberapa sesi, **mode kelas** untuk guru BK (main bersama lalu diskusi dengan lembar pertanyaan), dan ajakan diskusi di rapor. |
| **Culture shock tahun pertama** | Kaget paling besar di aspek akademik. | **Bab 1 fokus adaptasi akademik:** SKS dan KRS, belajar mandiri, dosen yang berbeda dari guru, tugas tanpa diingatkan. |
| **Children's Code, standar 13** (ICO Inggris) | Jangan pakai trik desain untuk mendorong anak memberi data yang tidak perlu. Dorong kebiasaan yang menyehatkan, sediakan jeda dan simpan. | Tanpa hitungan hari beruntun, tanpa notifikasi, data seminimal mungkin dan tanpa nama, jeda dan simpan di tiap bab. |

### Fitur tambahan dari riset (belum ada di mockup)

| Fitur | Bentuk | Di mana | Batas tulisan |
|---|---|---|---|
| **Catatan perjalanan** | Satu ketukan: "Yang paling bikin aku ragu di bab ini…" dengan 4 pilihan, plus "lainnya" | Akhir tiap bab, setelah "Betah di sini?" | 4 pilihan, masing-masing ≤ 6 kata |
| **Kata kakak tingkat** | Satu kalimat tips dari mahasiswa sungguhan, diberi label "dari wawancara, nama disamarkan" | Satu per bab | ≤ 20 kata |
| **Misi dunia nyata** | Satu langkah kecil minggu ini, bisa dicentang | Akhir tiap bab dan rapor | ≤ 12 kata |
| **Ajak ngobrol** | 3 pertanyaan pembuka untuk orang tua atau guru BK, plus tombol bagikan | Rapor | 3 × ≤ 15 kata |
| **Jenis ragumu** | Satu kalimat: jenis ragu dan langkah yang cocok | Rapor | ≤ 25 kata |
| **Mode kelas** | Kode kelas sederhana, ringkasan kelas tanpa nama, lembar diskusi untuk guru | Halaman guru terpisah | Tahap 2, bukan tahap 1 |

### Cara membuktikan game ini membantu

1. **Sebelum dan sesudah main**, tiga pertanyaan geser 1–5:
   - "Seberapa paham kamu isi kuliah jurusan ini?"
   - "Seberapa yakin kamu dengan pilihan jurusanmu?"
   - "Seberapa tahu kamu langkah berikutnya?"
   Dua pertanyaan pertama mengikuti hasil pratinjau realistis (peran lebih jelas) dan rasa mampu memutuskan karier. Yang ketiga mengikuti tujuan eksplorasi.
2. **Betah per bab** dan **jenis ragu**: dibandingkan antar-jurusan.
3. **Misi dunia nyata yang dicentang** saat pemain kembali, sebagai tanda awal eksplorasi sungguhan.
4. **Isi dicek mahasiswa:** tiap jurusan minimal 2 mahasiswa aktif menilai "memang begini" atau "tidak begini" per bab.

**Harapan yang wajar:** dalam meta-analisis, peserta intervensi karier rata-rata hanya sekitar sepertiga simpangan baku di atas yang tidak ikut. Artinya membantu, tapi tidak menyulap. Game ini **bukan tes psikologi dan bukan pengganti guru BK atau psikolog**, dan itu ditulis jelas di game.

**Uji dengan anak SMA** butuh izin sekolah dan orang tua. Datanya tanpa nama, dan tidak ada pertanyaan tentang kesehatan mental.

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
- **Tidak ada kejadian acak.** Semua kejadian punya sebab yang bisa ditunjuk: pilihanmu sebelumnya, atau meteran yang habis atau penuh. Variasi saat main ulang datang dari pilihan yang berbeda, bukan dari undian.

### Benang cerita: pilihan saling terkait

Tiap bab punya 2 sampai 3 **benang** yang menyambung kartu-kartunya, dan sebagian berlanjut ke bab berikutnya.

- **Di dalam satu bab.** Kartu punya versi yang muncul tergantung pilihan sebelumnya. Contoh di mockup Psikologi semester 3:
  - tidur lagi jam 06.45 membuat kamu telat kuis Statistik,
  - pinjam laptop Dimas membuat Dimas menagih balasan di kantin ("temani aku daftar paduan suara"),
  - kuis yang dihitung manual dengan rapi membuat Bu Ratna mengajakmu jadi asisten Statistik,
  - catatan observasi yang lengkap terpakai saat diskusi di kuliah Psikologi Perkembangan,
  - anggota kelompok yang menghilang jam 15.00 adalah Alya, dan jam 22.30 Alya cerita kenapa. Isinya berbeda tergantung kamu tadi meneleponnya atau mengerjakan bagiannya.
- **Antar-bab.** Di akhir bab muncul daftar **"Berlanjut ke bab berikutnya"**. Contoh: seleksi asisten Statistik di semester 5 (bentrok dengan latihan paduan suara kalau kamu ikut UKM), Pak Hendra menawarimu ikut penelitiannya di semester 7, dan Alya jadi rekan skripsimu di semester 8.
- **Penanda sebab.** Kartu yang muncul karena pilihan sebelumnya diberi label kecil berikon rantai, misalnya "Karena tadi pinjam laptop Dimas". Pemain jadi sadar pilihannya berakibat.
- **Tokoh ingat.** Hubungan dengan tiap tokoh tersimpan sepanjang perjalanan dan menentukan siapa yang muncul membantu atau menjauh di bab akhir.
- **Batasnya:** satu kartu paling banyak punya 3 versi, dan satu benang paling panjang 3 bab. Dengan begitu isinya tetap bisa dicek dan diuji, tidak meledak jadi ratusan cabang.
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

Di akhir tiap bab, urutannya selalu sama dan singkat (sekitar 20 detik):
1. **"Betah di sini?"** dengan 3 wajah karakter: senang, biasa, cemberut. Ini data utamanya.
2. **Catatan perjalanan:** satu ketukan "yang paling bikin aku ragu".
3. **Kata kakak tingkat:** satu kalimat.
4. **Misi dunia nyata:** satu langkah kecil minggu ini.
5. **Berlanjut ke bab berikutnya:** benang cerita yang terbawa.

---

## 3b. Isi kartu: kuliah jadi menu utama

Ini game tentang kuliah, jadi sebagian besar kartu adalah **urusan kuliah di jurusan itu**. Kehidupan kampus dan di luar kampus hanya bumbu supaya terasa jadi mahasiswa.

| Jenis kartu | Porsi | Contoh di Psikologi |
|---|---|---|
| **Kuliah khas jurusan**: mata kuliah, kuis dan ujian, praktikum, laporan, tugas kelompok, diskusi kelas, dosen dan asisten, dosen wali, asisten dosen, penelitian | sekitar **75%** | Kuis uji-t pakai SPSS, praktikum observasi anak TK, diskusi Psikologi Perkembangan, laporan kelompok, seleksi asisten Statistik |
| **Kehidupan kampus**: himpunan, UKM, kepanitiaan, kantin, teman sekelas | sekitar 15% | Ajakan UKM paduan suara di kantin |
| **Di luar kampus**: kos, keluarga, kerja sampingan | sekitar 10% | Alya curhat jam 22.30, dan itu tetap terhubung dengan tugas kelompok |

Aturan tambahan:
- **Mata kuliah disebut namanya** (Statistik, Psikologi Perkembangan, Psikodiagnostik, dan seterusnya), sesuai daftar mata kuliah resmi di semester itu. Tiap bab memuat 2 sampai 3 mata kuliah yang memang diajarkan di semester tersebut.
- **Bentuk tugas khas jurusan** jadi pusat adegan: laporan observasi untuk Psikologi, rangkaian dan osiloskop untuk Teknik Biomedis, kasus dan pasal untuk Hukum.
- **Jalur akademik punya benangnya sendiri**: asisten dosen, ikut penelitian dosen, lomba ilmiah, dan pertukaran mahasiswa. Benang ini mengarah ke ending seperti *Peneliti Muda*.
- Kartu kehidupan kampus dan luar kampus tetap **disambungkan ke kuliah**. Contohnya: latihan UKM yang bentrok dengan jadwal asisten, atau teman yang menghilang dari tugas kelompok.
- **Kampus dan tempat tinggal dari Bab 0 mengubah latar.** Kampus jauh berarti kos dan pulang kampung saat libur; kampus dekat berarti tinggal bersama keluarga. Nama kampus sungguhan tidak dipakai di adegan.

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
- **Jenis ragumu** dan langkah yang cocok, dari catatan perjalanan tiap bab.
- **Ajak ngobrol:** 3 pertanyaan pembuka untuk orang tua atau guru BK.
- **Daftar misi dunia nyata** yang bisa dicentang.
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
| Versi kartu karena pilihan sebelumnya | sekitar 15 |
| Benang cerita antar-bab | 4 sampai 6 |
| Kejadian meteran habis atau penuh (dipakai semua jurusan) | 8 |

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

Uji tahap 1 dilakukan dua putaran:
- **Uji seru:** 5 sampai 10 anak SMA dan 2 mahasiswa per jurusan. Ukurannya: berapa yang main sampai ending tanpa disuruh, berapa yang mencoba jurusan kedua, dan apakah mahasiswanya bilang "iya, memang begini".
- **Uji dampak:** satu kelas (sekitar 30 anak) dengan izin sekolah dan orang tua. Ukurannya tiga pertanyaan sebelum dan sesudah main (lihat bagian 0).

---

## 9. Teknis

- **File terpisah `kampus.html`** di situs yang sama, jadi bisa membaca hasil Jelajah Jurusan dari penyimpanan HP. `index.html` tidak makin berat.
- **Isi per jurusan** di `kampus/<id>.json` dan kejadian meteran bersama di `kampus/umum.json`, diunduh saat dipakai.
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
4. Tiap versi kartu dan tiap benang antar-bab tercapai di simulasi, supaya tidak ada cerita yang tidak pernah terlihat.
5. Lanjut dari bab tersimpan setelah halaman ditutup.
6. Dengan "kurangi gerakan", tidak ada animasi.
7. `node alat/uji-alur.js` di Jelajah Jurusan tetap sama.
8. Tangkapan layar tiap bab dan mini-game dikirim ke kamu.

---

## Yang perlu kamu jawab

1. **Nama:** "Jelajah Kampus", atau ada ide lain?
2. **Tahap 1:** setuju mulai dengan 2 jurusan (Teknik Biomedis dan Psikologi) saja?
3. **Meteran "Hati":** setuju ada meteran perasaan? Kalau habis, adegannya tenang dan mengajak bicara ke orang terdekat, bukan hukuman.
4. **Data:** setuju tahap 1 simpan di HP dulu, pengiriman ke Google Sheets menyusul?
5. **Kata kakak tingkat:** bisa bantu mencarikan 2 mahasiswa Psikologi dan 2 mahasiswa Teknik Biomedis untuk wawancara singkat dan mengecek isi? Tanpa mereka, bagian ini dikosongkan, karena tidak boleh dikarang.
6. **Uji dampak:** ada sekolah yang bisa diajak, misalnya sekolah iparmu?

---

## Sumber

- Premack, S. L., & Wanous, J. P. (1985). A meta-analysis of realistic job preview experiments. *Journal of Applied Psychology, 70*, 706–719.
- Phillips, J. M. (1998). Effects of realistic job previews on multiple organizational outcomes: A meta-analysis. *Academy of Management Journal, 41*(6), 673–690.
- Earnest, D. R., Allen, D. G., & Landis, R. S. (2011). Mechanisms linking realistic job previews with turnover: A meta-analytic path analysis. *Personnel Psychology, 64*, 865–897.
- Brown, S. D., & Ryan Krane, N. E. (2000). Four (or five) sessions and a cloud of dust: Old assumptions and new observations about career counseling. Dalam *Handbook of Counseling Psychology* (edisi ke-3). Wiley.
- Whiston, S. C., Li, Y., Mitts, N. G., & Wright, L. (2017). Effectiveness of career choice interventions: A meta-analytic replication and extension. *Journal of Vocational Behavior, 100*, 175–184.
- Kleine, A.-K., Schmitt, A., & Wisse, B. (2021). Students' career exploration: A meta-analysis. *Journal of Vocational Behavior*.
- Gati, I., Krausz, M., & Osipow, S. H. (1996). A taxonomy of difficulties in career decision making. *Journal of Counseling Psychology, 43*(4), 510–526.
- Ryan, R. M., Rigby, C. S., & Przybylski, A. (2006). The motivational pull of video games: A self-determination theory approach. *Motivation and Emotion, 30*, 347–363.
- Wouters, P., van Nimwegen, C., van Oostendorp, H., & van der Spek, E. D. (2013). A meta-analysis of the cognitive and motivational effects of serious games. *Journal of Educational Psychology, 105*(2), 249–265.
- Information Commissioner's Office (UK). *Age appropriate design: a code of practice for online services*, standar 13 "Nudge techniques".
- Arifin, I. Pengaruh salah pilih jurusan terhadap rasa putus asa mahasiswa Teknik Informatika. *Nathiqiyyah*.
- Tugas akhir Universitas Multimedia Nusantara, perancangan board game simulasi adaptasi perkuliahan (mengutip Rahmadani & Mukti, 2020, soal *academic culture shock*).
- Pembanding game sejenis: *Get a Life* (K20 Center, University of Oklahoma).
