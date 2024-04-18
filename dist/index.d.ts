import { Linter, ESLint } from 'eslint';

interface TYKConfig {
    ts?: boolean;
    vue?: boolean;
    json?: boolean;
    markdown?: boolean;
    ignores?: string[];
    plugins?: ESLint.Plugin[];
    rules?: Linter.RulesRecord;
}
declare function export_default(tyk_config?: TYKConfig): Promise<Linter.FlatConfig<Linter.RulesRecord>[]>;

export { export_default as default };
