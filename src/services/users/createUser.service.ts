import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IUserRequest, IUserResponse } from "../../interfaces/users";
import { userWithoutPasswordSchema } from "../../schemas/user.schemas";

const createUserService = async (payload: IUserRequest): Promise<IUserResponse> => {
    const userRepo = AppDataSource.getRepository(User)
    const user = userRepo.create(payload)

    const searchUser =  await userRepo.findOneBy({ email: user.email });

    if(searchUser){
        throw new AppError("User already exists!", 409)
    }
    
    await userRepo.save(user)

    const userWithoutPassword = await userWithoutPasswordSchema.validate(user, {
        stripUnknown: true
    })
    

    return userWithoutPassword
}

export default createUserService