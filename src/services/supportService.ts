import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { SupportRepository } from "../dal/repositories/supportRepository";
import { Advices } from "../models/advices";
import { Faq } from "../models/faq";

@injectable()
export class SupportService {
    constructor(
        @inject(TYPES.SupportRepository) private readonly supportRepository: SupportRepository
    ) {
    }

    public async getAdvices(): Promise<Advices[]> {
        var entity = await this.supportRepository.getAdvices();

        return entity.advices;
    }

    public async getFaqs(): Promise<Faq[]> {
        var entity = await this.supportRepository.getFaqs();

        return entity.faqs;
    }
}