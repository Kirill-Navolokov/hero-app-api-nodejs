import { Db, MongoClient } from "mongodb";
import { EnvConfig } from "../config/environment";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class DbClient {
    constructor(@inject(TYPES.EnvConfig) private envConfig: EnvConfig) {
    }

    public db!: Db;

    async initConnection() {
        var client = new MongoClient(this.envConfig.dbConnectionString);
        await client.connect();

        this.db = client.db(this.envConfig.dbName);
    }
}