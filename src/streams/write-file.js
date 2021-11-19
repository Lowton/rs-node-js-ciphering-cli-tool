import {Writable} from "node:stream";
import {close, open, stat, write} from "node:fs";
import {WriteFileError} from "../errors/write-file-error.js";

export class WriteFile extends Writable {
    constructor(filename) {
        super();
        this.filename = filename;
    }

    _construct(callback) {
        stat(this.filename, (statError) => {
            if (statError === null) {
                open(this.filename, "a", (fileError, fd) => {
                    if (fileError) {
                        throw new WriteFileError(`File ${this.filename} could not be opened to write: ${fileError}`);
                    } else {
                        this.fd = fd;
                        callback();
                    }
                });
            } else if (statError.code === "ENOENT") {
                throw new WriteFileError(`File ${this.filename} does not exist: ${statError}`);
            }
        });
    }

    _write(chunk, encoding, callback) {
        write(this.fd, chunk.toString().trim() + "\n", callback);
    }

    _destroy(error, callback) {
        if (this.fd) {
            close(this.fd, (er) => callback(er || error));
        } else {
            callback(error);
        }
    }
}