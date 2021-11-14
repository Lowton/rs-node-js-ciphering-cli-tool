
import {CryptoTransform} from "./crypto-transform.js";
import {Caesar} from "./ciphers/caesar.js";
import {Atbash} from "./ciphers/atbash.js";
import {Rot8} from "./ciphers/rot8.js";

export const transform = {
    caesar: {
        encoder: new CryptoTransform(new Caesar().encoder()),
        decoder: new CryptoTransform(new Caesar().decoder()),
    },
    atbash: {
        encoder: new CryptoTransform(new Atbash().encoder())
    },
    rot8: {
        encoder: new CryptoTransform(new Rot8().encoder()),
        decoder: new CryptoTransform(new Rot8().decoder()),
    }
}

export const cipherToCryptoTransform = (cipher) => {
    switch (cipher) {
        case "C0": return transform.caesar.decoder;
        case "C1": return transform.caesar.encoder;
        case "A": return transform.atbash.encoder;
        case "R0": return transform.rot8.decoder;
        case "R1": return transform.rot8.encoder;
    }
}
