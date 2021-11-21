import {cipherToCryptoTransform} from "./crypto/crypto-provider.js";
import {ReadFile} from "./streams/read-file.js";
import {WriteFile} from "./streams/write-file.js";
import {WriteTerminal} from "./streams/write-terminal.js";
import {ConfigError} from "./errors/config-error.js";
import {ArgumentError} from "./errors/argument-error.js";

export class ArgsParser {
    constructor(args) {
        this.args = args.map((arg) => arg.trim());
        this.configRegExp = /(^(-?(C[01]|R[01]|A))+$)/gs;
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
        if (input > -1) {
            properties["input"] = new ReadFile(this.args[input + 1]);
        } else {
            properties["input"] = process.stdin;
        }
        const output = this.getArgumentIndex("-o", "--output");
        if (output > -1) {
            properties["output"] = new WriteFile(this.args[output + 1]);
        } else {
            properties["output"] = new WriteTerminal();
        }
        return properties;
    }

    getArgumentIndex(short, full) {
        return this.args.indexOf(short) !== -1
            ? this.args.indexOf(short)
            : this.args.indexOf(full);
    }

    getCryptoTransformQueue(config) {
        const matches = this.configRegExp.test(config);
        if (!matches) {
            throw new ConfigError(`Config is invalid: ${config}`);
        }
        const ciphers = config.split("-");
        return ciphers.map(cipherToCryptoTransform);
    }

    hasDuplicateArguments(arr) {
        const result = arr.reduce((acc, val) => {
            switch (val) {
                case "-c":
                case "--config":
                    ++acc[0];
                    break;
                case "-o":
                case "--output" :
                    ++acc[1];
                    break;
                case "-i":
                case "--input":
                    ++acc[2];
                    break;
            }
            return acc;
        }, [0, 0, 0]);
        return result.filter(el => el > 1).length > 0;
    }
}