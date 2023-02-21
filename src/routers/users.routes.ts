import {Router} from "express"
import { createdUserController, listAllUsersController, deleteUserController, updateUserController, loggedUserInfoController } from "../controllers/users.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureDetalsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import ensureExistUserIdMiddleware from "../middlewares/ensureExistUserId.middleware"
import { createSessionSchema } from "../schemas/session.schemas"
import { createUserSchema, updateUserSchema } from "../schemas/user.schemas"

const userRoutes = Router()

userRoutes.post("", ensureDetalsValidMiddleware(createUserSchema), createdUserController)
userRoutes.get("", listAllUsersController)
userRoutes.delete("/:id", ensureAuthMiddleware, ensureExistUserIdMiddleware, deleteUserController)
userRoutes.patch("/:id", ensureAuthMiddleware, ensureExistUserIdMiddleware, ensureDetalsValidMiddleware(updateUserSchema), updateUserController)
userRoutes.get("/profile", ensureAuthMiddleware, loggedUserInfoController)

export default userRoutes