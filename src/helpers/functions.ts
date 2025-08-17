import { equals, validateOrReject, ValidationError } from "class-validator";
import bcrypt from 'bcrypt';
import { ClassConstructor, plainToClass } from "class-transformer";
import path from "path";

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

const allowedImageTypes = ['.png','.jpeg','.webp','.jpg','.gif'];

export async function validateImage(image: Express.Multer.File): Promise<void> {
    let validationError = new ValidationError();
    validationError.property = "image";

    if(image == null || undefined) {
        validationError.constraints = { "required": "image file is required" };
        throw [validationError];
    }

    if (!image.mimetype.startsWith('image/')) {
        validationError.constraints = { "notAnImage": "Only images are allowed for upload" }; 
        throw [validationError];
    }

    const extension = path.extname(image.originalname);

    if (!allowedImageTypes.includes(extension)) {
        validationError.constraints = { "notAllowedType": "Only .png, .jpeg, .webp, .jpg, .gif are allowed" }
        throw [validationError];
    }

    if(image.size > 2000000) {
        validationError.constraints = { "sizeLimit": "Max image size is 2Mbs (2048 bytes)" }
        throw [validationError];
    }
}

export function encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function transformAndValidate<T extends object>(
    cls: ClassConstructor<T>,
    source: any
): Promise<T> {
    const transformed = plainToClass(cls, source);
    await validateOrReject(transformed);

    return transformed;
}