import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IUserResponse, IUserUpdate } from "../../interfaces/users"
import { userWithoutPasswordSchema } from "../../schemas/user.schemas";

const updateUserService = async (payload: IUserUpdate, userId: string): Promise<IUserResponse> => {
    const userRepo = AppDataSource.getRepository(User)    
    const searchUser =  await userRepo.findOneBy({ id: userId });

    if(payload.email){
        const searchEmail =  await userRepo.findOne({
            where: {
                email: payload.email
            },
            withDeleted: true
        });

        if(searchEmail && searchUser?.email !== searchEmail?.email){
            throw new AppError("A user with this email already exists", 409)
        }
    }

    const validateIsActive = Object.keys(payload).includes("isActive")
    const validateId = Object.keys(payload).includes("id")
    const validateCreate= Object.keys(payload).includes("createdAt")
    const validateUpdated= Object.keys(payload).includes("updatedAt")
    const validateDeleted = Object.keys(payload).includes("deletedAt")

    if(validateId || validateIsActive || validateCreate || validateUpdated || validateDeleted){
        throw new AppError("It is not possible to change this data", 400)
    }

    const updateUser = userRepo.create({
        ...searchUser,
        ...payload
    })

    await userRepo.save(updateUser)

    const updatedUserWithoutPassword = await userWithoutPasswordSchema.validate(updateUser, {
        stripUnknown: true
    })

    return updatedUserWithoutPassword

}

export default updateUserService