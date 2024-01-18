import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";


export const SignIn = async (login: String) => {

    try {
        const resultUsers = await Knex(ETableNames.users)
        .select('*')
        .where('user_login', '=', login.toUpperCase())
        .first();

        if(resultUsers) return resultUsers;

        return new Error ('Login or Password incorrect');
        
    } catch (error) {
        console.log(error);
        return new Error('Error in SignIn');
    }
}
