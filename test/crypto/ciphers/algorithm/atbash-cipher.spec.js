import {AtbashCipher} from "../../../../src/crypto/ciphers/algorithm/atbash-cipher";


describe("Atbash cipher", () => {
	it("should return 'A'", () => {
		expect(new AtbashCipher().shift("Z", 65)).toBe("A");
	});

	it("should return 'z'", () => {
		expect(new AtbashCipher().shift("a", 97)).toBe("z");
	});
});
