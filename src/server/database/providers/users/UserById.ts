import { ETableNames } from "../../ETableNames";
import { IUsuario } from "../../models";
import { Knex } from "../../knex";

export const UserById = async (id: number): Promise<IUsuario | Error> => {

    try {
        const resultUsers = await Knex(ETableNames.users)
        .select('*')
        .where('id', '=', id)
        .first();

        if(resultUsers) return resultUsers;

        return new Error ('User not found in database');
        
    } catch (error) {
        console.log(error);
        return new Error('Error in UserById');
    }
}
