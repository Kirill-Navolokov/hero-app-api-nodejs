import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { BusinessesService } from "../services/businessesService";
import { RequestHandler } from "express";

@injectable()
export class BusinessesController {
    constructor(
        @inject(TYPES.BusinessesService) private readonly businessesService: BusinessesService
    ) {
    }

    public get: RequestHandler = async(req, res, next) => {
        var businessesResp = await this.businessesService.getBusinesses();

        res.status(200).json(businessesResp);
    }
}