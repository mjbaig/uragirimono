import {terser} from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve'
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

const isBuild = process.env.NODE_ENV === "build";

const plugins = isBuild ? [
    typescript({
        tsconfig: "tsconfig.json",
    }),
    copy({
        targets: [
          { src: 'dist/bundle.development.esm.js', dest: 'example' }
        ],
        hook: "writeBundle",
    }),
    
    ] : [
        typescript({
            tsconfig: "tsconfig.json",
        }),
        copy({
            targets: [
              { src: 'dist/bundle.development.esm.js', dest: 'example' }
            ],
            hook: "writeBundle",
        }),
        serve('example'),
        
    ]

export default {
    input: 'src/Uragirimono.ts',
    output: [{
        file: 'dist/bundle.development.esm.js',
        format: 'es',
    },
    {
        file: 'dist/uragirimono.esm.js',
        format: 'es',
        sourcemap: isBuild
    },
    {
        file: 'dist/bundle.production.esm.js',
        format: 'es',
        sourcemap: isBuild,
        plugins: [terser()]
    }],
    plugins: plugins
}