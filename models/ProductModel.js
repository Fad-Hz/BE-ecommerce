import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Nama product harus diisi'],
        unique: [true, 'Nama product sudah digunakan, buat yang lain!']
    },
    price: {
        type: Number, 
        required: [true, 'Harga product harus diisi'],
        min: [0, 'Harga tidak boleh negatif']
    }, 
    description: {
        type: String, 
        required: [true, 'Deskripsi product harus diisi']
    }, 
    image: {
        type: String, 
        default: null 
    },
    category: {
        type: String,
        required: [true, 'Category product harus diisi'],
        enum: ['sepatu', 'kemeja', 'baju', 'celana']
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'Stok tidak boleh negatif']
    }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)