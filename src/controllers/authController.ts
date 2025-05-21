import { transformAndValidate } from "class-transformer-validator";
import { RequestHandler } from "express";
import { inject, injectable } from "inversify";
import { LoginRequest } from "../apiRequests/loginRequest";
import { TYPES } from "../types";
import { AuthService } from "../services/authService";

@injectable()
export class AuthController {
    constructor(@inject(TYPES.AuthService) private authService: AuthService) {
    }

    public login: RequestHandler = async (req, res, next) => {
        var loginRequest = await transformAndValidate(
            LoginRequest,
            req.body as object);
        var token = await this.authService.authenticateUser(loginRequest);

        res.status(200).json({accessToken: token});
    }
}