
declare module 'eslint-plugin-vue' {
    import type { Linter } from 'eslint'
    const eslint_plugin_vue: {
        configs: {
            'flat/recommended': Linter.FlatConfig<Linter.RulesRecord>;
        }
    }
    export default eslint_plugin_vue
}

declare module '@eslint/js' {
    import type { Linter } from 'eslint'
    const eslint: {
        configs: {
            recommended: Linter.FlatConfig<Linter.RulesRecord>;
        }
    }
    export default eslint
}
