import {Caesar} from "../../../src/crypto/ciphers/caesar";

describe("Caesar class", () => {
	it("should encode 'Hello world!' to 'Ifmmp xpsme!'", () => {
		expect(new Caesar().encoder().encode("Hello world!")).toBe("Ifmmp xpsme!");
	});

	it("should decode 'KT tbwft uif Xpsme!' to 'JS saves the World!'", () => {
		expect(new Caesar().decoder().encode("KT tbwft uif Xpsme!")).toBe("JS saves the World!");
	});
});
