import express from 'express';
import { Application } from "express";
import "reflect-metadata";
import { iocContainer } from './inversify.config';
import WodsRoutes from './routes/wodsRoutes';
import { TYPES } from './types';
import { Route } from './routes/route';
import { configDotenv } from 'dotenv';
import { EnvConfig } from './config/environment';
import { DbClient } from './dal/dbConnection';
import UnitsRoutes from './routes/unitsRoutes';
import 'express-async-errors'
import { exceptionMiddleware } from './middlewares/exceptionMiddleware';
import AuthRoutes from './routes/authRoutes';

export default class App {
    private readonly app: Application;

    constructor() {
        this.app = express();

        this.app.get('/', (req, res) => {
            res.send('Hello, TypeScript with Express!');
        });
        this.app.use(express.json())
        this.registerRoutes();
        this.setEnvConfig();

        this.app.use(exceptionMiddleware);
    }

    public start() {
        var dbClient = iocContainer.get<DbClient>(TYPES.DbClient);
        dbClient.initConnection().then(() => {
            var env = iocContainer.get<EnvConfig>(TYPES.EnvConfig);
            this.app.listen(env.port, () => {
                console.log(`Server is running on http://localhost:${env.port}`);
            });
        })
    }

    private registerRoutes() {
        this.getRoutes()
            .forEach(route => {
                this.app.use(route.path, route.router);
            });
    }

    private getRoutes(): Route[] {
        return [
            iocContainer.get<WodsRoutes>(TYPES.WodsRoutes),
            iocContainer.get<UnitsRoutes>(TYPES.UnitsRoutes),
            iocContainer.get<AuthRoutes>(TYPES.AuthRoutes)
        ];
    }

    private setEnvConfig() {
        var env = process.env.NODE_ENV || 'local';
        var envFilePath: string;
        switch(env) {
            case 'local':
                envFilePath = 'src/config/local.env';
                break;
            default:
                throw new Error("Env not configured");
        }

        configDotenv({path: envFilePath});
    }
}