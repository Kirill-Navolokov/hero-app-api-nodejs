export interface SignUpResponse {
    user: {
        email: string;
        username: string;
    };
    accessToken: string;
}