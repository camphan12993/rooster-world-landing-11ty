const terser = require('terser');
const htmlmin = require('html-minifier');

module.exports = function (config) {
  // config.addPassthroughCopy('assets');
  config.addPassthroughCopy('src/admin');
  config.addPassthroughCopy('src/assets/css');
  config.addPassthroughCopy('src/assets/img');

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
