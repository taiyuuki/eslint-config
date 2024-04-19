import type { Linter } from 'eslint'

export default {
    '@typescript-eslint/no-import-type-side-effects': ['error'],
    '@typescript-eslint/sort-type-constituents': ['error'],
    '@typescript-eslint/consistent-type-imports': ['error'],
} as Linter.RulesRecord
