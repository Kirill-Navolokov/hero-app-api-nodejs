import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { EnvConfig } from "../../config/environment";
import { ObjectId, ReturnDocument } from "mongodb";
import { WodEntity } from "../entities/wodEntity";
import { WodUpdateRequest } from "../../apiRequests/wodUpdateRequest";
import { BaseRepository } from "./baseRepository";

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
        var collection = this.getCollection();
        var wods = (await collection.find({}).toArray())
    
        return wods;
    }

    public getById(id: string): Promise<WodEntity | null> {
        var collection = this.getCollection();

        return collection.findOne({_id: new ObjectId(id)});
    }

    public delete(id: string): Promise<any> {
        var collection = this.getCollection();

        return collection.deleteOne({_id: new ObjectId(id)})
    }

    public async create(newWod: WodEntity): Promise<WodEntity> {
        var collection = this.getCollection();
        var result =  await collection.insertOne(newWod, {forceServerObjectId: true});
        newWod._id = result.insertedId;

        return newWod;
    }

    public async update(id: string, wodUpdate: WodUpdateRequest) : Promise<WodEntity | null> {
        var collection = this.getCollection();
        var updateQuery = { $set: {
            unitId: wodUpdate.unitId == undefined ?  undefined : new ObjectId(wodUpdate.unitId),
            name: wodUpdate.name,
            description: wodUpdate.description,
            scheme: wodUpdate.scheme,
            executionDate: wodUpdate.executionDate,
            type: wodUpdate.type,
            imageUrl: wodUpdate.imageUrl,
            backgroundUrl: wodUpdate.backgroundUrl
        }};

        return collection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            updateQuery,
            {returnDocument: ReturnDocument.AFTER});
    }
}