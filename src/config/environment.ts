import { injectable } from "inversify";

@injectable()
export class EnvConfig {
    public get nodeEnv() {return process.env.NODE_ENV;}
    public get port(): number {return (process.env.PORT as unknown) as number;}
    public get dbConnectionString() {return process.env.DB_CONNECTION as string;}
    public get dbName() {return process.env.DB_NAME as string;}
    public get dbWodsCollection() {return process.env.DB_WODS_COLLECTION as string;}
    public get dbUnitsColection() {return process.env.DB_UNITS_COLLECTION as string;}
}