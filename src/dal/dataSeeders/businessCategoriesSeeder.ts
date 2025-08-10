import { Db, ObjectId } from "mongodb";
import { BaseSeeder } from "./baseSeeder";
import { DataSeeder } from "./dataSeeder";
import { EnvConfig } from "../../config/environment";
import { BusinessCategoryEntity } from "../entities/businessCategoryEntity";
import { seedingConstants } from "./seedingConstants";

export class BusinessCategoriesSeeder extends BaseSeeder implements DataSeeder {
    constructor(private envConfig: EnvConfig) {
        super();
    }
    
    async getSeedData(): Promise<any[]> {
        let data: BusinessCategoryEntity[] = [
            {
                _id: new ObjectId(seedingConstants.businessCategories.food),
                name: "Їжа"
            },
            {
                _id: new ObjectId(seedingConstants.businessCategories.clothing),
                name: "Одяг"
            },
            {
                _id: new ObjectId(seedingConstants.businessCategories.accessories),
                name: "Аксесуари"
            },
            {
                _id: new ObjectId(seedingConstants.businessCategories.service),
                name: "Сервіс"
            }
        ];

        return data;
    }

    async seed(db: Db): Promise<void> {
        let businessCategoriesCollection = db.collection(this.envConfig.dbBusinessCategoriesCollection);

        await this.seedEntities(businessCategoriesCollection);
    }
}