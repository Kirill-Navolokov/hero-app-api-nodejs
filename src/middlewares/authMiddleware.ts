import { NextFunction, Request, Response } from "express";
import { HeroBookError } from "../helpers/heroBookError";
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { iocContainer } from "../inversify.config";
import { EnvConfig } from "../config/environment";
import { TYPES } from "../types";
import { UserEntity } from "../dal/entities/userEntity";
import { rolesConstants } from "../helpers/rolesConstants";
import { OAuth2Client } from "google-auth-library";
import { UsersService } from "../services/usersService";
import { User } from "../models/user";

export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    var user = await authenticateUser(req);
    var index = user.roles?.indexOf(rolesConstants.admin);
    if(index == undefined || index == -1)
        throw HeroBookError.fromUnauthorized("Not enough rights");

    next();
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    var user = await authenticateUser(req);

    next();
}

async function authenticateUser(req: Request): Promise<UserEntity> {
    var authHeader = req.header("Authorization");
    console.log(req.originalUrl);
    if(!authHeader)
        throw HeroBookError.fromUnauthorized();

    var token = authHeader.split(' ')[1];
    var envConfig = iocContainer.get<EnvConfig>(TYPES.EnvConfig);

    try {
        // if(await tryGoogleAuth(token, envConfig.googleClientId)) {
            
        // }

        var user = jwt.verify(token, envConfig.jwtSecretKey) as UserEntity;

        return user;
    } catch(error) {
        var message = undefined;
        if(error instanceof TokenExpiredError)
            message = `Token expired at ${(error as TokenExpiredError).expiredAt.toUTCString()}`;

        throw HeroBookError.fromUnauthorized(message);
    }
}

// async function tryGoogleAuth(token: string, googleClientId: string): Promise<UserEntity|null> {
//     try
//     {
//         var oauthClient = new OAuth2Client();
//         var loginTicket = await oauthClient.verifyIdToken({
//             idToken: token,
//             audience: googleClientId
//         });
//         var payload = loginTicket.getPayload();
//         if(!payload)
//             return null;

//         var userService = iocContainer.get<UsersService>(TYPES.UsersService);
//         var user = await userService.checkExists(payload.email!, '');
//         if(user)
//             return user;
//         var a: SignInRequest = {

//         }
//         userService.create()

//         return true;
//     } catch(error) {
//         console.log(error);
//         return null;
//     }
// }