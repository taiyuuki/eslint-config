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
    'vue/block-order': ['error'],
    'vue/block-tag-newline': ['error'],
} as Linter.RulesRecord
