export class PlaceView extends HTMLElement {
    constructor(name) {
        super();
        this.textContent = name;
        this.style.cursor = "pointer";
    }
}
window.customElements.define('place-view', PlaceView);
