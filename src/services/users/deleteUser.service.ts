import { Request } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const deleteUserService = async (userId: string, loggedId: string) => {
    if(userId !== loggedId){
        throw new AppError("missing permissions", 401)
    }
    
    const userRepo = AppDataSource.getRepository(User)
    const searchUser =  await userRepo.findOneBy({ id: userId });


    await userRepo.softRemove(searchUser!)
    await userRepo.save({...searchUser, isActive: false})
}

export default deleteUserService