import { ObjectId } from "mongodb";
import { RoleType } from "./roleEntity";

export interface UserEntity {
    _id: ObjectId,
    email: string;
    encryptedPassword: string;
    roles: RoleType[];
    passedSignUp: boolean;
    otp?: string;
    tgUserId?: number;
    refreshToken?: string;
}