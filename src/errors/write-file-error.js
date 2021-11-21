export class WriteFileError extends Error {
    constructor(description) {
        super(description);
        this.type = "WriteFileError";
    }
}