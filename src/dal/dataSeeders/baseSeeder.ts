import { Collection, Document } from "mongodb";

export abstract class BaseSeeder {
    abstract getSeedData() : any[];

    protected async SeedEntities(collection: Collection<Document>) : Promise<void> {
        for(var entity of this.getSeedData()) {
            await collection.findOneAndReplace(
                {_id: entity._id},
                entity)
        }
    }
}