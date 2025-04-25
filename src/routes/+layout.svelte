<div class="app-container">
	<header class="app-header">
		<img src="{base}/logo.png" alt="Street Masters" class="logo" />
		<h1>Endless Stories</h1>
	</header>

	<main class={`app-wrapper ${routeClass}`}>
		<slot />
	</main>
</div>

<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	$: routeClass = $page.url.pathname.startsWith('/printcards') ? 'printcards-mode' : '';
	onMount(() => {
		document.body.classList.add('ready');
	});
</script>

