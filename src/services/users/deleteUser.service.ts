import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const deleteUserService = async (userId: string) => {
    const userRepo = AppDataSource.getRepository(User)
    const searchUser =  await userRepo.findOneBy({ id: userId });


    await userRepo.softRemove(searchUser!)
    await userRepo.save({...searchUser, isActive: false})
}

export default deleteUserService