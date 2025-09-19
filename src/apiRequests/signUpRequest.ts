import { IsEmail, IsIn, IsNotEmpty, isNotEmpty, Matches } from "class-validator";

export class SignUpRequest {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    otp!: string;

    @Matches(new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,16}$"))
    password!: string;

    confirmPassword!: string;
}