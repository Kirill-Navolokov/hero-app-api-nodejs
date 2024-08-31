import { Router } from 'express';
import { WodsController } from '../controllers/wodsController';
import { Route } from './route';

export default class WodsRoutes implements Route {
    private readonly wodsController: WodsController;

    public readonly path: string;
    public readonly router: Router;

    constructor(wodsController: WodsController) {
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