import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { EnvConfig } from "../../config/environment";
import { ObjectId, ReturnDocument } from "mongodb";
import { WodEntity } from "../entities/wodEntity";
import { BaseRepository } from "./baseRepository";
import { WodCreateRequest } from "../../apiRequests/wodCreateRequest";

@injectable()
export class WodsRepository extends BaseRepository<WodEntity> {
    constructor(
        @inject(TYPES.DbClient) dbClient: DbClient,
        @inject(TYPES.EnvConfig) private envConfig: EnvConfig) {
            super(dbClient);
    }

    protected get collectionName(): string {
        return this.envConfig.dbWodsCollection;
    }

    public async get() : Promise<WodEntity[]> {
        const collection = this.getCollection();
        const wods = (await collection.find({}).toArray())
    
        return wods;
    }

    public getById(id: string): Promise<WodEntity | null> {
        const collection = this.getCollection();

        return collection.findOne({_id: new ObjectId(id)});
    }

    public delete(id: string): Promise<any> {
        const collection = this.getCollection();

        return collection.deleteOne({_id: new ObjectId(id)})
    }

    public async create(newWod: WodEntity): Promise<WodEntity> {
        const collection = this.getCollection();
        const result =  await collection.insertOne(newWod, {forceServerObjectId: true});
        newWod._id = result.insertedId;

        return newWod;
    }

    public async update(id: string, wodUpdate: WodCreateRequest) : Promise<WodEntity | null> {
        const collection = this.getCollection();
        const updateQuery = { 
            $set: {
                unitId: wodUpdate.unitId == undefined ?  undefined : new ObjectId(wodUpdate.unitId),
                name: wodUpdate.name,
                description: wodUpdate.description,
                scheme: wodUpdate.scheme,
                executionDate: new Date(wodUpdate.executionDate),
                type: wodUpdate.type,
            }
        };

        return collection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            updateQuery,
            {returnDocument: ReturnDocument.AFTER});
    }
}