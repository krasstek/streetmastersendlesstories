<script>
  import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

  export let reference;

	function closeCard() {
		dispatch('close');
	}
</script>

<!-- Popup overlay -->
<div role="presentation" class="story-overlay reference-overlay" on:click={close}>
	<div role="presentation" class="story-popup" on:click|stopPropagation>
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
				<button class = "menu-button" on:click={closeCard}>Close</button>
			</div>
	</div>
</div>
<style>

.reference-overlay .story-card {
  margin: 2rem;
}

</style>
