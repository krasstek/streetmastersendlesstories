<script>
  import Portal from 'svelte-portal';
  import { saveSlots, refreshSaveSlots } from '$lib/stores/saveSlots';
  import { pageContent } from '$lib/stores/pageContent';

  export let currentPage;
  export let outcome;

  let showPopup = false;

  function saveGame(slot) {
    const story = $pageContent;
    const data = { ...story, page: currentPage, outcome };
    //console.log(slot)
    localStorage.setItem(`save_game_content_${slot}`, JSON.stringify(data));
    refreshSaveSlots();
    showPopup = false;
  }
</script>

<div style="text-align: right; margin-bottom: 1rem;">
  <button class = "menu-button" on:click={() => showPopup = true}>Save Game</button>
</div>

{#if showPopup}
<Portal>
  <div class="save-overlay" on:click={() => showPopup = false}>
    <div class="save-popup" on:click|stopPropagation>
      <div class = "save-header">Save Game<button on:click={() => showPopup = false} class="close-button"aria-label="Close popup">&times;</button></div>
      {#each $saveSlots as slot, i}
        <button class = "save-button" on:click={() => saveGame(i)}>{slot ? `Overwrite slot ${i+1}: ${slot.storyname} – ${slot.finalboss.toUpperCase()} STORY` : `Save to slot ${i+1}`}</button>
      {/each}
    </div>
  </div>
</Portal>
{/if}

<style>

.save-overlay {
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
    background: white;
    color: black;
    border-radius: 8px;
    backdrop-filter: blur(8px);
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
