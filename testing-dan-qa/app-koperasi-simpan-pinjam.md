# Studi Kasus: Aplikasi Koperasi Simpan Pinjam

Catatan mata kuliah Testing dan QA — rangkuman dari laporan Proyek Akhir "Aplikasi Koperasi Simpan Pinjam" (Ahmad Dinil Haq, Apre Wiantoro, Anggi Syahrial, Zaki A. Agha — Politeknik Negeri Batam, 2013). Dipakai sebagai contoh nyata penerapan use case, sequence diagram, class diagram, hingga pengujian Black Box.

## Ringkasan Sistem

Aplikasi untuk membantu petugas koperasi mengelola data simpan pinjam (Java + MySQL/HeidiSQL, dibangun di NetBeans). Entitas luar: **Petugas Koperasi** dan **Pimpinan/Ketua Koperasi**.

## Hak Akses Pengguna

| Kategori                    | Hak Akses                                                                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Petugas Koperasi**        | Mengelola (tambah/edit/hapus) & mencari data anggota, simpanan, pinjaman, angsuran; akses penuh ke menu antar muka & tombol insert/edit/delete; akses ke laporan |
| **Pimpinan/Ketua Koperasi** | Menerima & melihat laporan data anggota, simpanan, pinjaman, angsuran; akses ke menu antar muka & tombol view laporan (tanpa insert/edit/delete)                 |

## Use Case Diagram

Aktor: **Petugas Koperasi** dan **Ketua Koperasi**. Use case utama: **Mengelola Data Anggota**, **Mengelola Data Simpanan**, **Mengelola Data Pinjaman**, **Mengelola Data Angsuran** — masing-masing terhubung ke use case **Login** lewat relasi `<<include>>` (harus login dulu sebelum bisa mengelola data apa pun).

### Contoh Skenario Use Case: Login

- **Actor**: Petugas Koperasi, Pimpinan Koperasi
- **Type**: Primary
- **Pre-condition**: Actor belum login
- **Post-condition**: Actor berhasil login dan bisa berinteraksi dengan aplikasi
- **Alur**: buka aplikasi → sistem minta username & password → actor input → jika berhasil tampil halaman utama, jika gagal diminta input ulang

Pola skenario yang sama (pre-condition → post-condition → alur pengguna vs alur sistem) dipakai konsisten untuk use case Mengelola Data Anggota, Simpanan, Pinjaman, dan Angsuran.

## Sequence Diagram (Pola Umum)

Untuk tiap fitur "Mengelola Data X" (Anggota/Simpanan/Pinjaman/Angsuran), pola sequence-nya konsisten — melibatkan objek: **Pengguna → MenuUtama → UI Data X → controllerKelolaDataX → Tabel Data X**, dengan 4 skenario utama:

- **Simpan** (insert) — input data → klik simpan → insert ke tabel → update data
- **Edit** — input data → klik edit → update ke tabel
- **Delete** — input data → klik delete → hapus dari tabel
- **View Laporan** — klik tombol laporan → ambil data dari tabel → tampilkan

## Class Diagram (Struktur)

- **Interface Login** (`username`, `password`) ↔ **controllerLogin** (`validasi()`)
- **Interface Main** (`UIMenuDataAnggota()`, `UIMenuDataSimpanan()`, `UIMenuDataPinjaman()`, `UIMenuDataAngsuran()`)
- 4 controller (**controllerAnggota**, **controllerSimpanan**, **controllerPinjaman**, **controllerAngsuran**) masing-masing punya method `insert()`, `edit()`, `delete()`, `viewlaporan()`
- 4 tabel data (**Tb_Anggota**, **Tb_Simpanan**, **Tb_Pinjaman**, **Tb_Angsuran**) menyimpan atribut masing-masing entitas

## Implementasi

- **Perangkat lunak**: NetBeans (IDE), HeidiSQL (buat basis data MySQL)
- **Basis data**: 5 tabel — `tb_anggota`, `tb_simpanan`, `tb_pinjaman`, `tb_angsuran`, `tb_user` (masing-masing dengan primary key sendiri, mis. `NoAnggota`, `NoTrans`, `NoPinjam`, `NoBukti`, `UserID`)
- **Keamanan login**: password ditampilkan sebagai karakter bintang (`*****`) saat diketik

## Pengujian (Bagian Paling Relevan untuk Testing & QA)

**Definisi Pengujian**: proses menjalankan & mengevaluasi perangkat lunak (manual maupun otomatis) untuk menguji apakah perangkat lunak sudah memenuhi persyaratan, dan menentukan perbedaan antara hasil yang diharapkan dengan hasil sebenarnya.

### Metode: Black Box Testing

Pengujian **Black Box** = pengujian terhadap **fungsionalitas** perangkat lunak **tanpa memperhatikan struktur logika internal**-nya. Merupakan metode perancangan data uji yang didasarkan pada **spesifikasi** perangkat lunak — bukan pada kode di dalamnya.

**Alur pengujian Black Box:**

```
Data uji dibangkitkan → dieksekusi pada perangkat lunak → keluaran dicek apakah sesuai harapan
```

### Rencana Pengujian

1. **Pengujian frame** — difokuskan pada satu frame program secara terpisah/sendiri
2. **Pengujian dengan data uji** — menggunakan data masukan nyata sebagai input test case

### Contoh Tabel Pengujian (Format Black Box)

Format kolom standar yang dipakai: **No | Deskripsi Pengujian | Data uji yang digunakan | Hasil yang diharapkan | Hasil nyata | Hasil pengujian**

Contoh kasus uji untuk role **Petugas**:
| No | Deskripsi Pengujian | Data Uji | Hasil Diharapkan | Hasil Pengujian |
|---|---|---|---|---|
| 1 | Menguji penginputan data anggota | Input data anggota pada database | Data anggota tersimpan di database | Ok |
| 2 | Menguji penyimpanan data anggota | Input data → pilih simpan | Data tersimpan di database | Ok |
| 3 | Menguji edit & hapus data | Edit/hapus data anggota di sistem | Data ter-update/terhapus di database | Ok |
| 4 | Menguji menampilkan laporan | Menampilkan laporan data anggota | Data anggota tampil | Ok |

Untuk role **Pimpinan**, kasus ujinya difokuskan pada kemampuan **melihat (view-only)** — mengawasi data anggota, mengawasi data simpanan, dan mengawasi laporan — bukan mengubah data.

> Pola tabel pengujian di atas adalah contoh format standar dokumentasi test case Black Box yang bisa dipakai ulang untuk proyek software lain: setiap baris = satu skenario uji dengan input, ekspektasi, hasil nyata, dan status (Ok/Fail).

## Kesimpulan Laporan (Ringkas)

Aplikasi berhasil mempermudah pencatatan keanggotaan koperasi serta pengolahan & pencarian data simpan pinjam. Saran pengembangan lanjutan: fitur pembagian hasil (SHU), pengaturan user (role management) yang lebih detail, dan penyempurnaan pengelolaan angsuran.
