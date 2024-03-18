import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Users - User By ID", () => {

    let token = "";

    beforeAll(async () => {
        await testServer.post("/sign-up").send({
            login: "test-jest",
            password: "test-jest",
            name: "test-jest",
            email: "test@test.com.br"
        });

        const signInResponse = await testServer.post("/sign-in").send({ login: "test-jest", password: "test-jest" });

        token = signInResponse.body.token;
    });

    it("Should return 200 when user is found", async () => {
        const response = await testServer.get("/user-by-id?id=1").set("Authorization", token);
        expect(response.status).toBe(StatusCodes.OK);
    });

    it("Should return 400 when id is not provided", async () => {
        const response = await testServer.get("/user-by-id").set("Authorization", token);
        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty("errors");
    });

    it("Should return 400 when id is not a number", async () => {
        const response = await testServer.get("/user-by-id?id=abc").set("Authorization", token);
        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty("errors");
    });

    it("Should return 400 when id is less than or equal to 0", async () => {
        const response = await testServer.get("/user-by-id?id=0").set("Authorization", token);
        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty("errors");
    });

    it("Should return 401 when token is not provided", async () => {
        const response = await testServer.get("/user-by-id?id=0");
        expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        expect(response.body).toHaveProperty("errors");
    });

});
