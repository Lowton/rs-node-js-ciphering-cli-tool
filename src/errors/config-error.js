export class ConfigError extends Error {
    constructor(description) {
        super(description);
        this.type = "ConfigError";
    }
}