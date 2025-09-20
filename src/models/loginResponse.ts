import { RoleEntity, RoleType } from "../dal/entities/roleEntity";
import { TokensResponse } from "./tokensResponse";

export interface LoginResponse {
    user: {
        email: string,
        type: RoleType
    },
    tokens: TokensResponse
}