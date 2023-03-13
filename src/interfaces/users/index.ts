import { ITask } from "../tasks.ts"

export interface IUserRequest {
    name: string
    email: string
    password: string
}


export interface IUserResponse {
    id: string
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    profilePicture: string 
}

export interface IUserLoggedResponse {
    id: string
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    profilePicture: string 
    tasks: ITask[]
}

export interface IUserUpdate {    
    name?: string 
    email?: string 
    password?: string 
    isActive?: boolean
    id?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface IUserLogin {
    email: string
    password: string
}