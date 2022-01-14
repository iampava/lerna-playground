import dts from 'rollup-plugin-dts';
import postcssUrl from 'postcss-url';
import copy from 'rollup-plugin-copy';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const tsConfigJson = require('./tsconfig.json');

// Different configs based on build (development | production)
const ENV_CONFIG = {
  DEV: {
    sourcemap: true
  },
  PROD: {
    sourcemap: false
  }
};

const envConfig = process.env.NODE_ENV === 'production' ? ENV_CONFIG.PROD : ENV_CONFIG.DEV;
console.debug('rollup.config.js: using following ENV_CONFIG:', envConfig);

export default [
  {
    // As long as we have the ESM export below, the react/next
    // apps correctly handle tree-shaking(ie: only bundling what we're importing).
    input: ['src/index.ts'],
    output: [
      {
        // Export 1: CommonJS format
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: envConfig.sourcemap,
      },
      {
        // Export 2: ES Modules format
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: envConfig.sourcemap,
      }
    ],
    plugins: [
      // Ignore peerDependencies
      peerDepsExternal(),

      // Needed for locating modules (ie: module resolution)
      nodeResolve(),

      // Convert CommonJS modules to ES6, so they can
      // be included in a Rollup bundle.
      commonjs(),

      /**
       * We want this plugin to only generated output JS files,
       * not the declarations (.d.ts) as well. That's because
       * we're generating them separately, outside the rollup process,
       * via the tsc compiler. Have a look at README.md for the
       * motivation behind this.
       */
      typescript({
        ...tsConfigJson.compilerOptions,
        declaration: false,
        outDir: undefined,
        declarationDir: undefined,
        exclude: ['dist/**/*', 'dist/types/**/*'],
      }),

      // Encode images to base64
      image(),

      // Handle CSS
      postcss({
        extract: false,
        minimize: true,
        use: ['sass'],
        plugins: [
          postcssUrl({
            // Enable inline assets using base64 encoding
            url: "inline", // 
            // Maximum file size to inline (in kilobytes)
            maxSize: 100, // 
            // Fallback method to use if max size is exceeded
            // FIXME: if the image exceeds `maxSize`, it's not visible in the consuming app. 
            fallback: "copy", // 
          }),
        ],
      }),

      // Minify generated es bundle
      terser(),

      /**
       * Copy styles and assets inside dist.
       * We want them accessible from consuming apps via
       * direct imports.
       * eg: import X from 'ui-library/styles/...'
       */
      copy({
        targets: [
          { src: 'src/styles', dest: 'dist' },
          { src: 'src/assets', dest: 'dist' },
          /**
           * On NPM we'll publish just the /dist folder,
           * while locally we're also linking just to the /dist folder.
           * For everything to work as expected we need a package.json
           * here, BUT with the correct paths in 'main', 'module' and other
           * fields, since now this is in the /dist folder.
           */
          {
            src: 'package.json',
            dest: 'dist',
            transform: (contents) => {
              const packageJson = JSON.parse(contents.toString());
              const distPackageJson = mapPackageJsonToDist(packageJson);

              return JSON.stringify(distPackageJson);
            }
          }
        ]
      }),
    ],
  },

  /**
   * We configured TSC to generate declarations
   * under /dist/types/**. With this plugin we can
   * move those types inside /dist/index.d.ts.
   */
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: "esm" }],
    plugins: [dts()],
  },
];

function mapPackageJsonToDist(packageJson) {
  packageJson.main = packageJson.main.split('dist/')[1];
  packageJson.module = packageJson.module.split('dist/')[1];
  packageJson.types = packageJson.types.split('dist/')[1];

  return packageJson;
}
