import type { Linter } from 'eslint'

export default {
    'import/order': 'warn',
    'import/no-useless-path-segments': 'warn',
    'import/no-unused-modules': 'warn',
    'import/no-duplicates': 'error',
    
    // Not yet supported in ESLint v9.0.0
    // 'import/newline-after-import': 'warn',
    // 'import/no-mutable-exports': 'error',
    // 'import/no-self-import': 'error',
} as Linter.RulesRecord
