
# PT. Beon Intermedia Full Stack Developer Fit Test
## Manajemen Iuran Perumahan

Perkenalkan nama Saya Rafly Dioniswara Pramono. Berikut ini merupakan hasil pengerjaan take home test beserta tutorial instalasi aplikasi. Aplikasi website ini Saya bangun dengan teknologi MERN (MySQL, ExpressJs, ReactJs dan NodeJs) Stack.

## Tutorial Instalasi
Berikut ini merupakan tutorial cara instal aplikasi yang dimulai dari backend kemudian frontend.
### Instalasi Backend
1. Pertama Clone Repositori.
2.  Setelah berhasil melakukan clone repositori, maka kita dapat membuka hasil clone di teks editor atau IDE yang kita punya.
3. Terdapat dua folder yaitu frontend dan backend.
4. Kita mulai dari backend dengan cara membuka terminal di VS Code dengan cara menekan tombol ctrl + shift + `.
5. Setelah itu kita dapat menuliskan perintah cd backend.
6. Setelah kita berada di folder backend, lalu kita ketikkan perintah npm install atau yarn install (jika menggunakan yarn)
7. Setelah melakukan instalasi depedensi yang kita butuhkan, kita dapat melakukan konfigurasi database
8. Buka folder config dan buka file config.json
9. Setelah itu kita lihat, value dari database menandakan nama database yang akan kita gunakan.
10. Buka aplikasi xampp atau laragon sebagai server lokal kita.
11. Setelah itu kita buat database dengan nama yang sama dengan value database pada file config.json. (didalam contoh nama databasenya adalah db_dues_management)
12. Setelah kita pastikan membuat database, maka kita dapat melakukan migrasi dengan cara mengetikkan perintah berikut 'npx sequelize-cli db:migrate'.
13. Setelah itu proses migrasi akan dilakukan. Jika terdapat error maka pastikan database telah dibuat dengan baik dan benar.
14. Setelah itu, kita dapat melakukan data seeding kedalam database yaitu dengan mengetikkan perintah seperti berikut 'npx sequelize-cli db:seed:all'
15. Kita tunggu sampai proses seeding data selesai.
16. Setelah proses seeding selesai, kita dapat menjalankan server backend kita dengan mengetikkan perintah sebagai berikut 'npm run dev'
17. Setelah server berjalan, kita dapat membuka browser dengan mengetikkan url seperti berikut 'http://localhost:3001' atau 'http://localhost:3001/api'
18. Jika terdapat response, maka server backend sudah siap untuk digunakan.

### Instalasi Frontend
1. Kita mulai ke bagian frontend dengan cara membuka terminal di VS Code dengan cara menekan tombol ctrl + shift + `.
2. Setelah itu kita dapat menuliskan perintah cd frontend.
3. Setelah kita berada di folder frontend, lalu kita ketikkan perintah npm install atau yarn install (jika menggunakan yarn)
4. Setelah proses instalasi selesai, maka kita dapat membuka browser dengan mengetikkan url seperti berikut 'http://localhost:5173'
5. Jika tampilan berwarna putih, maka kita dapat mengalihakan secara manual dengan cara mengetikkan alamat url berikut 'http://localhost:5173/login'
6. Setelah itu kita dapat masuk ke sistem sesuai dengan data seeding yang telah dilakukan pada proses instalasi backend
7. Username: admin dan password: admin

### Hasil Pengerjaan dan Tampilan Per Fitur
1. Design ERD
![Alt text](/assets/ERD.jpg)
2. Halaman Login
![Alt text](/assets/login.png)
3. Halaman Utama
![Alt text](/assets/main-menu.png)
4. Manajemen Rumah
![Alt text](/assets/manajemen-rumah.png)
5. Tambah Penghuni Rumah
![Alt text](/assets/tambah-data-penghuni.png)
6. Edit Data Rumah atau Penghuni Rumah
![Alt text](/assets/edit-data-penghuni.png)
7. Tampilan Detail Penghuni Rumah
![Alt text](/assets/detail-penghuni.png)
8. Tampilan Data List Histori Penghuni
![Alt text](/assets/data-list-penghuni.png)
9. Penambahan Tagihan Iuran
![Alt text](/assets/tambah-tagihan-iuran.png)
10. Pembayaran Tagihan Iuran
![Alt text](/assets/pembayaran-tagihan-iuran.png)
11. Histori Pembayaran Penghuni
![Alt text](/assets/histori-pembayaran-penghuni.png)
12. Manajemen Pengeluaran
![Alt text](/assets/manajemen-pengeluaran.png)
13. Tambah Pengeluaran
![Alt text](/assets/tambah-pengeluaran.png)
14. Histori Transaksi Per Bulan
![Alt text](/assets/histori-transaksi.png)
15. Rekap Total Saldo Grafik Satu Tahun
![Alt text](/assets/saldo-setahun.png)

## Kesimpulan
Kesimpulan dari pembuatan apliaksi website Manajemen Iuran Perumahan yaitu Penanggung Jawab Perumahan Pak RT dapat melakukan berbagai kegiatan seperti penambahan penghuni, edit data rumah, pencatatan saldo, melihat histori transaksi, dll.