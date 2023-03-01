import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUserLoggedResponse } from "../../interfaces/users"
import { LoggedWithoutPasswordSchema } from "../../schemas/user.schemas"

const loggedUserInfoService = async (userId: string): Promise<IUserLoggedResponse> => {
    const userRepo = AppDataSource.getRepository(User)

    const searchUser =  await userRepo.findOne({
        where: {
            id: userId
        },
        relations: {
            tasks: true
        },
        withDeleted: true
    })

    const userWithoutPassword = await LoggedWithoutPasswordSchema.validate(searchUser, {
        stripUnknown: true
    })

    return userWithoutPassword
}

export default loggedUserInfoService