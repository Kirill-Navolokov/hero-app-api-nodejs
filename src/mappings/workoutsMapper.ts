import { ObjectId } from "mongodb";
import { WorkoutCreateRequest } from "../apiRequests/workoutCreateRequest";
import { WorkoutEntity } from "../dal/entities/workoutEntity";
import { Workout } from "../models/workout";

export function toWorkoutModel(entity: WorkoutEntity): Workout {
    return {
        id: entity._id.toString(),
        unitId: entity.unitId.toString(),
        name: entity.name,
        date: entity.date,
        description: entity.description
    }
}

export function toWorkoutEntity(createRequest: WorkoutCreateRequest): WorkoutEntity {
    return {
        _id: new ObjectId(),
        unitId: new ObjectId(createRequest.unitId),
        name: createRequest.name,
        date: new Date(),
        description: createRequest.description
    }
}