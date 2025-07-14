import { inject, injectable } from "inversify";
import { WorkoutEntity } from "../entities/workoutEntity";
import { BaseRepository } from "./baseRepository";
import { TYPES } from "../../types";
import { DbClient } from "../dbConnection";
import { EnvConfig } from "../../config/environment";
import { ObjectId } from "mongodb";

@injectable()
export class WorkoutsRepository extends BaseRepository<WorkoutEntity> {
    constructor(
        @inject(TYPES.DbClient) dbClient: DbClient,
        @inject(TYPES.EnvConfig) private envConfig: EnvConfig) {
            super(dbClient);
    }

    public getByUnit(unitId: string): Promise<WorkoutEntity[]> {
        var collection = this.getCollection();
        var workouts = collection.find({unitId: new ObjectId(unitId)}).toArray();

        return workouts;
    }

    protected get collectionName(): string {
        return this.envConfig.dbWorkoutsCollection;
    }
}