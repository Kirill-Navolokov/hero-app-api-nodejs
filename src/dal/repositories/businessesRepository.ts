import { inject, injectable } from "inversify";
import { BusinessEntity } from "../entities/businessEntity";
import { BaseRepository } from "./baseRepository";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { EnvConfig } from "../../config/environment";
import { ObjectId, ReturnDocument } from "mongodb";
import { BusinessCreateRequest } from "../../apiRequests/businessCreateRequest";

@injectable()
export class BusinessesRepository extends BaseRepository<BusinessEntity> {
    constructor(
        @inject(TYPES.DbClient) dbClient: DbClient,
        @inject(TYPES.EnvConfig) private readonly envConfig: EnvConfig) {
            super(dbClient);
    }
    protected get collectionName(): string {
        return this.envConfig.dbBusinessesCollection;
    }

    public async get(): Promise<BusinessEntity[]> {
        let collection = this.getCollection();
        let businesses = await collection.find().toArray();

        return businesses;
    }
    
    public getById(id: string): Promise<BusinessEntity | null> {
        const collection = this.getCollection();

        return collection.findOne({_id: new ObjectId(id)});
    }

    public delete(id: string): Promise<any> {
        const collection = this.getCollection();

        return collection.deleteOne({_id: new ObjectId(id)});
    }

    public async create(newBusiness: BusinessEntity): Promise<BusinessEntity> {
        const collection = this.getCollection();
        const result =  await collection.insertOne(newBusiness, {forceServerObjectId: true});
        newBusiness._id = result.insertedId;
    
        return newBusiness;
    }

    public async update(id: string, businessUpdate: BusinessCreateRequest) : Promise<BusinessEntity | null> {
        const collection = this.getCollection();
        const updateQuery = { 
            $set: {
                name: businessUpdate.name,
                link: businessUpdate.link,
                categoriesIds: businessUpdate.categoriesIds
            }
        };

        return collection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            updateQuery,
            {returnDocument: ReturnDocument.AFTER});
    }
}