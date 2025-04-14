<script>
  import { saveSlots, refreshSaveSlots } from '$lib/stores/saveSlots';
  import { pageContent } from '$lib/stores/pageContent';
  import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

  export let currentPage;
  export let outcome;

  function saveGame(slot) {
    const story = $pageContent;
    const data = { ...story, page: currentPage, outcome };
    //console.log(slot)
    localStorage.setItem(`save_game_content_${slot}`, JSON.stringify(data));
    refreshSaveSlots();
    closeCard()
  }

  function closeCard() {
		dispatch('close');
	}

</script>


  <div class="story-overlay">
    <div  role="presentation" class="story-popup save-popup" on:click|stopPropagation>
      <div class = "save-header">Save Game<button on:click={closeCard} class="close-button"aria-label="Close popup">&times;</button></div>
      {#each $saveSlots as slot, i}
        <button class = "save-button" on:click={() => saveGame(i)}>{slot ? `Overwrite slot ${i+1}: ${slot.storyname} – ${slot.finalboss.toUpperCase()} STORY` : `Save to slot ${i+1}`}</button>
      {/each}
    </div>
  </div>

<style>

   .save-header {
    background: black;
    color:white;
    height: 100%;
    border-radius: 8px 8px 0px 0px;
    font-size: 1.3rem;
    padding: 0.5rem;
    font-weight: 700;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }

  .save-popup {
    top: 50%;
	  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }

  	.save-button {
	  text-align: left;
		border: unset;
		font-size: 1.1rem;
	  border-color: #bbb;
	  font-weight: 700;
    color: #333 !important;
	  border-radius: 6px;
	  padding: 0.4rem 0.8rem 0.4rem 0.8rem;
		background: url('/Advance.png');
		display:flex;
		width: 100%;
		flex-flow: row;
		justify-content: space-between;
	}
</style>
