import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Unit } from "../models/unit";
import { toEntity, toModel } from "../mappings/unitsMapper";
import { toWorkoutEntity, toWorkoutModel } from "../mappings/workoutsMapper";
import { UnitsRepository } from "../dal/repositories/unitsRepository";
import { UnitCreateRequest } from "../apiRequests/unitCreateRequest";
import { Workout } from "../models/workout";
import { WorkoutsRepository } from "../dal/repositories/workoutsRepository";
import { UnitEntity } from "../dal/entities/unitEntity";
import { HeroBookError } from "../helpers/heroBookError";
import BlobService from "./blobService";
import { EnvConfig } from "../config/environment";
import { WorkoutEntity } from "../dal/entities/workoutEntity";
import { WorkoutCreateRequest } from "../apiRequests/workoutCreateRequest";

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
    ): Promise<Unit> {
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
        const unit = await this.getEntity(unitId);

        return this.workoutsRepository.getByUnit(unitId)
            .then(entities => entities.map(toWorkoutModel));
    }

    public async createWod(unitId: string, createRequest: WorkoutCreateRequest): Promise<Workout> {
        await this.getEntity(unitId);
        const wodEntity = toWorkoutEntity(createRequest, unitId);

        return await this.workoutsRepository.create(wodEntity)
            .then(entity => toWorkoutModel(entity));
    }

    public async updateWod(
        unitId: string,
        wodId: string,
        updateRequest: WorkoutCreateRequest
    ): Promise<Workout> {
        await this.getEntity(unitId);
        await this.getWodEntity(unitId, wodId);

        return await this.workoutsRepository.update(wodId, updateRequest)
            .then(entity => toWorkoutModel(entity!));
    }

    public async deleteWod(unitId: string, wodId: string): Promise<void> {
        await this.getEntity(unitId);
        await this.getWodEntity(unitId, wodId);

        await this.workoutsRepository.delete(wodId);
    }

    private async getEntity(id: string): Promise<UnitEntity> {
        const unitEntity = await this.unitsRepository.getById(id);
        if(unitEntity == null)
            throw HeroBookError.fromNotFound("Unit", id);
    
        return unitEntity;
    }

    private async getWodEntity(unitId: string, wodId: string): Promise<WorkoutEntity> {
        const workoutEntity = await this.workoutsRepository.getById(wodId);
        if(workoutEntity == null)
            throw HeroBookError.fromNotFound("Unit workout", wodId);

        if(workoutEntity.unitId.toString() != unitId)
            throw new HeroBookError("Workout not found for unit", 404);

        return workoutEntity;
    }
}