import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService, Logger } from "../services";

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {

    const address = req.socket.remoteAddress || req.headers["x-forwarded-for"] || null;
    const route = req.route.path;
    const { authorization } = req.headers;
    Logger.info("New request - Token validation", { route: route, address: address });

    if (!authorization) {
        Logger.error("Token not provided", { route: route, address: address });
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Token not provided"
        });
    }
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
        Logger.error("Token malformatted", { route: route, address: address });
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Token malformatted"
        });
    }

    const jwtData = JWTService.verify(token);

    if (jwtData === "JWT_SECRET_NOT_FOUND") {
        Logger.error("JWT secret not found", { route: route, address: address });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while authenticating token"
        });
    } else if (jwtData === "INVALID_TOKEN") {
        Logger.error("Invalid token", { route: route, address: address });
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid token"
        });
    }
    req.headers.TokenJWT = jwtData.token.toString();

    return next();
};
