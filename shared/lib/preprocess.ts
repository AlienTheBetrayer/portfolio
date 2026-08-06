import { shaderFiles } from "@/shared/shaders";

/**
 * Recursively resolves #include directives in GLSL code.
 * @param sourceOrKey Either raw GLSL code string OR a dictionary key name.
 * @param visited Set tracking processed chunks to prevent infinite loops.
 */
export function preprocessGLSL(sourceOrKey: string, visited = new Set<string>()): string {
	const isKey = sourceOrKey in shaderFiles;
	const code = isKey ? shaderFiles[sourceOrKey] : sourceOrKey;

	if (isKey) {
		if (visited.has(sourceOrKey)) {
			console.warn(`[GLSL Preprocessor] Circular include skipped: "${sourceOrKey}"`);
			return "";
		}
		visited.add(sourceOrKey);
	}

	const includeRegex = /^\s*#include\s+["']([^"']+)["'];?/gm;

	return code.replace(includeRegex, (_, includePath: string) => {
		if (includePath in shaderFiles) {
			return preprocessGLSL(includePath, new Set(visited));
		}

		const cleanPath = includePath.replace(/^\.\//, "");
		if (cleanPath in shaderFiles) {
			return preprocessGLSL(cleanPath, new Set(visited));
		}

		throw new Error(
			`[GLSL Preprocessor] Included chunk not found: "${includePath}". Available chunks: ${Object.keys(shaderFiles).join(", ")}`,
		);
	});
}
