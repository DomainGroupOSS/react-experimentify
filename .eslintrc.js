module.exports = {
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': 'off',
  },
  parserOptions: {
        ecmaVersion: 6,
    },
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
};
