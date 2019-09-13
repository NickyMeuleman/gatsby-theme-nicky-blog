const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module",
    project: path.resolve(__dirname, './tsconfig.json'),
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint"
  ],
  plugins: [
    "react-hooks",
    "prettier",
    "@typescript-eslint"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    cy: true,
    Cypress: true,
  },
  rules: {
    "react/prop-types": 0,
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"]
      }
    ],
    "no-unused-vars": [
      "error",
      {
        vars: "local",
        args: "none"
      }
    ],
    "global-require": 0,
    "react/destructuring-assignment": 0,
    "quotes": ["warn", "backtick"],
    "prefer-destructuring": ["error", {
      "VariableDeclarator": {
        "array": true,
        "object": true
      },
      "AssignmentExpression": {
        "array": false,
        "object": false
      }
    }, {
        "enforceForRenamedProperties": false
      }],
    "prettier/prettier": "warn"
  }
};
