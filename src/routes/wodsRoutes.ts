import { Router } from 'express';
import { WodsController } from '../controllers/wodsController';
import { Route } from './route';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';

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
        this.router.get('/', this.wodsController.getWods);
        this.router.get('/:id', this.wodsController.getWod);
        this.router.post('/', this.wodsController.createWod);
        this.router.patch('/:id', this.wodsController.updateWod);
        this.router.delete('/:id', this.wodsController.deleteWod);
    }
}