module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["airbnb", "prettier", "prettier/react"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
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
    "prettier/prettier": "warn"
  }
};
