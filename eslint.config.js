import antfu from '@antfu/eslint-config'
import { tyk_eslint } from './eslint/index.js'

export default antfu(tyk_eslint({
    typescript: true,
}))
