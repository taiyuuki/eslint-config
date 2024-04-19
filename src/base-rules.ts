import type { Linter } from 'eslint'

export default {
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
} as Linter.RulesRecord
