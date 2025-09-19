import { UserEntity } from "../dal/entities/userEntity";
import { User } from "../models/user";

export function toModel(entity: UserEntity): User {
    return {
        id: entity._id.toString(),
        email: entity.email,
        roles: entity.roles,
        passedSignUp: entity.passedSignUp,
        otp: entity.otp,
        tgUserId: entity.tgUserId
    };
}