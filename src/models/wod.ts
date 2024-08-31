import { WodHonorship } from "../enums/wodHonorship";

export type Wod = {
    id: number;
    name: string;
    imageUrl: string;
    honorship: WodHonorship[];
    description: string;
    scheme: string;
    createdAt: Date;
    wodDate: Date;
    isDeleted: boolean;
}