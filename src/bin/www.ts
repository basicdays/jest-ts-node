#!/usr/bin/env node
import { startExpressServer } from "../app.js";

const port = Number.parseInt(process.env["PORT"] ?? "8080");
const stopExpressServer = await startExpressServer(port);

function cleanupOnExit(code?: number) {
	// console.log("Shutting down server");
	stopExpressServer()
		.then(() => {
			process.exit(code);
		})
		.catch((err) => {
			console.error("PANIC: failed to stop the server");
			console.error(err);
			process.exit(10);
		});
}
(["SIGINT", "SIGTERM", "SIGHUP", "SIGBREAK", "SIGUSR2"] as const).forEach(
	(signal) => {
		process.on(signal, cleanupOnExit);
	}
);
