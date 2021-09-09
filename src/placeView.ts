export class PlaceView extends HTMLElement {
    constructor(name:string) {
        super();
        this.textContent = name;
        this.addEventListener('click', ()=> {
            this.dispatchEvent(new CustomEvent('change-place', {
                detail: name,
                bubbles: true
            }));
        });
    }
}

window.customElements.define('place-view', PlaceView);