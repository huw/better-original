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
    'react/destructuring-assignment': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/prefer-stateless-function': 'off',
    'class-methods-use-this': 'off',
    'no-unused-vars': 'off',
    'linebreak-style': 'off',
  },
};
