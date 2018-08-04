module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  plugins: [
    'flowtype',
  ],
  rules: {
    'react/jsx-filename-extension': 'off',
    'class-methods-use-this': 'off',
    'no-unused-vars': 'off',
    'linebreak-style': 'off',
  },
};
