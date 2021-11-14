import {Writable} from 'stream';
import {close, open, write} from 'fs';

export class WriteFile extends Writable {
    constructor(filename) {
        super();
        this.filename = filename;
    }

    _construct(callback) {
        console.log("writeble construct")
        open(this.filename, 'a', (err, fd) => {
            if (err) {
                callback(err);
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