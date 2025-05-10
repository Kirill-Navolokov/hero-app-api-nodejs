import { UnitEntity } from "../dal/entities/unitEntity";
import { Unit } from "../models/unit";

export function toModel(entity: UnitEntity) : Unit {
    return {
        id: entity._id.toString(),
        name: entity.name,
        description: entity.description,
        foundationDate: entity.foundationDate,
        imageUrl: entity.imageUrl
    };
}