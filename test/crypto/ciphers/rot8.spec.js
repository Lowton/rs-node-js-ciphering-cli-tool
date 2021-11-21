import {Rot8} from "../../../src/crypto/ciphers/rot8";

describe("ROT8 class", () => {
	it("should encode 'Hello world!' to 'Pmttw ewztl!'", () => {
		expect(new Rot8().encoder().encode("Hello world!")).toBe("Pmttw ewztl!");
	});

	it("should decode 'RA aidma bpm Ewztl!' to 'JS saves the World!'", () => {
		expect(new Rot8().decoder().encode("RA aidma bpm Ewztl!")).toBe("JS saves the World!");
	});
});
