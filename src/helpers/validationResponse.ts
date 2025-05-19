import { ValidationError } from "class-validator";

export class ValidationResponse {
    constructor(errors: ValidationError[]) {
        this.message = "Input validation failed";
        this.details = errors.map(err => {
            return {
                "property": err.property,
                "errors": err.constraints
            }
        });
    }

    message: string;
    details: any[]
}