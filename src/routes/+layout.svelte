<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	onMount(() => {
		document.body.classList.add('ready');
	});
</script>

<div class="app-container">
	<header class="app-header">
		<img src="{base}/logo.png" alt="Street Masters" class="logo" />
		<h1>Endless Stories</h1>
	</header>

	<main class="app-wrapper">
		<slot />
	</main>
</div>
