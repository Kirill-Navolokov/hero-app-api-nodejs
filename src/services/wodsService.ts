import { inject, injectable } from 'inversify';
import { Wod } from '../models/wod';
import { TYPES } from '../types';
import { WodsRepository } from '../dal/repositories/wodsRepository';
import { WodCreateRequest } from '../apiRequests/wodCreateRequest';
import { toEntity, toModel } from '../mappings/wodsMapper';
import { UnitsRepository } from '../dal/repositories/unitsRepository';
import { isDefined } from 'class-validator';
import { HeroBookError } from '../helpers/heroBookError';
import { EnvConfig } from '../config/environment';
import BlobService from './blobService';
import { WodEntity } from '../dal/entities/wodEntity';

@injectable()
export default class WodsService {
    constructor(
        @inject(TYPES.WodsRepository) private readonly wodsRepository: WodsRepository,
        @inject(TYPES.UnitsRepository) private readonly unitsRepository: UnitsRepository,
        @inject(TYPES.BlobService) private readonly blobService: BlobService,
        @inject(TYPES.EnvConfig) private readonly envConfig: EnvConfig) {
    }

    public async get(): Promise<Wod[]> {
        return this.wodsRepository.get()
            .then(entities => entities.map(toModel));
    }

    public async getById(id: string): Promise<Wod> {
        const wodEntity = await this.getEntity(id);

        return toModel(wodEntity);
    }

    public async delete(id: string): Promise<void> {
        const wod = await this.getEntity(id);
        await Promise.all([
            this.blobService.delete(wod.imageName, this.envConfig.storageAccountWodsContainer),
            this.wodsRepository.delete(id)
        ]);
    }

    public async create(file: Express.Multer.File, createRequest: WodCreateRequest): Promise<Wod> {
        await this.verifyUnitExists(createRequest.unitId);

        return await this.blobService
            .upload(file, this.envConfig.storageAccountWodsContainer)
            .then(async uploadResponse => {
                const entity = await this.wodsRepository
                    .create(toEntity(createRequest, uploadResponse[0], uploadResponse[1]));
                return toModel(entity);
            });
    }

    public async update(
        id: string,
        wodUpdate: WodCreateRequest,
        file?: Express.Multer.File
    ): Promise<Wod | null> {
        await this.verifyUnitExists(wodUpdate.unitId);
        const wod = await this.getEntity(id);

        if(file) {
            await this.blobService.update(
                wod.imageName,
                this.envConfig.storageAccountWodsContainer,
                file);
        }

        return await this.wodsRepository.update(id, wodUpdate)
            .then(entity => toModel(entity!));
    }

    private async verifyUnitExists(unitId?: string): Promise<void> {
        if(isDefined(unitId)) {
            const unit = await this.unitsRepository.getById(unitId);
            if(unit == null)
                throw HeroBookError.fromNotFound("Unit", unitId);
        }
    }

    private async getEntity(id: string): Promise<WodEntity> {
        let wodEntity = await this.wodsRepository.getById(id);
        if(wodEntity == null)
            throw HeroBookError.fromNotFound("Wod", id);

        return wodEntity;
    }
}