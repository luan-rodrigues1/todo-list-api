import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Task } from "../entities/task.entity";
import { AppError } from "../errors";

const ensureExistTaskIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const taskRepo = AppDataSource.getRepository(Task)

    const searchTask =  await taskRepo.findOneBy({ id: req.params.id });

    if(!searchTask){
        throw new AppError("Task not found", 404)
    }

    return next()
}

export default ensureExistTaskIdMiddleware