import { Router } from 'express';
import { WodsController } from '../controllers/wodsController';
import { Route } from './route';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { adminAuthMiddleware, authMiddleware } from '../middlewares/authMiddleware';

@injectable()
export default class WodsRoutes implements Route {
    public readonly path: string;
    public readonly router: Router;

    constructor(@inject(TYPES.WodsController) private wodsController: WodsController) {
        this.router = Router();
        this.path = '/wods';
        this.wodsController = wodsController;

        this.mapRoutes();
    }

    mapRoutes(): void {
        this.router.get('/', authMiddleware, this.wodsController.getWods);
        this.router.get('/:id', authMiddleware, this.wodsController.getWod);
        this.router.post('/', adminAuthMiddleware, this.wodsController.createWod);
        this.router.patch('/:id', adminAuthMiddleware, this.wodsController.updateWod);
        this.router.delete('/:id', adminAuthMiddleware, this.wodsController.deleteWod);
    }
}