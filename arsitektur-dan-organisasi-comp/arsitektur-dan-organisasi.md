# Arsitektur dan Organisasi Komputer

---

## Dua Konsep Fundamental, Satu Tujuan

| Konsep | Fokus | Contoh |
|---|---|---|
| **Arsitektur** | *Apa* yang dilakukan komputer | Set instruksi (ISA), ukuran word, mode pengalamatan |
| **Organisasi** | *Bagaimana* komputer melakukan sesuatu | Struktur CPU, hierarki memori, sistem bus |

> Arsitektur adalah antarmuka antara perangkat keras dan perangkat lunak. Organisasi adalah detail implementasi fisik dari arsitektur tersebut.

---

## Komponen Utama Sistem Komputer

Sistem komputer terdiri dari tiga blok besar:

```
┌──────────────┐     Bus Sistem     ┌────────────────┐
│   Prosesor   │◄──────────────────►│  Unit Memori   │
│    (CPU)     │                    │  (RAM / ROM)   │
└──────────────┘                    └────────────────┘
       ▲
       │ Bus Sistem
       ▼
┌──────────────┐
│  I/O Device  │
│ (Keyboard,   │
│  Monitor...) │
└──────────────┘
```

---

## Prosesor (CPU)

CPU adalah otak komputer. Di dalamnya terdapat tiga sub-komponen utama:

### 1. ALU (Arithmetic Logic Unit)

- Melakukan **operasi aritmatika**: penjumlahan, pengurangan, perkalian, pembagian
- Melakukan **operasi logika**: AND, OR, NOT, XOR, perbandingan
- Semua data yang diproses ALU berbentuk angka **biner**
- Output ALU disimpan sementara di register ACC (Accumulator)

### 2. Control Unit (CU)

Mengelola dan mengendalikan **seluruh operasi** di dalam komputer. CU mengambil instruksi dari memori, menafsirkannya, lalu mengarahkan komponen lain untuk menjalankannya.

#### Siklus Instruksi (Instruction Cycle)

CU bekerja dalam siklus berulang yang disebut **Fetch-Decode-Execute**:

```
  ┌─────────┐
  │  FETCH  │  ← Ambil instruksi dari memori (via PC → MAR → MDR → IR)
  └────┬────┘
       ▼
  ┌─────────┐
  │ DECODE  │  ← Terjemahkan instruksi biner di IR oleh instruction decoder
  └────┬────┘
       ▼
  ┌─────────┐
  │ EXECUTE │  ← Jalankan operasi (ALU, akses memori, atau loncatan)
  └────┬────┘
       ▼
  ┌─────────┐
  │  STORE  │  ← Simpan hasil ke register atau memori
  └────┬────┘
       │
       └──────────────► Ulangi dari FETCH
```

| Tahap | Proses |
|---|---|
| **Fetch** | PC menunjuk alamat instruksi → alamat dikirim ke MAR → instruksi dibaca ke MDR → disalin ke IR |
| **Decode** | CU menerjemahkan opcode di IR: operasi apa? data di mana? |
| **Execute** | ALU menghitung, atau memori diakses, atau PC diubah (jump/branch) |
| **Store** | Hasil disimpan ke register ACC atau ditulis ke memori |

> **Teknik Modern — Pipelining:** CPU modern tidak menunggu satu instruksi selesai sebelum memulai yang berikutnya. Fetch instruksi ke-2 dilakukan bersamaan saat instruksi ke-1 di-decode, dan instruksi ke-1 di-execute bersamaan dengan decode instruksi ke-2. Ini meningkatkan throughput CPU secara signifikan.

### 3. Register

Penyimpanan **internal CPU** berukuran kecil namun berkecepatan sangat tinggi. Data harus masuk ke register sebelum bisa diproses ALU.

| Register | Nama Lengkap | Fungsi |
|---|---|---|
| **PC** | Program Counter | Menyimpan alamat instruksi **berikutnya** yang akan dieksekusi |
| **IR** | Instruction Register | Menyimpan instruksi yang **sedang** dieksekusi |
| **MAR** | Memory Address Register | Menyimpan **alamat memori** yang akan dibaca/ditulis |
| **MDR** | Memory Data Register | Menyimpan **data** yang baru dibaca dari atau akan ditulis ke memori |
| **ACC** | Accumulator | Menyimpan **hasil** operasi ALU |

---

## Hierarki Memori

Memori diorganisasikan secara hierarkis berdasarkan kecepatan, kapasitas, dan harga:

```
          ┌──────────┐
          │ Register │  ← Tercepat, terkecil, termahal per-bit
          └────┬─────┘
               │
          ┌────┴─────┐
          │  Cache   │  ← L1, L2, L3
          └────┬─────┘
               │
          ┌────┴─────┐
          │   RAM    │  ← Main Memory (Primary Storage)
          └────┬─────┘
               │
          ┌────┴─────┐
          │  Disk /  │  ← HDD, SSD (Secondary Storage)
          │  Flash   │
          └──────────┘
         Terlambat, terbesar, termurah per-bit
```

### Primary Memory (Memori Utama)

Dapat diakses **langsung** oleh CPU.

| Jenis | Sifat | Fungsi |
|---|---|---|
| **RAM** (Random Access Memory) | Volatile (hilang saat mati) | Tempat kerja program aktif; CPU membaca/menulis data di sini |
| **ROM** (Read-Only Memory) | Non-volatile (permanen) | Menyimpan instruksi booting (BIOS/UEFI), tidak bisa diubah sembarang |

### Secondary Storage (Memori Sekunder)

**Tidak** langsung diakses CPU; data harus dipindahkan ke RAM dulu.

- **HDD (Hard Disk Drive)**: kapasitas besar, kecepatan mekanik (lambat)
- **SSD (Solid State Drive)**: kapasitas besar, kecepatan tinggi (elektronik)
- **Flash Drive / Optical Disc**: portable, backup

---

## Cache Memory

Cache adalah memori perantara antara CPU dan RAM, dengan kecepatan mendekati register namun kapasitas lebih besar.

**Masalah yang dipecahkan:** CPU modern jauh lebih cepat daripada RAM. Tanpa cache, CPU akan "menganggur" menunggu data dari RAM.

### Level Cache

| Level | Lokasi | Ukuran | Kecepatan |
|---|---|---|---|
| **L1** | Di dalam inti CPU (per-core) | 32–512 KB | ~1–5 siklus |
| **L2** | Di dalam chip CPU (per-core atau shared) | 256 KB – 4 MB | ~5–15 siklus |
| **L3** | Shared antar semua inti CPU | 4 MB – 64 MB+ | ~30–50 siklus |
| **RAM** | Di luar chip CPU | GBs | ~100–300 siklus |

### Prinsip Cache

- **Temporal Locality**: data yang baru diakses kemungkinan besar akan diakses lagi segera
- **Spatial Locality**: data yang berdekatan alamatnya kemungkinan besar akan diakses berurutan

---

## Sistem Bus

Bus adalah **jalur komunikasi** yang menghubungkan komponen-komponen dalam komputer. Satu bus sistem terdiri dari 50–100 saluran paralel.

### Tiga Jenis Bus Utama

```
CPU ──── Data Bus ────► Memori / I/O    (bidireksional, membawa data)
CPU ──── Address Bus ──► Memori / I/O   (unidireksional, menunjuk alamat)
CPU ──── Control Bus ──► Semua komponen (sinyal kontrol: read/write, interrupt)
```

| Bus | Arah | Fungsi |
|---|---|---|
| **Data Bus** | Dua arah | Membawa data, instruksi antara CPU, memori, dan I/O |
| **Address Bus** | Satu arah (dari CPU) | Menunjukkan alamat memori yang akan dibaca/ditulis |
| **Control Bus** | Dua arah | Membawa sinyal kontrol: read, write, interrupt, clock |

> Lebar **address bus** menentukan berapa banyak lokasi memori yang bisa dialamatkan. Lebar **data bus** menentukan berapa banyak bit yang dipindahkan dalam satu operasi.

---

## Ringkasan Alur Kerja Komputer

```
1. Program dimuat dari Disk → RAM
2. CPU (via PC) mengambil instruksi dari RAM
3. Instruksi disimpan di IR, data dicari di cache/RAM
4. CU mendekode instruksi → ALU mengeksekusi
5. Hasil disimpan ke Register/RAM
6. Ulangi hingga program selesai
```

---

*Sumber materi tambahan:*
- [GeeksforGeeks - Memory Hierarchy](https://www.geeksforgeeks.org/memory-hierarchy-design-and-its-characteristics/)
- [GeeksforGeeks - Instruction Cycles](https://www.geeksforgeeks.org/computer-organization-architecture/different-instruction-cycles/)
- [Vaia - Fetch Decode Execute Cycle](https://www.vaia.com/en-us/explanations/computer-science/computer-organisation-and-architecture/fetch-decode-execute-cycle/)
- [Medium - Memory Hierarchy](https://medium.com/@prajun_t/the-memory-hierarchy-74f7cb963099)
- [Kompasiana - Bus dan Sistem Interkoneksi](https://www.kompasiana.com/lintang11/60aa0e53d541df46b368c8a2/arsitektur-komputer-bus-dan-sistem-interkoneksi)
- [Academia - Struktur CPU dan Cache Memory](https://www.academia.edu/23173334/STRUKTUR_CPU_DAN_CACHE_MEMORY)
