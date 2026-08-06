import fs from "node:fs";
import path from "node:path";

export const importString = (filePath: string) => {
	return fs.readFileSync(path.join(__dirname, filePath), "utf-8");
};
