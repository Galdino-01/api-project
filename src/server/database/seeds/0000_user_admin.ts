import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import { v4 as uuidv4 } from 'uuid';
import { PasswordCrypto } from "../../shared/services";

export const seed = async (knex: Knex) => {

    const [{ count }] = await knex(ETableNames.users).count<[{ count: number }]>('* as count');
    if (!Number.isInteger(count) || Number(count)> 0 ) return;

    const statesToInsert = {
        user_id: uuidv4(),
        user_login: (process.env.ADMIN_LOGIN)?.toUpperCase() || 'ADMIN',
        user_pass: await PasswordCrypto.hashPassword(process.env.ADMIN_PASS || 'ADMIN'),
        user_email: (process.env.ADMIN_EMAIL)?.toUpperCase() || 'ADMIN@ADMIN',
        user_name: (process.env.ADMIN_NAME)?.toUpperCase() || 'ADMIN',
        user_situation: 1
    };

    await knex(ETableNames.users).insert(statesToInsert);
};
