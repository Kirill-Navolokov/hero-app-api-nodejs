import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { LoginRequest } from "../apiRequests/loginRequest";
import { HeroBookError } from "../helpers/heroBookError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { EnvConfig } from "../config/environment";
import { SignUpRequest } from "../apiRequests/signUpRequest";
import { UsersService } from "./usersService";
import { SignUpResponse } from "../models/signUpResponse";
import { User } from "../models/user";
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

        return {
            userInfo: {
                email: user.email,
                username: user.username
            },
            tokens: {
                accessToken: this.generateAccessToken(user, '1h'),
                refreshToken: this.generateAccessToken(user, '2h')
            }
        }
    }

    public async signUp(signUpRequest: SignUpRequest): Promise<SignUpResponse> {
        var user = await this.usersService.checkExists(
            signUpRequest.email,
            signUpRequest.username);

        if(!user) {
            var createdUser = await this.usersService.create(signUpRequest);
            return {
                user: {
                    email: createdUser.email,
                    username: createdUser.username
                },
                accessToken: this.generateAccessToken(createdUser, '5m')
            };
        } else {
            var message = user.email.toLowerCase() == signUpRequest.email.toLowerCase()
                ? "Email already in use"
                : "Username already in use";
            
            throw new HeroBookError(message, 400);
        }
    }

    public async refreshTokens(refreshToken: string): Promise<TokensResponse> {
        var userEntity = jwt.verify(refreshToken, this.envConfig.jwtSecretKey) as UserEntity;
        var user = await this.usersService.getByEmail(userEntity.email);

        return {
            accessToken: this.generateAccessToken(user!, '5m'),
            refreshToken: this.generateAccessToken(user!, '10m')
        }
    }

    private generateAccessToken(user: User, expiration: StringValue): string {
        var token = jwt.sign(
            {id: user.id, email: user.email, username: user.username, roles: user.roles},
            this.envConfig.jwtSecretKey,
            {expiresIn: expiration, algorithm: "HS256"});
        return token;
    }
}