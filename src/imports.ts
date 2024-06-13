import type { Linter } from 'eslint'

export default {
    'import/order': 'warn',
    'import/no-useless-path-segments': 'warn',
    'import/no-unused-modules': 'warn',
    'import/no-duplicates': 'error',
    
    // Not yet supported in ESLint v9.0.0
    // use @eslint/compat to resolve it temporarily
    // see https://eslint.org/blog/2024/05/eslint-compatibility-utilities/
    'import/newline-after-import': ['warn', { count: 1 }],
    'import/no-mutable-exports': 'error',
} as Linter.RulesRecord
