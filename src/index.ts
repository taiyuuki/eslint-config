import type antfu from '@antfu/eslint-config'

type OptionsConfig = Parameters<typeof antfu>[0]

export function tyk_eslint(options?: OptionsConfig): OptionsConfig {
    const defaultOptions: OptionsConfig = {
        stylistic: {
            indent: 4,
            overrides: {
                'array-element-newline': ['warn', 'consistent'],
                'comma-dangle': ['warn', {
                    arrays: 'always-multiline',
                    objects: 'always-multiline',
                    imports: 'always-multiline',
                    exports: 'always-multiline',
                    functions: 'always-multiline',
                }],
                'comma-spacing': 'warn',
                'comma-style': 'warn',
                'computed-property-spacing': ['warn', 'never'],
                'eol-last': ['warn', 'always'],
                'func-call-spacing': ['warn', 'never'],
                'indent': ['warn', 4, {
                    SwitchCase: 1,
                    VariableDeclarator: 1,
                    outerIIFEBody: 1,
                }],
                'implicit-arrow-linebreak': ['warn', 'beside'],
                'key-spacing': ['warn', { beforeColon: false, afterColon: true }],
                'keyword-spacing': ['warn', { after: true }],
                'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
                'new-cap': ['warn', { newIsCap: true }],
                'no-lonely-if': 'warn',
                'no-multiple-empty-lines': ['warn', { max: 1 }],
                'no-negated-condition': 'warn',
                'no-trailing-spaces': 'warn',
                'no-unneeded-ternary': 'warn',
                'no-whitespace-before-property': 'warn',
                'nonblock-statement-body-position': ['warn', 'beside'],
                'object-curly-newline': ['warn', { multiline: true, consistent: true }],
                'object-curly-spacing': ['warn', 'always'],
                'object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
                'operator-linebreak': ['warn', 'before'],
                'padded-blocks': ['warn', 'never'],
                'quotes': ['warn', 'single', { avoidEscape: true }],
                'semi': ['warn', 'never'],
                'space-before-blocks': ['warn', 'always'],
                'space-before-function-paren': ['warn', {
                    anonymous: 'always',
                    named: 'never',
                    asyncArrow: 'always',
                }],
                'space-in-parens': ['warn', 'never'],
                'space-infix-ops': 'warn',
                'space-unary-ops': 'warn',
                'spaced-comment': ['warn', 'always'],
                'switch-colon-spacing': ['warn', { after: true, before: false }],
                'template-tag-spacing': ['warn', 'never'],
            },

        },
        rules: {
            // off
            'curly': 'off',
            'no-throw-literal': 'off',
            'import/no-mutable-exports': 'off',
            'prefer-promise-reject-errors': 'off',
            'arrow-parens': 'off',
            'no-new-function': 'off',

            'ts/ban-types': 'off',

            // error
            'no-extra-parens': 'error',

            // best practices
            'accessor-pairs': 'warn',
            'no-empty-function': 'warn',
            'require-await': 'warn',

            // variables
            'no-use-before-define': 'error',
            'camelcase': 'off',

            // cmj
            'no-new-require': 'error',
            'arrow-spacing': ['warn', { before: true, after: true }],
            'no-var': 'warn',
            'prefer-const': ['warn', {
                destructuring: 'all',
                ignoreReadBeforeAssign: true,
            }],
            'rest-spread-spacing': ['warn', 'never'],

        },
        ignores: [],
    }
    return Object.assign(defaultOptions, options)
}
