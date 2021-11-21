import {Readable} from "node:stream";
import {open, read} from "node:fs";
import {ReadFileError} from "../errors/read-file-error.js";

export class ReadFile extends Readable {
    constructor(filename) {
        super();
        this.filename = filename;
        this.fd = undefined;
    }

    _construct(callback) {
        open(this.filename, "r", (error, fd) => {
            if (error) {
                throw new ReadFileError(`File ${this.filename} could not be opened to read: ${error}`);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }

    _read(size) {
        const buf = Buffer.alloc(size);
        read(this.fd, buf, 0, size, undefined, (error, bytesRead) => {
            if (error) {
                this.destroy(error);
            } else {
                this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : undefined);
            }
        });
    }
}