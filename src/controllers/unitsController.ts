import { RequestHandler } from "express";
import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import UnitsService from "../services/unitsService";
import { UnitUpdateRequest } from "../apiRequests/unitUpdateRequest";
import { UnitCreateRequest } from "../apiRequests/unitCreateRequest";

@injectable()
export class UnitsController {
    constructor(@inject(TYPES.UnitsService) private unitsService: UnitsService) {
    }

    public getUnits: RequestHandler = async (req, res, next) => {
        var units = await this.unitsService.get();

        res.status(200).json(units);
    }

    public getUnit: RequestHandler<{id: string}> = async (req, res, next) => {
        var unit = await this.unitsService.getById(req.params.id);
        var statusCode = unit == null ? 404 : 200;
        var result = unit == null ? `No units found by id: ${req.params.id}` : unit;

        res.status(statusCode).json(result);
    }

    public deleteUnit: RequestHandler<{id: string}> = async (req, res, next) => {
        await this.unitsService.delete(req.params.id);

        res.status(200).send();
    }

    public createUnit: RequestHandler = async (req, res, next) => {
        var createRequest = req.body as UnitCreateRequest;
        var createdUnit = await this.unitsService.create(createRequest);

        res.status(200).json(createdUnit);
    }

    public updateUnit: RequestHandler<{id: string}, any, UnitUpdateRequest> = async (req, res, next) => {
        var unitId = req.params.id;
        var updateRequest = req.body as UnitUpdateRequest;
        var updatedUnit = await this.unitsService.update(unitId, updateRequest);
        var statusCode = updatedUnit == null ? 404 : 200;
        var result = updatedUnit == null ? `No units found by id: ${req.params.id}` : updatedUnit;

        res.status(statusCode).json(result);
    }
}