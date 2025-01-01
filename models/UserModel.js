import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama harus diisi'],
        unique: [true, 'Username sudah digunakan']
    },
    email: {
        type: String,
        required: [true, 'Email harus diisi'],
        unique: [true, 'Email sudah pernah didaftarkan'],
        validate: {
            validator: validator.isEmail,
            message: 'Input harus berupa email yang valid, contoh: example@gmail.com'
        }
    },
    password: {
        type: String, 
        required: [true, 'Password harus diisi'],
        minlength: [6, 'Password minimal 6 karakter'] // `minLength` diubah menjadi `minlength` untuk konsistensi
    },
    role: {
        type: String, 
        enum: ['user', 'owner'],
        default: 'user'
    }
})

// Middleware untuk hash password sebelum disimpan
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next() // Skip jika password tidak diubah
    const salt = await bcrypt.genSalt(10)    
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Metode untuk membandingkan password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)
export default User
