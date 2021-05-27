import {terser} from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve'
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: [{
        file: 'dist/bundle.development.esm.js',
        format: 'es'
    },
    {
        file: 'example/example.js',
        format: 'es'
    },
    {
        file: 'dist/bundle.production.esm.js',
        format: 'es',
        plugins: [terser()]
    }],
    plugins: [
        typescript(),
        serve('example')
    ]
}