export function generateId() {
    return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}

export function filterTodos(todos, filter) {
    if (!Array.isArray(todos)) {
        return [];
    }
    if (filter === 'active') {
        return todos.filter((todo) => !todo.completed);
    }
    if (filter === 'completed') {
        return todos.filter((todo) => todo.completed);
    }
    return todos;
}

export function formatDate(dateString) {
    if (!dateString) {
        return '';
    }
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        return '';
    }
    return date.toLocaleDateString();
}

export function getRemainingCount(todos) {
    if (!Array.isArray(todos)) {
        return 0;
    }
    return todos.filter((todo) => !todo.completed).length;
}
