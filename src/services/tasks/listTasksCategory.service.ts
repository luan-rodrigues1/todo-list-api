import AppDataSource from "../../data-source"
import { Task } from "../../entities/task.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"

const listTasksCategoryService = async (categoryName: string, userId: string) => {
    const taskRepo = AppDataSource.getRepository(Task)

    const existingCategory = await taskRepo.createQueryBuilder('tasks')
        .where('tasks.user = :user_id_tasks', { user_id_tasks: userId })
        .andWhere(`LOWER(REPLACE(tasks.category, ' ','')) = :category_tasks`, { category_tasks: `${categoryName.replace(/\s/g, '').toLowerCase()}`})
    .getMany()

    if(!existingCategory[0]) {
        throw new AppError("category not found", 404)
    }

    return existingCategory

    
}
export default listTasksCategoryService