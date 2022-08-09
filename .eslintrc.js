module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'react-app',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'import'],
  rules: {
    'no-restricted-exports': 'off',
    'react/react-in-jsx-scope': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'import',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'import',
        next: 'import',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'block-like',
      },
      {
        blankLine: 'always',
        prev: 'block-like',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['const', 'let'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let'],
        next: '*',
      },
      {
        blankLine: 'never',
        prev: ['singleline-const', 'singleline-let'],
        next: ['singleline-const', 'singleline-let'],
      },
      {
        blankLine: 'always',
        prev: ['multiline-const', 'multiline-let'],
        next: ['multiline-const', 'multiline-let'],
      },
      {
        blankLine: 'always',
        prev: ['cjs-import'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['cjs-import'],
        next: ['cjs-import'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx', '.json'],
        map: [['@', './src']],
      },
    },
  },
}
