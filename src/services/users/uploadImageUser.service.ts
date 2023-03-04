import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors"

const uploadImageUserService = async (image: Express.Multer.File | undefined, userId: string) => {
    console.log("checgou aqui")
    console.log(image)
    if(!image) {
        throw new AppError("Invalid file type or non-existent file", 400)
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
    
    return updateUser

}

export default uploadImageUserService