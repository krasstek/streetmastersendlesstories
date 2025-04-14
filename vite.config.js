import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			strategies: 'generateSW',
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico'],
			manifest: {
				name: 'Endless Stories',
				short_name: 'Stories',
				start_url: '/streetmastersendlesstories/',
				scope: '/streetmastersendlesstories/',
				display: 'standalone',
				background_color: '#3a3a3a',
				theme_color: '#fbbf24',
				icons: [
					{
						src: 'pwa-icon-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-icon-512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	]
});
