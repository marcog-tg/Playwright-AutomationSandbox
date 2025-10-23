import { type Locator, type Page } from '@playwright/test';


export class Sandbox {
    // Define el contexto de la página
    readonly page: Page;
    readonly burgerCheckbox: Locator;

    // Constructor que inicializa la página
    constructor(page:Page) {
        this.page = page;
        this.burgerCheckbox = page.getByRole('checkbox', { name: 'Hamburguesa 🍔' });
    }

    // Métodos para interactuar con la página
    async checkBurger(){
        await this.burgerCheckbox.check();
    }

    async uncheckBurger(){
        await this.burgerCheckbox.uncheck();
    }
}

