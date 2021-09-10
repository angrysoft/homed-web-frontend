export class PlaceView extends HTMLElement {
    constructor(name:string) {
        super();
        this.textContent = name;
    }
}

window.customElements.define('place-view', PlaceView);