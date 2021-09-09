export class PlaceView extends HTMLElement {
    constructor(name:string) {
        super();
        this.textContent = name;
        this.addEventListener('click', ()=> {
            console.log(`click on place ${name}`)
            this.dispatchEvent(new CustomEvent('change-place', {
                detail: {"name":name},
                bubbles: true
            }));
        });
    }
}

window.customElements.define('place-view', PlaceView);