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
        this.router.get('/', authMiddleware, this.unitsController.getUnits);
        this.router.get('/:id', authMiddleware, this.unitsController.getUnit);
        this.router.post('/', adminAuthMiddleware, this.unitsController.createUnit);
        this.router.patch('/:id', adminAuthMiddleware, this.unitsController.updateUnit);
        this.router.delete('/:id', adminAuthMiddleware, this.unitsController.deleteUnit);
    }
}