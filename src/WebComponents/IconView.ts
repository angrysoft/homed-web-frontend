import { BaseComponent } from "./BaseComponent.js";

export class IconView extends BaseComponent {
}

window.customElements.get('icon-view') || window.customElements.define('icon-view', IconView);
