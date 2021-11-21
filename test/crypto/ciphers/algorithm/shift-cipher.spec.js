import {ShiftCipher} from "../../../../src/crypto/ciphers/algorithm/shift-cipher";


describe("Shift cipher", () => {
	it("should return 'B' on 1 letter above shift", () => {
		expect(new ShiftCipher(1).shift("A", 65)).toBe("B");
	});

	it("should return 'c' on 1 letter below shift", () => {
		expect(new ShiftCipher(-1).shift("d", 97)).toBe("c");
	});
});
