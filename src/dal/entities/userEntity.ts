import { ObjectId } from "mongodb";

export interface UserEntity {
    _id: ObjectId,
    username: string;
    email: string;
    encryptedPassword: string;
    roles: string[]
}