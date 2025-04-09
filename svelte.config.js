import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
		adapter: adapter({
			fallback: 'index.html', // 👈 this enables SPA mode
			strict: false            // 👈 avoids the error you're getting
		}),
		paths: {
			base: '' // or '/repo-name' if not hosted at root
		}
	}
};
