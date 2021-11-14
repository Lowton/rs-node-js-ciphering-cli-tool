import {Writable} from 'stream';
import {close, open, write} from 'fs';
import {WriteFileError} from "../errors/write-file-error.js";

export class WriteFile extends Writable {
    constructor(filename) {
        super();
        this.filename = filename;
    }

    _construct(callback) {
        open(this.filename, 'a', (err, fd) => {
            if (err) {
                throw WriteFileError(`File ${this.filename} could not be opened to write: ${err}`);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }

    _write(chunk, encoding, callback) {
        write(this.fd, chunk, callback);
    }

    _destroy(err, callback) {
        if (this.fd) {
            close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}