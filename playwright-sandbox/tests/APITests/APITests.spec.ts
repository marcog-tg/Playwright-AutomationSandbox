import { test, expect } from '@playwright/test';


const REPO = 'Repo-Desde-API';
const USER = 'INFFame';

test.beforeAll(async ({ request }) => {
    const response = await request.post(`/user/repos`, {
        data: {
            name: REPO,
        }
    });
});


test('Se puede crear un Issue en el repositorio de Github', async ({ request }) => {

    // Crear un nuevo Issue
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[BUG] Explotó todo',
            body: 'Estamos perdidirijillos!',
        }
    });

    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
            title: '[BUG] Explotó todo',
            body: 'Estamos perdidirijillos!',
    }));

});

test('Puedo crear un request de feature', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[FEATURE] creado desde API',
            body: 'Descripcion del feature',
        }
    });
    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[FEATURE] creado desde API',
        body: 'Descripcion del feature',
    }));
});

test.afterAll(async ({ request }) => {
    const response = await request.delete(`/repos/${USER}/${REPO}`);
    expect(response.ok()).toBeTruthy();

});

