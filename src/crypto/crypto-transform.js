import  {Transform} from 'stream';

export class CryptoTransform extends Transform {
    constructor(coder) {
        super();
        this.coder = coder;
    }

    _transform(chunk, encoding, callback) {
        try {
            callback(null, this.coder.encode(chunk.toString().trim()));
        } catch (err) {
            callback(err);
        }
    }
}