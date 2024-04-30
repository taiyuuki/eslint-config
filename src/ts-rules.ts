import type { Linter } from 'eslint'

export default {
    '@typescript-eslint/no-import-type-side-effects': ['error'],
    '@typescript-eslint/sort-type-constituents': ['error'],
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true, 
    }],
} as Linter.RulesRecord
