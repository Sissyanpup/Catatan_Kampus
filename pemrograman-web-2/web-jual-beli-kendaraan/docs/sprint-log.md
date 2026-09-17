# Sprint Log

> Catatan progres tiap sprint sesuai siklus Agile di [`../CLAUDE.md`](../CLAUDE.md) bagian 3. Update bagian **Selama Sprint** setiap ada progres, isi **Review** & **Retrospective** di akhir sprint sebelum lanjut ke sprint berikutnya.

## Format Entri per Sprint

```
### Sprint N — <Fokus Epic>
- Tanggal mulai: YYYY-MM-DD
- Tanggal selesai: YYYY-MM-DD (isi saat sprint ditutup)

**Sprint Planning**
- Item backlog yang diambil (dari docs/06-product-backlog.md): ...
- Definition of Done: ...

**Selama Sprint (Daily Progress Check)**
- YYYY-MM-DD: ...

**Sprint Review (Demo)**
- Apa yang berhasil didemokan: ...
- Apa yang belum selesai / dipindah ke sprint berikutnya: ...

**Retrospective**
- Apa yang berjalan baik: ...
- Apa yang perlu diperbaiki: ...
- Aksi untuk sprint berikutnya: ...
```

---

## Sprint 0 — Eksplorasi Domain, Stack & Desain Visual

- Tanggal mulai: 2026-09-17
- Tanggal selesai: 2026-09-17

**Sprint Planning**
- Item backlog yang diambil: bukan dari `docs/06` (backlog belum ada) — sprint ini justru yang *menghasilkan* backlog. Fokus: rapikan seluruh file eksplorasi (`saran.txt`, `referensi-umum.md`, `log-chat-konteks.txt`, `!-- Design System --.html`) jadi dokumentasi terstruktur.
- Definition of Done: `CLAUDE.md` + `docs/01`–`docs/06` tersedia dan saling ditautkan; file mentah tetap disimpan sebagai riwayat.

**Selama Sprint (Daily Progress Check)**
- 2026-09-17: Analisis 4 file sumber di root → dipecah jadi `docs/01-domain-dan-peran.md`, `docs/02-tech-stack-arsitektur.md`, `docs/03-payment-escrow.md`, `docs/04-activity-diagram-crud.md`, `docs/05-desain-ui-auramotors.md`, `docs/06-product-backlog.md`. `CLAUDE.md` dibuat sebagai master index + siklus Agile.
- 2026-09-17: File `!-- Design System --.txt` di-rename user jadi `!-- Design System --.html` (agar bisa dirender di browser) dan dikonfirmasi sebagai rujukan UI/UX resmi — dokumen terkait diperbarui.

**Sprint Review (Demo)**
- Berhasil: seluruh dokumentasi domain, stack, payment/escrow, pola CRUD, desain UI, dan backlog sudah terstruktur dan siap dipakai sebagai acuan development.
- Belum selesai: belum ada kode aplikasi (backend/frontend) — ini adalah scope Sprint 1 dan seterusnya.

**Retrospective**
- Baik: sumber-sumber eksplorasi (chat log, saran AI, desain) berhasil dikonsolidasi jadi satu struktur dokumen yang bisa ditelusuri, bukan tersebar di banyak file `.txt` tanpa struktur.
- Perlu diperbaiki: belum ada Sprint Log sebelumnya (baru dibuat di sprint ini) — mulai sprint berikutnya, isi log harian secara rutin, jangan ditulis retroaktif.
- Aksi untuk Sprint 1: mulai Epic 1 (`docs/06-product-backlog.md`) — auth, role, KYC seller, CRUD listing kendaraan, gate verifikasi admin.

---

## Sprint 1 — Auth, Role & Listing CRUD

- Tanggal mulai: 2026-09-17
- Tanggal selesai: _(isi saat sprint ditutup)_

**Sprint Planning**
- Item backlog: Epic 1 di `docs/06-product-backlog.md`.
- Keputusan stack dikunci sebelum sprint mulai: Laravel 13 + Next.js 16, monorepo `/backend` + `/frontend` (lihat `docs/02-tech-stack-arsitektur.md`).
- Definition of Done: validasi client (Next.js form) + server (Laravel form request) ada di tiap form; role admin/seller/buyer di-gate lewat policy, bukan cek ad-hoc; listing baru berstatus non-public sampai admin approve; audit trail (siapa & kapan) untuk approve/reject listing; tidak ada N+1 query di endpoint katalog (checklist performa poin 3 & 7 di `docs/02`).

**Selama Sprint (Daily Progress Check)**
- 2026-09-17: Scaffold awal selesai — `composer create-project laravel/laravel backend` (Laravel 13.32) dan `create-next-app` (Next.js 16.3.5, TypeScript + Tailwind + App Router) di root monorepo. `.gitignore` masing-masing sudah mengecualikan `vendor/`, `node_modules/`, `.env`. Belum ada model/migration/route custom — masih default framework.

**Sprint Review (Demo)**
- _(isi)_

**Retrospective**
- _(isi)_

---

## Sprint 2 — Payment Collection (Xendit Sandbox)

- Tanggal mulai: _(isi saat mulai)_
- Tanggal selesai: _(isi saat sprint ditutup)_

**Sprint Planning**
- Item backlog: Epic 2 di `docs/06-product-backlog.md`.
- Definition of Done: _(isi)_

**Selama Sprint (Daily Progress Check)**
- _(isi)_

**Sprint Review (Demo)**
- _(isi)_

**Retrospective**
- _(isi)_

---

## Sprint 3 — Escrow State Machine & Admin Approval

- Tanggal mulai: _(isi saat mulai)_
- Tanggal selesai: _(isi saat sprint ditutup)_

**Sprint Planning**
- Item backlog: Epic 3 di `docs/06-product-backlog.md`.
- Definition of Done: _(isi)_

**Selama Sprint (Daily Progress Check)**
- _(isi)_

**Sprint Review (Demo)**
- _(isi)_

**Retrospective**
- _(isi)_

---

## Sprint 4 — Disbursement ke Seller

- Tanggal mulai: _(isi saat mulai)_
- Tanggal selesai: _(isi saat sprint ditutup)_

**Sprint Planning**
- Item backlog: Epic 4 di `docs/06-product-backlog.md`.
- Definition of Done: _(isi)_

**Selama Sprint (Daily Progress Check)**
- _(isi)_

**Sprint Review (Demo)**
- _(isi)_

**Retrospective**
- _(isi)_

---

## Sprint 5 — Polish, Performa & Hardening

- Tanggal mulai: _(isi saat mulai)_
- Tanggal selesai: _(isi saat sprint ditutup)_

**Sprint Planning**
- Item backlog: Epic 5 di `docs/06-product-backlog.md`.
- Definition of Done: _(isi)_

**Selama Sprint (Daily Progress Check)**
- _(isi)_

**Sprint Review (Demo)**
- _(isi)_

**Retrospective**
- _(isi)_
