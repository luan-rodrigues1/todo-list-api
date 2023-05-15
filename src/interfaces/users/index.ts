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
    profilePicture: string | null | undefined 
}

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserLoggedResponse {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    profilePicture: string | null | undefined;
    tasks: ITask[];
}

export interface IUserUpdate {    
    name?: string;
    email?: string;
}