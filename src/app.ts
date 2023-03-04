import "express-async-errors"
import "reflect-metadata"
import express from "express";
import { Request, Response } from "express";
import userRoutes from "./routers/users.routes";
import { errorHandler } from "./errors"
import sessionRoutes from "./routers/session.routes";
import taskRoutes from "./routers/tasks.routes";
import cors from "cors"

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors())
    next()
})
app.use("/files", express.static("src/uploads"))
app.use("/users", userRoutes)
app.use("/login", sessionRoutes)
app.use("/tasks", taskRoutes)

app.use(errorHandler)

export default app