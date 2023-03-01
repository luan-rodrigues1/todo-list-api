import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import loggedUserInfoService from "../services/users/loggedUserInfo.service";
import updateUserService from "../services/users/updateUser.service";

const createdUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body
    const newUser = await createUserService(userData)
    return res.status(201).json(newUser)
}

const deleteUserController = async (req: Request, res: Response) => {
    const userId: string = req.user.id
    const deleteUserInfo = await deleteUserService(userId)
    return res.status(204).json(deleteUserInfo)
}

const updateUserController = async (req: Request, res: Response) => {
    const userId: string = req.user.id
    const deleteUserInfo = await updateUserService(req.body, userId)
    return res.status(200).json(deleteUserInfo)
}

const loggedUserInfoController = async (req: Request, res: Response) => {
    const userId: string = req.user.id
    const InfoUser = await loggedUserInfoService(userId)
    return res.status(200).json(InfoUser)
}

export {createdUserController, deleteUserController, updateUserController, loggedUserInfoController}