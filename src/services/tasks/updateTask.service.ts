import AppDataSource from "../../data-source"
import { Task } from "../../entities/task.entity"
import { AppError } from "../../errors"
import { ITaskUpdate } from "../../interfaces/tasks.ts"
import { TaskResponseSchema } from "../../schemas/task.schemas"

const updateTaskService = async (payload: ITaskUpdate, taskId: string, userId: string): Promise<ITaskUpdate> => {
    const taskRepo = AppDataSource.getRepository(Task)

    if(payload.priority){
        if(payload.priority !== "Alta" && payload.priority !== "Média" && payload.priority !== "Baixa"){
            throw new AppError("The priority field value is invalid", 401)
        }
    }

    const searchTask = await taskRepo.findOne({
        where: {
            id: taskId
        },
        relations: {
            user: true
        }
    })
    
    if(searchTask!.user.id !== userId){
        throw new AppError("missing permissions", 401)
    }

    if(payload.category){
        const existingCategory = await taskRepo.createQueryBuilder('tasks')
            .where('tasks.user = :user_id_tasks', { user_id_tasks: userId })
            .andWhere(`LOWER(REPLACE(tasks.category, ' ','')) = :category_tasks`, { category_tasks: `${payload.category.replace(/\s/g, '').toLowerCase()}`})
        .getOne()

        if(existingCategory) {
            payload.category = existingCategory.category
        }
    }

    const updateTask = taskRepo.create({
        ...searchTask,
        ...payload
    })

    await taskRepo.save(updateTask)
    

    const updateTaskValid = await TaskResponseSchema.validate(updateTask, {
        stripUnknown: true
    })
    
    return updateTaskValid
}

export default updateTaskService