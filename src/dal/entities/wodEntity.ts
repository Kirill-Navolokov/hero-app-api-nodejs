import { ObjectId } from "mongodb"

export interface WodEntity {
    _id: ObjectId;
    unitId?: ObjectId;
    name: string;
    description: string;
    scheme: string;
    executionDate: Date;
    creationDate: Date;
    type: number;
    imageUrl: string;
    imageName: string;
}