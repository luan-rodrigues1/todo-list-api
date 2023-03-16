import {Router} from "express"
import { createdUserController, deleteUserController, updateUserController, loggedUserInfoController, uploadImageUserController } from "../controllers/users.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureDetalsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import { createUserSchema, updateUserSchema } from "../schemas/user.schemas"
import multer from "multer"
import {storage, fileFilter} from "../config/multer.config"


const upload = multer({storage: storage, fileFilter: fileFilter})
const userRoutes = Router()

userRoutes.post("", ensureDetalsValidMiddleware(createUserSchema), createdUserController)
userRoutes.get("", ensureAuthMiddleware, loggedUserInfoController)
userRoutes.delete("", ensureAuthMiddleware, deleteUserController)
userRoutes.patch("", ensureAuthMiddleware, ensureDetalsValidMiddleware(updateUserSchema), updateUserController)
userRoutes.patch("/upload", ensureAuthMiddleware, upload.single('avatar'), uploadImageUserController)

export default userRoutes