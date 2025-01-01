import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

// Mendapatkan direktori saat ini
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Tipe file yang valid
const FILE_TYPE = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpeg"
}

// Path folder upload
const uploadDir = path.join(__dirname, "..", "uploads")

// Membuat folder jika belum ada
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
    console.log("Folder 'public/uploads' berhasil dibuat.")
}

// Konfigurasi storage untuk multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValidFormat = FILE_TYPE[file.mimetype] // Validasi tipe file
        if (!isValidFormat) {
            return cb(new Error("Invalid image type. Only jpg, jpeg, and png are allowed"), false)
        }
        cb(null, uploadDir) // Menentukan folder tujuan penyimpanan
    },
    filename: (req, file, cb) => {
        // Menambahkan nama unik pada file
        const uniqueFile = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        cb(null, uniqueFile)
    }
})

// Konfigurasi multer
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Maksimum ukuran file: 5MB
    },
    fileFilter: (req, file, cb) => {
        // Validasi tipe file
        if (!FILE_TYPE[file.mimetype]) {
            return cb(new Error("Invalid image type. Only jpg, jpeg, and png are allowed"), false)
        }
        cb(null, true)
    }
})

// Middleware upload untuk satu file
export default upload.single("file")
