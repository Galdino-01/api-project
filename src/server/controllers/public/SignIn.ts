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
    Logger.info(`New SignIn request`, { route: '/sign-in', status: 'processing', params: { login: login }});

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
        Logger.error(`Password incorrect`, { route: '/sign-in', status: 'error', params: { login: login }});
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Login or Password incorrect'
            }
        });
    }
    Logger.info(`Password correct`, { route: '/sign-in', status: 'success', params: { login: login }})

    const token = await JWTService.sign({ token: req.body.login });

    Logger.info(`Token generated`, { route: '/sign-in', status: 'success', params: { login: login }});
    return res.status(StatusCodes.OK).json({
        token: `Bearer ${token}`,
    });
};
