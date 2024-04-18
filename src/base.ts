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
}

export { stylistic_base }
