import { ObjectId } from "mongodb";

export type BusinessEntity = {
    _id: ObjectId;
    name: string;
    link: string;
    imageUrl: string;
    imageName: string;
    categoriesIds: Array<string>
}