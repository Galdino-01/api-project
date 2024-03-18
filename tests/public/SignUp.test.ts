import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Public - SignUp", () => {

    it("should return 200, OK", async () => {

        const response = await testServer.post("/sign-up").send({
            login: "test-jest",
            password: "test-jest",
            name: "test-jest",
            email: "test@test.com.br"
        });

        expect(response.status).toBe(StatusCodes.CREATED);
        expect(response.body).toEqual("User created!");
    });


    it("should return error, login already exists", async () => {

        const response = await testServer.post("/sign-up").send({
            login: "test-jest",
            password: "test-jest",
            name: "test-jest",
            email: "test@test.com.br"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors.default");
    });


    it("should return error, login length lower than 3 caracters ", async () => {

        const response = await testServer.post("/sign-up").send({
            login: "ts",
            password: "test-jest",
            name: "test-jest",
            email: "test@test"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors.body.login");
    });

    it("should return error, password length lower than 6 caracters ", async () => {

        const response = await testServer.post("/sign-up").send({
            login: "test-jest",
            password: "ts",
            name: "test-jest",
            email: "test@test"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors.body.password");
    });

    it("should return error, login is required ", async () => {

        const response = await testServer.post("/sign-up").send({
            password: "test-jest",
            name: "test-jest",
            email: "test@test"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors.body.login");
    });

    it("should return error, password is required ", async () => {

        const response = await testServer.post("/sign-up").send({
            login: "test-jest",
            name: "test-jest",
            email: "test@test"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors.body.password");
    });

    it("should return error, email is required ", async () => {

        const response = await testServer.post("/sign-up").send({
            login: "test-jest",
            password: "test-jest",
            name: "test-jest",
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors.body.email");
    });

    it("should return error, name is required ", async () => {

        const response = await testServer.post("/sign-up").send({
            login: "test-jest",
            password: "test-jest",
            email: "test@test"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors.body.name");
    });

});
