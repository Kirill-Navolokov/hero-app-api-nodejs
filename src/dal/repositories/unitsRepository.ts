import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { EnvConfig } from "../../config/environment";
import { UnitEntity } from "../entities/unitEntity";
import { ObjectId } from "mongodb";

@injectable()
export class UnitsRepository {
    constructor(
        @inject(TYPES.DbClient) private dbClient: DbClient,
        @inject(TYPES.EnvConfig) private envConfig: EnvConfig) {
    }

    public async get() : Promise<UnitEntity[]> {
        var collection = this.dbClient.db.collection<UnitEntity>(this.envConfig.dbUnitsColection);
        var units = (await collection.find({}).toArray())
    
        return units;
    }
    
    public getById(id: string): Promise<UnitEntity | null> {
        var collection = this.dbClient.db.collection<UnitEntity>(this.envConfig.dbUnitsColection);

        return collection.findOne({_id: new ObjectId(id)});
    }
    
    public delete(id: string): Promise<any> {
        var collection = this.dbClient.db.collection<UnitEntity>(this.envConfig.dbUnitsColection);

        return collection.deleteOne({_id: new ObjectId(id)})
    }
}