import { inject, injectable } from "inversify";
import { EnvConfig } from "../../config/environment";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { BaseRepository } from "./baseRepository";
import { UserEntity } from "../entities/userEntity";

export const emailUsernameIndexCollation = {locale:"en", strength:1}

@injectable()
export class UsersRepository extends BaseRepository<UserEntity> {
    constructor(
        @inject(TYPES.DbClient) dbClient: DbClient,
        @inject(TYPES.EnvConfig) private envConfig: EnvConfig
    ) {
        super(dbClient);
    }

    public getByEmail(email: string): Promise<UserEntity | null> {
        var collection = this.getCollection();

        return collection.findOne(
            {email: email},
            {collation: emailUsernameIndexCollation}
        );
    }

    public checkExists(email: string, username: string): Promise<UserEntity | null> {
        var collection = this.getCollection();

        return collection.findOne(
            {$or: [{email: email}, {username: username}]},
            {collation: emailUsernameIndexCollation}
        );
    }

    public async create(newUser: UserEntity): Promise<UserEntity> {
        var collection = this.getCollection();
        var result =  await collection.insertOne(newUser, {forceServerObjectId: true});
        newUser._id = result.insertedId;

        return newUser;
    }

    protected get collectionName(): string {
        return this.envConfig.dbUsersCollection;
    }
}