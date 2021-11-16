import {ArgsParser} from "./args-parser.js";
import {pipeline} from "stream";

function handleError(description, code) {
    process.stderr.write(description);
    process.exit(code)
}

function main() {
    const properties = new ArgsParser(process.argv.slice(2)).parse();
    pipeline(properties.input,
        ...properties.config,
        properties.output,
        err => {
            switch (err?.type) {
                case "ConfigError": handleError(err.description, 1001); break;
                case "WriteFileError": handleError(err.description, 1002); break;
                case "ReadFileError": handleError(err.description, 1003); break;
                case "ArgumentError": handleError(err.description, 1004); break;
            }
        }
    );
}

main();
