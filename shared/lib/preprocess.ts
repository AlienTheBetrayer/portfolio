import { shaderFiles } from "@/shared/shaders";

/**
 * Recursively resolves #include directives in GLSL code with include-once semantics.
 * @param sourceOrKey Either raw GLSL code string OR a dictionary key name.
 * @param visited Set tracking processed chunks to prevent duplicate inclusion and circular loops.
 */
export function preprocessGLSL(sourceOrKey: string, visited = new Set<string>()): string {
	const isKey = sourceOrKey in shaderFiles;
	const code = isKey ? shaderFiles[sourceOrKey] : sourceOrKey;

	if (isKey) {
		// If the file was already processed anywhere in the graph, skip it to prevent duplicate function definitions
		if (visited.has(sourceOrKey)) {
			return "";
		}
		visited.add(sourceOrKey);
	}

	const includeRegex = /^\s*#pragma\s+include\s*\(?\s*["']?([^"'\)\s]+)["']?\s*\)?;?/gim;

	return code.replace(includeRegex, (_, includePath: string) => {
		const targetKey = includePath in shaderFiles ? includePath : includePath.replace(/^\.\//, "");

		if (targetKey in shaderFiles) {
			// Pass the shared `visited` Set directly instead of creating `new Set(visited)`
			return preprocessGLSL(targetKey, visited);
		}

		throw new Error(
			`[GLSL Preprocessor] Included chunk not found: "${includePath}". Available chunks: ${Object.keys(shaderFiles).join(", ")}`,
		);
	});
}
