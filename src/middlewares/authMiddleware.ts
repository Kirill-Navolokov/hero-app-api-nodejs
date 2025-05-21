import { NextFunction, Request, Response } from "express";
import { HeroBookError } from "../helpers/heroBookError";
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { iocContainer } from "../inversify.config";
import { EnvConfig } from "../config/environment";
import { TYPES } from "../types";
import { UserEntity } from "../dal/entities/userEntity";
import { rolesConstants } from "../helpers/rolesConstants";

export const authMiddleware = ( req: Request, res: Response, next: NextFunction) => {
    var authHeader = req.header("authorization");
    if(!authHeader)
        throw HeroBookError.fromUnauthorized();
    var token = authHeader.split(' ')[1];
    var envConfig = iocContainer.get<EnvConfig>(TYPES.EnvConfig);

    var user:UserEntity;
    try {
        user = jwt.verify(token, envConfig.jwtSecretKey) as UserEntity;
    } catch(error) {
        var message = undefined;
        if(error instanceof TokenExpiredError)
            message = `Token expired at ${(error as TokenExpiredError).expiredAt.toUTCString()}`;

        throw HeroBookError.fromUnauthorized(message);
    }

    var index = user.roles?.indexOf(rolesConstants.admin);
    if(index == undefined || index == -1)
        throw HeroBookError.fromUnauthorized("Not enough rights");

    next();
}