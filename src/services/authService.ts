import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { LoginRequest } from "../apiRequests/loginRequest";
import { HeroBookError } from "../helpers/heroBookError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { EnvConfig } from "../config/environment";
import { SignUpRequest } from "../apiRequests/signUpRequest";
import { UsersService } from "./usersService";
import { LoginResponse } from "../models/loginResponse";
import type { StringValue } from "ms";
import { TokensResponse } from "../models/tokensResponse";
import { UserEntity } from "../dal/entities/userEntity";

@injectable()
export class AuthService {
    constructor(
        @inject(TYPES.UsersService) private usersService: UsersService,
        @inject(TYPES.EnvConfig) private envConfig: EnvConfig) {
    }

    public async authenticateUser(loginRequest: LoginRequest) : Promise<LoginResponse> {
        var user = await this.usersService.getByEmail(loginRequest.email);
        if(!user)
            throw HeroBookError.fromUnauthorized();

        var isPasswordCorrect = await bcrypt.compare(
            loginRequest.password,
            user.encryptedPassword);
        if(!isPasswordCorrect)
            throw HeroBookError.fromUnauthorized();

        if(!user.passedSignUp)
            await this.usersService.setSignedUp(user._id);

        return await this.getLoginResponse(user);
    }

    public async signUp(signUpRequest: SignUpRequest): Promise<LoginResponse|null> {
        let user = await this.usersService.checkExists(signUpRequest.email);
        if(!user)
            throw new HeroBookError("User not exists", 404);

        if(user.passedSignUp)
            throw new HeroBookError("Already signed up", 400);

        if(user.otp != signUpRequest.otp)
            throw HeroBookError.fromUnauthorized("Wrong otp provided");

        await this.usersService.setPassword(user._id, signUpRequest.password);
        return await this.getLoginResponse(user);
    }

    public async refreshTokens(refreshToken: string): Promise<TokensResponse> {
        var userEntity = jwt.verify(refreshToken, this.envConfig.jwtSecretKey) as UserEntity;
        var user = await this.usersService.getByEmail(userEntity.email);

        return this.getTokenResponse(user!)
    }

    private async getLoginResponse(user: UserEntity): Promise<LoginResponse> {
        const response: LoginResponse = {
            user: {
                email: user.email,
                type: user.roles[0]
            },
            tokens: this.getTokenResponse(user)
        };
        await this.usersService.setRefreshToken(user._id, response.tokens.refreshToken);

        return response;
    }

    private getTokenResponse(user: UserEntity): TokensResponse {
        return {
            accessToken: this.generateAccessToken(user, '1h'),
            refreshToken: this.generateAccessToken(user, '2h')
        }
    }

    private generateAccessToken(user: UserEntity, expiration: StringValue): string {
        var token = jwt.sign(
            {id: user._id.toString(), email: user.email, roles: user.roles},
            this.envConfig.jwtSecretKey,
            {expiresIn: expiration, algorithm: "HS256"});
        return token;
    }
}