import { describe, afterEach, test } from "@jest/globals";

import { startExpressServer } from "./app.js";

describe("app", () => {
	let cleanupServer: () => Promise<void> = () => Promise.resolve();

	afterEach(async () => {
		await cleanupServer();
	});

	test("can boot server", async () => {
		cleanupServer = await startExpressServer(0);
	});
});
