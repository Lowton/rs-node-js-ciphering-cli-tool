export class ReadFileError extends Error {
    constructor(description) {
        super(description);
        this.type = "ReadFileError";
    }
}