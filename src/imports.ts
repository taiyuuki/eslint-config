import type { Linter } from 'eslint'

export default {
    'import/order': 'warn',
    'import/no-useless-path-segments': 'warn',
    'import/no-unused-modules': 'warn',
    'import/no-duplicates': 'error',
    'import/newline-after-import': ['warn', { count: 1 }],
    'import/no-mutable-exports': 'error',
} as Linter.RulesRecord
