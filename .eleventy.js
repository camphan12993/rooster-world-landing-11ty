module.exports = function (config) {
  // config.addPassthroughCopy('assets');
  config.addPassthroughCopy('src/admin');
  config.addPassthroughCopy('src/assets/css');
  config.addPassthroughCopy('src/assets/js');
  config.addPassthroughCopy('src/assets/img');
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
