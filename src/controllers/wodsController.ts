import { RequestHandler } from "express";
import WodsService from "../services/wodsService";
import { Wod } from '../models/wod';
import { TYPES } from "../types";
import { inject, injectable } from "inversify";

@injectable()
export class WodsController {
    constructor(@inject(TYPES.WodsService) private wodsService: WodsService) {
    }

    public getWods: RequestHandler = async (req, res, next) => {
        var wods = await this.wodsService.getWods();

        res.status(200).json(wods);
    }

    public getWod: RequestHandler<{id: number}> = (req, res, next) => {
        var wodId = req.params.id;
        var wod = this.wodsService.getWod(wodId);

        res.status(200).json(wod);
    }

    public createWod: RequestHandler = (req, res, next) => {
        var newWod = req.body as Wod;
        var addedWod = this.wodsService.createWod(newWod);

        res.status(200).json(addedWod);
    }

    public updateWod: RequestHandler<{id: number}> = (req, res, next) => {
        var wodId = req.params.id;
        var wodUpdate = req.body as Wod;
        var updatedWod = this.wodsService.updateWod(wodId, wodUpdate);

        res.status(200).json(updatedWod);
    }

    public deleteWod: RequestHandler<{id: number}> = (req, res, next) => {
        var wodId = req.params.id;
        this.wodsService.deleteWod(wodId);

        res.status(200);
    }
}