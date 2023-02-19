import {Router} from "express"
import { createdUserController } from "../controllers/users.controllers"
import ensureDetalsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import { createUserSchema } from "../schemas/user.schemas"

const userRoutes = Router()

userRoutes.post("", ensureDetalsValidMiddleware(createUserSchema), createdUserController)

export default userRoutes