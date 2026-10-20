# Rencana Pengumpulan Data

Proyek: Optimasi Topologi Access Point dan Manajemen Bandwidth di Kampus Viktor UNPAM
Kelompok 2: Muhammad Zirlda Prairi (PM), Dzaky Alfareza, Rizky Zehan's Onassis, Vigie Afrilza Wibowo
Status: draf untuk didiskusikan, belum ada data yang terkumpul

## Tujuan dokumen

Proposal lama ditolak salah satunya karena datanya tipis: banyak "pengamatan" tanpa tanggal, jam, atau bukti. Dokumen ini mengatur data apa yang diambil, dengan cara apa, kapan, oleh siapa, dan disimpan di mana. Setiap data yang nanti muncul di proposal harus bisa ditunjuk buktinya di folder `data/`.

## Batas fokus

Yang dikumpulkan hanya data yang menjawab dua pertanyaan dari judul:

1. Apakah jumlah dan letak access point (AP) sudah cukup untuk jumlah pengguna?
2. Apakah internet kampus sudah dibagi dengan adil, terutama pada jam padat?

Yang **tidak** dikumpulkan walaupun terlihat berkaitan: kecepatan portal akademik atau presensi, sinyal seluler 4G/5G, kondisi website kampus, keluhan fasilitas gedung lain. Kalau ada temuan seperti ini di lapangan, cukup dicatat di kolom "catatan lain" dan tidak masuk proposal.

---

## Ceklis lengkap

### A. Persiapan (sebelum turun ke lapangan)

- [ ] A1. Sepakati lantai dan ruang sampel: usul 3 lantai (bawah, tengah, atas), 3 titik per lantai (dekat AP, jauh dari AP, ujung lorong/kelas pojok)
- [ ] A2. Cek jadwal kuliah untuk menentukan jam sepi dan jam padat (lihat bagian "Jadwal pengambilan")
- [ ] A3. Buat surat permohonan izin pengambilan data ke pihak kampus, ditandatangani PM dan diketahui dosen pengampu
- [ ] A4. Siapkan aplikasi yang sama di semua HP anggota (lihat bagian "Alat")
- [ ] A5. Sepakati satu server uji kecepatan yang sama untuk semua pengukuran, dicatat namanya
- [ ] A6. Siapkan lembar catatan lapangan (cetak atau Google Sheets, format di bagian "Format pencatatan")
- [ ] A7. Buat folder `data/` beserta subfolder dan aturan penamaan file
- [ ] A8. Susun dan uji coba kuesioner ke 3 orang dulu sebelum disebar
- [ ] A9. Atur jam HP semua anggota ke waktu otomatis (agar jam di tangkapan layar seragam)

### B. Observasi lapangan (foto dan denah)

- [ ] B1. Hitung jumlah AP di tiap lantai sampel
- [ ] B2. Foto setiap AP yang terlihat (letaknya, bukan hanya perangkatnya), beri nomor AP-L{lantai}-{urut}
- [ ] B3. Catat merek/tipe AP kalau terbaca dari label (jangan dibongkar atau disentuh)
- [ ] B4. Gambar denah sederhana tiap lantai: ruang kelas, lorong, letak AP (boleh tangan, lalu difoto)
- [ ] B5. Hitung jumlah ruang kelas per lantai dan kapasitas kursi per ruang (sampel 3 ruang per lantai)
- [ ] B6. Hitung kehadiran nyata di ruang sampel pada jam padat (jumlah orang, bukan nama)
- [ ] B7. Catat penghalang sinyal yang mencolok di dekat AP (dinding tebal, AP tertutup plafon, dll.)

### C. Pengukuran kecepatan dan kestabilan internet

- [ ] C1. Uji kecepatan (unduh, unggah, waktu respon) di tiap titik sampel, tiap sesi jadwal
- [ ] C2. Simpan tangkapan layar hasil uji yang memperlihatkan tanggal dan jam
- [ ] C3. Ekspor riwayat uji dari aplikasi (Speedtest menyimpan riwayat lengkap dengan waktu)
- [ ] C4. Uji kestabilan: tetap tersambung 30 menit di satu titik, catat berapa kali koneksi putus dan jam kejadiannya
- [ ] C5. Pindai daftar jaringan WiFi dengan aplikasi penganalisis: catat nama jaringan, kanal, dan kekuatan sinyal yang terlihat di tiap titik, simpan tangkapan layarnya
- [ ] C6. Ulangi C1 sampai C5 dengan akun paket silver dan gold bila ada anggota/relawan yang berlangganan
- [ ] C7. Catat kondisi saat pengukuran: jumlah orang di ruangan, HP dalam mode apa (fitur pindah otomatis ke data seluler dimatikan)

### D. Kuesioner pengguna

- [ ] D1. Buat Google Form (daftar pertanyaan di bagian "Draf kuesioner")
- [ ] D2. Sebar ke mahasiswa lintas lantai dan jam kuliah, target minimal 50 responden
- [ ] D3. Sebar versi singkat ke dosen, target minimal 5 responden
- [ ] D4. Tutup kuesioner pada tanggal yang disepakati, ekspor hasilnya ke `data/kuesioner/`
- [ ] D5. Rekap jawaban jadi tabel persentase sederhana

### E. Wawancara

- [ ] E1. Wawancara pengelola jaringan kampus (daftar pertanyaan di bagian "Draf wawancara")
- [ ] E2. Wawancara 2 sampai 3 dosen tentang pengalaman memakai WiFi di kelas
- [ ] E3. Rekam suara atas izin narasumber, atau catat poin dan minta narasumber membaca ulang
- [ ] E4. Tulis ringkasan wawancara paling lambat sehari setelahnya, cantumkan tanggal, jam, tempat, jabatan narasumber (nama boleh disamarkan)

### F. Dokumen pendukung

- [ ] F1. Tangkapan layar halaman login WiFi kampus dan daftar paket (silver, gold, harga, kecepatan yang dijanjikan)
- [ ] F2. Tangkapan layar halaman aturan pemakaian WiFi bila ada (batas perangkat, batas waktu sesi)
- [ ] F3. Data resmi dari pengelola jaringan bila diizinkan: jumlah AP, kapasitas internet kampus, aturan pembagian bandwidth, catatan keluhan
- [ ] F4. Bila data F3 ditolak, catat penolakannya (tanggal, alasan) sebagai batasan proyek

### G. Pengolahan dan pemeriksaan

- [ ] G1. Masukkan semua angka ke satu spreadsheet induk `data/rekap_pengukuran.xlsx`
- [ ] G2. Periksa ulang: setiap baris punya tanggal, jam, lantai, titik, dan nama file bukti
- [ ] G3. Hitung rata-rata per lantai dan per sesi (sepi vs padat)
- [ ] G4. Bandingkan kecepatan nyata dengan kecepatan paket yang dijanjikan
- [ ] G5. Hitung perkiraan jumlah pengguna per AP dari data B1, B5, B6
- [ ] G6. Pilih 3 sampai 5 temuan paling kuat untuk dipakai di Bab Analisis Masalah, sisanya ke lampiran
- [ ] G7. Diskusi tim: apakah datanya sudah cukup, atau perlu pengambilan ulang

---

## Alat

| Kebutuhan                    | Alat                                                                           | Catatan                                                  |
| ---------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Uji kecepatan                | Aplikasi Speedtest (Ookla)                                                     | Riwayat tersimpan otomatis lengkap dengan waktu          |
| Cadangan uji kecepatan       | fast.com                                                                       | Untuk pembanding bila Speedtest gagal                    |
| Pindai kanal dan sinyal WiFi | Aplikasi WiFi Analyzer di Android                                              | iPhone tidak bisa, jadi dipakai oleh anggota ber-Android |
| Uji kestabilan               | Stopwatch HP + catatan manual, atau laptop yang menjalankan ping terus-menerus | Laptop opsional                                          |
| Kuesioner                    | Google Form                                                                    | Tanpa meminta nama atau NIM                              |
| Rekap                        | Google Sheets atau Excel                                                       | Satu file induk                                          |
| Foto dan denah               | Kamera HP                                                                      | Pastikan tanggal tersimpan di file                       |

## Jadwal pengambilan (usulan, sesuaikan setelah A2)

| Sesi           | Jam (usulan)                       | Alasan                                |
| -------------- | ---------------------------------- | ------------------------------------- |
| S1 Sepi        | sebelum kuliah pagi dimulai        | Sebagai pembanding kondisi normal     |
| S2 Padat siang | pertengahan jam kuliah siang       | Banyak kelas berjalan bersamaan       |
| S3 Padat malam | pertengahan jam kuliah kelas malam | Kelas karyawan, pola pengguna berbeda |

Usulan jumlah pengukuran: 3 lantai × 3 titik × 3 sesi × 5 hari kuliah = 135 data uji kecepatan. Kalau terlalu berat, kurangi jumlah hari, bukan jumlah sesi, supaya perbandingan sepi dan padat tetap ada.

| Minggu | Kegiatan                                                           | Tanggal (usulan)          |
| ------ | ------------------------------------------------------------------ | ------------------------- |
| 1      | Persiapan A1 sampai A9, sebar kuesioner, ajukan izin dan wawancara | 19 sampai 24 Oktober 2026 |
| 2      | Observasi B, pengukuran C, wawancara E, dokumen F                  | 26 sampai 31 Oktober 2026 |
| 3      | Tutup kuesioner, pengolahan G, diskusi kecukupan data              | 2 sampai 7 November 2026  |

## Pembagian tugas (usulan)

| Anggota                     | Tanggung jawab utama                                            |
| --------------------------- | --------------------------------------------------------------- |
| Muhammad Zirlda Prairi (PM) | Surat izin, wawancara pengelola jaringan, pemeriksaan G2 dan G7 |
| Dzaky Alfareza              | Observasi B (foto AP, denah, hitung ruang dan orang)            |
| Rizky Zehan's Onassis       | Pengukuran C di lantai sampel, pindai kanal WiFi                |
| Vigie Afrilza Wibowo        | Kuesioner D, wawancara dosen, rekap G1 dan G3                   |

Pengukuran C melibatkan semua anggota sesuai jadwal masing-masing, karena satu sesi butuh 3 titik diukur pada jam yang sama.

## Format pencatatan

### Lembar pengukuran (satu baris per uji)

| Tanggal    | Jam   | Sesi | Lantai | Titik | Ruang | Jumlah orang di ruang | Paket  | Unduh (Mbps) | Unggah (Mbps) | Waktu respon (ms) | Putus (kali/30 menit) | File bukti                | Petugas | Catatan lain |
| ---------- | ----- | ---- | ------ | ----- | ----- | --------------------- | ------ | ------------ | ------------- | ----------------- | --------------------- | ------------------------- | ------- | ------------ |
| 2026-10-27 | 13.15 | S2   | 3      | T2    | 3xx   | 34                    | gratis |              |               |                   |                       | 2026-10-27_1315_L3_T2.png | Rizky   |              |

### Lembar observasi AP

| Kode AP | Lantai | Letak (dekat ruang apa) | Merek/tipe terbaca | Foto | Catatan |
| ------- | ------ | ----------------------- | ------------------ | ---- | ------- |

### Aturan penamaan file

`TANGGAL_JAM_LANTAI_TITIK_jenis.png`, contoh `2026-10-27_1315_L3_T2_speedtest.png`.

### Struktur folder

```
data/
├── foto-ap/
├── denah/
├── speedtest/
├── analisis-kanal/
├── kestabilan/
├── kuesioner/
├── wawancara/
├── dokumen/            (paket WiFi, surat izin, data resmi)
└── rekap_pengukuran.xlsx
```

## Draf kuesioner mahasiswa

Tanpa nama dan NIM. Pertanyaan pilihan ganda kecuali disebutkan lain.

1. Biasanya kuliah di lantai berapa? (pilihan lantai)
2. Jadwal kuliah: pagi, siang, malam
3. Memakai WiFi kampus jenis apa? gratis, silver, gold, tidak memakai
4. Berapa perangkat yang tersambung ke WiFi kampus saat kuliah? 0, 1, 2, lebih dari 2
5. Seberapa sering koneksi WiFi putus dalam satu pertemuan kuliah? tidak pernah, 1 sampai 2 kali, 3 sampai 5 kali, lebih dari 5 kali
6. Pada jam berapa WiFi paling terasa lambat? (pilihan rentang jam)
7. Di bagian ruangan mana WiFi paling buruk? dekat pintu, tengah, belakang, tidak tahu
8. Kalau berlangganan: apakah kecepatan yang didapat sesuai paket? sesuai, kadang sesuai, jarang sesuai, tidak pernah sesuai
9. Apa yang dilakukan saat WiFi bermasalah? pindah ke data seluler, pindah tempat, menunggu, berhenti memakai internet
10. Skala 1 sampai 5: seberapa puas dengan WiFi kampus saat jam kuliah?
11. (isian, opsional) Ceritakan satu kejadian WiFi bermasalah yang paling diingat, sebutkan hari dan jam bila ingat

Versi dosen memakai pertanyaan 1, 2, 5, 6, 9, 10, 11.

## Draf wawancara pengelola jaringan

1. Berapa jumlah AP di Gedung Viktor, dan berapa per lantai?
2. Berapa perangkat yang idealnya dilayani satu AP menurut spesifikasinya?
3. Berapa kapasitas internet kampus yang masuk ke Gedung Viktor?
4. Bagaimana internet dibagi saat ini: per akun, per paket, atau per perangkat?
5. Apakah ada pengaturan yang mendahulukan pengguna atau layanan tertentu?
6. Kapan terakhir kali susunan AP ditinjau atau diubah?
7. Keluhan apa yang paling sering masuk, dan apakah tercatat?
8. Apakah ada data pemakaian harian yang boleh kami lihat (jam tersibuk, jumlah pengguna)?
9. Batasan apa yang perlu kami patuhi selama mengambil data?

## Hubungan data dengan bab proposal

| Data               | Dipakai di bab                | Menjawab                                                |
| ------------------ | ----------------------------- | ------------------------------------------------------- |
| B1, B2, B4, B5, B6 | Analisis Masalah, Perancangan | Satu AP melayani berapa orang, letaknya di mana         |
| C1 sampai C3, G3   | Analisis Masalah              | Seberapa lambat pada jam padat dibanding jam sepi       |
| C4                 | Analisis Masalah              | Seberapa sering koneksi putus                           |
| C5                 | Perancangan                   | Apakah AP yang berdekatan saling mengganggu             |
| C6, F1, G4         | Analisis Masalah, Kebutuhan   | Kecepatan nyata vs kecepatan yang dijanjikan            |
| D                  | Analisis Masalah, Kebutuhan   | Seberapa banyak orang yang merasakan masalah, dan kapan |
| E1, F3             | Kebutuhan, Perancangan, Biaya | Kondisi resmi dan batasan dari pihak kampus             |
| E2                 | Analisis Masalah              | Cerita nyata dari pengguna untuk narasi                 |

## Aturan menjaga data tetap kuat

1. Data tanpa tanggal, jam, dan bukti file tidak dipakai di proposal.
2. Satu angka, satu sumber. Kalau angka yang sama muncul di dua bab, nilainya harus sama persis.
3. Asumsi ditulis sebagai asumsi dan diberi alasan, tidak disamarkan sebagai fakta.
4. Tidak ada identitas pribadi responden atau relawan di proposal.
5. Kalau data tidak bisa didapat (misalnya ditolak pengelola), tulis apa adanya sebagai batasan.

## Pertanyaan untuk diskusi tim

- [ ] Jumlah lantai sampel 3 sudah cukup, atau perlu lebih?
- [ ] Siapa yang punya langganan silver atau gold untuk uji C6?
- [ ] Siapa kontak pengelola jaringan Gedung Viktor, dan lewat jalur apa izin diajukan?
- [ ] Target 50 responden realistis dalam satu minggu?
- [ ] Tanggal usulan sudah cocok dengan jadwal kuliah dan tenggat proposal?
