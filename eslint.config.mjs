// ESLint v9+ flat config for Next.js + TypeScript (minimal)
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      sourceType: 'module',
    },
    rules: {
      // JS için temel kurallar (isteğe bağlı eklenebilir)
    },
  },
]; 