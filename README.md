# Jelajah Jurusan

Game interaktif untuk membantu siswa SMA di Indonesia menemukan jurusan kuliah yang nyambung dengan minatnya. Hasilnya berupa saran untuk dipertimbangkan, bukan keputusan.

Versi: 14 November 2026 — kirim hasil otomatis + nama peserta di dasbor.

## Jalankan sendiri (deploy ulang)

Repo ini salinan publik dari aplikasi yang jalan di `https://jelajah-jurusan.vercel.app`. Isi file sama dengan yang dipasang, hanya identitas deployment yang diganti placeholder (`YOUR_SPREADSHEET_ID`, `YOUR_SCRIPT_ID`, `YOUR_DEPLOYMENT_ID`) dan kunci rahasia tidak pernah disertakan.

1. **Vercel** — import repo ini, lalu isi Environment Variables (Production + Preview):
   - `GOOGLE_SCRIPT_URL`, `GOOGLE_SCRIPT_SECRET` — URL Web App penerima hasil + kuncinya
   - `HIT_SCRIPT_URL`, `HIT_SECRET` — penerima pencatat kunjungan
   - `STATS_KEY` — kunci buka `dashboard.html?k=...`
2. **Google Sheet** — buat spreadsheet, lalu tempel `receiver/apps-script.gs` di Apps Script (Extensions > Apps Script), isi `JJ_SS_ID` dengan id spreadsheet, set Script Property `INGEST_SECRET`, lalu Deploy > Web app (Execute as: Me, Who has access: Anyone).
3. **Pencatat kunjungan** — `receiver/kunjungan.gs` dipasang sebagai project Apps Script terpisah; isi `SS_ID` dan secret-nya, lalu deploy sebagai Web app.
4. **Dasbor** — buka `/dashboard.html?k=<STATS_KEY>`; kunci disimpan di localStorage peramban setelah sekali dibuka.

Tanpa langkah 1-3, halaman tetap jalan untuk pemain, hanya hasil tidak terkirim ke mana-mana.

## Deploy otomatis

Repo ini tersambung ke project Vercel `satu-lapak/jelajah-jurusan`. Setiap push ke `main` langsung jadi deployment produksi (`https://jelajah-jurusan.vercel.app`); branch lain dan pull request dapat preview URL sendiri. Nggak ada langkah deploy manual.

## Perubahan versi

## Perubahan 13 November 2026: dari 16 jadi 22 kelompok jurusan

Enam kelompok yang umum dan banyak peminat naik dari "bidang di luar daftar" menjadi jurusan penuh: Teknik Elektro, Mesin & Telekomunikasi; Arsitektur & Perencanaan Kota; Pertanian, Agribisnis & Teknologi Pangan; Hubungan Internasional, Politik & Administrasi Publik; Bahasa & Sastra; Pariwisata & Perhotelan. Semua datanya ada di satu blok di `index.html` (cari "6 kelompok jurusan tambahan").

- Tiap jurusan baru punya satu kartu topik (t17 sampai t22), misi, rintangan, peminatan, sisi berat, kampus, dan 5 contoh pekerjaan.
- Bidang di luar daftar tinggal 10, dan kartu bonus jadi 4 (`BONUS_K`).
- Gambaran kerja (`KERJA`) sekarang 112 pekerjaan, termasuk admin, sekretaris, kasir, teller, layanan pelanggan, dan beberapa jenis engineer.
- **Penyeimbang keadilan** (`OFF` dan `GN` di atas fungsi `base`): tiap jurusan diberi angka geser kecil dan pengatur sebaran, dicari lewat simulasi supaya pada pemain acak semua jurusan punya peluang yang sama. Tidak ada pertanyaan yang ditambah. Hukum, Politik, dan Sastra juga dibuat berbagi kartu yang bersinggungan supaya tidak bergantung pada satu kartu saja.
- Hasil di 20.000 pemain acak baru (bukan data yang dipakai untuk mencari angkanya): peluang jadi nomor 1 berkisar 4,0% sampai 5,0% (ideal 4,5%; sebelumnya 3,0% sampai 5,8%). Peluang masuk 3 teratas 13,0% sampai 14,3% (ideal 13,6%; sebelumnya 9,9% sampai 17,5%). Pemain ideal: 22 dari 22 jurusan jadi nomor 1, 10 dari 10 bidang luar terdeteksi. Tanda di luar daftar pada pemain acak: kuat 0,3%, mungkin 6%.
- Kalau isi kartu, bobot, atau profil jurusan diubah, hitung ulang dengan `node alat/seimbangkan.js` (perlu Node.js, beberapa menit), lalu salin `OFF=` dan `GN=` yang dicetak ke `index.html`.
- Batasnya: adil di sini berarti rata untuk jawaban acak. Belum tentu rata untuk siswa sungguhan, karena minat siswa tidak acak. Itu hanya bisa dicek dari data pengisi.
- Uji tahan goyang pada pemain acak: 4% kuat, 46% cukup, 50% goyah. Pemain ideal: 22 dari 22 kuat.
- **Belum ada** angka peluang masuk (`STAT`) untuk enam jurusan baru, jadi kotaknya menampilkan "Data menyusul". Daftar kampusnya disusun dari pengetahuan umum dan belum dicek satu per satu ke PDDikti.
- Angka simulasi di bagian lain README yang menyebut 16 jurusan berasal dari versi sebelumnya.
- Kunci simpanan diganti ke `jelajah-v2`, jadi permainan lama yang belum selesai tidak dilanjutkan.

## Isi paket

| File | Isi |
|---|---|
| `index.html` | Seluruh game dalam satu file. Buka di browser, tidak perlu instalasi. |
| `README.md` | Dokumen ini. |
| `receiver/apps-script.gs` | Penerima hasil Google Apps Script di Google Sheet; dipakai jika pengumpulan hasil aktif. |

Catatan: file memuat huruf dari Google Fonts. Tanpa internet game tetap berjalan, hanya hurufnya berganti ke huruf bawaan perangkat.

## Cara pakai

1. Buka `index.html` di browser HP atau laptop.
2. Isi nama (boleh kosong), pilih karakter, dan pilih jurusan incaran kalau sudah punya (maksimal 3).
3. Mainkan 7 babak, sekitar 15 menit.
4. Hasil ditampilkan per halaman dengan tombol Lanjut dan Kembali. Di halaman jurusan, ketuk kotak berwarna untuk membuka isinya.

Kalau halaman tertutup di tengah, buka lagi lalu ketuk **Lanjutkan permainan**. Setelah selesai, hasil masuk **Arsip hasil berlayar**, dan dapat diunduh atau dipulihkan lewat berkas backup. Kalau Google Sheets dipasang, hasil **otomatis dikirim** begitu halaman hasil terbuka (termasuk nama panggilan), tanpa tombol persetujuan (lihat panduan Vercel).

## Alur permainan

| Babak | Isi | Dipakai untuk |
|---|---|---|
| 1. Geser kartu | 68 kartu: 24 gaya umum, 22 topik bidang, dan 22 kartu keseharian, lalu 4 kartu bonus yang menyesuaikan jawaban (boleh dilewati) tentang bidang di luar 22 jurusan. Total 72 kartu | Dasar nilai minat. Kartu bonus hanya dipakai untuk bidang di luar 22 jurusan |
| 2. Adu pilihan | 7 ronde antara 6 kandidat teratas | Mempertajam kandidat |
| 3. Misi | 3 misi, masing-masing 3 langkah: pilihan pertama, rintangan, rasa | Menguji minat terhadap kenyataan |
| 4. Kenali dirimu | Pelajaran, yang dicari dari pekerjaan, gaya kerja, hal yang tidak bisa ditoleransi, kelebihan dan kebiasaan | Penajam dan catatan persiapan |
| 5. Final | Sisi berat tiap jurusan teratas, lalu pilihan hati | Menguji kesanggupan |
| 6. Cek keyakinan | Alasan memilih, pengetahuan soal jurusan, kesiapan | Meter kemantapan |
| 7. Rencana kuliah | Kota, jenis kampus, biaya, lama kuliah, beasiswa | Menyaring kampus dan catatan rencana |

Ada tombol batalkan di babak 1 dan 2. Babak 4, 6, dan 7 menampilkan satu pertanyaan per layar. Pertanyaan pilihan tunggal lanjut sendiri setelah dijawab.

## Halaman hasil

1. Kartu penjelajah (tipe, 3 jurusan teratas, dan kotak "Seberapa kuat hasil ini")
2. Cek jurusan incaran (kalau ada)
3. Bentuk minat dan asal nilai
4. Peringkat 22 jurusan
   - Di luar 22 jurusan: tanda apakah minatmu mungkin di luar daftar, 3 bidang teratas, dan pertanyaan "hasil ini terasa pas?"
5. Kemantapan pilihan
6. Kelebihan dan kebiasaan
7. Satu halaman per jurusan, berisi kotak berwarna yang dibuka satu per satu: kenapa nyambung, isi kuliah, sehari-hari kerja (4 contoh pekerjaan per jurusan: alat, kegiatan harian, cocok untuk siapa), sisi berat, kelebihan dan kebiasaan, peminatan, peluang masuk, kampus (disaring per kota), beasiswa, dunia kerja dan AI, tips, persiapan. Kotak yang sudah dibuka diberi tanda centang
8. Bandingkan dua jurusan
9. Sumber, riwayat, simpan atau bagikan

Kalau jawaban pemain hampir sama semua, hasil menampilkan "Minatmu belum terbaca" dan tidak memberi peringkat.

## Bidang di luar 22 jurusan

Alat ini hanya memuat 22 kelompok jurusan, bukan semua jurusan di Indonesia. Supaya pemain tidak dipaksa masuk ke 16 itu, ada pengecekan terpisah:

- **16 bidang tambahan** (`LAIN`): Arsitektur dan Perencanaan Wilayah, Teknik Elektro/Mesin/Kimia, Penerbangan/Maritim/Transportasi, Sains Murni, Kebumian dan Lingkungan, Pertanian/Perikanan/Kehutanan, Kedokteran Hewan dan Peternakan, Kebidanan/Fisioterapi/Analis Kesehatan, Hubungan Internasional dan Ilmu Politik, Ekonomi Pembangunan dan Syariah, Bahasa/Sastra/Budaya, Sosiologi/Antropologi/Kesejahteraan Sosial, Agama/Filsafat/Teologi, Pariwisata dan Perhotelan, Seni Pertunjukan/Musik/Film, Ilmu Keolahragaan. Daftar ini juga belum lengkap.
- **4 kartu bonus adaptif** di akhir babak 1, boleh dilewati. Tiap bidang tambahan punya satu kartu (`TLAIN`, 10 kartu), tapi pemain hanya ditanya 4 bidang yang gaya umumnya paling dekat dengannya (`bonusCards`, jumlahnya di `BONUS_K`). Bidang yang tidak ditanya dinilai netral untuk bagian topik dan diberi keterangan "belum ditanya" di hasil. Kartu bonus tidak mengubah nilai 22 jurusan (sudah diuji: 0 dari 3.000 pemain acak berubah).
- **Nilai bidang lain** memakai rumus dasar yang sama dengan 22 jurusan (50% gaya umum, 50% kartu topik, disetarakan sebarannya). Bidang lain tidak ikut adu pilihan, misi, dan babak final, jadi lebih kasar.
- **Tanda** dibandingkan dengan nilai dasar jurusan teratas di 16 itu: selisih 0,15 atau lebih = "kuat", 0,05 sampai 0,15 = "mungkin", di bawahnya = "22 jurusan sudah cukup". Kalau kartu bonus dilewati, "kuat" diturunkan jadi "mungkin".
- **Masukan pemain**: "Hasil ini terasa pas?" (pas, agak meleset, meleset) dan isian "bidang yang belum ada". Ini bahan untuk menilai apakah pertanyaan awal kurang.

Hasil simulasi 20.000 pemain acak dengan 5 kartu adaptif: tanda "kuat" muncul sekitar 1,4% dan "mungkin" sekitar 14%. Pemain ideal dari tiap bidang tambahan: 16 dari 22 jadi nomor 1 dan ditandai kuat. Yang belum rata: peluang tiap bidang tambahan jadi nomor 1 pada pemain acak berkisar 3,5% sampai 9,9% (idealnya 6,25%), lebih timpang daripada 22 jurusan utama (4,9% sampai 7,6%). Koreksi dengan angka penyeimbang sudah dicoba dan tidak memperbaiki, jadi tidak dipakai. Profil minat, bobot kartu, dan contoh jurusan adalah penilaian pembuat dan belum diuji ke siswa sungguhan.

## Jeda antar jurusan

Di halaman jurusan, tombol Lanjut ke jurusan berikutnya tidak langsung pindah. Muncul layar pembatas berwarna pulau jurusan berikutnya: ringkasan yang baru selesai (berapa kotak dibuka), nama dan nilai minat jurusan berikutnya, dan dua tombol (lanjut atau kembali). Di lembar kotak, tombol terakhir berubah jadi "Selesai" dan menutup lembar, tidak memutar ke kotak pertama.

## Seberapa kuat hasil ini (uji tahan goyang)

Tanpa menambah pertanyaan, alat ini mengulang hitungan 300 kali. Tiap kali, sekitar 20% kartu digeser satu langkah secara acak (`stability`). Yang ditampilkan: berapa kali dari 10 jurusan nomor 1 bertahan, berapa kali ia tetap di 3 teratas, jarak nilai ke nomor 2, dan perbandingan 3 teratas dengan permainan sebelumnya di perangkat yang sama (tes ulang).

- **Kuat**: nomor 1 bertahan minimal 70% dan tetap di 3 teratas minimal 90%. **Cukup kuat**: tetap di 3 teratas minimal 75%. Sisanya **goyah**. Batasnya di `STAB_T`.
- Simulasi 1.500 pemain acak: 8% kuat, 65% cukup, 27% goyah. Pemain ideal tiap jurusan: 16 dari 22 kuat.
- Ini mengukur kestabilan, bukan kebenaran. Hasil yang stabil bisa tetap salah kalau pertanyaannya meleset. Bukti kebenaran hanya datang dari data uji ketepatan (orang yang sudah kuliah atau bekerja) dan dari tes ulang.
- Angka ini ikut terkirim (`stab`) kalau pengumpulan hasil dinyalakan.

## Tanda sudah dan belum dibuka

Kotak berwarna dengan label "Buka" berarti belum dibuka. Setelah dibuka, kotak jadi putih bercentang dan garis kemajuan di atasnya bertambah. Bagian lipat ("Buka +") berubah jadi "Sudah dibaca" setelah pernah dibuka. Tanda kotak tersimpan di perangkat, tanda bagian lipat hanya selama halaman terbuka.

## Gambaran kerja sehari-hari

`KERJA` berisi 64 contoh pekerjaan (4 per jurusan) dan `HARIL` berisi ringkasan satu kalimat untuk 16 bidang tambahan. Isinya gambaran umum yang ditulis pembuat, bukan hasil survei, dan belum diperiksa oleh praktisi tiap bidang. Sebaiknya minta satu orang dari tiap bidang membacanya sebelum dipakai luas.

## 22 jurusan

Kedokteran & Kedokteran Gigi, Keperawatan, Farmasi, Kesehatan Masyarakat/Gizi/K3, Psikologi, Hukum, Ilmu Komunikasi, Pendidikan, Informatika, Sistem Informasi & Sains Data, Teknik Biomedis, Teknik Industri, Teknik Sipil & Pertambangan, Manajemen & Administrasi Bisnis, Akuntansi & Keuangan, Desain Komunikasi Visual.

## Cara nilai dihitung

Nilai minat tiap jurusan (0 sampai 95%) disusun bertahap:

1. **Dasar** = 50% kecocokan gaya umum (enam tipe minat Holland) + 50% kartu topik bidangnya. Sebaran nilai tiap jurusan lalu disetarakan supaya jurusan dengan sedikit kartu tidak lebih mudah melonjak.
2. **Adu pilihan**: 65% dasar + 35% tingkat kemenangan, untuk jurusan yang ikut diadu.
3. **Misi**: 75% nilai sebelumnya + 25% nilai misi. Nilai misi = 60% rasa + 40% ketahanan terhadap rintangan.
4. **Penajam**: pelajaran yang dinikmati (maksimal sekitar ±6 poin), yang dicari dari pekerjaan (±6), gaya kerja (±4), dan pengurangan 12 poin untuk tiap hal yang tidak bisa ditoleransi.
5. **Final**: 80% nilai sebelumnya + 20% jawaban sanggup, lalu +5 poin untuk pilihan hati.

Yang **tidak** mengubah nilai jurusan: pelajaran yang nilainya bagus, kelebihan, dan kebiasaan. Ketiganya hanya dipakai untuk catatan persiapan dan urutan peminatan.

Urutan peminatan di dalam jurusan memakai gaya umum, kelebihan, kebiasaan, gaya kerja, hal yang tidak bisa ditoleransi, dan pilihan pertama di misi.

Meter kemantapan = 30% konsistensi jawaban + 45% kesiapan + 25% pengetahuan soal jurusan. Kalau jawaban terlalu cepat atau sama semua, nilainya dibatasi.

## Uji keadilan

Disimulasikan 20.000 pemain yang menjawab acak di seluruh alur. Idealnya tiap jurusan menjadi nomor 1 pada 6,25% pemain.

| | Paling jarang | Paling sering |
|---|---|---|
| Sebelum penyetaraan | 1,2% | 18,7% |
| Sesudah, alur lengkap | 4,9% | 7,6% |

Uji kedua: untuk tiap jurusan dibuat satu "pemain ideal". Ke-22 jurusan muncul di urutan 1 untuk pemain idealnya.

Uji ini hanya membuktikan hitungannya tidak berat sebelah. Uji ini tidak membuktikan sarannya tepat.

## Menguji ketepatan (belum dilakukan)

Di halaman awal ada bagian **Sudah kuliah atau bekerja? Bantu uji alat ini**. Penguji mengisi:

1. Jurusan kuliah dulu.
2. Bidang kerja sekarang, maksimal 3, dipilih dari isi kerjaan sehari-hari dan diurutkan dari yang paling banyak dikerjakan.
3. Jabatan atau kerjaan (teks bebas, hanya ikut di ringkasan).
4. Betah atau tidak di kerjaan sekarang.

Setelah bermain, hasil menunjukkan urutan tiap bidang itu dari 22 jurusan dan satu kesimpulan:

| Kesimpulan | Syarat |
|---|---|
| Tepat | Bidang patokan masuk 3 teratas |
| Mendekati | Bidang patokan di urutan 4 atau 5, atau bidang pembanding masuk 3 teratas |
| Meleset | Selain itu |

Bidang patokan adalah bidang kerja pertama yang dipilih, karena alat ini mengukur minat dan kerjaan yang sekarang dijalani paling dekat dengan itu. Kalau penguji menjawab kurang betah, atau tidak mengisi bidang kerja, patokannya jurusan kuliah. Bidang lainnya menjadi pembanding. Hasil juga menampilkan peminatan yang disarankan di jurusan kuliah penguji supaya bisa dicocokkan dengan peminatan aslinya.

Ringkasan yang disalin memuat blok "UJI KETEPATAN" dengan semua urutan itu.

Saran: kumpulkan 10 sampai 20 penguji dari bidang yang berbeda. Alat ini layak dipercaya kalau bidang patokan sebagian besar penguji masuk 3 teratas. Aturan Tepat, Mendekati, dan Meleset adalah penilaian pembuat dan belum diuji.

## Arsip hasil dan pengumpulan data ke Google Sheets

**Versi revisi November 2026:** hasil selesai sekarang disimpan sebagai arsip lengkap, bukan hanya ringkasan tes sebelumnya. Ketika pemain memilih **Main lagi dari awal** atau **Kembali ke halaman awal**, hasil lama tidak terhapus. Di halaman awal tersedia **Arsip hasil berlayar**, **Lihat hasil**, **Unduh backup semua hasil**, dan **Pulihkan dari backup**.

Untuk mengirim hasil ke Google Sheets lewat Vercel, buka **[`PANDUAN_VERCEL_GOOGLE_SHEETS.md`](PANDUAN_VERCEL_GOOGLE_SHEETS.md)**. Panduan itu berisi langkah dari membuat Sheet hingga mengisi `GOOGLE_SCRIPT_URL` dan `GOOGLE_SCRIPT_SECRET` di Vercel.

Backend sekarang menggunakan `api/results.js` dan `api/status.js` (Vercel Serverless Function), lalu meneruskan hasil ke `receiver/apps-script.gs`. Dengan ini aplikasi dapat menampilkan konfirmasi hanya setelah Google Sheets benar-benar membalas sukses. URL dan secret Apps Script tidak perlu dipasang di `index.html`.

Arsip lokal hanya tersimpan di browser/perangkat tersebut dan **dapat hilang jika data situs dihapus**; backup JSON dapat dipakai untuk memulihkan atau memindahkan arsip ke perangkat lain. Google Sheets menerima hasil hanya setelah peserta menyetujui pengiriman. Nama/karakter tidak dikirim ke Sheet, tetapi isian teks bebas yang ikut dalam analisis bisa mengandung data pribadi yang diketik peserta.

## Sumber data

| Data | Sumber |
|---|---|
| Kerangka minat | Teori Holland (RIASEC), acuan O*NET Interest Profiler |
| Cek keyakinan | Itamar Gati (kesulitan keputusan karier), Mark Savickas (kesiapan karier) |
| Kursi dan peminat | Laman SNPMB 2025 dan 2026 lewat rangkuman [Ruangguru](https://www.ruangguru.com/blog/daya-tampung-ui-itb-unj-dan-ipb-university-di-utbk-snbt), [Brain Academy](https://www.brainacademy.id/blog/jurusan-ui-unpad-ugm-itb-ipb), [Gebrak.id](https://www.gebrak.id/?p=18400), [Mamikos](https://mamikos.com/info/daya-tampung-dan-peminat-upi-mhs/?halaman=2), [Tirto](https://tirto.id/jurusan-terfavorit-di-ugm-dan-daya-tampung-g78C) |
| Biaya kampus negeri | Pengumuman UKT 2026 lewat [Mamikos](https://mamikos.com/info/?p=331198), [Gebrak.id](https://www.gebrak.id/2026/03/update-ukt-universitas-indonesia-2026.html), [GoodStats](https://data.goodstats.id/statistic/5-ptn-bh-dengan-ukt-kedokteran-mandiri-reguler-tertinggi-di-indonesia-RKycD) |
| Gaji | BPS Sakernas lewat [Pojoksatu](https://pojoksatu.id/nasional/bps-ungkap-perbedaan-gaji-buruh-berdasarkan-pendidikan-lulusan-sd-terendah) dan [Metro TV](https://www.metrotvnews.com/read/KZmCQgnz-bps-rata-rata-upah-buruh-di-indonesia-capai-rp33-juta) |
| Tren peminat | [GoodStats SNBT 2026](https://data.goodstats.id/statistic/10-prodi-ptn-akademik-dengan-peminat-terbanyak-utbk-snbt-2026-fkY5D), [GoodStats SNBP 2026](https://data.goodstats.id/statistic/10-prodi-dengan-peminat-terbanyak-snbp-2026-ufNuz) |
| AI dan dunia kerja | [Kontan](https://industri.kontan.co.id/news/ai-ubah-peta-lapangan-kerja-pendidikan-vokasi-masih-punya-prospek), [Katadata](https://katadata.co.id/digital/teknologi/69eef132463eb/kampus-diminta-evaluasi-prodi-microsoft-ungkap-40-pekerjaan-rentan-diganti-ai) |
| Beasiswa | [Metro TV (Beasiswa Garuda 2027)](https://www.metrotvnews.com/read/NrWCgP9B-beasiswa-garuda-2027-segera-dibuka-cek-persyaratannya), [Mamikos](https://mamikos.com/info/beasiswa-kuliah-s1-gratis-dari-pemerintah-buka-mhs/) |

## Keterbatasan yang perlu diketahui

- **Bukan semua jurusan.** Hanya 22 kelompok jurusan ditambah 16 bidang tambahan yang dinilai lebih kasar. Jurusan lain di Indonesia belum tercakup.
- **Bukan tes psikologi resmi.** Belum diuji ke siswa sungguhan dan tidak punya norma.
- **Semua bobot dan pemetaan adalah penilaian pembuat:** profil minat tiap jurusan, kartu topik, pelajaran, nilai kerja, gaya kerja, sisi berat, peminatan, dan tingkat dampak AI.
- **Daftar kampus** disusun dari pengetahuan umum dan belum dicek satu per satu. Tidak ada akreditasi dan peringkat. Beberapa kota masih kosong, terutama Teknik Biomedis dan Desain.
- **Peluang masuk** hanya 1 sampai 4 contoh kampus negeri per jurusan, dengan tahun data yang tidak selalu sama.
- **Biaya** hanya kisaran kampus negeri. Angka kampus swasta belum ada.
- **Gaji per jurusan** tidak ditampilkan karena belum ada sumber yang tepercaya.
- **Beasiswa** adalah daftar umum yang diurutkan sesuai kondisi pemain, bukan beasiswa khusus per jurusan.
- **Cerita nyata** mahasiswa dan pekerja belum ada, karena harus berasal dari orang sungguhan.
- **Jadwal seleksi 2027** masih perkiraan.
- Data berlaku per November 2026 dan perlu diperbarui tiap musim pendaftaran.

## Mengubah isi

Semua isi ada di bagian `DATA` di dalam `<script>` pada `index.html`:

| Nama | Isi |
|---|---|
| `CARDS`, `TOPIC` | Kartu gaya umum dan kartu topik |
| `M` | 22 jurusan: profil, misi, isi kuliah, pekerjaan, AI, tips, persiapan |
| `RINT`, `BERAT` | Rintangan misi dan sisi berat |
| `MSUBJ`, `MVAL`, `MSTYLE`, `MDB` | Pemetaan pelajaran, nilai kerja, gaya kerja, hal yang tidak bisa ditoleransi |
| `PEM`, `PEMDB` | Peminatan |
| `KP`, `KLIST`, `KAMPUS` | Kampus per kota |
| `STAT`, `BIAYA`, `BEA` | Peluang masuk, biaya, beasiswa |
| `KERJA`, `HARIL` | Gambaran kerja sehari-hari per jurusan dan per bidang tambahan |
| `STAB_T` | Batas tingkat kuat dan cukup pada uji tahan goyang |
| `LAIN`, `TLAIN`, `OUT_T` | Bidang di luar 22, kartu bonusnya, dan batas tanda (ada di bagian data sebelum `scoreAll`) |
| `ICO`, `PAL` | Ikon kotak pilihan dan warna kotak (ada di bagian `TAMPILAN`) |
| `GOOGLE_SCRIPT_URL` | URL Apps Script `/exec` di Vercel Environment Variables |
| `GOOGLE_SCRIPT_SECRET` | Kunci rahasia di Vercel, harus cocok dengan `INGEST_SECRET` Apps Script |
| `NOTIFY_EMAIL` | Script Property opsional untuk notifikasi email hasil baru |

Setelah mengubah profil jurusan atau kartu, jalankan ulang uji keadilan.

## Revisi 13 November 2026 (sore)

Perubahan hanya di `index.html`. Pertanyaan, bobot, dan hitungan nilai tidak diubah, jadi penyeimbang (`OFF`, `GN`) tidak perlu dijalankan ulang. File `api/` dan `receiver/` tidak disentuh.

| Bagian | Perubahan |
|---|---|
| Jurusan incaran di halaman awal | Ada penghitung "0 dari 3 dipilih", langkah bernomor (1 ketuk pulau, 2 ketuk jurusan), tanda centang, dan tombol "Belum tahu mau jurusan apa" yang bisa diketuk. Memilih yang keempat memunculkan pemberitahuan. |
| Petunjuk memilih | Tiap pertanyaan punya label "Pilih satu", "Boleh pilih lebih dari satu", atau "Pilih paling banyak 3", dengan jumlah yang sudah dipilih. |
| Pemberitahuan | Muncul kalau belum memilih apa pun, baru memilih satu di pertanyaan yang boleh banyak, melewati batas, atau menekan Lanjut di pertanyaan wajib. Ketuk Lanjut sekali lagi untuk tetap lanjut. |
| Penanda gulir | Kalau halaman masih punya isi di bawah layar, muncul tombol "Masih ada di bawah". Di halaman hasil dan di lembar kotak, penandanya menyatu dengan bilah bawah supaya tidak menutupi isi. |
| Halaman jurusan di hasil | Tombol utama menjadi "Buka kotak" dan membuka kotak yang belum dibaca satu per satu. Setelah semua dibuka, tombol kembali menjadi "Lanjut". Ada tautan untuk melewati. |
| Grafik baru | Peta minat dan batang per pulau di halaman kartu, rincian tiga penyusun kemantapan, dan batang berdampingan di halaman bandingkan. |
| Poster hasil | Halaman sebelum halaman terakhir, berisi dua gambar. **Poster story** 1080 x 1920, kartu identitas untuk dibagikan: julukan (dari pasangan tipe), 3 stiker ciri-ciri, bentuk minat, peta pulau, 3 jurusan teratas dengan alasan singkat dan contoh pekerjaan, "Tipe ini sering jadi", dan ajakan main; ada 3 gaya warna; tanpa angka analisis dan jawaban pribadi. **Lembar hasil lengkap** 1800 x 1200 untuk disimpan atau ditunjukkan ke orang tua dan guru: alasan, pilihan lainnya, 6 teratas, posisi jurusan incaran, "Intinya", kelebihan, yang perlu dilatih, dan yang dicari dari pekerjaan (bisa dimatikan lewat centang). |

Yang perlu dicek setelah deploy: unduh dan bagikan poster di HP sungguhan (Android Chrome dan iPhone Safari), karena dua tombol itu belum bisa diuji dari tempat pembuatan.

## Revisi tampilan HP (13 November 2026, sore)

Hanya `index.html`. Pertanyaan dan hitungan nilai tidak berubah.

| Bagian | Perubahan |
|---|---|
| Huruf | Tidak ada teks di bawah 12,5px. Teks kecil naik ke 13 sampai 15px, pilihan jawaban ke 15 sampai 15,5px. Kotak isian 16px supaya iPhone tidak memperbesar layar saat mengetik. |
| Area ketuk | Semua tombol dan pilihan minimal 44px. Tombol geser kartu 58px, pilihan besar 66px. |
| Tombol Kembali dan Lanjut | Menempel di bawah layar selama memilih (babak 4, 6, 7), jadi tidak perlu menggulir sampai habis untuk lanjut. |
| Penanda gulir | Di layar memilih dan halaman hasil menyatu dengan bilah tombol, tidak lagi menutupi pilihan. |
| Layar kecil | Di bawah 400px, kartu dan jarak dirapatkan supaya pilihan dua kolom tetap lega. Di bawah 340px beberapa kisi menjadi satu kolom. Kartu geser menyesuaikan tinggi layar. |
| HP berponi | Bilah atas dan bawah memperhitungkan area aman layar. |
| Lain-lain | Getar halus saat memilih (HP yang mendukung), papan ketik menutup saat Enter, daftar jurusan otomatis bergulir ke layar setelah pulau diketuk. |

Diuji otomatis di ukuran 320x568, 360x640, 400x800, dan 412x915: tidak ada error, tidak ada halaman yang melebar ke samping. Belum diuji di HP sungguhan.

## Penajaman pertanyaan dan jalur kedinasan (13 November 2026, sore)

Bagian ini **mengubah pertanyaan dan hitungan nilai**, jadi penyeimbang (`OFF`, `GN`) sudah dihitung ulang dengan `alat/seimbangkan.js`.

### Yang ditambahkan

| Tambahan | Isi | Pengaruh ke nilai |
|---|---|---|
| Kartu keseharian | 22 kartu baru, satu per jurusan, berisi kegiatan sehari-harinya yang kurang gemerlap (id berawalan `k_`). Total kartu utama jadi 68, ditambah 4 kartu bonus. | Masuk ke nilai topik, setara dengan kartu topik lama |
| Bukti kebiasaan nyata | Dua pertanyaan baru di Babak 4: kegiatan waktu luang dan tontonan yang paling sering (masing-masing maksimal 3). Data: `HOBI`, `TONTON`. | Menggeser nilai paling banyak sekitar +6 atau -2 poin |
| Keseharian kerja | Di Babak 5, untuk 2 jurusan teratas pemain menilai 4 kegiatan harian sungguhan dari pekerjaannya (diambil dari `KERJA`). | 15% dari nilai jurusan itu |
| Jalur kedinasan | Satu pertanyaan di Babak 7 dan kotak "Jalur kedinasan" di halaman jurusan. Data: `DINAS`, `MDINAS`, `MKEMEN`. | Tidak mengubah nilai jurusan mana pun |

Di kotak "Kenapa nyambung" ada alasan baru, termasuk tanda kalau pemain suka topiknya tapi menolak kesehariannya.

### Hasil uji

Semua angka dari simulasi 20.000 pemain acak yang menjalani alur lengkap (`node alat/uji-alur.js`). Idealnya tiap jurusan jadi nomor 1 pada 4,55% pemain dan masuk 3 teratas pada 13,6%.

| Ukuran | Sebelum | Sesudah |
|---|---|---|
| Jadi nomor 1, paling jarang sampai paling sering | 3,5% sampai 5,4% | 3,6% sampai 5,9% |
| Masuk 3 teratas, paling jarang sampai paling sering | 10,3% sampai 16,5% | 11,5% sampai 16,6% |
| Pemain ideal tetap nomor 1 walau satu kartu utamanya salah geser | 12 dari 22 jurusan | 22 dari 22 jurusan |
| Besar penyeimbang yang dibutuhkan (`OFF`) | sampai 0,067 | sampai 0,018 |

Artinya keadilan antarjurusan setara dengan sebelumnya, sedangkan ketahanan terhadap salah geser naik jauh. Penyeimbang yang mengecil menunjukkan susunan kartunya sendiri sekarang lebih seimbang.

Uji ini tetap hanya membuktikan hitungannya adil dan tahan salah geser. Ketepatan sarannya baru bisa dibuktikan lewat penguji sungguhan.

### Catatan data kedinasan

- Sumber: pengumuman penerimaan 2026 dari Kementerian PANRB dan BKN lewat pemberitaan (Bisnis.com, menpan.go.id, Medcom, dan lainnya). Total 4.770 kursi di sembilan kementerian dan lembaga, pendaftaran 18 sampai 30 Agustus 2026 lewat sscasn.bkn.go.id, satu sekolah per pendaftar.
- Jumlah kursi STIS dan sekolah di bawah Kementerian Hukum serta Kementerian Imigrasi dan Pemasyarakatan tidak dicantumkan karena angkanya tidak ditemukan dengan pasti.
- Pemetaan jurusan ke sekolah (`MDINAS`) dan daftar kampus kementerian tanpa ikatan dinas (`MKEMEN`) adalah penilaian pembuat. `MKEMEN` belum dicek ke pengumuman resmi.
- Jadwal, kursi, dan syarat 2027 belum diumumkan. Perbarui `DINAS` setelah pengumuman keluar, biasanya pertengahan tahun.

### Yang belum dikerjakan dari usulan

Misi kedua berupa cerita baru per jurusan tidak dibuat. Sebagai gantinya dipakai penilaian keseharian kerja, karena memakai data pekerjaan yang sudah ada dan tidak menambah 22 cerita yang belum teruji.
