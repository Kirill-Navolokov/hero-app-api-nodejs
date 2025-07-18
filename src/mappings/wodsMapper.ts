import { ObjectId } from "mongodb";
import { WodCreateRequest } from "../apiRequests/wodCreateRequest";
import { WodEntity } from "../dal/entities/wodEntity";
import { Wod } from "../models/wod";

export function toModel(entity: WodEntity): Wod {
    return {
        id: entity._id.toString(),
        unitId: entity.unitId?.toString(),
        name: entity.name,
        description: entity.description,
        scheme: entity.scheme,
        executionDate: entity.executionDate,
        creationDate: entity.creationDate,
        type: entity.type,
        imageUrl: entity.imageUrl,
        backgroundUrl: entity.backgroundUrl
    };
}

export function toEntity(createRequest: WodCreateRequest): WodEntity {
    return {
        _id: new ObjectId(),
        unitId: createRequest.unitId == undefined 
            ? undefined 
            : new ObjectId(createRequest.unitId),
        name: createRequest.name,
        description: createRequest.description,
        scheme: createRequest.scheme,
        executionDate: new Date(createRequest.executionDate),
        creationDate: new Date(),
        type: createRequest.type,
        imageUrl: ""
    };
}