import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
  await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();
  await page.getByRole('checkbox', { name: 'Pizza 🍕' }).check();
  await page.getByRole('checkbox', { name: 'Pasta 🍝' }).check();
  await page.getByRole('checkbox', { name: 'Torta 🍰' }).check();
  await page.getByRole('checkbox', { name: 'Pasta 🍝' }).uncheck();
  await page.getByRole('checkbox', { name: 'Pizza 🍕' }).uncheck();
  await page.getByRole('checkbox', { name: 'Torta 🍰' }).uncheck();
});