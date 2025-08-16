import { RoleType } from "../dal/entities/roleEntity";

export interface User {
    id: string;
    email: string;
    username: string;
    encryptedPassword: string;
    roles: RoleType[];
}