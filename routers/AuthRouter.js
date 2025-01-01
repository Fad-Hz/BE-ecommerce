import { Router } from "express"
import { getUser, loginUser, logoutUser, registerUser } from '../controllers/AuthController.js'
import { protectedMiddleware } from "../middlewares/ProtectedRouter.js"

const router = Router()
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getuser', protectedMiddleware, getUser)
router.delete('/logout', protectedMiddleware, logoutUser)

export default router 