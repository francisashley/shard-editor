import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";
import json from "rollup-plugin-json";

export default [
  transpile("src/index", "dist", "shard-editor"),
  transpile("src/BaseShard", "dist", "base-shard"),
  transpile("src/shards/block-image", "dist/shards", "block-image"),
  transpile("src/shards/blog-header", "dist/shards", "blog-header"),
  transpile("src/shards/markdown", "dist/shards", "markdown"),
  transpile("src/shards/nav", "dist/shards", "nav")
];

function transpile(entry, dest, name) {
  return {
    input: entry,
    output: [
      {
        file: dest + "/" + name + ".js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
        globals: {
          "@babel/runtime/regenerator": "regeneratorRuntime"
        }
      },
      {
        file: dest + "/" + name + ".es.js",
        format: "es",
        sourcemap: true,
        exports: "named",
        globals: {
          "@babel/runtime/regenerator": "regeneratorRuntime"
        }
      }
    ],
    plugins: [
      external(),
      postcss({ extract: true }),
      url({ exclude: ["**/*.svg"] }),
      svgr(),
      babel({
        exclude: "node_modules/**"
      }),
      resolve({ preferBuiltins: true }),
      commonjs(),
      json()
    ]
  };
}
