import tyk_eslint from '@taiyuuki/eslint-config'

export default tyk_eslint({ 
    ts: true, 
    vue: true,
    ignores: [
        'dist/**', 
        'src/vue/stylistic.ts',
    ], 
})
