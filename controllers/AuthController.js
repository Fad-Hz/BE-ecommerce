import jwt from 'jsonwebtoken'
import User from "../models/UserModel.js"
import asyncHandler from "../middlewares/AsyncHandler.js"

const registerToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = registerToken(user._id)
    const isDev = process.env.NODE_ENV === 'development' ? false : true
    const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: isDev // Menggunakan 'secure' untuk menentukan apakah cookie hanya dapat dikirim melalui HTTPS
    }
    res.cookie('jwt', token, cookieOptions)
    user.password = undefined // Menyembunyikan password di response
    res.status(statusCode).json({
        data: user
    })
}

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const isOwner = (await User.countDocuments()) === 0 // Mengecek jika pengguna pertama adalah 'owner'
    const role = isOwner ? 'owner' : 'user'

    const userCreate = await User.create({ name, email, password, role }) // Membuat pengguna baru
    createSendToken(userCreate, 201, res) // Mengirim token
})

export const loginUser = asyncHandler(async (req, res) => {
    // validasi
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Inputan Email/Password tidak boleh kosong')
    }

    // find user & check password
    const findUser = await User.findOne({ email })
    if (findUser && (await findUser.comparePassword(password))) {
        createSendToken(findUser, 200, res)
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})


export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password')
    if (user) {
        return res.status(200).json({ data: user })
    } else {
        res.status(404)
        throw new Error('User tidak ditemukan')
    }
})

export const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(200).json({
        message: 'Logout Berhasil'
    })
}
