import {ArgumentParser} from "../src/argument-parser";

describe("Argument parser test", () => {
	let argumentParser;

	beforeEach(() => {
		argumentParser = new ArgumentParser([]);
	});

	describe("hasDuplicateArguments", () => {
		it("should check correct args", () => {
			const arguments_ = ["-c", "C1-A", "-o", "output.txt", "-i", "input.txt"];

			expect(argumentParser.hasDuplicateArguments(arguments_)).toBeFalsy();
		});

		it("should check incorrect args", () => {
			const arguments_ = ["-c", "C1-A", "-o", "output.txt", "-i", "input.txt", "--config", "A-A-A"];

			expect(argumentParser.hasDuplicateArguments(arguments_)).toBeTruthy();
		});
	});

});