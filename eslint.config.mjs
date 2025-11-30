import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.builtin,
    },
    plugins: {
      unicorn: eslintPluginUnicorn,
      '@typescript-eslint': eslintPluginTs,
    },
    rules: {    
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes: [
              'signature',
              'public-static-field',
              'public-static-method',
              'protected-static-field',
              'protected-static-method',
              'private-static-field',
              'private-static-method',
              'public-instance-field',
              'protected-instance-field',
              'private-instance-field',
              'constructor',
              'public-instance-method',
              'protected-instance-method',
              'private-instance-method',
            ],
            order: 'alphabetically',
          },
        },
      ],
    },
  },
];
