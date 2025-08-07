import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { BusinessesRepository } from "../dal/repositories/businessesRepository";
import { BusinessCategoriesRepository } from "../dal/repositories/businessCategoriesRepository";
import { BusinessesResponse } from "../models/businessesResponse";
import toModel from "../mappings/businessesMapper";

@injectable()
export class BusinessesService {
    constructor(
        @inject(TYPES.BusinessesRepository) private readonly businessesRepository: BusinessesRepository,
        @inject(TYPES.BusinessCategoriesRepository) private readonly businessCategoriesRepository: BusinessCategoriesRepository
    ) {
    }

    public async getBusinesses(): Promise<BusinessesResponse> {
        let categoriesMap = await this.businessCategoriesRepository.get();
        let business = await this.businessesRepository.get()
            .then(entities => entities.map(e => toModel(e, categoriesMap)));

        return {
            availableCategories: Array.from(categoriesMap.values()),
            businesses: business
        };
    }
}