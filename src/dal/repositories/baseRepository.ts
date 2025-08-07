import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { Collection } from "mongodb";

@injectable()
export abstract class BaseRepository<TEntity extends object> {
    constructor(
        @inject(TYPES.DbClient) private dbClient: DbClient) {
    }

    protected abstract get collectionName(): string;

    protected getCollection(): Collection<TEntity> {
        return this.dbClient.db.collection<TEntity>(this.collectionName);
    }
}