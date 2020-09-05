const terser = require('terser');
const htmlmin = require('html-minifier');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const svgContents = require('eleventy-plugin-svg-contents');
const postcss = require('postcss')
const postcssConfig = require('./postcss.config');

module.exports = function (config) {
  // config.addPassthroughCopy('assets');
  config.addPassthroughCopy('src/admin');
  config.addPassthroughCopy('src/assets/css');
  config.addPassthroughCopy('src/assets/img');
  config.addPlugin(svgContents);
  config.addPlugin(lazyImagesPlugin, {
    transformImgPath: (imgPath) => {
      if (imgPath.startsWith('/') && !imgPath.startsWith('//')) {
        return `./src${imgPath}`;
      }

      return imgPath;
    },
  });

  config.addPairedShortcode(
    "postcss",
    async function(code) {
    return await postcss(postcssConfig.plugins).process(code).then(result => result.css)
});

  // minify js
  config.addFilter('jsmin', function (code) {
    let minified = terser.minify(code);
    if (minified.error) {
      console.log('Terser error: ', minified.error);
      return code;
    }

    return minified.code;
  });

  // html minify
  if (process.env.NODE_ENV == 'production') {
    config.addTransform('htmlmin', function (content, outputPath) {
      if (outputPath.endsWith('.html')) {
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
      input: 'src',
    },
    passthroughFileCopy: true,
    templateFormats: ['html', 'liquid', 'md'],
    htmlTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',
  };
};
