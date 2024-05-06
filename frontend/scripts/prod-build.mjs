import { typecheckPlugin } from '@jgoz/esbuild-plugin-typecheck';
import { analyzeMetafile, build } from 'esbuild';

import { getBaseBuildConfig } from './base-build-config.mjs';

let baseBuildConfig = getBaseBuildConfig();
const result = await build({
    ...baseBuildConfig,
    plugins: [typecheckPlugin(), ...baseBuildConfig.plugins],
    minify: true,
});

console.log(await analyzeMetafile(result.metafile, { verbose: false, color: true }));
