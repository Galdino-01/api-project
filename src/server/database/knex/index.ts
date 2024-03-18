import knex from "knex";
import "dotenv/config";
import { development, production, test } from "./Enviroment";

const getEnviroment = () => {
    switch (process.env.NODE_ENV) {
    case "development":
        return development;
    case "test":
        return test;
    case "production":
        return production;
    default:
        return development;
    }
};

export const Knex = knex(getEnviroment());
