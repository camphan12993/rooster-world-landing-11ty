const terser = require("terser");
const htmlmin = require("html-minifier");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");
const svgContents = require("eleventy-plugin-svg-contents");
const postcss = require("postcss");
const postcssConfig = require("./postcss.config");
const path = require("path");

module.exports = function (config) {
  // config.addPassthroughCopy('assets');
  config.addPassthroughCopy("src/admin");
  config.addPassthroughCopy("src/assets/css");
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

  config.addPairedShortcode("postcss", async function (code) {
    const filepath = path.join(__dirname, "src/_includes/css/tailwind.css");
    return await postcss(postcssConfig.plugins)
      .process(code, { from: filepath })
      .then((result) => result.css);
  });

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
    templateFormats: ["html", "liquid", "md"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
  };
};
