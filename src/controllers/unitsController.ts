import { RequestHandler } from "express";
import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import UnitsService from "../services/unitsService";

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

    // public createWod: RequestHandler = (req, res, next) => {
    //     var newWod = req.body as Wod;
    //     var addedWod = this.unitsService.createWod(newWod);

    //     res.status(200).json(addedWod);
    // }

    // public updateWod: RequestHandler<{id: number}> = (req, res, next) => {
    //     var wodId = req.params.id;
    //     var wodUpdate = req.body as Wod;
    //     var updatedWod = this.unitsService.updateWod(wodId, wodUpdate);

    //     res.status(200).json(updatedWod);
    // }

    public deleteUnit: RequestHandler<{id: string}> = async (req, res, next) => {
        await this.unitsService.delete(req.params.id);

        res.status(200).send();
    }
}