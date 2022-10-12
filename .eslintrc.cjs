// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
    root: false,
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "prettier", // config-prettier disables eslint rules that conflict with prettier
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    parser: "@typescript-eslint/parser",
    plugins: ["react", "react-hooks", "@typescript-eslint"],
    ignorePatterns: ["*.mdx"],
    rules: {
        "react/prop-types": "off",
        // sx is no longer typed on jsx elements, but it's there if you do the pragme 
        // https://github.com/system-ui/theme-ui/issues/1307
        "react/no-unknown-property": ["error", { ignore: ["sx"]}]
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            extends: [
                "eslint:recommended",
                "plugin:@typescript-eslint/eslint-recommended", // disable core eslint rules that conflict with replacement @typescript-eslint rules
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
                "plugin:react/recommended",
                "plugin:react/jsx-runtime",
                "plugin:react-hooks/recommended",
                "prettier", // config-prettier disables eslint rules that conflict with prettier
            ],
            parserOptions: {
                tsconfigRootDir: __dirname,
                ecmaVersion: "latest",
                sourceType: "module",
                project: ["./tsconfig.json"],
            },
            rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        // jsx is used in the pragma, not unused
        "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "jsx" }]
            }
        }
    ],
};

module.exports = eslintConfig;