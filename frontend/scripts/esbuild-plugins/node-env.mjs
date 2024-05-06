export const nodeEnv = () => ({
    name: 'wails:node-env',
    /**
     * @param {import('esbuild').PluginBuild} build
     */
    setup(build) {
        const options = build.initialOptions ?? {};

        options.define = options.define ?? {};
        options.define['process.env.NODE_ENV'] = options.minify ? '"prod"' : '"dev"';
    },
});
