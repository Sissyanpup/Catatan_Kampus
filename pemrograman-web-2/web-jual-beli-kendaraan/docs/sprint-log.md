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

- Item backlog yang diambil: bukan dari `docs/06` (backlog belum ada) — sprint ini justru yang _menghasilkan_ backlog. Fokus: rapikan seluruh file eksplorasi (`saran.txt`, `referensi-umum.md`, `log-chat-konteks.txt`, `!-- Design System --.html`) jadi dokumentasi terstruktur.
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
- Tanggal selesai: 2026-09-17

**Sprint Planning**

- Item backlog: Epic 1 di `docs/06-product-backlog.md`.
- Keputusan stack dikunci sebelum sprint mulai: Laravel 13 + Next.js 16, monorepo `/backend` + `/frontend` (lihat `docs/02-tech-stack-arsitektur.md`).
- Definition of Done: validasi client (Next.js form) + server (Laravel form request) ada di tiap form; role admin/seller/buyer di-gate lewat policy, bukan cek ad-hoc; listing baru berstatus non-public sampai admin approve; audit trail (siapa & kapan) untuk approve/reject listing; tidak ada N+1 query di endpoint katalog (checklist performa poin 3 & 7 di `docs/02`).

**Selama Sprint (Daily Progress Check)**

- 2026-09-17: Scaffold awal selesai — `composer create-project laravel/laravel backend` (Laravel 13.32) dan `create-next-app` (Next.js 16.3.5, TypeScript + Tailwind + App Router) di root monorepo. `.gitignore` masing-masing sudah mengecualikan `vendor/`, `node_modules/`, `.env`. Belum ada model/migration/route custom — masih default framework.
- 2026-09-17: Implementasi penuh Epic 1 (auth Sanctum SPA, KYC seller, CRUD listing kendaraan, gate verifikasi admin, katalog+filter publik) — backend (Laravel: migrations, model+enum, policy, form request, controller, API resource, route) dan frontend (Next.js: auth context, halaman register/login, area seller KYC+listing, area admin review KYC+listing, katalog publik SSR). 30 PHPUnit feature test lolos; frontend lolos `tsc`, `next build`, `next lint`. Diverifikasi ulang lewat smoke test HTTP nyata (curl) dan lewat browser (Claude in Chrome) untuk alur penuh: daftar seller → submit KYC → admin approve KYC → seller buat listing → submit review → admin approve listing → tampil di katalog publik tanpa login.
- 2026-09-17: Blocker environment ditemukan & diperbaiki saat setup: extension `pdo_sqlite`/`sqlite3` nonaktif di `php.ini` sistem (perlu akses admin, diaktifkan user manual); `#[Fillable]` model terlalu ketat sempat diam-diam menolak update kolom `status`/`reviewed_by` (baru ketahuan lewat smoke test HTTP, bukan dari PHPUnit) — sudah diperbaiki + ditambah `Model::preventSilentlyDiscardingAttributes()`/`preventAccessingMissingAttributes()` di `AppServiceProvider` supaya bug serupa ketahuan lebih awal lain kali.

**Sprint Review (Demo)**

- Berhasil: seluruh 5 item backlog Epic 1 selesai dan didemokan end-to-end (lihat `docs/06-product-backlog.md`, sudah dicentang). Auth pakai Sanctum SPA (cookie/session, bukan Bearer token) sesuai keputusan bersama user. Endpoint privat (dokumen KTP/NPWP/STNK/BPKB) di-stream lewat route terproteksi policy, bukan URL publik langsung.
- Belum selesai / dipindah ke sprint berikutnya: Epic 2 (Xendit sandbox, checkout) belum disentuh — sesuai urutan deployment-first di `CLAUDE.md`. DB masih SQLite lokal (bukan PostgreSQL sesuai `docs/02`) — perlu keputusan/migrasi sebelum fitur yang butuh JSONB lanjutan atau sebelum deploy.

**Retrospective**

- Baik: pola CRUD & audit trail dari `docs/04`/`docs/01` konsisten diterapkan (reviewed_by/reviewed_at/rejection_reason di KYC & listing, gate verifikasi sebelum tayang publik, policy per role bukan cek ad-hoc). Kombinasi PHPUnit + smoke test HTTP nyata + verifikasi browser efektif menangkap bug yang lolos dari unit test (mass-assignment silent drop, partial-column select yang bikin field hilang).
- Perlu diperbaiki: PHPUnit saja tidak cukup untuk menangkap bug yang hanya muncul di jalur HTTP nyata (real cookie/CSRF, real mass-assignment default) — smoke test manual/browser tetap perlu jadi langkah wajib sebelum epic ditutup, bukan opsional.
- Aksi untuk Sprint 2: mulai Epic 2 (`docs/06`) — integrasi Xendit sandbox untuk collection pembayaran; putuskan status SQLite vs PostgreSQL sebelum menambah kolom JSONB baru.

---

## Sprint 2 — Payment Collection (Xendit Sandbox)

- Tanggal mulai: 2026-09-17
- Tanggal selesai: 2026-09-17

**Sprint Planning**

- Item backlog: Epic 2 di `docs/06-product-backlog.md`.
- Kendala baru yang ditemukan saat planning: kelas berjalan **sepenuhnya tanpa akses internet** (bukan cuma tanpa hosting), jadi API Xendit manapun tidak bisa dipanggil saat demo/dinilai. Keputusan: bangun abstraksi `PaymentGateway` dengan driver `mock` (offline, default) dan `xendit` (online, opsional) — detail di `docs/03-payment-escrow.md` bagian 5.
- Definition of Done: checkout tervalidasi client+server (min. DP 10% harga); transaksi tidak bisa dobel untuk vehicle yang sama (cek status aktif); ownership transaksi di-gate lewat policy; status pembayaran (pending/paid/failed/expired) konsisten di kedua driver; alur offline (mock) bisa didemokan penuh tanpa internet; test PHPUnit + verifikasi browser nyata sebelum epic ditutup (pelajaran dari retro Sprint 1).

**Selama Sprint (Daily Progress Check)**

- 2026-09-17: Backend — migration `transactions`, model+enum (`TransactionPaymentStatus`, `PaymentGatewayDriver`), abstraksi `App\Payments\PaymentGateway` (interface) dengan `MockGateway` (simulasi 100% offline) & `XenditGateway` (HTTP client ke Xendit asli, dibind lewat `AppServiceProvider` berdasar `PAYMENT_GATEWAY_DRIVER`), `CheckoutController` (buyer: checkout, list, detail, refresh-status polling), `MockPaymentController` (simulasi bayar/gagal), `XenditWebhookController` (verifikasi `x-callback-token`), policy `TransactionPolicy` + ability `checkout` di `VehiclePolicy`. 8 feature test baru (44 total lolos): checkout, validasi DP, cegah dobel transaksi, ownership, mock pay/fail, webhook (token cocok/salah), polling status via `Http::fake`.
- 2026-09-17: Frontend — halaman `/buyer/transactions` (list) & `/buyer/transactions/[id]` (detail + tombol cek status), halaman simulasi invoice offline `/checkout/mock/[reference]` (pengganti halaman checkout Xendit asli), `CheckoutWidget` di halaman detail kendaraan publik untuk mengajukan DP. `tsc`, `next lint`, `next build` lolos.
- 2026-09-17: Diverifikasi end-to-end lewat browser (Claude in Chrome) dengan buyer & vehicle nyata: ajukan DP → redirect ke invoice simulasi → klik "Bayar Sekarang" → status jadi "Lunas" di halaman invoice, detail transaksi, dan daftar transaksi; percobaan checkout kedua pada vehicle yang sama ditolak dengan pesan 409 yang tampil di form. Smoke test curl manual dilewati (CSRF cookie parsing di shell terpisah dari masalah fitur ini) — verifikasi browser dianggap cukup karena menjalankan kode HTTP yang identik dengan yang dipakai frontend asli.

**Sprint Review (Demo)**

- Berhasil: seluruh 3 item backlog Epic 2 selesai (lihat `docs/06-product-backlog.md`). Alur DP checkout jalan penuh secara offline (driver mock jadi default), sekaligus siap dipakai dengan Xendit sandbox asli (kunci test mode milik user) kalau dites di luar kelas — driver `xendit` sudah diverifikasi lewat `Http::fake` (belum dites dengan kunci asli/jaringan nyata).
- Belum selesai / dipindah ke sprint berikutnya: Epic 3 (state machine escrow, admin dashboard approval, tracking buyer+seller, dispute) — transaksi yang sudah "Lunas" belum mengubah status kendaraan jadi `sold` atau memicu escrow hold, itu scope Epic 3. DB masih SQLite (belum pindah ke PostgreSQL, sama seperti catatan Sprint 1).

**Retrospective**

- Baik: memisahkan payment gateway jadi interface (`PaymentGateway`) dari awal membuat constraint offline kelas (yang baru ketahuan di tengah planning) tidak memaksa desain ulang — cukup tambah `MockGateway` tanpa menyentuh controller/route.
- Perlu diperbaiki: smoke test curl manual (pola yang dipakai Sprint 1 untuk verifikasi HTTP nyata) gagal karena parsing cookie CSRF di shell, bukan karena bug aplikasi — kalau perlu smoke test di luar PHPUnit, verifikasi lewat browser (Claude in Chrome) lebih andal daripada curl untuk endpoint yang pakai Sanctum SPA cookie/CSRF.
- Aksi untuk Sprint 3: mulai Epic 3 (`docs/06`) — state machine escrow (`deal → escrow_hold → serah_terima → payout_release → selesai`), admin dashboard approval, dan update status kendaraan jadi `sold` setelah transaksi lunas & escrow selesai.

---

## Sprint 3 — Escrow State Machine & Admin Approval

- Tanggal mulai: 2026-09-17
- Tanggal selesai: 2026-09-17

**Sprint Planning**

- Item backlog: Epic 3 di `docs/06-product-backlog.md`.
- Definition of Done: setiap transisi escrow tercatat di audit trail (siapa & kapan, bukan overwrite kolom status saja); transisi hanya bisa dipicu lewat urutan yang valid (state machine menolak transisi tidak sah dengan 409/422); buyer & seller masing-masing hanya bisa mengonfirmasi/dispute transaksi miliknya sendiri (policy, bukan cek ad-hoc); admin approval terpisah dari konfirmasi buyer/seller (bukan otomatis); dispute bisa diselesaikan admin lewat refund atau lanjutkan transaksi; test PHPUnit + verifikasi browser nyata sebelum epic ditutup (pelajaran dari retro Sprint 1 & 2).

**Selama Sprint (Daily Progress Check)**

- 2026-09-17: Backend — migration nambah kolom escrow (`escrow_status`, konfirmasi buyer/seller, field dispute) ke `transactions` + tabel baru `transaction_status_histories` (audit trail append-only). Enum `EscrowStatus`. Service `App\Escrow\EscrowStateMachine` jadi satu-satunya tempat logika transisi (`holdFunds`, `confirmHandover`, `approveHandover`, `approvePayoutRelease`, `markCompleted`, `openDispute`, `resolveDispute`) — dipanggil dari `MockPaymentController`, `XenditWebhookController`, & `CheckoutController::refreshStatus` (transisi ke `escrow_hold` otomatis saat status pembayaran jadi Lunas, sekaligus vehicle di-set `sold`, sesuai catatan di retro Sprint 2). Endpoint baru: buyer & seller (`TransactionController@confirmHandover`/`dispute`, plus `index`/`show` dipindah dari `Buyer\CheckoutController` ke controller bersama ini supaya seller bisa pakai logika yang sama untuk transaksi penjualannya lewat `salesTransactions()`), admin (`Admin\TransactionReviewController` — index dengan filter `escrow_status`, approve-handover, approve-payout, mark-completed, resolve-dispute). Policy `TransactionPolicy` diperluas: seller juga bisa lihat transaksi miliknya, ability baru `manage` untuk admin. 11 feature test baru (55 total lolos): full happy path escrow_hold → serah_terima → payout_release → selesai, dispute open + resolve (refund & resume), penolakan transisi tidak sah, dan isolasi akses antar pihak.
- 2026-09-17: Ditemukan & diperbaiki 2 bug lewat test HTTP nyata (bukan cuma unit test) — sama seperti pelajaran retro Sprint 1: (1) eager-load kolom vehicle yang dipartialselect (`vehicle:id,brand,model,year`) di admin index bikin `VehicleResource` gagal akses `price`/`mileage` karena `preventAccessingMissingAttributes` aktif; (2) `whenLoaded('actor', ...)` di resource riwayat status selalu return "tidak termuat" untuk aksi sistem (`actor_id` null) — ternyata Eloquent tidak memanggil `setRelation()` untuk BelongsTo saat foreign key null walau relasinya sudah di-eager-load, jadi field `actor` hilang dari response padahal seharusnya tampil "Sistem". Kedua bug diperbaiki sebelum epic ditutup.
- 2026-09-17: Frontend — halaman tracking `/seller/transactions` (list) & `/seller/transactions/[id]` (detail + konfirmasi serah-terima + lapor dispute), update halaman buyer yang sudah ada dengan badge escrow, tombol konfirmasi/dispute, & riwayat status; dashboard admin baru `/admin/transactions` (filter per escrow status, expand detail, tombol approve per tahap, resolve dispute). Komponen baru `EscrowStatusBadge` & `TransactionStatusHistory`. `tsc`, `next lint`, `next build` lolos.
- 2026-09-17: Verifikasi browser (Claude in Chrome): alur checkout → bayar mock → escrow_hold otomatis & vehicle hilang dari katalog publik (status jadi sold) berhasil didemokan penuh; alur dispute (buyer lapor → admin dashboard menampilkan alasan & tombol refund/lanjutkan) berhasil didemokan penuh sampai ke riwayat status. Tombol yang di baliknya memakai `window.confirm`/`window.prompt` (konfirmasi serah-terima, approve admin per tahap, resolve dispute) **tidak bisa diklik lewat Claude in Chrome** — dialog native mem-freeze koneksi CDP tab (percobaan pertama sempat membekukan tab, harus ditutup paksa; dipastikan lewat tinker state tidak berubah/tidak ada efek samping). Jalur ini tetap tervalidasi lewat 55 PHPUnit feature test yang memanggil endpoint yang sama persis dengan yang dipanggil UI.

**Sprint Review (Demo)**

- Berhasil: seluruh 4 item backlog Epic 3 selesai (lihat `docs/06-product-backlog.md`). State machine escrow lengkap dengan audit trail, dashboard admin approval, halaman tracking buyer & seller, dan dispute flow (buka + resolusi refund/lanjutkan) semuanya jalan end-to-end dan terverifikasi.
- Belum selesai / dipindah ke sprint berikutnya: Epic 4 (disbursement ke seller) — status `payout_release` di Epic 3 baru mencatat *persetujuan* admin, belum ada pemindahan dana nyata (payout Xendit atau manual) ke rekening seller. DB masih SQLite (belum pindah ke PostgreSQL, catatan berulang dari Sprint 1 & 2).

**Retrospective**

- Baik: memisahkan seluruh logika transisi ke satu service (`EscrowStateMachine`) bikin state machine yang cukup kompleks (6 status + cabang dispute) tetap mudah diuji & konsisten dipanggil dari 3 titik masuk pembayaran berbeda (mock, webhook, polling) tanpa duplikasi aturan transisi.
- Perlu diperbaiki: dua bug baru (partial-column eager load, `whenLoaded` dengan foreign key null) sama persis polanya dengan bug Sprint 1 (partial-column select bikin field hilang) — pola ini jelas berulang dan seharusnya dicurigai lebih awal setiap kali menulis resource baru yang mengandalkan `whenLoaded`/eager load parsial, bukan ditemukan lagi lewat trial-and-error tiap sprint.
- Baru (temuan alat): `window.confirm`/`window.prompt` di UI mem-freeze tab Claude in Chrome secara permanen (CDP tidak bisa mengirim `Page.handleJavaScriptDialog`) — untuk verifikasi browser aksi berisiko ke depan, hindari klik tombol yang memicu dialog native ini; andalkan PHPUnit untuk jalur itu, atau pertimbangkan mengganti `window.confirm`/`prompt` dengan modal in-app kalau verifikasi browser end-to-end penuh diperlukan.
- Aksi untuk Sprint 4: mulai Epic 4 (`docs/06`) — payout manual dulu oleh admin (trigger manual berbasis status `payout_release` yang sudah ada), baru otomatisasi disbursement Xendit; sekalian evaluasi apakah `window.confirm`/`prompt` di admin/buyer/seller perlu diganti modal in-app supaya verifikasi browser epic berikutnya tidak kena masalah yang sama.

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
