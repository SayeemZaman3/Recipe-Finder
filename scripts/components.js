// Default Components

class myHeader extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <header>
            <div id="mnav">
                <button id="m-btn"><i class="fi fi-br-menu-burger"></i></button>
                <div id="mnavBar">
                    <h4>Navigation</h4>
                    <nav></nav>
                </div>
            </div>
            <h3>Recipe Finder</h3>
            <nav id="nav"></nav>
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
