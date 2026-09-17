# Tech Stack & Arsitektur

> Sumber asli: `saran.txt` (bagian 2 & poin performa di akhir file).

## 1. Rekomendasi Layer

| Layer | Rekomendasi | Alasan |
| --- | --- | --- |
| Frontend | **Next.js 16 (App Router)** | Listing kendaraan butuh SEO bagus (orang cari "jual mobil Avanza 2020 Tangerang" di Google) + dashboard dinamis untuk 3 role berbeda. |
| Backend/API | **Laravel 12** (solo/cepat bangun) atau **NestJS** (full TypeScript) | Logic bisnis kompleks (komisi, escrow, verifikasi dokumen, multi-role) butuh struktur yang bertahan (service provider, policy, form request, observer, event system). |
| Database | **PostgreSQL** | Transaksi (escrow, payout) butuh ACID kuat; JSONB berguna untuk spesifikasi kendaraan yang variatif per kategori. |
| Auth | **Sanctum/JWT** + verifikasi dokumen manual/semi-otomatis (OCR KTP opsional) | Buyer auth ringan, seller wajib KYC sebelum bisa listing. |
| Storage | **S3-compatible** | Foto kendaraan banyak (10–20 per listing) + dokumen sensitif harus terpisah dari bucket publik. |

> Catatan: stack ini adalah *rekomendasi*, bukan keputusan final — sesuaikan dengan stack yang diwajibkan mata kuliah "Pemrograman Web 2" jika berbeda.

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
