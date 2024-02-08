import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Public - SignIn', () => {

    beforeAll(async () => {
        const response = await testServer.post('/sign-up').send({
            login: 'test-jest',
            password: 'test-jest',
            name: 'test-jest',
            email: 'test@test.com.br'
        });
    });

    it('should return success', async () => {
        const response = await testServer.post('/sign-in').send({
            login: 'test-jest',
            password: 'test-jest',
        });

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toHaveProperty('token');
    });

    it('should return an error if login is incorrect', async () => {
        const response = await testServer.post('/sign-in').send({
            login: 'incorrect-login',
            password: 'test-jest',
        });

        expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        expect(response.body).toHaveProperty('errors');
    });

    it('should return an error if password is incorrect', async () => {
        const response = await testServer.post('/sign-in').send({
            login: 'test-jest',
            password: 'incorrect-password',
        });

        expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        expect(response.body).toHaveProperty('errors');
    });

    it('should return an error if login and password are incorrect', async () => {
        const response = await testServer.post('/sign-in').send({
            login: 'incorrect-login',
            password: 'incorrect-password',
        });

        expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        expect(response.body).toHaveProperty('errors');
    });
});
