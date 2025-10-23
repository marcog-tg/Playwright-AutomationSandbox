import { test, expect } from '@playwright/test';


const REPO = 'Curso-De-QA';
const USER = 'INFFame';

// el contexto de la solicitud es reutilizada por todas las pruebas en el archivo
let apiContext: any;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // Todos los request que enviamos van a este endpoint
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            // Configuramos este header como nos dien en la docu de github
            'Accept': 'application/vnd.github.v3+json',
            // Agregamos el token de autorizacion a todos los requests
            // Aca ponemos el token que generamos en github
            'Authorization': `token ${process.env.API_TOKEN}`,
        },
    });
});

test.afterAll(async ({ }) => {
    // Nos deshacemos de todas las respuestas al final
    await apiContext.dispose();
});

test('El último issue creado es el primero en la lista', async ({ page }) => {
    // Crear un nuevo Issue
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Que el framework me planche la ropa',
        
    }});
    expect(newIssue.ok().toBeTruthy());

    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    const firstIssue = page.locator('a[data-testid=\'issue-pr-title-link\']').first();
    await expect(firstIssue).toHaveText('[Feature] Que el framework me planche la ropa');
    
    
});


    


