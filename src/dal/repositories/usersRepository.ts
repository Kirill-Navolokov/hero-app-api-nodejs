import { inject, injectable } from "inversify";
import { EnvConfig } from "../../config/environment";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { BaseRepository } from "./baseRepository";
import { UserEntity } from "../entities/userEntity";

@injectable()
export class UsersRepository extends BaseRepository<UserEntity> {
    constructor(
        @inject(TYPES.DbClient) dbClient: DbClient,
        @inject(TYPES.EnvConfig) private envConfig: EnvConfig) {
            super(dbClient);
    }

    public getByEmail(email: string) : Promise<UserEntity | null> {
        var collection = this.getCollection();

        return collection.findOne({email: email});
    }

    protected get collectionName(): string {
        return this.envConfig.dbUsersCollection;
    }
}