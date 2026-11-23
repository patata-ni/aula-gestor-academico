import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => { await page.goto('./'); });
async function add(page, title = 'Proyecto DevOps') {
  await page.getByLabel('Título', { exact: true }).fill(title);
  await page.getByLabel('Materia', { exact: true }).fill('Ingeniería de software');
  await page.getByLabel('Fecha de entrega').fill('2026-12-10');
  await page.getByRole('button', { name: 'Agregar tarea' }).click();
}
test('crea, persiste, edita, completa, filtra y elimina una tarea', async ({ page }) => {
  await add(page); await expect(page.locator('#total')).toHaveText('1');
  await page.reload(); await expect(page.getByRole('heading', { name: 'Proyecto DevOps' })).toBeVisible();
  await page.getByRole('button', { name: 'Editar Proyecto DevOps', exact: true }).click();
  await page.getByLabel('Título', { exact: true }).fill('Proyecto validado');
  await page.getByRole('button', { name: 'Guardar cambios' }).click();
  await page.getByRole('checkbox', { name: 'Completar Proyecto validado', exact: true }).check();
  await expect(page.locator('#completed')).toHaveText('1');
  await page.getByLabel('Filtrar por estado').selectOption('pendientes'); await expect(page.locator('#tasks li')).toHaveCount(0);
  await page.getByLabel('Filtrar por estado').selectOption('completadas'); await expect(page.locator('#tasks li')).toHaveCount(1);
  await page.getByLabel('Buscar tareas').fill('sin coincidencia'); await expect(page.locator('#tasks li')).toHaveCount(0);
  await page.getByLabel('Buscar tareas').fill('');
  page.once('dialog', d => d.accept()); await page.getByRole('button', { name: 'Eliminar Proyecto validado', exact: true }).click();
  await expect(page.locator('#total')).toHaveText('0');
});
test('impide guardar un formulario vacío', async ({ page }) => {
  await page.getByRole('button', { name: 'Agregar tarea' }).click();
  await expect(page.locator('#tasks li')).toHaveCount(0);
  expect(await page.locator('#title').evaluate(e => e.validity.valueMissing)).toBe(true);
});
test('muestra texto literal y no desborda la pantalla', async ({ page }) => {
  await add(page, '<img src=x onerror=alert(1)>');
  await expect(page.getByRole('heading', { name: '<img src=x onerror=alert(1)>', exact: true })).toBeVisible();
  await expect(page.locator('#tasks img')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
test('permite cancelar la edición y rechazar una eliminación', async ({ page }) => {
  await add(page); await page.getByRole('button', { name: 'Editar Proyecto DevOps', exact: true }).click();
  await page.getByLabel('Título', { exact: true }).fill('Cambio sin guardar'); await page.getByRole('button', { name: 'Cancelar edición' }).click();
  await expect(page.getByRole('heading', { name: 'Proyecto DevOps', exact: true })).toBeVisible();
  page.once('dialog', d => d.dismiss()); await page.getByRole('button', { name: 'Eliminar Proyecto DevOps', exact: true }).click();
  await expect(page.locator('#total')).toHaveText('1');
});
