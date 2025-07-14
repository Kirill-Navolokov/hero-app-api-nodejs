import { TokensResponse } from "./tokensResponse";

export interface LoginResponse {
    userInfo: {
        email: string,
        username?: string
    },
    tokens: TokensResponse
}