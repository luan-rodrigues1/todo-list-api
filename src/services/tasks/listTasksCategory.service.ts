import AppDataSource from "../../data-source"
import { Task } from "../../entities/task.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"

const listTasksService = async (queryFilter: any, userId: string) => {
    const taskRepo = AppDataSource.getRepository(Task)

    let query = taskRepo.createQueryBuilder('contact')
    .where('contact.user.id = :userIdLogged', { userIdLogged: userId })

    if (queryFilter.category && queryFilter.name) {
        const searchParamCategory = queryFilter.category.toLowerCase().replace(/\s+/g, '')
        const searchParamName = queryFilter.name.toLowerCase().replace(/\s+/g, '')

        query = query.andWhere(
            `LOWER(REPLACE(contact.category, ' ','')) = :searchParamCategory`,
            { searchParamCategory }
        )
        .andWhere(
            `LOWER(REPLACE(contact.name, ' ','')) LIKE :searchParamName`,
            { searchParamName: `%${searchParamName}%` }
        )
    } else if (queryFilter.category) {
        const searchParam = queryFilter.category.toLowerCase().replace(/\s+/g, '')

        query = query.andWhere(
            `LOWER(REPLACE(contact.category, ' ','')) = :searchParam`,
            { searchParam }
        )
    } else if (queryFilter.name) {
        const searchParam = queryFilter.name.toLowerCase().replace(/\s+/g, '')

        query = query.andWhere(
            `LOWER(REPLACE(contact.name, ' ','')) LIKE :searchParam`,
            { searchParam: `%${searchParam}%` }
        )
    }

    const listContact = await query.getMany()

    return listContact
    
}

export default listTasksService