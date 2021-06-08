import {terser} from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve'
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default {
    input: 'src/Uragirimono.ts',
    output: [{
        file: 'dist/bundle.development.esm.js',
        format: 'es'
    },
    {
        file: 'dist/bundle.production.esm.js',
        format: 'es',
        plugins: [terser()]
    }],
    plugins: [
        typescript(),
        copy({
            targets: [
              { src: 'dist/bundle.development.esm.js', dest: 'example' }
            ],
            hook: "writeBundle",
        }),
        serve('example'),
        
    ]
}