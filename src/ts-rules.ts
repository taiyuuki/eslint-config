import type { Linter } from 'eslint'

export default {
    '@typescript-eslint/no-import-type-side-effects': ['error'],
    '@typescript-eslint/sort-type-constituents': ['error'],
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
} as Linter.RulesRecord
