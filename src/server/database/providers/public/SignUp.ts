import { ISignUp } from "../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { v4 as uuid } from 'uuid';
import { PasswordCrypto } from "../../../shared/services";

export const SignUp = async (insertNewUser: Omit<ISignUp, 'id'>): Promise<number | Error> => {

    const userId = uuid();
    const userName = insertNewUser.name;
    const userLogin = insertNewUser.login;
    const userEmail = insertNewUser.email;
    const userPass = await PasswordCrypto.hashPassword(insertNewUser.password);

    try {

        const omniUsersInsert = {
            "user_id": userId,
            "user_name": userName.toUpperCase(),
            "user_login": userLogin.toUpperCase(),
            "user_email": userEmail.toUpperCase(),
            "user_pass": userPass,
            "user_situation": 1,
        } as Partial<ISignUp>

        const [resultOmniUsers] = await Knex(ETableNames.users).insert(omniUsersInsert).returning('id');

        if (typeof resultOmniUsers === 'object') {
            return resultOmniUsers.id
        } else if (typeof resultOmniUsers === 'number') {
            return resultOmniUsers
        }

        return new Error('Error ao inserir novo usuário!');

    } catch (error) {
        const { message } = error as Error;

        if (message.includes('UNIQUE constraint failed') || message.includes('Duplicate entry')) {
            return new Error('Usuário já cadastrado!')
        }

        return new Error('Error ao inserir novo usuário!');
    };
};
