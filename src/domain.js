export function validateTask(input) {
  const title = String(input.title ?? '').trim();
  const subject = String(input.subject ?? '').trim();
  const due = String(input.due ?? '');
  if (!title || title.length > 100) throw new Error('Escribe un título de 1 a 100 caracteres.');
  if (!subject || subject.length > 60) throw new Error('Escribe una materia de 1 a 60 caracteres.');
  const date = new Date(`${due}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(due) || Number.isNaN(+date) || date.toISOString().slice(0, 10) !== due) throw new Error('Elige una fecha válida.');
  if (!['alta', 'media', 'baja'].includes(input.priority)) throw new Error('Elige una prioridad válida.');
  return { title, subject, due, priority: input.priority };
}
export function filterTasks(tasks, query, status) {
  const q = query.trim().toLocaleLowerCase('es');
  return tasks.filter(t => `${t.title} ${t.subject}`.toLocaleLowerCase('es').includes(q) && (status === 'todas' || t.done === (status === 'completadas')))
    .sort((a, b) => a.due.localeCompare(b.due));
}
