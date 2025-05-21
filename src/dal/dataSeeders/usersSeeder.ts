import { Db, ObjectId } from "mongodb";
import { BaseSeeder } from "./baseSeeder";
import { DataSeeder } from "./dataSeeder";
import { EnvConfig } from "../../config/environment";
import { UserEntity } from "../entities/userEntity";
import { rolesConstants } from "../../helpers/rolesConstants";
import bcrypt from 'bcrypt';
import { seedingConstants } from "./seedingConstants";

export class UsersSeeder extends BaseSeeder implements DataSeeder {
    constructor(private envConfig: EnvConfig) {
        super()
    }

    async Seed(db: Db): Promise<void> {
        var usersCollection = db.collection(this.envConfig.dbUsersCollection);
        if(await usersCollection.indexExists("email_1") == false)
            await usersCollection.createIndex({email: 1}, {unique: true});

        await this.SeedEntities(usersCollection);
    }

    async getSeedData(): Promise<any[]> {
        var encryptedPassword = await bcrypt.hash(this.envConfig.adminPassword, 10);
        var data: UserEntity[] = [
            {
                _id: new ObjectId(seedingConstants.users.admin),
                email: "admin@gmail.com",
                username: "admin",
                encryptedPassword: encryptedPassword,
                roles: [rolesConstants.admin]
            }
        ];

        return data;
    }
}