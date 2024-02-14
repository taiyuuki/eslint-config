import antfu from '@antfu/eslint-config';

type OptionsConfig = Parameters<typeof antfu>[0];
declare function tyk_eslint(options?: OptionsConfig): OptionsConfig;

export { tyk_eslint };
