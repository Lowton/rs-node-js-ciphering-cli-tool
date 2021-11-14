export class AtbashCipher {
    shift(letter, code) {
        return String.fromCharCode(((25 - (letter.charCodeAt() - code)) % 26) + code);
    }
}