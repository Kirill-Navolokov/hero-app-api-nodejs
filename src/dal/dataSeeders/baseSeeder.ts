import { error } from "console";
import { Collection, Document } from "mongodb";

export abstract class BaseSeeder {
    abstract getSeedData() : Promise<any[]>;

    protected async seedEntities(collection: Collection<Document>) : Promise<void> {
        for(var entity of await this.getSeedData()) {
            let res = await collection.findOne({_id: entity._id});
            if(res == null)
                await collection.insertOne(entity);
            else
                await collection.findOneAndReplace({_id: entity._id}, entity);
        }
    }
}