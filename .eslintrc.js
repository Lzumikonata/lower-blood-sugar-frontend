// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: "standard",
  // required to lint *.vue files
  plugins: [
    "html",
  ],
  // add your custom rules here
  "rules": {
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production"? 2: 0,
    indent: [1, 2, {"SwitchCase": 1}],
    quotes: [1, "single"],
    "linebreak-style": [1, "unix"],
    semi: [0, "never"],
    "no-undef": [1],
    "no-console": [0],
    "no-debug": [0],
    "no-unused-vars": [1],
    "space-infix-ops": [1],
    "no-multi-spaces": [1],
    "no-fallthrough": [0],
    "comma-dangle": [1, "always-multiline"],
    "eol-last": "error",
    "no-global-assign": [0],
    "no-unsafe-finally": [0],
    "strict": [0],
  },
};
