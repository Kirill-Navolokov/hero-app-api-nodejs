import express from 'express';
import { Application } from "express";
import { Route } from "./routes/route";

export default class App {
    private readonly app: Application;
    private readonly port: number;

    constructor(routes: Route[]) {
        this.port = 3000;
        this.app = express();

        this.app.get('/', (req, res) => {
            res.send('Hello, TypeScript with Express!');
        });
        this.initRoutes(routes);
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }

    private initRoutes(routes: Route[]) {
        routes.forEach(route => {
            this.app.use(route.path, route.router);
        });
    }
}