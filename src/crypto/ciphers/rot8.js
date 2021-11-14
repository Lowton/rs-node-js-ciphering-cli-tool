import {Cryptographer} from "./cryptographer.js";
import {ShiftCipher} from "./algorithm/shift-cipher.js";

export class Rot8 {
    encoder() {
        return new Cryptographer(new ShiftCipher(-8))
    }

    decoder() {
        return new Cryptographer(new ShiftCipher(8));
    }
}