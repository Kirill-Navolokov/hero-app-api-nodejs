import { injectable } from "inversify";

@injectable()
export class EnvConfig {
    constructor() {
        
    }
    public get nodeEnv() {return process.env.NODE_ENV;}
    public get port(): number {return (process.env.PORT as unknown) as number;}
    public get jwtSecretKey() {return process.env.JWT_SECRET_KEY as string;}
    public get dbConnectionString() {return process.env.DB_CONNECTION as string;}
    public get dbName() {return process.env.DB_NAME as string;}
    public get dbWodsCollection() {return process.env.DB_WODS_COLLECTION as string;}
    public get dbUnitsCollection() {return process.env.DB_UNITS_COLLECTION as string;}
    public get dbUsersCollection() {return process.env.DB_USERS_COLLECTION as string;}
    public get dbSupportCollection() {return process.env.DB_SUPPORT_COLLECTION as string;}
    public get dbWorkoutsCollection() {return process.env.DB_WORKOUTS_COLLECTION as string}
    public get dbBusinessesCollection() {return process.env.DB_BUSINESSES_COLLECTION as string}
    public get dbBusinessCategoriesCollection() {return process.env.DB_BUSINESS_CATEGORIES_COLLECTION as string}
    public get adminPassword() {return process.env.ADMIN_PASSWORD as string;}
    public get googleClientId() {return process.env.GOOGLE_CLIENT_ID as string;}
    public get storageAccountConnectionString() {return process.env.STORAGE_ACCOUNT_CONNECTION_STRING as string;}
    public get storageAccountWodsContainer() {return process.env.STORAGE_ACCOUNT_WODS_CONTAINER as string;}
    public get storageAccountUnitsContainer() {return process.env.STORAGE_ACCOUNT_UNITS_CONTAINER as string;}
    public get storageAccountBusinessesContainer() {return process.env.STORAGE_ACCOUNT_BUSINESSES_CONTAINER as string;}

}