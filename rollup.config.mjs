import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
    input: 'grechabuf.ts',
    output: [
        {
            file: "./dist/grechabuf.min.cjs",
            sourcemap: true,
            format: 'cjs',
        },
        {
            file: "./dist/grechabuf.min.mjs",
            sourcemap: true,
            format: 'es',
        }
    ],
    plugins: [
        typescript(),
        terser()
    ]
};
