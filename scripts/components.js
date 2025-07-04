// Default Components

class myHeader extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <header>
            <h3>Recipe Finder</h3>
            <button id="dark"><i class="fi fi-br-moon"></i></button>
        </header>`
    }

}
customElements.define('r-header', myHeader);

class myFooter extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <footer>
            <p>© 2025 Copyright, All rights reserved</p>
        </footer>
        `
    }
}
customElements.define('r-footer', myFooter);
