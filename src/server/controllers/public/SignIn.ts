import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { PublicProviders } from "../../database/providers";
import { JWTService, Logger, PasswordCrypto } from "../../shared/services";

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

    const address = req.socket.remoteAddress || req.headers["x-forwarded-for"] || null;
    const { login, password } = req.body;
    Logger.info("New SignIn request", { address: address, route: "/sign-in", status: "processing", data: { login: login } });

    const verifyLogin = await PublicProviders.SignIn(login);
    if (verifyLogin instanceof Error) {
        Logger.error(`${verifyLogin.message}`, { address: address, route: "/sign-in", status: "error", data: { login: login } });
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: verifyLogin.message
        });
    }
    Logger.info("User found in Database", { address: address, route: "/sign-in", status: "success", data: { login: login } });

    const passwordMatch = await PasswordCrypto.verifyPassword(password, verifyLogin.user_pass);

    if (!passwordMatch) {
        Logger.error("Password incorrect", { address: address, route: "/sign-in", status: "error", data: { login: login } });
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Login or Password incorrect"
        });
    }
    Logger.info("Password correct", { address: address, route: "/sign-in", status: "success", data: { login: login } });

    const token = await JWTService.sign({ token: req.body.login });

    Logger.info("Token generated", { address: address, route: "/sign-in", status: "success", data: { login: login } });
    return res.status(StatusCodes.OK).json({
        token: `Bearer ${token}`,
    });
};
