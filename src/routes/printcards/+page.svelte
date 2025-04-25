<script>
  import { pageContent } from '$lib/stores/pageContent';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';
  import PrintableCards from '$lib/components/PrintableCards.svelte';

  let content;

  onMount(() => {
    const current = get(pageContent);
    if (!current) {
      goto('/'); // fallback to home or another page if content is missing
    } else {
      content = current;
    }
  });

  function goBack() {
    history.back(); // Returns to the story page
  }
</script>

{#if content}
  <PrintableCards pagecontent={content}/>
  <button class="menu-button" on:click={goBack}>Back to Story</button>
{/if}

<style>

  @media print {
    :global(body) {
        background: none;
        }

    :global(.app-header) {
        display: none;
        }
    
    :global(.menu-button) {
        display: none;
        }

:global(.app-container) {
        overflow: visible;
        }

        :global(.app-wrapper) {
max-width: none!important;
        }

   :global(.printable-cards) {
      display: table !important;
  height: auto !important;
  overflow: visible !important;
  width: 100%;
    }

    :global(.card-both-sides) {
      display: inline-block !important;
     break-inside: avoid;
      page-break-inside: avoid;
  }
  }
</style>
