import type { ESLint, Linter } from 'eslint'
import stylistic from '@stylistic/eslint-plugin'
import { stylistic_base } from './base'
import eslint_js from '@eslint/js'
import vue_rules from './vue-rules'

interface TYKConfig {
    ts?: boolean
    vue?: boolean
    ignores?: string[]
    plugins?: ESLint.Plugin[]
    rules?: Linter.RulesRecord
}

export default async function(tyk_config?: TYKConfig) {
    const eslint_config: Linter.FlatConfig[] = []

    const stylistic_rules = Object.entries(stylistic_base).reduce((rules, [key, value]) => {
        rules[`@stylistic/${key}`] = value as Linter.RuleEntry

        return rules
    }, {} as Linter.RulesRecord)

    eslint_config.push({
        ignores: [
            'dist/**',
            'node_modules/**',
            ...tyk_config?.ignores || [],
        ],
    })

    eslint_config.push(eslint_js.configs.recommended)

    eslint_config.push({
        plugins: { '@stylistic': stylistic as ESLint.Plugin },
        rules: stylistic_rules,
    })
    
    if (tyk_config?.ts) {
        await import('typescript-eslint').then(ts_eslint => {
            eslint_config.push(...ts_eslint.configs.recommended as Linter.FlatConfig[])
        })
    }

    if (tyk_config?.vue) {

        await import('eslint-plugin-vue').then(vue_eslint => {
            eslint_config.push(...vue_eslint.default.configs['flat/recommended'] as Linter.FlatConfig[])
            eslint_config.push({ rules: vue_rules })
        })
    }

    return eslint_config
}
