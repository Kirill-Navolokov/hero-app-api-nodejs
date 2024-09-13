import { RowDataPacket } from "mysql2";
import { WodHonorship } from "../enums/wodHonorship";

export interface Wod extends RowDataPacket {
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