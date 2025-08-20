import { Type } from "class-transformer";
import { IsDateString, IsDefined, IsNotEmpty, IsNumber, Max, MaxLength } from "class-validator";

export class WodCreateRequest {
    unitId?: string;

    @IsNotEmpty()
    @MaxLength(20)
    name!: string;

    @IsNotEmpty()
    @MaxLength(1000)
    description!: string;

    @IsNotEmpty()
    @MaxLength(500)
    scheme!: string;

    @IsDefined()
    @IsDateString()
    executionDate!: string;

    @IsDefined()
    @IsNumber()
    @Max(2)
    @Type(() => Number)
    type!: number;
}