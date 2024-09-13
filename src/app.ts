import express from 'express';
import { Application } from "express";
import "reflect-metadata";
import { iocContainer } from './inversify.config';
import WodsRoutes from './routes/wodsRoutes';
import { TYPES } from './types';
import { Route } from './routes/route';
import HeroDb from './db/dbConnection';

export default class App {
    private readonly app: Application;
    private readonly port: number;

    constructor() {
        this.port = 3000;
        this.app = express();

        this.app.get('/', (req, res) => {
            res.send('Hello, TypeScript with Express!');
        });
        this.registerRoutes();
    }

    public start() {
        var db = iocContainer.get<HeroDb>(TYPES.Db);
        //await db.setupDbConnection();
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }

    private registerRoutes() {
        this.getRoutes()
            .forEach(route => {
                this.app.use(route.path, route.router);
            });
    }

    private getRoutes(): Route[] {
        var wodsRoutes = iocContainer.get<WodsRoutes>(TYPES.WodsRoutes);

        return [wodsRoutes];
    }
}