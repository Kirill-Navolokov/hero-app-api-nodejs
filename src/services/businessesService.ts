import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { BusinessesRepository } from "../dal/repositories/businessesRepository";
import { BusinessCategoriesRepository } from "../dal/repositories/businessCategoriesRepository";
import { BusinessesResponse } from "../models/businessesResponse";
import toBusinessesResponseModel, { toEntity, toModel } from "../mappings/businessesMapper";
import { Business } from "../models/business";
import { HeroBookError } from "../helpers/heroBookError";
import { BusinessEntity } from "../dal/entities/businessEntity";
import BlobService from "./blobService";
import { EnvConfig } from "../config/environment";
import { BusinessCreateRequest } from "../apiRequests/businessCreateRequest";

@injectable()
export class BusinessesService {
    constructor(
        @inject(TYPES.BusinessesRepository) private readonly businessesRepository: BusinessesRepository,
        @inject(TYPES.BusinessCategoriesRepository) private readonly businessCategoriesRepository: BusinessCategoriesRepository,
        @inject(TYPES.BlobService) private readonly blobService: BlobService,
        @inject(TYPES.EnvConfig) private readonly envConfig: EnvConfig
    ) {
    }

    public async getBusinesses(): Promise<BusinessesResponse> {
        let categoriesMap = await this.businessCategoriesRepository.get();
        let business = await this.businessesRepository.get()
            .then(entities => entities.map(e => toBusinessesResponseModel(e, categoriesMap)));

        return {
            availableCategories: Array.from(categoriesMap.values()),
            businesses: business
        };
    }

    public async getById(id: string): Promise<Business> {
        const businessEntity = await this.getEntity(id);
        const businessCategories = await this.businessCategoriesRepository.getByIds(businessEntity.categoriesIds);

        return toModel(businessEntity, businessCategories);
    }

    public async delete(id: string): Promise<void> {
        const business = await this.getEntity(id);
        await Promise.all([
            this.blobService.delete(business.imageName, this.envConfig.storageAccountBusinessesContainer),
            this.businessesRepository.delete(id)
        ]);
    }

    public async create(file: Express.Multer.File, createRequest: BusinessCreateRequest): Promise<Business> {
        await this.verifyCategoriesExist(createRequest.categoriesIds);
        
        return await this.blobService
            .upload(file, this.envConfig.storageAccountBusinessesContainer)
            .then(async uploadResponse => {
                const entity = await this.businessesRepository
                    .create(toEntity(createRequest, uploadResponse[0], uploadResponse[1]));
                const businessCategories = await this.businessCategoriesRepository.getByIds(entity.categoriesIds);

                return toModel(entity, businessCategories);
            });
    }

    public async update(
        id: string,
        businessUpdate: BusinessCreateRequest,
        file?: Express.Multer.File
    ): Promise<Business> {
        await this.verifyCategoriesExist(businessUpdate.categoriesIds);
        const business = await this.getEntity(id);

        if(file)
            await this.blobService.update(
                business.imageName,
                this.envConfig.storageAccountBusinessesContainer,
                file);

        return this.businessesRepository.update(id, businessUpdate)
            .then(async entity => {
                const businessCategories = await this.businessCategoriesRepository.getByIds(entity!.categoriesIds);

                return toModel(entity!, businessCategories);
            });
        }

    private async verifyCategoriesExist(categoriesIds: string[]): Promise<void> {
        let categories = (await this.businessCategoriesRepository.getByIds(categoriesIds))
            .map(c => c._id.toString());

        if(categories.length != categoriesIds.length) {
            const notExistingCategories = categoriesIds.filter(id => !categories.includes(id));
            throw HeroBookError.fromNotFound("Business Category", notExistingCategories.join(", "));
        }
    }

    private async getEntity(id: string): Promise<BusinessEntity> {
        let businessEntity = await this.businessesRepository.getById(id);
        if(businessEntity == null)
            throw HeroBookError.fromNotFound("Business", id);
        
        return businessEntity;
    }
}