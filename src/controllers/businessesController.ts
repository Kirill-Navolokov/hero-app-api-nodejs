import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { BusinessesService } from "../services/businessesService";
import { RequestHandler } from "express";
import { transformAndValidate, validateImage } from "../helpers/functions";
import { BusinessCreateRequest } from "../apiRequests/businessCreateRequest";

@injectable()
export class BusinessesController {
    constructor(
        @inject(TYPES.BusinessesService) private readonly businessesService: BusinessesService
    ) {
    }

    public getBusinesses: RequestHandler = async(req, res, next) => {
        var businessesResp = await this.businessesService.getBusinesses();

        res.status(200).json(businessesResp);
    }

    public getBusiness: RequestHandler<{id: string}> = async(req,res, next) => {
        const business = await this.businessesService.getById(req.params.id);

        res.status(200).json(business);
    }

    public create: RequestHandler = async(req,res, next) => {
        const createRequest = await transformAndValidate(BusinessCreateRequest, req.body);
        await validateImage(req.file!);
        const createdBusiness = await this.businessesService.create(req.file!, createRequest);

        res.status(200).json(createdBusiness);
    }

    public update: RequestHandler<{id: string}> = async(req,res, next) => {
        if(req.file)
            await validateImage(req.file);
        const updateRequest = await transformAndValidate(BusinessCreateRequest, req.body);
        const updatedBusiness = await this.businessesService.update(
            req.params.id,
            updateRequest,
            req.file);

        res.status(200).json(updatedBusiness);
    }

    public delete: RequestHandler<{id: string}> = async(req,res, next) => {
        await this.businessesService.delete(req.params.id);

        res.status(200).send();
    }
}