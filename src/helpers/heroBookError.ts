export class HeroBookError extends Error {
    constructor(message: string, status: number, errors?: any[]) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    status!: number;
    errors?: any[]
}