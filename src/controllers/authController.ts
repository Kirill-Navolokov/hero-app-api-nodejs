import { RequestHandler } from "express";
import { inject, injectable } from "inversify";
import { LoginRequest } from "../apiRequests/loginRequest";
import { TYPES } from "../types";
import { AuthService } from "../services/authService";
import { SignUpRequest } from "../apiRequests/signUpRequest";
import { transformAndValidate } from "../helpers/functions";

@injectable()
export class AuthController {
    constructor(@inject(TYPES.AuthService) private authService: AuthService) {
    }

    public login: RequestHandler = async (req, res, next) => {
        const loginRequest = await transformAndValidate(LoginRequest, req.body);
        const loginResponse = await this.authService.authenticateUser(loginRequest);

        res.status(200).json(loginResponse);
    }

    public signUp: RequestHandler = async (req, res, next) => {
        var signUpRequest = await transformAndValidate(SignUpRequest, req.body);
        var response = await this.authService.signUp(signUpRequest);

        res.status(200).json(response);
    }

    public tokenRefresh: RequestHandler = async (req, res, next) => {
        var refreshToken = req.headers.authorization!.split(' ')[1];
        var tokenRefreshResponse = await this.authService.refreshTokens(refreshToken);

        res.status(200).json(tokenRefreshResponse);
    }
}