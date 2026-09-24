# Use Case Diagram

## Pengertian

Use Case Diagram adalah diagram UML yang menggambarkan fungsionalitas sebuah sistem dari sudut pandang pengguna. Diagram ini menunjukkan berbagai cara aktor (pengguna/sistem luar) dapat berinteraksi dengan sistem yang sedang dirancang.

---

## Komponen Utama

### 1. Actor
- Orang, proses, atau sistem lain yang berinteraksi dengan sistem yang dibuat.
- Digambar sebagai **stick figure** di **luar** boundary sistem.
- Dibagi menjadi dua jenis:
  - **Primary Actor** — menginisiasi use case (contoh: user klik "Submit Order").
  - **Secondary Actor** — memberikan layanan kepada sistem sebagai respons (contoh: Payment Gateway).
- **Wajib ada actor Admin** sebagai pemegang akses terbanyak.
- Hindari dua actor atau lebih dengan peran yang sama (seperti dua Admin).

### 2. System Boundary (Batasan Sistem)
- Digambar sebagai **kotak/rectangle** yang membungkus semua use case.
- Memisahkan fungsionalitas internal sistem dari entitas eksternal.
- **Actor selalu berada di luar boundary.**
- **Use Case selalu berada di dalam boundary.**

### 3. Use Case
- Merepresentasikan satu fungsi atau fitur sistem yang memberikan nilai bagi actor.
- Digambar sebagai **oval/elips** di dalam boundary.
- **Wajib merepresentasikan data yang dikelola sistem**, bukan makhluk/entitas fisik.
- **Jangan memasukkan operasi CRUD (Controller)** langsung ke dalam use case — use case adalah fitur, bukan aksi teknis.

---

## Relasi dalam Use Case Diagram

### 1. Association (Asosiasi)
- Garis biasa antara actor dan use case.
- Menunjukkan bahwa actor **berinteraksi** dengan use case tersebut.
- Contoh: semua user terhubung ke use case "Login" dengan garis biasa → semua user **harus** melewati halaman login.

### 2. Include
- Ditandai dengan garis putus-putus dan label `<<include>>`.
- Digunakan saat sebuah use case **selalu memanggil** use case lain sebagai bagian wajibnya.
- Contoh: "Dashboard" **include** "Login" → untuk mengakses dashboard, user wajib login terlebih dahulu.
- Arah panah dari use case **pemanggil** ke use case **yang dipanggil**.

### 3. Extend
- Ditandai dengan garis putus-putus dan label `<<extend>>`.
- Digunakan saat sebuah use case **hanya berjalan pada kondisi tertentu** (opsional/kondisional).
- Contoh: "Login" **extend** "Lupa Password" → fitur lupa password hanya muncul jika user membutuhkannya.
- Arah panah dari use case **tambahan** ke use case **utama**.

### 4. Generalization
- Garis dengan panah segitiga kosong, mirip inheritance di OOP.
- Digunakan antara dua actor atau dua use case, di mana yang satu **mewarisi** sifat dari yang lain.
- Contoh: Actor "Admin" dan "Super Admin" — Super Admin mewarisi semua akses Admin, ditambah akses eksklusif.

---

## Aturan Penting Pembuatan Use Case

1. **System mengelola data**, bukan makhluk hidup/entitas fisik.
2. Jangan memasukkan controller/CRUD ke dalam use case (tampil, simpan, hapus, ubah bukan use case).
3. Pastikan setiap use case berada **di dalam boundary**.
4. Setiap actor berada **di luar boundary**.
5. Hindari aktor ganda dengan peran identik (jangan ada dua "Admin").
6. Penamaan use case harus deskriptif dan mencerminkan **tujuan bisnis**, bukan operasi teknis.

---

## Minimal Use Case yang Wajib Ada

Setiap sistem wajib memiliki setidaknya use case berikut:

| Use Case | Keterangan |
|---|---|
| **Registrasi** | Pendaftaran akun baru |
| **Login** | Autentikasi pengguna |
| **Logout** | Keluar dari sesi |
| **Dashboard / Home** | Halaman utama setelah login |

---

## Contoh: Form Login / Halaman Login

```
[User] ——————> (Login)
                   |
              <<include>>
                   |
                   v
             (Form Login / Halaman Login)
```

- Use case **Login** dihubungkan ke **Form Login** dengan relasi `<<include>>`.
- Karena garis dari actor ke Login adalah **garis biasa (asosiasi)**, maka **semua user wajib melewati halaman login**.

---

## Catatan Penamaan Use Case

> **"Mengelola Data Laporan Angsuran"** ≠ **"Mengelola Laporan Data Angsuran"**

- **Data Laporan Angsuran** — data yang memiliki periode/termin tertentu (triwulan, semester, dll.), biasanya dikelola secara berkala oleh petugas.
- **Laporan Data Angsuran** — laporan yang dihasilkan sistem secara otomatis berdasarkan data yang tersimpan.

Penamaan yang tepat menentukan **scope** dan **tanggung jawab** use case di dalam sistem.

---

## Sparx Enterprise Architect (EA)

Panduan penggunaan tools Sparx EA untuk membuat Use Case Diagram:

| Aksi | Cara |
|---|---|
| Rename hierarki/package | `Fn + F2` |
| Aktivasi model wizard | Navbar **Design** → **Add** → **Model Wizard** |
| Membuat Use Case Diagram | **Diagram** (navbar) → **Add Diagram** → checklist *Create Package* → pilih **UML Behavioral** → pilih **Use Case** → klik **Create Diagram** |

---

## Rangkuman Simbol

| Simbol | Nama | Keterangan |
|---|---|---|
| Stick figure | Actor | Pengguna/sistem eksternal |
| Oval | Use Case | Fungsi/fitur sistem |
| Kotak/Rectangle | System Boundary | Batas lingkup sistem |
| Garis lurus | Association | Hubungan actor ↔ use case |
| Garis putus `<<include>>` | Include | Pemanggilan use case wajib |
| Garis putus `<<extend>>` | Extend | Perluasan kondisional |
| Panah segitiga kosong | Generalization | Pewarisan/inheritance |

---

## Referensi
- [UML Use Case Diagram – BINUS SOCS](https://socs.binus.ac.id/2019/11/26/uml-diagram-use-case-diagram/)
- [Use Case Diagram Relationships – Creately](https://creately.com/blog/diagrams/use-case-diagram-relationships/)
- [System Boundaries in UML Use Case Diagrams – go-uml.com](https://www.go-uml.com/deep-dive-system-boundaries-uml-use-case-diagram/)
- [Include vs Extend – Sparx Systems](https://www.sparxsystems.us/enterprise-architect/include-vs-extend-use-case-diagrams-ea-uml/)
- [UML Use Case Diagram Tutorial – Lucidchart](https://www.lucidchart.com/pages/tutorial/uml-use-case-diagram)
