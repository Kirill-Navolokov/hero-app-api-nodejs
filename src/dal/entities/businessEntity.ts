import { ObjectId } from "mongodb";

export type BusinessEntity = {
    _id: ObjectId;
    name: string;
    link: string;
    imageUrl: string;
    categoriesIds: Array<string>
}