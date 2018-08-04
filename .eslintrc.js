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
    'react/no-multi-comp'
    'class-methods-use-this': 'off',
    'no-unused-vars': 'off',
  },
};
