import { context } from 'esbuild';

import { devBuildConfig } from './dev-build-config.mjs';

/**
 * @param {Object} [options]
 * @param {import('esbuild').Plugin[]} options.additionalEsbuildPlugins
 * @returns {Promise<import('esbuild').BuildContext>}
 */
export async function runWatch(options) {
    const ctx = await context({
        ...devBuildConfig,
        plugins: [...(options?.additionalEsbuildPlugins ?? []), ...devBuildConfig.plugins],
    });

    await ctx.watch();

    console.log('Watcher started ...');

    return ctx;
}
