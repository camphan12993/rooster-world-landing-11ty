const terser = require("terser");
const htmlmin = require("html-minifier");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");
const svgContents = require("eleventy-plugin-svg-contents");
const pluginSEO = require("eleventy-plugin-seo-tag");

module.exports = function (config) {
	// config.addPassthroughCopy('assets');
	config.addPassthroughCopy("src/admin");
	config.addPassthroughCopy("src/assets/img");
	config.addPassthroughCopy({
		"node_modules/swiper/swiper-bundle.css": "assets/css/swiper-bundle.css",
	});
	config.addPassthroughCopy({
		"node_modules/swiper/swiper-bundle.min.js":
			"assets/js/swiper-bundle.min.js",
	});
	config.addPlugin(svgContents);
	config.addPlugin(lazyImagesPlugin, {
		transformImgPath: (imgPath) => {
			if (imgPath.startsWith("/") && !imgPath.startsWith("//")) {
				return `./src${imgPath}`;
			}

			return imgPath;
		},
	});

	// SEO
	config.addPlugin(pluginSEO, {
		title: "Rooster World",
		url: "http://rooster-world.com",
		author: "Cam Phan",
		description: "Rooster World",
		options: {
			titleStyle: "minimalistic",
			titleDivider: "|",
		},
		image: "/assets/img/cover.jpg",
	});

	config.addLiquidFilter("toJson", function (value) {
		return JSON.stringify(value[0]);
	});

	// watch
	config.addWatchTarget("src/assets");

	// minify js
	config.addFilter("jsmin", function (code) {
		let minified = terser.minify(code);
		if (minified.error) {
			console.log("Terser error: ", minified.error);
			return code;
		}

		return minified.code;
	});

	// html minify
	if (process.env.NODE_ENV == "production") {
		config.addTransform("htmlmin", function (content, outputPath) {
			if (outputPath.endsWith(".html")) {
				let minified = htmlmin.minify(content, {
					useShortDoctype: true,
					removeComments: true,
					collapseWhitespace: true,
				});
				return minified;
			}

			return content;
		});
	}

	return {
		dir: {
			input: "src",
		},
		passthroughFileCopy: true,
		templateFormats: ["html", "liquid", "md", "11ty.js"],
		htmlTemplateEngine: "liquid",
		markdownTemplateEngine: "liquid",
	};
};
