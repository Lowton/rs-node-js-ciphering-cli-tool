import {pipeline} from "node:stream";
import {ArgumentParser as ArgumentsParser} from "./argument-parser.js";

export class CliTool {
	constructor(arguments_) {
		this.args = arguments_;
	}

	start() {
		const properties = new ArgumentsParser(this.args.slice(2)).parse();
		pipeline(properties.input,
			...properties.config,
			properties.output,
			error => {
				switch (error?.type) {
				case "ConfigError": this.handleError(error?.description, 1001); break;
				case "WriteFileError": this.handleError(error?.description, 1002); break;
				case "ReadFileError": this.handleError(error?.description, 1003); break;
				case "ArgumentError": this.handleError(error?.description, 1004); break;
				}
			}
		);
	}

	handleError(description, code) {
		process.stderr.write(description);
		process.exit(code);
	}
}
