const fs = require("fs");
const path = require("path");
const isProd = process.env.NODE_ENV === "production";
const { minify } = require("terser");
// main entry point name
const ENTRY_FILE_NAME = "main.js";

class MinifyCss {
	data() {
		return {
			permalink: `/assets/js/${ENTRY_FILE_NAME}`,
			eleventyExcludeFromCollections: true,
		};
	}

	async minify() {
		const entryPath = path.join(__dirname, `/${ENTRY_FILE_NAME}`);
		var code = fs.readFileSync(entryPath, "utf8");
		if (!isProd) {
			return code;
		}
		try {
			const minified = await minify(code);
			return minified.code;
		} catch (err) {
			console.error("Terser error: ", err);
			return code;
		}
	}

	async render() {
		try {
			const result = await this.minify();
			return result;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
}

module.exports = MinifyCss;
