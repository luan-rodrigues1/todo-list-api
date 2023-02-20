import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listAllUsersService from "../services/users/listAllUsers.service";
import updateUserService from "../services/users/updateUser.service";

const createdUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body
    const newUser = await createUserService(userData)
    return res.status(201).json(newUser)
}

const listAllUsersController = async (req: Request, res: Response) => {
    const listUsers = await listAllUsersService()
    return res.status(200).json(listUsers)
}

const deleteUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.id
    const loggedId: string = req.user.id
    const deleteUserInfo = await deleteUserService(userId, loggedId)
    return res.status(204).json(deleteUserInfo)
}

const updateUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.id
    const loggedId: string = req.user.id
    const deleteUserInfo = await updateUserService(userId, req.body, loggedId)
    return res.status(200).json(deleteUserInfo)
}

export {createdUserController, listAllUsersController, deleteUserController, updateUserController}