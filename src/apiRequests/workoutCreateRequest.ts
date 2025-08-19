import { IsDateString, IsDefined, IsNotEmpty, MaxLength } from "class-validator";

export class WorkoutCreateRequest {
    @MaxLength(20)
    name!: string;

    @IsNotEmpty()
    @MaxLength(1000)
    description!: string;

    @IsDefined()
    @IsDateString()
    date!: string;
}