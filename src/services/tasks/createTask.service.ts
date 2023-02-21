import AppDataSource from "../../data-source"
import { Task } from "../../entities/task.entity"
import { User } from "../../entities/user.entity"
import { ITask, ITaskRequest } from "../../interfaces/tasks.ts"

const createTaskService = async (payload: ITaskRequest, userId: string): Promise<ITask| any> => {
    const taskRepo = AppDataSource.getRepository(Task)
    const userRepo = AppDataSource.getRepository(User)

    const searchUser =  await userRepo.findOne({
        where: {
            id: userId
        },
        relations: {
            tasks: true
        }
    })

    const existingCategory = await taskRepo.createQueryBuilder('tasks')
        .where('tasks.user = :user_id_tasks', { user_id_tasks: userId })
        .andWhere(`LOWER(REPLACE(tasks.category, ' ','')) = :category_tasks`, { category_tasks: `${payload.category.replace(/\s/g, '').toLowerCase()}`})
    .getOne()

    if(existingCategory) {
        payload.category = existingCategory.category
    }

    const newTask = taskRepo.create(payload)
    await taskRepo.save(newTask)

    await taskRepo.update(
        {
            id: newTask.id
        },
        {
            user: searchUser!
        }
    )

    return newTask
}

export default createTaskService