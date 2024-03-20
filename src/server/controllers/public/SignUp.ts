import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { Request, Response } from "express";
import { PublicProviders } from "../../database/providers";
import { Logger } from "../../shared/services";

interface IBodyProps {
    login: string;
    password: string;
    email: string;
    name: string;
}

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const SignUpValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        login: yup.string().required().min(3),
        password: yup.string().required().min(6),
        email: yup.string().required().matches(EMAIL_REGEX, "Insert a valid email"),
        name: yup.string().required(),
    }))
}));

export const SignUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const address = req.socket.remoteAddress || req.headers["x-forwarded-for"] || null;
    const { login, password, email, name } = req.body;

    Logger.info("New SignUp request", { address: address, route: "/sign-up", status: "processing", data: { login, email, name } });

    const result = await PublicProviders.SignUp({
        login,
        password,
        email,
        name
    });

    if (result instanceof Error) {

        Logger.error(`${result.message}`, { address: address, route: "/sign-up", status: "error", data: { login, email, name } });
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: result.message
        });
    }

    Logger.info("User created in Database", { address: address, route: "/sign-up", status: "success", data: { login, email, name } });
    return res.status(StatusCodes.CREATED).json("User created!");
};
