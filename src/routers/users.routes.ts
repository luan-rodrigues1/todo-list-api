import {Router} from "express"
import { createdUserController, deleteUserController, updateUserController, loggedUserInfoController } from "../controllers/users.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureDetalsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import { createUserSchema, updateUserSchema } from "../schemas/user.schemas"

const userRoutes = Router()

userRoutes.post("", ensureDetalsValidMiddleware(createUserSchema), createdUserController)
userRoutes.get("", ensureAuthMiddleware, loggedUserInfoController)
userRoutes.delete("", ensureAuthMiddleware, deleteUserController)
userRoutes.patch("", ensureAuthMiddleware, ensureDetalsValidMiddleware(updateUserSchema), updateUserController)

export default userRoutes