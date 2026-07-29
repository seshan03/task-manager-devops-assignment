import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
     globals: {
      process: 'readonly',
      console: 'readonly',
      document: 'readonly',
      window: 'readonly',
      alert: "readonly",
      setTimeout: "readonly",
      fetch: 'readonly',
      },
    },
    rules: {},
  },
];