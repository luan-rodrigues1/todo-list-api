import { IUserLogin } from "../../interfaces/users";
import { compare } from "bcryptjs";
import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import "dotenv/config"
import { AppError } from "../../errors";
import jwt from "jsonwebtoken"

const createSessionService = async(payload: IUserLogin): Promise<string> =>{
    const userRepository = AppDataSource.getRepository(User)

    const searchUser =  await userRepository.findOne({
        where: {
            email: payload.email 
        },
        withDeleted: true
    });
    
    if(!searchUser){
        throw new AppError("user or password invalid", 403) 
    }

    if(!searchUser.isActive){
        throw new AppError("user no actived", 400) 
    }

    const passwordMatch = await compare(payload.password, searchUser.password)

    if(!passwordMatch){
        throw new AppError("user or password invalid", 403) 
    }

    const token = jwt.sign(
        {
            isAdm: searchUser.id
        },
        process.env.SECRET_KEY as string,
        {
            subject: searchUser.id,
            expiresIn: "24h"
        }
    )

    return token
    
}

export default createSessionService