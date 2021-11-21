import {Readable} from "node:stream";
import {CryptoTransform} from "../../src/crypto/crypto-transform";

describe("CryptoTransform", () => {
	it("should transform text", () => {
		const coder = {encode: jest.fn()};
		coder.encode.mockImplementation((text) => text + "_encoded");

		const cryptoTransform = new CryptoTransform(coder);

		Readable.from(["input string"])
			.pipe(cryptoTransform)
			.on("data", (data) =>
				expect(data).toBe("input string_encoded"));
	});

	it("test", () => {
		const coder = {encode: jest.fn()};
		coder.encode.mockImplementation((text) => text + "_encoded");

		const cryptoTransform = new CryptoTransform(coder);

		cryptoTransform._transform("hello", "utf-8", (error, chunk) =>
			expect(chunk).toBe("hello_encoded"));
	});
});
