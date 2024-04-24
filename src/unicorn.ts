import type { Linter } from 'eslint'

export default {
    'unicorn/better-regex': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/no-await-expression-member': 'error',
    'unicorn/no-invalid-remove-event-listener': 'error',
    'unicorn/no-negated-condition': 'error',
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-object-as-default-parameter': 'error',
    'unicorn/no-unnecessary-await': 'error',
    'unicorn/prefer-dom-node-text-content': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/template-indent': 'warn',
} as Linter.RulesRecord
