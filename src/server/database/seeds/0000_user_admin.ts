import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export const seed = async (knex: Knex) => {

    const [{ count }] = await knex(ETableNames.users).count<[{ count: number }]>('* as count');
    if (!Number.isInteger(count) || Number(count)> 0 ) return;

    const statesToInsert = {
        user_id: 'admin',
        login: 'admin',
        password: 'admin',
        email: 'admin@admin',
        name: 'admin',
        user_situation: 1
    };
    await knex(ETableNames.users).insert(statesToInsert);
};
