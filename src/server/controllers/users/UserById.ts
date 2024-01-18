import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { UsersProviders } from "../../database/providers/users";

interface IParamsProps {
    id?: number;
}

export const UserByIdValidation = validation((getSchema) => ({
    query: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().required().moreThan(0)
    }))
}));

export const UserById = async (req: Request<IParamsProps>, res: Response) => {
    
    if(!req.query.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        })
    }

    const id = Number(req.query.id);
    const result = await UsersProviders.UserById(id);
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    };

    return res.status(StatusCodes.CREATED).json(result)
}
