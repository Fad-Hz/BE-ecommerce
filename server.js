import 'dotenv/config'
import { connect } from 'mongoose'

import express from 'express'
import AuthRouter from './routers/AuthRouter.js'
import ProductRouter from './routers/ProductRouter.js'
import OrderRouter from './routers/OrderRouter.js'
import notFound from './middlewares/NotFound.js'
import errorHandler from './middlewares/ErrorHandler.js'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'

const app = express()

// Middleware untuk parsing JSON ,URL-encoded, static file uploads
app.use(helmet())
app.use(ExpressMongoSanitize())
app.use(cookieParser()) // Memanggil cookieParser sebagai fungsi
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./uploads'))

// Routing
app.use('/api/auth', AuthRouter)
app.use('/api/product', ProductRouter)
app.use('/api/order', OrderRouter)

// Middleware untuk menangani route yang tidak ditemukan
app.use(notFound)

// Middleware untuk menangani error
app.use(errorHandler)

const startServer = async () => {
    try {
        // Koneksi ke MongoDB
        await connect(process.env.MONGO_URI)
        console.log('Database terkoneksi')

        // Menjalankan server
        const PORT = 3000
        app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`))
    } catch (err) {
        console.error('Gagal menjalankan server:', err)
        process.exit(1) // Keluar dari proses dengan kode error
    }
}

startServer()
