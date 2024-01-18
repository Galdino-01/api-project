import { IUsuario } from "../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { v4 as uuid } from 'uuid';
import { PasswordCrypto } from "../../../shared/services";

export const SignUp = async (signUp: Omit<IUsuario, 'id'>): Promise<number | Error> => {

    const userId = uuid();
    const userName = signUp.name;
    const userLogin = signUp.login;
    const userEmail = signUp.email;
    const userPass = await PasswordCrypto.hashPassword(signUp.password);

    try {

        const User = {
            "user_id": userId,
            "user_name": userName.toUpperCase(),
            "user_login": userLogin.toUpperCase(),
            "user_email": userEmail.toUpperCase(),
            "user_pass": userPass,
            "user_situation": 1,
        }

        const [resultUsers] = await Knex(ETableNames.users).insert(User).returning('id');

        if (typeof resultUsers === 'object') {
            return resultUsers.id
        } else if (typeof resultUsers === 'number') {
            return resultUsers
        }

        return new Error('Error to insert new user!');

    } catch (error) {
        const { message } = error as Error;

        if (message.includes('UNIQUE constraint failed') || message.includes('Duplicate entry')) {
            return new Error('User already exists!')
        }

        return new Error('Error in SignUp');
    };
};
