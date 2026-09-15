# Modulasi dan Koreksi Error dalam Jaringan Nirkabel

Catatan klarifikasi konsep — perbedaan modulasi vs koreksi error, dan studi kasus sinyal yang terlihat bersih tapi data tetap korup.

## Modulasi vs Koreksi Error — Dua Hal yang Berbeda

Sering tertukar, padahal fungsinya beda:

- **Modulasi** (ASK, FSK, PSK, QAM) → cara mengubah data digital (bit) menjadi sinyal analog yang bisa dikirim lewat medium wireless.
- **Koreksi error** (FEC, CRC, ARQ) → mekanisme terpisah untuk mendeteksi/memperbaiki bit yang rusak akibat noise saat transmisi.

### Alur Sinyal Lengkap

```
data → FEC encoding → modulasi → kanal (dengan noise) → demodulasi → deteksi/koreksi error
```

## Jenis Modulasi Digital

- **ASK (Amplitude Shift Keying)** — data direpresentasikan lewat perubahan amplitudo sinyal
- **FSK (Frequency Shift Keying)** — data direpresentasikan lewat perubahan frekuensi
- **PSK (Phase Shift Keying)** — data direpresentasikan lewat perubahan fase
- **QAM (Quadrature Amplitude Modulation)** — kombinasi amplitudo + fase, bisa bawa lebih banyak bit per simbol

## Mekanisme Koreksi Error

- **FEC (Forward Error Correction)** — menambahkan bit redundan di pengirim agar penerima bisa memperbaiki error tanpa perlu minta kirim ulang
- **CRC (Cyclic Redundancy Check)** — checksum untuk mendeteksi (bukan memperbaiki) error
- **ARQ (Automatic Repeat reQuest)** — kalau error terdeteksi, penerima minta pengirim mengirim ulang data

## Studi Kasus: Sinyal Terlihat Bersih, Data Tetap Korup

Kasus: gelombang FSK dan PSK terlihat rapi saat diukur dengan alat ukur, tapi data yang diterima tetap rusak parah. Beberapa kemungkinan penyebab:

- **Phase noise** — ketidakstabilan fase osilator yang tidak selalu terlihat jelas di tampilan waveform biasa
- **Timing/clock jitter** — pergeseran kecil waktu sampling yang mengacaukan proses demodulasi
- **Multipath / ISI (Inter-Symbol Interference)** — sinyal sampai ke penerima lewat beberapa jalur pantulan berbeda, saling tumpang tindih
- **Frequency offset** — perbedaan kecil frekuensi antara pemancar dan penerima
- **Keterbatasan inspeksi visual** — waveform biasa tidak cukup untuk menilai kualitas sinyal digital; sebaiknya pakai **constellation diagram** atau **eye diagram** untuk melihat masalah yang tidak kelihatan di waveform time-domain biasa

## Catatan Istilah

Kalau menulis soal/tugas soal kasus ini, gunakan istilah yang tepat: **modulasi/demodulasi sinyal** — bukan "enkripsi/dekripsi data" (istilah itu untuk keamanan data, bukan proses fisik pengubahan sinyal).
