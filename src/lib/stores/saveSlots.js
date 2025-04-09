import { writable } from 'svelte/store';

export const saveSlots = writable([null, null, null]);

export function refreshSaveSlots() {
	saveSlots.set([0, 1, 2].map(i => {
		const data = localStorage.getItem(`save_game_content_${i}`);
		return data ? JSON.parse(data) : null;
	}));
}
