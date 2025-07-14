import { ObjectId } from "mongodb"
import { Workout } from "../../models/workout";

export type UnitEntity = {
    _id: ObjectId;
    name: string;
    description: string;
    type: number;
    foundationDate: Date;
    imageUrl: string;
    socialNetworks?: {[type: number]: string}
}