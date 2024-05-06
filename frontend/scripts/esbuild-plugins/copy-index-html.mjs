import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

export const copyIndexHtml = () => ({
    name: 'wails:copy-index-html',
    /**
     * @param {import('esbuild').PluginBuild} build
     */
    setup(build) {
        const { outdir } = build.initialOptions;
        if (!outdir) {
            return;
        }

        build.onEnd(() => {
            const absOutdir = resolve(cwd(), outdir);
            const absHtmlFile = resolve(cwd(), 'src', 'index.html');
            if (existsSync(absOutdir) && existsSync(absHtmlFile)) {
                copyFileSync(absHtmlFile, resolve(absOutdir, 'index.html'));
            }
        });
    },
});
