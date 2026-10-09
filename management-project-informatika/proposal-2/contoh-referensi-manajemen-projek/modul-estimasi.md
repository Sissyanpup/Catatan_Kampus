# Rangkuman Materi: Estimasi Biaya Proyek TI

> Dokumen ini merangkum modul kuliah **Estimasi Biaya Proyek TI** (Program Studi Sistem Informasi, Fakultas Ilmu Komputer, Universitas Pamulang) beserta diskusi lanjutan pengguna. Ditulis agar agen/asisten lain bisa memahami konteks tanpa membaca materi aslinya.
>
> **Bahasa:** Indonesia. Istilah teknis dipertahankan dalam bahasa Inggris sesuai materi.
> **Catatan keandalan:** isi bagian 1-8 bersumber dari slide modul. Konstanta COCOMO II dan angka tarif/beban gaji di bagian 4 dan 9 berasal dari pengetahuan umum (bukan dari slide), jadi harus diverifikasi ke buku modul sebelum dipakai di tugas.

---

## 0. Konteks Pengguna dan Tugas

- Pengguna adalah mahasiswa Teknik Informatika UNPAM yang mengerjakan **proposal proyek** untuk mata kuliah ini.
- Alur proposal yang diminta: **Masalah → Ide solusi → Metode solusi → Solusi, waktu, biaya**.
- Dosen mensyaratkan: **minimal di akhir proposal ada S-Curve**.
- Pengguna menambahkan: di akhir proposal ada **Executive Summary** agar pebisnis awam tidak perlu membaca semuanya.
- Tugas kuliah lain yang terkait dan sedang berjalan: UML Sistem Informasi Minimarket (use case, activity, class, sequence diagram di Enterprise Architect) dan WBS & PERT Sistem Presensi Intranet On-Premise Kampus (kerja kelompok).

---

## 1. Triple Constraint (Iron Triangle)

Tiga batasan utama proyek yang saling memengaruhi; **kualitas** berada di tengah.

| Batasan                    | Pertanyaan                                                         | Dampak jika berubah                                                              |
| -------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| **Ruang lingkup (Scope)**  | Apa yang harus dikerjakan? (fitur, kualitas, hasil)                | Scope bertambah → biaya naik, waktu lebih panjang, sumber daya bertambah         |
| **Biaya (Cost/Budget)**    | Berapa sumber daya yang dibutuhkan?                                | Biaya dikurangi → scope dikurangi, jadwal lebih panjang, kualitas berisiko turun |
| **Jadwal (Time/Schedule)** | Kapan harus selesai?                                               | Jadwal dipercepat → biaya naik, scope dikurangi, sumber daya bertambah           |
| **Kualitas (Quality)**     | (di tengah) memenuhi kebutuhan dan ekspektasi pemangku kepentingan | Terdampak oleh perubahan ketiganya                                               |

Pengguna menyebutnya "trilema". Istilah baku: **Triple Constraint / Iron Triangle**.

---

## 2. Kategori Biaya dalam Proyek TI

| Kategori                                 | Definisi                                                           | Contoh pada proyek TI                                                    |
| ---------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| **Direct Cost** (biaya langsung)         | Dapat ditelusuri langsung ke deliverable proyek                    | Upah developer, lisensi IDE, biaya cloud workload spesifik               |
| **Indirect Cost** (biaya tidak langsung) | Dibagi antar proyek, mendukung operasional umum                    | Overhead kantor, manajemen PMO, lisensi enterprise bersama               |
| **Fixed Cost** (biaya tetap)             | Tidak berubah dengan volume output                                 | Lisensi tahunan server, sewa ruang server, langganan infrastruktur dasar |
| **Variable Cost** (biaya variabel)       | Berubah proporsional dengan volume penggunaan                      | Storage per GB, egress data per GB, biaya penggunaan layanan cloud       |
| **CAPEX** (belanja modal)                | Pengeluaran modal untuk aset jangka panjang                        | Pembelian server, lisensi perpetual, hardware jaringan                   |
| **OPEX** (biaya operasional)             | Pengeluaran operasional berulang untuk menjalankan sistem          | Subscription SaaS, biaya cloud bulanan, kontrak support                  |
| **Contingency Reserve**                  | Cadangan untuk **risiko yang teridentifikasi**                     | 5-15% biaya baseline untuk rework yang diperkirakan                      |
| **Management Reserve**                   | Cadangan untuk **risiko tidak teridentifikasi (unknown-unknowns)** | 5-10% biaya proyek                                                       |

Poin pemahaman penting:

- Direct/indirect dan fixed/variable adalah klasifikasi umum semua proyek. CAPEX/OPEX adalah klasifikasi akuntansi umum yang sangat relevan di TI (misalnya keputusan beli server = CAPEX vs sewa cloud = OPEX). Keduanya berhubungan: keputusan CAPEX menentukan OPEX di masa depan, sehingga yang dibandingkan adalah **total cost of ownership**. Contoh: server dibeli = CAPEX, listriknya = OPEX.
- Contingency reserve **masuk** cost baseline. Management reserve **tidak masuk** cost baseline dan pemakaiannya butuh persetujuan manajemen.
- Contoh contingency: alat menua yang rusak. Contoh management reserve yang pas: regulasi berubah mendadak, vendor utama bangkrut, masalah kompatibilitas tak terduga. Bencana alam umumnya sudah teridentifikasi, jadi ditangani lewat contingency, asuransi, atau disaster recovery plan.
- Pertanyaan dasar sudut pandang TI (cost-benefit): "berapa biayanya, apa yang saya terima, apa manfaatnya".

---

## 3. Metode Estimasi Tiga Titik (Three-Point Estimating / PERT)

Mengestimasi **durasi atau biaya** aktivitas dengan tiga skenario:

- **O (Optimis):** tercepat/termurah dalam kondisi terbaik.
- **M (Paling mungkin):** paling realistis.
- **P (Pesimis):** terlama/termahal dalam kondisi terburuk.

**Rumus:** `E = (O + 4M + P) / 6` (rata-rata tertimbang, M berbobot paling besar; mengikuti distribusi Beta yang asimetris).

**Contoh di materi:** O = 5 hari, M = 10 hari, P = 20 hari → E = (5 + 40 + 20) / 6 = 65/6 = **10,83 hari**.

Kegunaan: mengurangi ketidakpastian estimasi, memberi dasar kuantitatif untuk penjadwalan, banyak dipakai pada metode PERT dan CPM.

---

## 4. COCOMO II (Constructive Cost Model II)

Memperkirakan **usaha (person-month)**, biaya, dan jadwal proyek perangkat lunak dari ukuran software, faktor skala, dan faktor pengali usaha.

### 4.1 Masukan (dari slide)

- **Ukuran software:** SLOC atau Function Points (contoh materi: 50.000 SLOC atau 500 FP).
- **5 Faktor Skala:** PREC (kematangan proses), FLEX (fleksibilitas), RESL (resolusi risiko), TEAM (kompetensi tim), PMAT (kematangan proyek).
- **17 Faktor Pengali Usaha (EM)**, dikelompokkan:
  - Produk: RELY, DATA, CPLX
  - Personel: ACAP, PCAP, PCON, AEXP, PEXP, LTEX
  - Platform: TIME, STOR, PVOL
  - Proyek: TOOL, SITE, SCED

### 4.2 Tiga level model

1. **ACM (Application Composition Model):** estimasi awal (prototipe, komponen), memakai Object Points.
2. **EDM (Early Design Model):** tahap desain awal, memakai FP/SLOC, mempertimbangkan faktor skala.
3. **PAM (Post Architecture Model):** detail setelah arsitektur ditentukan, memakai SLOC/FP, faktor skala, dan 17 faktor pengali.

### 4.3 Rumus (slide: `Effort = a × (Ukuran)^b × ∏EMᵢ`)

Rincian dari pengetahuan umum COCOMO II.2000 (**verifikasi ke modul**):

- `Effort (PM) = A × (KSLOC)^E × ∏EM`, dengan A ≈ 2,94
- `E = B + 0,01 × ΣSF`, dengan B ≈ 0,91
- `Jadwal (bulan) ≈ 3,67 × Effort^F`, dengan `F = 0,28 + 0,2 × (E − B)`
- Nilai EM nominal = 1,0; tiap faktor dinilai Very Low sampai Very High.
- E > 1 berarti diseconomy of scale (usaha naik lebih dari proporsional terhadap ukuran).

### 4.4 Keluaran

- **Usaha:** person-month.
- **Biaya proyek:** Usaha × tarif tenaga kerja per orang-bulan.
- **Jadwal:** durasi proyek dalam bulan.

**Contoh ilustrasi (semua EM nominal):** 50 KSLOC, ΣSF ≈ 18,97 → E ≈ 1,10 → Effort ≈ 215 person-month (hitungan tepat sekitar 217; 215 dipakai sebagai pembulatan di contoh-contoh berikutnya).

---

## 5. Use Case Points (UCP)

Memperkirakan usaha dari kompleksitas fungsional (use case) serta faktor teknis dan lingkungan. Cocok bila UML use case sudah ada.

**Langkah:**

1. **Input kebutuhan:** daftar use case, use case diagram, use case specification.
2. **Hitung UCPW** (Unadjusted Use Case Points Weight) = `UAW + UUCW`
   - **UAW** (bobot aktor): Simple = 1 (misal sistem via API), Average = 2 (via protokol standar seperti TCP/IP), Complex = 3 (manusia via GUI).
   - **UUCW** (bobot use case): Simple = 5 (< 3 transaksi), Average = 10 (4-7 transaksi), Complex = 15 (> 7 transaksi).
3. **TCF** (Technical Complexity Factor): `TCF = 0,6 + 0,01 × ΣTᵢ`, dari 13 faktor teknis (T1-T13) skala 0-5; rentang 0,6-1,0.
4. **ECF** (Environmental Complexity Factor): `ECF = 1,4 + (−0,03 × ΣEᵢ)`, dari 8 faktor lingkungan (E1-E8) skala 0-5; rentang 0,8-1,4.
5. **UCP = UCPW × TCF × ECF**
6. **Usaha (jam-orang) = UCP × faktor produktivitas** (materi: 20-28 jam/UCP).

---

## 6. Control Account dalam WBS dan EVM

- **Hierarki WBS (4 level contoh):** Level 1 Proyek Utama → Level 2 Subsistem/Fase → Level 3 Komponen (**Control Account**) → Level 4 Work Package (WP).
- **Control account** adalah titik kendali di hierarki WBS tempat **biaya, jadwal, dan ruang lingkup diintegrasikan** untuk mengukur kinerja EVM. Biasanya di level 2-3 WBS, di atas work package.
- **Input:** scope (deliverable, batasan, kriteria penerimaan), biaya (budget, sumber daya, tarif), jadwal (durasi, urutan kerja, milestone).
- **Pengukuran EVM:** PV (Planned Value), AC (Actual Cost), EV (Earned Value), indikator CPI dan SPI.
- **Keseimbangan:** granularitas pengendalian tinggi → overhead administratif tinggi; granularitas rendah → overhead rendah tapi kontrol kurang. Tujuan: detail cukup namun tetap efisien.
- **Manfaat:** visibilitas kinerja, pengendalian proaktif, keseimbangan optimal, keputusan berbasis data.

---

## 7. Cost Baseline

Acuan biaya yang **disetujui**, dipakai untuk mengukur, melaporkan, dan mengendalikan kinerja biaya sepanjang siklus hidup proyek.

- **Komposisi:** estimasi biaya proyek (material, tenaga kerja, peralatan, subkontrak, dll.; di Indonesia sering berupa RAB) **+ contingency reserve**.
- **Dikecualikan:** **management reserve** (untuk perubahan strategis di luar cakupan atau risiko tak diketahui).
- **Fungsi:**
  1. Pengukuran kinerja biaya (membandingkan biaya aktual vs baseline memakai EVM).
  2. Pelaporan kinerja biaya (status dan variasi biaya ke pemangku kepentingan secara berkala).
  3. Pengendalian kinerja biaya (kelola variasi, tindakan korektif, ramalan biaya akhir/Estimate at Completion).
- **Siklus hidup:** Inisiasi (studi kelayakan) → Perencanaan (cost estimate) → Pelaksanaan (penggunaan dana) → Pengawasan & Pengendalian (monitoring variasi) → Penutupan (evaluasi akhir).

---

## 8. Grafik S-Curve Manajemen Biaya Proyek

Grafik **biaya kumulatif terhadap waktu** untuk memantau kemajuan, mengendalikan biaya, dan memprediksi hasil proyek. Bentuk huruf S: awal lambat, tengah (fase pengembangan) cepat, akhir melandai.

Tiga kurva:

- **PV (Planned Value):** rencana biaya kumulatif sesuai baseline.
- **AC (Actual Cost):** realisasi biaya kumulatif.
- **EV (Earned Value):** nilai pekerjaan yang sudah selesai.

Jarak antar kurva menunjukkan **Schedule Variance (SV)** dan overspend. Contoh slide: total Rp1 miliar selama 12 bulan, overspend sekitar +100 juta di bulan ke-6.

Output: status kinerja (PV, AC, EV), deteksi dini deviasi, dasar tindakan korektif, estimasi biaya akhir, laporan proyek lebih akurat.

---

## 9. Mengubah Keluaran Estimasi menjadi Rupiah

Keluaran metode bukan rupiah langsung: COCOMO II → person-month, UCP → jam-orang, PERT → hari. Rumus: **Biaya = usaha × tarif**, dengan tarif berupa _fully loaded rate_, bukan gaji pokok.

1. **Hitung tarif per orang-bulan** = gaji + beban perusahaan (BPJS Ketenagakerjaan/Kesehatan, THR ≈ 1/12 gaji, tunjangan) + overhead (laptop, lisensi, kantor, listrik) + margin (jika vendor/freelancer). Perkiraan umum: **1,3-1,5× gaji pokok** (sesuaikan kondisi nyata).
2. **Samakan satuan:** 1 person-month ≈ 152 jam (atau 160-173 sesuai kebijakan); tarif per jam = bulanan ÷ 152; tarif per hari = bulanan ÷ ±21.
3. **Blended rate** per peran (developer, analis, QA, PM) sesuai komposisi tim.
4. **Kalikan:**
   - COCOMO II: person-month × tarif bulanan
   - UCP: jam-orang × tarif per jam
   - PERT: hari × jumlah orang × tarif per hari
5. **Tambahkan** biaya non-tenaga kerja (server, lisensi, cloud; CAPEX/OPEX) dan **contingency reserve** → **cost baseline**. Management reserve di luar baseline.

**Contoh ilustrasi:** 215 person-month × Rp14 juta (gaji Rp10 juta × 1,4) ≈ Rp3,01 miliar tenaga kerja; tambah infrastruktur; contingency 10% (± Rp300 juta) masuk baseline.

**Sumber gaji untuk tugas:** UMK daerah proyek (batas bawah), survei gaji (JobStreet, Glassdoor, Hays, Kelly Services), atau data internal. Jika klien membayar USD, konversi di akhir dengan kurs yang disepakati.

---

## 10. Keterkaitan Seluruh Komponen dalam Satu Proyek

| Tahap            | Pertanyaan                   | Alat                                                             |
| ---------------- | ---------------------------- | ---------------------------------------------------------------- |
| Analisis masalah | Kenapa dan apa kebutuhannya? | Analisis kebutuhan                                               |
| Desain solusi    | Sistemnya seperti apa?       | UML (use case, activity, class, sequence)                        |
| Pemecahan kerja  | Apa saja yang dikerjakan?    | WBS (work package)                                               |
| Estimasi waktu   | Berapa lama?                 | PERT (tiga titik per work package, jaringan kerja, jalur kritis) |
| Estimasi biaya   | Berapa biayanya?             | COCOMO II **atau** UCP (+ tarif)                                 |
| Pengendalian     | Sesuai rencana atau tidak?   | Cost baseline, S-curve, EVM via control account                  |

- UML use case adalah **input langsung UCP**. Fitur/modul bisa dikonversi ke FP/SLOC untuk COCOMO II.
- Biasanya dipilih **salah satu** antara COCOMO II dan UCP untuk biaya. Jika UML use case sudah ada, **UCP paling natural**. PERT tetap dipakai untuk waktu di kedua kasus.
- COCOMO II juga menghasilkan jadwal, tetapi di level proyek, bukan per aktivitas.

---

## 11. Panduan Membuat S-Curve untuk Proposal

Di proposal yang bisa dibuat adalah kurva **PV (cost baseline kumulatif)**. AC dan EV butuh data realisasi; jika dosen ingin ketiganya, buat sebagai **simulasi dengan label jelas "data ilustrasi"**.

1. Hitung biaya per work package (usaha × tarif + biaya non-tenaga kerja).
2. Tentukan jadwal tiap WP dari durasi PERT dan ketergantungan.
3. Sebar biaya WP merata ke periode durasinya (contoh: Rp60 juta / 3 bulan = Rp20 juta per bulan).
4. Jumlahkan per periode, lalu kumulatifkan.
5. Tambahkan contingency reserve ke total akhir (tanpa management reserve).
6. Plot waktu (X) vs biaya kumulatif (Y).

Contoh tabel ilustrasi: bulan 1-5 → biaya 20, 45, 80, 60, 25 juta → kumulatif 20, 65, 145, 205, 230 juta.

---

## 12. Panduan Executive Summary

Pembaca: pemilik usaha yang hanya punya sekitar 2 menit.

- Maksimal **1 halaman**, tanpa istilah teknis (tidak menyebut PERT/UCP/COCOMO), bahasa bisnis.
- Ditulis **terakhir** setelah angka final, tetapi diletakkan di **awal** dokumen.
- Struktur: (1) Masalah, (2) Solusi, (3) Hasil dan manfaat, (4) Waktu dan milestone utama (3-4 tahap), (5) Biaya: satu angka total tegas (sudah termasuk cadangan risiko), rincian 3-4 kelompok besar, plus biaya operasional bulanan setelah sistem berjalan, (6) satu grafik S-Curve yang disederhanakan, (7) Rekomendasi/langkah berikutnya.

---

## 13. Tindak Lanjut yang Sudah Ditawarkan (belum dikerjakan)

- Ringkasan atau soal latihan per topik.
- Template Excel: gaji dan person-month → biaya → tabel kumulatif → grafik S-Curve otomatis.
- Memetakan seluruh alur ke tugas UML minimarket dan WBS/PERT presensi.
- Kerangka executive summary atau paket template proposal lengkap (masalah sampai S-Curve).
