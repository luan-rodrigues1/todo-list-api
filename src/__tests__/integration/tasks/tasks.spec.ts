import { DataSource, Repository } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { mockedUser, mockedUser2, mockedUserLogin1, mockedUserLogin2, mockedTask1, mockedTask2, mockedTaskUpdated, mockedTaskInvalidPriority } from '../../mocks'
import { Task } from "../../../entities/task.entity"
import { User } from "../../../entities/user.entity"
import { response } from "express"

describe("/tasks", () => {
    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => console.error(err))
    })

    beforeEach(async () => {
        const taskRepo: Repository<Task> = AppDataSource.getRepository(Task);
        const tasks = await taskRepo.find();
        await taskRepo.remove(tasks);

        const userRepo: Repository<User> = AppDataSource.getRepository(User);
        const users = await userRepo.find();
        await userRepo.remove(users);
    });

    afterAll(async () => {
        await connection.destroy()
    })

    test("POST /tasks - Should be able to create task", async () => {
        await request(app).post("/users").send(mockedUser)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)
        const response = await request(app).post("/tasks").set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedTask1)

        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('priority')
        expect(response.body).toHaveProperty('description')
        expect(response.body).toHaveProperty('category')
        expect(response.body).toHaveProperty('completed')
        expect(response.body).toHaveProperty('createdAt')
        expect(response.status).toBe(201)

    })

    test("POST /tasks - Should not be able to create a task without authentication", async () => {
        const response = await request(app).post("/tasks").send(mockedTask1)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("POST /tasks - Should not be able to create a task with invalid priority", async () => {
        await request(app).post("/users").send(mockedUser)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)
        const response = await request(app).post("/tasks").set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedTaskInvalidPriority)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /tasks - Should be able to list tasks by category", async () => {
        await request(app).post("/users").send(mockedUser)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)
        const createTask1 = await request(app).post("/tasks").set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedTask1)
        await request(app).post("/tasks").set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedTask2)
        const response = await request(app).get(`/tasks/${createTask1.body.category}`).set('Authorization', `Bearer ${userLogged1.body.token}`)
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
    })

    test("GET /tasks - Should not be able to list tasks without authentication", async () => {
        const response = await request(app).get(`/tasks/test`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /tasks - Should not be able to list tasks with non-existent category", async () => {
        await request(app).post("/users").send(mockedUser)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)
        await request(app).post("/tasks").set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedTask1)
        const response = await request(app).get(`/tasks/test`).set('Authorization', `Bearer ${userLogged1.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("PATCH /tasks - Should not be able to update task without authentication", async () => {
        const response = await request(app).patch(`/tasks/1`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /tasks - Should not be able to update a task with invalid priority", async () => {
        await request(app).post("/users").send(mockedUser)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)
        const createTask1 = await request(app).post("/tasks").set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedTask1)
        const response = await request(app).patch(`/tasks/${createTask1.body.id}`).set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedTaskInvalidPriority)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /tasks - Should not be possible for a user to update a task of another", async () => {
        await request(app).post("/users").send(mockedUser)
        await request(app).post("/users").send(mockedUser2)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)
        const userLogged2 = await request(app).post("/login").send(mockedUserLogin2)
        const createTask1 = await request(app).post("/tasks").set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedTask1)
        const response = await request(app).patch(`/tasks/${createTask1.body.id}`).set('Authorization', `Bearer ${userLogged2.body.token}`).send(mockedTaskUpdated)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /tasks - Should be able to update a task", async () => {
        await request(app).post("/users").send(mockedUser)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)
        const createTask1 = await request(app).post("/tasks").set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedTask1)
        const response = await request(app).patch(`/tasks/${createTask1.body.id}`).set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedTaskUpdated)
        
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('priority')
        expect(response.body).toHaveProperty('description')
        expect(response.body).toHaveProperty('category')
        expect(response.body).toHaveProperty('completed')
        expect(response.body).toHaveProperty('createdAt')
        expect(response.status).toBe(200)
    })

    test("DELETE /tasks - Should not be able to delete user without authentication", async () => {
        const response = await request(app).delete(`/tasks/1`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("DELETE /tasks - Should not be possible for a user to delete a task of another", async () => {
        await request(app).post("/users").send(mockedUser)
        await request(app).post("/users").send(mockedUser2)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)
        const userLogged2 = await request(app).post("/login").send(mockedUserLogin2)
        const createTask1 = await request(app).post("/tasks").set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedTask1)
        const response = await request(app).delete(`/tasks/${createTask1.body.id}`).set('Authorization', `Bearer ${userLogged2.body.token}`).send(mockedTaskUpdated)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("DELETE /tasks - Should be able to delete a task", async () => {
        await request(app).post("/users").send(mockedUser)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)
        const createTask1 = await request(app).post("/tasks").set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedTask1)
        const response = await request(app).delete(`/tasks/${createTask1.body.id}`).set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedTaskUpdated)
        
        expect(response.status).toBe(204)
    })

})