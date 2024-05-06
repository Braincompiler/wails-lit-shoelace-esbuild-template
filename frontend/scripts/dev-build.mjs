import { analyzeMetafile, build } from 'esbuild';

import { devBuildConfig } from './dev-build-config.mjs';

const result = await build(devBuildConfig);

console.log(await analyzeMetafile(result.metafile, { verbose: false, color: true }));
