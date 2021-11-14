export class Cryptographer {
    constructor(cipher) {
        this.cipher = cipher;
    }

    encode(text) {
        return text.replace(/[a-z]/g, (char) => this.cipher.shift(char, 97))
            .replace(/[A-Z]/g, (char) => this.cipher.shift(char, 65));
    }
}