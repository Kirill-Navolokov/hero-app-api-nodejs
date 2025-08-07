import { BusinessEntity } from "../dal/entities/businessEntity";
import { Business } from "../models/business";

export default function toModel(
    businessEntity: BusinessEntity,
    categoriesMap: Map<string, string>
): Business {
    return {
        _id: businessEntity._id,
        name: businessEntity.name,
        link: businessEntity.link,
        imageUrl: businessEntity.imageUrl,
        categories: businessEntity.categoriesIds.map(id => categoriesMap.get(id)!)
    };
}