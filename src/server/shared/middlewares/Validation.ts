// Express
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

// Yup
import { Schema, ValidationError } from "yup";
import { Logger } from "../services";

type TProperty = "body" | "params" | "query" | "headers" | "cookies";
type TAllSchemas = Record<TProperty, Schema>;
type TGetSchema = <T>(schema: Schema<T>) => Schema<T>;
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;
type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {

    const address = req.socket.remoteAddress || req.headers["x-forwarded-for"] || null;
    const route = req.route.path;

    Logger.info("New request - Data validation", { route: route, address: address });

    const schemas = getAllSchemas(schema => schema);
    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {

        try {
            schema.validateSync(req[key as TProperty], { abortEarly: false });

        } catch (error) {
            // For errors in yup validation
            const yupError = error as ValidationError;
            const errors: Record<string, string> = {};
            yupError.inner.forEach(error => {
                if (error.path === undefined) return;
                errors[error.path] = error.message;
            });

            errorsResult[key] = errors;
        }
    });

    // If there is no errors, go to next middleware
    if (Object.entries(errorsResult).length === 0) {
        Logger.info("Data validated", { route: route, address: address });
        return next();

    } else {
        Logger.error("Data validation failed", { route: route, address: address, data: { errorsResult } });
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Data Validation failed",
            errors: errorsResult
        });
    }
};
