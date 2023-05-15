import * as yup from "yup"
import { SchemaOf } from "yup"
import { IUserLoggedResponse, IUserRequest, IUserResponse, IUserUpdate} from "../interfaces/users";

const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
})

const userWithoutPasswordSchema: SchemaOf<IUserResponse> =  yup.object().shape({
    profilePicture: yup.string().nullable(),
    isActive: yup.boolean().required(),
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    email: yup.string().email().required(),
    name: yup.string().required(),
    id: yup.string().required()
})

const LoggedWithoutPasswordSchema = yup.object().shape({
    tasks: yup.array(),
    profilePicture: yup.string().nullable(),
    isActive: yup.boolean().required(),
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    email: yup.string().email().required(),
    name: yup.string().required(),
    id: yup.string().required()
});

const updateUserSchema = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
});

export { createUserSchema, userWithoutPasswordSchema, updateUserSchema, LoggedWithoutPasswordSchema}