const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: ['./src/**/*.liquid'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

const cssnano = require('cssnano')({
  preset: 'advanced',
});

module.exports = {
  plugins: [
    // ...
    require('tailwindcss'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss, cssnano] : []),
    // ...
  ],
};
