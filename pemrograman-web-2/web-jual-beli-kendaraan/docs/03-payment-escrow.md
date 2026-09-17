# Payment & Escrow

> Sumber asli: `saran.txt` (bagian 3). Ini bagian paling kritis dari seluruh sistem — kesalahan di sini = risiko finansial nyata.

## 1. Prinsip Dasar

Untuk marketplace multi-vendor, uang buyer harus **otomatis terpisah** antara komisi platform dan payout ke seller — bukan dipisah manual.

**Pola escrow untuk kendaraan** (beda dari marketplace barang kecil):

```
Buyer bayar → uang masuk akun platform (holding)
            → admin/buyer konfirmasi serah-terima kendaraan
            → baru di-disburse ke seller
```

Bukan auto-split real-time seperti marketplace barang kecil, karena risiko sengketa jauh lebih tinggi (nilai besar, barang fisik, legalitas kompleks).

## 2. Pilihan Provider (basis Indonesia)

| Provider     | Kapan Dipilih                                                             | Catatan                                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Xendit**   | Kalau butuh kirim uang keluar (bayar seller, refund massal)               | Disbursement adalah produk kelas satu: payout ke 450+ bank & e-wallet, single & batch payout. Satu provider untuk terima + kirim uang → rekonsiliasi lebih rapi. |
| **Midtrans** | Kalau fokus hanya menerima pembayaran & pakai Laravel (plugin siap pakai) | Historisnya tidak punya fitur disbursement native (ada produk terpisah "Iris", tapi bukan fokus utama).                                                          |

**Rekomendasi konkret**: pakai **Xendit** dari awal jika kemungkinan besar butuh disbursement (hampir pasti untuk marketplace kendaraan), supaya tidak perlu migrasi provider di tengah jalan.

## 3. Urutan Integrasi (selaras dengan MVP)

1. Xendit **sandbox** untuk collection (buyer bayar) dulu — tanpa disbursement.
2. State machine escrow hold + admin dashboard approve.
3. Disbursement ke seller — mulai dengan **admin trigger manual** sebelum diotomatisasi penuh.

## 4. State Machine Transaksi (disarankan)

```
listing → deal → escrow_hold → serah_terima → payout_release → selesai
                     │
                     └─(dispute)→ admin_review → (refund_buyer | lanjut payout)
```

Setiap transisi state sebaiknya:

- Dicatat sebagai histori (audit trail), bukan overwrite kolom status.
- Punya pemilik aksi yang jelas (siapa yang trigger: sistem, admin, buyer, atau seller).

**Implementasi (Epic 3, Sprint 3)**: state machine di atas diimplementasikan di `App\Escrow\EscrowStateMachine` (backend), satu-satunya tempat yang boleh mengubah `transactions.escrow_status`. Setiap transisi ditulis sebagai baris baru di tabel `transaction_status_histories` (from/to status, actor, catatan, timestamp) — bukan overwrite. Alurnya:

1. Pembayaran jadi Lunas (via mock/webhook/polling) → sistem otomatis pindah ke `escrow_hold` + vehicle jadi `sold`.
2. Buyer & seller masing-masing konfirmasi serah-terima lewat endpoint sendiri (`confirm-handover`) — ini baru catatan, bukan transisi state.
3. Admin approve transisi `escrow_hold → serah_terima` (setelah kedua pihak konfirmasi), lalu `serah_terima → payout_release`, lalu `payout_release → selesai` — tiga endpoint approval terpisah di dashboard admin (`/admin/transactions`), tiap approval tercatat siapa & kapan.
4. Buyer/seller bisa membuka dispute selama `escrow_hold`/`serah_terima` → escrow_status jadi `dispute` (state sebelumnya disimpan). Admin resolve lewat refund (vehicle balik ke `approved`) atau lanjutkan (kembali ke state sebelum dispute).

## 5. Driver Payment Gateway & Kendala Offline Kelas

Kelas ini berjalan **sepenuhnya tanpa akses internet** (kesepakatan dengan dosen supaya tidak perlu bayar hosting) — bukan cuma "tidak ada domain publik", tapi benar-benar tidak ada koneksi keluar sama sekali saat demo/dinilai. Itu berarti API Xendit manapun (termasuk sandbox) tidak bisa dipanggil di kelas.

**Solusi**: abstraksi `App\Payments\PaymentGateway` (backend Laravel) dengan dua implementasi, dipilih lewat `PAYMENT_GATEWAY_DRIVER` di `.env`:

- `MockGateway` (default) — 100% offline. "Invoice" hanya berupa halaman simulasi di frontend (`/checkout/mock/{reference}`) dengan tombol "Bayar Sekarang" / "Gagalkan" yang langsung mengubah status transaksi di DB sendiri, tanpa network call.
- `XenditGateway` — panggil API asli Xendit (`/v2/invoices`), dipakai kalau developer punya akses internet di luar kelas. Sudah didukung juga endpoint webhook (`POST /api/webhooks/xendit`) dan polling fallback (`POST /api/buyer/transactions/{id}/refresh-status`) untuk kasus webhook tidak bisa diakses (belum ada tunnel publik).

Konsekuensi: alur checkout, status pembayaran (pending/paid/failed/expired), dan escrow state machine (Epic 3) tetap bisa didemokan penuh secara offline lewat `MockGateway`; fitur webhook Xendit asli tidak pernah teruji di lingkungan kelas, hanya di luar kelas oleh developer sendiri.

## 6. Terkait

- Peran admin dalam approve/verifikasi → [`01-domain-dan-peran.md`](./01-domain-dan-peran.md)
- Alur konkret escrow di desain UI (checkout, tracking) → [`05-desain-ui-auramotors.md`](./05-desain-ui-auramotors.md)
- Pola konfirmasi (confirm dialog) untuk aksi berisiko seperti release dana → [`04-activity-diagram-crud.md`](./04-activity-diagram-crud.md) bagian Edit/Delete
