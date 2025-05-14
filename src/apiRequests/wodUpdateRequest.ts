export type WodUpdateRequest = {
    id: string;
    unitId?: string;
    name: string;
    description: string;
    scheme: string;
    executionDate: Date;
    type: number;
    imageUrl?: string;
    backgroundUrl?: string;
}