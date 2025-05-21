import { Router } from "express";
import { Route } from "./route";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { AuthController } from "../controllers/authController";

@injectable()
export default class AuthRoutes implements Route {
    public readonly path: string;
    public readonly router: Router;

    constructor(@inject(TYPES.AuthController) private authController: AuthController) {
        this.router = Router();
        this.path = '';

        this.mapRoutes();
    }

    mapRoutes(): void {
        this.router.post('/login', this.authController.login);
    }
}