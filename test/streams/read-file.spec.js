import {ReadFile} from "../../src/streams/read-file";

describe("ReadFile", () => {
	it("should read the mock file", async () => {
		new ReadFile("test/__fixtures__/input.file")
			.on("data", (data) => {
				expect(data.toString()).toBe("test file input content");
			})
			.destroy();
	});
});
