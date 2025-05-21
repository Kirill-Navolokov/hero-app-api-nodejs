export interface User {
    id: string;
    email: string;
    username: string;
    encryptedPassword: string;
    roles: string[];
}