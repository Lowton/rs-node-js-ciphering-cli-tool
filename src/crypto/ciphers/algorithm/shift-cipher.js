export class ShiftCipher {
    constructor(shiftValue) {
        this.shiftValue = this.normalize(shiftValue);
    }

    normalize(shiftValue) {
        return shiftValue < 0 ? this.normalize(shiftValue + 26) : shiftValue;
    }

    shift(letter, code) {
        return String.fromCharCode(((letter.charCodeAt() - code + this.shiftValue) % 26) + code);
    }
}