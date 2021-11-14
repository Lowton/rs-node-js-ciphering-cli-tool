import {Writable} from "stream";

export class WriteTerminal extends Writable {
    _write(chunk, encoding, callback) {
        process.stdout.write(chunk);
        callback();
    }
}