module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
    'no-underscore-dangle': [2, { allow: ['foo_', '_id', '_template', '_popup', '_createNode', '_getTemplate', '_setEventListeners'] }],
    'func-names': ['error', 'never', { generators: 'as-needed' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'global-require': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'ignorePackages',
      },
    ],
  },
};
