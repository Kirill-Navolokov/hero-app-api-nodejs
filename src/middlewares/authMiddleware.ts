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
import { RoleType } from "../dal/entities/roleEntity";

export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let user = await authenticateUser(req);
    let index = user.roles?.indexOf(RoleType.ADMIN);
    if(index == undefined || index == -1)
        throw HeroBookError.fromUnauthorized("Not enough rights");

    next();
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let user = await authenticateUser(req);

    next();
}

async function authenticateUser(req: Request): Promise<UserEntity> {
    let authHeader = req.header("Authorization");
    if(!authHeader)
        throw HeroBookError.fromUnauthorized();

    let token = authHeader.split(' ')[1];
    let envConfig = iocContainer.get<EnvConfig>(TYPES.EnvConfig);

    try {
        // if(await tryGoogleAuth(token, envConfig.googleClientId)) {
            
        // }
        let user = jwt.verify(token, envConfig.jwtSecretKey) as UserEntity;

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