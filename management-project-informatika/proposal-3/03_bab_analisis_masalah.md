# Analisis masalah

Masalah muncul ketika apa yang diharapkan tidak sama dengan apa yang terjadi. Bab ini membandingkan dua hal di Gedung A UNPAM Viktor. Yang pertama adalah WiFi kampus seperti yang dijanjikan. Yang kedua adalah WiFi kampus seperti yang kami ukur dan dengar langsung dari penggunanya.

## Apa yang diharapkan

Pada Maret 2025, Lembaga Pengembangan Teknologi Informasi UNPAM mengumumkan layanan WiFi berbayar lewat poster yang dibagikan di Instagram. Poster itu berjanji "sinyal kuat", "jaminan ga PHP", dan "internetan tanpa drama disconnect", mulai dari ruang kelas, perpustakaan, sampai kantin. Ada dua paket yang ditawarkan:

- Paket Silver dengan kecepatan 2 Mbps.
- Paket Gold dengan kecepatan 5 sampai 7 Mbps.

Mbps adalah satuan kecepatan internet. Makin besar angkanya, makin cepat halaman web terbuka dan file terunduh.

Harapan pengguna sederhana. Mahasiswa yang sudah membayar ingin mendapat kecepatan sesuai paketnya, dan dosen ingin bisa membuka bahan ajar di kelas tanpa menunggu lama. Keduanya ingin koneksi tidak putus di tengah kuliah.

## Apa yang terjadi

### Kecepatan saat sepi dan saat ramai

Kami mengukur kecepatan WiFi di Gedung A pada dua hari. Selasa, 13 Oktober 2026 pagi sampai siang kami pakai untuk mewakili jam ramai karena ruang kelas hampir penuh. Jumat, 16 Oktober 2026 pagi sampai siang mewakili jam sepi karena sebagian kelas berlangsung daring.

| Tempat                               | Waktu               | Paket  | Kecepatan nyata | Janji paket     |
| ------------------------------------ | ------------------- | ------ | --------------- | --------------- |
| Ruang V.512, agak dekat access point | Jumat sepi, 10.46   | Gold   | 6,55 Mbps       | 5 sampai 7 Mbps |
| Ruang V.705, agak dekat access point | Jumat sepi, 10.49   | Gold   | 6,73 Mbps       | 5 sampai 7 Mbps |
| Ruang V.731, jauh dari access point  | Jumat sepi, 10.59   | Gold   | 4,0 Mbps        | 5 sampai 7 Mbps |
| Ruang V.316, dekat access point      | Selasa ramai, 10.04 | Gold   | 3,79 Mbps       | 5 sampai 7 Mbps |
| Ruang V.705, agak dekat access point | Selasa ramai, 10.14 | Silver | 1,50 Mbps       | 2 Mbps          |
| Pojok lorong lantai 3 dekat musala   | Selasa ramai, 12.33 | Silver | 0,42 Mbps       | 2 Mbps          |

Saat sepi, WiFi bekerja seperti yang dijanjikan. Dua ruang yang agak dekat dengan access point mendapat kecepatan di dalam rentang paket Gold.

Ruang V.731 berbeda. Ruang itu berada di pojok lantai 7 dan jauh dari access point, sehingga hanya mendapat 4,0 Mbps walaupun gedung sedang sepi. Ini masih di bawah janji paling rendah paket Gold. Ini menunjukkan jarak dari access point ikut menentukan kecepatan yang didapat.

Saat ramai, tidak ada satu pun titik yang mencapai janji paketnya. Pengguna Gold di ruang V.316 hanya mendapat 3,79 Mbps, padahal ruang itu dekat dengan access point. Angka ini sedikit di atas separuh kecepatan yang didapat ruang V.512 dan V.705 saat sepi. Pengguna Silver di ruang V.705 mendapat tiga perempat dari janjinya. Di pojok lorong lantai 3, pengguna Silver hanya mendapat 0,42 Mbps, atau sekitar seperlima dari janji paketnya.

### Waktu tunggu saat ramai

Selain kecepatan, Speedtest juga mencatat waktu tunggu, yaitu berapa lama HP menunggu balasan saat sedang mengunduh. Satuannya milidetik, dan 1.000 milidetik sama dengan 1 detik. Makin kecil angkanya, makin cepat halaman bereaksi saat diklik. Waktu tunggu tidak tercatat pada uji di ruang V.731 karena uji itu memakai fast.com.

| Tempat | Waktu | Paket | Waktu tunggu |
|---|---|---|---|
| Ruang V.512 | Jumat sepi, 10.46 | Gold | 18 milidetik |
| Ruang V.705 | Jumat sepi, 10.49 | Gold | 17 milidetik |
| Ruang V.316 | Selasa ramai, 10.04 | Gold | 14 milidetik |
| Ruang V.705 | Selasa ramai, 10.14 | Silver | 824 milidetik |
| Pojok lorong lantai 3 dekat musala | Selasa ramai, 12.33 | Silver | 2.491 milidetik |

Pengguna Gold tetap mendapat balasan cepat, baik saat sepi maupun ramai. Pengguna Silver saat ramai harus menunggu hampir 1 detik sampai 2,5 detik untuk setiap balasan. Bagi pengguna, ini terasa seperti halaman yang diam saja setelah diklik. Data ini baru berasal dari dua pengguna Silver, sehingga polanya perlu diperiksa lagi pada pengukuran awal proyek.

### Koneksi yang putus dan pengalaman pengguna

Pada Rabu, 7 Oktober 2026, seorang mahasiswa berinisial M di kelas V.730 mengalami WiFi kampus putus tiga kali antara pukul 08.00 sampai 13.00. Setiap kali putus, HP-nya berpindah sendiri ke data seluler, sehingga ia memakai kuota pribadinya. Hal ini berlawanan dengan janji "tanpa drama disconnect".

Pada hari yang sama, sekitar pukul 11.00, mahasiswa berinisial P di kelas V.705 mengeluh sulit memakai internet lewat WiFi kampus. Pada hari dan di ruang yang sama, seorang dosen berinisial S juga mengalami hal serupa saat mengajar di kelas kami: halaman yang ia buka lama sekali termuat karena sinyal sulit didapat.

### Letak access point

Access point adalah alat yang memancarkan sinyal WiFi. Di lantai yang kami amati, kami menghitung sekitar 10 sampai 12 access point. Lantai 4 sampai 7 masing-masing punya sekitar 31 ruang kelas (dengan asumsi skema di lantai 7 dan melihat langsung sekilas ke lantai lainnya), sehingga satu access point rata-rata harus menjangkau sekitar tiga ruang kelas.

Denah lantai 7 yang kami gambar menunjukkan semua access point dipasang di lorong, di luar ruang kelas. Sinyal harus menembus dinding untuk sampai ke dalam kelas, dan ruang di ujung atau pojok lantai menjadi yang paling jauh dari sumber sinyal. Hasil ruang V.731 di atas sejalan dengan gambaran ini.

Walaupun begitu, 12 access point di lantai 7 tersebar cukup merata di sepanjang lorong. Jumlah dan letaknya tidak terlihat sebagai masalah utama. Yang belum kami ketahui adalah cara access point itu diatur, misalnya apakah access point yang bersebelahan saling mengganggu karena memakai kanal yang sama.

### Keterangan dari pengelola

Pada Jumat, 16 Oktober 2026 pukul 09.00, seorang petugas IT Support berinisial S menyebut bahwa pengguna WiFi kampus di gedung saat ini hanya sedikit. Ia tidak menyebut angkanya.

Keterangan ini penting. Kalau orang di gedung banyak tetapi yang memakai WiFi kampus sedikit, dan kecepatan tetap turun saat jam ramai, masalahnya kemungkinan bukan pada banyaknya pengguna WiFi. Dugaan kami, masalahnya ada pada cara internet dibagi kepada pengguna dan pada cara access point diatur. Dugaan ini akan diperiksa pada tahap pengukuran di awal proyek.

## Jarak antara harapan dan kenyataan

| Yang diharapkan                            | Yang terjadi                                                                |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| Pengguna Gold mendapat 5 sampai 7 Mbps     | Saat ramai hanya 3,79 Mbps, dan di ruang pojok saat sepi pun hanya 4,0 Mbps |
| Pengguna Silver mendapat 2 Mbps            | Saat ramai hanya 1,50 Mbps, bahkan 0,42 Mbps di pojok lorong                |
| Internet terasa lancar saat dipakai        | Saat ramai, pengguna Silver menunggu hampir 1 sampai 2,5 detik tiap balasan |
| Sinyal kuat dari ruang kelas sampai kantin | Ruang yang jauh dari access point mendapat kecepatan lebih rendah           |
| Internet tanpa putus                       | Seorang mahasiswa mengalami tiga kali putus dalam setengah hari kuliah      |
| Dosen bisa memakai internet saat mengajar  | Dosen kesulitan membuka halaman di kelas karena sinyal sulit                |

## Mengapa ini perlu diselesaikan

Mahasiswa yang membayar paket Silver atau Gold belum mendapat apa yang dijanjikan, terutama pada jam kuliah ketika internet paling dibutuhkan. Saat WiFi putus, mahasiswa seperti M beralih ke kuota pribadi, sehingga mengeluarkan biaya dua kali. Dosen seperti S kehilangan waktu mengajar karena menunggu halaman terbuka. Kalau dibiarkan, pengguna bisa berhenti berlangganan dan kepercayaan pada layanan WiFi kampus ikut turun.

## Rumusan masalah

Dari jarak antara harapan dan kenyataan di atas, proyek ini akan menjawab dua pertanyaan:

1. Bagaimana mengatur access point yang sudah ada agar sinyal sampai merata ke semua ruang kelas, termasuk ruang di pojok dan ujung lantai?
2. Bagaimana membagi internet yang sudah ada agar pengguna mendapat kecepatan sesuai paketnya dan internet tetap responsif, terutama pada jam ramai?

Kedua pertanyaan ini akan dijawab dengan memaksimalkan perangkat dan internet yang sudah dimiliki kampus, tanpa membeli tambahan kapasitas internet. Yang diutamakan adalah mengubah pengaturan, bukan memindahkan access point. Keterbatasan data yang mendasari bab ini dijelaskan di bagian batasan pengambilan data.
