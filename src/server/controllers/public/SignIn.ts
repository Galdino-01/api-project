import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { ISignIn } from '../../database/models';
import { PublicProviders } from '../../database/providers';
import { JWTService, PasswordCrypto } from '../../shared/services';

// Interfaces
interface IBodyProps extends Omit<(ISignIn), 'id'> {
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

    const verifyLogin = await PublicProviders.SignIn(req.body);

    if (verifyLogin instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: verifyLogin.message
            }
        });
    }

    const passwordMatch = await PasswordCrypto.verifyPassword(req.body.password, verifyLogin.user_pass);

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
