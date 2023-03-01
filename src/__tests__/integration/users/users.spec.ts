import { DataSource, Repository } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { mockedUser, mockedUser2, mockedUserLogin1, mockedUserUpdate, mockedUseUpdateWithInvalidInfo } from '../../mocks'
import { User } from "../../../entities/user.entity"

describe("/users", () => {
    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => console.error(err))
    })

    beforeEach(async () => {
        const userRepo: Repository<User> = AppDataSource.getRepository(User);
        const users = await userRepo.find();
        await userRepo.remove(users);
    });

    afterAll(async () => {
        await connection.destroy()
    })

    test("POST /users - Should be able to create user", async () => {
        const response = await request(app).post("/users").send(mockedUser)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("isActive")
        expect(response.status).toBe(201)
    })

    test('POST /users - Should not be able to create a user that already exists', async () => {
        await request(app).post("/users").send(mockedUser)
        const response = await request(app).post("/users").send(mockedUser)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)   
    })

    test('GET /users - Should be able to show logged in user information', async () => {
        await request(app).post("/users").send(mockedUser)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)
        const response = await request(app).get("/users").set('Authorization', `Bearer ${userLogged1.body.token}`)

        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('email')
        expect(response.body).toHaveProperty('createdAt')
        expect(response.body).toHaveProperty('updatedAt')
        expect(response.body).toHaveProperty('isActive')
        expect(response.body).toHaveProperty('tasks')
        expect(response.status).toBe(200)
    })

    test('GET /users - Should not be able to show logged in user information without authentication', async () => {
        const response = await request(app).get("/users")

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /users - Should not be able to update user without authentication", async () => {
        const response = await request(app).patch(`/users`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /users - Should not be able to update email to another user's email", async () => {
        await request(app).post("/users").send(mockedUser)
        await request(app).post("/users").send(mockedUser2)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)

        const response = await request(app).patch(`/users`).set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedUserUpdate)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
    })

    test("PATCH /users - should not be able to update certain of the information", async () => {
        await request(app).post("/users").send(mockedUser)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)

        const response = await request(app).patch(`/users`).set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedUseUpdateWithInvalidInfo)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /users - Should be able to update user", async () => {
        await request(app).post("/users").send(mockedUser)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)
        const response = await request(app).patch(`/users`).set('Authorization', `Bearer ${userLogged1.body.token}`).send(mockedUser2)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("isActive")
        expect(response.status).toBe(200)
    })

    test("DELETE /users  - Should not be able to delete user without authentication", async () => {
        const deletedUser1 = await request(app).delete(`/users`)
        
        expect(deletedUser1.body).toHaveProperty("message")
        expect(deletedUser1.status).toBe(401)
    })

    test("DELETE /users  - Must be able to soft delete user", async () => {
        await request(app).post("/users").send(mockedUser)
        const userLogged1 = await request(app).post("/login").send(mockedUserLogin1)
        const deletedUser1 = await request(app).delete(`/users`).set('Authorization', `Bearer ${userLogged1.body.token}`)

        expect(deletedUser1.status).toBe(204)
    })

})