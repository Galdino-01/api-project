import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import { Logger } from "../../shared/services";

export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.users, table => {
        table.increments('id').primary();
        table.string('user_id', 250).notNullable();
        table.string('user_name', 250).notNullable();
        table.string('user_login', 50).notNullable().unique();
        table.string('user_email', 300).notNullable();
        table.string('user_pass', 300).notNullable();
        table.integer('user_situation', 11).notNullable();

        table.comment('Tabela de usuários do sistema');
    })
        .then(() => Logger.info(`Table ${ETableNames.users} created!`, { route: 'database', status: 'success', params: {  }}));
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.users)
        .then(() => Logger.info(`Table ${ETableNames.users} dropped!`, { route: 'database', status: 'success', params: {  }}));
}
