# Wails template using lit + Shoelace component library + esbuild

## About
Wails template providing frontend with lit, Shoelace component library + pre-configured prettier and typescript.

## Live Development
To run in live development mode, run `wails dev` in the project directory. This will run an esbuild process that will provide a watcher and hot reload of your frontend changes (including fast hot replacement for css without reloading). If you want to develop in a browser and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect to this in your browser, and you can call your Go code from devtools.

It's possible to start the frontend without wails backend:
```shell
npm run serve
```
This will serve the frontend on http://localhost:3000.

Optional `port` parameter:
```shell
npm run serve --port=3210
```
This will serve the frontend on http://localhost:3210.

## Features
- [Lit](https://lit.dev/)
- [Shoelace](https://shoelace.style/)
- [Typescript](https://www.typescriptlang.org/)
- [esbuild](https://esbuild.github.io/)
- [Prettier](https://prettier.io/)

## Building
To build a redistributable, production mode package, use `wails build`.

## Auto-import of shoelace components
Actually, to use the shoelace components they have to be imported to make them available:
```ts
import '@shoelace-style/shoelace/dist/components/button/button.js';
```

This template provides an esbuild-plugin which scans the src files for used shoelace components and imports them automatically. This way the import will never be forgotten and don't need to import all components and bloat up the bundle.

## WailsContext service
This template provides a simple context (https://lit.dev/docs/data/context/) to access the wails backend. This should help to avoid runtime errors in case the frontend is developed without the wails backend.

Provide the context
```ts
import { LitElement } from 'lit';

import { provide } from '@lit/context';
import { customElement, property } from '@lit/reactive-element/decorators.js';

import { IWailsContext, wailsContext, WailsContext } from '@contexts';

@customElement('app-root')
export class AppComponent extends LitElement {
    @provide({ context: wailsContext })
    @property({ attribute: false })
    private readonly wailsContext: IWailsContext = new WailsContext();
    
    // ...
}
```

Consume the context in a child component of the providing parent/root component
```ts
import { html, LitElement } from 'lit';

import { consume } from '@lit/context';
import { customElement, property, query, state } from '@lit/reactive-element/decorators.js';

import { SlInput } from '@shoelace-style/shoelace';

import { IWailsContext, wailsContext } from '@contexts';

@customElement('app-child')
export class ChildComponent extends LitElement {
    @consume({ context: wailsContext })
    @property({ attribute: false })
    private readonly wailsContext!: IWailsContext;

    @query('#name')
    private readonly nameInput?: SlInput;

    @state()
    private result: string = 'Please enter your name below 👇';

    public render() {
        return html`
            <div class="form">
                <sl-input
                    id="name"
                    label="${this.result}"
                    clearable
                ></sl-input>
                <sl-button @click="${this.greet}">Greet</sl-button>
            </div>
        `;
    }

    private async greet() {
        if (this.wailsContext.has('Greet')) {
            this.result = await this.wailsContext.call<string>('Greet', this.nameInput?.value);
        } else {
            this.result = '"Greet" function not found';
        }
    }
}
```

## Planned features
- A `WailsRuntimeContext` service with all the runtime features provided by wails.
- This template with vite instead of esbuild
