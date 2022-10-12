const path = require(`path`)

module.exports = {
  root: true,
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: `module`
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    `plugin:react/recommended`,
    `plugin:@typescript-eslint/recommended`,
    `plugin:import/typescript`,
    `plugin:mdx/recommended`,
    `prettier`
  ],
  plugins: [
    `react`,
    `react-hooks`,
    `prettier`,
    `@typescript-eslint`
  ],
  globals: {
    Atomics: `readonly`,
    SharedArrayBuffer: `readonly`,
    cy: true,
    Cypress: true,
  },
  settings: {
    react: {
      // while the CLI is fine, the editor reports errors when this setting is "detect"
      version: `999.999.999`
    }
  },
  rules: {
    "react/prop-types": `off`,
    "react/react-in-jsx-scope": `off`,
    "react/jsx-filename-extension": [
      `error`,
      {
        extensions: [`.js`, `.jsx`, `.tsx`, `.mdx`]
      }
    ],
    "react/destructuring-assignment": `off`,
    "react/jsx-props-no-spreading": `off`,
    "react/jsx-fragments": `error`,
    // doesn't play well with theme-ui's "Styled", the ignore option doesn't work on Styled.*
    "react/jsx-pascal-case": `off`,
    "react-hooks/rules-of-hooks": `error`,
    "react-hooks/exhaustive-deps": `warn`,
    "global-require": `off`,
    "quotes": [`warn`, `backtick`],
    "no-param-reassign": `warn`,
    "prefer-destructuring": [
      `error`,
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
    "arrow-body-style": [`warn`, `as-needed`, { "requireReturnForObjectLiteral": true }],
    "no-unused-expressions": [
      `error`,
      {
        "allowTaggedTemplates": true
      }
    ],
    "spaced-comment": `off`,
    "import/no-extraneous-dependencies": [
      `error`,
      {
        packageDir: [
          path.resolve(__dirname, `./`),
          path.resolve(__dirname, `./theme`),
          path.resolve(__dirname, `./demo`),
        ],
        devDependencies: [
          `**/*.test.js`,
          `**/*.spec.js`,
          `/cypress/**`,
        ],
      },
    ],
    "import/extensions": [
      `error`,
      `ignorePackages`,
      {
        "js": `never`,
        "jsx": `never`,
        "ts": `never`,
        "tsx": `never`
      }
    ],
    "import/prefer-default-export": `off`,
    "@typescript-eslint/explicit-function-return-type": `off`,
    "@typescript-eslint/no-var-requires": `off`,
    "@typescript-eslint/no-explicit-any": `warn`,
    // for .js files
    // "plugin:@typescript-eslint/recommended" overwrites this rule
    "no-unused-vars": `off`,
    "no-console": `warn`,
    "@typescript-eslint/no-unused-vars": [
      `error`,
      {
        vars: `local`,
        args: `none`
      }
    ],
    "@typescript-eslint/ban-ts-ignore": `off`,
    "@typescript-eslint/no-empty-interface": `off`,
    "prettier/prettier": `warn`,
    "@typescript-eslint/naming-convention": [
      `warn`,
      {
        "selector": `interface`,
        "format": [`PascalCase`],
        "custom": {
          "regex": `^I[A-Z]`,
          "match": true
        }
      }
    ],
    "react/function-component-definition": [`warn`, {"namedComponents": [`function-declaration`, `arrow-function`]}]

  },
  overrides: [
    {
      // enable rules specifically for TypeScript files
      "files": [`*.ts`, `*.tsx`],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": [`warn`, {
          allowExpressions: true,
          allowTypedFunctionExpressions: true
        }],
        "@typescript-eslint/no-var-requires": `error`
      }
    },
    // eslint-plugin-mdx claims these overrides are unnecessary or eslint >=6.4
    // Getting "Parsing error: Expression expected" if omitted, so I'm including these.
    {
      "files": [`*.md`],
      "rules": {
        "prettier/prettier": [
          2,
          {
            // unnecessary if you're not using `eslint-plugin-prettier`, but required if you are
            "parser": `markdown`
          }
        ]
      }
    },
    {
      "files": [`*.mdx`],
      "extends": [`plugin:mdx/overrides`],
      "rules": {
        // https://github.com/mdx-js/eslint-mdx#mdxno-unused-expressions
        "no-unused-expressions": `off`,
        "mdx/no-unused-expressions": `warn`,
        // https://github.com/mdx-js/eslint-mdx#mdxno-unescaped-entities
        "react/no-unescaped-entities": `off`,
        // some components are available without first importing them.
        // https://mdxjs.com/blog/shortcodes
        "react/jsx-no-undef": `off`
      }
    }
  ]
};
