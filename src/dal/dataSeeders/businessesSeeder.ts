import { Db, ObjectId } from "mongodb";
import { BaseSeeder } from "./baseSeeder";
import { DataSeeder } from "./dataSeeder";
import { EnvConfig } from "../../config/environment";
import { BusinessEntity } from "../entities/businessEntity";
import { seedingConstants } from "./seedingConstants";

export class BusinessesSeeder extends BaseSeeder implements DataSeeder {
    constructor(private envConfig: EnvConfig) {
        super();
    }

    async getSeedData(): Promise<any[]> {
        let data: BusinessEntity[] = [
            {
                _id: new ObjectId(seedingConstants.businesses.riotDivision),
                name: "Riot Division",
                link: "https://riotdivision.tech",
                categoriesIds: [
                    seedingConstants.businessCategories.clothing,
                    seedingConstants.businessCategories.accessories
                ],
                imageUrl: "https://mojave.group/cdn/shop/collections/photo1720095045.jpg?v=1721202762&width=600",
                imageName: "riotDivision.png"
            },
            {
                _id: new ObjectId(seedingConstants.businesses.zakolot),
                name: "Заколот",
                link: "https://www.zakolot.store",
                categoriesIds: [seedingConstants.businessCategories.clothing],
                imageUrl: "https://static.wixstatic.com/media/318f2d_591c9b31e24e4a2eb3b2bd8e1514aa5c~mv2.png/v1/fit/w_2500,h_1330,al_c/318f2d_591c9b31e24e4a2eb3b2bd8e1514aa5c~mv2.png",
                imageName: "zakolot.png"
            },
            {
                _id: new ObjectId(seedingConstants.businesses.apacheShirts),
                name: "Apache Shirts",
                link: "https://www.instagram.com/a.pache_shirts",
                categoriesIds: [seedingConstants.businessCategories.clothing],
                imageUrl: "https://mojave.group/cdn/shop/collections/apache_1_-1.png?v=1721202797&width=600",
                imageName: "apacheShirts.png"
            },
            {
                _id: new ObjectId(seedingConstants.businesses.trafffic),
                name: "Trafffic",
                link: "https://www.instagram.com/trafffic.ua",
                categoriesIds: [seedingConstants.businessCategories.accessories],
                imageUrl: "https://mojave.group/cdn/shop/collections/trafffic.png?v=1725625253&width=600",
                imageName: "trafffic.png"
            },
            {
                _id: new ObjectId(seedingConstants.businesses.ukraineWarRugs),
                name: "Ukraine War Rugs",
                link: "https://www.instagram.com/ukrainewarrugs",
                categoriesIds: [seedingConstants.businessCategories.accessories],
                imageUrl: "https://mojave.group/cdn/shop/collections/uwr.png?v=1738838637&width=600",
                imageName: "ukrWarRugs.png"
            },
            {
                _id: new ObjectId(seedingConstants.businesses.veteranoPizza),
                name: "Veterano Pizza",
                link: "https://veteranopizza.com",
                categoriesIds: [seedingConstants.businessCategories.food],
                imageUrl: "https://veteranopizza.com/public/assets/img/logo.webp",
                imageName: "veteranoPizza.png"
            }
        ];

        return data;
    }

    async seed(db: Db): Promise<void> {
        let businessesCollection = db.collection(this.envConfig.dbBusinessesCollection);

        await this.seedEntities(businessesCollection);
    }
}