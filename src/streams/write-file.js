import {Writable} from 'stream';
import {close, open, stat, write} from 'fs';
import {WriteFileError} from "../errors/write-file-error.js";

export class WriteFile extends Writable {
    constructor(filename) {
        super();
        this.filename = filename;
    }

    _construct(callback) {
        stat(this.filename, (err) => {
            if (err === null) {
                open(this.filename, 'a', (error, fd) => {
                    if (error) {
                        throw new WriteFileError(`File ${this.filename} could not be opened to write: ${error}`);
                    } else {
                        this.fd = fd;
                        callback();
                    }
                });
            } else if (err.code === 'ENOENT') {
                throw new WriteFileError(`File ${this.filename} does not exist: ${err}`);
            }
        })
    }

    _write(chunk, encoding, callback) {
        write(this.fd, chunk.toString().trim() + "\n", callback);
    }

    _destroy(err, callback) {
        if (this.fd) {
            close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}