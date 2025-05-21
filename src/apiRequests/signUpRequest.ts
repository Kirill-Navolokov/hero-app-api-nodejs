import { IsEmail, Matches } from "class-validator";

export class SignUpRequest {
    @IsEmail()
    email!: string;

    @Matches(new RegExp("^[a-zA-Z][a-zA-Z0-9_.]{4,25}$"))
    username!: string;

    @Matches(new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,16}$"))
    password!: string;
}