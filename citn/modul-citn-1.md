# Rangkuman Modul 1: Networking Today (Cisco ITN)

Sumber: catatan OCR `modul10-13.md`, `modul14.md`, `modul15.md`, `modul16.md`, `modul17.md`, `modul18.md`, dan `modul19-110.md` (diambil 23 November 2026).

**Tujuan modul:** menjelaskan kemajuan teknologi jaringan modern.

| Topik | Tujuan topik |
|---|---|
| 1.1 Networks Affect our Lives | Menjelaskan pengaruh jaringan pada kehidupan sehari-hari |
| 1.2 Network Components | Menjelaskan fungsi host dan perangkat jaringan |
| 1.3 Network Representations and Topologies | Menjelaskan representasi jaringan dan pemakaiannya dalam topologi |
| 1.4 Common Types of Networks | Membandingkan karakteristik jenis jaringan umum |
| 1.5 Internet Connections | Menjelaskan cara LAN dan WAN terhubung ke internet |
| 1.6 Reliable Networks | Menjelaskan empat syarat dasar jaringan yang andal |
| 1.7 Network Trends | Menjelaskan tren BYOD, kolaborasi daring, video, dan *cloud computing* |
| 1.8 Network Security | Mengenali ancaman keamanan dasar dan solusinya |
| 1.9 The IT Professional | Menjelaskan peluang kerja di bidang jaringan |

---

## 1.0 Pendahuluan dan Packet Tracer

- **Packet Tracer** adalah alat simulasi jaringan buatan Cisco. Unduh dari <https://www.netacad.com/resources/lab-downloads>.
- Tiga fungsi utama menunya:
  1. Menambah perangkat dan menghubungkannya lewat kabel atau nirkabel.
  2. Memilih, menghapus, memeriksa, memberi label, dan mengelompokkan komponen.
  3. Mengelola jaringan: membuka jaringan contoh, menyimpan, dan mengubah profil atau preferensi.
- Dua perintah khusus di menu **File**:
  - **Open Samples**: membuka direktori contoh jaringan dan perangkat IoT yang sudah jadi.
  - **Exit and Logout**: menghapus data registrasi, sehingga pengguna berikutnya harus login ulang.
- Ada dua mode tampilan: **Logical** (hubungan antarperangkat) dan **Physical** (letak fisik perangkat, rak, ruangan, kota).
- Aktivitas 1.0.5 *Logical and Physical Mode Exploration* memakai contoh jaringan kantor cabang Seward dan pusat data Warrenton.

---

## 1.1 Jaringan dalam Kehidupan

- Kebutuhan berkomunikasi hanya kalah penting dari kebutuhan bertahan hidup (udara, air, makanan, tempat tinggal).
- Lewat jaringan, ide bisa dibagikan seketika, berita tersebar ke seluruh dunia dalam hitungan detik, dan orang bisa bermain gim bersama walau beda benua.
- **No Boundaries**: batas negara, jarak, dan keterbatasan fisik makin tidak relevan.
  - Internet melahirkan **komunitas global** yang tidak bergantung pada lokasi atau zona waktu.
  - Komunitas daring berpotensi menaikkan produktivitas di seluruh dunia.
  - **Cloud** memungkinkan dokumen dan foto disimpan lalu diakses kapan saja, dari mana saja, di perangkat apa saja.
- Cisco Networking Academy berdiri sejak **1997** untuk mendidik talenta bagi ekonomi digital.

---

## 1.2 Komponen Jaringan

### 1.2.1 Peran host

- **Host**: semua komputer yang terhubung ke jaringan dan ikut berkomunikasi langsung. Host disebut juga **end device**.
- Host diberi nomor identitas bernama **IP address** (Internet Protocol address). IP address mengidentifikasi host sekaligus jaringan tempat host itu berada.
- **Server**: komputer dengan perangkat lunak yang menyediakan informasi (email, halaman web) bagi perangkat lain. Tiap layanan butuh perangkat lunak server tersendiri. Satu server bisa melayani banyak klien sekaligus.
- **Client**: host dengan perangkat lunak untuk meminta dan menampilkan informasi dari server, contohnya peramban Chrome atau Firefox. Satu komputer bisa menjalankan banyak perangkat lunak klien sekaligus.

| Jenis server | Keterangan | Contoh perangkat lunak klien |
|---|---|---|
| Email | Menjalankan perangkat lunak server email | Microsoft Outlook |
| Web | Menjalankan perangkat lunak server web | Peramban (Internet Explorer, Chrome) |
| File | Menyimpan berkas perusahaan dan pengguna di satu lokasi terpusat | Windows File Explorer |

### 1.2.2 Peer-to-peer

Satu komputer bisa berperan sebagai klien dan server sekaligus. Jaringan seperti ini disebut **peer-to-peer** dan umum di rumah atau usaha kecil. Contoh dalam materi: satu PC berbagi printer (lewat USB), PC lain berbagi berkas, keduanya terhubung lewat **NIC**.

| Kelebihan | Kekurangan |
|---|---|
| Mudah dipasang | Tidak ada administrasi terpusat |
| Tidak rumit | Kurang aman |
| Murah, karena tidak perlu perangkat jaringan atau server khusus | Tidak *scalable* |
| Cocok untuk tugas sederhana (berbagi berkas dan printer) | Kinerja bisa turun karena tiap perangkat jadi klien sekaligus server |

### 1.2.3 End devices

- Perangkat yang paling dikenal orang (PC, laptop, ponsel, printer, IP phone).
- Tiap end device punya alamat. Saat memulai komunikasi, end device memakai alamat tujuan untuk menentukan ke mana pesan dikirim.
- **End device adalah sumber atau tujuan pesan** dalam jaringan.

### 1.2.4 Intermediary devices

Perangkat perantara menghubungkan end device ke jaringan dan menghubungkan banyak jaringan menjadi **internetwork**. Perangkat ini memakai alamat end device tujuan dan informasi interkoneksi jaringan untuk menentukan jalur pesan.

Contoh: **wireless router, LAN switch, router, multilayer switch, firewall appliance**.

Fungsi perangkat perantara (sebagian atau seluruhnya):

1. Meregenerasi dan meneruskan ulang sinyal komunikasi.
2. Menyimpan informasi jalur yang ada dalam jaringan dan internetwork.
3. Memberi tahu perangkat lain tentang galat dan kegagalan komunikasi.
4. Mengalihkan data ke jalur alternatif saat ada link yang putus.
5. Mengklasifikasikan dan mengarahkan pesan berdasarkan prioritas.
6. Mengizinkan atau menolak aliran data berdasarkan pengaturan keamanan.

> Catatan: **Ethernet hub** (perangkat lama) disebut juga *multiport repeater*. Repeater meregenerasi dan meneruskan sinyal. Semua perangkat perantara menjalankan fungsi repeater.

### 1.2.5 Media jaringan

Media adalah saluran yang dilalui pesan dari sumber ke tujuan.

| Media | Cara data dikodekan |
|---|---|
| Kabel logam (tembaga) | Impuls listrik |
| Serat kaca/plastik (*fiber-optic*) | Pulsa cahaya |
| Nirkabel | Modulasi frekuensi gelombang elektromagnetik |

Empat kriteria memilih media:

1. Jarak maksimum yang bisa ditempuh sinyal.
2. Lingkungan tempat media dipasang.
3. Jumlah data dan kecepatan transmisi yang dibutuhkan.
4. Biaya media dan pemasangannya.

---

## 1.3 Representasi dan Topologi Jaringan

### 1.3.1 Representasi jaringan

Diagram jaringan memakai simbol untuk perangkat dan koneksi. Gambar jaringan seperti ini disebut **topology diagram**.

- Simbol end device: desktop, laptop, printer, IP phone, wireless tablet, TelePresence endpoint.
- Simbol perangkat perantara: wireless router, LAN switch, router, multilayer switch, firewall appliance.
- Simbol media: LAN media, wireless media, WAN media.

Istilah penting:

| Istilah | Arti |
|---|---|
| **NIC** (Network Interface Card) | Menghubungkan end device secara fisik ke jaringan |
| **Physical port** | Konektor tempat media disambungkan ke end device atau perangkat jaringan |
| **Interface** | Port khusus pada perangkat jaringan yang terhubung ke jaringan tertentu. Port router disebut *network interface* karena router menghubungkan jaringan |

> Istilah *port* dan *interface* sering dipakai bergantian.

### 1.3.2 Diagram topologi

Diagram topologi adalah dokumentasi wajib bagi siapa pun yang mengelola jaringan.

| Physical topology | Logical topology |
|---|---|
| Menunjukkan letak fisik perangkat perantara dan instalasi kabel | Menunjukkan perangkat, port, dan skema pengalamatan jaringan |
| Contoh isi: ruang server Rm 2158, Rack 1 Shelf 2, ruang kelas Rm 2125 | Contoh isi: jaringan 192.168.10.0, port Fa0/1, G0/0 di router R1 |

---

## 1.4 Jenis-Jenis Jaringan

### 1.4.1 Jaringan berbagai ukuran

| Jenis | Ciri |
|---|---|
| Small home network | Menghubungkan beberapa komputer satu sama lain dan ke internet |
| SOHO (Small Office/Home Office) | Komputer di rumah atau kantor jarak jauh terhubung ke jaringan perusahaan atau sumber daya bersama |
| Medium to large network | Milik perusahaan atau sekolah, banyak lokasi, ratusan sampai ribuan host |
| World wide network | Internet: "jaringan dari jaringan" yang menghubungkan ratusan juta komputer |

### 1.4.2 LAN dan WAN

Infrastruktur jaringan berbeda dalam hal luas area, jumlah pengguna, jumlah dan jenis layanan, serta area tanggung jawab.

| Aspek | LAN (Local Area Network) | WAN (Wide Area Network) |
|---|---|---|
| Cakupan | Area kecil: rumah, sekolah, gedung kantor, kampus | Area luas: antarkota, provinsi, negara, benua |
| Pengelola | Satu organisasi atau individu | Biasanya beberapa service provider (SP/ISP) |
| Kecepatan | Bandwidth tinggi untuk perangkat internal | Link antar-LAN umumnya lebih lambat |

### 1.4.3 Internet

- Kumpulan jaringan yang saling terhubung di seluruh dunia (*internetworks*). LAN memakai layanan WAN untuk saling terhubung, dan WAN terhubung ke WAN lain lewat tembaga, fiber, atau nirkabel.
- Internet **tidak dimiliki** individu atau kelompok mana pun.
- Organisasi yang menjaga standar protokol internet:
  - **IETF** (Internet Engineering Task Force)
  - **ICANN** (Internet Corporation for Assigned Names and Numbers)
  - **IAB** (Internet Architecture Board)

### 1.4.4 Intranet dan extranet

| Jenis | Siapa yang boleh akses |
|---|---|
| **Intranet** | Hanya anggota, karyawan, atau pihak berizin dari organisasi (*company only*) |
| **Extranet** | Pihak luar yang butuh data organisasi: pemasok, pelanggan, kolaborator |
| **Internet** | Seluruh dunia |

Contoh extranet:

- Perusahaan yang memberi akses ke pemasok dan kontraktor luar.
- Rumah sakit yang menyediakan sistem pemesanan jadwal bagi dokter.
- Dinas pendidikan yang membagikan info anggaran dan kepegawaian ke sekolah di wilayahnya.

---

## 1.5 Koneksi Internet

### 1.5.1 Gambaran umum

- Rumah, pekerja jarak jauh, dan kantor kecil biasanya terhubung ke **ISP**. Pilihan populer: kabel, DSL, wireless WAN, layanan seluler.
- Organisasi butuh koneksi cepat untuk IP phone, konferensi video, dan penyimpanan pusat data. Pilihan populer: business DSL, leased line, Metro Ethernet.

### 1.5.2 Koneksi rumah dan kantor kecil (SOHO)

| Koneksi | Ciri |
|---|---|
| **Cable** | Lewat kabel TV berlangganan. Bandwidth tinggi, selalu tersambung (*always-on*) |
| **DSL** | Lewat saluran telepon. Bandwidth tinggi, *always-on*. Umumnya **ADSL** (asimetris): unduh lebih cepat dari unggah |
| **Cellular** | Lewat jaringan ponsel. Kinerja bergantung pada ponsel dan menara seluler |
| **Satellite** | Untuk daerah tanpa akses lain. Parabola butuh pandangan bebas ke satelit |
| **Dial-up telephone** | Murah, pakai saluran telepon dan modem. Bandwidth rendah, tidak cocok untuk transfer data besar |
| **Fiber** | Kabel fiber optik, kecepatan tinggi, unggah dan unduh **simetris** |

### 1.5.3 Koneksi bisnis

Bisnis butuh bandwidth lebih besar, bandwidth khusus (*dedicated*), dan layanan terkelola.

| Koneksi | Ciri |
|---|---|
| **Dedicated leased line** | Sirkuit khusus di jaringan provider yang menghubungkan kantor-kantor berjauhan. Disewa bulanan atau tahunan |
| **Metro Ethernet** | Disebut juga Ethernet WAN. Membawa teknologi LAN (Ethernet) ke WAN |
| **Business DSL** | Salah satunya **SDSL** (simetris): unggah dan unduh sama cepat |
| **Satellite** | Untuk lokasi tanpa solusi kabel |
| **Fiber** | Kecepatan tinggi, simetris |

Pilihan koneksi bergantung pada lokasi geografis dan ketersediaan provider.

### 1.5.4 Converged network

| Jaringan terpisah (tradisional) | Jaringan konvergen (sekarang) |
|---|---|
| Data, telepon, dan video punya jaringan masing-masing | Data, suara, dan video lewat **satu** infrastruktur |
| Tiap jaringan punya teknologi, aturan, dan standar sendiri | Satu set aturan, kesepakatan, dan standar implementasi |
| Tidak bisa saling berkomunikasi | Satu jaringan, banyak perangkat, banyak layanan |

### 1.5.5 Packet Tracer: Network Representation

Aktivitas mengenali komponen jaringan di Packet Tracer (perangkat perantara, end device, media), menjelaskan fungsi perangkat, dan membandingkan LAN dengan WAN. Kategori khusus Packet Tracer: **Custom Made Devices** dan **Multiuser Connection**. Kategori **Connections** (ikon petir) berisi jenis media.

Jawaban konseptual untuk pertanyaan Part 2 dan Part 3:

- **Model client-server**: klien meminta layanan atau data, server menyediakannya. Di Packet Tracer hanya Server-PT yang bisa jadi server.
- **Fungsi perangkat perantara** (minimal dua): meregenerasi sinyal, menentukan jalur, mengalihkan data saat link putus, memfilter data berdasarkan keamanan.
- **Kriteria memilih media** (minimal dua): jarak, lingkungan pemasangan, kecepatan dan jumlah data, biaya.
- **LAN vs WAN**: LAN mencakup area kecil dan dikelola satu pihak (contoh: jaringan rumah, lab kampus). WAN mencakup area luas dan dikelola provider (contoh: koneksi antarcabang bank, internet).
- **Internet**: kumpulan global jaringan publik dan privat yang saling terhubung, tidak dimiliki satu pihak.

Pertanyaan hitungan (jumlah end device, perangkat perantara, LAN, WAN, jenis media) harus dijawab dengan membuka file `.pka` langsung.

---

## 1.6 Jaringan yang Andal (Reliable Networks)

### 1.6.1 Arsitektur jaringan

**Network architecture** adalah teknologi yang mendukung infrastruktur, ditambah layanan dan aturan terprogram (**protocol**) yang memindahkan data di jaringan. Ada empat karakteristik dasar yang harus dipenuhi arsitek jaringan:

1. Fault Tolerance
2. Scalability
3. Quality of Service (QoS)
4. Security

### 1.6.2 Fault tolerance

- Membatasi jumlah perangkat yang terdampak saat terjadi kegagalan dan memungkinkan pemulihan cepat.
- Bergantung pada banyak jalur antara sumber dan tujuan. Punya banyak jalur ke tujuan disebut **redundancy**.
- **Packet switching**: pesan dipecah menjadi **packet**, masing-masing membawa alamat sumber dan tujuan. Router mengarahkan packet sesuai kondisi jaringan saat itu, sehingga packet dari satu pesan bisa lewat jalur berbeda. Pengguna tidak merasakan perubahan jalur saat ada link yang putus.

### 1.6.3 Scalability

- Jaringan *scalable* bisa cepat berkembang untuk pengguna dan aplikasi baru **tanpa menurunkan kinerja** bagi pengguna lama.
- Kuncinya: perancang mengikuti **standar dan protokol yang diakui**. Vendor jadi bisa fokus memperbaiki produk tanpa merancang aturan baru.

### 1.6.4 Quality of Service (QoS)

- **Congestion** (kemacetan) terjadi saat permintaan bandwidth melebihi yang tersedia. Bandwidth diukur dalam **bit per detik (bps)**.
- Saat macet, perangkat menahan packet di memori sampai sumber daya tersedia.
- Dengan kebijakan QoS, router mengatur aliran data dan suara, misalnya memberi prioritas pada panggilan **VoIP** dibanding halaman web.
- Fokus QoS: memprioritaskan lalu lintas yang peka waktu. Yang menentukan prioritas adalah **jenis** lalu lintas, bukan **isinya**.

### 1.6.5 Network security

Dua jenis perhatian keamanan:

1. **Network infrastructure security**: mengamankan perangkat secara fisik dan mencegah akses tak sah ke perangkat lunak manajemennya (login, password).
2. **Information security**: melindungi informasi di dalam packet yang dikirim dan data di perangkat yang terhubung.

Tiga syarat utama keamanan (**CIA**):

| Syarat | Arti |
|---|---|
| **Confidentiality** | Hanya penerima yang berhak yang bisa mengakses dan membaca data |
| **Integrity** | Data tidak berubah selama perjalanan dari asal ke tujuan |
| **Availability** | Pengguna berhak bisa mengakses layanan data tepat waktu dan andal |

---

## 1.7 Tren Jaringan

Empat tren utama: **BYOD, online collaboration, video communications, cloud computing**.

### 1.7.2 BYOD (Bring Your Own Device)

- Pengguna bebas memakai perangkat pribadi (laptop, notebook, tablet, ponsel, e-reader) untuk mengakses jaringan kantor atau kampus.
- Perangkat bisa dibeli perusahaan/sekolah, individu, atau keduanya.
- Definisi singkat: **any device, with any ownership, used anywhere**.

### 1.7.3 Online collaboration

- Kolaborasi: "bekerja bersama orang lain dalam proyek bersama".
- Contoh alat: **Cisco WebEx** (rapat daring) dan **Cisco Webex Teams** (pesan instan, berbagi gambar, video, tautan; tiap *space* menyimpan riwayat).
- Penting untuk daya saing organisasi dan untuk pendidikan (kerja tim, proyek kelompok).

### 1.7.4 Video communications

- Video dipakai untuk komunikasi, kolaborasi, dan hiburan. Panggilan video bisa dilakukan ke siapa saja yang punya internet, di mana pun.
- Konferensi video makin wajib bagi organisasi yang tersebar lintas wilayah dan budaya.

### 1.7.6 Cloud computing

- Menyimpan berkas pribadi, bahkan mencadangkan seluruh drive, di server lewat internet. Aplikasi seperti pengolah kata dan penyunting foto bisa diakses lewat cloud.
- Bagi bisnis: menambah kemampuan TI tanpa investasi infrastruktur baru, pelatihan staf baru, atau lisensi perangkat lunak baru.
- Cloud bergantung pada **data center**: fasilitas berisi sistem komputer, bisa sebesar satu ruangan sampai satu gedung. Mahal dibangun, jadi organisasi kecil biasanya menyewa.
- Demi keamanan dan fault tolerance, provider menyimpan data di beberapa data center di lokasi berbeda.

| Jenis cloud | Ciri |
|---|---|
| **Public** | Untuk masyarakat umum, gratis atau bayar sesuai pemakaian, lewat internet |
| **Private** | Untuk satu organisasi (misalnya pemerintah). Bisa dibangun di jaringan privat sendiri (mahal) atau dikelola pihak luar dengan keamanan ketat |
| **Hybrid** | Gabungan dua cloud atau lebih (misalnya sebagian private, sebagian public) dalam satu arsitektur. Akses bergantung pada hak pengguna |
| **Community** | Untuk sekelompok organisasi dengan kebutuhan serupa, misalnya layanan kesehatan yang harus patuh HIPAA. Mirip public cloud, tetapi dengan tingkat keamanan dan kepatuhan seperti private cloud |

> Perhatikan: teks 1.7.6 menyebut **Community** cloud, sedangkan ringkasan 1.10 dan kuis 1.7 menyebut **Custom** cloud. Keduanya merujuk ke jenis keempat yang sama.

### 1.7.7 Smart home technology

Teknologi yang menanamkan kemampuan terhubung ke peralatan rumah sehari-hari. Contoh dari materi: oven pintar yang terhubung ke kalender, menyesuaikan waktu masak, bisa diatur dari ponsel, dan mengirim notifikasi saat makanan matang. Teknologi ini akan makin umum seiring berkembangnya jaringan rumah dan internet cepat.

### 1.7.8 Powerline networking

- Memakai **kabel listrik yang sudah ada** untuk menghubungkan perangkat. Cukup colok *powerline adapter* ke stopkontak.
- Data dikirim lewat frekuensi tertentu pada kabel listrik. Tidak perlu kabel data baru, tambahan listriknya nyaris nol.
- Berguna saat sinyal *wireless access point* tidak menjangkau semua perangkat. **Bukan pengganti** kabel data khusus, hanya alternatif.

### 1.7.9 Wireless broadband

- **WISP (Wireless Internet Service Provider)**: ISP yang menghubungkan pelanggan ke access point atau hotspot dengan teknologi mirip WLAN rumah. Umum di **daerah pedesaan** tanpa DSL atau kabel. Antena dipasang di struktur tinggi (menara air, menara radio), pelanggan memasang parabola kecil di atap.
- **Wireless broadband service**: memakai teknologi **seluler** yang sama dengan ponsel. Antena dipasang di luar rumah, lalu menyediakan koneksi kabel atau nirkabel di dalam rumah. Di banyak tempat, layanan ini bersaing langsung dengan DSL dan kabel.

---

## 1.8 Keamanan Jaringan

### 1.8.1 Ancaman keamanan

Keamanan jaringan melibatkan protokol, teknologi, perangkat, alat, dan teknik untuk melindungi data dan meredam ancaman. Vektor ancaman bisa dari luar (eksternal) atau dari dalam (internal).

Ancaman eksternal umum:

| Ancaman | Penjelasan |
|---|---|
| Virus, worm, Trojan horse | Perangkat lunak atau kode berbahaya yang berjalan di perangkat pengguna |
| Spyware dan adware | Perangkat lunak terpasang yang diam-diam mengumpulkan informasi pengguna |
| Zero-day (zero-hour) attack | Serangan pada hari pertama sebuah celah keamanan diketahui |
| Threat actor attack | Orang jahat menyerang perangkat pengguna atau sumber daya jaringan |
| Denial of Service (DoS) | Memperlambat atau melumpuhkan aplikasi dan proses di perangkat jaringan |
| Data interception and theft | Mencuri informasi privat dari jaringan organisasi |
| Identity theft | Mencuri kredensial login untuk mengakses data privat |

**Ancaman internal** sama pentingnya. Banyak studi menunjukkan pelanggaran data paling sering berasal dari pengguna internal: perangkat hilang atau dicuri, salah pakai tanpa sengaja oleh karyawan, atau karyawan yang berniat jahat. Strategi BYOD membuat data perusahaan makin rentan, jadi kebijakan keamanan harus mencakup ancaman eksternal dan internal.

### 1.8.2 Solusi keamanan

Tidak ada satu solusi yang bisa melindungi dari semua ancaman, jadi keamanan dipasang **berlapis**. Kalau satu lapis gagal, lapis lain bisa menahan.

**Rumah dan kantor kecil** (dasar, dipasang di end device dan titik koneksi internet):

- **Antivirus dan antispyware**: melindungi end device dari malware.
- **Firewall filtering**: memblokir akses tak sah keluar-masuk jaringan, baik *host-based firewall* di perangkat maupun filter dasar di router rumah.

**Jaringan besar dan korporat** (antivirus, antispyware, firewall, ditambah):

| Solusi | Fungsi |
|---|---|
| **Dedicated firewall system** | Firewall lebih canggih, bisa memfilter lalu lintas besar dengan lebih rinci |
| **ACL** (Access Control List) | Memfilter akses dan penerusan lalu lintas berdasarkan IP address dan aplikasi |
| **IPS** (Intrusion Prevention System) | Mengenali ancaman yang menyebar cepat, misalnya zero-day attack |
| **VPN** (Virtual Private Network) | Akses aman ke jaringan organisasi bagi pekerja jarak jauh |

Solusi keamanan harus menyesuaikan lingkungan, aplikasi, dan kebutuhan komputasi, tetap menjaga QoS, dan bisa beradaptasi dengan tren jaringan yang berubah.

---

## 1.9 Profesional TI

- Sertifikasi **CCNA** (Cisco Certified Network Associate) membuktikan penguasaan teknologi dasar jaringan dan menjaga keterampilan tetap relevan.
- CCNA versi baru: **tiga kursus dan satu ujian**, mencakup dasar IP, keamanan, nirkabel, virtualisasi, otomasi, dan *network programmability*.
- Sertifikasi **DevNet** (associate, specialist, professional) untuk memvalidasi keterampilan pengembangan perangkat lunak. Ada juga sertifikasi specialist, misalnya **Cisco Enterprise Advanced Infrastructure Specialist**.
- **Tidak ada prasyarat** untuk mulai di level mana pun. Kredit pendidikan berkelanjutan tersedia untuk resertifikasi CCNA.
- Mencari kerja:
  - netacad.com, menu **Careers > Employment opportunities**, memakai **Talent Bridge Matching Engine** (lowongan di Cisco, mitra, dan distributornya).
  - Mesin pencari kerja seperti Indeed, Glassdoor, Monster. Kata kunci: *IT, network administrator, network architect, computer systems administrator, Cisco CCNA*.
- Lab 1.9.3: *Research IT and Networking Job Opportunities* (Part 1: riset lowongan, Part 2: refleksi).

---

## Kunci Jawaban Kuis

### Check Your Understanding 1.6 (Reliable Networks)

| No | Pertanyaan singkat | Jawaban |
|---|---|---|
| 1 | Mengikuti standar dan protokol yang diakui | Scalability |
| 2 | Confidentiality, integrity, availability | Security |
| 3 | Router memprioritaskan suara saat macet | QoS |
| 4 | Banyak jalur ke tujuan (redundancy) | Fault tolerance |

### Check Your Understanding 1.7 (Network Trends)

| No | Pertanyaan singkat | Jawaban |
|---|---|---|
| 1 | Alat konferensi dengan orang di kota/negara lain | Video communications |
| 2 | Memakai perangkat pribadi di jaringan kantor/kampus | BYOD |
| 3 | Pilihan Public, Private, Custom, Hybrid | Cloud computing |
| 4 | Menghubungkan perangkat lewat stopkontak | Powerline |
| 5 | Teknologi seluler yang sama dengan ponsel | Wireless broadband |

### Check Your Understanding 1.8 (Network Security)

| No | Pertanyaan singkat | Jawaban |
|---|---|---|
| 1 | Kode berbahaya yang berjalan di perangkat pengguna | Virus, worm, or Trojan horse |

### Module Quiz: Networking Today (15 soal, lulus 70%)

| No | Pertanyaan singkat | Jawaban | Alasan |
|---|---|---|---|
| 1 | Software diam-diam mengumpulkan data situs yang dikunjungi | **Spyware** | Spyware mengumpulkan info pengguna secara diam-diam |
| 2 | Akses aman bagi pemasok, pelanggan, kolaborator | **Extranet** | Intranet hanya untuk internal perusahaan |
| 3 | Pengguna mengakses jaringan dengan laptop dan ponsel pribadi | **Bring your own device** | Definisi BYOD |
| 4 | Apa itu ISP? | **Organisasi yang memungkinkan individu dan bisnis terhubung ke internet** | |
| 5 | Kapan WISP disarankan? | **Peternakan di daerah pedesaan tanpa akses broadband kabel** | WISP umum di daerah tanpa DSL/kabel |
| 6 | Tumbuh cepat tanpa mengganggu pengguna lama | **Scalability** | |
| 7 | Kabel fiber putus tapi gangguan sangat singkat | **Fault tolerance** | Ada jalur redundan |
| 8 | Dua ciri jaringan *scalable* | **Grows in size without impacting existing users** dan **Suitable for modular devices that allow for expansion** | |
| 9 | Perangkat yang menentukan jalur pesan antar-internetwork | **A router** | |
| 10 | Dua koneksi yang tidak butuh kabel fisik ke gedung | **Satellite** dan **Cellular** | DSL, dial-up, dan leased line butuh kabel |
| 11 | Jaringan yang diakses untuk belanja daring | **The Internet** | |
| 12 | Pengaruh BYOD pada implementasi jaringan | **BYOD memberi fleksibilitas di mana dan bagaimana pengguna mengakses sumber daya jaringan** | |
| 13 | Akses jarak jauh paling aman ke jaringan perusahaan | **VPN** | ACL dan IPS untuk filter/deteksi, bukan akses jarak jauh |
| 14 | Apa itu internet? | **Menyediakan koneksi lewat jaringan global yang saling terhubung** | Jaringan privat organisasi itu intranet |
| 15 | Dua fungsi end device | **Menghasilkan data yang mengalir di jaringan** dan **Menjadi antarmuka antara manusia dan jaringan komunikasi** | Filter data dan pengalihan jalur adalah fungsi perangkat perantara; saluran pesan adalah fungsi media |

---

## Poin Kunci untuk Ujian

- End device = **sumber atau tujuan** pesan. Perangkat perantara = **menentukan jalur** dan menghubungkan jaringan. Media = **saluran** pesan.
- Physical topology = **lokasi** perangkat dan kabel. Logical topology = **port dan pengalamatan**.
- Intranet = internal saja. Extranet = pihak luar tertentu. Internet = semua orang.
- ADSL = asimetris (rumah). SDSL = simetris (bisnis). Fiber = simetris.
- Empat karakteristik arsitektur: **Fault tolerance** (redundancy), **Scalability** (standar dan protokol), **QoS** (prioritas lalu lintas peka waktu), **Security** (CIA).
- Koneksi tanpa kabel fisik ke gedung: **satellite, cellular** (termasuk wireless broadband dan WISP).
- Akses jarak jauh aman = **VPN**. Ancaman zero-day dideteksi **IPS**. Filter berdasarkan IP dan aplikasi = **ACL**.
