import { test, expect } from '@playwright/test';
import { Sandbox } from './Pages/SandboxPage';

let textoAEscribir: string = 'Estoy aprendiendo Playwright';



test.describe('Acciones en el Automation Sandbox', () => {

    // test.only para correr solo este test
    // test.skip para saltar este test
    
    // Correr test con tags: npx playwright test --grep @Click
    // test('@Click en boton id dinamico', async ({ page }) => {

    // Skipear test en un navegador específico
    // test('Click en boton id dinamico', async ({ page, browserName }) => {
    // test.skip(browserName === 'chromium', 'No anda en Chrome todavia');

    // Esperar que una prueba falle
    // test.fail();

    // Marcar el test como pendiente de arreglar
    // test.fixme(); 



    test('Click en boton id dinamico', async ({ page }) => {
        test.info().annotations.push({ type: 'bug', description: 'Esto va a informar que el caso de prueba tiene un bug' });

        await test.step('Dado que navego al sandbox de automation de free range testers ', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        });

        await test.step('Puedo hacer click en el boton con id dinamico', async () => {
            // Manera 1 de hacer click en un boton con id dinamico
            // await page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' }).click();
            
            // Manera 2 de hacer click en un boton con id dinamico
            const botondIdDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' });
            await botondIdDinamico.click(); // click normal
            // Validar que el elemento oculto es visible
            await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible(); 
            
            
            // await botondIdDinamico.click({ force : true }); // Se puede forzar el click si es necesario
            // await botondIdDinamico.dblclick(); // Doble click si es necesario
            // await botondIdDinamico.click({ button : 'right }); // click derecho si es necesario
            // await botondIdDinamico.click({ delay: 1000 }); // Click con delay si es necesario
            // await botondIdDinamico.click({ modifiers: ['Shift'] }); // Click con modificadores si es necesario
            // await botondIdDinamico.hover(); // Hover si es necesario
        });         
    
    });

    test('Lleno un campo de text en Automation Sanbdox', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automation de free range testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        }); 

        await test.step('Puedo llenar un campo de texto', async () => {
            // Validar que el campo de texto es editable
            await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edición').toBeEditable(); 
            // Manera 1 de llenar un campo de texto, tambien puede tener una variable.
            await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir);
            await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edición').toHaveValue(textoAEscribir); 

            
            // Manera 2 de llenar un campo de texto                
            //await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill('Estoy aprendiendo playwright');
            // Presionar una tecla en el campo de texto
            // await page.getByPlaceholder('Ingresá texto').press('Enter'); // Presionar una tecla

            // Manera 3 de llenar un campo de texto
            // const campoTexto = page.getByPlaceholder('Ingresá texto');
            // await campoTexto.fill('Estoy aprendiendo playwright'); // Llenar el campo de texto
            // await campoTexto.type('Estoy aprendiendo playwright'); // Simular tipeo o escritura en el campo de texto
            // await campoTexto.fill(''); // Limpiar el campo de texto
            // await campoTexto.clear(); // Limpiar el campo de texto
            // const valor = await campoTexto.inputValue(); // Obtener el valor del campo de texto
            // console.log(valor);
            // expect(valor).toBe('Estoy aprendiendo playwright'); // Validar el valor del campo de texto
        });

    });
    

    test('Puedo seleccionar y deseleccionar checkboxes en el sandbox', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automation de free range testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        });
        
        await test.step('Puedo seleccionar el checkbox para Hamburguesa', async () => {
            const sandbox = new Sandbox(page);
            
            // seleccionar checkbox
            // await page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }).check(); 
            await sandbox.checkBurger();
            
            await expect(sandbox.burgerCheckbox, 'El checkbox no estaba seleccionado').toBeChecked(); // Validar que se seleccionó el checkbox           
        
        });

        await test.step('Puedo deseleccionar el checkbox para Hamburguesa', async () => {
            const sandbox = new Sandbox(page);
            // deseleccionar checkbox
            //await page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }).uncheck(); 
            await sandbox.uncheckBurger();

            await expect(sandbox.burgerCheckbox, 'El checkbox estaba seleccionado').not.toBeChecked(); // Validar que se deselecciono el checkbox
        
        });
    });


    test('Puedo seleccionar Radio Buttons', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automation de free range testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        });

        await test.step('Puedo seleccionar el Radio Button para Opción 2', async () => {
            // seleccionar radio button, no se pueden deseleccionar
            await page.getByRole('radio', { name: 'No' }).check();
            await expect(page.getByRole('radio', { name: 'No' }), 'El radio button no se selecciono').toBeChecked();;
            //await page.getByRole('radio', { name: 'Si' }).check();

        });
    });


    test('Puedo seleccionar un deporte favorito', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automation de free range testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        });

        await test.step('Puedo seleccionar un deporte del dropdown', async () => {
            // seleccionar una opción del dropdown por su valor
            const opcionesSelect = ['Seleccioná un deporte', 'Fútbol', 'Tennis', 'Basketball'];

            for (let opcion of opcionesSelect) {
                // Ojo con las comillas para concatenar strings y variables `` no ''
                const elemento = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                if (elemento) {
                    console.log(`La opcion ${opcion} está presente`);
                } else {
                    throw new Error(`La opcion ${opcion} no está presente`);
                }
            }
        
        });

    });


    test('Puedo seleccionar un Día del dropdown Días de la semana', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automation de free range testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        });

        await test.step('Puedo seleccionar un día del dropdown Días de la semana', async () => {
            // abrir el dropdown
            await page.getByRole('button', { name: 'Día de la semana' }).click(); 
            // seleccionar una opción del dropdown por su nombre
            await page.getByRole('link', { name: 'Viernes' }).click(); 
        });
    });
    
    // Simular subir un archivo
    // Marcar el test como pendiente de arreglar
    test.fixme('Puedo subir archivos a Automation Sandbox', async ({ page }) => {
        
        await test.step('Dado que navego al sandbox de automation de free range testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        });

        await test.step('Puedo subir un archivo', async () => {
            // subir un archivo
            await page.getByLabel('Subir archivo').setInputFiles('tests/archivoEjemplo.txt'); 
            // subir varios archivos
            await page.getByLabel('Subir archivo').setInputFiles(['tests/archivoEjemplo.txt', 'tests/archivoEjemplo2.txt']); 
            // eliminar archivos subidos
            await page.getByLabel('Subir archivo').setInputFiles([]); 
        });
    });

    // Simular hacer drag and drop de un elemento a otro
    test('Puedo hacer un Drag and Drop de elementos en Automation Sandbox', async ({ page }) => {
        test.fixme(); // Marcar el test como pendiente de arreglar

        await test.step('Dado que navego al sandbox de automation de free range testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        });

        await test.step('Puedo hacer un Drag and Drop de elementos', async () => {
            // hacer drag and drop
            await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'));
        });
    });

    test('Valido que todos los valores cambian en la tabla dinámica luego de un reload', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automation de free range testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        });

        await test.step('Puedo validar que los valores cambiaron al hacer un reload a la web', async () => {
            // Obtener los valores de la segunda columna de la tabla dinámica antes del reload
            const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log('Valores tabla dinámica antes del reload:', valoresTablaDinamica);
            
            // Recargar la página
            await page.reload();

            // Obtener los valores de la segunda columna de la tabla dinámica después del reload
            const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log('Valores tabla dinámica después del reload:', valoresPostReload);
            
            // Validar que los valores son diferentes
            expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
        });
    })
    


    test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
        await test.info().attach('screenshot', { body: await page.screenshot(), contentType: 'image/png' });

        await test.step('Dado que navego al sandbox de automation de free range testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        });

        await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
            const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
            const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];

            await test.info().attach('screenshot', { body: await page.screenshot(), contentType: 'image/png' });

        
            expect(valoresColumnaNombres).toEqual(nombresEsperados);
        });
    });
    

    test('Ejemplo de Soft Assertions', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automation de free range testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        });

        await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
            await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
            await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
            await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
            await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();
            await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
        });
        
    });

    test('Validando dentro de un popup', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automation de free range testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            
        });

        await test.step('Cuando hago click en el botón popup', async () => {
            await page.getByRole('button', { name: 'Mostrar popup' }).click();
        });

        await test.step('Puedo validar un elemento dentro del popup', async () => {
            await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
            await page.getByRole('button', { name: 'Cerrar' }).click();
        });
        

        /*
        Otra forma de validar dentro de un popup es con el evento popup
        Esta forma es más útil cuando el popup es una nueva ventana del navegador

        const popuPromise = page.waitForEvent('popup');
        await page.getByRole('button', { name: 'Mostrar popup' }).click();
        const popup = await popuPromise;
        await popup.waitForLoadState();
        await expect(popup.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
        await popup.close();
        */
        
        
    });
    
    


});
