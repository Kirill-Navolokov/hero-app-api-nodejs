import { Db, MongoClient } from "mongodb";
import { EnvConfig } from "../config/environment";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { UnitsSeeder } from "./dataSeeders/unitsSeeder";
import { WodsSeeder } from "./dataSeeders/wodsSeeder";
import { UsersSeeder } from "./dataSeeders/usersSeeder";
import { WorkoutsSeeder } from "./dataSeeders/workoutsSeeder";
import { SupportSeeder } from "./dataSeeders/supportSeeder";
import { BusinessCategoriesSeeder } from "./dataSeeders/businessCategoriesSeeder";
import { BusinessesSeeder } from "./dataSeeders/businessesSeeder";

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
                new WodsSeeder(this.envConfig),
                new UsersSeeder(this.envConfig),
                new WorkoutsSeeder(this.envConfig),
                new SupportSeeder(this.envConfig),
                new BusinessCategoriesSeeder(this.envConfig),
                new BusinessesSeeder(this.envConfig)
            ]
            for(var seeder of seeders)
                await seeder.seed(this.db);
        }
    }
}