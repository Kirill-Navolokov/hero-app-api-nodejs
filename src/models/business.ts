import { ObjectId } from "mongodb";

export interface Business {
    _id: ObjectId;
    name: string;
    link: string;
    imageUrl: string;
    categories: Array<string>
}