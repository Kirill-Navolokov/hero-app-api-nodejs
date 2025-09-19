import { RoleType } from "../dal/entities/roleEntity";

export interface User {
    id: string;
    email: string;
    roles: RoleType[];
    passedSignUp: boolean;
    otp?: string;
    tgUserId?: number;
}