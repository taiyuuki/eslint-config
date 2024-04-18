# Usage

```bash
pnpm i @taiyuuki/eslint-config -D
```

```js
// eslint.config.js
import tyk_config from '@taiyuuki/eslint-config'

export default tyk_config({
    ts: true
    vue: true
    ignores: [
        'lib/**'
    ]
})
```
