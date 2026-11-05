const STORAGE_PREFIX = 'week7_';

export function save(key, data) {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
}

export function load(key, defaultValue = null) {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    if (!data) {
        return defaultValue;
    }
    try {
        return JSON.parse(data);
    } catch {
        return defaultValue;
    }
}

export function remove(key) {
    localStorage.removeItem(STORAGE_PREFIX + key);
}
