function createPageContent(pagecontent) {

    $("#printable_cards").html("").css(
        {"display": "flex", 
        "opacity": "0", 
        "transition": "opacity 0.5s ease", 
        "background-image": 'url("Street Masters background.png")',
        "background-size": "100% auto"})

    deletePages()

    let referencetext = pagecontent.reference
    let cardtexts = pagecontent.text
    let storyname = pagecontent.storyname
    let finalboss = pagecontent.finalboss

    $(`#charactersetup`).html(`${(`${referencetext[0][0]}<br><br>${referencetext[0][1]}`.trim())}`)
    $(`#allyintro`).html(referencetext[1])
    $(`#allysetup`).html(referencetext[3])
    $(`#rivalintro`).html(referencetext[2])
    $(`#rivalsetup`).html(referencetext[4])

    $("#printable_cards").append(
        `<div class = "card-both-sides">
            <div class="print-card-container">
                <div class = "storycardfront-title">
                    <span>${storyname}</span>
                </div>
                <div class = "circleicon">
                    <span class="circle-outer">
                        <span class="circle-middle">
                            <span class="circle-inner"></span>
                        </span>
                    </span>
                </div>
                <div class = "storycard-divider"></div>
                <div class = "storycardfront-subtitle">CHARACTER OVERVIEW</span></div>
                <div class = "storycard-divider"></div>
                <div class = "storycardfront-prologue" style = "font-size: 10px; font-style: normal">
                    ${referencetext[0][0].trim()}<br>The reverse side of this card gives suggestions for additional Allies and Rivals to be used during this story.
                </div>
                <div class = "storycard-divider"></div>
                <div class = "storycardfront-setup" style = "flex: 0.2">
                    ${referencetext[0][1].trim()}
                    <div class = "expansionicon">
                        <span class="infinity-before"></span><span class="infinity-after"></span>
                    </div>
                </div>
            </div>

            <div class = "print-card-container">
                <div class = "storycardback-bar-top" style = "height: 6mm;"></div>
                <div class = "storycardback-epilogue-top" style = "font-style: normal; overflow: none; padding-top: 8mm;">
                    ${referencetext[1]}
                </div>
                <div class = "storycard-divider"></div>
                <div class = "storycardfront-setup" style = "flex: 0.2; border-radius: 0px;"><span>${referencetext[3]}</span></div>
                <div class = "storycardback-titlebar" style = "top: 3.8mm">
                        <div class = "storycardback-epiloguetitle">If you choose to use Allies</div>
                </div>
                <div class = "storycardback-colorbar-back" style = "top: 5.7mm"></div>
                <div class = "storycardback-colorbar-green" style = "top: 5.7mm"></div>
                <div class = "storycardback-epilogue-bottom" style = "font-style: normal; overflow:none; padding-top: 8mm;">
                    ${referencetext[2]}
                </div>
                <div class = "storycard-divider"></div>
                <div class = "storycardfront-setup" style = "flex: 0.2; border-radius: 0px; padding-bottom: 3mm;"><span>${referencetext[4]}</span></div>
                <div class = "storycardback-titlebar" style = "top: 4.35cm">
                        <div class = "storycardback-epiloguetitle">If you choose to use Rivals</div>
                </div>
                <div class = "storycardback-colorbar-back" style = "top: 4.54cm"></div>
                <div class = "storycardback-colorbar-red" style = "top: 4.54cm"></div>
                <div class = "storycardback-bar-bottom" style = "height: 6mm">
                </div>
            </div>
            </div>
                `)

    savegamecontent = pagecontent

    $(cardtexts).each(function (index) {

        cardFront = $(`
        <div data-role = "page" id = "page_${index}">
<div data-role = "header" data-id="head" data-position = "fixed" data-theme="b">
    <div "ui-grid-solo" class = "mobile-card-title"><h2>${storyname}</h2></div>
</div>


<div data-role = "main" class = "ui-content">
        <ul data-role="listview" data-inset="true">
            <li data-role = "list-divider" data-theme="b"><i>${finalboss.toUpperCase()} STORY - PART ${this.chapter}</i></li>
            <li class = "cardbg" style = "white-space:normal">${this.prologue}</li>
            <li data-role = "list-divider" data-theme="b">SETUP</li>
            <li style = "white-space:normal" data-theme="b">${this.setup}</li>
        </ul>
        <a href="#winpop_${index}" data-rel="popup" class="ui-btn ui-corner-all ui-btn-b" data-transition = "flip" style = "white-space:normal; background: #0a612b">${this.wincondition[0]}</a>
        <a href="#losepop_${index}" data-rel="popup" class="ui-btn ui-corner-all ui-btn-b" data-transition = "flip" style = "white-space:normal; background: #c4331a">${this.wincondition[1]}</a>
</div>

<div data-role="popup" id="winpop_${index}">
    <a href="#" data-rel="back" data-role="button" data-theme="b" data-icon="delete" data-iconpos="notext" class="ui-btn-right"></a>
    <ul data-role="listview" data-inset="true">
        <li data-role = "list-divider" data-theme="b"><h2>VICTORY!</h2></li>
        <li style = "white-space:normal" class = "cardbg">${this.winepilogue}</li>
        ${index == cardtexts.length - 1 || index == cardtexts.length - 2 ? `<li><a href="#intro" data-transition = "pop" class = "cardadvance">End Story</a></li>` : `<li><a href="#page_${Math.ceil(index / 2) * 2 + 1}" data-transition = "slide" class = "cardadvance">Advance to part ${cardtexts[Math.ceil(index / 2) * 2 + 1].chapter}</a></li>`}
    </ul>
</div>

<div data-role="popup" id="losepop_${index}">
    <a href="#" data-rel="back" data-role="button" data-theme="b" data-icon="delete" data-iconpos="notext" class="ui-btn-right"></a>
    <ul data-role="listview" data-inset="true">
        <li data-role = "list-divider" data-theme="b"><h2>DEFEAT!</h2></li>
        <li class = "cardbg" style = "white-space:normal">${this.loseepilogue}</li>
        ${index == cardtexts.length - 1 || index == cardtexts.length - 2 ? `<li><a href="#intro" data-transition = "pop" class = "cardadvance">End Story</a></li>` : `<li data-theme="b"><a href="#page_${Math.ceil(index / 2) * 2 + 2}" data-transition = "slide" class = "cardadvance">Advance to part ${cardtexts[Math.ceil(index / 2) * 2 + 2].chapter}</a></li>`}
    </ul>
</div>


<div data-role="footer" data-id="foo1" data-position="fixed">
    <div data-role="navbar">
        <ul>
            <li><a class = "ui-icon-arrow-l ui-btn-icon-top" href="#" data-rel="back" data-direction="reverse" data-theme = "b"></a></li>
            <li><a class = "ui-icon-back ui-btn-icon-top" href="#intro" data-transition="fade" data-theme = "b"></a></li>
            <li><a class = "ui-icon-user ui-btn-icon-top" href="#refpanel" data-transition = "slidedown" data-theme = "b"></a></li>
            <li><a class = "ui-icon-grid ui-btn-icon-top" href="#printcards" data-transition="pop" data-theme = "b"></a></li>
            <li><a class = "ui-icon-arrow-d ui-btn-icon-top" href="#savepop" data-rel="popup" data-transition = "pop" data-theme = "b"></a></li>
        </ul>
    </div>
</div>
</div>
        `)

        printCard = (
            `<div class = "card-both-sides">
            <div class="print-card-container">
                <div class = "storycardfront-title">
                    <span>${storyname}</span>
                </div>
                <div class = "circleicon">
                    <span class="circle-outer">
                        <span class="circle-middle">
                            <span class="circle-inner"></span>
                        </span>
                    </span>
                </div>
                <div class = "storycard-divider"></div>
                <div class = "storycardfront-subtitle">${finalboss.toUpperCase()} STORY <span style="float:right;">PART ${this.chapter}</span></div>
                <div class = "storycard-divider"></div>
                <div class = "storycardfront-prologue">${this.prologue.trim()}</div>
                <div class = "storycard-divider"></div>
                <div class = "storycardfront-setup">
                    ${this.setup.trim()}
                    <div class = "expansionicon">
                        <span class="infinity-before"></span><span class="infinity-after"></span>
                    </div>
                </div>
            </div>

            <div class = "print-card-container">
                <div class = "storycardback-bar-top"></div>
                <div class = "storycard-divider" style = "height: 0.4px"></div>
                <div class = "storycardback-epilogue-top">
                    ${this.winepilogue.trim()}
                    ${index == cardtexts.length - 1 || index == cardtexts.length - 2 ? `` : `<br><br>Advance to part ${cardtexts[Math.ceil(index / 2) * 2 + 1].chapter}.`}
                </div>
                <div class = "storycardback-titlebar" style = "top: 3.8mm">
                        <div class = "storycardback-epiloguetitle">${this.wincondition[0]}</div>
                </div>
                <div class = "storycardback-colorbar-back" style = "top: 5.7mm"></div>
                <div class = "storycardback-colorbar-green" style = "top: 5.7mm"></div>
                <div class = "storycardback-epilogue-bottom">
                    ${this.loseepilogue.trim()}
                    ${index == cardtexts.length - 1 || index == cardtexts.length - 2 ? `` : `<br><br>Advance to part ${cardtexts[Math.ceil(index / 2) * 2 + 2].chapter}.`}
                </div>
                <div class = "storycardback-titlebar" style = "top: 4.35cm">
                        <div class = "storycardback-epiloguetitle">${this.wincondition[1]}</div>
                </div>
                <div class = "storycardback-colorbar-back" style = "top: 4.54cm"></div>
                <div class = "storycardback-colorbar-red" style = "top: 4.54cm"></div>
                <div class = "storycard-divider"></div>
                <div class = "storycardback-bar-bottom">
                    <div class = "storycardback-bottomtitle">PART ${this.chapter} EPILOGUE</div>
                </div>
            </div>
            </div>
                `)

        cardFront.appendTo($.mobile.pageContainer);
        $("#printable_cards").append(printCard);


    })

    return pagecontent.hasOwnProperty("page") ? $.mobile.changePage(`#${pagecontent.page}`, false) : $.mobile.changePage(`#page_0`)

}


let savegamecontent

        function saveGame(save_position, save_game_content = savegamecontent) {
            save_game_content.page = $.mobile.activePage.attr('id')
            localStorage.getItem(`save_game_content_${save_position}`) != null ? localStorage.removeItem(`save_game_content_${save_position}`) : () => { }
            localStorage.setItem(`save_game_content_${save_position}`, JSON.stringify(save_game_content));
            getSaveNames()
            setTimeout(function () { $("#savepop").popup("close") }, 300);
            return false
        }

        function clearSaves() {
            localStorage.removeItem("save_game_content_1")
            localStorage.removeItem("save_game_content_2")
            localStorage.removeItem("save_game_content_3")
            getSaveNames()
        }

        let enemiescopy

        function getSaveNames() {
            $(`a[id^="loadgame_"]`).each(function (i) {

                if (localStorage.getItem(`save_game_content_${i + 1}`) != null) {
                    lstore = JSON.parse(localStorage.getItem(`save_game_content_${i + 1}`))
                    $(this).text(`${lstore.storyname} - ${whichPreposition(lstore.finalboss).toUpperCase()} STORY`)
                    lstore.hasOwnProperty("page") ? $(this).attr("href", `#${lstore.page}`) : $(this).attr("href", `#page_0`)
                } else {
                    $(this).text("EMPTY SLOT")
                    $(this).attr("href", `#intro`)
                }

            })
            $(`a[id^="savegame_"]`).each(function (i) {
                $(this).text(`${localStorage.getItem(`save_game_content_${i + 1}`) != null ? `${JSON.parse(localStorage.getItem(`save_game_content_${i + 1}`)).storyname} - ${whichPreposition(JSON.parse(localStorage.getItem(`save_game_content_${i + 1}`)).finalboss).toUpperCase()} STORY` : `EMPTY SLOT`}`)
            });
        }


        $(window).on('load', function () {
            $(this).trigger('resize');
            getSaveNames()
        });

        $(document).on("keypress", 13, function () {
            if ($.mobile.activePage.is("#intro")) {
                createStory();
                $.mobile.navigate("#page_0");
            }
        })

        $(window).on("load", function () {
            // This ensures everything, including images and CSS, is fully loaded
            $("body").show();
          });

        $(document).on("pagecontainerbeforeshow", function (event, ui) {
            let toPage = ui.toPage[0].id;
            toPage == "intro" ? showForwardButton() : () => { }
        })

        function deletePages() {

            pages = document.querySelectorAll('[id^="page"]')

            $(pages).each(function () {
                $(`#${this.id}`).remove();
            })

        }

        function showForwardButton() {

            document.querySelectorAll('[id^="page"]').length > 0 ? $("#to_first_page").css("display", "block") : $("#to_first_page").css("display", "none")
        }

        function cleanStages(stages) {

            for (i = 0; i < stages.length; i++) {
                if (stages[i].instory >= 2) {
                    stages.splice(i, 1);
                    i = i - 1;
                }
            }

            return stages
        }