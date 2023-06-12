import http from "node:http";

import _debug from "debug";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

const debug = _debug("scratch:server");

export function createExpessServer() {
	const app = express();

	// settings
	app.disable("x-powered-by");
	app.disable("etag");
	app.enable("trust proxy");

	// logging
	app.use(logger("dev"));

	// request parsing
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());

	// express headers
	app.use(
		helmet({
			contentSecurityPolicy: false,
			strictTransportSecurity: false,
		})
	);

	// routes
	app.use("/", indexRouter);
	app.use("/users", usersRouter);

	return app;
}

export async function startExpressServer(port: number) {
	const app = createExpessServer();
	app.set("port", port);

	const httpServer = http.createServer(app);

	await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
	debug(`Listening on ${port}`);

	return async function stopExpressServer() {
		return new Promise<void>((resolve, reject) => {
			httpServer.close((err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	};
}
