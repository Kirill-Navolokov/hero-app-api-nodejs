import { inject, injectable } from "inversify";
import { Route } from "./route";
import { Router } from "express";
import { TYPES } from "../types";
import { SupportController } from "../controllers/supportController";
import { authMiddleware } from "../middlewares/authMiddleware";

@injectable()
export default class SupportRoutes implements Route {
    public readonly path: string;
    public readonly router: Router;

    constructor(
        @inject(TYPES.SupportController) private readonly supportController: SupportController
    ) {
        this.router = Router();
        this.path = '/support';

        this.mapRoutes();
    }

    mapRoutes(): void {
        this.router.get('/advices', this.supportController.getAdvices);
        this.router.get('/faqs', this.supportController.getFaqs);
    }
}