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
    indent?: number
    ts?: boolean
    vue?: boolean
    jsx?: boolean
    reactVersion?: string | 'detect'
    markdown?: boolean
    json?: boolean
    ignores?: string[]
    plugins?: ESLint.Plugin[]
    rules?: Linter.RulesRecord
}

export default async function(tyk_config?: TYKConfig, ...rest: Linter.Config[]) {
    const config = Object.assign({ jsdoc: true, json: true, markdown: true }, tyk_config)
    const eslint_config: Linter.Config[] = []
    
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

    // js
    eslint_config.push(eslint_js.configs.recommended)
    eslint_config.push({ rules: base_rules })

    // import
    eslint_config.push({
        plugins: { import: import_eslint as ESLint.Plugin },
        rules: import_rules,
    })

    // jsx
    if (config?.jsx) {
        const { default: jsx_eslint } = await import('eslint-plugin-react')
        eslint_config.push(jsx_eslint.configs.flat.recommended)
    }

    // unicron
    eslint_config.push({
        plugins: { unicorn: unicorn_eslint as ESLint.Plugin },
        rules: unicorn_rules,
    })

    // markdown
    if (config?.markdown) {
        const markdown_eslint = await import('eslint-plugin-markdown')
        eslint_config.push(...markdown_eslint.default.configs.recommended as Linter.Config[])
    }

    // json
    if (config?.json) {
        const json_eslint = await import('eslint-plugin-jsonc')
        eslint_config.push(...json_eslint.default.configs['flat/recommended-with-jsonc'] as Linter.Config[])
    }
    
    // ts
    let typescript_eslint
    if (config?.ts) {

        typescript_eslint = await import('typescript-eslint')
        const files = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']
        const recommendedConfigs = typescript_eslint.default.configs.recommended as Linter.Config[]
        recommendedConfigs.forEach(config => {
            eslint_config.push({
                files,
                ...config,
            })
        })

        eslint_config.push({ 
            files,
            rules: ts_rules,
        })
    }

    // vue
    if (config?.vue) {
        const vue_eslint = await import('eslint-plugin-vue')
        eslint_config.push(...vue_eslint.default.configs['flat/recommended'] as Linter.Config[])
        
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
                    onBeforeRouteUpdate: 'readonly',
                    onBeforeRouteLeave: 'readonly',
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
                    parser: typescript_eslint.default.parser,
                },
            },
        })
        eslint_config.push({
            files: ['**/*.vue'],
            rules: Object.assign({}, vue_stylistic, vue_rules), 
        })
    }

    // stylistic
    const stylistic_rules = Object.entries(stylistic_base).reduce((rules, [key, value]) => {
        rules[`@stylistic/${key}`] = value as Linter.RuleEntry

        return rules
    }, {} as Linter.RulesRecord)
    if (config.indent) {
        stylistic_rules['@stylistic/indent'] = ['warn', config.indent]
    }
    eslint_config.push({
        files: ['**/*.{js,jsx,ts,tsx,vue,css,scss,less,styl,stylus,sass,md}'],
        plugins: { '@stylistic': stylistic as ESLint.Plugin },
        rules: stylistic_rules,
        ignores: ['**/*.json'],
    })

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
