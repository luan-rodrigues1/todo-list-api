import AppDataSource from "../../data-source"
import { Task } from "../../entities/task.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { ITask, ITaskRequest } from "../../interfaces/tasks.ts"
import { TaskResponseSchema } from "../../schemas/task.schemas"

const createTaskService = async (payload: ITaskRequest, userId: string): Promise<ITask| any> => {
    const taskRepo = AppDataSource.getRepository(Task)
    const userRepo = AppDataSource.getRepository(User)

    if(payload.priority !== "Alta" && payload.priority !== "Média" && payload.priority !== "Baixa"){
        throw new AppError("The priority field value is invalid", 401)
    }

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

    const newTaskValid = await TaskResponseSchema.validate(newTask, {
        stripUnknown: true
    })

    console.log(newTaskValid)

    return newTaskValid
}

export default createTaskService