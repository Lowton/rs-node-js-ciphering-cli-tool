import {ArgsParser} from "./args-parser.js";
import {pipeline} from "stream";

function main() {
    const properties = new ArgsParser(process.argv.slice(2)).parse();
    pipeline(properties.input,
        ...properties.config,
        properties.output,
        err => {
            console.error(err);
            console.log("всё пошло по пизде");
        }
    );
}

main();
