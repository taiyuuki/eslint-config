import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'

const config = defineConfig([
    {
        input: ['src/index.ts'],
        output: [
            {
                dir: 'dist',
                format: 'esm',
            },
            {
                file: 'dist/index.cjs',
                format: 'cjs',
            },
        ],
        plugins: [
            ts(),
            commonjs(),
        ],
    },

    // 打包类型声明
    {
        input: 'src/index.ts',
        output: {
            dir: 'dist',
            format: 'esm',
        },
        plugins: [
            dts(),
        ],
    },
])

export default config
