import {Router} from "express"
import createSessionController from "../controllers/session.controllers"
import ensureDetalsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import { createSessionSchema } from "../schemas/session.schemas"

const sessionRoutes = Router()

sessionRoutes.post("", ensureDetalsValidMiddleware(createSessionSchema), createSessionController)

export default sessionRoutes