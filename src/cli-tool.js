import {ArgumentParser as ArgumentsParser} from "./argument-parser.js";
import {pipeline} from "node:stream";

function handleError(description, code) {
    process.stderr.write(description);
    process.exit(code);
}

function main() {
    const properties = new ArgumentsParser(process.argv.slice(2)).parse();
    pipeline(properties.input,
        ...properties.config,
        properties.output,
        error => {
            switch (error?.type) {
                case "ConfigError": handleError(error?.description, 1001); break;
                case "WriteFileError": handleError(error?.description, 1002); break;
                case "ReadFileError": handleError(error?.description, 1003); break;
                case "ArgumentError": handleError(error?.description, 1004); break;
            }
        }
    );
}

main();
