# Rangkuman Modul ADSI — Rancang Bangun Sistem (UML Klasik)

Sumber: _Analisis dan Desain Sistem Informasi_ (182 halaman, 12 bab)
Dua versi rangkuman: **Versi Mendalam** (belajar serius, waktu panjang) dan **Versi Singkat** (review cepat, hitungan hari).

---

# BAGIAN A — VERSI MENDALAM

## 1. SDLC & Perencanaan Sistem (Bab 1–2)

**Sistem** adalah interaksi elemen-elemen (data, manusia, prosedur, hardware, software) yang bekerja sama mencapai tujuan. **Sistem informasi** adalah interaksi data–manusia–prosedur (didukung hardware/software) yang menghasilkan informasi untuk pengambilan keputusan jangka pendek, menengah, atau panjang dalam organisasi.

**Evolusi sistem informasi per dekade** (penting untuk soal sejarah):

- **1960an** — otomatisasi proses bisnis, teknologi masih sangat terbatas.
- **1970an** — fokus ke basis data (penyimpanan & pengaksesan data); biasanya dipakai di bagian keuangan (asal-usul kenapa departemen IT sering di bawah divisi keuangan).
- **1980an** — era **CSCW (Computer Support Cooperative Work)**: email, dokumen editor; mulai ke arah client-server; pemakaian meluas ke banyak bagian organisasi (SDM, pemasaran, dll).
- **1990an** — dorongan internet & web; mulai usaha membangun sistem informasi terintegrasi lintas organisasi (cikal-bakal ERP/CRM/SCM).

**Tim pengembang sistem informasi:** system owner, system user, system designer, system analyst, information worker — masing-masing punya kepentingan dan sudut pandang berbeda terhadap sistem yang sama.

**System Development Life Cycle (SDLC)** — siklus tahapan pengembangan sistem informasi. Setiap tahapan punya _purpose_ (tujuan) dan _deliverable_ (hasil) yang jelas. 4 tahapan inti:

1. **System initiation** — perencanaan awal: mendefinisikan lingkup (scope), tujuan, jadwal, dan anggaran bisnis awal proyek. Lingkup & tujuan di sini jadi _baseline_ — titik acuan yang disepakati semua stakeholder.
2. **System analysis** — studi domain masalah bisnis, merekomendasikan perbaikan, menspesifikasikan kebutuhan & prioritas bisnis untuk solusi. Fokus: memahami _apa yang bekerja, apa yang tidak, dan apa yang dibutuhkan_.
3. **System design** — spesifikasi/konstruksi solusi teknis berbasis komputer. Dimulai dari eksplorasi alternatif solusi teknis, lalu hasil akhirnya _blueprint_ dan spesifikasi teknis untuk database, program, antarmuka pengguna, dan jaringan.
4. **System implementation** — konstruksi, instalasi, pengujian, dan pengiriman sistem ke produksi (operasi sehari-hari).

> Mnemonic: **Initiation → Analysis → Design → Implementation**. Kalau bingung suatu diagram "masuk tahap mana", tanyakan: apakah dia untuk _memahami masalah_ (analysis) atau _merancang solusi_ (design)?

**Perencanaan Sistem (Bab 2)** adalah tahap sebelum analisis mendalam: menilai kelayakan proyek, menyusun **WBS (Work Breakdown Structure)** — memecah pekerjaan jadi bagian-bagian kecil yang bisa dikelola — lalu menggambarkan keterkaitan antar tugas. Sering melibatkan **Steering Committee (SC)**, biasanya diisi eksekutif senior (CEO, CFO), yang menjembatani tujuan bisnis dengan tujuan sistem informasi.

---

## 2. Analisis Sistem (Bab 3)

**Analisis sistem** = kegiatan menggali dan mendefinisikan kebutuhan sistem sebelum masuk ke desain.

**Teknik pengumpulan data** (sering keluar di soal — hafalkan kelebihan/kekurangan masing-masing):

| Teknik        | Kelebihan                                                                                                         | Kekurangan                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Wawancara** | Mudah menggali bagian sistem yang baik/kurang baik; bisa menggali lebih dalam; user bebas mengungkapkan kebutuhan | Sulit jika narasumber tidak komunikatif; pertanyaan bisa jadi tidak terarah                         |
| **Observasi** | Analis melihat langsung sistem lama berjalan; gambaran lebih akurat                                               | Butuh waktu lama; orang yang diamati cenderung berperilaku "dibuat-buat"; bisa mengganggu pekerjaan |
| **Kuisioner** | Hasil lebih objektif (bisa ke banyak orang sekaligus); waktu lebih singkat                                        | Responden cenderung malas mengisi; sulit membuat pertanyaan yang singkat & jelas                    |

Wawancara idealnya punya 3 fase: **pembukaan** (membangun suasana), **isi** (tanya-jawab), **kesimpulan** (menutup & merangkum).

**Jenis kebutuhan (requirement)** hasil pengumpulan data, dikelompokkan jadi:

- **Functional requirement** — fungsi yang harus dimiliki produk (mis. sistem harus bisa cetak laporan)
- **Development requirement** — tools pengembangan (hardware/software) yang dipakai
- **Deployment requirement** — lingkungan di mana sistem akan berjalan (spesifikasi server, OS)
- **Performance requirement** — kualitas/kuantitas: kecepatan, skalabilitas, kapasitas
- **Documentation requirement** — dokumen apa saja yang harus dihasilkan (dokumen teknis, user manual, dokumen pelatihan)
- **Support requirement** — dukungan setelah sistem dipakai (pelatihan pengguna, dsb)
- **Miscellaneous requirement** — kebutuhan tambahan di luar kategori di atas

**Blok Pembangun Sistem Informasi** — organisasi umumnya dilayani lebih dari satu sistem informasi yang saling mendukung fungsi bisnis berbeda.

**Dokumen Spesifikasi Kebutuhan Sistem (SKPL/SRS)** — dokumen formal berisi kebutuhan fungsional (pendahuluan, input, proses, output) dan kebutuhan antarmuka eksternal (antarmuka pengguna, dll). Ini dokumen kunci penghubung antara analisis dan desain.

---

## 3. Desain Sistem & Konsep Berorientasi Objek (Bab 4)

**Desain (perancangan)** = upaya mengonstruksi sistem yang memenuhi spesifikasi kebutuhan fungsional dan target performansi.

**Pendekatan berorientasi objek (OO)** adalah cara melihat permasalahan/sistem berdasarkan objek-objek yang berinteraksi, berbeda dari pendekatan terstruktur yang melihat sistem sebagai alur proses/data (mis. DFD).

**Konsep dasar OO:**

- **Kelas (class)** — kumpulan objek dengan karakteristik sama; definisi statik dari himpunan objek yang bisa "dilahirkan" darinya.
- **Objek (object)** — instansiasi dari kelas; punya identitas, state (atribut), dan behavior (operasi).
- **Enkapsulasi** — pembungkusan data dan operasi dalam satu kesatuan (kelas), menyembunyikan detail implementasi dari luar.
- **Atribut** — data/karakteristik yang dimiliki objek.
- **Operasi/Method** — fungsi/perilaku yang bisa dilakukan objek.
- **Package** — pengelompokan elemen-elemen model (kelas, dsb) yang berkaitan.
- **Interface (antarmuka)** — kontrak operasi yang harus diimplementasikan kelas tanpa menentukan bagaimana caranya.

**OO vs Terstruktur (sering jadi soal perbandingan):**

- Terstruktur berfokus pada **proses/fungsi** (top-down decomposition, DFD sebagai alat utama).
- OO berfokus pada **objek yang membungkus data + perilaku bersama**, cocok untuk sistem kompleks dan reuse melalui pewarisan (inheritance).

---

## 4. UML & Use Case Diagram (Bab 5)

**Sejarah singkat UML** (sering ditanya untuk kuis):

- Bahasa OO pertama: **Simula-67** (1967).
- Perkembangan aktif dimulai dari **Smalltalk** (awal 1980-an), lalu diikuti C++, Eiffel, CLOS.
- Metodologi OO pertama: **Shlaer-Mellor (1988)**, **Coad-Yourdon (1991)**, **Booch (1991)**, **Rumbaugh dkk./OMT (1991)**, **Jacobson (1992)** dengan pendekatan use case.
- **Rumbaugh, Booch, dan Jacobson** ("Three Amigos") bergabung di **Rational Software Corporation** menyatukan metodologi-metodologi tersebut menjadi **UML**.
- **1996** — **OMG (Object Management Group)** mengajukan standardisasi.
- **September 1997** — UML resmi diadopsi OMG.

**View/pandangan UML** dibagi 3 area mayor:

| Area Mayor                              | View                  | Diagram                            |
| --------------------------------------- | --------------------- | ---------------------------------- |
| **Struktural** (tidak bergantung waktu) | static view           | diagram kelas                      |
|                                         | use case view         | diagram use case                   |
|                                         | implementation view   | diagram komponen                   |
|                                         | deployment view       | diagram deployment                 |
| **Dinamik** (perubahan/perilaku sistem) | state machine view    | diagram status                     |
|                                         | activity view         | diagram aktivitas                  |
|                                         | (diagram interaksi)   | diagram sekuen, diagram kolaborasi |
| **Pengelolaan model**                   | model-management view | diagram kelas                      |

**Use Case Diagram** — memodelkan _behavior_ (kelakuan) sistem: interaksi antara satu/lebih aktor dengan sistem. Digunakan untuk mengetahui fungsi apa saja yang ada di sistem dan siapa yang berhak menggunakannya. **Bukan** untuk menggambarkan tampilan UI, arsitektur sistem, kebutuhan nonfungsional, atau tujuan performansi. Nama use case: sesimpel mungkin, gunakan kata kerja.

**Simbol-simbol Use Case:**

- **Use case** (elips) — fungsionalitas sistem, dinamai dengan kata kerja di awal frase.
- **Aktor** (stick figure) — orang/proses/sistem lain di luar sistem yang berinteraksi dengannya; dinamai kata benda. _Aktor belum tentu manusia._
- **Asosiasi** — garis penghubung aktor dan use case yang berinteraksi.
- **Ekstensi (`<<extend>>`)** — use case tambahan yang bisa berdiri sendiri walau tanpa use case yang di-extend; mirip inheritance. Panah mengarah ke use case yang ditambahkan (extension).
- **Generalisasi** — hubungan umum-khusus antar dua use case (mis. "mengelola data" adalah generalisasi dari "ubah data" dan "hapus data"). Panah mengarah ke use case yang lebih umum.
- **Include (`<<include>>`)** — use case tambahan yang _diperlukan_ use case ini untuk berjalan (relasi wajib, bukan opsional seperti extend). Panah mengarah ke use case yang dipakai/di-include.

> Aturan umum arah panah: mengarah pada use case yang **kontrolnya lebih besar / yang dipakai**.

**Cara menemukan aktor & use case:** identifikasi siapa saja yang berinteraksi langsung dengan sistem (aktor), lalu identifikasi fungsi-fungsi yang mereka butuhkan dari sistem (use case) — biasanya melalui hasil wawancara/observasi dari Bab 3.

---

## 5. Class Diagram & Object Diagram (Bab 6)

**Diagram Kelas** menggambarkan struktur statis sistem: kelas-kelas, atribut, operasi, dan relasi antar kelas.

Komponen sebuah kelas:

- **Abstraksi kelas** — proses menentukan kelas mana yang relevan dari domain masalah.
- **Atribut** — karakteristik/data kelas.
- **Operasi** — perilaku/fungsi kelas.
- **Multiplisitas/Multiplicity** — jumlah instance yang boleh berelasi (mis. 1, 0..1, 1.._, 0.._).

**Relasi antar kelas** (ini konsep paling sering diujikan):

| Relasi           | Definisi                                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Asosiasi**     | Hubungan statis antar kelas — umumnya menggambarkan kelas yang punya keterkaitan dengan kelas lain (mis. Dosen mengajar Mahasiswa). |
| **Agregasi**     | Hubungan "bagian dari" atau "bagian ke keseluruhan" — suatu objek bisa eksis tanpa objek pemiliknya (whole-part, lemah).            |
| **Generalisasi** | Relasi ke atas: beberapa subkelas ke satu superkelas (pewarisan/inheritance).                                                       |
| **Dependency**   | Perubahan pada satu kelas memengaruhi kelas lain yang bergantung padanya; hanya berlaku satu arah.                                  |

**Diagram Objek** menggambarkan _instance_ konkret dari diagram kelas pada satu titik waktu tertentu — berguna untuk memverifikasi bahwa struktur kelas yang dirancang benar-benar bisa merepresentasikan data nyata.

---

## 6. Diagram Interaksi: Sequence & Collaboration (Bab 7)

**Diagram interaksi** memodelkan interaksi objek di dalam sebuah use case (proses) — memuat himpunan objek, relasi antar objek, dan bagaimana _message_ (pesan) mengalir. Terdiri dari 2 jenis:

**a) Diagram Sekuen (Sequence Diagram)**
Menggambarkan urutan event dan waktu dari pesan yang terjadi antar objek dalam satu use case — menunjukkan _waktu hidup objek_ (lifeline) dan pesan yang dikirim/diterima. Jumlah diagram sekuen idealnya = jumlah use case yang punya proses/interaksi sendiri.

Simbol utama: aktor, objek (lifeline), pesan (message, panah horizontal), activation bar.

**b) Diagram Kolaborasi (Collaboration Diagram)**
Menggambarkan bagaimana objek terkoneksi secara **statik/tetap**, dengan penekanan pada **organisasi struktural** objek-objek yang mengirim & menerima pesan — beda fokus dengan sequence yang menekankan urutan waktu.

> Perbedaan kunci: **Sequence** = urutan waktu; **Collaboration** = struktur relasi antar objek. Keduanya menggambarkan interaksi yang sama, hanya sudut pandang berbeda.

---

## 7. Statechart / Diagram Status (Bab 8)

Diagram status menggambarkan perilaku sistem berdasarkan **status** yang dialami objek selama hidupnya, dan **transisi** antar status akibat **event/kejadian**.

**Konsep kunci:**

- **Status** — kondisi selama hidup objek/interaksi: memenuhi kondisi, melaksanakan aksi, atau menunggu kejadian.
- **Event** — kejadian yang memicu perubahan status.
- **Transisi** — perpindahan dari satu status ke status lain akibat event; bisa diberi nama pesan (biasanya sinkron dengan pesan di diagram sekuen); transisi juga bisa "memutar" ke status yang sama (internal transition).

**Simbol:**

- Status awal — titik hitam solid, satu per diagram
- Status — kotak dengan sudut membulat
- Status akhir — lingkaran dengan titik di tengah, satu per diagram
- Transisi — garis panah berlabel

**Composite State** — untuk sistem kompleks, sub-status dikelompokkan menjadi "super state" (didekomposisi jadi 2+ sub status bersamaan atau terpisah) agar diagram tetap sederhana dan mudah dibaca.

---

## 8. Activity Diagram / Diagram Aktivitas (Bab 9)

_(Bagian yang sudah dibahas di kelas — dirangkum lagi supaya jadi satu kesatuan referensi)_

Diagram aktivitas mendeskripsikan **aliran kerja (workflow)** dari perilaku sistem — mirip diagram status, tapi menekankan urutan aktivitas, bukan status objek. Digunakan untuk melengkapi diagram interaksi & status, menganalisis use case, menggambarkan algoritma berurutan yang kompleks, dan memodelkan proses paralel. **Tidak** menunjukkan bagaimana objek berkolaborasi secara detail (itu tugas sequence diagram).

**Simbol-simbol:**
| Simbol | Deskripsi |
|---|---|
| Status awal | titik awal aktivitas sistem, satu per diagram |
| Aktivitas | aktivitas yang dilakukan sistem, diawali kata kerja |
| Percabangan/Decision | pilihan aktivitas lebih dari satu (kondisi) |
| Penggabungan/Join | menggabungkan lebih dari satu aktivitas jadi satu |
| Status akhir | akhir aktivitas sistem, satu per diagram |
| Swimlane | memisahkan organisasi/objek yang bertanggung jawab atas aktivitas tertentu |
| Fork | memecah aktivitas jadi paralel |
| Join | menggabungkan kembali aktivitas paralel |

**Langkah-langkah menggambar diagram aktivitas:**

1. Buat simbol status awal di awal diagram.
2. Gambarkan aksi pertama dan seterusnya sesuai alur kegiatan sistem. Gunakan **fork** saat beberapa aktivitas terjadi bersamaan, lalu gabungkan dengan **join** setelah semua aktivitas paralel selesai.
3. Gunakan **cabang keputusan (decision)** untuk kegiatan yang bergantung kondisi tertentu; setiap percabangan harus diakhiri simbol penggabungan.
4. Akhiri diagram dengan simbol status akhir.

Diagram aktivitas dibaca dari **atas ke bawah**, dan dapat dipecah menjadi beberapa **object swimlane** untuk menunjukkan siapa/objek apa yang bertanggung jawab atas tiap aktivitas.

---

## 9. Component & Deployment Diagram (Bab 10–11)

**a) Diagram Komponen (Bab 10)**
Menggambarkan **komponen-komponen fisik** sistem — modul yang berisi code (library atau executable), file, atau dokumen di dalam sebuah node. Memodelkan **aspek fisik** suatu sistem. Komponen umumnya terbentuk dari beberapa class/package, atau dari komponen-komponen yang lebih kecil.

**b) Diagram Deployment (Bab 11)**
Menggambarkan **konfigurasi komponen pada saat instalasi** sistem informasi — tata letak fisik sistem, bagian software yang berjalan di atas bagian hardware, dan keterhubungan antar komponen hardware tersebut.

> Perbedaan kunci: **Component** = apa saja "kepingan" software-nya (dari sudut pandang implementasi); **Deployment** = di mana kepingan itu dijalankan secara fisik (dari sudut pandang infrastruktur/node).

---

## 10. Kohesi dan Kopling (Bab 12)

Bab penutup — mengukur **kualitas desain berorientasi objek**.

**Kohesi (Cohesion)** — ukuran keterpaduan: seberapa erat hubungan antar elemen di **dalam satu** modul/kelas. **Kohesi tinggi = desain baik.**

Jenis-jenis kohesi (dari terburuk ke terbaik):

1. **Coincidental cohesion** — elemen dalam modul tidak punya hubungan berarti sama sekali (terburuk).
2. **Logical cohesion** — elemen dikelompokkan karena secara logis mirip/kategori sama, meski aksinya berbeda.
3. **Communicational cohesion** — elemen beroperasi pada data yang sama.
4. **Sequential cohesion** — output satu elemen jadi input elemen berikutnya.
5. **Functional cohesion** — semua elemen berkontribusi pada satu tugas tunggal yang jelas (**terbaik**, ini yang diharapkan dalam desain OOP yang baik).

**Kopling (Coupling)** — ukuran keterkaitan: seberapa erat ketergantungan **antar** modul/kelas yang berbeda. **Kopling rendah (low coupling) = desain baik** — modul independen, mudah diubah tanpa memengaruhi modul lain.

Jenis-jenis kopling (dari terbaik ke terburuk):

1. **No Direct Coupling** — tidak ada hubungan sama sekali (terendah/terbaik dari sisi independensi, tapi sistem tetap perlu ada integrasi).
2. **Data coupling** — modul bertukar data lewat parameter sederhana (terbaik untuk sistem yang memang perlu terhubung).
3. **Stamp coupling** — modul bertukar seluruh struktur data (bukan hanya field yang dibutuhkan).
4. **Control coupling** — satu modul mengontrol alur/keputusan modul lain lewat parameter kendali (flag).
5. **Common coupling** — beberapa modul berbagi data global yang sama.
6. **Content coupling** — satu modul mengubah/bergantung langsung pada isi internal modul lain (**terburuk**, paling rumit dan tidak jelas, tidak lewat parameter).

**Teknik desain OO yang baik = High Cohesion + Low Coupling.** Ini prinsip inti yang menyambungkan ke topik testing/QA-mu: modul dengan kohesi tinggi & kopling rendah lebih mudah di-_unit test_ secara terisolasi, dan perubahan pada satu modul tidak memicu efek domino ke modul lain (regression risk lebih rendah).

---

# BAGIAN B — VERSI SINGKAT (Review Cepat)

## Peta Besar

```
SDLC:  Initiation → Analysis → Design → Implementation
                        ↓            ↓
                 (Bab 3: Analisis)  (Bab 4-12: Desain OO + UML)
```

**Urutan 9 diagram UML klasik dalam modul ini** (struktural → dinamik → fisik):

1. Use Case Diagram (Bab 5) — fungsi sistem & siapa pakai
2. Class Diagram (Bab 6) — struktur kelas & relasi
3. Object Diagram (Bab 6) — instance nyata dari kelas
4. Sequence Diagram (Bab 7) — urutan pesan antar objek (waktu)
5. Collaboration Diagram (Bab 7) — struktur relasi antar objek
6. Statechart/State Diagram (Bab 8) — status & transisi objek
7. Activity Diagram (Bab 9) — alur kerja/workflow sistem
8. Component Diagram (Bab 10) — kepingan fisik software
9. Deployment Diagram (Bab 11) — penempatan fisik ke hardware

Ditutup **Bab 12: Kohesi & Kopling** — cara menilai kualitas desain yang dihasilkan.

## Cheat Sheet 9 Diagram

| Diagram       | Fokus                 | Kata Kunci Simbol                                                                   |
| ------------- | --------------------- | ----------------------------------------------------------------------------------- |
| Use Case      | Fungsi × Aktor        | elips, stick figure, `<<include>>` (wajib), `<<extend>>` (opsional), generalisasi   |
| Class         | Struktur statis       | kotak 3 bagian (nama/atribut/operasi), asosiasi, agregasi, generalisasi, dependency |
| Object        | Instance kelas        | sama seperti class tapi nilai konkret, garis bawah nama                             |
| Sequence      | Urutan waktu pesan    | lifeline vertikal, activation bar, panah pesan horizontal                           |
| Collaboration | Struktur relasi pesan | objek + garis relasi + nomor urut pesan                                             |
| Statechart    | Status objek          | status awal (●), status (kotak bulat), status akhir (◉), transisi berlabel          |
| Activity      | Alur kerja sistem     | status awal, aktivitas (kata kerja), decision, fork/join, swimlane                  |
| Component     | Kepingan software     | kotak dengan ikon 2 persegi kecil di kiri                                           |
| Deployment    | Penempatan fisik      | kubus 3D (node), komponen di dalamnya                                               |

## Kohesi & Kopling — Kilat

- **Kohesi tinggi** = bagus (idealnya **Functional cohesion**)
- **Kopling rendah** = bagus (idealnya **Data coupling** atau tanpa kopling langsung)
- Urutan kohesi terburuk→terbaik: Coincidental → Logical → Communicational → Sequential → **Functional**
- Urutan kopling terbaik→terburuk: Data → Stamp → Control → Common → **Content**
- Rumus ingat cepat: **"High Cohesion, Low Coupling = Good Design"**

## Tips Belajar Cepat (Skala Hari)

1. **Hari 1** — kuasai dulu 9 diagram + kapan masing-masing dipakai (tabel cheat sheet di atas). Ini fondasi paling sering dites.
2. **Hari 2** — fokus simbol per diagram, terutama yang belum dibahas di kelas: Class, Object, Sequence, Collaboration, Statechart, Component, Deployment. Gambar ulang tangan sendiri tiap simbol 2-3x biar hafal bentuknya.
3. **Hari 3 (kalau ada)** — Kohesi & Kopling + latihan soal pilihan ganda dari modul (ada di akhir tiap bab) — dosen sering ambil soal ujian dari situ.
4. **Kalau waktu sangat mepet:** prioritaskan Use Case + Class + Activity (paling sering jadi soal studi kasus gambar diagram), lalu Kohesi/Kopling (paling sering jadi soal konsep/pilihan ganda).

---

_Rangkuman disusun dari modul "Analisis dan Desain Sistem Informasi" (182 hlm, 12 bab). Notasi mengikuti gaya modul ini secara ketat — gunakan persis simbol di atas untuk tugas/ujian di kelas ini._
