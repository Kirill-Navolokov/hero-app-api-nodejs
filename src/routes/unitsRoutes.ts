import { Router } from 'express';
import { Route } from './route';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { UnitsController } from '../controllers/unitsController';
import { adminAuthMiddleware, authMiddleware } from '../middlewares/authMiddleware';

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
        this.router.get('/', this.unitsController.getUnits);
        this.router.get('/:id', this.unitsController.getUnit);
        this.router.post('/', adminAuthMiddleware, this.unitsController.createUnit);
        this.router.patch('/:id', adminAuthMiddleware, this.unitsController.updateUnit);
        this.router.delete('/:id', adminAuthMiddleware, this.unitsController.deleteUnit);

        this.router.get('/:id/wods', this.unitsController.getWods);
        // this.router.get('/:id/wods/:wodId', authMiddleware, this.unitsController.getWod);
        // this.router.post('/:id/wods', adminAuthMiddleware, this.unitsController.createWod);
        // this.router.patch('/:id/wods/:wodId', adminAuthMiddleware, this.unitsController.updateWod);
        // this.router.delete('/:id/wods/:wodId', adminAuthMiddleware, this.unitsController.deleteWod);
    }
}