import { IsDateString, IsDefined, IsNotEmpty, IsNumber, Max, MaxLength } from "class-validator";

export class UnitCreateRequest {
    @IsNotEmpty()
    @MaxLength(20)
    name!: string;

    @IsNotEmpty()
    @MaxLength(200)
    description!: string;

    @IsDefined()
    @IsDateString()
    foundationDate!: Date;

    @IsDefined()
    @IsNumber()
    @Max(1)
    type!: number;
}