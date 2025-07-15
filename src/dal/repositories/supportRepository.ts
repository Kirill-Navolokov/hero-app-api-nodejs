import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { EnvConfig } from "../../config/environment";
import { AdvicesEntity } from "../entities/advicesEntity";
import { BaseRepository } from "./baseRepository";
import { FaqsEntity } from "../entities/faqsEntity";

@injectable()
export class SupportRepository extends BaseRepository<any> {
    constructor(
        @inject(TYPES.DbClient) dbClient: DbClient,
        @inject(TYPES.EnvConfig) private envConfig: EnvConfig
    ) {
        super(dbClient);
    }

    protected get collectionName(): string {
        return this.envConfig.dbSupportCollection;
    }

    public async getAdvices(): Promise<AdvicesEntity> {
        var collection = this.getCollection();
        var advices = await collection.findOne<AdvicesEntity>({_id: "advices"});

        return advices!;
    }

    public async getFaqs(): Promise<FaqsEntity> {
        var collection = this.getCollection();
        var faqs = await collection.findOne<FaqsEntity>({_id: "faqs"});

        return faqs!;
    }
}