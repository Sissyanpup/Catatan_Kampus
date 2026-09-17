# Product Backlog & Roadmap MVP

> Diturunkan dari urutan build di `saran.txt` bagian 5, dipecah jadi backlog per epic supaya bisa langsung dipetakan ke sprint Agile di [`../CLAUDE.md`](../CLAUDE.md).

## Epic 1 — Auth, Role & Listing CRUD (tanpa payment)

- [x] Setup auth (Sanctum/JWT) untuk 3 role: admin, seller, buyer.
- [x] KYC seller (upload KTP, NPWP opsional untuk dealer) sebelum bisa listing.
- [x] CRUD listing kendaraan (foto, spesifikasi, dokumen STNK/BPKB) — pakai pola di [`04-activity-diagram-crud.md`](./04-activity-diagram-crud.md).
- [x] Gate: listing tidak tayang publik sebelum diverifikasi admin.
- [x] Halaman katalog + filter (merek, tahun, harga, lokasi) untuk buyer.

## Epic 2 — Payment Collection (Xendit Sandbox)

> Kelas berjalan **tanpa akses internet** (kesepakatan dengan dosen agar tidak perlu hosting) — lihat keputusan driver abstraction di [`03-payment-escrow.md`](./03-payment-escrow.md#6-driver-payment-gateway--offline-classroom-constraint).

- [x] Integrasi Xendit sandbox untuk terima pembayaran (collection saja, belum disbursement) — via `PaymentGateway` interface + `XenditGateway` (dipakai kalau ada internet).
- [x] Halaman checkout (deposit/DP alokasi unit).
- [x] Webhook handler status pembayaran (pending/success/failed) — plus endpoint polling (`refresh-status`) sebagai fallback saat webhook tidak bisa diakses (offline).

## Epic 3 — Escrow State Machine & Admin Approval

- [x] Definisikan state machine transaksi: `listing → deal → escrow_hold → serah_terima → payout_release → selesai` (lihat [`03-payment-escrow.md`](./03-payment-escrow.md)) — via `App\Escrow\EscrowStateMachine`.
- [x] Admin dashboard untuk approve transisi state (dengan audit trail: siapa & kapan) — `transaction_status_histories` mencatat setiap transisi.
- [x] Halaman tracking status transaksi untuk buyer & seller — termasuk konfirmasi serah-terima per pihak.
- [x] Dispute flow dasar (buyer/seller lapor ketidaksesuaian → admin review) — admin resolve via refund atau lanjutkan transaksi.

## Epic 4 — Disbursement ke Seller

- [x] Payout manual oleh admin dulu (trigger manual, bukan otomatis) — via `App\Payouts\PayoutService` + `ManualDisbursementGateway`.
- [x] Setelah stabil: otomatisasi disbursement via Xendit ke rekening seller — `XenditDisbursementGateway` (dipakai kalau ada internet, sama seperti pola `PaymentGateway` di Epic 2).
- [x] Rekonsiliasi laporan komisi platform vs payout seller — dashboard `/admin/payouts`, sumber data tabel `transaction_payouts` (bukan dihitung ulang dari `transactions`).

## Epic 5 — Polish, Performa & Hardening

- [x] Jalankan checklist performa 20 poin — lihat status per poin di [`02-tech-stack-arsitektur.md`](./02-tech-stack-arsitektur.md#2a-status-per-poin-sprint-5-diisi-2026-09-17) (17/20 selesai atau N/A untuk setup kelas ini; sisanya jadi TODO eksplisit, bukan diklaim selesai).
- [ ] Lighthouse audit halaman katalog & detail kendaraan — belum jalan (perlu Chrome DevTools manual, lihat catatan poin #13 di `docs/02`).
- [x] Review UX konsisten dengan pola CRUD & confirm-dialog di [`04-activity-diagram-crud.md`](./04-activity-diagram-crud.md) — sisa 5 halaman (`admin/kyc`, `admin/vehicles`, `seller/vehicles`, `seller/transactions/[id]`, `buyer/transactions/[id]`) sudah diganti ke `ConfirmModal` in-app, tidak ada lagi `window.confirm`/`prompt` di codebase.
- [ ] (Opsional) Terapkan tema visual AuraMotors — lihat [`05-desain-ui-auramotors.md`](./05-desain-ui-auramotors.md).

## Prioritas & Dependensi

```
Epic 1 (Auth+Listing) ──▶ Epic 2 (Payment Collection) ──▶ Epic 3 (Escrow+Approval) ──▶ Epic 4 (Disbursement) ──▶ Epic 5 (Polish)
```

Epic 5 (performa) bisa dicicil paralel di setiap sprint, tidak harus di akhir — lihat catatan di bagian Agile Cycle, `CLAUDE.md`.
