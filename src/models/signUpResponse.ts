export interface SignUpResponse {
    user: {
        id: string;
        email: string;
        username: string;
    };
    accessToken: string;
}