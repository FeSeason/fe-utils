import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const liveServer = require('rollup-plugin-live-server');

const isProduction = process.env.NODE_ENV === 'production';
const BUILD_ENV = process.env.BUILD_ENV;
const version = require('./package.json').version;
const name = require('./package.json').name;

console.log(
  '【isProduction】:',
  isProduction,
  ', [BUILD_ENV】:',
  process.env.BUILD_ENV,
);

const banner =
  '/*!\n' +
  ` * ${name} v${version}\n` +
  ` * Release Date ${new Date().toLocaleString()}\n` +
  ` * (c) 2021-${new Date().getFullYear()}\n` +
  ' */';

const inputs = ['./src/index.ts'];
const outputDir = './lib';
let configs;

const basePlugins = [
  json(),
  resolve({
    browser: true,
  }),
  commonjs(),
  typescript({ target: 'es5' }),
  postcss({
    extract: false,
    inject: true,
  }),
  replace({
    values: { 'process.env.BUILD_ENV': JSON.stringify(BUILD_ENV) },
    preventAssignment: true,
  }),

  babel({
    extensions: ['.js', '.ts'],
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
];

if (isProduction) {
  configs = [];
  /** commonjs */
  configs.push.apply(
    configs,
    inputs.map((ipt) => ({
      input: ipt,
      output: {
        exports: 'auto',
        dir: outputDir + '/commonjs',
        format: 'cjs',
        banner,
        // 开启需要在 tsconfig 同步开启
        // sourcemap: 'hidden',
      },
      plugins: basePlugins.concat([terser()]),
    })),
  );

  /** esm */
  configs.push.apply(
    configs,
    inputs.map((ipt) => ({
      input: ipt,
      preserveModules: true,
      output: [
        {
          dir: outputDir + '/esm',
          format: 'es',
          banner,

          // 开启需要在 tsconfig 同步开启
          // sourcemap: 'hidden',
        },
      ],
      plugins: basePlugins.concat([terser({ module: true })]),
    })),
  );
}

export default configs;
