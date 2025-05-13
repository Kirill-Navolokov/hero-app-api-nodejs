import { NextFunction, Request, Response } from "express";
import { iocContainer } from "../inversify.config";
import { EnvConfig } from "../config/environment";
import { TYPES } from "../types";

export const exceptionMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    var envConfig = iocContainer.get<EnvConfig>(TYPES.EnvConfig);
    if(envConfig.nodeEnv == 'local')
        console.log(err);

    res.status(500).send({"Error": "Something went wrong"});
}