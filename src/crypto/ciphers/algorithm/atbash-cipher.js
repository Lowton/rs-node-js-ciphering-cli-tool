export class AtbashCipher {
    constructor() {
        this.alphabetSize = 26;
        this.letterMaxIndex = 25;
    }

    shift(letter, code) {
        return String.fromCharCode(((this.letterMaxIndex - (letter.charCodeAt() - code)) % this.alphabetSize) + code);
    }
}