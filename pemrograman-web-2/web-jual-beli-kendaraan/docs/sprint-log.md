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

- Tanggal mulai: 2026-09-17
- Tanggal selesai: 2026-09-17

**Sprint Planning**

- Item backlog: Epic 4 di `docs/06-product-backlog.md`.
- Definition of Done: pencairan dana adalah aksi terpisah dari approval `payout_release` (bukan otomatis ikut approval); setiap percobaan payout tercatat sebagai baris baru (bukan overwrite status) untuk keperluan rekonsiliasi; komisi platform dihitung konsisten dari satu sumber config (`PLATFORM_COMMISSION_RATE`); transaksi tidak bisa ditandai selesai sebelum dana benar-benar cair; rekening bank seller diisi mandiri tanpa perlu review ulang KYC; driver payout (`manual`/`xendit`) mengikuti pola abstraksi offline-first yang sama seperti `PaymentGateway` di Epic 2; test PHPUnit + verifikasi browser nyata sebelum epic ditutup (pelajaran dari retro Sprint 1–3).

**Selama Sprint (Daily Progress Check)**

- 2026-09-17: Backend — migration nambah `bank_name/bank_account_number/bank_account_holder_name` ke `seller_profiles`, `payout_status` ke `transactions`, tabel baru `transaction_payouts` (ledger append-only per percobaan payout: method, status, commission_rate/amount, payout_amount, reference, failure_reason, initiated_by). Enum `PayoutMethod`, `TransactionPayoutStatus`. Abstraksi `App\Payouts\DisbursementGateway` (interface) dengan `ManualDisbursementGateway` (100% offline, admin input nomor referensi transfer sebagai bukti) & `XenditDisbursementGateway` (HTTP client ke Xendit Disbursement API asli, dibind lewat `AppServiceProvider` berdasar `PAYOUT_GATEWAY_DRIVER` — sama pola dengan `PaymentGateway` Epic 2). `App\Payouts\PayoutService` menghitung split komisi/payout, menulis baris `transaction_payouts` + entri `transaction_status_histories`, dan meng-cache status terakhir ke `transactions.payout_status`, dibungkus `DB::transaction` supaya gagal-gateway tidak meninggalkan baris payout menggantung. `EscrowStateMachine::markCompleted` diperketat: sekarang mensyaratkan `payout_status = paid`, bukan cuma `escrow_status = payout_release`. Endpoint baru: admin (`TransactionReviewController@disburse`, `Admin\PayoutReconciliationController@index` untuk laporan rekonsiliasi), seller (`SellerBankAccountController@update`, terpisah dari alur KYC supaya update rekening tidak memicu review ulang admin). Policy `SellerProfilePolicy::manageBankAccount` (beda dari `update` KYC — boleh diubah kapan pun, termasuk setelah approved). 14 feature test baru (69 total lolos): split komisi, guard urutan state (belum payout_release, sudah dibayar dua kali), guard mark-completed sebelum payout, validasi rekening bank, driver Xendit via `Http::fake`, isolasi akses, dan rekonsiliasi hanya menghitung payout berstatus `paid`.
- 2026-09-17: Frontend — form rekening bank di halaman `/seller/kyc` (terpisah dari form dokumen KYC, tidak perlu re-review). Halaman admin `/admin/transactions` dapat aksi baru "Cairkan Dana ke Penjual" (tampil setelah `payout_release`, sebelum `mark-completed` yang sekarang butuh payout lunas dulu) + tampilan rekening bank seller & riwayat payout. Halaman baru `/admin/payouts` (rekonsiliasi: total komisi vs total payout vs jumlah payout berhasil, plus tabel detail). Sekalian menuntaskan aksi retro Sprint 3: dibuat komponen `ConfirmModal` in-app dan dipakai untuk **seluruh** aksi di `/admin/transactions` (approve-handover, approve-payout, disburse, mark-completed, resolve-dispute) menggantikan `window.confirm`/`window.prompt` yang sebelumnya bikin tab Claude in Chrome freeze permanen. Halaman lain (`admin/kyc`, `admin/vehicles`, `seller/vehicles`, `seller/transactions/[id]`, `buyer/transactions/[id]`) masih pakai `window.confirm`/`prompt` — belum diganti, di luar scope Epic 4, dicatat sebagai kandidat kerja lanjutan. `tsc`, `next lint`, `next build` lolos.
- 2026-09-17: Diverifikasi end-to-end lewat browser (Claude in Chrome) dengan seed data tinker (bukan pengganti test — 81 PHPUnit test tetap jadi bukti utama logika benar, seeding cuma untuk mengecek UI baru bisa dipakai manusia): login seller → isi & simpan rekening bank → sukses; login admin → dashboard escrow menampilkan rekening bank penjual → klik "Cairkan Dana ke Penjual" → modal in-app muncul (bukan `window.prompt`, tidak freeze tab) → isi nomor referensi → submit → badge "Dana Dicairkan" muncul, riwayat payout & riwayat status terisi benar (komisi 3% dari Rp150jt = Rp4,5jt, payout Rp145,5jt) → "Tandai Selesai" baru muncul setelah payout lunas → halaman `/admin/payouts` menampilkan total yang sama persis.
- 2026-09-17: Ditemukan & diperbaiki 1 bug lewat test (bukan browser kali ini) — agregat SUM di SQLite mengembalikan angka tanpa 2 desimal tetap (`"4500000"` bukan `"4500000.00"`), beda dari `decimal:2` cast Eloquent biasa; diperbaiki dengan `number_format` eksplisit di `PayoutReconciliationController` alih-alih mengandalkan cast otomatis pada hasil raw aggregate query.

**Sprint Review (Demo)**

- Berhasil: seluruh 3 item backlog Epic 4 selesai (lihat `docs/06-product-backlog.md`). Payout manual jalan penuh offline (driver `manual` default), sekaligus siap dipakai dengan Xendit asli di luar kelas (driver `xendit`, diverifikasi lewat `Http::fake`, belum dites dengan kunci asli/jaringan nyata — sama seperti keterbatasan `XenditGateway` di Epic 2). Rekonsiliasi komisi vs payout jalan dari ledger `transaction_payouts`, bukan dihitung ulang.
- Belum selesai / dipindah ke sprint berikutnya: Epic 5 (polish, checklist performa, opsional tema AuraMotors) — termasuk keputusan SQLite vs PostgreSQL yang masih tertunda dari Sprint 1–3. Penggantian `window.confirm`/`prompt` ke modal in-app baru mencakup `/admin/transactions`; halaman lain masih pakai dialog native dan berisiko kena masalah freeze CDP yang sama kalau nanti perlu diverifikasi lewat browser lagi.

**Retrospective**

- Baik: mengikuti pola abstraksi `PaymentGateway` dari Epic 2 untuk `DisbursementGateway` bikin kendala offline kelas (yang sudah diantisipasi sejak Sprint 2) tidak perlu dipikir ulang — tinggal tambah driver `manual` & `xendit` dengan bentuk yang sama. Memisahkan "approve payout_release" (Epic 3) dari "cairkan dana" (Epic 4) sebagai dua aksi berbeda, dengan `markCompleted` mensyaratkan payout lunas, mencegah kelas bug "ditandai selesai padahal uang belum pindah" yang justru jadi concern utama domain escrow ini sejak awal (lihat `docs/01`).
- Perlu diperbaiki: dua sprint terakhir (3 & 4) sama-sama nemu bug yang baru ketahuan lewat test HTTP/agregat nyata, bukan logika unit biasa — kali ini soal representasi desimal dari raw SQL aggregate (`SUM()`) yang tidak otomatis ikut cast Eloquent seperti kolom biasa. Pola "hasil raw query butuh formatting eksplisit, jangan asumsikan konsisten dengan cast model" perlu langsung dicurigai tiap kali menulis endpoint laporan/agregat baru.
- Aksi untuk Sprint 5: mulai Epic 5 (`docs/06`) — jalankan checklist performa 20 poin, Lighthouse audit, dan putuskan final soal SQLite vs PostgreSQL sebelum submit tugas. Kalau ada waktu lebih, lanjutkan penggantian `window.confirm`/`prompt` di halaman-halaman yang belum tersentuh (`admin/kyc`, `admin/vehicles`, `seller/vehicles`, `seller/transactions/[id]`, `buyer/transactions/[id]`) supaya seluruh verifikasi browser epic-epic berikutnya konsisten tidak berisiko freeze tab.

---

## Sprint 5 — Polish, Performa & Hardening

- Tanggal mulai: 2026-09-17
- Tanggal selesai: _(belum ditutup — Lighthouse audit, review UX, & tema AuraMotors opsional masih terbuka)_

**Sprint Planning**

- Item backlog: Epic 5 di `docs/06-product-backlog.md`.
- Sebelum mulai Epic 5, diverifikasi dulu kerja Epic 4 (disbursement) yang masih uncommitted di git: 69 test PHPUnit lolos + `next build`/`tsc`/`lint` bersih — dipastikan bukan kerja yang setengah jalan sebelum menumpuk perubahan baru di atasnya.
- Definition of Done: tiap poin checklist performa (`docs/02` §2) diberi status jelas (selesai/N/A/pending) dengan alasan, bukan dicentang tanpa verifikasi; setiap fix yang mengubah query/response punya test regresi; tidak ada regresi di 69+ test yang sudah ada; verifikasi browser nyata untuk perubahan yang menyentuh gambar/caching (pelajaran retro Sprint 1-4: PHPUnit saja tidak menangkap bug driver-specific).

**Selama Sprint (Daily Progress Check)**

- 2026-09-17: Backend — fix over-fetching N+1-adjacent di 4 endpoint list (`VehicleCatalogController`, `Admin\VehicleReviewController@index`, `Seller\VehicleController@index`, `TransactionController@index`) yang sebelumnya eager-load **semua** foto kendaraan padahal cuma butuh 1 cover; ditambah relasi `Vehicle::coverPhoto()` (HasOne + `orderBy('sort_order')`). Index baru `vehicles.seller_id` & `transactions.seller_id`. `App\Support\ImageOptimizer` (GD, tanpa dependency baru) mengompres foto kendaraan saat upload (maks lebar 1600px). `App\Support\CatalogCache` — cache 30s untuk `GET /api/vehicles` per kombinasi filter, invalidasi lewat version counter yang di-bump otomatis di event `Vehicle::saved()`/`deleted()` (bukan `Cache::tags()` karena cache store `database` project ini tidak mendukung tagging — sudah dicek langsung, `BadMethodCallException`). 5 test baru + 2 test unit `ImageOptimizer` (74 total lolos).
- 2026-09-17: Ditemukan & diperbaiki 1 bug produksi lewat verifikasi browser nyata (bukan dari 74 PHPUnit yang lolos) — sama persis pola retro Sprint 1-4 "test lolos tapi jalur HTTP nyata beda": men-cache `LengthAwarePaginator`/model Eloquent langsung lewat `Cache::remember` crash saat `unserialize()` dengan cache store `database` (test environment pakai store `array` yang tidak pernah benar-benar serialize, jadi tidak ketahuan). Diperbaiki dengan cache payload array hasil `VehicleResource::collection(...)->response()->getData(true)`, bukan objek Eloquent mentah. Ditambah test regresi baru yang eksplisit memaksa `config(['cache.default' => 'database'])` supaya kelas bug ini tidak lolos lagi tanpa ketahuan.
- 2026-09-17: Frontend — ganti seluruh `<img>` di katalog (`/`) & detail kendaraan (`/kendaraan/[id]`) ke `next/image` (lazy-load native, compress otomatis, responsive `sizes`). Ditemukan bug kedua saat verifikasi browser: Next.js 16 punya SSRF guard baru yang menolak optimize image dari host yang resolve ke IP privat/localhost secara default (`⨯ upstream image ... hostname resolved to private IP`) — perlu `images.dangerouslyAllowLocalIP: true` di `next.config.ts` karena setup kelas ini sengaja menjalankan backend+frontend di localhost yang sama (`docs/02` §6). Loading skeleton ditambahkan dengan `<Suspense>` yang di-scope ke grid hasil katalog saja (bukan `app/loading.tsx` di root — itu akan otomatis membungkus SEMUA route lain termasuk `/login`, `/admin/*`, dst. karena mereka semua children dari root layout yang sama); untuk `/kendaraan/[id]` yang merupakan route daun tanpa child, `loading.tsx` di folder tersebut aman dipakai langsung.
- 2026-09-17: Sisa 16 poin checklist performa (`docs/02`) dinilai satu per satu: mayoritas sudah otomatis terpenuhi dari pilihan stack (code splitting & minify by Next.js build) atau memang tidak relevan untuk setup offline-lokal tanpa hosting (Load Balancer, CDN, Connection Pooling, defer script pihak ketiga karena memang tidak ada). Lighthouse Audit (#13) sengaja **tidak** diklaim selesai — CLI `lighthouse` tidak terpasang dan instalasi butuh internet (kelas offline), jadi dipindah jadi TODO manual lewat Chrome DevTools, bukan dicentang begitu saja.

**Sprint Review (Demo)**

- Berhasil: 74 test PHPUnit (naik dari 69) + `next build`/`tsc`/`lint` tetap bersih setelah seluruh perubahan performa. Diverifikasi manual lewat browser (Claude in Chrome) dengan foto kendaraan asli: katalog & detail kendaraan menampilkan cover photo lewat `next/image` dengan benar setelah kedua bug produksi (cache unserialize, SSRF guard) ditemukan & diperbaiki — foto & artefak sementara yang dipakai untuk verifikasi sudah dibersihkan setelah selesai.
- Belum selesai / tetap terbuka: Lighthouse audit (perlu dijalankan manual), review UX/confirm-dialog untuk halaman yang masih pakai `window.confirm`/`prompt` (Sprint 4 baru menuntaskan `/admin/transactions`), tema AuraMotors (opsional), dan keputusan final SQLite vs PostgreSQL yang sudah berulang kali disebut sejak Sprint 1. Sprint ini belum ditutup karena item-item tersebut masih terbuka.

**Retrospective**

- Baik: menulis status eksplisit per poin checklist (selesai/N/A/pending + alasan) di `docs/02` mencegah godaan menandai sesuatu "selesai" padahal cuma "tidak relevan" atau "belum sempat" — beda makna yang penting untuk laporan tugas.
- Perlu diperbaiki: dua bug produksi baru (cache unserialize, SSRF guard Next.js 16) sama-sama baru ketahuan lewat verifikasi browser nyata, bukan dari test suite — ini retro Sprint 1-4 yang berulang lagi. Ditambahkan test regresi yang memaksa cache store nyata (`database`) untuk kasus pertama; kasus kedua (SSRF guard) murni behavior Next.js 16 yang tidak bisa dites lewat PHPUnit sama sekali, jadi verifikasi browser tetap wajib untuk setiap perubahan yang menyentuh `next/image`.
- Aksi untuk sisa Sprint 5: jalankan Lighthouse audit manual di Chrome DevTools untuk `/` & `/kendaraan/[id]`, lanjutkan penggantian `window.confirm`/`prompt` di halaman yang belum tersentuh, putuskan final SQLite vs PostgreSQL, lalu baru pertimbangkan tema AuraMotors (opsional) sebelum menutup sprint & submit tugas.

**Selama Sprint — lanjutan (2026-09-18)**

- 2026-09-18: Tuntaskan aksi retro sebelumnya — ganti seluruh `window.confirm`/`window.prompt` yang tersisa (`admin/kyc`, `admin/vehicles`, `seller/vehicles`, `seller/transactions/[id]`, `buyer/transactions/[id]`) ke `ConfirmModal` in-app, mengikuti pola persis `admin/transactions` (Sprint 4): state `pendingAction`/`isSubmitting`, field teks untuk alasan penolakan KYC/listing, modal tanpa field untuk aksi konfirmasi sederhana (hapus, ajukan review, konfirmasi serah-terima). `tsc`, `next lint`, `next build` lolos bersih; 75 test PHPUnit tetap lolos (tidak ada endpoint yang berubah, murni UI).
- 2026-09-18: Verifikasi browser (Claude in Chrome) end-to-end: login admin → reject KYC via modal dengan alasan teks → tersimpan & list refresh (tanpa freeze tab, beda dari `window.prompt` native dulu). Login seller → hapus listing draft via modal tanpa field → berhasil terhapus.
- 2026-09-18: Temuan alat: klik sintetis `computer` tool (CDP `Input.dispatchMouseEvent`) sempat tidak memicu `onClick` React di halaman `seller/vehicles` walau elemen & ref valid (button yang sama berhasil diklik normal di `admin/kyc`) — dikonfirmasi bukan bug aplikasi lewat `document.querySelector(...).click()` terprogram di `javascript_tool`, yang langsung memicu modal & aksi dengan benar. Kemungkinan flakiness CDP spesifik sesi ini, bukan pola yang perlu diperbaiki di kode. Dicatat sebagai referensi kalau muncul lagi: coba klik terprogram via `javascript_tool` sebagai fallback verifikasi sebelum menyimpulkan ada bug UI.
- 2026-09-18: Backlog Sprint 5 item "Review UX konsisten" ditandai selesai di `docs/06-product-backlog.md`. Sisa item terbuka: Lighthouse audit manual dan keputusan final SQLite vs PostgreSQL.
- 2026-09-18: Kerja ConfirmModal di atas diverifikasi ulang (75 test PHPUnit, `tsc`, `next lint`, `next build` bersih) dan di-commit (`ab9bc9a`) — sebelumnya masih uncommitted di working tree.
- 2026-09-18: Keputusan final database ditutup bersama user: **tetap SQLite**, bukan migrasi ke PostgreSQL — alasan lengkap di `docs/02-tech-stack-arsitektur.md` §1b (tugas solo/offline, tidak ada kebutuhan JSONB nyata, migrasi menjelang akhir pengerjaan berisiko regresi tanpa manfaat terukur).
- 2026-09-18: Lighthouse audit (poin performa #13) dicoba lewat otomasi browser dulu — ternyata **tidak feasible**: panel Chrome DevTools bukan bagian dari tab/halaman yang bisa dikontrol Claude in Chrome (ekstensi beroperasi di level konten tab via CDP, bukan UI DevTools itu sendiri), dan CLI `lighthouse` butuh instalasi lewat internet yang tidak tersedia di setup kelas offline ini (dikonfirmasi ulang: tidak ada di `PATH`, tidak ter-install global/lokal). Server sudah disiapkan untuk audit manual: backend `php artisan serve` (localhost:8000) & frontend production build `npm start` (localhost:3000, dipilih atas `next dev` supaya skor merepresentasikan build produksi, bukan mode dev yang punya overhead HMR). User memilih menjalankan audit ini sendiri secara manual — hasil menyusul.
- 2026-09-18: Tema visual AuraMotors ("Obsidian & Champagne Gold", `docs/05`) diterapkan ke seluruh aplikasi. Font Bodoni Moda (display) & Manrope (body) di-download manual (variable woff2 dari Google Fonts) dan disimpan di `frontend/src/app/fonts/`, dimuat lewat `next/font/local` (bukan `next/font/google`) supaya build tidak butuh internet di kelas offline — pola yang sama dengan `PaymentGateway`/`DisbursementGateway` (offline-first by design, bukan ditambal belakangan). Token warna/font/radius didefinisikan sekali di `globals.css` (Tailwind v4 `@theme`): background obsidian `#121315`, primary champagne gold `#f2ca50`/`#d4af37`, radius scale dipersempit ("precision-cut" sesuai `docs/05`). Komponen bersama direstyle manual (`Header`, `ConfirmModal`) dan komponen `Badge` baru dibuat untuk menyatukan 4 badge status (`StatusBadge`, `EscrowStatusBadge`, `PaymentStatusBadge`, `PayoutStatusBadge`) yang sebelumnya duplikat map warna sendiri-sendiri.
- 2026-09-18: 17 halaman sisanya (katalog, detail kendaraan, auth, seluruh dashboard admin/seller/buyer) direstyle lewat script Node satu-kali (`retheme.js`, dijalankan lalu dihapus — bukan bagian dari aplikasi) yang menukar kelas Tailwind literal (`bg-white`, `text-zinc-*`, `border-zinc-*`, tombol `bg-zinc-900`) ke token semantik (`bg-surface-container`, `text-on-surface[-muted]`, `border-border`, `bg-primary-container`), berdasar pola kelas yang sudah sangat konsisten diulang di seluruh halaman (diverifikasi lewat grep sebelum scripting, bukan tebakan). Tombol aksi admin yang sengaja pakai warna berbeda-beda per tahap (emerald/red/indigo/purple/teal untuk approve/reject/disburse) **tidak diubah** — warna solid itu tetap kontras baik di atas latar gelap, mengubahnya hanya menambah risiko tanpa manfaat visual. 5 sisa token zinc yang lolos dari aturan generik (`divide-zinc-100`, 3× `border-zinc-300` pada tombol outline) ditemukan lewat grep pasca-script dan diperbaiki manual.
- 2026-09-18: Diverifikasi: `tsc`, `next lint`, `next build` bersih; 75 test PHPUnit tetap lolos (murni perubahan frontend, tidak menyentuh backend). Diverifikasi visual lewat browser (Claude in Chrome) di 4 halaman representatif (katalog, dashboard seller, login, detail kendaraan) — computed style dicek eksplisit lewat `getComputedStyle` untuk memastikan warna teks benar-benar token yang dimaksud (bukan cuma dari screenshot, yang sempat terlihat kebiruan di font serif kecil akibat artefak kompresi JPEG, ternyata `rgb(227, 226, 229)` = `--color-on-surface` yang benar).
