import { filterTodos, formatDate, getRemainingCount } from './utils.js';

export function renderTodos(state, callbacks) {
    const list = document.getElementById('todo-list');
    const countEl = document.getElementById('todo-count');
    if (!list) {
        return;
    }
    list.innerHTML = '';
    const visible = filterTodos(state.todos, state.filter);

    visible.forEach((todo) => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => callbacks.onToggle(todo.id));

        const span = document.createElement('span');
        span.textContent = todo.text;

        const small = document.createElement('small');
        small.textContent = formatDate(todo.createdAt);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => callbacks.onDelete(todo.id));

        li.append(checkbox, span, small, deleteBtn);
        list.appendChild(li);
    });

    if (countEl) {
        countEl.textContent = `${getRemainingCount(state.todos)} items left`;
    }

    document.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.filter === state.filter);
    });

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.textContent =
            state.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
    document.body.classList.toggle('dark', state.theme === 'dark');
}
