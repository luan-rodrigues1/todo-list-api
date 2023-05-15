import {Router} from "express"
import { createdTaskController, deleteTaskController, listTasksController, updateTaskController } from "../controllers/tasks.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureDetalsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import ensureExistTaskIdMiddleware from "../middlewares/ensureExistTaskId.middleware"
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schemas"

const taskRoutes = Router()

taskRoutes.post("", ensureAuthMiddleware, ensureDetalsValidMiddleware(createTaskSchema), createdTaskController)
taskRoutes.patch("/:id", ensureAuthMiddleware, ensureExistTaskIdMiddleware, ensureDetalsValidMiddleware(updateTaskSchema), updateTaskController)
taskRoutes.delete("/:id", ensureAuthMiddleware, ensureExistTaskIdMiddleware, deleteTaskController)
taskRoutes.get("", ensureAuthMiddleware, listTasksController)


export default taskRoutes