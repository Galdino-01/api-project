import { Knex } from 'knex';
import path from 'path';


export const development: Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
    },
    migrations : {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
    },
    pool: {
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON');
            done();
        }
    }

};

export const test: Knex.Config = {
    ...development,
    connection: ':memory:',
};

export const production: Knex.Config = {
    client: 'mysql2',
    migrations : {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
    },
    connection: {
        host : process.env.DB_HOST_ENV,
        port : Number(process.env.DB_PORT_ENV),
        user : process.env.DB_USER_ENV,
        password : process.env.DB_PASS_ENV,
        database : process.env.DB_NAME_ENV
    },
};
