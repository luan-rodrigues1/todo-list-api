import * as yup from "yup"
import { IUserLogin } from "../interfaces/users"

const createSessionSchema: yup.Schema<IUserLogin> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
})

export {createSessionSchema}