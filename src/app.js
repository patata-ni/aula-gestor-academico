import { validateTask, filterTasks } from './domain.js';
const $ = s => document.querySelector(s);
const storageKey = `aula-tasks-v1:${location.pathname}`;
let tasks = [], editing = null;
function notify(text) { $('#message').textContent = text; }
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (!Array.isArray(saved)) throw new Error();
  const ids = new Set();
  tasks = saved.map(t => {
    const data = validateTask(t);
    if (typeof t.id !== 'string' || !t.id || ids.has(t.id) || typeof t.done !== 'boolean') throw new Error();
    ids.add(t.id); return { ...data, id: t.id, done: t.done };
  });
} catch { notify('No se pudieron leer tus datos guardados. Puedes comenzar de nuevo.'); }
function persist(next) {
  try { localStorage.setItem(storageKey, JSON.stringify(next)); tasks = next; return true; }
  catch { notify('No se pudo guardar. Revisa el espacio o los permisos de almacenamiento.'); return false; }
}
function resetForm() { editing = null; $('#task-form').reset(); $('#form-heading').textContent = 'Nueva tarea'; $('#save').textContent = 'Agregar tarea ↗'; $('#cancel').hidden = true; }
function element(tag, text, cls) { const e = document.createElement(tag); if (text) e.textContent = text; if (cls) e.className = cls; return e; }
function render() {
  $('#total').textContent = tasks.length; $('#pending').textContent = tasks.filter(t => !t.done).length; $('#completed').textContent = tasks.filter(t => t.done).length;
  const visible = filterTasks(tasks, $('#search').value, $('#status').value);
  $('#count').textContent = `${visible.length} tareas`; $('#tasks').replaceChildren(); $('#empty').hidden = visible.length > 0;
  $('#empty h3').textContent = tasks.length ? 'No hay coincidencias.' : 'Todo empieza con un paso.';
  $('#empty p').textContent = tasks.length ? 'Prueba con otro filtro o búsqueda.' : 'Agrega tu primera tarea y organiza tu semana.';
  for (const task of visible) {
    const li = element('li', '', `task${task.done ? ' done' : ''}`);
    const check = element('input'); check.type = 'checkbox'; check.checked = task.done; check.setAttribute('aria-label', `Completar ${task.title}`);
    check.addEventListener('change', () => { if (persist(tasks.map(t => t.id === task.id ? { ...t, done: check.checked } : t))) notify('Estado actualizado.'); render(); });
    const content = element('div'); content.append(element('h3', task.title));
    const meta = element('div', '', 'meta'); meta.append(element('span', task.subject), element('span', task.due), element('span', task.priority, `priority ${task.priority}`)); content.append(meta);
    const actions = element('div', '', 'actions');
    const edit = element('button', 'Editar'); edit.setAttribute('aria-label', `Editar ${task.title}`);
    edit.addEventListener('click', () => { editing = task.id; for (const key of ['title', 'subject', 'due', 'priority']) $(`#${key}`).value = task[key]; $('#form-heading').textContent = 'Editar tarea'; $('#save').textContent = 'Guardar cambios'; $('#cancel').hidden = false; $('#title').focus(); });
    const remove = element('button', 'Eliminar'); remove.setAttribute('aria-label', `Eliminar ${task.title}`);
    remove.addEventListener('click', () => { if (!confirm(`¿Eliminar la tarea “${task.title}”?`)) return; if (persist(tasks.filter(t => t.id !== task.id))) { if (editing === task.id) resetForm(); notify('Tarea eliminada.'); render(); } });
    actions.append(edit, remove); content.append(actions); li.append(check, content); $('#tasks').append(li);
  }
}
$('#task-form').addEventListener('submit', e => {
  e.preventDefault();
  try {
    const data = validateTask(Object.fromEntries(new FormData(e.target)));
    const next = editing ? tasks.map(t => t.id === editing ? { ...t, ...data } : t) : [...tasks, { ...data, id: crypto.randomUUID(), done: false }];
    if (persist(next)) { resetForm(); render(); notify('Tarea guardada.'); }
  } catch (err) { notify(err.message); }
});
$('#cancel').addEventListener('click', resetForm); $('#search').addEventListener('input', render); $('#status').addEventListener('change', render); render();
