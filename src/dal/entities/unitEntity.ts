import { ObjectId } from "mongodb"

export type UnitEntity = {
    _id: ObjectId;
    name: string;
    description: string;
    foundationDate: Date;
    imageUrl: string;
}