export type RoleEntity = {
    name: RoleType
}

export enum RoleType {
    ADMIN = "admin",
    UNIT = "unit",
    BUSINESS = "business"
}