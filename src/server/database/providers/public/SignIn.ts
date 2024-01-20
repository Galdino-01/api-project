import { Logger } from "../../../shared/services";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const SignIn = async (login: String) => {

    try {
        const resultUsers = await Knex(ETableNames.users)
            .select('*')
            .where('user_login', '=', login.toUpperCase())
            .first();

        if (resultUsers) {
            Logger.info(`User found in Database`, { route: '/sign-in', status: 'success', params: { login: login } });
            return resultUsers
        } 

        Logger.error(`User not found in Database`, { route: '/sign-in', status: 'error', params: { login: login } });
        return new Error('Login or Password incorrect');

    } catch (error) {
        Logger.error(error)
        return new Error('Error in SignIn');
    }
};
