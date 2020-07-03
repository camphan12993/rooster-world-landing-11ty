module.exports = function (config) {
  // config.addPassthroughCopy('assets');
  config.addPassthroughCopy('src/admin');
  config.addPassthroughCopy({ 'src/assets/img': 'assets/img' });
  config.addPassthroughCopy({ 'src/assets/js': 'assets/js' });
  config.addPassthroughCopy({ 'src/assets/style.css': 'assets/css/style.css' });
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
