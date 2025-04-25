<script>
  import { onMount, afterUpdate } from "svelte";

  export let pagecontent;

  const referencetext = pagecontent.reference;
  const cardtexts = pagecontent.text;
  const storyname = pagecontent.storyname;
  const finalboss = pagecontent.finalboss;

  function resizeElementToFit(
    el,
    buffer = 0,
    lineHeightStart = 1.5,
    padStep = 0.5,
    flex
  ) {
    if (!el) return;

    const computed = getComputedStyle(el);
    let fontSize = parseFloat(computed.fontSize);
    let lineHeight = lineHeightStart;
    let paddingTop = parseFloat(computed.paddingTop);
    const minFontSize = 7; // Prevent shrinking below this
    let flexGrow = parseFloat(computed.flexGrow);

    const overflowCheck = () => el.scrollHeight > el.clientHeight + buffer;

    let attempts = 0;
    const maxAttempts = 50;

    while (
      overflowCheck() &&
      attempts < maxAttempts
    ) {

      if (flex === true && overflowCheck()) {
        flexGrow += 0.1;
        el.style.flexGrow = `${flexGrow}`;
      } else if (flex === false) {
        flexGrow -= 0.01;
        el.style.flexGrow = flexGrow;
      }
      if (lineHeightStart && overflowCheck()) {
        lineHeight = Math.max(1, lineHeight - 0.01);
        const calculatedLineHeight = Math.min(
          fontSize * lineHeight,
          fontSize * 1.1
        );
        el.style.lineHeight = `${calculatedLineHeight}px`;
      }

      if(overflowCheck() && fontSize > minFontSize) {
        fontSize -= 1;
        el.style.fontSize = `${fontSize}px`;
      }

      if (padStep && overflowCheck()) {
        paddingTop -= 1;
        paddingTop = Math.max(0, paddingTop); // don't go negative
        el.style.paddingTop = `${paddingTop}px`;
      }


      attempts++;
    }
  }

  function resizeCards() {
    const titles = document.querySelectorAll(".card-storycardfront-title");

    titles.forEach((el) => {
      if (el.scrollHeight > el.clientHeight + 2) {
        resizeElementToFit(el, 0, 1.5, 0.5);
      }
    });

    const prologues = document.querySelectorAll(
      ".card-storycardfront-prologue"
    );
    const storySetups = document.querySelectorAll(".card-storycardfront-setup");
    prologues.forEach((el) => {
      if (el.scrollHeight > el.clientHeight) {
        storySetups.forEach((el) => {
          el.style.flexGrow -= 0.1;
        });
      }
      resizeElementToFit(el, 2, 1.4, 0.4, true);
      //      el.style.overflow = 'visible';
    });

    const epilogues = document.querySelectorAll(
      ".card-storycardback-epilogue-top, .card-storycardback-epilogue-bottom"
    );
    epilogues.forEach((el) => {
      resizeElementToFit(el, 0, 1.4, 0.5);
    });

    const epilogueTitles = document.querySelectorAll(
      ".card-storycardback-epiloguetitle"
    );
    epilogueTitles.forEach((el) => {
      if (el.scrollHeight > el.clientHeight + 4) {
        resizeElementToFit(el, 0, 1.1, 0);
      }
    });

    storySetups.forEach((el) => {
      el.style.overflow = "hidden";
      if (el.scrollHeight > el.clientHeight + 4) {
        resizeElementToFit(el, 0, 1.2, 0.5, true);
      }
    });
  }

  onMount(() => {
    requestAnimationFrame(() => {
      resizeCards();
    });
  });

  afterUpdate(() => {
    // Useful if pagecontent updates or card content changes
    requestAnimationFrame(() => {
      document.fonts.ready.then(() => {
        resizeCards(); // or your function
      });
    });
  });
</script>

<style>
  .printable-cards {
    display: flex;
    flex-wrap: wrap; /* Allows wrapping to next line */
    flex-direction: row; /* Default, but included for clarity */
    justify-content: flex-start; /* Cards align left */
    align-items: flex-start; /* Optional: align tops */
    max-width: 100%; /* Prevent overflow horizontally */
    overflow-y: hidden; /* Hide overflow if it somehow escapes */
    overflow-x: scroll;
    box-sizing: border-box;
  }

  .card-both-sides {
    margin: 0.2mm 1mm;
    display: flex;
    flex-direction: row;
  }

  .print-card-container {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    width: 63mm;
    min-height: 87mm;
    max-height: 87mm;
    position: relative;
  }

  .card-storycard-divider {
    flex-basis: 0.8mm;
    background: linear-gradient(
      90deg,
      rgba(130, 130, 130, 1) 0%,
      rgba(255, 255, 255, 1) 37%,
      rgba(255, 255, 255, 1) 53%,
      rgba(130, 130, 130, 1) 100%
    );
  }

  .card-storycardfront-title {
    background: linear-gradient(
      90deg,
      rgba(78, 74, 62, 1) 0%,
      rgba(59, 56, 46, 1) 10%,
      rgba(3, 2, 2, 1) 100%
    );
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    height: 10mm;
    font-family: "Yanone Kaffeesatz", sans-serif;
    font-size: 28px;
    box-sizing: border-box;
    padding: 1mm 1mm 1mm 16mm;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .card-storycardfront-title span {
    align-self: flex-end;
    margin-top: auto;
    margin-right: auto;
    text-align: left;
  }

  .card-storycardfront-subtitle {
    min-height: 3mm;
    background: black;
    font-style: italic;
    font-size: 7px;
    color: #d6d2ce;
    box-sizing: border-box;
    padding-left: 17mm;
    padding-top: 0.5mm;
    padding-right: 2mm;
  }

  .card-storycardfront-prologue {
    flex: 5;
    background: url("/card_background.png");
    background-size: cover;
    overflow: hidden;
    padding: 3mm 3mm 2mm 3mm;
    color: black;
    font-family: "IBM Plex Sans", sans-serif;
    font-style: italic;
    font-size: 9px;
    line-height: 1.4;
    text-shadow: none;
  }

  .card-storycardfront-setup {
    background: linear-gradient(
      90deg,
      rgba(78, 74, 62, 1) 0%,
      rgba(59, 56, 46, 1) 10%,
      rgba(3, 2, 2, 1) 100%
    );
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    font-family: "IBM Plex Sans Condensed", sans-serif;
    flex: 1;
    color: #d6d2ce;
    padding-left: 2mm;
    padding-top: 1.5mm;
    padding-bottom: 2mm;
    padding-right: 2mm;
    font-size: 10px;
    font-weight: 100;
    position: relative;
  }

  .circleicon {
    float: left;
    position: absolute;
    z-index: 1;
    top: -1mm;
  }
  .circle-outer,
  .circle-middle,
  .circle-inner {
    display: inline-block;
    border-radius: 50%;
    float: none;
    z-index: 1;
  }

  .circle-outer {
    height: 13mm;
    width: 13mm;
    background: linear-gradient(
      180deg,
      rgba(221, 221, 221, 1) 0%,
      rgba(51, 51, 51, 1) 100%
    );
    margin-top: 3mm;
    margin-left: 2.2mm;
  }

  .circle-middle {
    height: 10.5mm;
    width: 10.5mm;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(0, 0, 0, 1) 100%
    );
    margin-top: 1.25mm;
    margin-left: 1.25mm;
  }

  .circle-inner {
    height: 10mm;
    width: 10mm;
    background: black;
    margin-top: 0.25mm;
    margin-left: 0.25mm;
  }

  .expansionicon {
    position: absolute;
    float: right;
    bottom: 2mm;
    right: 2mm;
    width: 4mm;
    height: 2mm;
  }

  .infinity-before,
  .infinity-after {
    position: absolute;
    box-sizing: border-box;
    width: 2mm;
    height: 2mm;
    border: 0.5mm solid white;
    border-radius: 50px 50px 0px 50px;
    transform: rotate(-45deg);
  }
  .infinity-after {
    border-radius: 50px 50px 50px 0;
    transform: rotate(45deg);
    margin-left: 2mm;
  }

  .card-storycardback-bar-top {
    background: linear-gradient(
      90deg,
      rgba(78, 74, 62, 1) 0%,
      rgba(59, 56, 46, 1) 10%,
      rgba(3, 2, 2, 1) 100%
    );
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    height: 3mm;
  }

  .card-storycardback-titlebar {
    height: 6mm;
    width: 63mm;
    -webkit-clip-path: polygon(
      0 0,
      100% 0%,
      100% 32%,
      80.5% 32%,
      75.5% 100%,
      24.5% 100%,
      19.5% 32%,
      0% 32%
    );
    clip-path: polygon(
      0 0,
      100% 0%,
      100% 32%,
      80.5% 32%,
      75.5% 100%,
      24.5% 100%,
      19.5% 32%,
      0% 32%
    );
    background: linear-gradient(
      90deg,
      rgba(130, 130, 130, 1) 0%,
      rgba(255, 255, 255, 1) 37%,
      rgba(255, 255, 255, 1) 53%,
      rgba(130, 130, 130, 1) 100%
    );
    position: absolute;
    z-index: 2;
  }

  .card-storycardback-epiloguetitle {
    height: 5mm;
    position: relative;
    font-family: "IBM Plex Sans Condensed", sans-serif;
    font-size: 9px;
    background: #30271b;
    top: 0.4mm;
    font-style: italic;
    padding: 1mm 15mm 0mm;
    color: #d6d2ce;
    box-sizing: border-box;
    -webkit-clip-path: polygon(
      0 0,
      100% 0%,
      100% 20%,
      80% 20%,
      75% 100%,
      25% 100%,
      20% 20%,
      0% 20%
    );
    clip-path: polygon(
      0 0,
      100% 0%,
      100% 20%,
      80% 20%,
      75% 100%,
      25% 100%,
      20% 20%,
      0% 20%
    );
    z-index: 2;
    text-align: center;
    overflow: hidden;
  }

  .card-storycardback-colorbar-back {
    float: none;
    width: 60.5mm;
    height: 1.5mm;
    background: linear-gradient(
      90deg,
      rgba(130, 130, 130, 1) 0%,
      rgba(255, 255, 255, 1) 37%,
      rgba(255, 255, 255, 1) 53%,
      rgba(130, 130, 130, 1) 100%
    );
    position: absolute;
    left: 1mm;
    -webkit-clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
    clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
    z-index: 1;
  }

  .card-storycardback-colorbar-red,
  .card-storycardback-colorbar-green {
    float: none;
    width: 58mm;
    height: 1mm;
    position: absolute;
    -webkit-clip-path: polygon(0 0, 100% 0, 96% 100%, 4% 100%);
    clip-path: polygon(0 0, 100% 0, 96% 100%, 4% 100%);
    z-index: 1;
    left: 2.2mm;
  }

  .card-storycardback-colorbar-red {
    background: #c4331a;
  }

  .card-storycardback-colorbar-green {
    background: #0a612b;
  }

  .card-storycardback-epilogue-bottom,
  .card-storycardback-epilogue-top {
    height: 41mm;
    background: url("/card_background.png");
    background-size: cover;
    overflow: hidden;
    color: black;
    font-family: "IBM Plex Sans", sans-serif;
    font-style: italic;
    box-sizing: border-box;
    font-style: italic;
    padding: 7.5mm 3mm 3mm 3mm;
    font-size: 10px;
    line-height: 1.4;
    text-shadow: none;
  }

  .card-storycardback-bar-bottom {
    background: linear-gradient(
      90deg,
      rgba(78, 74, 62, 1) 0%,
      rgba(59, 56, 46, 1) 10%,
      rgba(3, 2, 2, 1) 100%
    );
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    height: 3mm;
    color: #d6d2ce;
    font-size: 9px;
    font-weight: 100;
    position: relative;
  }

  .card-storycardback-bottomtitle {
    background: url("/Advance.png");
    background-size: cover;
    height: 6mm;
    width: 29mm;
    position: relative;
    left: 17mm;
    bottom: 3mm;
    box-sizing: border-box;
    color: black;
    font-style: italic;
    font-weight: bold;
    font-family: "IBM Plex Sans Condensed", sans-serif;
    padding-top: 2mm;
    text-align: center;
    font-size: 8px;
    -webkit-clip-path: polygon(20.5% 0%, 79.5% 0%, 100% 100%, 0% 100%);
    clip-path: polygon(20.5% 0%, 79.5% 0%, 100% 100%, 0% 100%);
    z-index: 1;
    text-shadow: none;
  }

  .reference-back-container {
    overflow: hidden; display: flex; flex-flow: column;
  }
  </style>

<div class="printable-cards">
  <!-- Reference card -->
  <div class="card-both-sides">
    <div class="print-card-container">
      <div class="card-storycardfront-title">
        <span>{@html storyname}</span>
      </div>
      <div class="circleicon">
        <span class="circle-outer">
          <span class="circle-middle"> <span class="circle-inner" /> </span>
        </span>
      </div>
      <div class="card-storycard-divider" />
      <div class="card-storycardfront-subtitle">CHARACTER OVERVIEW</div>
      <div class="card-storycard-divider" />
      <div
        class="card-storycardfront-prologue"
        style="flex: 2.5; font-size: 10px; font-style: normal">
        {@html referencetext[0][0].trim()}<br />The reverse side of this card
        gives suggestions for additional Allies and Rivals to be used during
        this story.
      </div>
      <div class="card-storycard-divider" />
      <div class="card-storycardfront-setup" style="flex: 1.5">
        {@html referencetext[0][1].trim()}
        <div class="expansionicon">
          <span class="infinity-before" /><span class="infinity-after" />
        </div>
      </div>
    </div>

    <div class="print-card-container" style = "flex-flow: column;">
      <div class="card-storycardback-bar-top" style="height: 6mm;" />
      <div class = "reference-back-container" style = "height: 48%;">
        <div
          class="card-storycardback-epilogue-top"
          style="flex-grow: 0.5; font-style: normal; overflow: none; padding-top: 8mm; height: unset;">
          {@html referencetext[1]}
        </div>
        <div class="card-storycard-divider" />
        <div class="card-storycardfront-setup" style="border-radius: 0px;">
          <span>
            {@html referencetext[3]}
          </span>
        </div>
        <div class="card-storycardback-titlebar" style="top: 3.8mm">
          <div class="card-storycardback-epiloguetitle">
            If you choose to use Allies
          </div>
        </div>
        <div class="card-storycardback-colorbar-back" style="top: 5.7mm" />
        <div class="card-storycardback-colorbar-green" style="top: 5.7mm" />
      </div>
      <div class = "reference-back-container" style = "height: 45%">
        <div
        class="card-storycardback-epilogue-bottom"
        style="flex-grow: 0.5; font-style: normal; overflow:none; padding-top: 8mm; height: unset;">
        {@html referencetext[2]}
      </div>
        <div class="card-storycard-divider" />
        <div
          class="card-storycardfront-setup"
          style="border-radius: 0px; padding-bottom: 3mm;">
          <span>
            {@html referencetext[4]}
          </span>
        </div>
        <div class="card-storycardback-titlebar" style="top: 4.35cm">
          <div class="card-storycardback-epiloguetitle">
            If you choose to use Rivals
          </div>
        </div>
        <div class="card-storycardback-colorbar-back" style="top: 4.54cm" />
        <div class="card-storycardback-colorbar-red" style="top: 4.54cm" />
      </div>
      <div class="card-storycardback-bar-bottom" style="height: 6mm" />
    </div>
  </div>

  <!-- Main story cards -->
  {#each cardtexts as card, index}
    <div class="card-both-sides">
      <div class="print-card-container">
        <div class="card-storycardfront-title"><span>{storyname}</span></div>
        <div class="circleicon">
          <span class="circle-outer">
            <span class="circle-middle"> <span class="circle-inner" /> </span>
          </span>
        </div>
        <div class="card-storycard-divider" />
        <div class="card-storycardfront-subtitle">
          {finalboss.toUpperCase()}
          {cardtexts.length === 1 ? 'ENCOUNTER' : 'STORY'}
          <span style="float:right;">
            {@html cardtexts.length === 1 ? `` : 'PART ' + card.chapter}
          </span>
        </div>
        <div class="card-storycard-divider" />
        <div class="card-storycardfront-prologue" style="flex: 4">
          {@html card.prologue.trim()}
        </div>
        <div class="card-storycard-divider" />
        <div class="card-storycardfront-setup" style="flex: 2">
          {@html card.setup.trim()}
          <div class="expansionicon">
            <span class="infinity-before" /><span class="infinity-after" />
          </div>
        </div>
      </div>

      <div class="print-card-container">
        <div class="card-storycardback-bar-top" />
        <div class="card-storycard-divider" style="height: 0.4px" />
        <div class="card-storycardback-epilogue-top">
          {@html card.winepilogue.trim()}
          {@html index == cardtexts.length - 1 || index == cardtexts.length - 2 ? `` : `<br><br>Advance to part ${cardtexts[Math.ceil(index / 2) * 2 + 1].chapter}.`}
        </div>
        <div class="card-storycardback-titlebar" style="top: 3.8mm">
          <div class="card-storycardback-epiloguetitle">
            {@html card.wincondition[0]}
          </div>
        </div>
        <div class="card-storycardback-colorbar-back" style="top: 5.7mm" />
        <div class="card-storycardback-colorbar-green" style="top: 5.7mm" />
        <div class="card-storycardback-epilogue-bottom">
          {@html card.loseepilogue.trim()}
          {@html index == cardtexts.length - 1 || index == cardtexts.length - 2 ? `` : `<br><br>Advance to part ${cardtexts[Math.ceil(index / 2) * 2 + 2].chapter}.`}
        </div>
        <div class="card-storycardback-titlebar" style="top: 4.35cm">
          <div class="card-storycardback-epiloguetitle">
            {@html card.wincondition[1]}
          </div>
        </div>
        <div class="card-storycardback-colorbar-back" style="top: 4.54cm" />
        <div class="card-storycardback-colorbar-red" style="top: 4.54cm" />
        <div class="card-storycard-divider" />
        <div class="card-storycardback-bar-bottom">
          <div class="card-storycardback-bottomtitle">
            PART
            {@html card.chapter}
            EPILOGUE
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
