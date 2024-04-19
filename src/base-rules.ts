import type { Linter } from 'eslint'

export default {
    'array-callback-return': ['error'],
    'dot-notation': ['error'],
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
    'default-case-last': ['error'],
} as Linter.RulesRecord
