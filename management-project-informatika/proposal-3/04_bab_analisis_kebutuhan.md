# Analisis kebutuhan

Bab sebelumnya menunjukkan jarak antara janji WiFi kampus dan kenyataannya di Gedung A. Bab ini menjawab pertanyaan berikutnya: apa saja yang harus ada supaya jarak itu tertutup.

Kebutuhan dibagi menjadi tiga. Yang pertama kebutuhan pengguna WiFi, yaitu mahasiswa dan dosen. Yang kedua kebutuhan pengelola WiFi kampus. Yang ketiga kebutuhan proyek ini sendiri supaya bisa berjalan.

## Kebutuhan pengguna

Setiap kebutuhan di bawah ini berangkat langsung dari satu masalah yang ditemukan.

| Masalah yang ditemukan                                                                             | Kebutuhan                                                                          |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Saat ramai, pengguna Gold hanya mendapat 3,79 Mbps dan pengguna Silver hanya 0,42 sampai 1,50 Mbps | Setiap pengguna tetap mendapat kecepatan sesuai paketnya, termasuk pada jam ramai  |
| Ruang V.731 di pojok lantai 7 hanya mendapat 4,0 Mbps walaupun gedung sepi                         | Sinyal sampai ke dalam semua ruang kelas, termasuk ruang di pojok dan ujung lantai |
| Saat ramai, pengguna Silver menunggu 824 sampai 2.491 milidetik untuk setiap balasan               | Internet tetap responsif saat ramai, walaupun kecepatannya dibatasi sesuai paket   |
| Mahasiswa M mengalami tiga kali putus dalam setengah hari kuliah                                   | Koneksi bertahan tanpa putus selama kuliah berlangsung                             |
| Dosen S kesulitan membuka halaman saat mengajar                                                    | Dosen bisa memakai internet di kelas tanpa menunggu lama                           |

Tiga kebutuhan pertama adalah inti proyek ini. Kebutuhan pertama dan ketiga berkaitan dengan cara internet dibagi kepada pengguna. Kebutuhan kedua berkaitan dengan cara access point diatur. Kalau ketiganya terpenuhi, dua kebutuhan terakhir ikut terbantu, karena koneksi yang putus dan halaman yang lambat termuat sama-sama dipengaruhi oleh sinyal dan kecepatan yang diterima.

### Ukuran keberhasilan

Supaya jelas kapan kebutuhan pengguna dianggap terpenuhi, kami memakai janji kampus sendiri sebagai ukurannya:

- Pada jam ramai, pengguna Gold mendapat paling sedikit 5 Mbps dan pengguna Silver paling sedikit 2 Mbps.
- Ukuran di atas berlaku di ruang yang dekat maupun jauh dari access point.
- Pada jam ramai, waktu tunggu balasan di bawah 100 milidetik, atau sepersepuluh detik. Di bawah batas ini, halaman masih terasa langsung bereaksi saat diklik.
- Selama satu sesi kuliah, koneksi WiFi tidak putus.

## Kebutuhan pengelola

Pengelola WiFi kampus, dalam hal ini IT Support, perlu bisa menjaga hasil proyek setelah proyek selesai. Untuk itu pengelola membutuhkan:

- Cara sederhana untuk melihat berapa orang yang tersambung ke tiap access point dan berapa kecepatan yang mereka dapat, terutama pada jam ramai.
- Aturan pembagian kecepatan yang tertulis dan mudah diubah kalau jumlah pengguna bertambah.
- Panduan singkat berisi pengaturan setiap access point, yaitu kanal dan kekuatan pancarannya, beserta alasannya, supaya penggantian atau penambahan alat di kemudian hari tetap mengikuti susunan yang sama.

## Kebutuhan proyek

Agar proyek ini bisa dikerjakan, ada beberapa hal yang harus disiapkan.

**Izin dan pendampingan dari kampus.** Proyek ini menyentuh perangkat dan pengaturan WiFi milik kampus. Tim membutuhkan izin tertulis dari Lembaga Pengembangan Teknologi Informasi UNPAM, dan setiap perubahan pengaturan dilakukan bersama petugas IT Support.

**Data resmi dari pengelola.** Pada tahap proposal, data ini tidak bisa kami dapat. Untuk merancang perbaikan, tim membutuhkan jumlah dan letak resmi access point, kapasitas internet yang masuk ke Gedung A, dan aturan pembagian kecepatan yang berlaku sekarang.

**Pengukuran ulang yang lebih lengkap.** Data di bab analisis masalah baru gambaran awal. Pengukuran di awal proyek perlu memakai HP, akun, dan alat uji yang sama untuk semua titik. Pengukuran juga perlu mencakup pengguna Silver dan Gold pada jam sepi maupun ramai, di lebih banyak ruang dan lantai, serta mencatat waktu tunggu, kekuatan sinyal, dan kanal access point di tiap titik. Hasilnya menjadi pembanding sebelum dan sesudah perbaikan.

**Perangkat.** Proyek ini memakai perangkat yang sudah ada dan hanya mengubah pengaturannya, tanpa memindahkan access point. Memindahkan atau menambah access point menjadi cadangan, hanya untuk ruang yang tetap tidak terjangkau setelah pengaturan ulang. Jumlahnya baru bisa ditentukan setelah pengukuran ulang.

**Tim.** Empat anggota tim mengerjakan pengukuran, perancangan, dan pendampingan penerapan. Pembagian tugas dan lama pengerjaan dijelaskan di bab estimasi waktu.

## Yang tidak termasuk kebutuhan proyek

Supaya proyek tetap fokus pada judulnya, beberapa hal berikut sengaja tidak dimasukkan:

- Menambah kapasitas internet kampus, karena itu keputusan pembelian dari pihak kampus.
- Kecepatan portal akademik, website kampus, atau aplikasi tertentu.
- Sinyal data seluler di dalam gedung.
- Kondisi WiFi di gedung selain Gedung A.
