<script>
  import Portal from 'svelte-portal';
	import { pageContent } from '$lib/stores/pageContent';
	import { onMount } from 'svelte';

	let showRef = false;
	let reference = [];

	$: if ($pageContent?.reference) {
		reference = $pageContent.reference;
	}
</script>

<button class = "menu-button" on:click={() => (showRef = true)}>
	Gladiator Reference
</button>

<!-- Popup overlay -->
{#if showRef}
<Portal>
	<div class="reference-overlay" on:click={() => (showRef = false)}>
		<div class="reference-popup" on:click|stopPropagation>
			<h2>Character Reference</h2>
			<div class = "story-card">
			  <div class = "story-title">Global Gladiators</div>
			  <div class = "card-prologue">{@html reference?.[0]?.[0]}</div>
			  <div class = "card-section card-section-content">{@html reference?.[0]?.[1]}</div>
			</div>
			<div class = "story-card">
			  <div class = "story-title">Allies</div>
			  <div class = "card-prologue">{@html reference?.[1]}</div>
			  <div class = "card-section card-section-content">{@html reference?.[3]}</div>
			</div>
			<div class = "story-card">
			  <div class = "story-title">Rivals</div>
			  <div class = "card-prologue">{@html reference?.[2]}</div>
			  <div class = "card-section card-section-content">{@html reference?.[4]}</div>
			</div>
			<div style="text-align: right; margin-top: 1rem;">
				<button class = "menu-button" on:click={() => (showRef = false)}>Close</button>
			</div>
		</div>
	</div>
</Portal>
{/if}

<style>

.reference-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 3000; /* high enough to escape nav-buttons context */
	pointer-events: all;
}

.reference-popup {
	background: #111;
	color: white;
	padding: 2rem;
	border-radius: 1rem;
	box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
	max-width: 90vw;
	max-height: 90vh;
	overflow-y: auto;
	position: relative;
}


</style>
