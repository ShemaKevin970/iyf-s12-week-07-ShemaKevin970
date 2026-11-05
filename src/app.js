import {
    getState,
    subscribe,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
    setTheme,
} from './state.js';
import { renderTodos } from './ui.js';

const callbacks = {
    onToggle: toggleTodo,
    onDelete: deleteTodo,
};

function render() {
    renderTodos(getState(), callbacks);
}

subscribe(render);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addTodo(input.value);
        input.value = '';
        input.focus();
    });

    document.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });

    document
        .getElementById('clear-completed')
        .addEventListener('click', clearCompleted);

    document.getElementById('theme-toggle').addEventListener('click', () => {
        const current = getState().theme;
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    render();
});
