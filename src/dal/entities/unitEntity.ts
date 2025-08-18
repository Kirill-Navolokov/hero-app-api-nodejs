import { ObjectId } from "mongodb"

export type UnitEntity = {
    _id: ObjectId;
    name: string;
    description: string;
    type: number;
    foundationDate: Date;
    imageUrl: string;
    imageName: string;
    socialNetworks?: {[type: number]: string}
}