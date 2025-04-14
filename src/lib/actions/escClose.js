export function escClose(node, callback) {
	function onKey(event) {
		if (event.key === 'Escape') callback?.();
	}
	window.addEventListener('keydown', onKey);

	return {
		destroy() {
			window.removeEventListener('keydown', onKey);
		}
	};
}
