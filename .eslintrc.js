module.exports = {
  env: {
    node: true, // Enables Node.js global variables and Node.js scoping
    es6: true, // Enables ES6 features (like let, const)
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'warn', // Optional: Adjust to "off" if you want to allow console statements
    'no-undef': 'off', // Disable `no-undef` to avoid module and require issues
    '@typescript-eslint/no-require-imports': 'off', // Disable this if using require in TS files
  },
};
