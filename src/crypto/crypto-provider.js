import {CryptoTransform} from "./crypto-transform.js";
import {Caesar} from "./ciphers/caesar.js";
import {Atbash} from "./ciphers/atbash.js";
import {Rot8} from "./ciphers/rot8.js";

export const cipherToCryptoTransform = (cipher) => {
    switch (cipher) {
        case "C0": return new CryptoTransform(new Caesar().decoder());
        case "C1": return new CryptoTransform(new Caesar().encoder());
        case "A": return new CryptoTransform(new Atbash().encoder());
        case "R0": return new CryptoTransform(new Rot8().decoder());
        case "R1": return new CryptoTransform(new Rot8().encoder());
    }
};
