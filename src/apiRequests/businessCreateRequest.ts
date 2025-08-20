import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUrl, MaxLength } from "class-validator";

export class BusinessCreateRequest {
    @IsNotEmpty()
    @MaxLength(20)
    name!: string;

    @IsNotEmpty()
    @IsUrl()
    link!: string;

    @IsArray()
    @ArrayMinSize(1)
    categoriesIds!: string[];
}