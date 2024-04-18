
declare module 'eslint-plugin-vue' {
    import type { Linter } from 'eslint'
    const eslint_plugin_vue: {
        configs: {
            'flat/recommended': Linter.FlatConfig<Linter.RulesRecord>;
        }
        rules: Linter.RulesRecord
        meta: {
            name: string,
            version: string,
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

declare module 'eslint-plugin-markdown' {
    import type { Linter } from 'eslint'
    const eslint_plugin_markdown: {
        configs: {
            recommended: Linter.FlatConfig<Linter.RulesRecord>;
        }
    }
    export default eslint_plugin_markdown
}
