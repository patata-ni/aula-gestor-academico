import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateTask, filterTasks } from '../src/domain.js';
const valid = { title: ' Proyecto ', subject: 'DevOps', due: '2026-12-10', priority: 'alta' };
test('normaliza los datos de una tarea', () => assert.equal(validateTask(valid).title, 'Proyecto'));
test('rechaza título vacío y demasiado largo', () => { for (const title of ['', ' ', 'x'.repeat(101)]) assert.throws(() => validateTask({ ...valid, title })); });
test('rechaza materia vacía', () => assert.throws(() => validateTask({ ...valid, subject: '' })));
test('rechaza fechas imposibles', () => { for (const due of ['', '2026-02-30', 'ayer']) assert.throws(() => validateTask({ ...valid, due })); });
test('rechaza prioridades desconocidas', () => assert.throws(() => validateTask({ ...valid, priority: 'urgente' })));
test('filtra por texto y estado y ordena por fecha', () => {
  const data = [{ ...valid, done: false }, { ...valid, title: 'Leer', due: '2026-12-01', done: true }];
  assert.equal(filterTasks(data, 'DEVOPS', 'pendientes').length, 1);
  assert.equal(filterTasks(data, '', 'todas')[0].title, 'Leer');
  assert.equal(filterTasks(data, 'leer', 'completadas').length, 1);
  assert.equal(filterTasks(data, 'inexistente', 'todas').length, 0);
});
