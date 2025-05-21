import { equals, ValidationError } from "class-validator";
import bcrypt from 'bcrypt';

/**
 * Checks whether provided ids are the same
 * @param routeId - entity id from route
 * @param requestBodyId - entity id from request body
 * @returns nothing if ids are the same
 * @throws validation error if ids are not the same
 */
export function validateEqualIds(routeId: string, requestBodyId: string) {
    if(equals(routeId, requestBodyId))
        return;

    var validationError = new ValidationError();
    validationError.property = "id";
    validationError.constraints = { "notEquals": "Id from route and request body are not the same" };

    throw [validationError];
}

export function encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}