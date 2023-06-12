/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	// ts-jest esm support
	extensionsToTreatAsEsm: [".ts", ".tsx"],

	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	transform: {
		"^.+\\.m?tsx?$": [
			"ts-jest",
			{
				useESM: true,
			},
		],
	},

	roots: ["<rootDir>/src"],

	collectCoverageFrom: ["**/*.{ts,tsx}", "!**/*.d.ts", "!<rootDir>/test/**"],
	coverageDirectory: "coverage",
	coverageProvider: "v8",
};
