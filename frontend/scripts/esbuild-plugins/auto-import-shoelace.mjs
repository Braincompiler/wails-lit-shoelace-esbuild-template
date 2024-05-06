import { promises as fsAsync } from 'node:fs';

export const autoImportShoelace = () => ({
    name: 'wails:import-shoelace-components',
    /**
     * @param {import('esbuild').PluginBuild} build
     */
    setup(build) {
        build.onLoad({ filter: /.ts$/ }, async (args) => {
            let code = await fsAsync.readFile(args.path, 'utf8');
            const res = code.matchAll(/<sl-([a-z][a-z\-]+)/g);
            const shoelaceComponents = [];
            if (res) {
                for (const r of res) {
                    if (r[1]) {
                        shoelaceComponents.push(`@shoelace-style/shoelace/dist/components/${r[1]}/${r[1]}.js`);
                    }
                }
            }

            if (shoelaceComponents.length > 0) {
                const imports = shoelaceComponents.map((c) => `import '${c}';`).join('');

                code = `${imports}${code}`;
            }

            return {
                contents: code,
                loader: 'ts',
            };
        });
    },
});
