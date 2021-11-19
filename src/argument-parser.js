import {cipherToCryptoTransform} from "./crypto/crypto-provider.js";
import {ReadFile} from "./streams/read-file.js";
import {WriteFile} from "./streams/write-file.js";
import {WriteTerminal} from "./streams/write-terminal.js";
import {ConfigError} from "./errors/config-error.js";
import {ArgumentError} from "./errors/argument-error.js";

export class ArgumentParser {
	constructor(arguments_) {
		this.args = arguments_.map((argument) => argument.trim());
		this.configRegExp = /^([CR][01]|A)(-([CR][01]|A))*$/;
	}

	parse() {
		if (this.hasDuplicateArguments(this.args)) {
			throw new ArgumentError("Command line contains duplicate arguments");
		}
		const properties = {};
		const config = this.getArgumentIndex("-c", "--config");
		if (config > -1) {
			properties["config"] = this.getCryptoTransformQueue(this.args[config + 1]);
		} else {
			throw new ConfigError(`Cipher config is missing: [${this.args}]`);
		}
		const input = this.getArgumentIndex("-i", "--input");
		properties["input"] = input > -1 ? new ReadFile(this.args[input + 1]) : process.stdin;
		const output = this.getArgumentIndex("-o", "--output");
		properties["output"] = output > -1 ? new WriteFile(this.args[output + 1]) : new WriteTerminal();
		return properties;
	}

	getArgumentIndex(short, full) {
		return this.args.includes(short)
			? this.args.indexOf(short)
			: this.args.indexOf(full);
	}

	getCryptoTransformQueue(config) {
		const matches = this.configRegExp.test(config);
		if (!matches) {
			throw new ConfigError(`Config is invalid: ${config}`);
		}
		const ciphers = config.split("-");
		return ciphers.map((element) => cipherToCryptoTransform(element));
	}

	hasDuplicateArguments(array) {
		const result = array.reduce((accumulator, value) => {
			switch (value) {
				case "-c":
				case "--config":
					++accumulator[0];
					break;
				case "-o":
				case "--output" :
					++accumulator[1];
					break;
				case "-i":
				case "--input":
					++accumulator[2];
					break;
			}
			return accumulator;
		}, [0, 0, 0]);
		return result.some(element => element > 1);
	}
}