import { error } from "console";
import { Collection, Document } from "mongodb";

export abstract class BaseSeeder {
    abstract getSeedData() : Promise<any[]>;

    protected async SeedEntities(collection: Collection<Document>) : Promise<void> {
        for(var entity of await this.getSeedData()) {
            await collection.findOne({_id: entity._id})
                .then(res => {
                    if(res == null)
                        collection.insertOne(entity);
                });
        }
    }
}