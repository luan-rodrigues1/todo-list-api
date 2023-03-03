import multer from "multer"
import path from "path"
import { AppError } from "../errors"

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log(file)
        callback(null, path.resolve(__dirname ,'..', 'uploads'))
    },
    filename: (req, file, callback) => {
        const time = new Date().getTime()

        callback(null, `${time}_${file.originalname}`)
    },
    
})

const fileFilter = (req: any, file: any, callback: any) => {

    const allowedMimes = [
        "image/jpeg",
        "image/pjpeg",
        "image/png"
    ]

    if (allowedMimes.includes(file.mimetype)) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}


export  {storage, fileFilter}