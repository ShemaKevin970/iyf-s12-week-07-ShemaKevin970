import { describe, it, expect } from 'vitest';
import {
    filterTodos,
    generateId,
    formatDate,
    getRemainingCount,
} from './utils.js';

describe('filterTodos', () => {
    it('returns empty array for empty input', () => {
        expect(filterTodos([], 'all')).toEqual([]);
    });
    it('returns only completed todos', () => {
        const todos = [
            { id: '1', text: 'A', completed: true },
            { id: '2', text: 'B', completed: false },
        ];
        expect(filterTodos(todos, 'completed')).toHaveLength(1);
    });
    it('returns only active todos', () => {
        const todos = [
            { id: '1', text: 'A', completed: true },
            { id: '2', text: 'B', completed: false },
        ];
        expect(filterTodos(todos, 'active')).toHaveLength(1);
    });
});

describe('other utils', () => {
    it('generateId returns a string', () => {
        expect(typeof generateId()).toBe('string');
    });
    it('formatDate returns empty string for invalid input', () => {
        expect(formatDate('')).toBe('');
        expect(formatDate('not-a-date')).toBe('');
    });
    it('getRemainingCount counts only incomplete', () => {
        expect(
            getRemainingCount([{ completed: false }, { completed: true }])
        ).toBe(1);
    });
});
