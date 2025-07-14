import { ObjectId } from "mongodb";

export interface WorkoutEntity {
    _id: ObjectId,
    unitId: ObjectId,
    name?: string;
    date: Date;
    description: string
}