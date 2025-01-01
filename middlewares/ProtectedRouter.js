import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
import asyncHandler from './AsyncHandler.js'

export const protectedMiddleware = asyncHandler(async (req, res, next) => {
    let token
    token = req.cookies.jwt
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('+password')
            next()

        } catch (err) {
            res.status(401)
            throw new Error('Authorized token fail')
        }
    } else {
        res.status(401)
        throw new Error('No token found')
    }
})

export const adminMiddleware = asyncHandler(async (req, res, next) => {
    if(req.user && req.user.role === 'owner') {
        next()
    } else {
        res.status(401)
        throw new Error('Not Authorized as Owner')
    }
})