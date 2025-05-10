import { Router } from 'express';
import { Route } from './route';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { UnitsController } from '../controllers/unitsController';

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
        //this.router.post('/', this.unitsController.createUnit);
        //this.router.patch('/:id', this.unitsController.updateUnit);
        this.router.delete('/:id', this.unitsController.deleteUnit);
    }
}