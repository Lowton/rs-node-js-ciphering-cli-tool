import  {Transform} from "node:stream";

export class CryptoTransform extends Transform {
    constructor(coder) {
        super();
        this.coder = coder;
    }

    _transform(chunk, encoding, callback) {
        try {
            callback(undefined, this.coder.encode(chunk.toString().trim()));
        } catch (error) {
            callback(error);
        }
    }
}