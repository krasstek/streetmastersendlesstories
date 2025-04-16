<script>
  export let pagecontent;

  const referencetext = pagecontent.reference;
  const cardtexts = pagecontent.text;
  const storyname = pagecontent.storyname;
  const finalboss = pagecontent.finalboss;
</script>


<div class="printable-cards">
  <!-- Reference card -->
  <div class="card-both-sides">
    <div class="print-card-container">
      <div class="storycardfront-title"><span>{storyname}</span></div>
      <div class="circleicon">
        <span class="circle-outer"><span class="circle-middle"><span class="circle-inner"></span></span></span>
      </div>
      <div class="storycard-divider"></div>
      <div class="storycardfront-subtitle">CHARACTER OVERVIEW</div>
      <div class="storycard-divider"></div>
      <div class="storycardfront-prologue" style="font-size: 10px; font-style: normal">
        {@html referencetext[0][0]}
        <br>
        The reverse side of this card gives suggestions for additional Allies and Rivals to be used during this story.
      </div>
      <div class="storycard-divider"></div>
      <div class="storycardfront-setup" style="flex: 0.2">
        {@html referencetext[0][1]}
        <div class="expansionicon"><span class="infinity-before"></span><span class="infinity-after"></span></div>
      </div>
    </div>

    <div class="print-card-container">
      <div class="storycardback-bar-top" style="height: 6mm;"></div>
      <div class="storycardback-epilogue-top" style="padding-top: 8mm;">{@html referencetext[1]}</div>
      <div class="storycard-divider"></div>
      <div class="storycardfront-setup"><span>{@html referencetext[3]}</span></div>
      <div class="storycardback-titlebar"><div class="storycardback-epiloguetitle">If you choose to use Allies</div></div>
      <div class="storycardback-colorbar-green"></div>
      <div class="storycardback-epilogue-bottom" style="padding-top: 8mm;">{@html referencetext[2]}</div>
      <div class="storycard-divider"></div>
      <div class="storycardfront-setup"><span>{@html referencetext[4]}</span></div>
      <div class="storycardback-titlebar"><div class="storycardback-epiloguetitle">If you choose to use Rivals</div></div>
      <div class="storycardback-colorbar-red"></div>
      <div class="storycardback-bar-bottom" style="height: 6mm;"></div>
    </div>
  </div>

  <!-- Main story cards -->
  {#each cardtexts as card, index}
    <div class="card-both-sides">
      <div class="print-card-container">
        <div class="storycardfront-title"><span>{storyname}</span></div>
        <div class="circleicon"><span class="circle-outer"><span class="circle-middle"><span class="circle-inner"></span></span></span></div>
        <div class="storycard-divider"></div>
        <div class="storycardfront-subtitle">{finalboss.toUpperCase()} STORY <span style="float:right;">PART {card.chapter}</span></div>
        <div class="storycard-divider"></div>
        <div class="storycardfront-prologue">{card.prologue}</div>
        <div class="storycard-divider"></div>
        <div class="storycardfront-setup">
          {card.setup}
          <div class="expansionicon"><span class="infinity-before"></span><span class="infinity-after"></span></div>
        </div>
      </div>

      <div class="print-card-container">
        <div class="storycardback-bar-top"></div>
        <div class="storycard-divider" style="height: 0.4px;"></div>
        <div class="storycardback-epilogue-top">
          {card.winepilogue}
          {#if index < cardtexts.length - 2}
            <br><br>Advance to part {cardtexts[Math.ceil(index / 2) * 2 + 1].chapter}.
          {/if}
        </div>
        <div class="storycardback-titlebar"><div class="storycardback-epiloguetitle">{card.wincondition[0]}</div></div>
        <div class="storycardback-colorbar-green"></div>
        <div class="storycardback-epilogue-bottom">
          {card.loseepilogue}
          {#if index < cardtexts.length - 2}
            <br><br>Advance to part {cardtexts[Math.ceil(index / 2) * 2 + 2].chapter}.
          {/if}
        </div>
        <div class="storycardback-titlebar"><div class="storycardback-epiloguetitle">{card.wincondition[1]}</div></div>
        <div class="storycardback-colorbar-red"></div>
        <div class="storycard-divider"></div>
        <div class="storycardback-bar-bottom">
          <div class="storycardback-bottomtitle">PART {card.chapter} EPILOGUE</div>
        </div>
      </div>
    </div>
  {/each}
</div>
