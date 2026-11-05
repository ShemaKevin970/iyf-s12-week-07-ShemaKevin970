import { save, load } from './storage.js';

const TODOS_KEY = 'todos';
const FILTER_KEY = 'filter';
const THEME_KEY = 'theme';

const state = {
    todos: load(TODOS_KEY, []),
    filter: load(FILTER_KEY, 'all'),
    theme: load(THEME_KEY, 'light'),
};

let listeners = [];

export function getState() {
    return state;
}

export function subscribe(listener) {
    listeners.push(listener);
    return () => {
        listeners = listeners.filter((item) => item !== listener);
    };
}

function notify() {
    listeners.forEach((listener) => listener(state));
}

function persist() {
    save(TODOS_KEY, state.todos);
    save(FILTER_KEY, state.filter);
    save(THEME_KEY, state.theme);
}

export function setState(updates) {
    Object.assign(state, updates);
    persist();
    notify();
}

export function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) {
        return;
    }
    const newTodo = {
        id: Date.now().toString(),
        text: trimmed,
        completed: false,
        createdAt: new Date().toISOString(),
    };
    setState({ todos: [...state.todos, newTodo] });
}

export function toggleTodo(id) {
    const updated = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setState({ todos: updated });
}

export function deleteTodo(id) {
    const updated = state.todos.filter((todo) => todo.id !== id);
    setState({ todos: updated });
}

export function clearCompleted() {
    const updated = state.todos.filter((todo) => !todo.completed);
    setState({ todos: updated });
}

export function setFilter(filter) {
    setState({ filter });
}

export function setTheme(theme) {
    setState({ theme });
}
