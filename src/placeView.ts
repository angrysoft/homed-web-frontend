export class Place extends HTMLElement {
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