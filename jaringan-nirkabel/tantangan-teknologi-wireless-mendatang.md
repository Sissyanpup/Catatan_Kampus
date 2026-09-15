# Tantangan Pengembangan Teknologi Wireless Generasi Mendatang

Catatan belajar mata kuliah Jaringan Nirkabel — seputar tantangan 6G, keamanan siber, keterbatasan energi IoT, kepadatan perangkat, dan etika privasi.

## Pola Soal Pilihan Ganda

Dari beberapa soal yang dibahas, ada pola yang konsisten:
- **Pilihan benar** → selalu menggambarkan masalah/hambatan nyata di lapangan
- **Pilihan salah** → menggambarkan solusi, upaya positif, atau pernyataan yang secara faktual tidak akurat

Pola ini berguna sebagai strategi eliminasi cepat saat mengerjakan soal serupa.

## Perbandingan WiFi vs Bluetooth vs Zigbee

| Aspek | WiFi | Bluetooth | Zigbee |
|---|---|---|---|
| Jangkauan | Menengah–jauh (puluhan meter, tergantung router) | Pendek (~10 m) | Pendek per-hop, tapi bisa jauh via mesh |
| Kecepatan | Tinggi | Menengah | Rendah |
| Konsumsi daya | Tinggi | Rendah–menengah | Sangat rendah |
| Topologi | Star (via access point) | Point-to-point / small piconet | Mesh |
| Kapasitas perangkat | Terbatas per AP | Sangat terbatas | Besar (ribuan node dalam mesh) |
| Contoh penggunaan | Internet rumah/kantor, gaming, streaming | Audio (earphone/speaker), transfer file jarak dekat | Smart home (lampu, sensor, kunci pintar) |

### Kasus Praktis Sehari-hari
- **WiFi lemot meski dekat router** → bisa karena interferensi kanal (banyak perangkat sekitar pakai frekuensi sama), bandwidth terbagi banyak device, atau kualitas ISP itu sendiri.
- **Interferensi Bluetooth** → sering terjadi karena berbagi pita frekuensi 2.4 GHz dengan WiFi dan perangkat lain.
- **Jangkauan mesh Zigbee** → tiap node bisa jadi "repeater" untuk node lain, jadi jangkauan total jaringan bisa jauh lebih luas daripada jangkauan satu perangkat.

## Konteks Tambahan yang Dibahas

- **PCVR wireless streaming**: relevan dengan trade-off bandwidth vs latency yang sama seperti perbandingan WiFi/Bluetooth di atas.
- **Perangkat DIY berbasis ESP32 untuk VR tracking**: contoh nyata penerapan protokol wireless hemat daya untuk transmisi data sensor real-time.
- **Adopsi Matter/Thread di ekosistem IoT**: standar baru yang mencoba menyatukan interoperabilitas antar perangkat smart home lintas vendor, dibangun di atas fondasi protokol mesh seperti Thread (turunan filosofi yang mirip Zigbee).

## Poin Tantangan 6G & Wireless Generasi Depan

- Kebutuhan keamanan siber yang makin kompleks seiring makin banyak perangkat terhubung
- Keterbatasan energi pada perangkat IoT (baterai kecil, perlu protokol hemat daya)
- Kepadatan perangkat yang terus naik → rebutan spektrum & interferensi
- Isu etika privasi — makin banyak data personal mengalir lewat jaringan wireless
