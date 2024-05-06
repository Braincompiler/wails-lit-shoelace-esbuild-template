import { hotReload } from './esbuild-plugins/hot-reload.mjs';
import { runWatch } from './run-watch.mjs';
import { argvInt } from './utils.mjs';

const ctx = await runWatch({
    additionalEsbuildPlugins: [hotReload()],
});

let { host, port } = await ctx.serve({
    servedir: 'dist',
    port: argvInt('port') ?? 3000,
});

console.log(`Run dev server on ${host}:${port}`);
