import { RequestHandler } from "express";
import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import UnitsService from "../services/unitsService";
import { UnitCreateRequest } from "../apiRequests/unitCreateRequest";
import { transformAndValidate, validateImage } from "../helpers/functions";
import { WorkoutCreateRequest } from "../apiRequests/workoutCreateRequest";

@injectable()
export class UnitsController {
    constructor(@inject(TYPES.UnitsService) private readonly unitsService: UnitsService) {
    }

    public getUnits: RequestHandler = async (req, res, next) => {
        const units = await this.unitsService.get();

        res.status(200).json(units);
    }

    public getUnit: RequestHandler<{id: string}> = async (req, res, next) => {
        const unit = await this.unitsService.getById(req.params.id);

        res.status(200).json(unit);
    }

    public deleteUnit: RequestHandler<{id: string}> = async (req, res, next) => {
        await this.unitsService.delete(req.params.id);

        res.status(200).send();
    }

    // public createUnit: RequestHandler = async (req, res, next) => {
    //     const createRequest = await transformAndValidate(UnitCreateRequest, req.body);
    //     await validateImage(req.file!);
    //     const createdUnit = await this.unitsService.create(req.file!, createRequest);

    //     res.status(200).json(createdUnit);
    // }

    public updateUnit: RequestHandler<{id: string}> = async (req, res, next) => {
        if(req.file)
            await validateImage(req.file);
        const updateRequest = await transformAndValidate(UnitCreateRequest, req.body);
        const updatedUnit = await this.unitsService.update(
            req.params.id,
            updateRequest,
            req.file);

        res.status(200).json(updatedUnit);
    }

    public getWods: RequestHandler<{id: string}> = async (req, res, next) => {
        const wods = await this.unitsService.getWods(req.params.id);

        res.status(200).json(wods);
    }

    public createWod: RequestHandler<{id: string}> = async (req, res, next) => {
        const createRequest = await transformAndValidate(WorkoutCreateRequest, req.body);
        const createdWod = await this.unitsService.createWod(req.params.id, createRequest);

        res.status(200).json(createdWod);
    }

    public updateWod: RequestHandler<{id: string, wodId: string}> = async (req, res, next) => {
        const updateRequest = await transformAndValidate(WorkoutCreateRequest, req.body);
        const updatedWod = await this.unitsService.updateWod(
            req.params.id,
            req.params.wodId,
            updateRequest);

        res.status(200).json(updatedWod);
    }

    public deleteWod: RequestHandler<{id: string, wodId: string}> = async (req, res, next) => {
        await this.unitsService.deleteWod(req.params.id, req.params.wodId);

        res.status(200).send();
    }
}