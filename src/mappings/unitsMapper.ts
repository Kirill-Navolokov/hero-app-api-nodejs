import { ObjectId } from "mongodb";
import { UnitCreateRequest } from "../apiRequests/unitCreateRequest";
import { UnitEntity } from "../dal/entities/unitEntity";
import { Unit } from "../models/unit";

export function toModel(entity: UnitEntity): Unit {
    return {
        id: entity._id.toString(),
        name: entity.name,
        description: entity.description,
        type: entity.type,
        foundationDate: entity.foundationDate,
        imageUrl: entity.imageUrl,
        socialNetworks: entity.socialNetworks
    };
}

export function toEntity(
    createRequest: UnitCreateRequest,
    imageName: string,
    imageUrl: string
): UnitEntity {
    return {
        _id: new ObjectId(),
        name: createRequest.name,
        description: createRequest.description,
        type: createRequest.type,
        foundationDate: new Date(createRequest.foundationDate),
        imageUrl: imageUrl,
        imageName: imageName
    };
}