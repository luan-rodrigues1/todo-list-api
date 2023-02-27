import { ITaskRequest, ITaskUpdate } from "../../interfaces/tasks.ts";
import { IUserRequest } from "../../interfaces/users";
import { IUserLogin } from "../../interfaces/users";

export const mockedUser: IUserRequest = {
    name: 'Levi',
    email: 'levi@mail.com',
    password: '1234'
}

export const mockedUser2: IUserRequest = {
    name: 'Lucas',
    email: 'Lucas@mail.com',
    password: '1234'
}

export const mockedUserLogin1: IUserLogin = {
    email: 'levi@mail.com',
    password: '1234'
}

export const mockedUserLogin2: IUserLogin = {
    email: 'Lucas@mail.com',
    password: '1234'
}

export const mockedTask1: ITaskRequest = {
    name: "task1",
    priority: "Média",
	description: "descrição task 1",
	category: "Estudo"
}

export const mockedTask2: ITaskRequest = {
    name: "task2",
    priority: "Alta",
	description: "descrição task 2",
	category: "Trabalho"
}

export const mockedTaskInvalidPriority: ITaskRequest = {
    name: "task1",
    priority: "media",
	description: "descrição task 1",
	category: "Estudo"
}

export const mockedTaskUpdated: ITaskUpdate = {
    name: "taskUpdate",
    priority: "Baixa",
	description: "descrição task update",
	category: "estudo",
    completed: true
}