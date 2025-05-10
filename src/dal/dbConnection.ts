import { Db, MongoClient } from "mongodb";
import { EnvConfig } from "../config/environment";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { UnitsSeeder } from "./dataSeeders/unitsSeeder";
import { WodsSeeder } from "./dataSeeders/wodsSeeder";

@injectable()
export class DbClient {
    constructor(@inject(TYPES.EnvConfig) private envConfig: EnvConfig) {
    }

    public db!: Db;

    async initConnection() {
        var client = new MongoClient(this.envConfig.dbConnectionString);
        await client.connect();

        this.db = client.db(this.envConfig.dbName);

        if(this.envConfig.nodeEnv == 'local') {
            var seeders = [
                new UnitsSeeder(this.envConfig),
                new WodsSeeder(this.envConfig)
            ]
            for(var seeder of seeders)
                await seeder.Seed(this.db);
        }
    }
}