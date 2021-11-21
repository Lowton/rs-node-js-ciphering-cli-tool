import {Cryptographer} from "./cryptographer.js";
import {AtbashCipher} from "./algorithm/atbash-cipher.js";

export class Atbash {
    encoder() {
        return new Cryptographer(new AtbashCipher());
    }
}