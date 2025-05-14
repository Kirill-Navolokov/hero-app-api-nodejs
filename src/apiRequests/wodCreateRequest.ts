export type WodCreateRequest = {
    unitId?: string;
    name: string;
    description: string;
    scheme: string;
    executionDate: Date;
    type: number;
}