import { dbBaseTableSeeder } from "./dbTableSeeder";

export default class wodsTableSeeder extends dbBaseTableSeeder {
    tableName: string = "wods";
    
    protected getCreateTableQuery(): string {
        return `CREATE TABLE ${this.tableName}
        (
            id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            imageUrl varchar(255) NOT NULL,
            
            description varchar(255) NOT NULL,
            scheme varchar(255) NOT NULL,
            createdDate TIMESTAMP NOT NULL,
            wodDate DATE NOT NULL,
            isDeleted boolean DEFAULT false
        )`;
        //honorship varchar(255) NOT NULL,
    }

    protected getSeedTableQuery(): string {
        return `INSERT into ${this.tableName} 
        (name, imageUrl, honorship, description, scheme, createdDate, wodDate, isDeleted) VALUES ?`
    }
}