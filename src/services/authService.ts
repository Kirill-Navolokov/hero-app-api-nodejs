import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { UsersRepository } from "../dal/repositories/usersRepository";
import { LoginRequest } from "../apiRequests/loginRequest";
import { HeroBookError } from "../helpers/heroBookError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { EnvConfig } from "../config/environment";

@injectable()
export class AuthService {
    constructor(
        @inject(TYPES.UsersRepository) private usersRepository: UsersRepository,
        @inject(TYPES.EnvConfig) private envConfig: EnvConfig) {
    }

    public async authenticateUser(loginRequest: LoginRequest) : Promise<string> {
        var user = await this.usersRepository.getByEmail(loginRequest.email);
        if(!user)
            throw HeroBookError.fromUnauthorized();

        var isPasswordCorrect = await bcrypt.compare(
            loginRequest.password,
            user.encryptedPassword);
        if(!isPasswordCorrect)
            throw HeroBookError.fromUnauthorized();

        var token = jwt.sign(
            {email: user.email, username: user.username, roles: user.roles},
            this.envConfig.jwtSecretKey,
            {expiresIn: '15m', algorithm: "HS256"});

        return token;
    }
}