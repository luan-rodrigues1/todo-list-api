import {Router} from "express"
import { createdTaskController, deleteTaskController, listTasksCategoryController, updateTaskController } from "../controllers/tasks.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureDetalsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import { createTaskSchema, TaskCategorySchema, updateTaskSchema } from "../schemas/task.schemas"

const taskRoutes = Router()

taskRoutes.post("", ensureAuthMiddleware, ensureDetalsValidMiddleware(createTaskSchema), createdTaskController)
taskRoutes.patch("/:id", ensureAuthMiddleware, ensureDetalsValidMiddleware(updateTaskSchema), updateTaskController)
taskRoutes.delete("/:id", ensureAuthMiddleware, deleteTaskController)
taskRoutes.post("/category", ensureAuthMiddleware, ensureDetalsValidMiddleware(TaskCategorySchema), listTasksCategoryController)

export default taskRoutes