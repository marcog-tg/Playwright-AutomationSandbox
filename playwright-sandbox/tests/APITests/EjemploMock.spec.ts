import { test, expect } from '@playwright/test';

test('Hace un mock de una fruta que no viene de la API real', async ({ page }) => {
    // Interceptamos la llamada a la API y hacemos un mock de la respuesta
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [{ name: 'Mandarina', id: 26 }];
        await route.fulfill({ json });
    });
    
    // Vamos a la página de ejemplo de mock
    await page.goto('https://demo.playwright.dev/api-mocking/')

    // Validamos que Mandarina esta disponible
    await expect(page.getByText('Mandarina')).toBeVisible();

});

test('Obtengo la respuesta real y le agrego algo no tan real', async ({ page }) => {
    // Interceptamos la llamada a la API y hacemos un mock de la respuesta
    await page.route('*/**/api/v1/fruits', async route => {
    const response = await route.fetch();
    const json = await response.json();
    // Agregamos una fruta no tan real
    json.push({ name: 'Chocapic', id: 202 });
    // Obtenemos la respuesta real y le agregamos la fruta no tan real
    await route.fulfill({ response, json });
    });

    // Vamos a la página de ejemplo de mock
    await page.goto('https://demo.playwright.dev/api-mocking/')

    // Validamos que Chocapic esta disponible
    await expect(page.getByText('Chocapic', { exact: true })).toBeVisible();
})

