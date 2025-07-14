import { NextFunction, Request, Response } from "express";
import { HeroBookError } from "../helpers/heroBookError";
import { OAuth2Client } from "google-auth-library";
import { iocContainer } from "../inversify.config";
import { EnvConfig } from "../config/environment";
import { TYPES } from "../types";

//const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client();
// async function verify() {
//   const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: WEB_CLIENT_ID,  // Specify the WEB_CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const userid = payload['sub'];
//   // If the request specified a Google Workspace domain:
//   // const domain = payload['hd'];
// }
//verify().catch(console.error);

export const googleAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    var authHeader = req.header("authorization");
    if(!authHeader)
        throw HeroBookError.fromUnauthorized();

    var token = authHeader.split(' ')[1];
    var envConfig = iocContainer.get<EnvConfig>(TYPES.EnvConfig);
    var oauthClient = new OAuth2Client();
    var loginTicket = await oauthClient.verifyIdToken({
        idToken: token,
        audience: envConfig.googleClientId
    });
    var payload = loginTicket.getPayload();
    //var envConfig = iocContainer.get<EnvConfig>(TYPES.EnvConfig);

}