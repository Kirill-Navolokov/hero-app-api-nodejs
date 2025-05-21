export class HeroBookError extends Error {
    constructor(message: string, status: number, errors?: any[]) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    status!: number;
    errors?: any[]

    public static fromUnauthorized(message?: string): HeroBookError {
        message = message == undefined ? "Unauthorized" : message;
        return new HeroBookError(message, 401);
    }
}