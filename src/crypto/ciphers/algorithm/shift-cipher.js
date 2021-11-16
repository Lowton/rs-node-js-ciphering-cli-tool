export class ShiftCipher {
    constructor(shiftValue) {
        this.alphabetSize = 26;
        this.shiftValue = this.normalize(shiftValue);
    }

    normalize(shiftValue) {
        return shiftValue < 0 ? this.normalize(shiftValue + this.alphabetSize) : shiftValue;
    }

    shift(letter, code) {
        return String.fromCharCode(((letter.charCodeAt() - code + this.shiftValue) % this.alphabetSize) + code);
    }
}