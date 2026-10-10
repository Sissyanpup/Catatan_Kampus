# Kerangka Proposal & Pelacak Progres (Alternatif 2 — Jaringan Komputer)

**Judul kerja [SEMENTARA]:** Perancangan Optimasi Jaringan WiFi melalui Perencanaan Kapasitas _Access Point_ dan Manajemen Bandwidth Berbasis QoS Menggunakan Metode NDLC pada Kampus Viktor UNPAM

Kelompok 2 — Teknik Informatika, Fakultas Ilmu Komputer, Universitas Pamulang

|                  |                                                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Sumber acuan** | `../proposal/referensi.md`, `../proposal/BAB_01_Analisis_Masalah.md` (fakta lapangan dipakai ulang)                                     |
| **Aturan**       | 1 bab = 1 file `.md`. Diagram ditulis sebagai kode (PlantUML atau Python) agar bisa di-generate menjadi gambar.                         |
| **Alur kerja**   | Bab dikerjakan berurutan. Setiap bab/diagram diperiksa dulu sebelum lanjut ke tahap berikutnya.                                         |
| **Status**       | Alternatif dari `../proposal/` (aplikasi web intranet). Folder lama **tidak dihapus**, tetap menjadi cadangan sampai tim memutuskan. |

---

## Alasan Pindah Arah

- Portal satu.unpam.ac.id dan portal FTI **sudah menyediakan** presensi dan validasi. Membangun aplikasi baru berarti data ganda dan butuh sinkronisasi (M4/RM4/T4 di proposal lama).
- Masalah sebenarnya ada di **akses ke portal**, bukan di fitur portal. Sesuai prinsip "solusi sebesar masalah", yang diperbaiki adalah jalurnya, bukan aplikasinya.
- Lingkup TI mencakup perangkat lunak, **jaringan**, dan perangkat keras, sehingga proyek jaringan tetap sah sebagai proyek informatika.

## Arah Terpilih

**Utama: G (perencanaan kapasitas & kanal AP). Pendukung: A (manajemen bandwidth & QoS).** Aktor utama: **Dosen** (yang membuka presensi & validasi di kelas). Arah F (split-horizon DNS portal FTI) ditambahkan bila No. 8–9 menunjukkan server FTI ada di Viktor.

| Fakta lapangan [FAKTA-L]                                   | Yang terdampak                      | Kaitan dengan solusi                                                                                       |
| ---------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ±35 mahasiswa × 31 ruang kelas + 1 ruang dosen per lantai  | Kapasitas AP                        | ±1.085 mahasiswa/lantai                                                                                    |
| **10–12 AP per lantai**                                    | Semua, termasuk dosen di kelas      | **±100 mahasiswa per AP** → **Arah G (utama)**                                                             |
| Login berhasil, tak lama putus, HP pindah ke data seluler  | Banyak pengguna, termasuk pelanggan | Nirkabel **atau** uplink — dibedakan dengan No. 16 (ping gateway vs internet)                             |
| Paket tertulis silver 2 MB/s (≈16 Mbps), gold 5 MB/s (≈40 Mbps); kenyataan sering ½–⅓; gold tetap lambat di jam sibuk | Pelanggan & dosen | Batas paket = maksimum tanpa jaminan → **Arah A (pendukung)**: jaminan minimum + prioritas akademik. Angka pasti dari speedtest (No. 5). |
| Uplink internet kampus padat                               | Semua pengguna WiFi UNPAM           | Arah A                                                                                                     |
| Gedung beton berlapis meredam sinyal                       | **Sinyal seluler** di dalam ruangan | WiFi kampus jadi satu-satunya jalur utama                                                                  |

> Diagnosis No. 1–6 **tidak lagi untuk memilih arah**, tetapi wajib sebagai **data baseline (sebelum)** untuk Bab 1 dan pembanding tahap Monitoring NDLC (sesudah). No. 11–15 menentukan penyebab putus-nyambung.

## Metode: NDLC (Network Development Life Cycle)

| Tahap                     | Isi pada proyek ini                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------ |
| 1. Analysis               | Pengukuran kondisi jaringan saat ini (lihat Pra-Tugas), identifikasi titik hambatan. |
| 2. Design                 | Topologi usulan, desain QoS/DNS/jalur, kebijakan prioritas lalu lintas.              |
| 3. Simulation Prototyping | Uji rancangan di simulator (GNS3 / MikroTik CHR / Cisco Packet Tracer).              |
| 4. Implementation         | Rekomendasi penerapan ke pengelola jaringan UNPAM **[ASUMSI: butuh izin]**.          |
| 5. Monitoring             | Pengukuran ulang latensi, packet loss, waktu muat portal, lalu dibandingkan.          |
| 6. Management             | Kebijakan dan prosedur pemeliharaan.                                                 |

> Kelompok tidak berwenang mengubah router/DNS produksi UNPAM. Lingkup proyek: **sampai tahap 3 dikerjakan penuh**, tahap 4–6 berupa rancangan dan rekomendasi **[USULAN]**.

---

## Pra-Tugas: Diagnosis Titik Hambatan (WAJIB sebelum Bab 1)

Hasil diagnosis menentukan solusi. Tanpa data ini, judul dan Bab 2–3 belum bisa dikunci.

Ukur pada **jam kuliah sibuk** dan **jam sepi**, minimal 3 kali per kondisi:

| No | Pengukuran                                                         | WiFi kampus | Seluler di kampus | Luar kampus |
| -- | ------------------------------------------------------------------ | ----------- | ----------------- | ----------- |
| 1  | `ping -n 20 satu.unpam.ac.id` (rata-rata ms, % loss)               |             |                   |             |
| 2  | `ping -n 20 google.com` (pembanding)                               |             |                   |             |
| 3  | `tracert satu.unpam.ac.id` (hop mana yang lambat/timeout)          |             |                   |             |
| 4  | Waktu muat halaman login portal (DevTools → Network → Load)        |             |                   |             |
| 5  | Speedtest (download/upload Mbps)                                   |             |                   |             |
| 6  | `nslookup satu.unpam.ac.id` (waktu respons & IP hasil)             |             |                   |             |
| 7  | Tanpa login/langganan hotspot: apakah portal sudah bisa dibuka? | **Bisa** (WiFi publik UNPAM) **[FAKTA-L]** | — | — |
| 8  | `nslookup` & `tracert` **portal FTI** — IP privat/publik? berapa hop? | | | |
| 9  | Di mana server portal FTI berada secara fisik? (tanya pengelola FTI) | | — | — |
| 10 | Di WiFi publik tanpa langganan: apakah Telegram (OTP satu.unpam) bisa dipakai? | | — | — |

**Pengukuran putus-nyambung (WiFi kampus, lantai sampel, jam sibuk):**

| No | Pengukuran                                                                                                       | Hasil |
| -- | ---------------------------------------------------------------------------------------------------------------- | ----- |
| 11 | Catat **jenis putus** tiap kejadian: (a) ikon WiFi hilang, (b) tersambung tapi "tidak ada internet", (c) dilempar ke halaman login hotspot | |
| 12 | `netsh wlan show interfaces` saat putus: SSID, BSSID (AP mana), kanal, pita (2,4/5 GHz), sinyal %, kecepatan | |
| 13 | Aplikasi WiFi Analyzer (Android): jumlah AP terlihat di lantai, kanal masing-masing, AP yang kanalnya sama        | |
| 14 | `ipconfig /all` saat kondisi (b): ada IP? IP `169.254.x.x` (DHCP gagal)? masa sewa (_lease_)?                    | |
| 15 | Satu akun langganan dipakai berapa perangkat? Apakah perangkat lama terputus saat perangkat baru login?          | |

| 16 | **Tes kunci** (jam sibuk, bersamaan): `ipconfig` → catat Default Gateway; `ping -n 50 <gateway>` vs `ping -n 50 8.8.8.8` | |

> **Sebelum mengukur di HP:** matikan fitur pindah otomatis ke data seluler (Android: "Beralih ke data seluler"/"Adaptive Wi-Fi"; iPhone: "Wi-Fi Assist"), atau ukur dengan laptop. Tanpa ini, "putus" bisa jadi keputusan HP, bukan AP.

Penafsiran: (a) → kapasitas AP / kanal / _roaming_; (b) + `169.254.x.x` → DHCP; (c) → batas sesi atau perangkat per akun hotspot.
No. 16: ping gateway sudah buruk → hambatan **nirkabel**; ping gateway lancar tapi 8.8.8.8 buruk → hambatan **uplink**.

### Fakta autentikasi portal [FAKTA-L]

| Portal          | Login                                   | Perilaku sesi                                               |
| --------------- | --------------------------------------- | ----------------------------------------------------------- |
| satu.unpam.ac.id | OTP via Telegram                       | Tetap login di browser (persisten, seperti WhatsApp Web)    |
| Portal FTI      | NIM + password (tidak satu portal/SSO) | _perlu dicek_: apakah ter-logout saat browser ditutup / lag? |

> **Dampak ke Bab 1 lama:** F3 ("sesi terputus, harus login ulang") **tidak berlaku untuk satu.unpam** karena sesinya persisten. F3 hanya bertahan bila terbukti terjadi di portal FTI. Masalah satu.unpam tinggal **lambat muat** (F1), bukan login ulang.

Pembagian tugas: 1 anggota per kondisi + 1 anggota merekap **[USULAN]**.

### Peta keputusan

| Hasil diagnosis                                          | Penyebab                     | Arah solusi (menentukan judul)                                                   |
| -------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------- |
| Semua situs lambat, **hanya** lewat WiFi kampus          | Uplink kampus padat          | **A. Manajemen bandwidth & QoS** — prioritas lalu lintas `*.unpam.ac.id`         |
| `nslookup` lambat/gagal, tapi ping ke IP lancar          | DNS                          | **B. DNS resolver/cache lokal** (satu-satunya kasus "ubah DNS" benar-benar membantu) |
| Hanya portal yang lambat, di semua kondisi               | Server portal / sisi pusat   | **C. Di luar wewenang kampus** — rekomendasi ke IT pusat; pertimbangkan kembali proposal lama |
| Semua lambat termasuk seluler                            | Lokasi / ISP                 | **D. Jalur cadangan (dual-ISP / failover)** atau kembali ke proposal lama        |

| Server portal FTI **berada di jaringan kampus Viktor** (No. 8–9) | Akses lokal memutar lewat internet | **F. Split-horizon DNS** — di WiFi UNPAM, domain portal FTI diarahkan ke IP lokal servernya; lalu lintas tidak keluar ke internet |
| Server portal FTI **di luar kampus Viktor**              | —                            | Arah F gugur; cukup **A** (QoS). Menjadikan portal FTI lokal = menyalin portal atau aplikasi pendamping + API — itu proyek perangkat lunak (kembali ke `../proposal/`), bukan proyek jaringan. Sudah ditolak di proposal lama (B9) |

> Catatan login [FAKTA-L]: login pertama **wajib internet** (OTP Telegram/email). Sesi yang tersimpan di browser diterbitkan server asli, sehingga **tidak otomatis berlaku** di salinan lokal mana pun. Arah F tidak terkena masalah ini karena yang dituju tetap server asli, hanya jalurnya yang lokal.

~~**E. Walled garden hotspot**~~ — **gugur**: WiFi publik UNPAM sudah bisa membuka portal tanpa langganan (No. 7).

Kombinasi yang paling mungkin: **A** (prioritas lalu lintas `*.unpam.ac.id`) untuk satu.unpam, ditambah **F** untuk portal FTI bila servernya ternyata ada di kampus **[ASUMSI]**.

---

## Daftar Bab (urutan pengerjaan)

- [ ] **Pra-Tugas diagnosis** → hasil masuk sebagai **[FAKTA-L]** di Bab 1
- [x] **`BAB_01_Analisis_Masalah.md`** _(draf; menunggu pemeriksaan tim & angka baseline [MENUNGGU DATA])_
      F1–F9, M1–M5 (aktor utama Dosen; nirkabel utama, bandwidth pendukung), gap, RM1–RM5, T1–T5, batasan, pohon masalah. Fakta lama yang dipakai ulang: presensi/validasi oleh dosen, input ulang manual, seluler lag. Dibuang: seluruh bagian aplikasi & sinkronisasi.
- [x] **`BAB_02_Analisis_Kebutuhan.md`** _(draf; menunggu pemeriksaan tim)_
      Aktor (Dosen utama), UR, 26 FR (MoSCoW: 13 M / 9 S / 2 C / 2 W), 14 NFR (target TIPHON: delay ≤150 ms, jitter ≤75 ms, loss ≤3%; muat portal ≤3 s; tanpa putus 1 sesi), asumsi beban & rumus kapasitas AP / jaminan minimum, kebijakan 4 kelas lalu lintas, HW/SW simulasi, matriks keterlacakan, diagram konteks.
      **Perlu sebelum Bab 3:** cek nilai batas TIPHON dari sumber primer; model AP & kapasitas uplink; target muat portal dari wawancara 2–3 dosen.
- [ ] **`BAB_03_Perancangan_Solusi.md`** _(dikerjakan bertahap, diperiksa per subbab)_
  - [ ] 3.1 Dasar perancangan jaringan → **periksa dulu** _(draf: prinsip P1–P7, model hierarkis, pemetaan OSI, konsep kunci, aturan diagram)_
  - [ ] 3.2 Use case (4 aktor, 12 UC) & alur lalu lintas dosen membuka presensi (titik gagal T1–T5) → **periksa dulu**
  - [ ] 3.3 Topologi saat ini (as-is) [MENUNGGU DATA]
  - [ ] 3.4 Perhitungan kapasitas AP [MENUNGGU DATA: model AP]
  - [ ] 3.5 Denah & rencana kanal satu lantai (31 ruang + 1 ruang dosen)
  - [ ] 3.6 Rancangan DHCP & sesi hotspot (sesuai hasil No. 11–15)
  - [ ] 3.7 Rancangan manajemen bandwidth & QoS (prioritas `*.unpam.ac.id`)
  - [ ] 3.8 Topologi usulan (to-be)
  - [ ] 3.9 Skenario simulasi & skenario uji (sebelum vs sesudah)
- [ ] **`BAB_04_Metode_Solusi.md`** _(dikerjakan bertahap)_
  - [ ] 4.1 NDLC → **periksa dulu**
  - [ ] 4.2 WBS 3 level, **32 WP**, dependensi FS (graf dicek: tanpa siklus, satu titik akhir 7.5). Tahap 3 = tiga lapis uji: CHR/GNS3 → **purwarupa hAP ax² milik tim (WP 3.4)** → uji lapangan relawan di AP UNPAM (WP 3.5) → **periksa dulu**
  - [ ] 4.3 Control account: 5 CA (CA-01–CA-05), EVM mingguan, EV 0/100 & 50/50 (standar EVM PMI), toleransi CPI/SPI 0,9 (kebijakan proyek) → **periksa dulu**
  - [ ] 4.4 RACI: PM Rizky, Analis Dzaky, Perancang Zirlda, Penguji Vigie + kolom Pengelola; 1 A per WP (dicek), beban R 10–14 WP/orang → **periksa dulu**
  - [ ] 4.5 Risiko: 15 risiko (3 Tinggi: R-04 data topologi, R-05 izin ukur, R-11 target NFR), skala P×D 1–3, matriks; contingency 10% (contoh modul) → **periksa dulu**
- [x] **`BAB_05_Estimasi_Waktu.md`** _(draf; O/M/P = [ASUMSI] skala mahasiswa, menunggu koreksi penanggung jawab WP)_
      CPM murni: TE 35,00 hari kerja, P(≤40) 99,55%. Setelah resource leveling: opsi A (RACI tetap) 46,67 hari / 0,04%; **opsi B (alih tugas 2.5→Dzaky, 2.6→Vigie, 3.3→Zirlda, Zirlda C di 3.4) 39,17 hari / 67,26%** [rekomendasi]. Tenggat aman 90%: 42 hari kerja. Gantt harian (mulai Senin 12-10-2026 [ASUMSI]).
      **Opsi B disetujui tim** → RACI 4.4 sudah diperbarui (2.5 Dzaky R, 2.6 Vigie R, 3.3 Zirlda R, 3.4 Zirlda C). Bab 5 berisi: tabel aktivitas O/M/P (5.2), CPM murni (5.3–5.4), leveling + 5 ketergantungan sumber daya (5.5), **jadwal baseline** ES/EF/LS/LF/TF (5.6), **diagram PERT activity-on-node 6 nilai per kotak** (5.7), Gantt (5.8), negosiasi (5.9).- [ ] **`BAB_06_Estimasi_Biaya.md`**
      **Keputusan:** PERT tiga titik untuk biaya per WP (modul bagian 3), dijumlah bottom-up + contingency → cost baseline. UCP & COCOMO II tidak dipakai (mengukur ukuran perangkat lunak; proyek ini didominasi kerja lapangan, perancangan & simulasi jaringan).
      - [x] Draf ditulis _(harga = [ASUMSI], menunggu cek tim)_: tarif UMK Tangsel 2026 Rp5.247.870 ÷ 152 = Rp34.525/jam × 3,5 jam/hari; perangkat milik anggota tidak dibebankan; bensin dari waktu PP (Rizky & Dzaky 2 jam, Zirlda & Vigie 1 jam) × Pertalite Rp10.000 → ±Rp285 rb; estimasi Rp13.667.125; contingency 10% → **cost baseline Rp15.033.837**; management reserve 5% → total anggaran Rp15.717.194; **biaya tunai ±Rp2.217.619**; BAC per CA-01–CA-05.
- [x] **`BAB_07_S_Curve_dan_EVM.md`** _(draf)_
      PV mingguan 8 minggu dari jadwal baseline Bab 5.6 × biaya WP Bab 6 (BAC Rp13.667.125; cost baseline Rp15.033.837 sebagai garis batas). EV/AC = **[ILUSTRASI]** s.d. status minggu ke-4 (izin terlambat 2 hari R-05, lapangan +15%): SPI 0,898 (korektif), CPI 0,920 (dipantau), EAC Rp14.853.192; lalu **diteruskan sebagai estimasi tanpa tindakan korektif sampai selesai** (minggu ke-9, hari kerja ke-41,17; AC akhir Rp14.507.542 < cost baseline; CPI akhir 0,942). Grafik: `gambar/bab7_s_curve.svg`; kode matplotlib di 7.7.
- [x] **`BAB_08_Executive_Summary.md`** _(draf)_
      1 halaman, bahasa awam (modul bagian 12): masalah, solusi, manfaat, 4 milestone, total Rp15,7 juta (tunai ±Rp2,2 juta, tanpa biaya bulanan baru), S-Curve ringkas `gambar/bab8_s_curve_ringkas.svg`, 3 rekomendasi. Diletakkan di **awal** proposal saat digabung.

---

## Keputusan yang Perlu dari Tim

- [ ] Setuju pindah dari aplikasi web ke proyek jaringan (4 anggota).
- [ ] Dosen menerima proyek jaringan (bukan rancang bangun perangkat lunak).
- [x] ~~Pilih arah A/B/C/D~~ → **G utama + A pendukung**; aktor utama **Dosen**. F menunggu No. 8–9.
- [x] ~~Konfirmasi satuan paket~~ → tertulis **MB/s**; kenyataan sering ½–⅓ paket.
- [ ] Pilih **lantai & gedung sampel** untuk pengukuran dan perancangan.
- [ ] Hasil Pra-Tugas diagnosis sebagai baseline → kunci judul.
- [ ] Data topologi Kampus Viktor yang bisa diperoleh (jumlah AP, router, bandwidth langganan) — jika tidak ada, ditandai **[ASUMSI]**.
