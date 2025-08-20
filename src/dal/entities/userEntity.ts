import { ObjectId } from "mongodb";
import { RoleType } from "./roleEntity";

export interface UserEntity {
    _id: ObjectId,
    username: string;
    email: string;
    encryptedPassword: string;
    roles: RoleType[]
}