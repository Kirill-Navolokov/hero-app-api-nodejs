import { Db } from "mongodb";

export interface DataSeeder {
    seed(db: Db): Promise<void>;
}