export interface ITaskRequest {
    name: string
    priority: string
    description?: string
    category: string
}
export interface ITask {
    id: string
    name: string
    priority: string
    description?: string | null | undefined
    category: string
    completed: boolean
    createdAt: Date
}

export interface ITaskUpdate {
    name?: string
    priority?: string
    description?: string
    category?: string
    completed?: boolean
}