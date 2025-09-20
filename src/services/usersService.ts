import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { UsersRepository } from "../dal/repositories/usersRepository";
import { UserEntity } from "../dal/entities/userEntity";
import { SignUpRequest } from "../apiRequests/signUpRequest";
import { encryptPassword } from "../helpers/functions";
import { ObjectId } from "mongodb";
import { toModel } from "../mappings/usersMapper";
import { User } from "../models/user";
import { RoleType } from "../dal/entities/roleEntity";

@injectable()
export class UsersService {
    constructor(@inject(TYPES.UsersRepository) private usersRepository: UsersRepository) {
    }

    public getByEmail(email: string): Promise<UserEntity | null> {
        return this.usersRepository.getByEmail(email);
    }

    public checkExists(email: string): Promise<UserEntity | null> {
        return this.usersRepository.checkExists(email);
    }

    public async setPassword(userId: ObjectId, password: string): Promise<void> {
        const encryptedPassword = await encryptPassword(password);
        await this.usersRepository.setPassword(userId, encryptedPassword);
    }

    public setRefreshToken(userId: ObjectId, refreshToken: string): Promise<void> {
        return this.usersRepository.setRefreshToken(userId, refreshToken);
    }

    public async setSignedUp(id: ObjectId): Promise<void> {
        return this.usersRepository.setSignedUp(id);
    }

    // public async createOAuthUser(): Promise<User> {
    //     var userEntity: UserEntity = {
    //         _id: new ObjectId(),
    //         email: signUpRequest.email,
    //         username: signUpRequest.username,
    //         encryptedPassword: encryptedPassword,
    //         roles: []
    //     };
    //     var newUser = await this.usersRepository.create(userEntity)
    //         .then(toModel);

    //     return newUser;
    // }

    public async create(signUpRequest: SignUpRequest, roles: RoleType[]): Promise<User> {
        var encryptedPassword = await encryptPassword(signUpRequest.password);
        var userEntity: UserEntity = {
            _id: new ObjectId(),
            email: signUpRequest.email,
            encryptedPassword: encryptedPassword,
            roles: roles,
            passedSignUp: true
        };
        var newUser = await this.usersRepository.create(userEntity)
            .then(toModel);

        return newUser;
    }
}