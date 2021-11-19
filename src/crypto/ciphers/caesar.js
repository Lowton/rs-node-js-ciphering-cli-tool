import {Cryptographer} from "./cryptographer.js";
import {ShiftCipher} from "./algorithm/shift-cipher.js";

export class Caesar {
    encoder() {
        return new Cryptographer(new ShiftCipher(1));
    }

    decoder() {
        return new Cryptographer(new ShiftCipher(-1));
    }
}