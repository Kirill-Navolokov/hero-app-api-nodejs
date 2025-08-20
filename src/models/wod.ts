import { WodHonorship } from "../enums/wodHonorship";

export interface Wod {
    id: string;
    unitId?: string;
    name: string;
    description: string;
    scheme: string;
    executionDate: Date;
    creationDate: Date;
    type: WodHonorship;
    imageUrl: string;
}