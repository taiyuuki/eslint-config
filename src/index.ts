import type { ESLint, Linter } from 'eslint'
import base_rules from './base-rules'
import eslint_js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { stylistic_base } from './stylistic'
import ts_rules from './ts-rules'
import vue_rules from './vue-rules'
import typescriptEslint from 'typescript-eslint'

interface TYKConfig {
    ts?: boolean
    vue?: boolean
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
            '**/dist',
            '**/node_modules',
            '**/package-lock.json',
            '**/yarn.lock',
            '**/pnpm-lock.yaml',
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
    eslint_config.push({ rules: base_rules })

    // markdown
    if (config?.markdown) {
        await import('eslint-plugin-markdown').then(markdown_eslint => {
            eslint_config.push(...markdown_eslint.default.configs['recommended'] as Linter.FlatConfig[])
        })
    }
    
    // ts
    if (config?.ts) {
        eslint_config.push(...typescriptEslint.configs.recommended as Linter.FlatConfig[])
        eslint_config.push({ rules: ts_rules })
    }

    // vue
    if (config?.vue) {
        await import('eslint-plugin-vue').then(vue_eslint => {
            eslint_config.push(...vue_eslint.default.configs['flat/recommended'] as Linter.FlatConfig[])
        })
        
        await import('vue-eslint-parser').then(vue_parser => {
            eslint_config.push({ 
                files: ['*.vue'],
                languageOptions: {
                    parser: vue_parser.default,
                    parserOptions: {
                        sourceType: 'module',
                        parser: { ts: typescriptEslint.parser },
                    },
                },
            })
        })
        eslint_config.push({ rules: vue_rules })
    }

    // external rules
    if (config?.rules) {
        eslint_config.push({ rules: config.rules })
    }

    return eslint_config
}
