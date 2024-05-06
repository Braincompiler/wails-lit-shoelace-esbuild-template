import { css, html, LitElement } from 'lit';

import { provide } from '@lit/context';
import { customElement, property } from '@lit/reactive-element/decorators.js';

import { IWailsContext, wailsContext, WailsContext } from '@contexts';

import img from '@assets/images/logo-universal.png';

@customElement('app-root')
export class AppComponent extends LitElement {
    @provide({ context: wailsContext })
    @property({ attribute: false })
    private readonly wailsContext: IWailsContext = new WailsContext();

    public static styles = [
        css`
            .flex {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;

                sl-card {
                    width: 50%;
                }
            }
        `,
    ];

    public render() {
        return html`
            <div class="flex">
                <sl-card>
                    <img
                        slot="image"
                        src="${img}"
                        alt="Wails logo"
                    />

                    <app-hello></app-hello>
                </sl-card>
            </div>
        `;
    }
}
