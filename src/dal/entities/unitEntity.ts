import { ObjectId } from "mongodb"

export interface UnitEntity {
    _id: ObjectId;
    name: string;
    description: string;
    foundationDate: Date;
    imageUrl: string;
}