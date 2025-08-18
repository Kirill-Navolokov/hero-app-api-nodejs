import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Unit } from "../models/unit";
import { toEntity, toModel } from "../mappings/unitsMapper";
import { toWorkoutModel } from "../mappings/workoutsMapper";
import { UnitsRepository } from "../dal/repositories/unitsRepository";
import { UnitCreateRequest } from "../apiRequests/unitCreateRequest";
import { Workout } from "../models/workout";
import { WorkoutsRepository } from "../dal/repositories/workoutsRepository";
import { UnitEntity } from "../dal/entities/unitEntity";
import { HeroBookError } from "../helpers/heroBookError";
import BlobService from "./blobService";
import { EnvConfig } from "../config/environment";

@injectable()
export default class UnitsService {
    constructor(
        @inject(TYPES.UnitsRepository) private readonly unitsRepository: UnitsRepository,
        @inject(TYPES.WorkoutsRepository) private readonly workoutsRepository: WorkoutsRepository,
        @inject(TYPES.BlobService) private readonly blobService: BlobService,
        @inject(TYPES.EnvConfig) private readonly envConfig: EnvConfig) {
    }

    public async get() : Promise<Unit[]> {
        return this.unitsRepository.get()
            .then(entities => entities.map(toModel));
    }

    public async getById(id: string): Promise<Unit | null> {
        const unitEntity = await this.getEntity(id);
        
        return toModel(unitEntity);
    }

    public async delete(id: string): Promise<void> {
        const unit = await this.getEntity(id);
        await Promise.all([
            this.blobService.delete(unit.imageName, this.envConfig.storageAccountUnitsContainer),
            this.unitsRepository.delete(id)
        ]);
    }

    public async create(file: Express.Multer.File, createRequest: UnitCreateRequest): Promise<Unit> {
        return await this.blobService
            .upload(file, this.envConfig.storageAccountUnitsContainer)
            .then(async uploadResponse => {
                const entity = await this.unitsRepository
                    .create(toEntity(createRequest, uploadResponse[0], uploadResponse[1]));
                return toModel(entity);
            });
    }

    public async update(
        id: string,
        unitUpdate: UnitCreateRequest,
        file?: Express.Multer.File
    ): Promise<Unit | null> {
        const unit = await this.getEntity(id);

        if(file)
            await this.blobService.update(
                unit.imageName,
                this.envConfig.storageAccountUnitsContainer,
                file);

        return this.unitsRepository.update(id, unitUpdate)
            .then(entity => toModel(entity!));
    }

    public async getWods(unitId: string): Promise<Workout[]> {
        return this.workoutsRepository.getByUnit(unitId)
            .then(entities => entities.map(toWorkoutModel));
    }

    private async getEntity(id: string): Promise<UnitEntity> {
        let unitEntity = await this.unitsRepository.getById(id);
        if(unitEntity == null)
            throw HeroBookError.fromNotFound("Unit", id);
    
        return unitEntity;
    }
}