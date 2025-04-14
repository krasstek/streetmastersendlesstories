<script>
  import { pageContent } from '$lib/stores/pageContent';
  import { saveSlots, refreshSaveSlots } from '$lib/stores/saveSlots';
  import { onMount } from 'svelte';

  export let goToStartFromHandler;

  let showPopup = false;

  function loadGame(slot) {
    const saved = localStorage.getItem(`save_game_content_${slot}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      pageContent.set(parsed);
      goToStartFromHandler?.(parsed.page ?? 0);
    }
    showPopup = false;
  }

  function deleteSaves() {
    for (let i = 1; i <= 3; i++) {
      localStorage.removeItem(`save_game_content_${i}`);
    }
    refreshSaveSlots();
  }

   onMount(() => {
    refreshSaveSlots();
  });

</script>

  <button class = "menu-button" on:click={() => showPopup = true}>LOAD STORY</button>

{#if showPopup}
  <div  role="presentation" class="story-overlay" on:click={() => showPopup = false}>
    <div  role="presentation" class="load-popup" on:click|stopPropagation>
      <div class = 'load-header'>Load Game<button on:click={() => showPopup = false} class="close-button"aria-label="Close popup">&times;</button></div>
      {#each $saveSlots as slot, i}
        <button class = 'load-button' on:click={() => {
        //console.log("click")
        loadGame(i)
        showPopup = false
        }}>
          {i+1}. {slot ? `${slot.storyname} – ${slot.finalboss.toUpperCase()} STORY` : '<empty slot>'}
        </button>
      {/each}
      <button class = 'load-button' on:click={deleteSaves}> Clear All</button>
    </div>
  </div>
{/if}

<style>

  .load-header {
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

  .load-popup {
    background: white;
    color: black;
    border-radius: 8px;
    backdrop-filter: blur(8px);
	  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }

  	.load-button {
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
