import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Public - SignIn', () => {

    it('should return success', async () => {

        const response = await testServer.post('/sign-in').send({
            login: 'ADMIN',
            password: 'ADMIN',
        });

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toHaveProperty('token');
    });
});
