import AppDataSource from "../../data-source"
import { Task } from "../../entities/task.entity"
import { AppError } from "../../errors"

const deleteTaskService = async (taskId: string, userId: string) => {
    const taskRepo = AppDataSource.getRepository(Task)

    const searchTask = await taskRepo.findOne({
        where: {
            id: taskId
        },
        relations: {
            user: true
        }
    })

    if(!searchTask){
        throw new AppError("Task not found", 404)
    }

    if(searchTask.user.id !== userId){
        throw new AppError("missing permissions", 401)
    }

    return await taskRepo.delete(searchTask.id)
}

export default deleteTaskService