import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"

const listAllUsersService = async () => {
    const userRepo = AppDataSource.getRepository(User)

    const listUsers = await userRepo.find({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            isActive: true
        },
        withDeleted: true
    })

    return listUsers
}

export default listAllUsersService