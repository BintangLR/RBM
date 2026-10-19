RBM TORAJA — PROJECT CONTEXT

1. Identitas Proyek

Nama proyek: Website Resmi RBM Toraja
Organisasi: Rehabilitasi Bersumberdaya Masyarakat (RBM Toraja)
Jenis proyek: Website informasi organisasi, pemberdayaan masyarakat, dokumentasi kegiatan, dan promosi karya.

Tujuan website adalah menyediakan informasi resmi tentang organisasi, program, kegiatan, publikasi, fasilitas, karya masyarakat, serta kesempatan untuk berpartisipasi dan memberikan dukungan.

Website bukan hanya company profile. Website harus menjadi pusat informasi, dokumentasi, promosi, dan interaksi antara RBM Toraja dengan masyarakat.

2. Teknologi yang Digunakan

- HTML untuk struktur halaman.
- CSS untuk desain dan responsivitas.
- JavaScript untuk interaksi dan fungsi website.
- GitHub untuk version control.
- Vercel untuk deployment.
- Gunakan struktur dan teknologi yang sudah ada. Jangan mengganti framework atau membangun ulang proyek tanpa instruksi.

Alamat deployment saat ini:
https://rbm-toraja.vercel.app/

Folder proyek:
D:\RBM\rbm-toraja-homepage

3. Pengguna Website

Website ditujukan untuk:

- Masyarakat umum.
- Penyandang disabilitas dan keluarga.
- Relawan dan komunitas.
- Mitra organisasi.
- Donatur dan pihak pendukung.
- Pengunjung yang ingin mengetahui program dan kegiatan.
- Admin dan staf pengelola website.

Website harus mudah dipahami oleh pengguna dengan berbagai tingkat kemampuan digital.

4. Struktur Menu Utama

Pertahankan struktur navigasi utama berikut:

1. Beranda
2. Tentang
3. Program
4. Blog
5. Publikasi
6. Fasilitas
7. Kontak

Fitur tambahan yang dapat diintegrasikan secara terstruktur:

- Pusat Pembelajaran atau Learning Center.
- Karya RBM dan katalog produk.
- Galeri dan cerita kegiatan.
- Dampak program.
- Donasi dan dukungan.
- FAQ.
- Formulir permintaan informasi.

Jangan menambahkan menu baru secara sembarangan. Periksa struktur navigasi yang sudah ada sebelum melakukan perubahan.

5. Kebutuhan Fitur

Beranda

Menampilkan identitas organisasi, hero section, pengenalan RBM Toraja, program unggulan, kegiatan, karya masyarakat, informasi penting, dan ajakan berpartisipasi.

Tentang

Menampilkan profil organisasi, sejarah, visi dan misi, tujuan, nilai, tim, serta informasi organisasi yang tersedia.

Program

Menampilkan program pemberdayaan, layanan, dan kegiatan RBM Toraja. Setiap program harus memiliki informasi yang jelas dan mudah dipahami.

Blog dan Publikasi

Menyediakan artikel, berita, dokumentasi, informasi kegiatan, dan publikasi. Konten harus mudah dibaca dan memiliki tata letak yang konsisten.

Fasilitas

Menampilkan fasilitas dan sarana pendukung organisasi menggunakan informasi dan foto yang tersedia.

Karya RBM / Marketplace

Menampilkan produk hasil karya masyarakat dengan foto, nama, deskripsi, dan informasi harga jika tersedia. Siapkan struktur yang dapat dikembangkan untuk pengelolaan produk.

Pembelajaran

Menyediakan informasi materi, kegiatan pembelajaran, atau sumber edukasi yang memang tersedia.

Donasi dan Dukungan

Menyediakan informasi tentang cara masyarakat dan mitra mendukung kegiatan RBM Toraja. Jangan membuat rekening, metode pembayaran, atau klaim donasi fiktif.

Kontak

Menampilkan informasi kontak dan lokasi organisasi. Tombol peta mengarah ke `https://share.google/fYC4V9elvLC1fW2jY`.

Formulir kontak mengirim permintaan melalui fungsi serverless `api/contact.js` ke Resend. Untuk debugging, penerima default adalah `bintanglande321@gmail.com`; penerima dapat diganti melalui environment variable `CONTACT_TO_EMAIL`. Deployment Vercel memerlukan environment variables `RESEND_API_KEY` dan `RESEND_FROM_EMAIL`; jangan menyimpan nilainya di source code. `RESEND_FROM_EMAIL` harus berupa identitas pengirim yang diizinkan Resend. Pengirim pengujian Resend hanya boleh digunakan jika akun Resend mengizinkan pengiriman ke alamat penerima tersebut. Jika konfigurasi belum tersedia atau pengiriman ditolak, formulir harus menampilkan kegagalan dan tidak mengklaim pesan terkirim.

Admin

Kebutuhan pengembangan selanjutnya meliputi pengelolaan artikel, kegiatan, publikasi, produk, pengguna, dan hak akses. Jangan mengklaim fitur admin atau penyimpanan permanen sudah berfungsi apabila belum diimplementasikan.

6. Standar Desain UI/UX

Karakter desain:

- Modern, humanis, inklusif, hangat, profesional, dan bersih.
- Menggunakan whitespace yang cukup.
- Memiliki hierarki tipografi yang jelas.
- Mengutamakan keterbacaan dan kontras warna.
- Menggunakan card dan tombol yang sederhana serta konsisten.
- Memakai foto nyata dari aset proyek.
- Menggunakan animasi secukupnya.
- Tidak terlihat seperti template generik atau desain yang dibuat secara otomatis oleh AI.

Gunakan referensi screenshot yang diberikan pengguna sebagai acuan visual utama. Ikuti tata letak, proporsi, ukuran, jarak, warna, tipografi, dan susunan elemen yang terlihat pada referensi.

Jangan mengganti desain referensi dengan interpretasi sendiri apabila tidak diminta.

## 7. Aset dan Identitas Visual

Aset gambar tersedia di dalam proyek. Sebelum menggunakan gambar, periksa folder dan lokasi file yang sebenarnya.

### Gambar Hero
- Nama file aktual: `gambar di hero.png`
- Gunakan gambar ini untuk visual utama pada hero section sesuai desain yang ditentukan.
- Periksa lokasi file sebenarnya di dalam folder `assets` sebelum menggunakannya.
- Jangan mengganti nama atau mengganti gambar tanpa instruksi pengguna.

### Gambar Footer
- Nama file: `gambar1.png`
- Digunakan sebagai gambar latar atau elemen visual pada footer sesuai implementasi desain yang ditentukan.
- Pastikan teks footer tetap terbaca dan gambar tidak terpotong secara tidak proporsional.

### Aturan Penggunaan Aset
1. Periksa lokasi gambar sebelum menggunakannya.
2. Gunakan nama dan path aset yang benar-benar tersedia.
3. Jangan membuat nama file atau path gambar berdasarkan asumsi.
4. Jangan mengganti aset yang sudah benar tanpa instruksi.
5. Jika gambar tidak ditemukan, laporkan masalahnya sebelum mengganti dengan gambar lain.

8. Header, Navbar, dan Footer

Header, navbar, dan footer harus konsisten di semua halaman.

Gunakan struktur dan implementasi yang sudah tersedia sebagai acuan utama. Jika proyek sudah menggunakan komponen bersama atau partial, gunakan kembali mekanisme tersebut.

Jangan membuat versi navbar atau footer yang berbeda pada halaman tertentu tanpa instruksi.

Pastikan jarak antarmenu cukup luas, navigasi mobile berfungsi, dan seluruh elemen dapat diakses dengan nyaman.

9. Responsivitas dan Aksesibilitas

Website harus berfungsi pada:

- Desktop.
- Laptop.
- Tablet.
- Smartphone.
- Layar lebar atau TV.

Persyaratan:

- Tidak ada horizontal scrolling yang tidak disengaja.
- Tidak ada teks, gambar, atau tombol yang terpotong.
- Navbar dan menu mobile dapat digunakan.
- Gambar memiliki ukuran dan cropping yang proporsional.
- Ukuran teks dan tombol nyaman digunakan.
- Kontras warna memadai.
- Interaksi dasar dapat dioperasikan dengan keyboard jika relevan.

10. Aturan Pengembangan

Sebelum mengubah kode:

1. Baca file yang relevan.
2. Identifikasi HTML, CSS, JavaScript, dan aset yang mengendalikan fitur.
3. Pahami hubungan komponen dengan halaman lainnya.
4. Tentukan perubahan paling kecil yang dapat memenuhi permintaan.

Ketika mengerjakan fitur:

- Fokus pada satu fitur atau bagian sesuai instruksi.
- Pertahankan desain dan fungsi yang sudah benar.
- Jangan menghapus konten atau fitur yang tidak terkait.
- Jangan menimpa seluruh file jika perubahan lokal sudah cukup.
- Jangan menambahkan dependensi tanpa kebutuhan yang jelas.
- Jangan membuat data, tautan, atau fungsi yang seolah-olah nyata tetapi belum tersedia.

11. Aturan Menggunakan Screenshot Referensi

Screenshot yang diberikan pengguna adalah acuan desain.

Sebelum implementasi, identifikasi:

- Posisi dan urutan elemen.
- Lebar konten dan proporsi kolom.
- Ukuran serta posisi gambar.
- Tipografi, warna, dan jarak.
- Bentuk tombol, kartu, dan latar belakang.
- Perilaku layout pada ukuran layar yang berbeda.

Implementasikan desain berdasarkan hasil identifikasi tersebut. Jika informasi penting tidak terlihat dalam screenshot, gunakan pola desain yang konsisten dan jangan mengubah bagian yang sudah ditentukan.

12. Pemeriksaan Setelah Implementasi

Setelah mengedit:

1. Periksa kembali file yang berubah.
2. Pastikan tidak ada kesalahan HTML, CSS, atau JavaScript yang terlihat.
3. Periksa apakah fitur lain tetap berfungsi.
4. Uji tampilan desktop dan mobile jika memungkinkan.
5. Bandingkan hasil visual dengan screenshot referensi.
6. Laporkan bagian yang sudah selesai dan bagian yang belum dapat diverifikasi.

Jangan menyatakan website sudah sempurna atau seluruh fitur berfungsi tanpa pemeriksaan.

13. Prinsip Utama

Prioritas pengerjaan adalah:

1. Kesesuaian dengan instruksi dan referensi pengguna.
2. Konsistensi desain seluruh website.
3. Fungsi yang benar.
4. Responsivitas dan aksesibilitas.
5. Perubahan kode seminimal mungkin.
6. Kemudahan pemeliharaan proyek.

Jika ada konflik antara desain yang dibuat sendiri oleh AI dan referensi yang diberikan pengguna, prioritaskan referensi pengguna.
