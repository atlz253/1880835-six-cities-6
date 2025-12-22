/* eslint-env node */

module.exports = {
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'htmlacademy/react-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        modifiers: ['const', 'global'],
        types: ['string', 'number', 'boolean'],
        format: ['UPPER_CASE'],
      },
    ],
  },
  overrides: [
    {
      files: ['*test*'],
      rules: { '@typescript-eslint/unbound-method': 'off' },
    },
  ],
};
