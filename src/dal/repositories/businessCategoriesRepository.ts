import { inject, injectable } from "inversify";
import { BaseRepository } from "./baseRepository";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { EnvConfig } from "../../config/environment";
import { BusinessCategoryEntity } from "../entities/businessCategoryEntity";
import { ObjectId } from "mongodb";

@injectable()
export class BusinessCategoriesRepository extends BaseRepository<BusinessCategoryEntity> {
    constructor(
        @inject(TYPES.DbClient) dbClient: DbClient,
        @inject(TYPES.EnvConfig) private readonly envConfig: EnvConfig) {
            super(dbClient);
    }
    protected get collectionName(): string {
        return this.envConfig.dbBusinessCategoriesCollection;
    }

    public async get(): Promise<Map<string, string>> {
        let collection = this.getCollection();
        let businessCategories  = (await collection.find({}).toArray());
        let map = new Map<string, string>(businessCategories.map(c => [c._id.toString(), c.name]));

        return map;
    }
}