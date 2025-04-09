import { writable } from 'svelte/store';

export function createPersistentStore(key, initialValue) {
	const store = writable(initialValue);

	if (typeof localStorage !== 'undefined') {
		const storedValue = localStorage.getItem(key);
		if (storedValue) {
			try {
				store.set(JSON.parse(storedValue));
			} catch (e) {
				console.warn(`Could not parse localStorage item "${key}"`);
			}
		}

		store.subscribe(value => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}

export const playerCount = createPersistentStore('playerCount', 2);
export const storyLength = createPersistentStore('storyLength', 5);
export const selectedExpansions = createPersistentStore('selectedExpansions', []);
export const selectedGladiators = createPersistentStore('selectedGladiators', []);
