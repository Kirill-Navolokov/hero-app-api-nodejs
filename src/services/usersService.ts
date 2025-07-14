import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { UsersRepository } from "../dal/repositories/usersRepository";
import { UserEntity } from "../dal/entities/userEntity";
import { SignUpRequest } from "../apiRequests/signUpRequest";
import { encryptPassword } from "../helpers/functions";
import { ObjectId } from "mongodb";
import { toModel } from "../mappings/usersMapper";
import { User } from "../models/user";

@injectable()
export class UsersService {
    constructor(@inject(TYPES.UsersRepository) private usersRepository: UsersRepository) {
    }

    public getByEmail(email: string): Promise<User | null> {
        return this.usersRepository.getByEmail(email)
            .then(entity => entity == null ? null : toModel(entity));
    }

    public checkExists(email: string, username: string): Promise<UserEntity | null> {
        return this.usersRepository.checkExists(email, username);
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

    public async create(signUpRequest: SignUpRequest): Promise<User> {
        var encryptedPassword = await encryptPassword(signUpRequest.password);
        var userEntity: UserEntity = {
            _id: new ObjectId(),
            email: signUpRequest.email,
            username: signUpRequest.username,
            encryptedPassword: encryptedPassword,
            roles: []
        };
        var newUser = await this.usersRepository.create(userEntity)
            .then(toModel);

        return newUser;
    }
}