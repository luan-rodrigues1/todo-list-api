import * as yup from "yup"
import { Schema} from "yup";
import { IUserRequest, IUserResponse } from "../interfaces/users";

const createUserSchema: Schema<IUserRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
})

const userWithoutPasswordSchema: Schema<IUserResponse> =  yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
})

export { createUserSchema, userWithoutPasswordSchema}