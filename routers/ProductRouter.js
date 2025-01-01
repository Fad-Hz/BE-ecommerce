import { Router } from "express"
import { adminMiddleware, protectedMiddleware } from "../middlewares/ProtectedRouter.js"
import uploadFile from "../utils/UploadFile.js"
import {
    createProduct,
    allProduct,
    detailProduct,
    updateProduct,
    deleteProduct,
    fileUpload
} from "../controllers/ProductController.js"

const router = Router()
router.post('/', protectedMiddleware, adminMiddleware, createProduct)
router.get('/', protectedMiddleware, allProduct)
router.get('/:id', protectedMiddleware, detailProduct)
router.put('/:id', protectedMiddleware, adminMiddleware, updateProduct)
router.delete('/:id', protectedMiddleware, adminMiddleware, deleteProduct)
router.post(
    "/file-upload",
    protectedMiddleware,
    adminMiddleware,
    uploadFile, // Middleware untuk upload file
    fileUpload  // Controller untuk menanggapi setelah file di-upload
)


export default router