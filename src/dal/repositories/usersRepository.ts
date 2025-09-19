import { inject, injectable } from "inversify";
import { EnvConfig } from "../../config/environment";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { BaseRepository } from "./baseRepository";
import { UserEntity } from "../entities/userEntity";
import { ObjectId, ReturnDocument, UpdateFilter } from "mongodb";

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

    public checkExists(email: string): Promise<UserEntity | null> {
        var collection = this.getCollection();

        return collection.findOne(
            {$or: [{email: email}]},
            {collation: emailUsernameIndexCollation}
        );
    }

    public async create(newUser: UserEntity): Promise<UserEntity> {
        var collection = this.getCollection();
        var result =  await collection.insertOne(newUser, {forceServerObjectId: true});
        newUser._id = result.insertedId;

        return newUser;
    }

    public async setPassword(id: ObjectId, encryptedPassword: string): Promise<void> {
        const collection = this.getCollection();
        const updateQuery = {
            $set: {
                encryptedPassword: encryptedPassword,
                passedSignUp: true,
                otp: undefined
            }
        };
        await collection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            updateQuery,
            {returnDocument: ReturnDocument.AFTER});
    }

    public async setRefreshToken(id: ObjectId, refreshToken: string): Promise<void> {
        const collection = this.getCollection();
        const updateQuery = {
            $set: { refreshToken: refreshToken }
        };
        await collection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            updateQuery,
            {returnDocument: ReturnDocument.AFTER});
    }

    private async updateUser(
        id: ObjectId,
        updateQuery: UpdateFilter<UserEntity>
    ): Promise<void> {
        const collection = this.getCollection();
        try {
        await collection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            updateQuery,
            {returnDocument: ReturnDocument.AFTER});
        } catch(error) {
            console.log(error);
        }

    }

    protected get collectionName(): string {
        return this.envConfig.dbUsersCollection;
    }
}