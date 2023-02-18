import express from "express";
import { Request, Response } from "express";

const app = express()

app.get("/hello", (req: Request, res: Response) => {
    return res.json({
        message: "Hello ts"
    })
})

export default app