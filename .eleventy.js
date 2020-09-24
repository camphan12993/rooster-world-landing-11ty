const terser = require("terser");
const htmlmin = require("html-minifier");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");

module.exports = function (config) {
  // config.addPassthroughCopy('assets');
  config.addPassthroughCopy("src/admin");
  config.addPassthroughCopy("src/assets/img");
  config.addPassthroughCopy("android-chrome-192x192.png");
  config.addPassthroughCopy("android-chrome-512x512.png");
  config.addPassthroughCopy("apple-touch-icon.png");
  config.addPassthroughCopy("favicon-16x16.png");
  config.addPassthroughCopy("favicon-32x32.png");
  config.addPassthroughCopy("favicon.ico");
  config.addPassthroughCopy("site.webmanifest");
  config.addPlugin(lazyImagesPlugin, {
    transformImgPath: (imgPath) => {
      if (imgPath.startsWith("/assets/img") && !imgPath.startsWith("//")) {
        return `./src${imgPath}`;
      }

      return imgPath;
    },
  });

  config.addLiquidFilter("toJson", function (value) {
    return JSON.stringify(value);
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
