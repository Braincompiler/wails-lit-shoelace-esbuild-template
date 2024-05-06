import { readFileSync } from 'node:fs';

export const hotReload = () => ({
    name: 'esbuild:add-hot-reload',
    /**
     * @param {import('esbuild').PluginBuild} build
     */
    setup(build) {
        build.onLoad({ filter: /src\/index.ts$/ }, (args) => {
            const hotReloadCode = `
                        new EventSource('/esbuild').addEventListener('change', (e) => {
                            const { added, removed, updated } = JSON.parse(e.data);
                        
                            const isCssUpdated = updated.every((file: string) => file.endsWith('.css') || file.endsWith('.css.map'));
                            let reloadNeeded = true;
                        
                            if (added.length === 0 && removed.length === 0 && isCssUpdated) {
                                // @ts-ignore
                                for (const link of document.querySelectorAll('link')) {
                                    const url = new URL(link.href);
                        
                                    updated.forEach((file: string) => {
                                        if (file === url.pathname && url.host === location.host) {
                                            const next = link.cloneNode();
                        
                                            next.href = file + '?' + Math.random().toString(36).slice(2);
                                            next.onload = () => link.remove();
                                            link.parentNode.insertBefore(next, link.nextSibling);
                        
                                            reloadNeeded = false;
                                        }
                                    });
                                }
                            }
                        
                            if (reloadNeeded) {
                                console.log('Full reload needed ...');
                                setTimeout(() => {
                                    // Workaround in case the build is not yet finished
                                    console.log('Now.');
                                    location.reload();
                                }, 1000);
                            } else {
                                console.log('🔥 reload done.');
                            }
                        });
                    `;

            let code = readFileSync(args.path, 'utf8');

            return {
                contents: `${code}${hotReloadCode}`,
                loader: 'ts',
            };
        });
    },
});
