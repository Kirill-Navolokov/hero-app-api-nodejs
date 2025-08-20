import { ObjectId } from "mongodb";
import { BusinessCreateRequest } from "../apiRequests/businessCreateRequest";
import { BusinessCategoryEntity } from "../dal/entities/businessCategoryEntity";
import { BusinessEntity } from "../dal/entities/businessEntity";
import { Business } from "../models/business";

export default function toBusinessesResponseModel(
    businessEntity: BusinessEntity,
    categoriesMap: Map<string, string>
): Business {
    return {
        id: businessEntity._id.toString(),
        name: businessEntity.name,
        link: businessEntity.link,
        imageUrl: businessEntity.imageUrl,
        categories: businessEntity.categoriesIds.map(id => categoriesMap.get(id)!)
    };
}

export function toModel(
    entity: BusinessEntity,
    relatedCategories: Array<BusinessCategoryEntity>): Business {
    return {
        id: entity._id.toString(),
        name: entity.name,
        link: entity.link,
        imageUrl: entity.imageUrl,
        categories: relatedCategories.map(c => c.name)
    };
}

export function toEntity(
    createRequest: BusinessCreateRequest,
    imageName: string,
    imageUrl: string,
): BusinessEntity {
    return {
        _id: new ObjectId(),
        name: createRequest.name,
        link: createRequest.link,
        categoriesIds: createRequest.categoriesIds,
        imageName: imageName,
        imageUrl: imageUrl
    }
}