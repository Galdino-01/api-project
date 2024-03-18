import { ETableNames } from "../../ETableNames";
import { IUsuario } from "../../models";
import { Knex } from "../../knex";
import { Logger } from "../../../shared/services";

export const UserById = async (id: number): Promise<IUsuario | Error> => {

    try {
        const resultUsers = await Knex(ETableNames.users)
            .select("*")
            .where("id", "=", id)
            .first();

        if (resultUsers) return resultUsers;

        return new Error("User not found in database");

    } catch (error) {
        Logger.info(error);
        return new Error("Error in UserById");
    }
};
