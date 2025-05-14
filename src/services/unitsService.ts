import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Unit } from "../models/unit";
import { toEntity, toModel } from "../mappings/unitsMapper";
import { UnitsRepository } from "../dal/repositories/unitsRepository";
import { UnitUpdateRequest } from "../apiRequests/unitUpdateRequest";
import { UnitCreateRequest } from "../apiRequests/unitCreateRequest";

@injectable()
export default class UnitsService {
    constructor(
        @inject(TYPES.UnitsRepository) private unitsRepository: UnitsRepository) {
    }

    public async get() : Promise<Unit[]> {
        return this.unitsRepository.get()
            .then(entities => entities.map(toModel));
    }

    public getById(id: string): Promise<Unit | null> {
        return this.unitsRepository.getById(id)
            .then(entity => entity == null ? null : toModel(entity));
    }

    public async delete(id: string): Promise<void> {
        return this.unitsRepository.delete(id);
    }

    public async create(createRequest: UnitCreateRequest): Promise<Unit> {
        return this.unitsRepository.create(toEntity(createRequest))
            .then(entity => toModel(entity));
    }

    public async update(id: string, unitUpdate: UnitUpdateRequest): Promise<Unit | null> {
        return this.unitsRepository.update(id, unitUpdate)
            .then(entity => entity == null ? null : toModel(entity));
    }
}