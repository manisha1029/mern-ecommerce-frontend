const js = require('@eslint/js');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const prettier = require('eslint-plugin-prettier');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      prettier,
    },
    rules: {
      // React specific rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'warn',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',

      // JavaScript best practices
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unreachable': 'error',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'prefer-const': 'error',

      // Code quality
      eqeqeq: 'error',
      curly: 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      // Prettier integration
      'prettier/prettier': 'error',

      // Formatting and style
      indent: 'off', // Let Prettier handle this
      quotes: 'off', // Let Prettier handle this
      semi: 'off', // Let Prettier handle this
      'comma-dangle': 'off', // Let Prettier handle this
      'object-curly-spacing': 'off', // Let Prettier handle this
      'array-bracket-spacing': 'off', // Let Prettier handle this
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: [
      'node_modules/',
      'build/',
      'dist/',
      'coverage/',
      'public/',
      '*.config.js',
      'tailwind.config.js',
      'postcss.config.js',
    ],
  },
];
