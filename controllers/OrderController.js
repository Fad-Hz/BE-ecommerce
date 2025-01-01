import asyncHandler from '../middlewares/AsyncHandler.js'
import Product from '../models/ProductModel.js'
import Order from '../models/OrderSchema.js'
import User from '../models/UserModel.js'

export const createOrder = asyncHandler(async (req, res) => {
    const { email, firstName, lastName, phone, cartItem } = req.body

    if (!cartItem || cartItem.length === 0) {
        res.status(400)
        throw new Error('Cart is empty')
    }

    let orderItems = []
    let total = 0

    for (const cart of cartItem) {
        const productData = await Product.findOne({ _id: cart.product })
        if (!productData) {
            res.status(404)
            throw new Error('Product not found')
        }
        const { name, price, _id } = productData
        const singleProduct = {
            quantity: cart.quantity,
            name,
            price,
            product: _id
        }
        orderItems = [...orderItems, singleProduct]
        total += cart.quantity * price

    }

    const order = await Order.create({
        itemsDetail: orderItems,
        totalAmount: total,
        firstName,
        lastName,
        email,
        phone,
        user: req.user.id 
    })
    

    return res.status(201).json({
        message: 'Order created',
        order,
        total
    })
})

export const allOrder = asyncHandler(async (req, res) => {
    const order = await Order.find()
    return res.status(200).json({
        message: 'All orders',
        order
    })
})

export const detailOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(404)
        throw new Error('Order not found')
    }
    return res.status(200).json({
        message: 'Order detail',
        order
    })
})

export const currentUserOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })

    if (!orders || orders.length === 0) {
        res.status(404)
        throw new Error('No orders found')
    }

    res.status(200).json({
        message: 'Your orders',
        orders
    })
})
