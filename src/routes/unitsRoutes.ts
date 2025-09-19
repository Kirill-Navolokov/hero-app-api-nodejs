import { Router } from 'express';
import { Route } from './route';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { UnitsController } from '../controllers/unitsController';
import { adminAuthMiddleware } from '../middlewares/authMiddleware';
import multer from 'multer';

@injectable()
export default class UnitsRoutes implements Route {
    public readonly path: string;
    public readonly router: Router;

    constructor(@inject(TYPES.UnitsController) private unitsController: UnitsController) {
        this.router = Router();
        this.path = '/units';

        this.mapRoutes();
    }

    mapRoutes(): void {
        const upload = multer({storage: multer.memoryStorage()});

        this.router.get('/', this.unitsController.getUnits);
        this.router.get('/:id', this.unitsController.getUnit);
        //this.router.post('/', adminAuthMiddleware, upload.single('image'), this.unitsController.createUnit);
        this.router.put('/:id', adminAuthMiddleware, upload.single('image'), this.unitsController.updateUnit);
        this.router.delete('/:id', adminAuthMiddleware, this.unitsController.deleteUnit);

        this.router.get('/:id/wods', this.unitsController.getWods);
        this.router.post('/:id/wods', adminAuthMiddleware, this.unitsController.createWod);
        this.router.put('/:id/wods/:wodId', adminAuthMiddleware, this.unitsController.updateWod);
        this.router.delete('/:id/wods/:wodId', adminAuthMiddleware, this.unitsController.deleteWod);
    }
}