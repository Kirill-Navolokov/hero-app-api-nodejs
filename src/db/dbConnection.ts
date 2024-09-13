import { injectable } from "inversify";
import mysql, { Connection } from "mysql2";
import { dbConnectionInfo } from "./local.db.config";
import dbTableSeeder from "./dbTableSeeder";
import wodsTableSeeder from "./wodsTableSeeder";

@injectable()
export default class HeroDb {
    private readonly isLocal: boolean = true;
    
    public connection: Connection;

    constructor() {
        if(!this.isLocal) {
            this.connection = this.getConnection(dbConnectionInfo.DbName);
        } else {
            this.connection = this.getConnection(undefined);
            this.initLocalDatabase()
            this.connection.destroy();
            // this.connection = this.getConnection(dbConnectionInfo.DbName);
            // this.seedTables([new wodsTableSeeder()]);
        }   
    }

    private getConnection(dbName: string | undefined) {
        return mysql.createConnection({
            host: dbConnectionInfo.Host,
            user: dbConnectionInfo.User,
            database: dbName
        });
    }

    public async setupDbConnection() {
        if(this.isLocal) {
            this.connectDb(undefined);
            this.initLocalDatabase();
            this.connection?.destroy();

            await this.connectDb(dbConnectionInfo.DbName);
            await this.seedTables([new wodsTableSeeder()]);
        }
        else
            await this.connectDb(dbConnectionInfo.DbName);

    }

    private async connectDb(dbName: string | undefined) {
        this.connection = await mysql.createConnection({
            host: dbConnectionInfo.Host,
            user: dbConnectionInfo.User,
            database: dbName
        });
        await this.connection.connect();
    }

    private initLocalDatabase() {
        console.log("DB INIT STARTED");
        
        this.connection.query(`DROP DATABASE IF EXISTS ${dbConnectionInfo.DbName}
            CREATE DATABASE ${dbConnectionInfo.DbName}`, (error, result) => {
            if(error)
                console.log(`DROP DB ERROR: ${error.message}`);
            else
                console.log("DB DROPPED")
        });
        // this.connection.query(`CREATE DATABASE ${dbConnectionInfo.DbName};`, (error, result) => {
        //     if(error)
        //         console.log(`CREATE DB ERROR: ${error.message}`);
        //     else
        //         console.log("DB CREATED")
        // }).start();

        console.log("DB INIT COMPLETED");
    }

    // private async getConnection(dbName: string | undefined) : mysql.Connection {
    //     return await mysql.createConnection({
    //         host: dbConnectionInfo.Host,
    //         user: dbConnectionInfo.User,
    //         database: dbName
    //     });
    // }

    private seedTables(tablesSeeders: dbTableSeeder[]) {
        for(var seeder of tablesSeeders)
            seeder.seedTable(this.connection!);
    }
}