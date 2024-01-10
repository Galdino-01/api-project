import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { ISignIn } from '../../database/models';

// Interfaces
interface IBodyProps extends Omit<(ISignIn), 'id'> {
    user_login: string;
    user_password: string;
}

export const SignInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        user_login: yup.string().required(),
        user_password: yup.string().required(),
    }))
}));

export const SignIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    return res.status(StatusCodes.OK).json({
        message: 'OK',
    });

};
