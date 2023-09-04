module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb', 'airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: true,
    ecmaVersion: '2021',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['arrow-function', 'function-declaration'],
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-param-reassign': ['error', { props: false }],
    'max-len': ['error', { code: 150 }],
    'no-console': ['error', { allow: ['error'] }],
  },
};
