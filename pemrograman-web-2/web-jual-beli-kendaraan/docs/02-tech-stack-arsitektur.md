# Tech Stack & Arsitektur

> Sumber asli: `saran.txt` (bagian 2 & poin performa di akhir file).

## 1. Stack Final (Keputusan)

> Dosen tidak mewajibkan framework tertentu. Stack di bawah **sudah final** (dikonfirmasi 2026-09-17), dipilih atas dasar prioritas *selesai tepat waktu dengan fitur lengkap* untuk pengerjaan solo — bukan lagi opsi terbuka.

| Layer | Keputusan | Alasan |
| --- | --- | --- |
| Frontend | **Next.js 16 (App Router)** | Listing kendaraan butuh SEO bagus (orang cari "jual mobil Avanza 2020 Tangerang" di Google) + dashboard dinamis untuk 3 role berbeda. |
| Backend/API | **Laravel 13** | Dipilih di atas NestJS karena kecepatan bangun untuk solo dev: Eloquent ORM, Sanctum, migration, form request, policy sudah built-in — mengurangi boilerplate dibanding setup DI/module manual di NestJS. Cocok untuk target selesai tepat waktu dengan scope fitur lengkap (auth, KYC, escrow, payment). |
| Database | **PostgreSQL** | Transaksi (escrow, payout) butuh ACID kuat; JSONB berguna untuk spesifikasi kendaraan yang variatif per kategori. |
| Auth | **Laravel Sanctum** + verifikasi dokumen manual/semi-otomatis (OCR KTP opsional) | Buyer auth ringan, seller wajib KYC sebelum bisa listing. |
| Storage | **S3-compatible** | Foto kendaraan banyak (10–20 per listing) + dokumen sensitif harus terpisah dari bucket publik. |

> Kalau nanti ada keputusan yang berubah dari yang tercatat di atas, update tabel ini agar tidak menyesatkan pembaca berikutnya (lihat `CLAUDE.md` bagian 4).

## 1a. Struktur Repo

Monorepo — satu repo Git ini berisi dua project terpisah:

```
/backend   → Laravel 13 (API)
/frontend  → Next.js 16 (App Router)
```

Masing-masing punya `.gitignore` sendiri (`vendor/`, `node_modules/`, `.env` sudah dikecualikan). Dijalankan sebagai dua proses terpisah saat development (`php artisan serve` + `npm run dev`), berkomunikasi lewat REST API.

## 2. Checklist Performa (wajib dipertimbangkan sebelum deployment)

Daftar berikut adalah 20 poin optimisasi yang harus dicek satu per satu sebelum rilis / demo tugas:

1. Cache API response
2. Load Balancer
3. Index the Database
4. Compress Image
5. Loading Skeletons
6. Cache Expensive Queries
7. N+1 Database Queries (hindari)
8. Debounce Input Handlers
9. Split Code into Chunk
10. Add CDN
11. Server-side Caching
12. Paginate Large Lists
13. Lighthouse Audit
14. Compress API Payloads
15. Unnecessary Re-renders (hindari)
16. Minify JS and CSS
17. Add Lazy Loading
18. Defer Non-Critical Scripts
19. Unused Dependencies (bersihkan)
20. Database Connection Pooling

## 3. Urutan Build (Deployment-First)

1. Auth + role (admin/seller/buyer) + listing CRUD dulu, **tanpa payment**.
2. Integrasi Xendit sandbox untuk *collection* (buyer bayar) — test dulu tanpa disbursement.
3. Tambah state machine transaksi (escrow hold) + admin dashboard approve.
4. Baru integrasi *disbursement* ke seller setelah flow-nya jalan manual dulu (admin trigger payout manual sebelum diotomatisasi).

Urutan ini menjadi dasar pembagian sprint — lihat [`06-product-backlog.md`](./06-product-backlog.md) dan bagian **Agile Cycle** di `CLAUDE.md`.

## 4. Terkait

- Detail payment/escrow provider → [`03-payment-escrow.md`](./03-payment-escrow.md)
