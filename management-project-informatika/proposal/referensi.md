# CLAUDE.md — Manajemen Proyek: Sistem Presensi & Validasi Kegiatan Mahasiswa Web Intranet On-Premise (Kampus Viktor UNPAM)

Dokumen ini adalah konteks untuk agent AI yang membantu **manajemen proyek** (WBS, PERT/CPM, jadwal, estimasi, risiko, dokumentasi) dari proyek ini. Sumber: dokumen "Identifikasi Masalah serta Analisis Konteks dan Kebutuhan" Kelompok 2. Bacalah seluruhnya sebelum bekerja.

## 1. Ringkasan Proyek

- **Judul:** Rancang Bangun Sistem Presensi dan Validasi Kegiatan Mahasiswa Berbasis Web Intranet On-Premise Menggunakan Metode Waterfall pada Jaringan Lokal Kampus Viktor UNPAM _(diperluas 2026-10-07; judul awal: "Sistem Presensi Berbasis Web Intranet On-Premise ...")_
- **Konteks akademik:** Tugas kelompok mata kuliah Teknik Informatika, Fakultas Ilmu Komputer, Universitas Pamulang (2026). Kelompok 2.
- **Anggota:** Dzaky Alfareza, Rizky Zehan's Onassis, Muhammad Zirlda Prairi, Vigie Afrilza Wibowo.
- **Tujuan produk:** Sistem web untuk mencatat, menyimpan, memantau, dan merekap presensi mahasiswa **serta memproses validasi kegiatan mahasiswa oleh dosen**, hanya dapat diakses lewat jaringan intranet kampus (WiFi UNPAM), dengan data tersimpan di basis data terstruktur. Sistem baru yang berdiri sendiri (_standalone_); data dapat diekspor dan siap disinkronkan ke API khusus di server pusat UNPAM pada tahap lanjut.
- **Metode pengembangan:** **Waterfall** (berurutan): Analisis Kebutuhan → Perancangan → Implementasi → Pengujian → Pemeliharaan.
- **Deployment:** On-premise, di jaringan lokal kampus (bukan cloud/publik).

## 1a. Pembaruan Fakta Lapangan (2026-10-07)

> Bagian ini **mengoreksi** konteks dokumen asli. Jika bertentangan dengan Bagian 2 dan 6, ikuti bagian ini.

- UNPAM **sudah memiliki** presensi daring terintegrasi di portal **MyUNPAM / satu.unpam.ac.id**, serta **portal FTI UNPAM**.
- Internet di Kampus Viktor sering tidak stabil. Data seluler 4G+/5G juga sering _lag_.
- Akibatnya portal lama dimuat, sesi terputus, dan dosen harus **login ulang di tengah mengajar**.
- Yang terhambat bukan hanya presensi, tetapi juga **validasi kegiatan mahasiswa oleh dosen** (judul pengabdian kepada masyarakat, judul tugas akhir, dll.).
- Saat gangguan, ada dosen yang **menunda** dan ada yang **mencatat manual** lalu menginput ulang.
- **WiFi UNPAM sudah ada dan sinyal AP kuat**, jadi jaringan lokal dapat dipakai untuk layanan intranet.
- **Keputusan tim:**
  - Sistem menjadi **pendamping** portal, bukan pengganti.
  - Ruang lingkup = **modul presensi + modul validasi kegiatan mahasiswa**.
  - **Presensi dicatat oleh dosen** dengan cek/uncek daftar peserta sambil mengabsen di kelas. Mahasiswa hanya melihat kehadiran dan kegiatan yang sudah divalidasi. Tugas dan nilai tetap di portal resmi.
  - Pengguna terdaftar **puluhan ribu** (asumsi kerja 20.000). Stack: **Laravel + MySQL** (disetujui tim).
  - **Data master berasal dari pusat** (mahasiswa, dosen, MK, kelas & peserta, jadwal, dosen pembimbing). Admin mengimpornya dari file ekspor pusat (ASUMSI: pusat bersedia menyediakan file).
  - Mahasiswa **mendaftarkan** kegiatan/calon judul. Pengajuan otomatis diteruskan ke **dosen pembimbing (dospem)**, dan hanya dospem yang memvalidasi.
  - **Informasi API portal satu.unpam / portal FTI tidak tersedia**, sehingga sistem dibangun sebagai **sistem baru yang berdiri sendiri** dan tidak terintegrasi dengan portal yang ada.
  - Dalam lingkup: **ekspor rekap (Excel/CSV)** dan struktur data **siap sinkronisasi** (ID unik, status kirim).
  - Pengembangan lanjutan (di luar lingkup): **API khusus sistem ini dipasang di server pusat UNPAM**, yang memiliki internet khusus. Server lokal Kampus Viktor mengirim data ke API tersebut saat koneksi tersedia. Kesediaan pengelola server pusat adalah **ASUMSI**.
  - Memindahkan seluruh portal FTI/satu.unpam ke intranet berada di luar lingkup dan menjadi pengembangan lanjutan.
- Rincian lengkap ada di `BAB_01_Analisis_Masalah.md`.

## 2. Masalah yang Diselesaikan

Pencatatan presensi manual atau tidak terintegrasi menyebabkan: kesalahan input, keterlambatan rekapitulasi, sulit mencari/memeriksa data, data tersebar, dan hak akses pengguna belum terpisah jelas.

### Faktor penyebab

1. Input presensi manual → rawan salah catat.
2. Data tidak dalam satu sistem terstruktur → pencarian lambat.
3. Rekap manual tidak efisien saat mahasiswa/pertemuan banyak.
4. Belum ada sistem presensi web intranet terintegrasi di Kampus Viktor. _(Diperjelas: portal daring sudah ada, tetapi belum ada layanan **intranet** yang tetap berjalan saat internet bermasalah. Lihat Bagian 1a.)_
5. Data mahasiswa, dosen, mata kuliah, kelas, jadwal, presensi belum saling terhubung.
6. Pembagian hak akses mahasiswa/dosen/admin belum optimal.

### Masalah prioritas

| #   | Prioritas | Masalah                                                                       |
| --- | --------- | ----------------------------------------------------------------------------- |
| 1   | Tinggi    | Pencatatan presensi belum terkomputerisasi → salah & terlambat                |
| 2   | Tinggi    | Data presensi belum terstruktur → pencarian/pemeriksaan/rekap tidak efisien   |
| 3   | Sedang    | Dosen butuh pencatatan & pemantauan kehadiran yang cepat dan praktis          |
| 4   | Sedang    | Pihak akademik butuh data presensi terpusat untuk pemantauan & laporan        |
| 5   | Sedang    | Data master (mahasiswa, dosen, MK, kelas, jadwal) harus terhubung ke presensi |
| 6   | Rendah    | Belum ada sistem yang membatasi penggunaan ke jaringan internal kampus        |

> Gunakan prioritas ini saat menentukan urutan pekerjaan, bobot risiko, dan jalur kritis. Prioritas 1–2 = inti sistem (presensi + basis data terstruktur).

## 3. Aktor dan Hak Akses

| Aktor            | Kebutuhan utama                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| **Mahasiswa**    | ~~Presensi sederhana per pertemuan~~ → **melihat** status kehadiran per pertemuan sebagai bukti tercatat (presensi dicatat dosen); **mengajukan kegiatan (judul PKM, judul tugas akhir, dll.) dan melihat status validasi** |
| **Dosen**        | Lihat & pantau kehadiran per mata kuliah yang diampu, per kelas, per pertemuan (hadir/tidak hadir); **memvalidasi pengajuan kegiatan mahasiswa (setuju/tolak/revisi)** |
| **Admin**        | CRUD data mahasiswa, dosen, mata kuliah, kelas, jadwal, pengguna, presensi; rekapitulasi; **ekspor rekap (Excel/CSV)** |
| _Pihak akademik_ | Pengguna data rekap/laporan (konsumen laporan; peran sistemnya via admin/laporan)                  |
| _Server pusat UNPAM (pengembangan lanjutan)_ | Kelak menerima data presensi dan hasil validasi melalui API khusus sistem ini. **Tidak termasuk aktor pada lingkup saat ini.** |

## 4. Kebutuhan Data (Entitas)

Mahasiswa, Dosen, Mata Kuliah, Kelas, Jadwal Perkuliahan, Kehadiran/Presensi, Pengguna & Hak Akses. **Tambahan (2026-10-07):** Pengajuan Kegiatan Mahasiswa, Riwayat Validasi. (Setiap catatan presensi/validasi diberi ID unik dan status kirim agar siap disinkronkan kelak.)

Atribut minimum **Presensi**: identitas mahasiswa, mata kuliah, kelas, tanggal pertemuan, waktu presensi, status kehadiran. Seluruh entitas harus saling terhubung (relasional) agar data konsisten.

## 5. Kebutuhan Fungsional & Non-Fungsional (ringkas)

**Fungsional**

- Login + autentikasi, pembagian peran (mahasiswa/dosen/admin).
- Mahasiswa: melakukan presensi + konfirmasi keberhasilan.
- Dosen: tampilan kehadiran per mata kuliah/kelas/pertemuan.
- Admin: manajemen data master, pengguna, dan presensi.
- Rekapitulasi/laporan presensi untuk dosen dan akademik.
- **Tambahan:** Mahasiswa mengajukan kegiatan; Dosen memvalidasi (setuju/tolak/revisi) dengan catatan.
- **Tambahan:** Ekspor rekap presensi dan hasil validasi ke Excel/CSV. Sinkronisasi ke API khusus di server pusat = pengembangan lanjutan.

**Non-fungsional**

- Antarmuka sederhana, mudah dipahami (sisi mahasiswa).
- Akses hanya lewat intranet kampus (on-premise).
- Keamanan: autentikasi + otorisasi per peran; pengguna hanya mengakses data sesuai kewenangan.
- Basis data terstruktur, relasi antar entitas terjaga.
- **Tambahan:** Tetap berfungsi penuh tanpa internet; sesi login stabil selama terhubung ke WiFi kampus (tidak perlu login ulang akibat _lag_).

## 6. Kesenjangan (Gap)

Belum ada sistem presensi web intranet terintegrasi yang menghubungkan data mahasiswa, dosen, mata kuliah, kelas, jadwal, dan kehadiran; pengelolaan data presensi belum terpusat sehingga beban administratif tinggi.

_Diperjelas (2026-10-07):_ portal daring terintegrasi sudah ada, tetapi belum ada layanan presensi dan validasi kegiatan yang **tetap berjalan lancar saat internet bermasalah**, padahal WiFi lokal sudah memadai.

## 7. Panduan untuk Agent Manajemen Proyek

### Kerangka kerja

- Ikuti fase **Waterfall** sebagai struktur level-1 WBS: (1) Analisis Kebutuhan, (2) Perancangan, (3) Implementasi, (4) Pengujian, (5) Pemeliharaan. Waterfall = fase berurutan, jadi ketergantungan antar-fase adalah finish-to-start kecuali ada alasan jelas.
- Fase 1 (identifikasi masalah & analisis konteks/kebutuhan) **sudah dikerjakan di dokumen sumber**; jangan dihitung ulang dari nol kecuali diminta.

### Status WBS & PERT (konteks yang sudah ada)

- WBS kelompok disimpan di **Google Sheet "WBS_Klp2"** (Kelompok 2).
- Metode estimasi biaya dari modul kuliah ada di **Bagian 9**.
- Langkah berikutnya: **analisis PERT** — menghitung probabilitas proyek selesai dalam **40 hari** dan durasi yang layak dinegosiasikan ke klien.
- Format PERT **mengikuti tugas PERT sebelumnya** milik pengguna. Jika format itu belum tersedia di sesi, minta contohnya; jangan menebak.
- Rumus PERT standar: `TE = (O + 4M + P) / 6`, `σ = (P − O) / 6`, `Var = σ²`. Jalur kritis → jumlahkan TE & Var → `Z = (T_target − TE_total) / σ_total` → probabilitas dari tabel normal. Tampilkan perhitungan agar bisa diverifikasi.

### Usulan dekomposisi WBS (titik awal, sesuaikan dengan Sheet WBS_Klp2)

1. **Analisis Kebutuhan** — identifikasi masalah, analisis konteks, kebutuhan pengguna/data/pendukung, SRS.
2. **Perancangan** — use case, ERD/skema basis data, desain arsitektur intranet, desain UI (mahasiswa/dosen/admin), desain hak akses.
3. **Implementasi** — setup server on-premise & DB, modul autentikasi/peran, modul presensi mahasiswa, modul dosen (monitoring), modul admin (data master), modul rekap/laporan, **modul validasi kegiatan mahasiswa**, **fitur ekspor rekap (Excel/CSV)**.
4. **Pengujian** — uji fungsional per peran, uji hak akses/keamanan, uji akses jaringan intranet, **uji ekspor data**, UAT.
5. **Pemeliharaan** — deployment, dokumentasi/manual, serah terima, perbaikan pasca-rilis.

> Ini usulan struktur berdasarkan dokumen kebutuhan, **bukan keputusan final tim**. Sinkronkan dengan isi Sheet sebelum mengubah apa pun.

### Risiko yang layak dicatat

- Ketersediaan/akses ke server & jaringan intranet kampus (ketergantungan eksternal).
- Perubahan kebutuhan setelah fase analisis (kelemahan Waterfall → kendalikan lewat persetujuan kebutuhan di awal).
- Integrasi/kualitas data master (mahasiswa, dosen, jadwal) dari pihak kampus.
- Kesalahan pembagian hak akses (celah keamanan).
- Beban kerja tim kecil (4 orang) → hindari menjadwalkan banyak tugas paralel pada orang yang sama.
- **Data ganda** antara sistem lokal dan portal resmi (dosen mengisi di dua tempat) → perlu aturan penggunaan yang jelas.
- **Kesediaan server pusat UNPAM memasang API khusus** (ASUMSI, tahap lanjut) → rancang data siap sinkronisasi sejak awal.
- **Scope bertambah** (modul validasi kegiatan) → dampak ke waktu & biaya (triple constraint).

## 8. Aturan Kerja untuk Agent

- **Bahasa:** Bahasa Indonesia, gaya akademik yang jelas dan mudah dipahami umum.
- **Jangan mengarang** data yang tidak ada di dokumen (jumlah mahasiswa, durasi, biaya, nama klien). Jika perlu angka (durasi O/M/P, biaya), tandai sebagai **asumsi** atau tanyakan ke pengguna.
- Bedakan jelas: **fakta dari dokumen** vs **usulan/asumsi agent**.
- Pertahankan istilah dokumen: "presensi", "Kampus Viktor UNPAM", "intranet on-premise", "Waterfall".
- Jaga konsistensi nama entitas dan aktor (Mahasiswa, Dosen, Admin).
- Jika mengubah file tim (Sheet/dokumen), jangan menimpa pekerjaan anggota lain tanpa konfirmasi; kerjakan pada salinan atau tab baru bila ragu.
- Hasil hitung (PERT, jalur kritis, total durasi) wajib diverifikasi ulang dengan menjalankan kalkulasi, bukan diperkirakan.

## 9. Modul Estimasi Biaya Proyek TI (Referensi Metode)

Sumber: modul kuliah "Estimasi Biaya Proyek TI" (UNPAM, Fakultas Ilmu Komputer). Gunakan sebagai **kerangka metode** saat agent diminta menghitung biaya/anggaran proyek presensi. Modul ini berisi teori; **angka biaya proyek presensi belum ada** dan harus diminta/diasumsikan secara eksplisit (lihat Bagian 8).

### 9.1 Triple Constraint (Iron Triangle)

Ruang lingkup (scope), biaya (cost), dan jadwal (time) saling mempengaruhi, dengan kualitas di pusatnya. Perubahan satu sisi berdampak pada dua lainnya:

- Scope bertambah → biaya naik, waktu lebih panjang, sumber daya bertambah.
- Biaya dikurangi → scope dikurangi, jadwal lebih panjang, kualitas berisiko turun.
- Jadwal dipercepat → biaya naik, scope dikurangi, sumber daya bertambah.

Konsekuensi untuk proyek ini: tawaran durasi ke klien (mis. target 40 hari) harus selalu dibaca bersama dampaknya pada biaya dan scope.

### 9.2 Kategori Biaya

| Kategori            | Definisi                                                         | Contoh di proyek TI                                    |
| ------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| Direct Cost         | Dapat ditelusuri langsung ke deliverable                         | Upah developer, lisensi IDE                            |
| Indirect Cost       | Dibagi antar proyek, mendukung operasional umum                  | Overhead kantor, PMO, lisensi enterprise bersama       |
| Fixed Cost          | Tidak berubah dengan volume output                               | Lisensi tahunan server, sewa ruang server              |
| Variable Cost       | Berubah proporsional dengan penggunaan                           | Storage per GB, egress data, layanan cloud             |
| CAPEX               | Belanja modal aset jangka panjang                                | Pembelian server, lisensi perpetual, hardware jaringan |
| OPEX                | Pengeluaran operasional berulang                                 | Subscription SaaS, cloud bulanan, kontrak support      |
| Contingency Reserve | Cadangan untuk risiko **teridentifikasi**                        | 5–15% biaya baseline (rework terperkirakan)            |
| Management Reserve  | Cadangan untuk risiko **tak teridentifikasi** (unknown-unknowns) | 5–10% biaya proyek                                     |

Relevansi on-premise: proyek ini condong ke **CAPEX** (server, hardware jaringan) dan **Fixed Cost** (bukan cloud variable/OPEX). Jangan memasukkan biaya cloud kecuali diminta.

### 9.3 Estimasi Tiga Titik (PERT) untuk durasi atau biaya

- Tentukan **O** (optimis), **M** (paling mungkin), **P** (pesimis).
- `E = (O + 4M + P) / 6` (distribusi Beta, M berbobot terbesar).
- Contoh modul: O=5, M=10, P=20 → E = 65/6 = **10,83 hari**.
- Metode ini juga berlaku untuk biaya, bukan hanya durasi.

### 9.4 COCOMO II

- Input: ukuran perangkat lunak (SLOC atau Function Points), 5 faktor skala (PREC, FLEX, RESL, TEAM, PMAT), 17 faktor pengali usaha (Produk, Personel, Platform, Proyek).
- Rumus: `Effort = a × (Ukuran)^b × ∏ EMᵢ` (person-month).
- Tiga level: **ACM** (Application Composition, Object Points, estimasi awal), **EDM** (Early Design, FP/SLOC), **PAM** (Post Architecture, paling rinci, setelah arsitektur ditentukan).
- Biaya = Usaha × tarif per orang-bulan. Keluaran: usaha, biaya, jadwal (bulan).
- Cocok dipakai di proyek ini hanya jika ukuran (SLOC/FP) bisa diperkirakan; pada tahap Perancangan, EDM paling realistis.

### 9.5 Use Case Points (UCP)

Cocok untuk proyek ini karena kebutuhan sudah dimodelkan sebagai aktor dan use case.

1. **UAW** (bobot aktor): Simple=1 (via API), Average=2 (protokol TCP/IP), Complex=3 (manusia via GUI).
2. **UUCW** (bobot use case): Simple=5 (<3 transaksi), Average=10 (4–7 transaksi), Complex=15 (>7 transaksi).
3. `UUCP = UAW + UUCW`
4. `TCF = 0,6 + 0,01 × Σ Tᵢ` (13 faktor teknis, skala 0–5, rentang 0,6–1,0)
5. `ECF = 1,4 + (−0,03 × Σ Eᵢ)` (8 faktor lingkungan, skala 0–5, rentang 0,8–1,4)
6. `UCP = UUCP × TCF × ECF`
7. `Total Usaha (jam-orang) = UCP × faktor produktivitas` (contoh modul: 20–28 jam/UCP)

Catatan penerapan: aktor Mahasiswa, Dosen, Admin semuanya mengakses lewat web (GUI) → bobot **Complex (3)** per aktor, jadi UAW awal = 9. **Pembaruan:** sistem eksternal (API) tidak termasuk lingkup saat ini, jadi UAW tetap 9. Bobot use case, nilai T/E, dan faktor produktivitas **harus ditetapkan tim** (jangan diisi sendiri tanpa menandainya sebagai asumsi).

### 9.6 WBS, Control Account, dan EVM

- Hierarki WBS: Level 1 Proyek → Level 2 Subsistem/Fase → Level 3 Komponen (**Control Account**) → Level 4 Work Package.
- **Control Account** ditetapkan di Level 2–3 WBS, di atas work package; di sinilah scope, biaya, dan jadwal diintegrasikan untuk pengukuran kinerja EVM. Tujuannya menyeimbangkan granularitas pengendalian dengan overhead administrasi.
- Untuk proyek ini, pemetaan yang masuk akal: Level 2 = fase Waterfall, Level 3 = modul (Autentikasi, Presensi Mahasiswa, Monitoring Dosen, Data Master Admin, Rekap/Laporan, **Validasi Kegiatan Mahasiswa**) sebagai control account. _Usulan, sinkronkan dengan Sheet WBS_Klp2._
- **EVM**: PV (Planned Value), AC (Actual Cost), EV (Earned Value); indikator **CPI** (biaya) dan **SPI** (jadwal); SV = Schedule Variance.

### 9.7 Cost Baseline

- Cost Baseline = **estimasi biaya proyek + cadangan kontingensi** yang disetujui; dipakai sebagai acuan pengukuran, pelaporan, dan pengendalian biaya sepanjang siklus hidup proyek (via EVM).
- **Management Reserve TIDAK termasuk** dalam cost baseline (untuk perubahan strategis di luar cakupan atau risiko tak teridentifikasi).
- Rumus ringkas: `Cost Baseline = Estimasi Biaya (material, tenaga kerja, peralatan, subkontrak) + Contingency Reserve`; `Budget (anggaran) = Cost Baseline + Management Reserve`.

### 9.8 S-Curve

- Grafik biaya kumulatif terhadap waktu (sumbu X bulan/hari, sumbu Y biaya kumulatif); bentuk huruf S: awal lambat → pertumbuhan cepat → akhir lambat.
- Tiga kurva: **PV** (rencana dari baseline), **AC** (realisasi), **EV** (nilai hasil pekerjaan selesai).
- Fungsi: memantau kemajuan, mengendalikan anggaran, mendeteksi deviasi dini, memprediksi biaya akhir (EAC).
- Input untuk membuatnya: anggaran, tim proyek, dokumen jadwal (WBS, durasi, ketergantungan), sumber daya.
- Jika diminta membuat S-curve proyek presensi, hitung PV per periode dari jadwal WBS × biaya per work package, lalu plot kumulatif. Gunakan data nyata dari Sheet, bukan contoh angka di modul.

### 9.9 Urutan Kerja yang Disarankan untuk Estimasi Biaya Proyek Presensi

1. Finalkan WBS dan work package (Sheet WBS_Klp2).
2. Estimasi durasi/usaha per work package (PERT 3-titik; opsional UCP/COCOMO II sebagai pembanding).
3. Tentukan tarif (per orang-hari/jam) dan komponen biaya (tenaga kerja, server/CAPEX, jaringan, lisensi).
4. Klasifikasikan biaya (direct/indirect, fixed/variable, CAPEX/OPEX).
5. Tambahkan contingency reserve (rentang acuan modul 5–15%) → **Cost Baseline**.
6. Tambahkan management reserve (rentang acuan modul 5–10%) → **Budget total**.
7. Susun periodisasi biaya → **S-curve (PV)**; siapkan kerangka EVM (PV/AC/EV, CPI, SPI).
8. Hitung ulang semua angka dengan kode/spreadsheet dan tampilkan rumusnya.

## 10. Glosarium Singkat

- **Intranet on-premise:** jaringan internal kampus; server dikelola sendiri, tidak di cloud publik.
- **Cost Baseline:** estimasi biaya + contingency reserve yang disetujui; acuan pengukuran biaya (tanpa management reserve).
- **Control Account:** titik pengendalian di WBS Level 2–3 yang mengintegrasikan scope, biaya, jadwal untuk EVM.
- **EVM:** Earned Value Management; membandingkan PV, AC, EV (CPI, SPI).
- **S-Curve:** grafik biaya kumulatif terhadap waktu.
- **UCP / COCOMO II:** metode estimasi usaha perangkat lunak berbasis use case / ukuran kode.
- **CAPEX / OPEX:** belanja modal / belanja operasional berulang.
- **Waterfall:** model pengembangan bertahap berurutan.
- **WBS:** Work Breakdown Structure — dekomposisi pekerjaan.
- **PERT:** teknik estimasi durasi berbasis tiga titik (optimis, paling mungkin, pesimis) dan probabilitas selesai.
- **Rekapitulasi:** ringkasan data kehadiran per mahasiswa/kelas/mata kuliah.
