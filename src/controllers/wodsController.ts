import { RequestHandler } from "express";
import WodsService from "../services/wodsService";
import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import { WodCreateRequest } from "../apiRequests/wodCreateRequest";
import { WodUpdateRequest } from "../apiRequests/wodUpdateRequest";

@injectable()
export class WodsController {
    constructor(@inject(TYPES.WodsService) private wodsService: WodsService) {
    }

    public getWods: RequestHandler = async (req, res, next) => {
        var wods = await this.wodsService.get();

        res.status(200).json(wods);
    }

    public getWod: RequestHandler<{id: string}> = async (req, res, next) => {
        var wod = await this.wodsService.getById(req.params.id);
        var statusCode = wod == null ? 404 : 200;
        var result = wod == null ? `No wods found by id: ${req.params.id}` : wod;

        res.status(statusCode).json(result);
    }

    public deleteWod: RequestHandler<{id: string}> = async (req, res, next) => {
        await this.wodsService.delete(req.params.id);

        res.status(200).send();
    }

    public createWod: RequestHandler = async (req, res, next) => {
        var createRequest = req.body as WodCreateRequest;
        var createdWod = await this.wodsService.create(createRequest);

        res.status(200).json(createdWod);
    }

    public updateWod: RequestHandler<{id: string}> = (req, res, next) => {
        var wodId = req.params.id;
        var updateRequest = req.body as WodUpdateRequest;
        var updatedWod = this.wodsService.update(wodId, updateRequest);
        var statusCode = updatedWod == null ? 404 : 200;
        var result = updatedWod == null ? `No wods found by id: ${req.params.id}` : updatedWod;

        res.status(statusCode).json(result);
    }
}