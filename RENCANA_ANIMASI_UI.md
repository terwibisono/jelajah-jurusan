# Rencana: animasi perjalanan, pemilih 3 jurusan, dan perapian warna

Tanggal: 14 November 2026
Status: **dikerjakan** di branch ini, belum digabung ke `main`. Keputusan yang diambil: animasi A sampai I semua; tombol "Buka kotak" dihapus; Teknik oranye kecokelatan dengan teks putih; teks abu-abu `#4b6277` (bukan `#50687d`). Rinciannya di `CATATAN_PERUBAHAN.md`.
Branch kerja: `animasi-pemilih-warna` (lanjutan dari `singkat-alur`).

Tiga pekerjaan ini hanya menyentuh tampilan di `index.html`. Pertanyaan, hitungan nilai, penyeimbang, dan data yang dikirim ke Google Sheets tidak berubah.

---

## 1. Animasi selama perjalanan

Tujuannya supaya babak kartu dan perpindahan layar tidak terasa datar. Semua animasi pendek (di bawah setengah detik, kecuali konfeti) dan tidak menahan pemain: tombol tetap bisa langsung ditekan.

| # | Di mana | Animasinya | Catatan |
|---|---|---|---|
| A | Babak kartu, di atas kartu | **Kapal berlayar** ⛵ di atas ombak yang bergerak, maju tiap kartu dijawab, menuju pulau 🏝️ di ujung kanan | Jadi penunjuk progres. Bagian 1 = 45% jalur, bagian 2 = sisanya |
| B | Babak kartu, saat menjawab | **Percikan emoji** dari tengah kartu: 💛⭐😍 untuk Suka/Aku banget, 🤔💭 untuk Biasa aja/Kadang, 💨👋 untuk Bukan aku | 6 emoji, hilang dalam 1 detik |
| C | Babak kartu, kartu berikutnya | Kartu baru **muncul memantul** dari bawah | Menggantikan pergantian yang sekarang langsung |
| D | Babak kartu, tiap 10 kartu | **Sorakan singkat** di atas kartu: "10 kartu! Kapalmu melaju!" | Bergantian 6 kalimat. Tidak muncul bersamaan dengan pesan "Bagian 2" |
| E | Kepala layar | Angka **poin membesar sebentar** dan **karakter melompat** tiap dapat poin | Berlaku di semua babak |
| F | Kepala layar | Titik babak yang sedang aktif **berdenyut** | |
| G | Semua pergantian layar | Kartu layar baru **naik dan muncul** halus | Termasuk pindah halaman di hasil |
| H | Adu pilihan, misi, kotak hasil | Tombol **mengecil sedikit saat ditekan** | Umpan balik sentuhan |
| I | Hasil pertama kali terbuka | **Konfeti** jatuh dari atas selama ±3 detik | Hanya sekali, saat permainan selesai. Tidak muncul saat membuka hasil lama |

**Yang sengaja tidak dibuat**
- Suara dan getar (mengganggu di kelas atau kantor, dan izin getar berbeda tiap HP).
- Maskot baru atau gambar tambahan (menambah ukuran file; aplikasi ini satu file HTML).
- Animasi panjang di antara babak yang harus ditunggu.

**Aksesibilitas**
- Kalau HP disetel "kurangi gerakan" (*prefers-reduced-motion*), semua animasi mati. Percikan emoji dan konfeti tidak dibuat sama sekali, kapal tetap tampil tapi diam.
- Emoji hiasan diberi `aria-hidden` supaya tidak dibacakan pembaca layar.

---

## 2. Hasil: 3 jurusan jadi kotak yang dipilih sendiri

**Sekarang:** tiap jurusan satu halaman (halaman 8, 9, 10, dan seterusnya), dibuka berurutan lewat "Lanjut", dengan layar jeda di antaranya.

**Usulan:** satu halaman "Kenalan dengan jurusanmu" dengan **3 kotak berdampingan** di atas. Ketuk kotak mana saja, isinya tampil di bawah. Bebas mulai dari mana dan bisa pindah kapan saja.

Isi tiap kotak:
- nomor urut (1, 2, 3) dalam lingkaran berwarna pulau
- nama pendek jurusan
- persentase minat
- "2/7 dibuka" supaya terlihat mana yang belum dijelajahi

Kotak yang sedang dibuka berwarna penuh, yang lain putih bergaris warna pulau.

**Dampak ke bagian lain**
- **Jurusan incaran di luar 3 besar** ikut jadi kotak keempat (dan kelima) di baris kedua, bertanda ★ dan tulisan "incaranmu".
- **Jumlah halaman hasil** turun dari 12–14 menjadi 10 (11 kalau ada incaran, karena ada halaman "Cek jurusan incaran").
- **Tombol "Buka kotak"** dan tautan "Lewati kotak" dihapus. Di halaman ini tombol bawah selalu "Lanjut". Kotak isi jurusan (Kuliahnya ngapain, Sehari-hari kerja, Kampus, dan lainnya) tetap dibuka dengan diketuk.
- **Layar jeda antar jurusan** tidak dipakai lagi.
- **Dasbor:** "babak" yang tercatat di tab kunjungan ikut berubah karena jumlah halaman berkurang. Angka sesudah versi ini tidak bisa dibandingkan langsung dengan sebelumnya.

**Yang perlu kamu putuskan**
- Apakah tombol bawah tetap perlu "memaksa" membuka semua kotak isi jurusan seperti sekarang? Usulan saya: tidak, karena kamu ingin pemain memilih sendiri.

---

## 3. Warna dan keterbacaan

Saya ukur kontras warna utama terhadap standar WCAG AA (minimal **4,5 : 1** untuk teks ukuran biasa). Yang belum lolos adalah **teks putih di atas warna pulau** (label pulau, nomor urut, tombol "Suka") dan teks abu-abu di latar laut.

| Warna | Sekarang | Kontras | Usulan | Kontras |
|---|---|---|---|---|
| Kesehatan | `#e2574c` | 3,7 | `#c54c42` | 4,6 |
| Teknologi | `#2b7fd6` | 4,1 | `#2876c7` | 4,6 |
| Teknik | `#d98a1f` | 2,8 | `#a36817` | 4,6 |
| Bisnis (juga tombol "Suka") | `#1f9d76` | 3,4 | `#1a8463` | 4,6 |
| Kreatif | `#e0499a` | 3,8 | `#c74189` | 4,6 |
| Sumber Daya Manusia | `#8a5cd0` | 4,6 | tetap | 4,6 |
| Teks abu-abu (di latar laut) | `#587086` | 4,4 | `#50687d` | ≥ 4,6 |

Yang sudah lolos dan tidak diubah: teks biru tua di putih (13,5), biru tua di kuning (8,8), tautan (6,6).

**Akibat yang terlihat**
- Semua warna pulau sedikit lebih tua, di aplikasi **dan** di poster serta lembar hasil. Coraknya sama, hanya lebih pekat.
- **Teknik** berubah paling banyak: dari oranye terang jadi oranye kecokelatan, karena oranye terang memang tidak bisa memuat teks putih yang terbaca. Pilihan lain: pertahankan oranye terang dan pakai **teks biru tua** di atasnya, bukan putih. Tolong pilih salah satu.

**Perapian lain yang ikut dikerjakan**
- Ukuran sentuh minimal 44 px untuk kotak pemilih jurusan.
- Garis fokus yang jelas saat memakai keyboard pada kotak pemilih.
- Cek ulang poster dan lembar hasil di 3 gaya warna setelah warna pulau diganti.

**Di luar cakupan kali ini**
- Mengganti jenis huruf atau merombak tata letak layar.
- Mode gelap.

---

## Cara menguji sebelum dianggap selesai

1. `node alat/uji-alur.js` harus memberi angka yang sama dengan sekarang (hitungan tidak disentuh).
2. Main penuh lewat tombol di layar 390×844, dua pemain acak, sampai poster tanpa error.
3. Halaman hasil: ketuk tiap kotak jurusan, pastikan isi dan hitungan "x/y dibuka" benar, termasuk dengan jurusan incaran di luar 3 besar.
4. Untuk tiap 28 jurusan: semua halaman dan kotak dibuka, poster dan lembar digambar, tanpa error dan tanpa teks terpotong.
5. Setelan "kurangi gerakan" dinyalakan: tidak ada animasi yang berjalan.
6. Tangkapan layar babak kartu, pemilih jurusan, dan poster dikirim ke kamu untuk dilihat.

Belum bisa saya uji dari sini: kelancaran animasi di HP sungguhan (terutama HP lama) dan tampilan warna di layar aslinya.

---

## Yang perlu kamu jawab

1. **Animasi:** semua A–I, atau ada yang dicoret?
2. **Pemilih jurusan:** setuju tombol "Buka kotak" dihapus?
3. **Warna Teknik:** oranye kecokelatan dengan teks putih, atau oranye terang dengan teks biru tua?
4. **Gabung ke `main`:** `singkat-alur` (kartu bercabang, 28 jurusan, alur ringkas) masih belum live. Digabung sekarang, atau menunggu pekerjaan ini selesai?
