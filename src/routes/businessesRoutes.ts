import { Router } from "express";
import { inject, injectable } from "inversify";
import { Route } from "./route";
import { TYPES } from "../types";
import { BusinessesController } from "../controllers/businessesController";

@injectable()
export class BusinessesRoutes implements Route {
    public readonly path: string;
    public readonly router: Router

    constructor(
        @inject(TYPES.BusinessesController) private businessesController: BusinessesController
    ) {
        this.router = Router();
        this.path = '/businesses';

        this.mapRoutes();
    }

    mapRoutes(): void {
        this.router.get('/', this.businessesController.get);
    }

}