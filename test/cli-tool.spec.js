import {CliTool} from "../src/cli-tool";
import {exec} from "node:child_process";

describe("CliTool", () => {
	it("should show duplicate argument error", () => {
		const consoleArguments = ["node", "cli-tool", "-c", "C1-C1-A-R0", "-c", "C0"];
		const cliTool = new CliTool(consoleArguments);

		expect(() => cliTool.start()).toThrow("Command line contains duplicate arguments");
	});

	it("should show missing argument error", () => {
		const consoleArguments = ["node", "cli-tool"];
		const cliTool = new CliTool(consoleArguments);

		expect(() => cliTool.start()).toThrow("Cipher config is missing: []");
	});

	it("should show error on invalid config", () => {
		const consoleArguments = ["node", "cli-tool", "-c", "A0-C2"];
		const cliTool = new CliTool(consoleArguments);

		expect(() => cliTool.start()).toThrow("Config is invalid: A0-C2");
	});

	it("sdf", () => {
		exec("node cli-tool.js").on("data", (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.error(`stderr: ${stderr}`);
		});
	});
});
