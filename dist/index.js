import eslint_js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

var base_rules = {
    'sort-imports': ['error', {
            allowSeparatedGroups: false,
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: [
                'none',
                'all',
                'multiple',
                'single',
            ],
        }],
    'prefer-template': ['error'],
    'no-lonely-if': ['error'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-implied-eval': ['error'],
    'eqeqeq': ['error', 'always'],
};

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
    'no-multi-spaces': ['warn'],
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

var ts_rules = {
    '@typescript-eslint/no-import-type-side-effects': ['error'],
    '@typescript-eslint/sort-type-constituents': ['error'],
    '@typescript-eslint/consistent-type-imports': ['error'],
};

var vue_rules = {
    "vue/array-bracket-newline": [
        "warn",
        "consistent"
    ],
    "vue/array-bracket-spacing": [
        "warn",
        "never"
    ],
    "vue/array-element-newline": [
        "warn",
        "consistent"
    ],
    "vue/arrow-spacing": [
        "warn",
        {
            "before": true,
            "after": true
        }
    ],
    "vue/block-spacing": [
        "warn",
        "always"
    ],
    "vue/brace-style": [
        "warn",
        "1tbs",
        {
            "allowSingleLine": true
        }
    ],
    "vue/comma-dangle": [
        "warn",
        "always-multiline"
    ],
    "vue/comma-spacing": [
        "warn",
        {
            "before": false,
            "after": true
        }
    ],
    "vue/comma-style": [
        "warn",
        "last"
    ],
    "vue/dot-location": [
        "warn",
        "property"
    ],
    "vue/func-call-spacing": [
        "warn",
        "never"
    ],
    "vue/key-spacing": [
        "warn",
        {
            "beforeColon": false,
            "afterColon": true
        }
    ],
    "vue/no-extra-parens": [
        "warn",
        "all"
    ],
    "vue/no-multi-spaces": [
        "warn"
    ],
    "vue/object-curly-newline": [
        "warn",
        {
            "multiline": true
        }
    ],
    "vue/object-curly-spacing": [
        "warn",
        "always"
    ],
    "vue/object-property-newline": [
        "warn",
        {
            "allowAllPropertiesOnSameLine": true
        }
    ],
    "vue/operator-linebreak": [
        "warn",
        "before"
    ],
    "vue/quote-props": [
        "warn",
        "consistent-as-needed"
    ],
    "vue/space-in-parens": [
        "warn",
        "never"
    ],
    "vue/space-infix-ops": [
        "warn"
    ],
    "vue/space-unary-ops": [
        "warn",
        {
            "words": true,
            "nonwords": false
        }
    ],
    "vue/template-curly-spacing": [
        "warn",
        "never"
    ]
};

async function index (tyk_config) {
    const config = Object.assign({ jsdoc: true, json: true, markdown: true }, tyk_config);
    const eslint_config = [];
    // ignores
    eslint_config.push({
        ignores: [
<<<<<<< HEAD
            '**/dist',
            '**/node_modules',
            '**/package-lock.json',
            '**/yarn.lock',
            '**/pnpm-lock.yaml',
=======
            '**/dist/**',
>>>>>>> 2647c0554b05eece9a0fd6e6af9186d54af3ab2e
            ...config?.ignores || [],
        ],
    });
    // stylistic
    const stylistic_rules = Object.entries(stylistic_base).reduce((rules, [key, value]) => {
        rules[`@stylistic/${key}`] = value;
        return rules;
    }, {});
    eslint_config.push({
        plugins: { '@stylistic': stylistic },
        rules: stylistic_rules,
    });
    // js
    eslint_config.push(eslint_js.configs.recommended);
<<<<<<< HEAD
    eslint_config.push({ rules: base_rules });
    // markdown
    if (config?.markdown) {
        await import('eslint-plugin-markdown').then(markdown_eslint => {
            eslint_config.push(...markdown_eslint.default.configs['recommended']);
        });
    }
=======
    // json
    if (config?.json) {
        await import('eslint-plugin-jsonc').then(json_eslint => {
            eslint_config.push(...json_eslint.default.configs['flat/recommended-with-json']);
        });
    }
    // markdown
    if (config?.markdown) {
        await import('eslint-plugin-markdown').then(markdown_eslint => {
            eslint_config.push(...markdown_eslint.default.configs['recommended']);
        });
    }
>>>>>>> 2647c0554b05eece9a0fd6e6af9186d54af3ab2e
    // ts
    if (config?.ts) {
        await import('typescript-eslint').then(ts_eslint => {
            eslint_config.push(...ts_eslint.default.configs.recommended);
<<<<<<< HEAD
            eslint_config.push({ rules: ts_rules });
=======
>>>>>>> 2647c0554b05eece9a0fd6e6af9186d54af3ab2e
        });
    }
    // vue
    if (config?.vue) {
        await import('eslint-plugin-vue').then(vue_eslint => {
            eslint_config.push(...vue_eslint.default.configs['flat/recommended']);
            eslint_config.push({ rules: vue_rules });
        });
    }
    // external rules
    if (config?.rules) {
        eslint_config.push({ rules: config.rules });
    }
    return eslint_config;
}

export { index as default };
