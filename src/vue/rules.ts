import type { Linter } from 'eslint'

export default {
    'vue/muti-word-component-names': 'off',
    'vue/require-macro-variable-name': ['error', {
        defineProps: 'props',
        defineEmits: 'emit',
        defineSlots: 'slots',
        useSlots: 'slots',
        useAttrs: 'attrs',
    }],
    'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
    'vue/block-tag-newline': ['error'],
    'vue/multi-word-component-names': 'off',
} as Linter.RulesRecord
