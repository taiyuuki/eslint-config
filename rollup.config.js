import { defineConfig } from 'rollup'
import ts from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'

const config = defineConfig([
    {
        input: ['src/index.ts'],
        output: [
            {
                dir: 'dist',
                format: 'esm',
            },
        ],
        plugins: [
            ts(),
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
