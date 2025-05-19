import { IsDateString, IsDefined, IsNotEmpty, MaxLength } from "class-validator";

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
}