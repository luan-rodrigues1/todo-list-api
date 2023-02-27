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
