import { IInsertNewUser } from "../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { v4 as uuid } from 'uuid';
import { PasswordCrypto } from "../../../shared/services";

export const InsertNewUser = async (insertNewUser: Omit<IInsertNewUser, 'id'>): Promise<number | Error> => {

    const { newUserName, newUserRegister } = insertNewUser;
    const userId = uuid();
    const userPass = await PasswordCrypto.hashPassword(newUserRegister);
    const userStatus = uuid();

    try {

        const omniUsersInsert = {
            "user_id": userId,
            "user_name": newUserName.toUpperCase(),
            "user_register": newUserRegister,
            "user_pass": userPass,
            "user_sit": 1,
            "user_status": userStatus
        } as Partial<IInsertNewUser>

        const [resultOmniUsers] = await Knex(ETableNames.omni_users).insert(omniUsersInsert).returning('id');

        const omniUsersSupervisorInsert = {
            "user_id": 'teste',
            "user_supervisor": 'teste'
        } as Partial<IInsertNewUser>

        // const [resultUsersSupervisor] = await Knex(ETableNames.users_supervisor).insert(omniUsersSupervisorInsert).returning('id');

        if (typeof resultOmniUsers === 'object') {
            return resultOmniUsers.id
        } else if (typeof resultOmniUsers === 'number') {
            return resultOmniUsers
        }

        return new Error('Error ao inserir novo usuário!')
    } catch (error) {
        console.log(error)
        const { message } = error as Error

        if (message.includes('UNIQUE constraint failed') || message.includes('Duplicate entry')) {
            return new Error('Usuário já cadastrado!')
        }

        return Error('Error ao inserir novo usuário!')
    };
};
