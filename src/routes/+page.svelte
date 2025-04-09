<script>
  import {
    playerCount,
	  storyLength,
	  selectedExpansions as expansionStore,
	  selectedGladiators as gladiatorStore
	  } from '$lib/stores/preferences';

	  $: players = $playerCount;
    $: stages = $storyLength;

  import template from 'lodash/template';
	import { expansions as initialExpansions } from '$lib/expansions';
	import { getGladiators } from '$lib/stages';
	import { createStory } from '$lib/story_utils';
	import { pageContent } from '$lib/stores/pageContent';
	import StoryPageRenderer from '$lib/components/StoryPageRenderer.svelte';
	import LoadHandler from '$lib/components/LoadHandler.svelte';
	 import { clickOutside } from '$lib/actions/clickOutside';

	let storyRendererRef;

  function goToStartFromHandler(page = 0) {
		storyRendererRef?.goToStart(page);
	  }

	let showExpansionDropdown = false;
	let expansions = initialExpansions.map(e => ({
	...e,
	selected: $expansionStore.includes(e.name)
}));

	function toggleDropdown() {
		showExpansionDropdown = !showExpansionDropdown;
	}

	function toggleExpansion(index) {
	if (!expansions[index].disabled) {
		expansions[index].selected = !expansions[index].selected;
		expansionStore.set(expansions.filter(e => e.selected).map(e => e.name));
	}
}

	$: selectedExpansions = expansions.filter(e => e.selected | e.name == "riseofthekingdom").map(e => e.name);

	$: filteredGladiators = getGladiators(selectedExpansions).map(g => ({
		...g,
		selected: false
	}));

  let showGladiatorDropdown = false;

	function toggleGladiatorDropdown() {
		showGladiatorDropdown = !showGladiatorDropdown;
	}

	function toggleGladiator(index) {
		filteredGladiators[index].selected = !filteredGladiators[index].selected;
	}

  function handleStoryGeneration() {
  const result = createStory(selectedExpansions, filteredGladiators.filter(e => e.selected).map(e => e.name), players, stages)
  pageContent.set(result); // Trigger render
  storyRendererRef?.goToStart();
	}

	$: console.log('pageContent updated:', $pageContent);

</script>

{#if typeof players === 'number' && typeof stages === 'number'}
<label for="players">Number of players:</label>
<select bind:value={$playerCount} id="players" class="dropdown">
	{#each [1, 2, 3, 4] as n}
		<option value={n} selected={n === players} >{n}</option>
	{/each}
</select>
<label for="stages">Number of stages:</label>
<select bind:value={$storyLength} id="stages" class="dropdown">
	{#each [1, 2, 3, 4, 5] as n}
		<option value={n} selected={n === stages}>{n}</option>
	{/each}
</select>
{/if}
<button class="menu-button" on:click={handleStoryGeneration}>GENERATE A STORY</button>
<StoryPageRenderer bind:this={storyRendererRef} />
<LoadHandler {goToStartFromHandler}/>
<button class="menu-button" on:click={toggleDropdown}>SELECT EXPANSIONS</button>
{#if showExpansionDropdown}
	<div use:clickOutside={() => showExpansionDropdown = false} class="exp-dropdown">
		{#each expansions as exp, i}
			<a
				class="exp-item {exp.disabled ? 'disabled' : ''}"
				on:click={() => toggleExpansion(i)}
			>
				{exp.label}
				<span class="exp-icon">
					{#if exp.disabled}
						➖
					{:else if exp.selected}
						✔️
					{:else}
						◻️
					{/if}
				</span>
			</a>
		{/each}
	</div>
{/if}
<button class="menu-button" on:click={toggleGladiatorDropdown}>
	SELECT GLADIATORS
</button>

{#if showGladiatorDropdown}
	<div use:clickOutside={() => showGladiatorDropdown = false} class="exp-dropdown">
		{#each filteredGladiators as glad, i}
			<a
				class="exp-item"
				on:click={() => toggleGladiator(i)}
			>
				{glad.name}
				<span class="exp-icon">
					{glad.selected ? '✔️' : '◻️'}
				</span>
			</a>
		{/each}
	</div>
{/if}
			<footer class="app-footer">
	<p>
		Created by <strong>krasstek</strong>. Street Masters and all associated artwork is owned by
		<a href="https://steamforged.com" target="_blank" rel="noopener noreferrer">Steamforged Games</a>.
	</p>
</footer>
