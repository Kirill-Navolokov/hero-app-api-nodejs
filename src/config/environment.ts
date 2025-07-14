import { injectable } from "inversify";

@injectable()
export class EnvConfig {
    public get nodeEnv() {return process.env.NODE_ENV;}
    public get port(): number {return (process.env.PORT as unknown) as number;}
    public get jwtSecretKey() {return process.env.JWT_SECRET_KEY as string;}
    public get dbConnectionString() {return process.env.DB_CONNECTION as string;}
    public get dbName() {return process.env.DB_NAME as string;}
    public get dbWodsCollection() {return process.env.DB_WODS_COLLECTION as string;}
    public get dbUnitsCollection() {return process.env.DB_UNITS_COLLECTION as string;}
    public get dbUsersCollection() {return process.env.DB_USERS_COLLECTION as string;}
    public get dbWorkoutsCollection() {return process.env.DB_WORKOUTS_COLLECTION as string}
    public get adminPassword() {return process.env.ADMIN_PASSWORD as string;}
    public get googleClientId() {return process.env.GOOGLE_CLIENT_ID as string;}
}