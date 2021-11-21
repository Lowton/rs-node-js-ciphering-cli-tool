import {Cryptographer} from "../../../src/crypto/ciphers/cryptographer";

describe("Cryptographer", () => {
	it("should operate on 'Hello R2D2'", () => {
		const cipher = {shift: jest.fn()};
		const cryptographer = new Cryptographer(cipher);

		cryptographer.encode("Hello R2D2");

		expect(cipher.shift).toBeCalledWith("H", cryptographer.upperLetterIndex);
		expect(cipher.shift).toBeCalledWith("e", cryptographer.lowerLetterIndex);
		expect(cipher.shift).toBeCalledWith("l", cryptographer.lowerLetterIndex);
		expect(cipher.shift).toBeCalledWith("o", cryptographer.lowerLetterIndex);
		expect(cipher.shift).toBeCalledWith("R", cryptographer.upperLetterIndex);
		expect(cipher.shift).toBeCalledWith("D", cryptographer.upperLetterIndex);
		expect(cipher.shift).not.toBeCalledWith(" ", expect.any);
		expect(cipher.shift).not.toBeCalledWith("2", expect.any);
	});
});
