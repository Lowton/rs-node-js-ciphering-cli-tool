export class ArgumentError extends Error {
    constructor(description) {
        super(description);
        this.type = "ArgumentError";
    }
}