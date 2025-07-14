import { transformAndValidate } from "class-transformer-validator";
import { RequestHandler } from "express";
import { inject, injectable } from "inversify";
import { LoginRequest } from "../apiRequests/loginRequest";
import { TYPES } from "../types";
import { AuthService } from "../services/authService";
import { SignUpRequest } from "../apiRequests/signUpRequest";

@injectable()
export class AuthController {
    constructor(@inject(TYPES.AuthService) private authService: AuthService) {
    }

    public login: RequestHandler = async (req, res, next) => {
        var loginRequest = await transformAndValidate(
            LoginRequest,
            req.body as object);
        var loginResponse = await this.authService.authenticateUser(loginRequest);

        res.status(200).json(loginResponse);
    }

    public signUp: RequestHandler = async (req, res, next) => {
        var signUpRequest = await transformAndValidate(
            SignUpRequest,
            req.body as object);
        var response = await this.authService.signUp(signUpRequest);

        res.status(200).json(response);
    }

    public tokenRefresh: RequestHandler = async (req, res, next) => {
        var refreshToken = req.headers.authorization!.split(' ')[1];
        var tokenRefreshResponse = await this.authService.refreshTokens(refreshToken);

        res.status(200).json(tokenRefreshResponse);
    }
}