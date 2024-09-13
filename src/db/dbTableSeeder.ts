import mysql, { Connection } from "mysql2";

export default interface dbTableSeeder {
    seedTable(connection: Connection): void;
}

export abstract class dbBaseTableSeeder implements dbTableSeeder {
    abstract tableName: string;

    protected abstract getCreateTableQuery(): string;
    protected abstract getSeedTableQuery(): string;

    public seedTable(connection: mysql.Connection) {
        this.ensureTableCreated(connection);
        //await this.seedData(connection);
    }

    private ensureTableCreated(connection: mysql.Connection) {
        connection.query(`DROP TABLE IF EXISTS ${this.tableName};`, (error) => {
            if(error)
                console.log(`DROP TABLE ERROR: ${error.message}`);
            else
                console.log("TABLE DROPPED")
        })
        connection.query(this.getCreateTableQuery(), (error, result) => {
            if(error)
                console.log(`CREATE TABLE ERROR: ${error.message}`);
            else
                console.log("TABLE CREATED")
        });
    }

    private async seedData(connection: mysql.Connection) {
        await connection.query(this.getSeedTableQuery());
        // , (error, result) => {
        //     if(error)
        //         console.log(`SEED TABLE: ${this.tableName} ERROR: ${error.message}`);
        //     else
        //         console.log(`SEED TABLE: ${this.tableName} COMPLETED`);
        // });
    }

}