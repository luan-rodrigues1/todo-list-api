import * as yup from "yup"
import { Schema } from "yup";
import { IUserRequest, IUserResponse, IUserUpdate } from "../interfaces/users";

const createUserSchema: yup.Schema<IUserRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
})

const userWithoutPasswordSchema: yup.Schema<IUserResponse> =  yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    isActive: yup.boolean().required()
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



export { createUserSchema, userWithoutPasswordSchema, updateUserSchema}