import { inject, injectable } from 'inversify';
import { Wod } from '../models/wod';
import { TYPES } from '../types';
import { WodsRepository } from '../dal/repositories/wodsRepository';
import { WodCreateRequest } from '../apiRequests/wodCreateRequest';
import { WodUpdateRequest } from '../apiRequests/wodUpdateRequest';
import { toEntity, toModel } from '../mappings/wodsMapper';

@injectable()
export default class WodsService {
    constructor(
        @inject(TYPES.WodsRepository) private wodsRepository: WodsRepository,
    ) {
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

    public create(createRequest: WodCreateRequest): Promise<Wod> {
        return this.wodsRepository.create(toEntity(createRequest))
            .then(entity => toModel(entity));
    }

    public update(id: string, wodUpdate: WodUpdateRequest): Promise<Wod | null> {
        return this.wodsRepository.update(id, wodUpdate)
            .then(entity => entity == null ? null : toModel(entity));
    }
}