module.exports = {
  presets: [["@babel/preset-env"], "@babel/preset-react"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-do-expressions",
    "@babel/plugin-proposal-json-strings",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining"
  ],
  env: {
    test: {
      presets: [
        ["@babel/preset-env", { targets: { node: "current" }, useBuiltIns: "usage", corejs: 3 }],
        "@babel/preset-react"
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-do-expressions",
        "@babel/plugin-proposal-json-strings",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-optional-chaining"
      ]
    }
  }
};
