import { Request } from "express"
import multer from "multer"
import path from "path"
import { AppError } from "../errors"

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: any) => {
        callback(null, path.resolve(__dirname ,'..', 'uploads'))
    },
    filename: (req: Request, file: Express.Multer.File, callback: any) => {
        const time = new Date().getTime()
        callback(null, `${time}_${file.originalname}`)
    },
    
})

const fileFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {

    const allowedMimes = [
        "image/jpeg",
        "image/pjpeg",
        "image/png"
    ]

    if (allowedMimes.includes(file.mimetype)) {
        callback(null, true)
    } else {
        callback(new AppError("Invalid file type", 400))
    }
}


export  {storage, fileFilter}