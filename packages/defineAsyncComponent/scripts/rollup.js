import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import * as rollup from "rollup";
import vue from "rollup-plugin-vue";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve as resolve } from "@rollup/plugin-node-resolve";
import filesize from "rollup-plugin-filesize";
import { babel, getBabelOutputPlugin } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
// import copy from 'rollup-plugin-copy';
import image from "rollup-plugin-img";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const babelOptions = {
  // include: ["src/**" ],
  exclude: ["**/node_modules/**", "**/src/**"],
  extensions: [".js", ".vue", ".json"],
  babelHelpers: "bundled",
  babelrc: false,
  presets: ["@babel/preset-env"],
};

function setDefaultPlugins(config) {
  const exclude = "**/node_modules/**";
  const plugins = [
    resolve({
      extensions: [".js", ".ts", ".vue", ".json"],
    }),
    // commonjs(),
    json(),
    typescript({
      check: false,
      clean: true,
      tsconfig: path.resolve(__dirname, "../tsconfig.json"),
    }),
    vue({
      compileTemplate: true, // 是否需要将 template 编译成 render 函数
      css: true, // 是否需要将样式提取到单独的文件
      style: { // 样式处理选项
        postcssPlugins: []
      }
    }),
    postcss(),
    filesize(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    image({
      hash: false,
      extensions: /\.(png|jpg|jpeg|gif|svg)$/,
      limit: 99999, // default 8192(8k)
      exclude,
    }),
    babel(babelOptions),
    alias({
      entries: {
        ["@"]: path.resolve(__dirname, "../src"),
      },
      resolve: [".js", ".ts", ".vue", ".json"],
    }),
  ];
  return plugins;
}

export default async function build(config) {
  const { output, input, format, moduleName, min, copyTargets } = config;

  const inputOptions = {
    input,
    external: ["vue"],
    plugins: setDefaultPlugins(),
  };

  const outputOptions = {
    format,
    name: moduleName,
    file: output,
    extend: true,
    globals: { vue: "Vue" },
    plugins: [
      getBabelOutputPlugin({
        allowAllFormats: true,
        babelrc: false,
        presets: ["@babel/preset-env"],
      }),
      min && terser(),
      // 用插件将不需要编译的静态文件直接复制到输出路径中
      copyTargets &&
        copyTargets.length &&
        copy({
          targets: copyTargets,
        }),
    ].filter(Boolean),
  };

  try {
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
    await bundle.close();
  } catch (error) {
    debugger;
  }

}

// let FILENAME = filePath.match(/([^/]+)(\.vue)$/)[1];

build({
  output: `server/public/index.js`,
  moduleName: `test`,
  input: path.resolve(__dirname, "../src/async-components/index.vue"),
  format: "iife",
  min: false,
});


