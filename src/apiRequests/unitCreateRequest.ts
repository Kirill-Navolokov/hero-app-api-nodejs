import { Type } from "class-transformer";
import { IsDateString, IsDefined, IsNotEmpty, IsNumber, Max, MaxLength } from "class-validator";

export class UnitCreateRequest {
    @IsNotEmpty()
    @MaxLength(20)
    name!: string;

    @IsNotEmpty()
    @MaxLength(1000)
    description!: string;

    @IsDefined()
    @IsDateString()
    foundationDate!: string;

    @IsDefined()
    @IsNumber()
    @Max(1)
    @Type(() => Number)
    type!: number;
}