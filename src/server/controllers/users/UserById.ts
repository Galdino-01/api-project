import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { UsersProviders } from "../../database/providers/users";
import { Logger } from "../../shared/services";

interface IParamsProps {
    id?: number;
}

export const UserByIdValidation = validation((getSchema) => ({
    query: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().required().moreThan(0)
    }))
}));

export const UserById = async (req: Request<IParamsProps>, res: Response) => {
    
    const address = req.socket.remoteAddress || req.headers['x-forwarded-for'] || null;
    const id = Number(req.query.id);
    Logger.info(`New UserById request`, { route: '/user-by-id', status: 'processing', params: { id: id, address: address }});
    
    const result = await UsersProviders.UserById(id);
    if(result instanceof Error){
        Logger.error(`${result.message}`, { route: '/user-by-id', status: 'error', params: { id: id, address: address }});
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    };

    Logger.info(`Success return from UserById`, { route: '/user-by-id', status: 'success', params: { id: id, address: address }});
    return res.status(StatusCodes.CREATED).json(result)
}
