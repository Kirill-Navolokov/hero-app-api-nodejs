import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { SupportService } from "../services/supportService";
import { RequestHandler } from "express";

@injectable()
export class SupportController {
    constructor(
        @inject(TYPES.SupportService) private readonly supportService: SupportService
    ) {
    }

    public getAdvices: RequestHandler = async (req, res, next) => {
        var advices = await this.supportService.getAdvices();

        return res.status(200).json(advices);
    }

    public getFaqs: RequestHandler = async (req, res, next) => {
        var faqs = await this.supportService.getFaqs();

        return res.status(200).json(faqs);
    }
}