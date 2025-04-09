<script>
	import { pageContent } from '$lib/stores/pageContent';
	import { goto } from '$app/navigation';
	import SaveHandler from  '$lib/components/SaveHandler.svelte';
	import ReferenceCard from '$lib/components/ReferenceCard.svelte';

	let currentPage = 0;
	let outcome = null;
	let story = null;
	let cardtexts = [];
	let card = null;
	let storytitle = ''
	let showOverlay = true ;


	$: if ($pageContent) {
		story = $pageContent;
		cardtexts = $pageContent.text ?? [];
		card = cardtexts[currentPage];
		storytitle = $pageContent.storyname;
		showOverlay = true;
	}

	function handleOutcome(result) {
		outcome = result;
	}

	function advanceToNextScenario() {
		if (currentPage >= cardtexts.length - 1) return;

		const currentScen = Math.ceil(currentPage / 2) + 1;
		//console.log(currentScen)
		const nextIndex = (currentScen - 1) * 2 + (outcome === 'win' ? 1 : 2);

		if (nextIndex < cardtexts.length) {
			currentPage = nextIndex;
			outcome = null;
		}
	}

	function goBack() {
		if (outcome !== null) {
			outcome = null;
		} else if (currentPage > 0) {
			currentPage -= 1;
		} else {
			goto('/');
		}
	}

	export function goToStart(page = 0) {
	  console.log(currentPage)
		currentPage = page;
		console.log(currentPage)
		outcome = null;
	}

	function outcomeLabel() {
		if (outcome === null) {
			return null;
		} else if (outcome == "lose") {
			return "Defeat!";
		} else {
			return "Victory!";
		}
	}

	function getNextLabel() {
		const currentScen = Math.ceil(currentPage / 2) + 1;
		const nextIndex = (currentScen - 1) * 2 + (outcome === 'win' ? 1 : 2);
		if (nextIndex >= cardtexts.length) return '';
		return `Advance to part ${cardtexts[nextIndex]?.chapter}`;
	}

</script>

{#if card && showOverlay}
  <div class="story-overlay" on:click={() => showOverlay = false}>
    <div class="story-popup" on:click|stopPropagation>
     {#if card && outcome === null}
	<div class="story-card">
    <div class = "story-title">{storytitle}</div>
		<div class="card-header">
			{story.finalboss.toUpperCase()} STORY – PART {card.chapter}
		</div>
		<div class="card-prologue"><i>{@html card.prologue}</i></div>
		<div class="card-section">
			<div class="card-section-title">SETUP</div>
			<div class="card-section-content">{@html card.setup}</div>
		</div>
		<div class="outcome-buttons">
			<button class="win-button" on:click={() => handleOutcome('win')}>
				{card.wincondition[0]}
			</button>
			<button class="lose-button" on:click={() => handleOutcome('lose')}>
				{card.wincondition[1]}
			</button>
				<ReferenceCard />
				<SaveHandler />
		</div>
	</div>
{:else if card && outcome}
	<div class="story-card">
		<div class="card-header">
			{outcomeLabel()}
		</div>
		<div class="card-outcome-text">
			{@html outcome === 'win' ? card.winepilogue : card.loseepilogue}
		</div>
		<div class="nav-buttons">
			{#if currentPage < cardtexts.length - 2}
			<button class="next-button" on:click={advanceToNextScenario}>
					<span class="next-label">{getNextLabel()}</span>
					<svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
	<path d="M5 12h14M13 6l6 6-6 6" />
</svg>
				</button>
			{:else}
				<button class="story-conclusion"  on:click={() => showOverlay = false}>END STORY</button>
			{/if}
			<button class = "next-button" on:click={goBack}>
								<span class="next-label">Back</span>
					<svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
	<path d="M5 12h14M13 6l6 6-6 6" />
</svg></button>
			<button class = "next-button" on:click={() => goToStart(0)}>
								<span class="next-label">Go to Part 1</span>
					<svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
	<path d="M5 12h14M13 6l6 6-6 6" />
</svg></button>
	<SaveHandler />
		</div>
	</div>
{:else}
	<p>No story loaded.</p>
{/if}
<button class = "menu-button" on:click={() => (showOverlay = false)}>Close</button>
    </div>
  </div>
{/if}
{#if card}
<button class = "menu-button" on:click={() => showOverlay = true}>OPEN STORY</button>
{/if}

<style>

</style>
