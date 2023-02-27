import { Request, Response, NextFunction } from "express"
import { AnySchema } from "yup"

const ensureDetalsValidMiddleware = (schema: AnySchema) =>  async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const validate = await schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })

        req.body = validate
        
        return next()
    } catch (error: any) {
        return res.status(400).json({
            message: error.errors 
        })
    }

}

export default ensureDetalsValidMiddleware