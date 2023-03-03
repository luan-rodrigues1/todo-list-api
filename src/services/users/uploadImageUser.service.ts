import { AppError } from "../../errors"

const uploadImageUserService = async (image: Express.Multer.File | undefined) => {
    if(!image) {
        throw new AppError("Invalid file type", 400)
    }
}

export default uploadImageUserService