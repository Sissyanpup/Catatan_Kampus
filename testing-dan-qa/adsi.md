# Rangkuman Modul: Analisis dan Desain Sistem Informasi (ADSI)

Catatan mata kuliah Testing dan QA — rangkuman dari Modul Kuliah "Analisis dan Desain Sistem Informasi" (182 halaman).

## 1. Pendahuluan & SDLC

**Sistem Informasi** dikembangkan melalui siklus yang disebut **System Development Life Cycle (SDLC)** — proses pengembangan software yang mencakup kebutuhan (requirement), validasi, pelatihan, dan kepemilikan sistem (user ownership), diperoleh lewat investigasi, analisis, desain, implementasi, dan perawatan software.

Empat kegiatan utama SDLC: **initiation → analysis → design → implementation**.

### Tahapan SDLC (versi lebih rinci)

1. **System initiation** — perencanaan awal proyek: mendefinisikan lingkup (scope), tujuan, jadwal, dan anggaran bisnis awal.
2. **Perencanaan (planning)** — mengumpulkan informasi tentang masalah & persyaratan, menentukan kriteria dan batasan pemecahan.
3. **Analisis (analysis)** — menguji alternatif pemecahan berdasarkan kriteria & batasan — pusat dari semua proses pengembangan.
4. **Desain (design)** — hasil dari sistem baru; pemecahan optimum atas kebutuhan.
5. **Implementasi (implementation)** — sistem dibentuk dan dioperasikan.
6. **Perawatan (maintenance)** — dilakukan pada tiap sistem yang sudah operasional.

> Catatan penting: tahapan SDLC **bersifat iteratif**, bukan linier — pekerjaan pada satu tahap sering harus diulang, dan hasil sebuah tahap mungkin perlu dikoreksi ulang.

Penyebab kegagalan sistem informasi klasik: kegagalan menentukan tuntutan & peran serta pemakai, sulit memperoleh komputer dari produsen, staf tidak memenuhi syarat, batas waktu tidak realistis, manajemen tidak memadai.

## 2. Analisis Sistem

Tahapan analisis sistem mencakup: penetapan ruang lingkup, analisis kebutuhan (requirement engineering), analisis keputusan, hingga penyusunan **Dokumen Spesifikasi Kebutuhan Sistem**.

- **Kebutuhan fungsional** — kebutuhan sehari-hari pengguna & stakeholder yang harus dipenuhi sistem.
- **Kebutuhan nonfungsional** — performansi, kemudahan penggunaan, kehandalan, keamanan, keuangan, legalitas, operasional.

Teknik pengumpulan data: **wawancara, observasi, kuisioner**.

## 3. Desain Sistem — Dasar OOP

- **Objek & Kelas** — objek adalah instansiasi dari kelas; kelas adalah cetak biru (blueprint) objek.
- **Enkapsulasi** — pembungkusan data dan metode dalam satu kesatuan, membatasi akses langsung dari luar.
- **Atribut** — data/properti yang dimiliki kelas.
- **Operasi/Metode (Method)** — perilaku/fungsi yang dimiliki kelas.
- **Package** — pengelompokan kelas-kelas yang berkaitan.
- **Antarmuka (Interface)** — kontrak metode yang harus diimplementasikan kelas.

## 4. Pengenalan UML & Use Case

**Use Case Diagram** = pemodelan untuk menggambarkan _behavior_ (kelakuan) sistem — interaksi antara satu/lebih **aktor** dengan sistem. Fungsinya: mengetahui fungsi apa saja di sistem dan siapa yang berhak memakainya.

> Use case diagram **bukan** untuk menggambarkan tampilan UI, arsitektur sistem, kebutuhan nonfungsional, atau target performansi. Penamaan use case: simpel, pakai kata kerja.

### Simbol Use Case Diagram

| Simbol                           | Deskripsi                                                                                                                                           |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use case** (oval)              | Fungsionalitas yang disediakan sistem; nama pakai kata kerja di awal frase                                                                          |
| **Aktor** (stick figure)         | Orang/proses/sistem lain di luar sistem yang berinteraksi dengannya; walau simbolnya gambar orang, aktor belum tentu manusia; nama pakai kata benda |
| **Asosiasi** (garis)             | Komunikasi antara aktor dan use case                                                                                                                |
| **Ekstensi / extend**            | Relasi use case tambahan yang bisa berdiri sendiri tanpa use case utamanya (mirip inheritance); panah mengarah ke use case yang ditambahkan         |
| **Generalisasi**                 | Hubungan umum–khusus antar dua use case; panah mengarah ke use case yang lebih umum                                                                 |
| **Menggunakan / include / uses** | Use case tambahan yang **wajib dijalankan** sebagai syarat use case utama; panah mengarah ke use case yang dipakai                                  |

### Menemukan Aktor

Caranya dengan bertanya:

- **SIAPA** yang akan menggunakan sistem?
- **APAKAH** sistem memberikan **NILAI** bagi aktor tersebut?

Aktor tidak selalu manusia — bisa sistem lain, dengan syarat: sistem kita bergantung padanya, atau sistem itu meminta (request) informasi dari sistem kita. Penamaan aktor sesuai **peran**-nya, bukan nama orang.

_Contoh kasus (sistem pencatatan penjualan supermarket):_ aktornya adalah Kasir, Manajer, Bagian Gudang, Printer, Mesin debit ATM — **bukan** pelanggan, karena pelanggan tidak berinteraksi langsung dengan sistem (nilai bagi pelanggan disalurkan lewat kasir).

### Menemukan Use Case

Sebuah use case **harus memberi NILAI** bagi aktor — kalau tidak, use case itu terlalu kecil/tidak valid.

Pertanyaan dari sudut pandang aktor:

- Informasi apa yang didapat aktor dari sistem?
- Ada kejadian sistem yang perlu diberitahukan ke aktor?

Dari sudut pandang sistem:

- Ada informasi yang perlu disimpan/diambil?
- Ada informasi yang harus dimasukkan aktor?

### Deskripsi / Skenario Use Case

Setiap use case dijelaskan lewat skenario berisi:

- **Nama use case** (kata kerja)
- **Deskripsi** — tujuan & nilai yang didapat aktor
- **Pre-condition** — kondisi sebelum use case dijalankan
- **Post-condition** — kondisi setelah use case selesai
- **Basic flow** — alur normal/benar
- **Alternative flow** — alur alternatif di luar alur normal

### Kesalahan Umum

Use case **bukan** sekadar "function" atau item menu — menggambarkan use case sebagai penguraian fungsi kecil-kecil (_functional decomposition_, misal: tambah/ubah/hapus pemesanan tanpa use case "melakukan pemesanan" itu sendiri) itu salah, karena tidak semua pecahan itu memberi nilai berdiri sendiri ke aktor. Fokuslah pada use case yang benar-benar menghasilkan nilai bagi aktor.

## 5. Diagram Kelas — Relasi Antar Kelas

| Relasi           | Deskripsi                                                                                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Asosiasi**     | Hubungan statis antar kelas — kelas memiliki atribut berupa kelas lain / harus tahu eksistensi kelas lain. Ditandai anak panah, sering dengan label & multiplicity                           |
| **Agregasi**     | Hubungan "bagian dari" — satu kelas/objek adalah bagian dari kelas/objek lain                                                                                                                |
| **Generalisasi** | Relasi ke atas dari subkelas ke superkelas (notasi segitiga) — subkelas mewarisi fitur superkelas, bisa _overriding_ metode                                                                  |
| **Dependency**   | Perubahan pada satu kelas memengaruhi kelas lain yang bergantung padanya; hanya berlaku satu arah; notasi panah garis putus-putus, bisa pakai keyword `<<parameter>>`, `<<use>>`, `<<call>>` |

## 6. Diagram UML Lainnya (Ringkas)

- **Diagram Objek** — menggambarkan instance nyata dari diagram kelas pada suatu titik waktu.
- **Diagram Interaksi (Sequence & Collaboration)** — menjelaskan urutan proses/pesan antar objek untuk mencapai tujuan use case tertentu.
- **Diagram Status (State Diagram)** — menggambarkan status, event, dan transisi yang dialami sebuah objek sepanjang siklus hidupnya (termasuk _composite state_).
- **Diagram Aktivitas (Activity Diagram)** — menggambarkan alur kerja/proses bisnis langkah demi langkah, mirip flowchart.
- **Diagram Komponen** — menggambarkan organisasi & ketergantungan antar komponen software (modul, library, dsb).
- **Diagram Deployment** — menggambarkan arsitektur fisik sistem: bagaimana komponen software ditempatkan pada perangkat keras/infrastruktur.

## 7. Kohesi dan Kopling (Kualitas Desain — Penting untuk QA)

**Functional Independence** adalah kunci perancangan yang baik dan kunci kualitas program — hasil pertumbuhan dari konsep abstraksi dan _information hiding_. Modul yang independen: mudah dibagi ke tim, mudah diubah, error tidak mudah merambat, lebih _reusable_.

Independensi fungsional diukur dengan dua kriteria: **Kohesi** dan **Kopling**.

### Kohesi (Cohesion)

Ukuran seberapa terpadu/berkaitan elemen-elemen **di dalam satu modul**. Makin tinggi kohesi (_high cohesion_), makin baik.

Jenis-jenis kohesi (dari **terendah ke tertinggi**):

1. **Coincidental cohesion** — elemen dalam modul tidak punya hubungan berarti, cuma kebetulan berada di tempat yang sama
2. **Logical cohesion** — elemen punya tugas serupa / masuk kelas logika yang sama
3. **Temporal cohesion** — elemen dikumpulkan karena harus dieksekusi di waktu yang sama
4. **Procedural cohesion** — elemen dihubungkan & dieksekusi dalam urutan spesifik
5. **Communication cohesion** — elemen berproses pada satu area struktur data yang sama
6. **Sequential cohesion** — keluaran satu elemen jadi masukan elemen berikutnya secara berurutan
7. **Functional cohesion** (tertinggi) — seluruh elemen modul hanya melakukan **satu fungsi tunggal** yang terdefinisi baik, tanpa bergantung pada modul lain

**Dampak kohesi rendah (_low cohesion_):** sulit dipahami, sulit dipelihara (perubahan logika di satu modul merambat ke modul lain), sulit digunakan ulang.

### Kopling (Coupling)

Ukuran seberapa **saling bergantung** antar modul/kelas. Makin rendah kopling (_low coupling_), makin baik — modul yang independen dikatakan punya kopling rendah.

Jenis-jenis kopling:

1. **Data coupling** — modul berkomunikasi lewat item data tunggal atau elemen array
2. **Stamp coupling** — modul berkomunikasi lewat kelompok item data (record/larik multi-field)
3. **Control coupling** — satu modul mengendalikan alur/logika modul lain lewat flag
4. **External coupling** — modul terikat pada lingkungan luar (eksternal) dari perangkat lunak
5. **Common coupling** — modul-modul berbagi data di area memori yang sama
6. **Content coupling** (paling buruk) — satu modul langsung memakai/mengendalikan data modul lain tanpa lewat parameter, termasuk percabangan langsung ke tengah modul lain

### Ciri Desain OO yang Baik

- **High cohesion** (functional cohesion) — modul hanya melakukan satu tugas, minim interaksi dengan modul lain
- **Low coupling** — kopling antar modul selemah mungkin (independen)

> Target desain yang baik: **high cohesion, low coupling** — bukan sebaliknya.

## Referensi Modul

Modul kuliah "Analisis dan Desain Sistem Informasi", mengutip antara lain Kurt Bittner & Ian Spence (2002) untuk metodologi use case, dan Nick Jenkins (2005) untuk klasifikasi kebutuhan fungsional/nonfungsional.
