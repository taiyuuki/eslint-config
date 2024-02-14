# Usage

```bash
pnpm i @taiyuuki/eslint-config @antfu/eslint-config -D
```

```js
// eslint.config.js
import antfu from '@antfu/eslint-config'
import { tyk_config } from '@taiyuuki/eslint-config'

export default antfu(tyk_config({
    // config
}))
```
