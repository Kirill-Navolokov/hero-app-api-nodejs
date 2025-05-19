import { NextFunction, Request, Response } from "express";
import { iocContainer } from "../inversify.config";
import { EnvConfig } from "../config/environment";
import { TYPES } from "../types";
import { ValidationResponse } from "../helpers/validationResponse";

export const exceptionMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    var envConfig = iocContainer.get<EnvConfig>(TYPES.EnvConfig);
    if(envConfig.nodeEnv == 'local')
        console.log(err);

    if(Array.isArray(err))
        res.status(400).json(new ValidationResponse(err))
    else
        res.status(500).send({"Error": "Something went wrong"});
}