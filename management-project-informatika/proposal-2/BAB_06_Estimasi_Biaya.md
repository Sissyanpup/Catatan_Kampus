# BAB 6 — ESTIMASI BIAYA

> **Keterangan penanda** (sama dengan bab sebelumnya)
>
> - **[USULAN]** = usulan penyusun, perlu disetujui tim. **[ASUMSI]** = belum dapat dipastikan; harga perlu dicek tim.

Bab ini menjawab pertanyaan "**berapa biayanya?**" dengan **estimasi tiga titik (PERT) per paket kerja**, lalu menjumlahkannya dari bawah ke atas (_bottom-up_) menjadi **cost baseline**. Masukannya adalah durasi O/M/P (Bab 5), pembagian tugas RACI opsi B (Bab 4.4), dan risiko (Bab 4.5). Semua angka dihitung dengan skrip.

---

## 6.1 Pemilihan Metode

| Metode (modul)       | Dipakai? | Alasan                                                                                                                                                 |
| -------------------- | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **PERT tiga titik**  | **Ya**   | Modul bagian 3: berlaku untuk durasi **maupun biaya**. Cocok untuk pekerjaan lapangan, perancangan, dan simulasi yang ketidakpastiannya dapat diperkirakan per WP |
| COCOMO II            | Tidak    | Mengukur usaha dari ukuran kode (SLOC/Function Points); proyek ini tidak menulis perangkat lunak                                                       |
| Use Case Points      | Tidak    | Mengukur usaha dari jumlah transaksi use case perangkat lunak; use case pada 3.2 adalah layanan jaringan, bukan transaksi layar                        |

**Rumus:**

```
Biaya_X (X = O, M, P) = Durasi_X × jam kerja per hari × jumlah anggota (R) × tarif per jam + biaya non-tenaga kerja_X
E (biaya harapan)     = (Biaya_O + 4 × Biaya_M + Biaya_P) / 6
σ (simpangan biaya)   = (Biaya_P − Biaya_O) / 6
```

---

## 6.2 Asumsi Tarif dan Tenaga Kerja

| Komponen                      | Nilai                         | Dasar                                                                                                                                                 |
| ----------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| UMK Kota Tangerang Selatan 2026 | **Rp5.247.870** per bulan          | Keputusan Gubernur Banten No. 703 Tahun 2025, berlaku 1 Januari 2026. Kampus Viktor berada di Tangerang Selatan. Modul bagian 9: UMK = batas bawah tarif |
| Jam kerja per bulan           | 152 jam                       | Modul bagian 9 (1 _person-month_ ≈ 152 jam)                                                                                                           |
| **Tarif per jam**             | **Rp34.525**                      | UMK ÷ 152                                                                                                                                             |
| Jam kerja proyek per hari     | 3,5 jam                      | Mahasiswa yang juga kuliah (Bab 5.1) **[ASUMSI]**                                                                                                     |
| **Tarif per hari kerja proyek** | **Rp120.839**                    | Tarif per jam × 3,5 jam                                                                                                                              |
| Pengali beban (_fully loaded_) | 1,0×                          | **[USULAN]** Modul menyebut 1,3–1,5× untuk pegawai perusahaan (BPJS, THR, overhead kantor). Anggota tim bukan pegawai, sehingga beban tersebut tidak berlaku. Overhead peralatan dan komunikasi dihitung terpisah sebagai biaya tidak langsung (6.4) |
| Tarif antarperan              | Sama untuk semua peran        | **[USULAN]** Semua anggota mahasiswa dengan tingkat pengalaman setara                                                                                 |
| Jumlah anggota per WP         | Jumlah **R** pada RACI opsi B | Hanya yang mengerjakan (R) yang dihitung; A, C, dan I tidak menambah jam                                                                              |
| WP bertanda *                 | Dihitung 25% jam              | 1.3 berupa waktu menunggu data pengelola (hanya tindak lanjut); 1.6 dicatat dalam sesi yang sama dengan 1.4 (hanya rekap). Konsisten dengan Bab 5.5 |

Total usaha tenaga kerja (durasi harapan × jumlah anggota) sekitar **94,8 orang-hari**.

---

## 6.3 Biaya Non-Tenaga Kerja Langsung [ASUMSI]

**Perangkat.** MikroTik hAP ax² milik Zirlda, dan laptop milik setiap anggota. Atas keputusan tim, perangkat milik anggota **tidak dibebankan** ke proyek (tidak ada pembelian dan tidak dihitung penyusutannya).

**Bensin.** Anggota berangkat dari rumah ke Kampus Viktor dengan sepeda motor **[ASUMSI]**. Waktu tempuh pulang-pergi (PP) adalah **[FAKTA-L]**. Jarak diperkirakan dari waktu tempuh × kecepatan rata-rata di lalu lintas Tangerang Selatan:

- Kecepatan rata-rata (O/M/P): 20 / 25 / 30 km/jam. Kecepatan lebih tinggi berarti jarak tempuh lebih jauh.
- Konsumsi bensin motor (O/M/P): 45 / 40 / 35 km/liter.
- Harga Pertalite: **Rp10.000/liter** (Banten, Oktober 2026).

```
Bensin per kunjungan = jam PP × kecepatan ÷ konsumsi × Rp10.000
```

| Anggota | Waktu PP | Jarak PP (O / M / P) | Bensin per kunjungan (O / M / P) | Jumlah kunjungan |
| ------- | -------- | -------------------- | -------------------------------- | ---------------- |
| Rizky | 2 jam | 40 / 50 / 60 km | Rp8.889 / Rp12.500 / Rp17.143 | 7× |
| Dzaky | 2 jam | 40 / 50 / 60 km | Rp8.889 / Rp12.500 / Rp17.143 | 10× |
| Zirlda | 1 jam | 20 / 25 / 30 km | Rp4.444 / Rp6.250 / Rp8.571 | 3× |
| Vigie | 1 jam | 20 / 25 / 30 km | Rp4.444 / Rp6.250 / Rp8.571 | 8× |

Kunjungan dihitung sebagai **perjalanan khusus** proyek, walaupun sebagian dapat dilakukan bertepatan dengan jadwal kuliah. Dengan begitu, estimasinya tidak terlalu optimis. Total bensin harapan: **Rp285.119**.

**Konsumsi relawan.** Rp10.000 / Rp15.000 / Rp20.000 per orang per sesi untuk 15 / 20 / 26 relawan (26 = 20 + cadangan 30% sesuai mitigasi R-06).

| WP | Uraian | O | M | P |
| -- | ------ | - | - | - |
| 1.2 | Bensin urus izin (Rizky 2×) | Rp17.778 | Rp25.000 | Rp34.286 |
| 1.2 | Cetak surat izin & lembar pengukuran | Rp30.000 | Rp50.000 | Rp75.000 |
| 1.4 | Bensin pengukuran baseline + pencatatan 1.6 (Dzaky 3×, Vigie 3×) | Rp40.000 | Rp56.250 | Rp77.143 |
| 1.5 | Bensin survei WiFi (Dzaky 2×, Zirlda 2×) | Rp26.667 | Rp37.500 | Rp51.429 |
| 3.4 | Bensin uji purwarupa (Rizky 2×, Dzaky 2×, Vigie 2×) | Rp44.444 | Rp62.500 | Rp85.714 |
| 3.4 | Konsumsi relawan (2 sesi; 15/20/26 relawan; Rp10–20 rb) | Rp300.000 | Rp600.000 | Rp1.040.000 |
| 3.5 | Bensin uji lapangan (Rizky 2×, Dzaky 2×, Vigie 2×) | Rp44.444 | Rp62.500 | Rp85.714 |
| 3.5 | Konsumsi relawan (2 sesi; 15/20/26 relawan; Rp10–20 rb) | Rp300.000 | Rp600.000 | Rp1.040.000 |
| 6.1 | Cetak & jilid dokumen rekomendasi | Rp50.000 | Rp75.000 | Rp125.000 |
| 6.2 | Bensin serah terima (Rizky 1×, Dzaky 1×, Zirlda 1×, Vigie 1×) | Rp26.667 | Rp37.500 | Rp51.429 |
| 6.2 | Cetak berita acara & bahan presentasi | Rp20.000 | Rp30.000 | Rp50.000 |
| 7.5 | Cetak & jilid laporan akhir | Rp75.000 | Rp100.000 | Rp150.000 |

Perangkat lunak (GNS3, MikroTik CHR, Winbox, `iperf3`, WiFi Analyzer, PlantUML, Python) seluruhnya **gratis**, sehingga biayanya Rp0.

---

## 6.4 Biaya Tidak Langsung [ASUMSI]

Biaya yang mendukung seluruh proyek dan tidak melekat pada satu WP. Biaya ini dibebankan ke **CA-05 Manajemen Proyek** agar tetap masuk perhitungan EVM.

| Uraian | O | M | P |
| ------ | - | - | - |
| Kuota internet koordinasi (4 orang × 2 bln × Rp40–75 rb) | Rp320.000 | Rp400.000 | Rp600.000 |

---

## 6.5 Estimasi Biaya per Paket Kerja (PERT Tiga Titik)

Kolom "Tenaga (M)" dan "Non-tenaga (M)" menunjukkan komponen biaya pada skenario paling mungkin.

| WP | Aktivitas | R | Tenaga (M) | Non-tenaga (M) | Biaya O | Biaya M | Biaya P | **E** | σ |
| -- | --------- | - | ---------- | -------------- | ------- | ------- | ------- | ----- | - |
| 1.1 | Analisis masalah & kebutuhan | 2 | Rp725.035 | Rp0 | Rp483.356 | Rp725.035 | Rp1.208.391 | **Rp765.314** | Rp120.839 |
| 1.2 | Persiapan pengukuran & izin | 2 | Rp483.356 | Rp75.000 | Rp289.456 | Rp558.356 | Rp1.317.677 | **Rp640.093** | Rp171.370 |
| 1.3 | Data topologi pengelola | 1* | Rp90.629 | Rp0 | Rp30.210 | Rp90.629 | Rp211.468 | **Rp100.699** | Rp30.210 |
| 1.4 | Pengukuran baseline | 2 | Rp725.035 | Rp56.250 | Rp523.356 | Rp781.285 | Rp1.285.534 | **Rp822.338** | Rp127.030 |
| 1.5 | Survei WiFi & peta AP | 2 | Rp483.356 | Rp37.500 | Rp268.345 | Rp520.856 | Rp776.463 | **Rp521.372** | Rp84.686 |
| 1.6 | Pencatatan putus-nyambung | 2* | Rp181.259 | Rp0 | Rp120.839 | Rp181.259 | Rp302.098 | **Rp191.329** | Rp30.210 |
| 1.7 | Analisis baseline & sign-off | 1 | Rp241.678 | Rp0 | Rp120.839 | Rp241.678 | Rp362.517 | **Rp241.678** | Rp40.280 |
| 2.1 | Dasar perancangan & use case | 1 | Rp241.678 | Rp0 | Rp120.839 | Rp241.678 | Rp362.517 | **Rp241.678** | Rp40.280 |
| 2.2 | Topologi as-is | 1 | Rp241.678 | Rp0 | Rp120.839 | Rp241.678 | Rp362.517 | **Rp241.678** | Rp40.280 |
| 2.3 | Kapasitas AP | 1 | Rp241.678 | Rp0 | Rp120.839 | Rp241.678 | Rp362.517 | **Rp241.678** | Rp40.280 |
| 2.4 | Denah & rencana kanal | 1 | Rp241.678 | Rp0 | Rp120.839 | Rp241.678 | Rp483.356 | **Rp261.818** | Rp60.420 |
| 2.5 | DHCP & sesi hotspot | 1 | Rp120.839 | Rp0 | Rp120.839 | Rp120.839 | Rp241.678 | **Rp140.979** | Rp20.140 |
| 2.6 | Bandwidth & QoS | 1 | Rp362.517 | Rp0 | Rp241.678 | Rp362.517 | Rp604.196 | **Rp382.657** | Rp60.420 |
| 2.7 | Topologi to-be | 1 | Rp120.839 | Rp0 | Rp120.839 | Rp120.839 | Rp241.678 | **Rp140.979** | Rp20.140 |
| 2.8 | Skenario simulasi & uji | 1 | Rp241.678 | Rp0 | Rp120.839 | Rp241.678 | Rp362.517 | **Rp241.678** | Rp40.280 |
| 3.1 | Lingkungan simulasi | 1 | Rp241.678 | Rp0 | Rp120.839 | Rp241.678 | Rp362.517 | **Rp241.678** | Rp40.280 |
| 3.2 | Model as-is & kalibrasi | 1 | Rp241.678 | Rp0 | Rp120.839 | Rp241.678 | Rp483.356 | **Rp261.818** | Rp60.420 |
| 3.3 | Konfigurasi to-be (simulator) | 1 | Rp362.517 | Rp0 | Rp241.678 | Rp362.517 | Rp604.196 | **Rp382.657** | Rp60.420 |
| 3.4 | Purwarupa hAP ax2 + relawan | 3 | Rp1.087.552 | Rp662.500 | Rp1.069.479 | Rp1.750.052 | Rp3.300.818 | **Rp1.895.084** | Rp371.890 |
| 3.5 | Uji lapangan + relawan | 3 | Rp725.035 | Rp662.500 | Rp706.962 | Rp1.387.535 | Rp2.938.301 | **Rp1.532.567** | Rp371.890 |
| 3.6 | Rekap uji sebelum-sesudah | 1 | Rp241.678 | Rp0 | Rp120.839 | Rp241.678 | Rp362.517 | **Rp241.678** | Rp40.280 |
| 3.7 | Analisis & revisi rancangan | 1 | Rp241.678 | Rp0 | Rp120.839 | Rp241.678 | Rp483.356 | **Rp261.818** | Rp60.420 |
| 4.1 | Skrip & rollback | 2 | Rp483.356 | Rp0 | Rp241.678 | Rp483.356 | Rp725.035 | **Rp483.356** | Rp80.559 |
| 4.2 | Rencana penerapan bertahap | 1 | Rp120.839 | Rp0 | Rp120.839 | Rp120.839 | Rp241.678 | **Rp140.979** | Rp20.140 |
| 5.1 | Prosedur pemantauan | 1 | Rp120.839 | Rp0 | Rp120.839 | Rp120.839 | Rp241.678 | **Rp140.979** | Rp20.140 |
| 6.1 | Dokumen rekomendasi | 2 | Rp483.356 | Rp75.000 | Rp291.678 | Rp558.356 | Rp850.035 | **Rp562.523** | Rp93.059 |
| 6.2 | Presentasi & serah terima | 4 | Rp483.356 | Rp67.500 | Rp530.023 | Rp550.856 | Rp1.551.498 | **Rp714.158** | Rp170.246 |
| 7.1 | Bab 4 Metode solusi | 1 | Rp241.678 | Rp0 | Rp120.839 | Rp241.678 | Rp362.517 | **Rp241.678** | Rp40.280 |
| 7.2 | Bab 5 Estimasi waktu | 1 | Rp241.678 | Rp0 | Rp120.839 | Rp241.678 | Rp362.517 | **Rp241.678** | Rp40.280 |
| 7.3 | Bab 6 Estimasi biaya | 1 | Rp241.678 | Rp0 | Rp120.839 | Rp241.678 | Rp362.517 | **Rp241.678** | Rp40.280 |
| 7.4 | Bab 7 S-Curve & EVM | 1 | Rp120.839 | Rp0 | Rp120.839 | Rp120.839 | Rp241.678 | **Rp140.979** | Rp20.140 |
| 7.5 | Bab 8 & laporan akhir | 1 | Rp241.678 | Rp100.000 | Rp195.839 | Rp341.678 | Rp512.517 | **Rp345.845** | Rp52.780 |

\* dihitung 25% jam (lihat 6.2).

---

## 6.6 Rekapitulasi dan Kategori Biaya

### 6.6.1 Komposisi biaya harapan

| Komponen                                   | Biaya harapan (E) | Porsi     |
| ------------------------------------------ | ----------------- | --------- |
| Tenaga kerja (langsung)                    | Rp11.449.506           | 83,8%   |
| Non-tenaga kerja langsung (6.3)            | Rp1.797.619            | 13,2%    |
| **Biaya langsung**                         | **Rp13.247.125**       |           |
| Biaya tidak langsung (6.4)                 | Rp420.000           | 3,1%   |
| **Estimasi biaya proyek**                  | **Rp13.667.125**       | 100%      |

### 6.6.2 Klasifikasi menurut modul (bagian 2)

| Kategori                 | Isi pada proyek ini                                                                                         | Nilai            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- | ---------------- |
| **Direct cost**          | Tenaga kerja, bensin lapangan, konsumsi relawan, cetak                                                      | Rp13.247.125          |
| **Indirect cost**        | Kuota internet koordinasi                                                                                    | Rp420.000          |
| **Fixed cost**           | Tidak ada. Perangkat (hAP ax², laptop) milik anggota dan tidak dibebankan                                   | Rp0              |
| **Variable cost**        | Tenaga kerja, bensin, konsumsi, cetak (berubah mengikuti durasi dan jumlah kunjungan/sesi)                  | Rp13.247.125           |
| **CAPEX**                | Tidak ada pembelian aset (B8)                                                                                | Rp0              |
| **OPEX**                 | Kuota internet koordinasi                                                                                   | Rp420.000           |

> Variable cost + OPEX = estimasi biaya proyek.

---

## 6.7 Contingency Reserve, Management Reserve, dan Cost Baseline

| Komponen                                             | Dasar                                                                                         | Nilai          |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------- |
| Estimasi biaya proyek (Σ E seluruh WP + tidak langsung) | 6.6.1                                                                                      | Rp13.667.125        |
| **Contingency reserve 10%**                          | Risiko teridentifikasi di register 4.5 (R-01–R-15). Modul: 5–15%; 10% mengikuti contoh modul  | Rp1.366.712         |
| **COST BASELINE**                                    | Estimasi + contingency (masuk baseline, dipakai untuk EVM & S-Curve di Bab 7)                 | **Rp15.033.837**     |
| Management reserve 5%                                | Risiko tidak teridentifikasi (_unknown-unknowns_). Modul: 5–10%. **Di luar baseline**; pemakaiannya perlu persetujuan PM dan dosen pembimbing | Rp683.356 |
| **TOTAL ANGGARAN PROYEK**                            | Cost baseline + management reserve                                                            | **Rp15.717.194**   |

**Pemeriksaan ketidakpastian.** Simpangan baku total biaya adalah √Σσ² = **Rp656.742**, dengan anggapan biaya antar-WP tidak saling bergantung. Biaya pada keyakinan 90% (E + 1,28σ) = **Rp14.507.754**, masih di bawah cost baseline. Artinya, contingency 10% cukup untuk menutup variasi estimasi yang sudah diperhitungkan.

---

## 6.8 Anggaran per Control Account (BAC)

_Budget at Completion_ (BAC) per control account adalah dasar pengukuran EVM mingguan (4.3.2). Nilai di bawah belum termasuk contingency, yang dikelola PM di tingkat proyek.

| Control Account | WP | BAC | Porsi |
| --------------- | -- | --- | ----- |
| CA-01 Analysis | 1.1–1.7 | Rp3.282.824 | 24,0% |
| CA-02 Design | 2.1–2.8 | Rp1.893.146 | 13,9% |
| CA-03 Simulation Prototyping | 3.1–3.7 | Rp4.817.301 | 35,2% |
| CA-04 Rekomendasi | 4.1–6.2 | Rp2.041.995 | 14,9% |
| CA-05 Manajemen Proyek | 7.1–7.5 | Rp1.631.859 | 11,9% |

---

## 6.9 Biaya Tunai dan Nilai Tenaga Kerja

Anggota tim tidak dibayar, sehingga biaya tenaga kerja adalah **nilai ekonomi** pekerjaan, bukan uang yang keluar. Nilai ini tetap dihitung karena modul meminta estimasi biaya proyek yang utuh (usaha × tarif). Selain itu, angka inilah yang menunjukkan nilai proyek bila dikerjakan oleh pihak lain.

| Jenis                                                         | Nilai                 |
| ------------------------------------------------------------- | --------------------- |
| **Biaya tunai** (bensin, konsumsi, cetak, kuota)              | **Rp2.217.619** (16,2% dari estimasi) |
| Biaya tunai + cadangan 15% (setara contingency + management reserve) | Rp2.550.262       |
| Nilai tenaga kerja                                            | Rp11.449.506               |

Biaya tunai inilah yang perlu disiapkan bersama oleh empat anggota, sekitar seperempatnya per orang.

---

## 6.10 Kesimpulan Bab

1. Estimasi biaya dihitung dengan **PERT tiga titik per paket kerja**, menggunakan tarif dasar **UMK Tangerang Selatan 2026 (Rp34.525/jam, Rp120.839/hari kerja proyek)**.
2. **Estimasi biaya proyek Rp13.667.125**, dengan porsi terbesar tenaga kerja (83,8%).
3. **Cost baseline Rp15.033.837** (termasuk contingency 10%). **Total anggaran Rp15.717.194** (termasuk management reserve 5% di luar baseline).
4. **Biaya tunai yang benar-benar keluar hanya sekitar Rp2.217.619.**
5. Cost baseline dan BAC per control account menjadi masukan **Bab 7 (S-Curve dan EVM)**.

**Yang perlu dicek tim [ASUMSI]:** kendaraan (motor) dan konsumsi bensinnya, jumlah kunjungan per anggota, jumlah relawan dan harga konsumsi, serta jam kerja per hari (3,5 jam).

**Sumber:**

- UMK Tangerang Selatan 2026 — Keputusan Gubernur Banten No. 703 Tahun 2025 (diberitakan [RMOL, 25-12-2025](https://rmol.id/bisnis/read/2025/12/25/691564/gubernur-banten-tetapkan-ump-dan-umk-2026-cilegon-paling-tinggi) dan [GoodStats](https://data.goodstats.id/statistic/daftar-umk-banten-2026-kota-cilegon-jadi-yang-tertinggi-VkBee)).
- Harga Pertalite Rp10.000/liter, Banten, Oktober 2026 ([Investortrust](https://investortrust.id/business/117985/daftar-lengkap-harga-bbm-pertamina-oktober-2026), [Moladin, 8-10-2026](https://moladin.com/news/daftar-harga-bbm-hari-ini-8-oktober-2026/)).
