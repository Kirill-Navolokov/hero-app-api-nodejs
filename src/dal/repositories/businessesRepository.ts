import { inject, injectable } from "inversify";
import { BusinessEntity } from "../entities/businessEntity";
import { BaseRepository } from "./baseRepository";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { EnvConfig } from "../../config/environment";

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
}