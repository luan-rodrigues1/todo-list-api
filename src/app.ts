import "express-async-errors"
import "reflect-metadata"
import express from "express";
import { Request, Response } from "express";
import userRoutes from "./routers/users.routes";
import { errorHandler } from "./errors"
import sessionRoutes from "./routers/session.routes";
import taskRoutes from "./routers/tasks.routes";

const app = express()
app.use(express.json())

app.use("/users", userRoutes)
app.use("/login", sessionRoutes)
app.use("/tasks", taskRoutes)

app.use(errorHandler)

export default app