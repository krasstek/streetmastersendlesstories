<script>
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
	<div class="story-overlay character-reference" on:click={() => (showRef = false)}>
		<div class="story-popup" on:click|stopPropagation>
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
{/if}

<style>

.character-reference {
  left: -20vw;
}

</style>
