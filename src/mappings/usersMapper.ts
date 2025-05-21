import { UserEntity } from "../dal/entities/userEntity";
import { User } from "../models/user";

export function toModel(entity: UserEntity): User {
    return {
        id: entity._id.toString(),
        email: entity.email,
        username: entity.username,
        encryptedPassword: entity.encryptedPassword,
        roles: entity.roles
    };
}