const eslint = require('@eslint/js');
const tseslintParser = require('@typescript-eslint/parser');
const tseslintPlugin = require('@typescript-eslint/eslint-plugin');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');

module.exports = [
  eslint.configs.recommended,
  {
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
    },
    ignores: ['webpack.config.js'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
      },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
        localStorage: 'readonly',
        chrome: 'readonly',
        fetch: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        JSX: 'readonly',
        Selection: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLSelectElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        ResizeObserver: 'readonly',
        HTMLElement: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...tseslintPlugin.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      // Add any specific ESLint rules here
    },
  },
];