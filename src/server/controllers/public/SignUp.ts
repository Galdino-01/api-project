import { StatusCodes } from "http-status-codes";
import { ISignUp } from "../../database/models";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup';
import { Request, Response } from "express";
import { PublicProviders } from "../../database/providers";

interface IBodyProps extends Omit<(ISignUp), 'id'> {
    login: string;
    password: string;
    email: string;
    name: string;
}

export const SignUpValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        login: yup.string().required().min(3),
        password: yup.string().required().min(6),
        email: yup.string().required(),
        name: yup.string().required(),
    }))
}));

export const SignUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const { login, password, email, name } = req.body;

    // Insert new user
    const result = await PublicProviders.SignUp({
        login,
        password,
        email,
        name
    });

    if (result instanceof Error) {

        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json('User created!')
};
