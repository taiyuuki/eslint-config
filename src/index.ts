import type { ESLint, Linter } from 'eslint'
import stylistic from '@stylistic/eslint-plugin'
import eslint_js from '@eslint/js'
import { stylistic_base } from './base'
import vue_rules from './vue-rules'

interface TYKConfig {
    ts?: boolean
    vue?: boolean
    json?: boolean
    markdown?: boolean
    ignores?: string[]
    plugins?: ESLint.Plugin[]
    rules?: Linter.RulesRecord
}

export default async function(tyk_config?: TYKConfig) {
    const config = Object.assign({ jsdoc: true, json: true, markdown: true }, tyk_config)
    const eslint_config: Linter.FlatConfig[] = []
    
    // ignores
    eslint_config.push({
        ignores: [
            '**/dist/**',
            ...config?.ignores || [],
        ],
    })

    // stylistic
    const stylistic_rules = Object.entries(stylistic_base).reduce((rules, [key, value]) => {
        rules[`@stylistic/${key}`] = value as Linter.RuleEntry

        return rules
    }, {} as Linter.RulesRecord)
    eslint_config.push({
        plugins: { '@stylistic': stylistic as ESLint.Plugin },
        rules: stylistic_rules,
    })

    // js
    eslint_config.push(eslint_js.configs.recommended)

    // json
    if (config?.json) {
        await import('eslint-plugin-jsonc').then(json_eslint => {
            eslint_config.push(...json_eslint.default.configs['flat/recommended-with-json'] as Linter.FlatConfig[])
        })
    }

    // markdown
    if (config?.markdown) {
        await import('eslint-plugin-markdown').then(markdown_eslint => {
            eslint_config.push(...markdown_eslint.default.configs['recommended'] as Linter.FlatConfig[])
        })
    }
    
    // ts
    if (config?.ts) {
        await import('typescript-eslint').then(ts_eslint => {
            eslint_config.push(...ts_eslint.default.configs.recommended as Linter.FlatConfig[])
        })
    }

    // vue
    if (config?.vue) {
        await import('eslint-plugin-vue').then(vue_eslint => {
            eslint_config.push(...vue_eslint.default.configs['flat/recommended'] as Linter.FlatConfig[])
            eslint_config.push({ rules: vue_rules })
        })
    }

    // external rules
    if (config?.rules) {
        eslint_config.push({ rules: config.rules })
    }

    return eslint_config
}
