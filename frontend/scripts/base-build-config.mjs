import copy from 'esbuild-plugin-copy';

import { autoImportShoelace } from './esbuild-plugins/auto-import-shoelace.mjs';
import { cleanupDist } from './esbuild-plugins/cleanup-dist.mjs';
import { copyIndexHtml } from './esbuild-plugins/copy-index-html.mjs';
import { nodeEnv } from './esbuild-plugins/node-env.mjs';

/**
 * @param {boolean} [watch]
 * @return import('esbuild').BuildOptions
 */
export function getBaseBuildConfig(watch) {
    return {
        entryPoints: [
            {
                in: 'src/index.ts',
                out: 'index',
            },
            {
                in: 'src/index.css',
                out: 'index',
            },
        ],
        outdir: 'dist',

        loader: {
            '.png': 'file',
            '.jp(e)?g': 'file',
        },
        assetNames: 'assets/[name]-[hash]',
        // entryNames: '[name]-[hash]', // Do we need this in wails? 🤔

        bundle: true,
        sourcemap: true,
        metafile: true,

        plugins: [
            copy({
                resolveFrom: 'cwd',
                assets: [
                    {
                        from: ['node_modules/@shoelace-style/shoelace/dist/assets/**/*'],
                        to: ['dist/assets'],
                    },
                ],

                watch,
            }),
            cleanupDist(),
            nodeEnv(),
            copyIndexHtml(),
            autoImportShoelace(),
        ],
    };
}
