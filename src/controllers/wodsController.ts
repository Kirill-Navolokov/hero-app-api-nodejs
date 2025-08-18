import { RequestHandler } from "express";
import WodsService from "../services/wodsService";
import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import { WodCreateRequest } from "../apiRequests/wodCreateRequest";
import { transformAndValidate, validateImage } from "../helpers/functions";

@injectable()
export class WodsController {
    constructor(@inject(TYPES.WodsService) private readonly wodsService: WodsService) {
    }

    public getWods: RequestHandler = async (req, res, next) => {
        const wods = await this.wodsService.get();

        res.status(200).json(wods);
    }

    public getWod: RequestHandler<{id: string}> = async (req, res, next) => {
        const wod = await this.wodsService.getById(req.params.id);

        res.status(200).json(wod);
    }

    public deleteWod: RequestHandler<{id: string}> = async (req, res, next) => {
        await this.wodsService.delete(req.params.id);

        res.status(200).send();
    }

    public createWod: RequestHandler = async (req, res, next) => {
        const createRequest = await transformAndValidate(WodCreateRequest, req.body);
        await validateImage(req.file!);
        const createdWod = await this.wodsService.create(req.file!, createRequest);

        res.status(200).json(createdWod);
    }

    public updateWod: RequestHandler<{id: string}> = async (req, res) => {
        if(req.file)
            await validateImage(req.file);
        const updateRequest = await transformAndValidate(WodCreateRequest, req.body);
        const updatedWod = await this.wodsService.update(
            req.params.id,
            updateRequest,
            req.file);

        res.status(200).json(updatedWod);
    }
}