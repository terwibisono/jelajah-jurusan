# Rencana: Sehari Kuliah, Sehari Kerja

Tanggal: 14 November 2026
Status: **menunggu persetujuan**. Belum ada kode yang ditulis.
Branch kerja: `sehari-kuliah-kerja` (dari `main`).

Mode baru di Jelajah Jurusan: pemain menjalani **satu hari sebagai mahasiswa** jurusan itu, lalu **satu hari kerja** dari lulusannya. Tujuannya menangkap dua jenis salah pilih:
- suka bidangnya tapi kaget dengan kuliahnya (Psikologi ternyata ada statistik, Teknik Biomedis ternyata banyak fisika dan rangkaian listrik), dan
- betah kuliahnya tapi tidak membayangkan kerjanya.

Sekarang dua hal ini hanya muncul sebagai tulisan di kotak "Kuliahnya ngapain" dan "Sehari-hari kerja". Mode ini membuatnya dialami.

---

## 1. Alur satu jurusan (sekitar 6 sampai 8 menit)

### Babak A: Sehari kuliah (semester 3)
Lima adegan dengan jam di pojok layar:

| Jam | Adegan | Isi |
|---|---|---|
| 07.30 | Kuliah pagi | Mata kuliah khas yang paling sering bikin kaget |
| 10.00 | Praktikum, studio, atau lapangan | Kerja tangan khas jurusan itu |
| 13.00 | Tugas kelompok | Gaya kerja sama yang biasa di jurusan itu |
| 16.00 | Di luar kelas | Asistensi, organisasi, magang kecil, atau kunjungan |
| 21.00 | Malam | Deadline laporan, hafalan ujian, revisi, atau koding |

### Babak B: Sehari kerja
Pemain memilih satu pekerjaan dari daftar yang sudah ada (3 sampai 5 per jurusan), lalu empat adegan:

| Adegan | Isi |
|---|---|
| Pagi | Rutinitas yang dikerjakan hampir tiap hari |
| Masalah datang | Gangguan khas pekerjaan itu |
| Keputusan | Pilihan yang ada tarik-ulurnya |
| Akhir hari | Apa yang dibawa pulang: capek, puas, atau lembur |

### Isi tiap adegan
1. Situasi pendek, 2 sampai 3 kalimat.
2. Dua atau tiga pilihan tindakan. **Tidak ada pilihan yang salah.** Tiap pilihan punya akibat yang realistis.
3. Kartu "Ternyata…" di adegan yang membawa fakta kejutan (memakai data `fk` yang sudah ada, ditambah yang baru).
4. Satu pertanyaan rasa: **"Kalau ini tiap hari?"** Betah / Biasa / Ogah.

Supaya terasa game, ada tiga meteran yang bergerak sesuai pilihan: **Energi, Paham, Teman**. Meteran ini hanya suasana dan tidak dinilai.

---

## 2. Hasil

- **Grafik dua sumbu:** betah kuliah (mendatar) dan betah kerja (tegak), menghasilkan empat kemungkinan:
  - **Kuliah dan kerjanya cocok**
  - **Suka kuliahnya, kerjanya belum**: saran pekerjaan lain dari jurusan yang sama
  - **Kuliahnya berat, kerjanya kamu mau**: saran cara bertahan di mata kuliah yang berat
  - **Dua-duanya belum**: saran jurusan alternatif
- Adegan yang paling betah dan paling ogah, beserta alasannya.
- **Bandingkan:** kalau pemain mencoba lebih dari satu jurusan, hasilnya berdampingan (misalnya Teknik Biomedis dan Psikologi).
- Poster untuk dibagikan, dengan gaya yang sama seperti poster hasil.

---

## 3. Masuk dari mana

- Tombol **"Coba sehari"** di tiap jurusan pada halaman "Kenalan dengan jurusanmu".
- Dari halaman awal: **"Sudah punya incaran? Coba sehari di jurusannya"**, langsung pilih jurusan tanpa main dari awal.

**Tidak mengubah nilai minat 28 jurusan.** Penyeimbang dan uji keadilan yang ada tetap berlaku. Hasilnya tampil sebagai catatan di kotak jurusan dan ikut dikirim untuk penelitian. Kalau datanya nanti terbukti berguna, baru dipertimbangkan ikut menghitung.

---

## 4. Isi dan ketepatan

28 jurusan × 9 adegan = **sekitar 250 adegan**. Ini bagian paling berat dan paling berisiko salah.

- **Sumber kuliah:** daftar mata kuliah resmi dari situs prodi, minimal dua kampus per jurusan (negeri dan swasta). Adegan hanya memakai mata kuliah yang muncul di keduanya.
- **Sumber kerja:** data pekerjaan yang sudah ada, dicocokkan dengan daftar tugas O*NET untuk pekerjaan yang sama.
- **Penanda "belum dicek":** tiap jurusan menampilkan penanda ini sampai dibaca mahasiswa atau alumni sungguhan.
- **Tombol "Ada yang tidak sesuai?"** di akhir, terkirim ke Google Sheets.
- **Tidak ada kutipan atau testimoni karangan** dari "mahasiswa" atau "alumni".

### Tahapan
- **Tahap 1, 6 jurusan:** Teknik Biomedis, Psikologi, Kedokteran, Informatika, Hukum, Manajemen. Ini jurusan yang paling banyak peminatnya, ditambah dua jurusan yang sedang ditimbang iparmu. Diuji dulu ke mahasiswa sungguhan.
- **Tahap 2:** 22 jurusan sisanya, setelah bentuk adegannya terbukti jalan.

---

## 5. Tampilan

- **Delapan latar adegan** digambar dalam SVG dan dipakai ulang di semua jurusan: ruang kuliah, lab, studio, lapangan, rumah sakit, kantor, kamar kos malam, dan ruang rapat. Tanpa emoji.
- Karakter pemain tampil di adegan, jam di pojok berputar, dan meteran ada di atas.
- Pergantian adegan memakai animasi pendek yang sudah ada, dan semuanya mati kalau HP disetel "kurangi gerakan".

---

## 6. Teknis

- **Ukuran file:** `index.html` sudah sekitar 390 KB, dan 250 adegan menambah kira-kira 150 sampai 200 KB teks. Usulan: isi adegan disimpan sebagai file terpisah `sehari/<id-jurusan>.json` dan baru diunduh saat jurusan itu dibuka. Vercel menyajikannya sebagai file statis, jadi tidak perlu server tambahan.
- **Google Sheets:** tab baru `sehari` berisi id permainan, jurusan, pekerjaan, rasa per adegan, pilihan per adegan, dan laporan "tidak sesuai". Ini butuh perubahan di `receiver/apps-script.gs`, lalu **kamu perlu deploy ulang Apps Script**.
- **Versi kiriman:** `ver` baru supaya baris lama dan baru bisa dipisah.

---

## 7. Contoh adegan (untuk merasakan bentuknya, belum final)

**Psikologi, 07.30, kuliah Statistik.**
Dosen membagikan data skor kecemasan 60 mahasiswa sebelum dan sesudah ujian, lalu meminta kalian menguji apakah bedanya "bermakna". Laptop tetanggamu sudah membuka SPSS.
- Ikut langkah dosen pelan-pelan dan catat rumusnya
- Langsung coba di SPSS, nanti tanya kalau macet
- Tanya ke teman, "ini sebenarnya buat apa sih?"

*Ternyata:* hampir semua skripsi Psikologi memakai statistik, jadi mata kuliah ini terus terpakai sampai lulus.

**Teknik Biomedis, 10.00, praktikum instrumentasi.**
Tugas hari ini: merakit penguat sinyal jantung (EKG) di papan rangkaian, lalu melihat gelombangnya di osiloskop. Sudah 40 menit, yang muncul hanya garis bergetar.
- Cek ulang sambungan satu per satu dari skema
- Ganti komponen yang paling dicurigai
- Panggil asisten lab

*Ternyata:* di tahun-tahun awal, Teknik Biomedis lebih banyak kalkulus, fisika, dan elektronika daripada biologi.

---

## 8. Cara menguji sebelum dianggap selesai

1. `node alat/uji-alur.js` memberi angka yang sama (nilai minat tidak disentuh).
2. Keenam jurusan tahap 1 dimainkan penuh lewat tombol di 360×640 dan 390×844, kuliah lalu kerja, sampai poster, tanpa error.
3. Mode bandingkan dicoba dengan dua jurusan.
4. Kiriman ke tab `sehari` dicek dengan Apps Script versi uji.
5. Dengan setelan "kurangi gerakan", tidak ada animasi.
6. Tangkapan layar tiap latar dan hasil dikirim ke kamu.

Yang tidak bisa diuji dari sini: ketepatan isi menurut mahasiswa sungguhan. Itu tugas tahap uji dengan orang nyata.

---

## Yang perlu kamu jawab

1. **Tahap 1:** setuju enam jurusan itu, atau ada yang mau diganti?
2. **Nilai minat:** setuju mode ini tidak ikut menghitung nilai jurusan?
3. **Sehari kerja:** pemain memilih pekerjaannya sendiri, atau kita tentukan pekerjaan yang paling umum saja?
4. **Google Sheets:** siap deploy ulang Apps Script untuk tab `sehari`? Kalau belum, hasilnya hanya tersimpan di HP pemain dulu.
