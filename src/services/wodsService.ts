import { inject, injectable } from 'inversify';
import { Wod } from '../models/wod';
import { TYPES } from '../types';
import { WodsRepository } from '../dal/repositories/wodsRepository';
import { WodCreateRequest } from '../apiRequests/wodCreateRequest';
import { WodUpdateRequest } from '../apiRequests/wodUpdateRequest';
import { toEntity, toModel } from '../mappings/wodsMapper';
import { UnitsRepository } from '../dal/repositories/unitsRepository';
import { isDefined } from 'class-validator';
import { HeroBookError } from '../helpers/heroBookError';

@injectable()
export default class WodsService {
    constructor(
        @inject(TYPES.WodsRepository) private wodsRepository: WodsRepository,
        @inject(TYPES.UnitsRepository) private unitsRepository: UnitsRepository) {
    }

    public async get(): Promise<Wod[]> {
        return this.wodsRepository.get()
            .then(entities => entities.map(toModel));
    }

    public getById(id: string): Promise<Wod | null> {
        return this.wodsRepository.getById(id)
            .then(entity => entity == null ? null : toModel(entity));
    }

    public delete(id: string): Promise<void> {
        return this.wodsRepository.delete(id);
    }

    public async create(createRequest: WodCreateRequest): Promise<Wod> {
        await this.verifyUnitExists(createRequest.unitId);

        return await this.wodsRepository.create(toEntity(createRequest))
            .then(entity => toModel(entity));
    }

    public async update(id: string, wodUpdate: WodUpdateRequest): Promise<Wod | null> {
        await this.verifyUnitExists(wodUpdate.unitId);

        return await this.wodsRepository.update(id, wodUpdate)
            .then(entity => entity == null ? null : toModel(entity));
    }

    private async verifyUnitExists(unitId?: string): Promise<void> {
        if(isDefined(unitId)) {
            var unit = await this.unitsRepository.getById(unitId);
            if(unit == null)
                throw new HeroBookError("Unit by id not found", 404)
        }
    }
}