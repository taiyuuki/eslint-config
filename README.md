# Usage

```bash
pnpm i @taiyuuki/eslint-config -D
```

```js
// eslint.config.mjs
import tyk_config from '@taiyuuki/eslint-config'

export default tyk_config({
    indent: 2, // default 4
    ts: true, // default false
    vue: true, // default false
    markdown: false, // default true
    json: false, // default true
    ignores: ['scripts/**'],
    rules: {
        
        // custom rules
        curly: ['error'],
    },
})
```