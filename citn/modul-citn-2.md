# Rangkuman Modul 2: Basic Switch and End Device Configuration (Cisco ITN)

Sumber: catatan OCR `modul20-21.md`, `modul22-23.md`, `modul24.md`, `modul25-26.md`, dan `modul27-29.md` (diambil 24 November 2026). Catatan bertanda **Tambahan** tidak berasal dari OCR.

**Tujuan modul:** menerapkan pengaturan awal, termasuk password, IP address, dan default gateway, pada switch dan end device.

| Topik | Tujuan topik |
|---|---|
| 2.1 Cisco IOS Access | Menjelaskan cara mengakses perangkat Cisco IOS untuk dikonfigurasi |
| 2.2 IOS Navigation | Menjelaskan navigasi Cisco IOS |
| 2.3 The Command Structure | Menjelaskan struktur perintah Cisco IOS |
| 2.4 Basic Device Configuration | Mengonfigurasi perangkat Cisco IOS lewat CLI |
| 2.5 Save Configurations | Menyimpan *running configuration* dengan perintah IOS |
| 2.6 Ports and Addresses | Menjelaskan cara perangkat berkomunikasi lewat media jaringan |
| 2.7 Configure IP Addressing | Mengonfigurasi host dengan IP address |
| 2.8 Verify Connectivity | Memverifikasi konektivitas antara dua end device |

---

## 2.0 Pendahuluan

Switch dan end device punya konfigurasi umum bawaan pabrik, tetapi tetap perlu diberi informasi dan instruksi khusus untuk jaringan tempatnya dipasang. Modul ini membahas cara mengakses perangkat Cisco IOS, perintah konfigurasi dasarnya, dan cara memverifikasi hasilnya.

---

## 2.1 Akses Cisco IOS

### 2.1.1 Sistem operasi

Semua end device dan perangkat jaringan membutuhkan sistem operasi (OS).

| Bagian | Fungsi |
|---|---|
| **Shell** | Antarmuka tempat pengguna meminta tugas ke komputer, lewat CLI atau GUI |
| **Kernel** | Menghubungkan perangkat keras dengan perangkat lunak dan mengelola pemakaian sumber daya perangkat keras |
| **Hardware** | Bagian fisik komputer, termasuk elektronik di dalamnya |

Urutannya: pengguna → shell → kernel → hardware.

### 2.1.2 CLI dan GUI

| Aspek | CLI (*command-line interface*) | GUI (*graphical user interface*) |
|---|---|---|
| Cara pakai | Mengetik perintah teks di prompt | Ikon, menu, dan jendela |
| Contoh | Cisco IOS, terminal Linux | Windows, macOS, Linux KDE, Apple iOS, Android |
| Kelebihan | Ringan dan sangat stabil | Mudah dipakai, tidak perlu hafal perintah |
| Kekurangan | Harus memahami struktur perintah | Fitur bisa tidak selengkap CLI, bisa gagal atau *crash* |

Karena alasan itu, perangkat jaringan umumnya diakses lewat **CLI**.

- **Cisco IOS** (*Internetwork Operating System*) dipakai di banyak router dan switch Cisco. Tiap jenis perangkat memakai versi IOS yang berbeda.
- OS Cisco lain: **IOS XE, IOS XR, NX-OS**.

> OS pada router rumah biasanya disebut **firmware**, dan paling sering dikonfigurasi lewat GUI di peramban web.

### 2.1.3 Fungsi OS

| OS komputer (GUI) | OS jaringan berbasis CLI (Cisco IOS) |
|---|---|
| Memilih dan menjalankan program dengan mouse | Menjalankan program jaringan CLI dengan keyboard |
| Memasukkan teks dan perintah teks | Memasukkan teks dan perintah teks |
| Melihat keluaran di monitor | Melihat keluaran di monitor |

Versi IOS bergantung pada jenis perangkat dan fitur yang dibutuhkan. Versi atau *feature set* bisa ditingkatkan untuk mendapat kemampuan tambahan. Contoh berkas IOS Catalyst 2960: `c2960-lanbasek9-mz.122-55.SE12.bin`.

### 2.1.4 Metode akses

Switch langsung meneruskan lalu lintas tanpa konfigurasi. Dua host yang sudah dikonfigurasi bisa berkomunikasi lewat switch baru. Meski begitu, semua switch harus dikonfigurasi dan diamankan.

| Metode | Jenis akses | Ciri |
|---|---|---|
| **Console** | *Out-of-band* | Port fisik untuk manajemen. Bisa diakses walau layanan jaringan belum dikonfigurasi, jadi cocok untuk konfigurasi awal. Butuh kabel console dan program emulasi terminal |
| **SSH** | *In-band* | Akses CLI jarak jauh yang aman dan terenkripsi. **Direkomendasikan**. Butuh layanan jaringan aktif dan interface yang punya alamat |
| **Telnet** | *In-band* | Akses CLI jarak jauh yang **tidak aman**. Autentikasi, password, dan perintah dikirim sebagai *plaintext*. Hanya untuk lab |
| **AUX** | *Out-of-band* | Port lama di sebagian router, untuk akses lewat saluran telepon dan modem. Tidak butuh layanan jaringan |

- **Out-of-band**: lewat saluran manajemen khusus, hanya untuk pemeliharaan.
- **In-band**: lewat jaringan, memakai interface virtual.
- Cisco IOS menyertakan server dan client Telnet. Sebagian besar versinya juga menyertakan server dan client SSH.

### 2.1.5 Program emulasi terminal

**PuTTY, Tera Term, SecureCRT**. Ketiganya bisa terhubung lewat koneksi serial (port console) atau SSH/Telnet, dan bisa diatur ukuran jendela, huruf, serta warnanya. Port SSH pada contoh: **22**.

---

## 2.2 Navigasi IOS

### 2.2.1 Mode perintah utama

Cisco IOS memisahkan akses manajemen menjadi dua mode demi keamanan.

| Mode | Prompt | Kemampuan |
|---|---|---|
| **User EXEC** | `Switch>` atau `Router>` | Perintah pemantauan dasar saja, tidak bisa mengubah konfigurasi. Disebut mode *view-only* |
| **Privileged EXEC** (*enable mode*) | `Switch#` atau `Router#` | Semua perintah dan fitur: pemantauan, konfigurasi, dan manajemen. Pintu masuk ke mode konfigurasi |

### 2.2.2 Mode konfigurasi dan subkonfigurasi

| Mode | Prompt | Kegunaan |
|---|---|---|
| **Global configuration** | `Switch(config)#` | Perubahan yang memengaruhi perangkat secara keseluruhan |
| **Line configuration** | `Switch(config-line)#` | Mengonfigurasi akses console, SSH, Telnet, atau AUX |
| **Interface configuration** | `Switch(config-if)#` | Mengonfigurasi port switch atau interface jaringan router |

Prompt selalu diawali nama perangkat, lalu diikuti penanda mode.

### 2.2.4 Berpindah mode

| Dari | Ke | Perintah |
|---|---|---|
| User EXEC | Privileged EXEC | `enable` |
| Privileged EXEC | User EXEC | `disable` |
| Privileged EXEC | Global config | `configure terminal` |
| Global config | Privileged EXEC | `exit` (atau `end`, Ctrl+Z) |
| Global config | Line console | `line console 0` |
| Global config | Line VTY | `line vty 0 15` |
| Global config | Interface | `interface vlan 1`, `interface FastEthernet 0/1` |
| Subkonfigurasi | Global config (naik satu tingkat) | `exit` |
| Subkonfigurasi | Privileged EXEC (langsung) | `end` atau **Ctrl+Z** |
| Subkonfigurasi | Subkonfigurasi lain | Langsung ketik perintahnya, misalnya `interface FastEthernet 0/1` |

```text
Switch> enable
Switch# configure terminal
Switch(config)# line console 0
Switch(config-line)# exit
Switch(config)# line vty 0 15
Switch(config-line)# exit
Switch(config)# interface vlan 1
Switch(config-if)# line console 0
Switch(config-line)# end
Switch#
```

### 2.2.6 Syntax Checker

Alat simulasi NetAcad yang menuntut perintah **lengkap dan persis**. Packet Tracer lebih longgar karena menerima perintah singkatan seperti perangkat asli. Alat simulasi umumnya tidak memiliki semua fungsi perangkat asli.

---

## 2.3 Struktur Perintah

### 2.3.1 Struktur dasar

```text
Switch> show ip protocols      (prompt, perintah, keyword)
Switch> ping 192.168.10.5      (prompt, perintah, argument)
```

- **Keyword**: parameter yang sudah ditentukan OS, misalnya `ip protocols`.
- **Argument**: nilai yang ditentukan pengguna, misalnya `192.168.10.5`.
- Tiap perintah punya sintaks sendiri dan hanya bisa dijalankan di mode yang sesuai. Tekan Enter untuk mengirim perintah.

### 2.3.2 Konvensi sintaks

| Konvensi | Arti |
|---|---|
| **tebal** | Perintah dan keyword yang diketik persis seperti tertulis |
| *miring* | Argument yang nilainya diisi pengguna |
| `[x]` | Elemen opsional |
| `{x}` | Elemen wajib |
| `[x {y \| z}]` | Pilihan wajib di dalam elemen opsional |

Contoh:

- **description** *string*: mencatat tujuan interface, misalnya `description Connects to the main headquarter office switch`.
- **ping** *ip-address*: `ping 10.10.10.5`.
- **traceroute** *ip-address*: `traceroute 192.168.254.254`.
- Perintah kompleks: `switchport port-security aging { static | time time | type {absolute | inactivity} }`

Sumber rujukan terlengkap: **Cisco IOS Command Reference**.

### 2.3.3 Fitur bantuan IOS

| Fitur | Cara kerja |
|---|---|
| **Context-sensitive help** | Ketik `?` untuk melihat perintah yang tersedia di mode itu, perintah dengan awalan tertentu, serta keyword dan argument suatu perintah |
| **Command syntax check** | Interpreter membaca perintah dari **kiri ke kanan**. Jika tidak dipahami, CLI memberi umpan balik tentang kesalahannya |

### 2.3.5 Hot key dan pintasan

Perintah bisa disingkat sampai jumlah karakter minimum yang masih unik. `configure` bisa menjadi `conf`, tetapi `con` tidak bisa karena ada perintah lain dengan awalan itu. Keyword juga bisa disingkat.

**Mengedit baris perintah**

| Tombol | Fungsi |
|---|---|
| Tab | Melengkapi perintah yang baru diketik sebagian |
| Backspace | Menghapus karakter di kiri kursor |
| Ctrl+D | Menghapus karakter di posisi kursor |
| Ctrl+K | Menghapus dari kursor sampai akhir baris |
| Esc D | Menghapus dari kursor sampai akhir kata |
| Ctrl+U atau Ctrl+X | Menghapus dari kursor sampai awal baris |
| Ctrl+W | Menghapus kata di kiri kursor |
| Ctrl+A | Kursor ke awal baris |
| Ctrl+E | Kursor ke akhir baris |
| Panah kiri atau Ctrl+B | Kursor mundur satu karakter |
| Panah kanan atau Ctrl+F | Kursor maju satu karakter |
| Esc B | Kursor mundur satu kata |
| Esc F | Kursor maju satu kata |
| Panah atas atau Ctrl+P | Perintah sebelumnya di riwayat |
| Panah bawah atau Ctrl+N | Baris berikutnya di riwayat |
| Ctrl+R, Ctrl+I, atau Ctrl+L | Menampilkan ulang prompt dan baris perintah setelah ada pesan console |

> IOS tidak mengenali tombol Delete.

**Saat muncul `--More--`**

| Tombol | Fungsi |
|---|---|
| Enter | Baris berikutnya |
| Spasi (atau `y`) | Layar berikutnya |
| Tombol lain | Berhenti dan kembali ke prompt |

**Menghentikan operasi**

| Tombol | Fungsi |
|---|---|
| Ctrl+C | Keluar dari mode konfigurasi ke privileged EXEC. Di *setup mode*, membatalkan dan kembali ke prompt |
| Ctrl+Z | Keluar dari mode konfigurasi ke privileged EXEC |
| Ctrl+Shift+6 | Menghentikan DNS lookup, traceroute, ping, dan sejenisnya |

### 2.3.7 dan 2.3.8 Praktik

- **Packet Tracer 2.3.7 Navigate the IOS**: berlatih mode akses, mode konfigurasi, dan bantuan `?` dengan mengonfigurasi `clock`.
- **Lab 2.3.8 Tera Term for Console Connectivity**: (1) mengakses switch lewat port console serial, (2) menampilkan dan mengatur setelan dasar, (3) opsional, mengakses router dengan kabel console Mini-USB.

---

## 2.4 Konfigurasi Dasar Perangkat

### 2.4.1 Nama perangkat (hostname)

Perintah pertama di perangkat mana pun sebaiknya memberi nama unik. Nama bawaan switch Cisco adalah `Switch`. Hostname memastikan kita terhubung ke perangkat yang benar, misalnya saat memakai SSH.

Aturan penamaan:

1. Diawali huruf.
2. Tidak mengandung spasi.
3. Diakhiri huruf atau angka.
4. Hanya berisi huruf, angka, dan tanda hubung.
5. Kurang dari 64 karakter.

Hostname mempertahankan huruf besar dan kecil. Penamaan sebaiknya mencerminkan lokasi dan fungsi, misalnya `Sw-Floor-1`. Perbarui dokumentasi (lokasi, tujuan, alamat) setiap kali perangkat ditambah atau diubah.

```text
Switch# configure terminal
Switch(config)# hostname Sw-Floor-1
Sw-Floor-1(config)#
```

Untuk kembali ke nama bawaan: `no hostname`.

### 2.4.2 Pedoman password

Password lemah masih menjadi masalah keamanan terbesar organisasi. Amankan privileged EXEC, user EXEC, dan akses Telnet jarak jauh dengan password, enkripsi semua password, dan tampilkan pemberitahuan hukum.

- Panjang lebih dari delapan karakter.
- Gabungkan huruf besar, huruf kecil, angka, karakter khusus, dan/atau urutan angka.
- Jangan pakai password yang sama di semua perangkat.
- Hindari kata umum yang mudah ditebak.

> Password `cisco` dan `class` hanya untuk lab. Jangan dipakai di lingkungan produksi.

### 2.4.3 Mengonfigurasi password

| Yang diamankan | Masuk mode | Perintah |
|---|---|---|
| User EXEC (console) | `line console 0` | `password cisco` lalu `login` |
| Privileged EXEC | Global config | `enable secret class` |
| Akses jarak jauh VTY (Telnet/SSH) | `line vty 0 15` | `password cisco` lalu `login` |

- Angka 0 pada `line console 0` berarti console pertama, yang biasanya satu-satunya.
- Privileged EXEC adalah akses terpenting karena memberi kendali penuh.
- Banyak switch Cisco mendukung sampai **16 VTY**, bernomor 0 sampai 15.
- `login` mengaktifkan permintaan password pada line itu.

### 2.4.4 Mengenkripsi password

Startup-config dan running-config menampilkan sebagian besar password sebagai *plaintext*. Perintah `service password-encryption` mengenkripsi semua password yang belum terenkripsi.

- Enkripsinya **lemah**.
- Hanya berlaku di **berkas konfigurasi**, bukan saat password dikirim lewat jaringan.
- Tujuannya mencegah orang tak berwenang membaca password di berkas konfigurasi.
- Verifikasi dengan `show running-config`. Password akan tampil seperti `password 7 094F471A1A0A`.

### 2.4.5 Banner

Banner menyatakan bahwa hanya pihak berwenang yang boleh mengakses. Banner bisa menjadi bagian penting proses hukum, karena sebagian sistem hukum melarang penuntutan atau pemantauan tanpa pemberitahuan yang terlihat.

```text
Sw-Floor-1(config)# banner motd #Authorized Access Only#
```

`#` adalah **delimiting character** (pembatas). Boleh karakter apa saja selama tidak muncul di dalam pesan.

### 2.4.7 Konfigurasi dasar lengkap

```text
Switch# configure terminal
Switch(config)# hostname Sw-Floor-1
Sw-Floor-1(config)# line console 0
Sw-Floor-1(config-line)# password cisco
Sw-Floor-1(config-line)# login
Sw-Floor-1(config-line)# exit
Sw-Floor-1(config)# enable secret class
Sw-Floor-1(config)# line vty 0 15
Sw-Floor-1(config-line)# password cisco
Sw-Floor-1(config-line)# login
Sw-Floor-1(config-line)# exit
Sw-Floor-1(config)# service password-encryption
Sw-Floor-1(config)# banner motd #Warning! Authorized access only!#
```

---

## 2.5 Menyimpan Konfigurasi

### 2.5.1 Berkas konfigurasi

| Aspek | startup-config | running-config |
|---|---|---|
| Lokasi | **NVRAM** | **RAM** |
| Isi | Perintah yang dipakai saat perangkat menyala atau *reboot* | Konfigurasi yang sedang berjalan |
| Saat listrik mati | Tetap ada | **Hilang** (RAM bersifat *volatile*) |
| Efek perubahan | Baru terasa setelah *restart* | **Langsung** berlaku |
| Melihat isi | `show startup-config` | `show running-config` |

Menyimpan konfigurasi: `copy running-config startup-config`.

> **Tambahan:** pada penjelasan startup-config, materi menulis "Flash does not lose its contents". Lokasi startup-config tetap **NVRAM**, dan itu jawaban kuisnya. NVRAM juga tidak kehilangan isi saat listrik mati.

### 2.5.2 Membatalkan perubahan

| Situasi | Tindakan |
|---|---|
| Perubahan belum disimpan | Hapus perintah satu per satu, atau `reload` untuk memuat ulang startup-config |
| Perubahan telanjur disimpan | `erase startup-config`, tekan Enter untuk konfirmasi, lalu `reload` |

- Kekurangan `reload`: perangkat mati sebentar sehingga jaringan terputus.
- Saat `reload`, IOS menanyakan apakah perubahan mau disimpan. Jawab `n` atau `no` untuk membuangnya.
- Setelah startup-config dihapus dan perangkat dimuat ulang, switch memakai konfigurasi bawaan pabrik.

### 2.5.4 Menyimpan konfigurasi ke berkas teks

1. Buka program emulasi terminal (PuTTY atau Tera Term) yang sudah terhubung ke switch.
2. Aktifkan *logging*, lalu tentukan nama dan lokasi berkas. Di PuTTY pilih **All session output**, contoh nama `MySwitchLogs`.
3. Jalankan `show running-config` atau `show startup-config` di privileged EXEC.
4. Matikan logging dengan pilihan **None**.

Untuk memulihkan:

1. Masuk ke global configuration mode.
2. Salin dan tempel isi berkas ke terminal. Teksnya dijalankan sebagai perintah CLI dan menjadi running-config. Berkas mungkin perlu disunting dulu.

### 2.5.5 Praktik

**Packet Tracer Configure Initial Switch Settings**: mengamankan CLI dan console dengan password terenkripsi dan plaintext, serta membuat banner.

---

## 2.6 Port dan Alamat

### 2.6.1 IP address

IP address adalah cara utama perangkat saling menemukan dan membangun komunikasi *end-to-end* di internet. Tiap end device harus punya IP address: komputer, printer jaringan, telepon VoIP, kamera keamanan, ponsel, dan perangkat genggam seperti pemindai barcode nirkabel.

| Aspek | IPv4 | IPv6 |
|---|---|---|
| Panjang | 32 bit | 128 bit |
| Penulisan | *Dotted decimal*: empat angka desimal 0 sampai 255, dipisah titik | 32 digit heksadesimal, dikelompokkan per empat, dipisah titik dua |
| Contoh | `192.168.1.10` | `2001:db8:acad:10::10` |
| Contoh gateway | `192.168.1.1` | `fe80::1` |
| Catatan | Masih lebih umum dipakai | Versi terbaru, menggantikan IPv4. Huruf besar dan kecil dianggap sama |

- **Subnet mask**: nilai 32 bit yang membedakan bagian jaringan dan bagian host pada IPv4. Bersama IP address, menentukan subnet perangkat. Contoh: `255.255.255.0`.
- **Default gateway**: IP address router yang dipakai host untuk menjangkau jaringan lain, termasuk internet.

> **Tambahan:** cara mencari subnet untuk oktet mask 255 atau 0. Oktet dengan mask 255 disalin, oktet dengan mask 0 menjadi 0. Contoh: `10.1.100.50` dengan mask `255.255.0.0` berada di subnet `10.1.0.0`.

### 2.6.2 Interface dan port

- Komunikasi bergantung pada interface end device, interface perangkat jaringan, dan kabel penghubungnya. Kabel harus cocok dengan standar fisik interface.
- Media jaringan: kabel tembaga *twisted-pair*, fiber-optic, koaksial, dan nirkabel.
- Pembeda media: jarak jangkau sinyal, lingkungan pemasangan, jumlah dan kecepatan data, serta biaya.
- **Ethernet** adalah teknologi LAN yang paling umum saat ini.
- **SVI (Switch Virtual Interface)**: interface virtual yang dibuat dalam perangkat lunak, tanpa port fisik. Diperlukan karena port fisik switch Layer 2 tidak mendukung IP address Layer 3.
  - SVI bawaan: **VLAN 1**.
  - Gunanya mengelola switch dari jarak jauh lewat IPv4 dan IPv6.
  - Switch Layer 2 **tidak butuh** IP address untuk menjalankan fungsinya.

---

## 2.7 Konfigurasi IP Address

### 2.7.1 Manual di Windows

1. Buka **Control Panel > Network Sharing Center > Change adapter settings**, pilih adapter.
2. Klik kanan, pilih **Properties**.
3. Pilih **Internet Protocol Version 4 (TCP/IPv4)**, klik **Properties**.
4. Pilih **Use the following IP address**, lalu isi IP address, subnet mask, dan default gateway.

Konfigurasi IPv6 mirip dengan IPv4.

> **Tambahan:** materi menulis bahwa DNS menerjemahkan IP address ke nama domain. Fungsi utamanya justru sebaliknya: menerjemahkan **nama domain** (`www.cisco.com`) menjadi IP address.

### 2.7.2 Otomatis dengan DHCP

- **DHCP** (*Dynamic Host Configuration Protocol*) memberi IPv4 address, subnet mask, default gateway, dan DNS server secara otomatis. Sebagian besar end device memakainya secara bawaan.
- Keuntungannya: hemat waktu dan mengurangi salah konfigurasi, seperti IP address ganda.
- Di Windows pilih **Obtain an IP address automatically** dan **Obtain DNS server address automatically**.
- IPv6 memakai **DHCPv6** dan **SLAAC** (*Stateless Address Autoconfiguration*).

### 2.7.3 Memeriksa IP di Windows

```text
C:\> ipconfig
Ethernet adapter Local Area Connection:
   Connection-specific DNS Suffix  . : cisco.com
   Link-local IPv6 Address . . . . . : fe80::b0ef:ca42:af2c:c6c7%16
   IPv4 Address. . . . . . . . . . . : 192.168.1.10
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
```

### 2.7.4 Mengonfigurasi SVI

Agar switch bisa diakses dari jarak jauh, SVI harus punya IP address dan subnet mask.

```text
Sw-Floor-1# configure terminal
Sw-Floor-1(config)# interface vlan 1
Sw-Floor-1(config-if)# ip address 192.168.1.20 255.255.255.0
Sw-Floor-1(config-if)# no shutdown
Sw-Floor-1(config-if)# exit
Sw-Floor-1(config)# ip default-gateway 192.168.1.1
```

| Perintah | Fungsi |
|---|---|
| `interface vlan 1` | Masuk ke SVI bawaan |
| `ip address ip-address subnet-mask` | Memberi IPv4 address |
| `no shutdown` | Mengaktifkan interface |
| `ip default-gateway ip-address` | Menentukan default gateway switch, yaitu IP router lokal (global config) |

Pesan `%LINK-5-CHANGED: Interface Vlan1, changed state to up` menandakan SVI aktif.

### 2.7.6 Praktik

**Packet Tracer Implement Basic Connectivity**: konfigurasi dasar switch, IP address switch dan PC, lalu verifikasi dengan perintah `show` dan `ping`.

---

## 2.8 Verifikasi Konektivitas

| Perintah | Dijalankan di | Fungsi |
|---|---|---|
| `ipconfig` | PC Windows | Memeriksa konfigurasi IP host |
| `show ip interface brief` | Switch atau router | Memeriksa kondisi dan alamat interface |
| `ping ip-address` | PC, switch, atau router | Menguji konektivitas ke perangkat lain atau situs web |

Video 2.8.1 mempraktikkan `show ip interface brief`. Video 2.8.2 menguji `ping` pada dua switch dan dua PC.

---

## 2.9 Praktik Akhir Modul

- **Packet Tracer 2.9.1 Basic Switch and End Device Configuration**: sebagai teknisi LAN baru, atur dua switch dan dua host sampai terhubung *end-to-end*.
- **Lab 2.9.2**: (1) menyiapkan topologi, (2) mengonfigurasi PC, (3) mengonfigurasi dan memverifikasi setelan dasar switch.

Urutan kerja untuk lab:

1. Beri hostname.
2. Amankan console, privileged EXEC, dan VTY.
3. Enkripsi password dan pasang banner.
4. Atur IP address SVI, aktifkan dengan `no shutdown`.
5. Atur IP address dan subnet mask tiap PC.
6. Simpan dengan `copy running-config startup-config`.
7. Verifikasi dengan `show ip interface brief`, `ipconfig`, dan `ping`.

---

## Kunci Jawaban Kuis

Opsi jawaban di NetAcad diacak setiap percobaan, jadi hafalkan isi jawabannya, bukan urutannya. Jawaban Module Quiz disusun dari materi modul karena OCR tidak merekam kunci per soal.

### Check Your Understanding 2.1.6 (Cisco IOS Access)

| No | Pertanyaan singkat | Jawaban |
|---|---|---|
| 1 | Di ruang perangkat dengan switch baru yang perlu dikonfigurasi | Console |
| 2 | Diberi kabel khusus untuk mengonfigurasi switch | Console |
| 3 | Akses *in-band* ke IOS lewat jaringan | Telnet/SSH |
| 4 | Mengakses router di kota lain lewat saluran telepon | Aux |

### Check Your Understanding 2.2.8 (IOS Navigation)

| No | Pertanyaan singkat | Jawaban |
|---|---|---|
| 1 | Mode dengan akses ke semua perintah dan fitur | Privileged EXEC mode |
| 2 | Mode untuk prompt `Switch(config)#` | Global configuration mode |
| 3 | Mode untuk prompt `Switch>` | User EXEC mode |
| 4 | Dua cara kembali ke privileged EXEC dari mode konfigurasi mana pun | `end` dan CTRL+Z |

### Check Your Understanding 2.4 (Basic Device Configuration)

| No | Pertanyaan singkat | Jawaban |
|---|---|---|
| 1 | Memberi nama "Sw-Floor-2" pada switch | `hostname Sw-Floor-2` |
| 2 | Mengamankan privileged EXEC | `enable secret class` |
| 3 | Mengaktifkan autentikasi password untuk user EXEC | `login` |
| 4 | Mengenkripsi semua password plaintext | `service password-encryption` |
| 5 | Soal tidak terekam di OCR | Belum ada |

### Check Your Understanding 2.6 (Ports and Addresses)

| No | Pertanyaan singkat | Jawaban |
|---|---|---|
| 1 | Nama struktur IPv4 address | Dotted-decimal format |
| 2 | Cara penulisan IPv4 address | Empat angka desimal 0 sampai 255, dipisah titik |
| 3 | Interface tanpa port fisik | Switch virtual interface (SVI) |

### Module Quiz (14 soal)

| No | Pertanyaan singkat | Jawaban | Alasan |
|---|---|---|---|
| 1 | Pernyataan benar tentang running-config | **It affects the operation of the device immediately when modified** | Disimpan di RAM, bukan NVRAM, dan tidak tersimpan otomatis |
| 2 | Dua pernyataan benar tentang user EXEC | **Prompt diakhiri `>`** dan **Only some aspects of the router configuration can be viewed** | Global config dicapai lewat `configure terminal` dari privileged EXEC |
| 3 | Akses yang diamankan `enable secret` | **Privileged EXEC** | Console dan VTY memakai `password` dan `login` |
| 4 | SVI bawaan switch Cisco | **VLAN1** | |
| 5 | Tiga aturan hostname | **Diawali huruf**, **tanpa spasi**, **kurang dari 64 karakter** | Huruf besar diperbolehkan, dan nama diakhiri huruf atau angka |
| 6 | Fungsi shell | **It interfaces between the users and the kernel** | Yang berinteraksi dengan hardware adalah kernel |
| 7 | Ada `enable secret`, tanpa password console, mode apa saat boot? | **User EXEC mode** | Tanpa password console, pengguna langsung masuk user EXEC. `enable secret` baru diminta saat `enable` |
| 8 | Setelah mengganti IP address interface, apa lagi yang harus dilakukan agar berlaku? | **Nothing must be done** | Perubahan langsung berlaku. Menyimpan ke startup-config hanya agar bertahan setelah *restart* |
| 9 | Memori yang isinya hilang saat *restart* | **RAM** | RAM bersifat *volatile* |
| 10 | Alasan memakai `copy startup-config running-config` | **To copy an existing configuration into RAM** | Arah salin: dari NVRAM ke RAM |
| 11 | Fungsi DHCP | **Automatic assignment of an IP address to each host** | Penerjemahan nama adalah fungsi DNS, uji konektivitas memakai `ping` |
| 12 | Dua fungsi context-sensitive help | **Determining which option, keyword, or argument is available** dan **Displaying a list of all available commands within the current mode** | Pesan galat adalah syntax check, melengkapi perintah adalah Tab |
| 13 | Memori penyimpan startup-config | **NVRAM** | |
| 14 | Subnet dari 10.1.100.50 dengan mask 255.255.0.0 | **10.1.0.0** | Dua oktet pertama adalah bagian jaringan |

---

## Poin Kunci untuk Ujian

- Console dan AUX = *out-of-band*. SSH dan Telnet = *in-band*. SSH terenkripsi, Telnet *plaintext*.
- `>` = user EXEC, `#` = privileged EXEC, `(config)#` = global config, `(config-line)#` = line, `(config-if)#` = interface.
- `exit` = naik satu tingkat. `end` dan Ctrl+Z = langsung ke privileged EXEC.
- Keyword ditentukan OS, argument ditentukan pengguna. `[ ]` opsional, `{ }` wajib.
- `enable secret` mengamankan privileged EXEC. `password` + `login` mengamankan console dan VTY.
- `service password-encryption` hanya melindungi password di berkas konfigurasi.
- startup-config = NVRAM. running-config = RAM dan langsung berlaku.
- Simpan = `copy running-config startup-config`. Hapus = `erase startup-config` lalu `reload`.
- SVI bawaan = VLAN 1. Aktifkan dengan `no shutdown`.
- IPv4 = 32 bit desimal bertitik. IPv6 = 128 bit heksadesimal bertitik dua.
