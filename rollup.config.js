import { readdirSync } from 'fs';

import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

function pluginFn() {
  return [
    nodeResolve(),
    commonjs(),
    typescript({
      declarationDir: '.',
      include: ['src/*.ts'],
      tsconfig: './tsconfig.json',
    }),
    terser({
      compress: true,
      mangle: {
        properties: { regex: /^_/ },
        reserved: [],
        safari10: true,
        toplevel: true,
      },
      output: { safari10: true },
      safari10: true,
      toplevel: true,
    }),
  ];
};

const src = './src';
export const allLibs = readdirSync(src).filter(n => /\.ts$/i.test(n));

const multiBuild = allLibs.reduce((p, n) => {
  const esm = {
    input: `${src}/${n}`,
    plugins: pluginFn(),
    treeshake: { moduleSideEffects: false },
    output: {
      file: `dist/${n.replace(/ts$/i, 'js')}`,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      format: 'esm',
    },
  };

  p.push(esm);

  return p;
}, []);

export default multiBuild;
