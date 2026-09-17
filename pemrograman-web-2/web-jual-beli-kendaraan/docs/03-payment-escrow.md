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

| Provider | Kapan Dipilih | Catatan |
| --- | --- | --- |
| **Xendit** | Kalau butuh kirim uang keluar (bayar seller, refund massal) | Disbursement adalah produk kelas satu: payout ke 450+ bank & e-wallet, single & batch payout. Satu provider untuk terima + kirim uang → rekonsiliasi lebih rapi. |
| **Midtrans** | Kalau fokus hanya menerima pembayaran & pakai Laravel (plugin siap pakai) | Historisnya tidak punya fitur disbursement native (ada produk terpisah "Iris", tapi bukan fokus utama). |

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

## 5. Terkait

- Peran admin dalam approve/verifikasi → [`01-domain-dan-peran.md`](./01-domain-dan-peran.md)
- Alur konkret escrow di desain UI (checkout, tracking) → [`05-desain-ui-auramotors.md`](./05-desain-ui-auramotors.md)
- Pola konfirmasi (confirm dialog) untuk aksi berisiko seperti release dana → [`04-activity-diagram-crud.md`](./04-activity-diagram-crud.md) bagian Edit/Delete
