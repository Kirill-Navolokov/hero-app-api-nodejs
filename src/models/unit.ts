import { UnitType } from "../enums/unitType";

export interface Unit {
    id: string;
    name: string;
    description: string;
    type: UnitType;
    foundationDate: Date;
    imageUrl: string;
    socialNetworks?: {[type: number]: string};
}