BE-ecommerce

BE-ecommerce adalah proyek backend untuk aplikasi e-commerce yang dibangun menggunakan Node.js, Express, dan MongoDB. Proyek ini menyediakan API untuk mengelola produk, pesanan, dan pengguna dalam platform e-commerce.
Fitur

    Manajemen Produk: CRUD (Create, Read, Update, Delete) untuk produk.
    Manajemen Pesanan: Membuat dan melihat pesanan pengguna.
    Manajemen Pengguna: Registrasi, login, dan autentikasi pengguna.
    Middleware Proteksi: Middleware untuk melindungi rute yang memerlukan autentikasi.
    Validasi Input: Validasi data yang diterima dari klien.

Prasyarat

Sebelum memulai, pastikan Anda telah menginstal perangkat berikut:

    Node.js (versi terbaru disarankan)
    MongoDB (dapat menggunakan layanan cloud seperti MongoDB Atlas)

Instalasi

    Kloning repositori:

git clone https://github.com/Fad-Hz/BE-ecommerce.git
cd BE-ecommerce

Instal dependensi:

npm install

Konfigurasi variabel lingkungan:

Buat file .env di root direktori dan tambahkan variabel berikut:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

    Gantilah your_mongodb_connection_string dengan URI MongoDB Anda dan your_jwt_secret dengan string rahasia untuk JWT.

Menjalankan Aplikasi

Untuk menjalankan server dalam mode pengembangan:

npm run dev

Server akan berjalan di http://localhost:5000.
Struktur Direktori

BE-ecommerce/
├── controllers/
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── middlewares/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   ├── orderModel.js
│   ├── productModel.js
│   └── userModel.js
├── routers/
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── utils/
│   └── db.js
├── .gitignore
├── package-lock.json
├── package.json
├── server.js
└── vercel.json

    controllers/: Berisi logika untuk setiap rute.
    middlewares/: Middleware untuk autentikasi dan penanganan error.
    models/: Definisi skema MongoDB untuk koleksi.
    routers/: Definisi rute aplikasi.
    utils/: Fungsi utilitas, seperti koneksi database.

API Endpoint
Produk

    GET /api/products: Mendapatkan semua produk.
    GET /api/products/:id: Mendapatkan detail produk berdasarkan ID.
    POST /api/products: Menambahkan produk baru (dilindungi, hanya admin).
    PUT /api/products/:id: Memperbarui produk berdasarkan ID (dilindungi, hanya admin).
    DELETE /api/products/:id: Menghapus produk berdasarkan ID (dilindungi, hanya admin).

Pesanan

    GET /api/orders: Mendapatkan semua pesanan (dilindungi, hanya admin).
    GET /api/orders/current: Mendapatkan pesanan pengguna saat ini (dilindungi).
    GET /api/orders/:id: Mendapatkan detail pesanan berdasarkan ID (dilindungi).
    POST /api/orders: Membuat pesanan baru (dilindungi).

Pengguna

    POST /api/users/register: Mendaftarkan pengguna baru.
    POST /api/users/login: Login pengguna.
    GET /api/users/profile: Mendapatkan profil pengguna (dilindungi).
    PUT /api/users/profile: Memperbarui profil pengguna (dilindungi).

Middleware

    authMiddleware.js: Middleware untuk memverifikasi token JWT dan melindungi rute yang memerlukan autentikasi.
    errorMiddleware.js: Middleware untuk menangani error yang terjadi dalam aplikasi.


Lisensi

2024 || Fadillah Maulana