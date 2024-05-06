import { existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

export const cleanupDist = () => ({
    name: 'wails:cleanup',
    /**
     * @param {import('esbuild').PluginBuild} build
     */
    setup(build) {
        const { outdir } = build.initialOptions;
        if (!outdir) {
            return;
        }

        const absOutdir = resolve(cwd(), outdir);
        if (existsSync(absOutdir)) {
            rmSync(absOutdir, { recursive: true });
        }
    },
});
