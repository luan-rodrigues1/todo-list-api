import * as yup from "yup"
import { IUserLoggedResponse, IUserRequest, IUserResponse, IUserUpdate } from "../interfaces/users";

const createUserSchema: yup.Schema<IUserRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
})

const userWithoutPasswordSchema: yup.Schema<IUserResponse | any> =  yup.object().shape({
    profilePicture: yup.string().nullable(),
    isActive: yup.boolean().required(),
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    email: yup.string().email().required(),
    name: yup.string().required(),
    id: yup.string().required()
})

const LoggedWithoutPasswordSchema: yup.Schema<IUserLoggedResponse> =  yup.object().shape({
    tasks: yup.array().required(),
    profilePicture: yup.string().required(),
    isActive: yup.boolean().required(),
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    email: yup.string().email().required(),
    name: yup.string().required(),
    id: yup.string().required()
})

const updateUserSchema: yup.Schema<IUserUpdate | any> = yup.object().shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    isActive: yup.boolean().notRequired()
})



export { createUserSchema, userWithoutPasswordSchema, updateUserSchema, LoggedWithoutPasswordSchema}