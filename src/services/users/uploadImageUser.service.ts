import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors"
import { userWithoutPasswordSchema } from "../../schemas/user.schemas";

const uploadImageUserService = async (image: Express.Multer.File | undefined, userId: string) => {
    if(!image) {
        throw new AppError("No files have been uploaded", 400)
    } 

    const userRepo = AppDataSource.getRepository(User)    
    const searchUser =  await userRepo.findOneBy({ id: userId });

    const newProfilePicture = {
        profilePicture: image.filename
    }

    const updateUser = userRepo.create({
        ...searchUser,
        ...newProfilePicture
    })

    await userRepo.save(updateUser)

    const updatedUserWithoutPassword = await userWithoutPasswordSchema.validate(updateUser, {
        stripUnknown: true
    })

    return updatedUserWithoutPassword

}

export default uploadImageUserService