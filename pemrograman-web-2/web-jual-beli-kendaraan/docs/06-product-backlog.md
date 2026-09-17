# Product Backlog & Roadmap MVP

> Diturunkan dari urutan build di `saran.txt` bagian 5, dipecah jadi backlog per epic supaya bisa langsung dipetakan ke sprint Agile di [`../CLAUDE.md`](../CLAUDE.md).

## Epic 1 — Auth, Role & Listing CRUD (tanpa payment)
- [ ] Setup auth (Sanctum/JWT) untuk 3 role: admin, seller, buyer.
- [ ] KYC seller (upload KTP, NPWP opsional untuk dealer) sebelum bisa listing.
- [ ] CRUD listing kendaraan (foto, spesifikasi, dokumen STNK/BPKB) — pakai pola di [`04-activity-diagram-crud.md`](./04-activity-diagram-crud.md).
- [ ] Gate: listing tidak tayang publik sebelum diverifikasi admin.
- [ ] Halaman katalog + filter (merek, tahun, harga, lokasi) untuk buyer.

## Epic 2 — Payment Collection (Xendit Sandbox)
- [ ] Integrasi Xendit sandbox untuk terima pembayaran (collection saja, belum disbursement).
- [ ] Halaman checkout (deposit/DP alokasi unit).
- [ ] Webhook handler status pembayaran (pending/success/failed).

## Epic 3 — Escrow State Machine & Admin Approval
- [ ] Definisikan state machine transaksi: `listing → deal → escrow_hold → serah_terima → payout_release → selesai` (lihat [`03-payment-escrow.md`](./03-payment-escrow.md)).
- [ ] Admin dashboard untuk approve transisi state (dengan audit trail: siapa & kapan).
- [ ] Halaman tracking status transaksi untuk buyer & seller.
- [ ] Dispute flow dasar (buyer/seller lapor ketidaksesuaian → admin review).

## Epic 4 — Disbursement ke Seller
- [ ] Payout manual oleh admin dulu (trigger manual, bukan otomatis).
- [ ] Setelah stabil: otomatisasi disbursement via Xendit ke rekening seller.
- [ ] Rekonsiliasi laporan komisi platform vs payout seller.

## Epic 5 — Polish, Performa & Hardening
- [ ] Jalankan checklist performa 20 poin — lihat [`02-tech-stack-arsitektur.md`](./02-tech-stack-arsitektur.md).
- [ ] Lighthouse audit halaman katalog & detail kendaraan.
- [ ] Review UX konsisten dengan pola CRUD & confirm-dialog di [`04-activity-diagram-crud.md`](./04-activity-diagram-crud.md).
- [ ] (Opsional) Terapkan tema visual AuraMotors — lihat [`05-desain-ui-auramotors.md`](./05-desain-ui-auramotors.md).

## Prioritas & Dependensi

```
Epic 1 (Auth+Listing) ──▶ Epic 2 (Payment Collection) ──▶ Epic 3 (Escrow+Approval) ──▶ Epic 4 (Disbursement) ──▶ Epic 5 (Polish)
```

Epic 5 (performa) bisa dicicil paralel di setiap sprint, tidak harus di akhir — lihat catatan di bagian Agile Cycle, `CLAUDE.md`.
