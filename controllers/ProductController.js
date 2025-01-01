import mongoose from 'mongoose'
import asyncHandler from "../middlewares/AsyncHandler.js"
import Product from "../models/ProductModel.js"

export const createProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body)
    res.status(201).json({
        message: 'Berhasil Create Product',
        data: newProduct
    })
})

export const allProduct = asyncHandler(async (req, res) => {
    const queryObj = { ...req.query }
    const execludeField = ['page', 'limit', 'name']
    execludeField.forEach(element => delete queryObj[element])

    let query
    if (req.query.name) {
        query = Product.find({
            name: {$regex: req.query.name, $options: 'i'}
        })
    } else {
        query = Product.find(queryObj)    
    }


    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 30
    const skip = (page - 1) * limit
    query = query.skip(skip).limit(limit)

    let countProduct = await Product.countDocuments()
    if (req.query.page) {
        if (skip >= countProduct) {
            res.status(404)
            throw new Error('Halaman ini tidak ditemukan')
        }
    }

    const data = await query
    if (req.query.category) {
        res.status(200).json({
            message: `Berhasil find all Product dengan category ${req.query.category}`,
            data,
            count: countProduct
        })
    } else {
        res.status(200).json({
            message: 'Berhasil find all Product',
            data,
            count: countProduct
        })
    }
})

export const detailProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(404)
        throw new Error('Product ID tidak valid')
    }

    const findProduct = await Product.findById(productId)

    return res.status(200).json({
        message: 'Berhasil find Product by ID',
        data: findProduct
    })
})

export const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(404)
        throw new Error('Product ID tidak valid')
    }

    const updateProduct = await Product.findByIdAndUpdate(productId, req.body, { runValidators: false, new: true })

    return res.status(200).json({
        message: 'Berhasil update Product',
        data: updateProduct
    })

})
export const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(404)
        throw new Error('Product ID tidak valid')
    }

    await Product.findByIdAndDelete(productId)
    return res.status(200).json({
        message: 'Berhasil delete Product'
    })
})

export const fileUpload = asyncHandler(async (req, res) => {
    const file = req.file

    // Validasi apakah file ada
    if (!file) {
        res.status(400)
        throw new Error("Tidak ada file yang diunggah.")
    }

    // Mendapatkan nama file dan path relatif
    const imageFileName = file.filename
    const pathImageFile = `public/uploads/${imageFileName}`

    // Mengembalikan respons sukses
    res.status(200).json({
        message: "Gambar berhasil diunggah.",
        image: pathImageFile
    })
})
