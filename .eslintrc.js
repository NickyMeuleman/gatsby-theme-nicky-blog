module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint"
  ],
  plugins: [
    "react",
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
  settings: {
    react: {
      // while the CLI is fine, the editor reports errors when this setting is "detect"
      version: "999.999.999"
    }
  },
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx", ".tsx"]
      }
    ],
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-fragments": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "global-require": "off",
    "quotes": ["warn", "backtick"],
    "no-param-reassign": "warn",
    "prefer-destructuring": [
      "error",
      {
        "VariableDeclarator": {
          "array": true,
          "object": true
        },
        "AssignmentExpression": {
          "array": false,
          "object": false
        }
      },
      {
        "enforceForRenamedProperties": false
      }
    ],
    "arrow-body-style": ["warn", "as-needed"],
    "no-unused-expressions": [
      "error",
      {
        "allowTaggedTemplates": true
      }
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "off",
    // for .js files
    // "plugin:@typescript-eslint/recommended" overwrites this rule
    "no-unused-vars": "off",
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "local",
        args: "none"
      }
    ],
    "@typescript-eslint/interface-name-prefix": ["warn", "always"],
    "prettier/prettier": "warn"
  },
  overrides: [
    {
      // enable rules specifically for TypeScript files
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": ["error"],
        "@typescript-eslint/no-var-requires": "error"
      }
    }
  ]
};
