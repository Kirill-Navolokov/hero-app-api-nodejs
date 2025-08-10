import { Business } from "./business";

export interface BusinessesResponse {
    availableCategories: string[],
    businesses: Business[]
}