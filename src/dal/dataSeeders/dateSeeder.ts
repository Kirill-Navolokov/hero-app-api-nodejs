import { Db } from "mongodb";

export interface DataSeeder {
    Seed(db: Db): Promise<void>;
}