import { css, html, LitElement } from 'lit';

import { consume } from '@lit/context';
import { customElement, property, query, state } from '@lit/reactive-element/decorators.js';

import { SlInput } from '@shoelace-style/shoelace';

import { IWailsContext, wailsContext } from '@contexts';

const DEFAULT_RESULT = 'Please enter your name below 👇';

@customElement('app-hello')
export class HelloComponent extends LitElement {
    public static readonly styles = [
        css`
            .form {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: center;
                gap: 0.25rem;

                sl-input {
                    width: 100%;
                }
            }
        `,
    ];

    @consume({ context: wailsContext })
    @property({ attribute: false })
    private readonly wailsContext!: IWailsContext;

    @query('#name')
    private readonly nameInput?: SlInput;

    @state()
    private result: string = DEFAULT_RESULT;

    public render() {
        return html`
            <div class="form">
                <sl-input
                    id="name"
                    label="${this.result}"
                    @sl-clear="${this.onClear}"
                    clearable
                ></sl-input>
                <sl-button @click="${this.greet}">Greet</sl-button>
            </div>
        `;
    }

    private async greet() {
        if (this.wailsContext.has('Greet')) {
            this.result = await this.wailsContext.call('Greet', this.nameInput?.value);
        } else {
            this.result = '"Greet" function not found';
        }
    }

    private onClear() {
        this.result = DEFAULT_RESULT;
    }
}
