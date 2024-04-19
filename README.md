# Usage

```bash
pnpm i @taiyuuki/eslint-config -D
```

```js
// eslint.config.js
import tyk_config from '@taiyuuki/eslint-config'

export default tyk_config({
    ts: true, // default false
    vue: true, // default false
    markdown: false, // default true
    ignores: ['.config/**'],
    rules: {
        
        // custom rules
        curly: ['error'],
    },
})
```