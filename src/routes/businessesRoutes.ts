import { Router } from "express";
import { inject, injectable } from "inversify";
import { Route } from "./route";
import { TYPES } from "../types";
import { BusinessesController } from "../controllers/businessesController";
import multer from "multer";
import { adminAuthMiddleware } from "../middlewares/authMiddleware";

@injectable()
export class BusinessesRoutes implements Route {
    public readonly path: string;
    public readonly router: Router

    constructor(@inject(TYPES.BusinessesController) private businessesController: BusinessesController
    ) {
        this.router = Router();
        this.path = '/businesses';

        this.mapRoutes();
    }

    mapRoutes(): void {
        const upload = multer({storage: multer.memoryStorage()});

        this.router.get('/', this.businessesController.getBusinesses);
        this.router.get('/:id', adminAuthMiddleware, this.businessesController.getBusiness);
        this.router.post('/', adminAuthMiddleware, upload.single('image'), this.businessesController.create);
        this.router.put('/:id', adminAuthMiddleware, upload.single('image'), this.businessesController.update);
        this.router.delete('/:id', adminAuthMiddleware, this.businessesController.delete);
    }
}