import { Db, ObjectId } from "mongodb";
import { BaseSeeder } from "./baseSeeder";
import { DataSeeder } from "./dataSeeder";
import { EnvConfig } from "../../config/environment";
import { UserEntity } from "../entities/userEntity";
import { rolesConstants } from "../../helpers/rolesConstants";
import { seedingConstants } from "./seedingConstants";
import { encryptPassword } from "../../helpers/functions";
import { emailUsernameIndexCollation } from "../repositories/usersRepository";

export class UsersSeeder extends BaseSeeder implements DataSeeder {
    constructor(private envConfig: EnvConfig) {
        super()
    }

    async seed(db: Db): Promise<void> {
        var usersCollection = db.collection(this.envConfig.dbUsersCollection);
        if(await usersCollection.indexExists("email") == false)
            await usersCollection.createIndex(
                {email: 1},
                {unique: true, name: "email", collation: emailUsernameIndexCollation}
            );
        if(await usersCollection.indexExists("username") == false)
            await usersCollection.createIndex(
                {username: 1},
                {unique: true, name: "username", collation: emailUsernameIndexCollation}
            );

        await this.seedEntities(usersCollection);
    }

    async getSeedData(): Promise<any[]> {
        var encryptedPassword = await encryptPassword(this.envConfig.adminPassword);
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