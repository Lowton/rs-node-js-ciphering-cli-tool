export class Cryptographer {
    constructor(cipher) {
        this.cipher = cipher;
        this.lowerLetterIndex = 97;
        this.upperLetterIndex = 65;
    }

    encode(text) {
        return text.replace(/[a-z]/g, (char) => this.cipher.shift(char, this.lowerLetterIndex))
            .replace(/[A-Z]/g, (char) => this.cipher.shift(char, this.upperLetterIndex));
    }
}