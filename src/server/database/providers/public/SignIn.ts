import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ISignIn } from "../../models";


export const SignIn = async (signIn: Omit<ISignIn, 'id'>) => {

    const { login, password } = signIn;
    try {
        const resultUsers = await Knex(ETableNames.users)
        .select('*')
        .where('user_login', '=', login)
        .first();

        if(resultUsers) return resultUsers;

        return new Error ('Login or Password incorrect');
        
    } catch (error) {
        console.log(error);
        return new Error('Error in SignIn');
    }
}
