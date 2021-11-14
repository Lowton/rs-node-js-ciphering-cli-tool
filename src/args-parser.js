import {cipherToCryptoTransform} from "./crypto/crypto-provider.js";
import {ReadFile} from "./streams/read-file.js";
import {WriteFile} from "./streams/write-file.js";
import {WriteTerminal} from "./streams/write-terminal.js";
import {ConfigError} from "./errors/config-error.js";

export class ArgsParser {
    constructor(args) {
        console.log("args", args);
        this.args = args.map((arg) => arg.trim());
        this.configRegExp = /(^(-?(C[01]|R[01]|A))+$)/gs;
    }

    parse() {
        const properties = {};
        const config = this.getArgumentIndex("-c", "--config");
        if (config > -1) {
            properties["config"] = this.getCryptoTransformQueue(this.args[config + 1]);
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
        if(!matches) {
            throw ConfigError(`Неверная конфигурация шифрования: ${config}`);
        }
        const ciphers = config.split("-");
        return ciphers.map(cipherToCryptoTransform);
    }
}