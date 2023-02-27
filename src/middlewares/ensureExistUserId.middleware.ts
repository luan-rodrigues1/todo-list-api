import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity"; 
import { AppError } from "../errors";

const ensureExistUserIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(User)

    const searchUser =  await userRepo.findOneBy({ id: req.params.id });

    if(!searchUser){
        throw new AppError("User not found", 404)
    }

    return next()
    
}

export default ensureExistUserIdMiddleware