import { inject, injectable } from "inversify";
import { WorkoutEntity } from "../entities/workoutEntity";
import { BaseRepository } from "./baseRepository";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { EnvConfig } from "../../config/environment";
import { ObjectId, ReturnDocument } from "mongodb";
import { WorkoutCreateRequest } from "../../apiRequests/workoutCreateRequest";

@injectable()
export class WorkoutsRepository extends BaseRepository<WorkoutEntity> {
    constructor(
        @inject(TYPES.DbClient) dbClient: DbClient,
        @inject(TYPES.EnvConfig) private envConfig: EnvConfig) {
            super(dbClient);
    }

    public getByUnit(unitId: string): Promise<WorkoutEntity[]> {
        const collection = this.getCollection();
        const workouts = collection.find({unitId: new ObjectId(unitId)}).toArray();

        return workouts;
    }

    public getById(wodId: string): Promise<WorkoutEntity | null> {
        const collection = this.getCollection();

        return collection.findOne({_id: new ObjectId(wodId)});
    }

    public async create(newWorkout: WorkoutEntity): Promise<WorkoutEntity> {
        const collection = this.getCollection();
        const result =  await collection.insertOne(newWorkout, {forceServerObjectId: true});
        newWorkout._id = result.insertedId;

        return newWorkout;
    }

    public async update(id: string, wodUpdate: WorkoutCreateRequest): Promise<WorkoutEntity | null> {
        const collection = this.getCollection();
        const updateQuery = { 
            $set: {
                name: wodUpdate.name,
                description: wodUpdate.description,
                date: new Date(wodUpdate.date),
            }
        };

        return collection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            updateQuery,
            {returnDocument: ReturnDocument.AFTER});
    }

    public delete(id: string): Promise<any> {
        const collection = this.getCollection();

        return collection.deleteOne({_id: new ObjectId(id)});
    }

    protected get collectionName(): string {
        return this.envConfig.dbWorkoutsCollection;
    }
}