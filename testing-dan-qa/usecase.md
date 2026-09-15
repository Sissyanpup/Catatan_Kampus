# Use Case Diagram & Sparx Enterprise Architecture

Catatan mata kuliah Testing dan QA — 9 September 2026

## Aturan Umum Use Case

- **Harus ada author Admin** — aktor yang memegang akses paling banyak.
- Saat merancang sistem, pastikan **asset penting tetap aman** — jangan sampai ada 2 aktor atau lebih dengan peran setara seperti admin (menghindari ambiguitas kepemilikan akses).
- **Wajib data dikelola oleh sistem**, bukan oleh "makhluk" (aktor) — prinsipnya **system yang mengelola data**, bukan aktor secara langsung.
- **Jangan memasukkan controller** (operasi CRUD, tampil data, dsb.) sebagai use case tersendiri — itu bagian implementasi, bukan level use case.

## Boundary (Batas Sistem)

Wajib ada boundary untuk meletakkan use case:
- **Aktor** diletakkan **di luar boundary** (di luar sistem/PC)
- **Sistem/fitur** digambar dengan **oval**, diletakkan **di dalam boundary**

## Simbol Dasar Use Case Diagram

- **Aktor** — digambarkan sebagai simbol garis/stick figure, mewakili entitas di luar sistem (pengguna, sistem lain) yang berinteraksi dengan sistem
- **Oval** — mewakili use case, yaitu satu fungsi/perilaku yang disediakan sistem
- **Garis (association)** — menghubungkan aktor ke use case yang relevan

### Aturan Penggambaran Garis

- Garis penghubung **tidak boleh saling bertabrakan** satu sama lain
- Garis **tidak boleh melewati/menembus oval lain** yang bukan tujuannya — harus dirutekan agar rapi dan tidak ambigu secara visual

## Form Login / Halaman Login

- Sistem login digambarkan dengan **garis include** terhubung ke use case "System Login" yang digambar dengan garis biasa.
- Kalau login digambar dengan garis biasa (bukan include dari use case lain), artinya **semua user wajib masuk ke halaman login** tersebut terlebih dahulu.

## Minimal Use Case (Garis Biasa)

Use case dasar yang biasanya wajib ada, dengan relasi garis biasa (bukan include/extend):
- Registrasi
- Login
- Logout
- Dashboard / Home

## Catatan: Beda "Mengelola Data X" vs "Mengelola X Data"

Contoh kasus: **"mengelola data laporan angsuran"** ≠ **"mengelola laporan data angsuran"**.
- **Data laporan** memiliki termin/tujuan berbeda — biasanya dikelola per periode (triwulan, dsb).
- **Laporan data** merujuk pada sistem tersendiri yang fungsinya khusus untuk menghasilkan laporan.

→ Penting diperhatikan urutan kata saat menamai use case, karena bisa mengubah makna cakupan fungsi yang dimaksud.

## Sparx Enterprise Architecture (Sparx EA)

Aplikasi UML modeling (Windows) yang dipakai untuk menggambar use case diagram — GUI-nya cukup banyak tombol dan agak berat dijalankan.

### Shortcut
- **Rename hierarki project** → `Fn + F2`
- *(shortcut lain belum tercatat lengkap — perlu dilengkapi lagi saat sesi kerja berikutnya)*

### Langkah Mengaktifkan / Membuat Use Case Diagram
1. Klik **Design** pada navbar
2. **Add** → **Model Wizard**
3. Di halaman Model Wizard, pada navbar web **Diagram** → checklist **Create Package**
4. Pilih **UML Behavioral**
5. Klik **Use Case**
6. Klik **Create Diagram**