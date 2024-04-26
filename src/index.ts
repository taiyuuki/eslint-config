import type { ESLint, Linter } from 'eslint'
import eslint_js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import import_eslint from 'eslint-plugin-import'
import unicorn_eslint from 'eslint-plugin-unicorn'
import { stylistic_base } from './stylistic'
import base_rules from './base-rules'
import ts_rules from './ts-rules'
import vue_stylistic from './vue/stylistic'
import vue_rules from './vue/rules'
import import_rules from './imports'
import unicorn_rules from './unicorn'

interface TYKConfig {
    ts?: boolean
    vue?: boolean
    markdown?: boolean
    json?: boolean
    ignores?: string[]
    plugins?: ESLint.Plugin[]
    rules?: Linter.RulesRecord
}

export default async function(tyk_config?: TYKConfig, ...rest: Linter.FlatConfig[]) {
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
        ignores: ['**/*.json'],
    })

    // js
    eslint_config.push(eslint_js.configs.recommended)
    eslint_config.push({ rules: base_rules })

    // import
    eslint_config.push({
        plugins: { import: import_eslint as ESLint.Plugin },
        rules: import_rules,
    })

    // unicron
    eslint_config.push({
        plugins: { unicorn: unicorn_eslint as ESLint.Plugin },
        rules: unicorn_rules,
    })

    // markdown
    if (config?.markdown) {
        const markdown_eslint = await import('eslint-plugin-markdown')
        eslint_config.push(...markdown_eslint.default.configs.recommended as Linter.FlatConfig[])
    }

    // json
    if (config?.json) {
        const json_eslint = await import('eslint-plugin-jsonc')
        eslint_config.push(...json_eslint.default.configs['flat/recommended-with-jsonc'] as Linter.FlatConfig[])
    }
    
    // ts
    let typescript_eslint
    if (config?.ts) {
        typescript_eslint = await import('typescript-eslint')
        eslint_config.push(...typescript_eslint.default.configs.recommended as Linter.FlatConfig[])
        eslint_config.push({ 
            files: ['**/*.ts'],
            rules: ts_rules,
        })
    }

    // vue
    if (config?.vue) {
        const vue_eslint = await import('eslint-plugin-vue')
        eslint_config.push(...vue_eslint.default.configs['flat/recommended'] as Linter.FlatConfig[])
        
        const vue_parser = await import('vue-eslint-parser')
        if (!typescript_eslint) {
            typescript_eslint = await import('typescript-eslint')
        }
        eslint_config.push({ 
            files: ['**/*.vue'],
            languageOptions: {
                parser: vue_parser.default,
                globals: {
                    $$: 'readonly',
                    $: 'readonly',
                    $computed: 'readonly',
                    $customRef: 'readonly',
                    $ref: 'readonly',
                    $shallowRef: 'readonly',
                    $toRef: 'readonly',
                    EffectScope: 'readonly',
                    axios: 'readonly',
                    computed: 'readonly',
                    createApp: 'readonly',
                    customRef: 'readonly',
                    defineAsyncComponent: 'readonly',
                    defineComponent: 'readonly',
                    defineCustomElement: 'readonly',
                    defineSSRCustomElement: 'readonly',
                    effectScope: 'readonly',
                    getCurrentInstance: 'readonly',
                    getCurrentScope: 'readonly',
                    h: 'readonly',
                    inject: 'readonly',
                    isProxy: 'readonly',
                    isReactive: 'readonly',
                    isReadonly: 'readonly',
                    isRef: 'readonly',
                    markRaw: 'readonly',
                    nextTick: 'readonly',
                    onActivated: 'readonly',
                    onBeforeMount: 'readonly',
                    onBeforeUnmount: 'readonly',
                    onBeforeUpdate: 'readonly',
                    onDeactivated: 'readonly',
                    onErrorCaptured: 'readonly',
                    onMounted: 'readonly',
                    onRenderTracked: 'readonly',
                    onRenderTriggered: 'readonly',
                    onScopeDispose: 'readonly',
                    onServerPrefetch: 'readonly',
                    onUnmounted: 'readonly',
                    onUpdated: 'readonly',
                    provide: 'readonly',
                    reactive: 'readonly',
                    readonly: 'readonly',
                    ref: 'readonly',
                    resolveComponent: 'readonly',
                    shallowReactive: 'readonly',
                    shallowReadonly: 'readonly',
                    shallowRef: 'readonly',
                    toRaw: 'readonly',
                    toRef: 'readonly',
                    toRefs: 'readonly',
                    triggerRef: 'readonly',
                    unref: 'readonly',
                    useAttrs: 'readonly',
                    useCssModule: 'readonly',
                    useCssVars: 'readonly',
                    useRoute: 'readonly',
                    useRouter: 'readonly',
                    useSlots: 'readonly',
                    watch: 'readonly',
                    watchEffect: 'readonly',
                    watchPostEffect: 'readonly',
                    watchSyncEffect: 'readonly',
                },
                parserOptions: {
                    sourceType: 'module',
                    parser: { ts: typescript_eslint.default.parser },
                },
            },
        })
        eslint_config.push({
            files: ['**/*.vue'],
            rules: Object.assign({}, vue_stylistic, vue_rules), 
        })
    }

    // additional rules
    if (config?.rules) {
        eslint_config.push({ rules: config.rules })
    }

    // additional configs
    if (rest.length > 0) {
        eslint_config.push(...rest)
    }

    return eslint_config
}
