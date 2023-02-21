import AppDataSource from "../../data-source"
import { Task } from "../../entities/task.entity"
import { AppError } from "../../errors"
import { ITaskCategory } from "../../interfaces/tasks.ts"

const listTasksCategoryService = async (payload: ITaskCategory, userId: string) => {
    const taskRepo = AppDataSource.getRepository(Task)

    const existingCategory = await taskRepo.createQueryBuilder('tasks')
        .where('tasks.user = :user_id_tasks', { user_id_tasks: userId })
        .andWhere(`LOWER(REPLACE(tasks.category, ' ','')) = :category_tasks`, { category_tasks: `${payload.category.replace(/\s/g, '').toLowerCase()}`})
    .getMany()

    if(existingCategory) {
        throw new AppError("category not found", 404)
    }

    return existingCategory
    
}
export default listTasksCategoryService