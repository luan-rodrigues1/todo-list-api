import * as yup from "yup"
import { ITaskCategory, ITaskRequest, ITaskUpdate } from "../interfaces/tasks.ts"

const createTaskSchema: yup.Schema<ITaskRequest | any> = yup.object().shape({
    name: yup.string().required(),
    priority: yup.string().required(),
    description: yup.string().notRequired(),
    category: yup.string().required()
})

const updateTaskSchema: yup.Schema<ITaskUpdate | any> = yup.object().shape({
    name: yup.string().notRequired(),
    priority: yup.string().notRequired(),
    description: yup.string().notRequired(),
    category: yup.string().notRequired(),
    completed: yup.boolean().notRequired()
})

const updateTaskResponseSchema: yup.Schema<ITaskUpdate | any> = yup.object().shape({
    completed: yup.boolean().required(),
    createdAt: yup.date().required(),
    category: yup.string().required(),
    priority: yup.string().required(),
    description: yup.string().required(),
    name: yup.string().required(),
    id: yup.string().required()
})

const TaskCategorySchema: yup.Schema<ITaskCategory> = yup.object().shape({
    category: yup.string().required()
})

export {createTaskSchema, updateTaskSchema, updateTaskResponseSchema, TaskCategorySchema}