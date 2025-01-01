import { Router } from "express"
import {
    allOrder,
    createOrder,
    currentUserOrder,
    detailOrder
} from "../controllers/OrderController.js"
import { adminMiddleware, protectedMiddleware } from '../middlewares/ProtectedRouter.js'
const router = Router()

router.post('/', protectedMiddleware, createOrder)
router.get('/', protectedMiddleware, adminMiddleware, allOrder)
router.get('/:id', protectedMiddleware, adminMiddleware, detailOrder)
router.get('/current/order', protectedMiddleware, currentUserOrder)

export default router 