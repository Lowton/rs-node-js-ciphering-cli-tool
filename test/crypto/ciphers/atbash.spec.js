import {Atbash} from "../../../src/crypto/ciphers/atbash";

describe("Atbash class", () => {
	it("should encode 'AbCd' to 'ZyXw'", () => {
		expect(new Atbash().encoder().encode("AbCd")).toBe("ZyXw");
	});
});
