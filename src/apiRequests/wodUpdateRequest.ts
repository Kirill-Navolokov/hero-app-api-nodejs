import { IsDateString, isDefined, IsDefined, IsNotEmpty, IsNumber, IsUrl, Max, MaxLength } from "class-validator";

export class WodUpdateRequest {
    @IsDefined()
    id!: string;

    unitId?: string;

    @IsDefined()
    @MaxLength(20)
    name!: string;

    @IsDefined()
    @MaxLength(1000)
    description!: string;

    @IsDefined()
    @MaxLength(1000)
    scheme!: string;

    @IsDefined()
    @IsDateString()
    executionDate!: string;

    @IsDefined()
    @IsNumber()
    @Max(2)
    type!: number;

    @IsUrl()
    imageUrl?: string;

    @IsUrl()
    backgroundUrl?: string;
}