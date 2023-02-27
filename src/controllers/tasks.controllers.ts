import { Request, Response } from "express";
import { ITaskRequest } from "../interfaces/tasks.ts";
import createTaskService from "../services/tasks/createTask.service";
import deleteTaskService from "../services/tasks/deleteTask.service";
import listTasksCategoryService from "../services/tasks/listTasksCategory.service";
import updateTaskService from "../services/tasks/updateTask.service";

const createdTaskController = async (req: Request, res: Response) => {
    const taskData: ITaskRequest = req.body
    const userId: string = req.user.id 
    const newTask = await createTaskService(taskData, userId)

    return res.status(201).json(newTask)
}

const updateTaskController = async (req: Request, res: Response) => {
    const updateData: ITaskRequest = req.body
    const taskId: string = req.params.id
    const userId: string = req.user.id 

    const newTask = await updateTaskService(updateData, taskId, userId)

    return res.status(200).json(newTask)
}

const deleteTaskController = async (req: Request, res: Response) => {
    const taskId: string = req.params.id
    const userId: string = req.user.id 

    await deleteTaskService(taskId, userId)

    return res.status(204).json()
}

const listTasksCategoryController = async (req: Request, res: Response) => {
    const category: string = req.params.category
    const userId: string = req.user.id 

    const list = await listTasksCategoryService(category, userId)

    return res.status(200).json(list)
}

export {createdTaskController, updateTaskController, deleteTaskController, listTasksCategoryController}