# Kerangka Proposal & Pelacak Progres

**Rancang Bangun Sistem Presensi dan Validasi Kegiatan Mahasiswa Berbasis Web Intranet On-Premise Menggunakan Metode Waterfall pada Jaringan Lokal Kampus Viktor UNPAM**
Kelompok 2 — Teknik Informatika, Fakultas Ilmu Komputer, Universitas Pamulang

|                  |                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| **Sumber acuan** | `referensi.md`                                                                                                  |
| **Aturan**       | 1 bab = 1 file `.md`. Diagram ditulis sebagai kode (PlantUML atau Python) agar bisa di-generate menjadi gambar. |
| **Alur kerja**   | Bab dikerjakan berurutan. Setiap bab/diagram diperiksa dulu sebelum lanjut ke tahap berikutnya.                 |

---

## Daftar Bab (urutan pengerjaan)

- [x] **`BAB_01_Analisis_Masalah.md`**
      Latar belakang, identifikasi masalah, prioritas, kesenjangan, rumusan, tujuan, batasan, manfaat. Diagram: pohon masalah (PlantUML mindmap).
- [x] **`BAB_02_Analisis_Kebutuhan.md`**
      Aktor & hak akses, kebutuhan fungsional (FR-xx), non-fungsional (NFR-xx), kebutuhan data, kebutuhan pendukung (perangkat keras/lunak).
- [ ] **`BAB_03_Perancangan_Solusi.md`** _(dikerjakan bertahap, diperiksa per langkah)_
  - [x] 3.1 Use Case Diagram _(disetujui dengan perbaikan tim; 21 use case, 3 diagram per aktor)_
  - [ ] 3.2 Activity Diagram → **periksa dulu** _(dipisah per aktor: `BAB_03_2_Activity_Mahasiswa.md`, `_Dosen.md`, `_Admin.md`; sedang: Login Mahasiswa)_
  - [ ] 3.3 Sequence Diagram → **periksa dulu**
  - [ ] 3.4 Class Diagram → **periksa dulu**
  - [ ] 3.5 ERD / skema basis data
  - [ ] 3.6 Arsitektur & Deployment Diagram (intranet on-premise)
  - [ ] 3.7 Rancangan antarmuka (wireframe Salt PlantUML)
- [ ] **`BAB_04_Metode_Solusi.md`**
      Metode Waterfall, WBS (Level 1–4), control account, matriks tanggung jawab (RACI), manajemen risiko.
- [ ] **`BAB_05_Estimasi_Waktu.md`**
      PERT tiga titik, jaringan aktivitas & jalur kritis (CPM), probabilitas selesai 40 hari, Gantt chart (PlantUML).
- [ ] **`BAB_06_Estimasi_Biaya.md`**
      Use Case Points, COCOMO II, PERT biaya, perbandingan teknik, kategori biaya, contingency & management reserve, cost baseline, budget.
- [ ] **`BAB_07_S_Curve_dan_EVM.md`**
      Periodisasi biaya, S-Curve tiga garis (PV, EV, AC), CPI, SPI, EAC. Kode Python (matplotlib) untuk menghasilkan grafik.
- [ ] **`BAB_08_Executive_Summary.md`**
      Ringkasan eksekutif seluruh proposal (ditulis paling akhir).

---

## Data yang Perlu dari Tim (belum ada di referensi)

- Isi Google Sheet **"WBS_Klp2"** (dibutuhkan mulai Bab 4).
- Format tugas PERT sebelumnya (dibutuhkan di Bab 5).
- ~~Informasi API portal~~ → **tidak tersedia**. Sistem dibangun berdiri sendiri; API khusus di server pusat UNPAM menjadi pengembangan lanjutan (dibahas di Bab 3.6 sebagai rancangan arsitektur masa depan).
- Durasi O/M/P per aktivitas, tarif tenaga kerja, harga perangkat (dibutuhkan di Bab 5–6). Jika tidak ada, akan dipakai **ASUMSI** yang ditandai jelas.
