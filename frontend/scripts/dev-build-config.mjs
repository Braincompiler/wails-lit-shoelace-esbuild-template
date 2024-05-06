import { typecheckPlugin } from '@jgoz/esbuild-plugin-typecheck';

import { getBaseBuildConfig } from './base-build-config.mjs';

const baseBuildConfig = getBaseBuildConfig();

export const devBuildConfig = {
    ...baseBuildConfig,
    plugins: [typecheckPlugin(), ...baseBuildConfig.plugins],
};
