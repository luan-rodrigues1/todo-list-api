import * as yup from "yup"
import { ITask, ITaskRequest, ITaskUpdate } from "../interfaces/tasks.ts"

const createTaskSchema: yup.Schema<ITaskRequest | any> = yup.object().shape({
    name: yup.string().max(50).required(),
    priority: yup.string().required(),
    description: yup.string().max(300).notRequired(),
    category: yup.string().required()
})

const updateTaskSchema: yup.Schema<ITaskUpdate | any> = yup.object().shape({
    name: yup.string().max(50).notRequired(),
    priority: yup.string().notRequired(),
    description: yup.string().max(300).notRequired(),
    category: yup.string().notRequired(),
    completed: yup.boolean().notRequired()
})

const TaskResponseSchema: yup.Schema<ITask> = yup.object().shape({
    id: yup.string().required(),
    completed: yup.boolean().required(),
    createdAt: yup.date().required(),
    category: yup.string().required(),
    priority: yup.string().required(),
    description: yup.string().required(),
    name: yup.string().required(),
})


export {createTaskSchema, updateTaskSchema, TaskResponseSchema}