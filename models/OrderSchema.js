import mongoose from "mongoose"

const singleProduct = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

const orderSchema = new mongoose.Schema({
    totalAmmount: {
        type: Number
    },
    itemsDetail: [singleProduct],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled']
    },
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    }
})

export default mongoose.model("Order", orderSchema)