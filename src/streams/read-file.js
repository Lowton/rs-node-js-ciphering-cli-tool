import {Readable} from 'stream';
import {close, open, read} from 'fs';

export class ReadFile extends Readable {
    constructor(filename) {
        super();
        this.filename = filename;
        this.fd = null;
    }

    _construct(callback) {
        open(this.filename, 'r', (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }

    _read(size) {
        const buf = Buffer.alloc(size);
        read(this.fd, buf, 0, size, null, (err, bytesRead) => {
            if (err) {
                this.destroy(err);
            } else {
                this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
            }
        });
    }

    _destroy(err, callback) {
        if (this.fd) {
            close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}