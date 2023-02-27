import { Request, Response } from "express" 
import { SimpleConsoleLogger } from "typeorm"
import { IUserLogin } from "../interfaces/users"
import createSessionService from "../services/session/createSession.service"

const createSessionController = async (req: Request, res: Response) =>{
    
    const sessionData: IUserLogin = req.body
    const token = await createSessionService(sessionData)
    
    return res.status(200).json({token})
}

export default createSessionController