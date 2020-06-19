module.exports = function (config) {
  config.addPassthroughCopy('assets');
  config.addPassthroughCopy('src/admin');
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
