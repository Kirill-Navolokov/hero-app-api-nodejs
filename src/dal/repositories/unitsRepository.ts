import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { EnvConfig } from "../../config/environment";
import { UnitEntity } from "../entities/unitEntity";
import { ObjectId, ReturnDocument } from "mongodb";
import { UnitUpdateRequest } from "../../apiRequests/unitUpdateRequest";
import { BaseRepository } from "./baseRepository";

@injectable()
export class UnitsRepository extends BaseRepository<UnitEntity> {
    constructor(
        @inject(TYPES.DbClient) dbClient: DbClient,
        @inject(TYPES.EnvConfig) private envConfig: EnvConfig) {
            super(dbClient);
    }

    protected get collectionName(): string {
        return this.envConfig.dbUnitsCollection;
    }

    public async get() : Promise<UnitEntity[]> {
        var collection = this.getCollection();
        var units = await collection.find({}).toArray();
    
        return units;
    }
    
    public getById(id: string): Promise<UnitEntity | null> {
        var collection = this.getCollection();

        return collection.findOne({_id: new ObjectId(id)});
    }
    
    public delete(id: string): Promise<any> {
        var collection = this.getCollection();

        return collection.deleteOne({_id: new ObjectId(id)})
    }

    public async create(newUnit: UnitEntity): Promise<UnitEntity> {
        var collection = this.getCollection();
        var result =  await collection.insertOne(newUnit, {forceServerObjectId: true});
        newUnit._id = result.insertedId;

        return newUnit;
    }

    public async update(id: string, unitUpdate: UnitUpdateRequest) : Promise<UnitEntity | null> {
        var collection = this.getCollection();
        var updateQuery = { $set: {
            name: unitUpdate.name,
            description: unitUpdate.description,
            foundationDate: unitUpdate.foundationDate
        }};

        return collection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            updateQuery,
            {returnDocument: ReturnDocument.AFTER});
    }
}