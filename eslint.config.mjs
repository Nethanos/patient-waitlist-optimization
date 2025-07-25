import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, prettier: prettierPlugin },
    extends: ['js/recommended'],
    rules: {
      'prettier/prettier': 'error',
    },
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'module' } },
  {
    files: ['test/**/*.js', 'src/**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
  },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.browser } },
]);
