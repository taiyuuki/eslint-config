import stylistic from '@stylistic/eslint-plugin';
import eslint_js from '@eslint/js';

const stylistic_base = {
    'array-bracket-newline': ['warn', 'consistent'],
    'array-bracket-spacing': ['warn', 'never'],
    'array-element-newline': ['warn', 'consistent'],
    'arrow-parens': ['warn', 'as-needed'],
    'arrow-spacing': ['warn', { before: true, after: true }],
    'block-spacing': ['warn', 'always'],
    'brace-style': ['warn', '1tbs', { allowSingleLine: true }],
    'comma-dangle': ['warn', 'always-multiline'],
    'comma-spacing': ['warn', { before: false, after: true }],
    'comma-style': ['warn', 'last'],
    'computed-property-spacing': ['warn', 'never'],
    'dot-location': ['warn', 'property'],
    'eol-last': ['warn', 'always'],
    'func-call-spacing': ['warn', 'never'],
    'function-call-argument-newline': ['warn', 'consistent'],
    'function-paren-newline': ['warn', 'multiline'],
    'indent': ['warn', 4],
    'key-spacing': ['warn', { beforeColon: false, afterColon: true }],
    'lines-around-comment': ['warn', { beforeBlockComment: true, beforeLineComment: true }],
    'lines-between-class-members': ['warn', 'always', { exceptAfterOverload: false }],
    'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 2 }],
    'no-extra-parens': ['warn', 'all'],
    'no-extra-semi': ['warn'],
    'no-mixed-spaces-and-tabs': ['warn'],
    'no-multi-spaces': ['warn', { ignoreEOLComments: true }],
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'no-tabs': ['warn'],
    'no-whitespace-before-property': ['warn'],
    'nonblock-statement-body-position': ['warn', 'beside'],
    'object-curly-newline': ['warn', { multiline: true }],
    'object-curly-spacing': ['warn', 'always'],
    'object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
    'one-var-declaration-per-line': ['warn', 'always'],
    'operator-linebreak': ['warn', 'before'],
    'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'return' }],
    'quote-props': ['warn', 'consistent-as-needed'],
    'quotes': ['warn', 'single'],
    'rest-spread-spacing': ['warn', 'never'],
    'semi': ['warn', 'never'],
    'semi-spacing': ['warn', { before: false, after: true }],
    'semi-style': ['warn', 'last'],
    'space-before-blocks': ['warn', 'always'],
    'space-before-function-paren': ['warn', 'never'],
    'space-in-parens': ['warn', 'never'],
    'space-infix-ops': ['warn'],
    'space-unary-ops': ['warn', { words: true, nonwords: false }],
    'spaced-comment': ['warn', 'always'],
    'switch-colon-spacing': ['warn', { after: true, before: false }],
    'template-curly-spacing': ['warn', 'never'],
    'template-tag-spacing': ['warn', 'never'],
    'type-annotation-spacing': ['warn', { before: false, after: true }],
    'indent-binary-ops': ['warn', 4],
    'type-generic-spacing': ['warn'],
    'type-named-tuple-spacing': ['warn'],
};

async function index (tyk_config) {
    const eslint_config = [];
    const stylistic_rules = Object.entries(stylistic_base).reduce((rules, [key, value]) => {
        rules[`@stylistic/${key}`] = value;
        return rules;
    }, {});
    eslint_config.push({
        ignores: [
            'dist/**',
            'node_modules/**',
            ...tyk_config?.ignores || [],
        ],
    });
    eslint_config.push(eslint_js.configs.recommended);
    eslint_config.push({
        plugins: { '@stylistic': stylistic },
        rules: stylistic_rules,
    });
    if (tyk_config?.ts) {
        await import('typescript-eslint').then(ts_eslint => {
            eslint_config.push(...ts_eslint.configs.recommended);
        });
    }
    if (tyk_config?.vue) {
        // await import('vue-eslint-parser').then(vue_parser => {
        //     eslint_config.push({ languageOptions: { parser: vue_parser.default } })
        // })
        await import('eslint-plugin-vue').then(vue_eslint => {
            eslint_config.push(...vue_eslint.default.configs['flat/recommended']);
        });
    }
    return eslint_config;
}

export { index as default };