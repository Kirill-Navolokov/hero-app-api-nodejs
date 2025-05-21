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

@injectable()
export class AuthService {
    constructor(
        @inject(TYPES.UsersService) private usersService: UsersService,
        @inject(TYPES.EnvConfig) private envConfig: EnvConfig) {
    }

    public async authenticateUser(loginRequest: LoginRequest) : Promise<string> {
        var user = await this.usersService.getByEmail(loginRequest.email);
        if(!user)
            throw HeroBookError.fromUnauthorized();

        var isPasswordCorrect = await bcrypt.compare(
            loginRequest.password,
            user.encryptedPassword);
        if(!isPasswordCorrect)
            throw HeroBookError.fromUnauthorized();

        return this.generateAccessToken(user);
    }

    public async signUp(signUpRequest: SignUpRequest): Promise<SignUpResponse> {
        var user = await this.usersService.checkExists(
            signUpRequest.email,
            signUpRequest.username);

        if(!user) {
            var createdUser = await this.usersService.create(signUpRequest);
            return {
                user: {
                    id: createdUser.id,
                    email: createdUser.email,
                    username: createdUser.username
                },
                accessToken: this.generateAccessToken(createdUser)
            };
        } else {
            var message = user.email.toLowerCase() == signUpRequest.email.toLowerCase()
                ? "Email already in use"
                : "Username already in use";
            
            throw new HeroBookError(message, 400);
        }
    }

    private generateAccessToken(user: User): string {
        var token = jwt.sign(
            {id: user.id, email: user.email, username: user.username, roles: user.roles},
            this.envConfig.jwtSecretKey,
            {expiresIn: '5m', algorithm: "HS256"});
        return token;
    }
}