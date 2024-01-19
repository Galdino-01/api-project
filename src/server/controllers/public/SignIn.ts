import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { PublicProviders } from '../../database/providers';
import { JWTService, Logger, PasswordCrypto } from '../../shared/services';

// Interfaces
interface IBodyProps {
    login: string;
    password: string;
}

export const SignInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        login: yup.string().required(),
        password: yup.string().required(),
    }))
}));

export const SignIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const { login, password } = req.body;

    const verifyLogin = await PublicProviders.SignIn(login);

    if (verifyLogin instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: verifyLogin.message
            }
        });
    }

    const passwordMatch = await PasswordCrypto.verifyPassword(password, verifyLogin.user_pass);

    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Login or Password incorrect'
            }
        });
    }

    const token = await JWTService.sign({ token: req.body.login });

    return res.status(StatusCodes.OK).json({
        token: `Bearer ${token}`,
    });

};
