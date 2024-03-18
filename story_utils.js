function randFrom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function filterArray(array, key, filter, exclusion = false) {
    if (exclusion == false) {
        array = _.filter(array, function (o) { return o[key] == filter })
    } else array = _.filter(array, function (o) { return o[key] != filter });
    return array
}

function globalGladiators(enemies, stages) {

    let expansionfilter = $('.exp_selector').map((_, el) => $(el).hasClass("ui-icon-check") ? el.name : ``).get().filter(el => el != "")

    gladiators = getGladiators(expansionfilter, enemies, stages)
    let gladiatorselect = $('.glad_selector').map((_, el) => $(el).hasClass("ui-icon-check") && !$(el).hasClass("ui-disabled") ? el.name : ``).get().filter(el => el != "")
    selected_gladiators = gladiators.filter(g => gladiatorselect.includes(g.name))
    gladiators = gladiators.filter(g => !gladiatorselect.includes(g.name))
    let globalgladiators = []

    while (globalgladiators.length < $("#players").val()) {
        if(selected_gladiators.length > 0) {
            let random = Math.floor(Math.random() * selected_gladiators.length)
            let newgladiator = selected_gladiators[random]
            globalgladiators.push(newgladiator)
            selected_gladiators.splice(random, 1)
        } else {
            let random = Math.floor(Math.random() * gladiators.length)
            let newgladiator = gladiators[random]
            globalgladiators.push(newgladiator)
            gladiators.splice(random, 1)
        }
    }
    return globalgladiators;
}

function bossDescription(enemy) {
    let bossynonym = randFrom(["boss", "boss", "boss", "leader", "leader", "head", "chief", "kingpin"])
    let fame = randFrom(["notorious", "infamous", "ill-famed"])
    let these_minions = enemy.minions()
    let boss_part = `the ${randFrom([``, ``, `${fame}`])} ${randFrom([bossynonym, enemy.bosstitle()])}`

    let of_whom = [` of the ${enemy.name}`, ` of ${enemy.desc}`, ` of the ${these_minions}`]
    if (boss_part.includes(`${enemy.bosstitle()}`)) { of_whom.push(``) }
    of_whom = randFrom(of_whom)

    let description = [``, ``, `, ${enemy.expression()}`]
    if (of_whom.includes(enemy.desc)) {
        description.push(`, the ${enemy.name}`)
    } else if (of_whom.includes(these_minions)) {
        description.push(` of the ${enemy.name}`)
    }
    description = randFrom(description)

    return `${enemy.boss}, ${boss_part}${of_whom}${description}`
}

function createStory() {

    $(document).on('pageinit')

    let expansionfilter = $('.exp_selector').map((_, el) => $(el).hasClass("ui-icon-check") ? el.name : ``).get().filter(el => el != "")

    let enemies = getEnemies(expansionfilter);
    let stages = getStages(expansionfilter);

    enemiescopy = enemies.slice(0, enemies.length)

    let globalgladiators = globalGladiators(enemies, stages)

    let herostages = []
    let supportingcast = []
    let heronames = []
    let heroenemies = []
    let herodialogue = []

    $(globalgladiators).each(function () {
        herostages.push(this.stage)
        supportingcast = _.union(supportingcast, this.ally)
        supportingcast = _.union(supportingcast, this.rival)
        heronames.push(this.name)
        $(this.enemy).each(function () { heroenemies.push(this) })
        $(this.dialogue).each(function () { herodialogue.push(this) })
    })

    herostages = _.flatten(herostages)

    herostages = (_.uniq(herostages)).filter(function (el) { return el; });
    supportingcast = (_.uniq(supportingcast)).filter(function (el) { return el; });
    heroenemies = (_.uniq(heroenemies)).filter(function (el) { return el; });

    let alliesandrivals = [
        { name: "Ah Long", expansion: "riseofthekingdom", gender: "male", keywords: ["Boss", "Golden Dragons", "Organized Crime", "Martial Arts Master", "Chi", "Clone", "Ah Long"] },
        { name: "Ah Long of Brook City", expansion: "keystothekingdom", gender: "male", keywords: ["Boss", "Brook City", "Golden Dragons", "Organized Crime", "Past", "Clone", "Ah Long of Brook City"] },
        { name: "Anastasia", expansion: "redemption", gender: "female", keywords: ["Brotherhood", "Black Ops", "Gunslinger", "Soldier", "Clone"] },
        { name: "Brandon", expansion: "redemption2", gender: "male", keywords: ["Celebrity", "Fraud", "Martial Arts Master", "Global Gladiator", "Wanderer", "Clone", "Brandon", "Music"] },
        { name: "Chan Chan", expansion: "stretchgoals17", gender: "female", keywords: ["Beast", "Dark Matter", "Martial Arts Master", "Kingdom", "Insane", "Clone"] },
        { name: "Clinhyde Eight", expansion: "battlecon", gender: "male", keywords: ["Black Ops", "Indines", "Psychic", "Toxic", "Clone"] },
        { name: "Darius", expansion: "redemption", gender: "male", keywords: ["Past", "Kingdom", "Martial Arts Master", "Toxic", "Clone", "Kemono"] },
        { name: "Dmitri", expansion: "riseofthekingdom", gender: "male", keywords: ["Boss", "Black Ops", "Brotherhood", "Soldier", "Clone"] },
        { name: "Drago", expansion: "riseofthekingdom", gender: "male", keywords: ["Black Ops", "Brotherhood", "Competitor", "Street", "Clone", "Gabriel"] },
        { name: "Gabriel", expansion: "redemption2", gender: "male", keywords: ["Global Gladiator", "Martial Arts Master", "Street", "Wanderer", "Clone", "Gabriel"] },
        { name: "Genesis", expansion: "redemption2", gender: "female", keywords: ["Cifarelli", "Organized Crime", "Extraplanar", "Street", "Clone", "Music"] },
        { name: "Hanzo", expansion: "riseofthekingdom", gender: "male", keywords: ["Past", "Sensei", "Wanderer", "Blade", "Global Gladiator", "Kingdom", "Clone"] },
        { name: "Isabella", expansion: "riseofthekingdom", gender: "female", keywords: ["Celebrity", "Martial Arts Master", "Wanderer", "Clone", "Brandon", "Golden Dragons"] },
        { name: "Jackal", expansion: "riseofthekingdom", gender: "female", keywords: ["Dark Matter", "Insane", "Kingdom", "Psychic", "Science", "Clone", "Jackal"] },
        /*add keywords*/
        { name: "Jade", expansion: "aftershock", gender: "female", keywords: ["Clone"] },
        { name: "James Wong", expansion: "keystothekingdom", gender: "male", keywords: ["Black Ops", "Brook City", "James Wong", "Law Enforcement", "Kingdom", "Past", "Clone"] },
        { name: "Jin", expansion: "riseofthekingdom", gender: "male", keywords: ["Golden Dragons", "Organized Crime", "Blade", "Law Enforcement", "Clone", "Ying Hua"] },
        { name: "Juan", expansion: "riseofthekingdom", gender: "male", keywords: ["Cartel", "Organized Crime", "Gunslinger", "Street", "Clone", "Juan"] },
        { name: "Kemono", expansion: "riseofthekingdom", gender: "male", keywords: ["Beast", "Kingdom", "Competitor", "Chi", "Clone", "Kemono", "Tlazolteotl", "Horseman", "Aztec"] },
        { name: "Khadath Ahemusei", expansion: "battlecon", gender: "male", keywords: ["Indines", "Science", "Extraplanar", "Wanderer", "Clone"] },
        { name: "Leeta", expansion: ["twintiger","redemption"], gender: "female", keywords: ["Brook City", "Street", "Wanderer", "Past", "Clone","Onyx League"] },
        { name: "Lotus", expansion: "keystothekingdom", gender: "female", keywords: ["Brook City", "Golden Dragons", "Organized Crime", "Past", "Clone", "Ah Long of Brook City"] },
        { name: "Marionette Doll", expansion: "redemption2", gender: "female", keywords: ["Dark Matter", "Kingdom", "Martial Arts Master", "Psychic", "Clone", "Shin Yokai"] },
        { name: "Mary Ann", expansion: "twintiger", gender: "female", keywords: ["Street", "Clone", "Twin Tiger", "Onyx League", "Youth"] },
        { name: "Megan", expansion: "redemption2", gender: "female", keywords: ["Celebrity", "Chi", "Fraud", "Global Gladiator", "Martial Arts Master", "Wanderer", "Clone", "Megan", "Law Enforcement", "Mr. Apple"] },
        { name: "Mr. Apple", expansion: "stretchgoals17", gender: "male", keywords: ["Celebrity", "Fraud", "Sensei", "Music", "Clone", "Mr. Apple"] },
        { name: "Natalia", expansion: "redemption2", gender: "female", keywords: ["Black Ops", "Global Gladiator", "Martial Arts Master", "Soldier", "Wanderer", "Clone", "Natalia", "Project X", "Street"] },
        { name: "Power Soldier", expansion: "redemption2", gender: "male", keywords: ["Dark Matter", "Beast", "Black Ops", "Kingdom", "Martial Arts Master", "Clone"] },
        { name: "Project X", expansion: ["redemption","aftershock"], gender: "female", keywords: ["Dark Matter", "Beast", "Insane", "Martial Arts Master", "Youth", "Clone", "Jackal", "Project X"] },
        { name: "Sera O'Quinn", expansion: "riseofthekingdom", gender: "female", keywords: ["Boss", "Celebrity", "Insane", "Organized Crime", "Clone", "Megan", "Sera O'Quinn"] },
        { name: "Shadow", expansion: "riseofthekingdom", gender: "male", keywords: ["Boss", "Kingdom", "Martial Arts Master", "Chi", "Clone", "Shadow", "Horseman", "Sensei"] },
        { name: "Shin Yokai", expansion: "redemption", gender: "male", keywords: ["Boss", "Insane", "Extraplanar", "Chi", "Clone", "Shadow", "Shin Yokai", "Horseman"] },
        /*add keywords*/
        { name: "Stacey", expansion: "aftershock", gender: "female", keywords: ["Clone","Parasol","Science","Organized Crime"] },
        { name: "Star Knight Iri", expansion: "battlecon", gender: "female", keywords: ["Indines", "Extraplanar", "Blade", "Soldier", "Clone"] },
        /*add keywords*/
        { name: "The Proxy", expansion: "aftershock", gender: "male", keywords: ["Organized Crime","The Proxy","Parasol","Clone"] },
        { name: "Tiger Azules", expansion: "redemption", gender: "male", keywords: ["Aztec", "Street", "Cartel", "Martial Arts Master", "Clone", "Juan", "Wanderer"] },
        { name: "Tlazolteotl", expansion: "redemption2", gender: "female", keywords: ["Past", "Aztec", "Boss", "Extraplanar", "Clone", "Tlazolteotl"] },
        { name: "Wan Bo", expansion: "redemption", gender: "male", keywords: ["Golden Dragons", "Martial Arts Master", "Chi", "Monk", "Clone", "Ah Long"] },
        { name: "Ying Hua", expansion: "redemption2", gender: "female", keywords: ["Global Gladiator", "Law Enforcement", "Martial Arts Master", "Science", "Clone", "Ying Hua"] },
        { name: "Ying Hua of Brook City", expansion: "keystothekingdom", gender: "female", keywords: ["Brook City", "James Wong", "Law Enforcement", "Past", "Science", "Clone"] },
        { name: "Zane", expansion: "riseofthekingdom", gender: "male", keywords: ["Competitor", "Chi", "Youth", "Clone", "Natalia"] }
    ];

    alliesandrivals = alliesandrivals.filter(character => expansionfilter.some(xp => character.expansion.includes(xp)))

    for (i = alliesandrivals.length - 1; i > 0; i--) {
        if (supportingcast.includes(alliesandrivals[i].name)) {
            alliesandrivals.splice([i], 1)

        }
    }
    let allymotivation = getMotivation(alliesandrivals)

    let allygroup = []

    while (allygroup.length < $("#players").val()) {
        let random = Math.floor(Math.random() * alliesandrivals.length)
        let ally = alliesandrivals[random]
        if (ally.keywords.includes(allymotivation)) {
            allygroup.push(ally)
            alliesandrivals.splice(random, 1)
        }
    }

    let rivalmotivation = getMotivation(alliesandrivals)

    let rivalgroup = []
    while (rivalgroup.length < $("#players").val()) {
        let random = Math.floor(Math.random() * alliesandrivals.length)
        let rival = alliesandrivals[random]
        if (rival.keywords.includes(rivalmotivation)) {
            rivalgroup.push(rival)
            alliesandrivals.splice(random, 1)
        }
    }


    for (i = 0; i < stages.length; i++) {
        for (y = 0; y < herostages.length; y++) {
            if (herostages[y] === stages[i].name) {
                stages[i].instory = stages[i].instory + 1
            }
        }
    }

    stages = cleanStages(stages);

    let storystages = storyStages(stages);

    stages = storystages[1].splice(0)

    storystages = storystages[0].splice(0)

    /*             console.log(JSON.stringify(storystages, ["name"])) */

    let storyenemies = storyEnemies(storystages, enemies, heroenemies);

    enemies = storyenemies[1].splice(0)

    storyenemies = storyenemies[0].splice(0)

    let story = compileStory(storystages, storyenemies)


    $(story).each(function (i) {

        story[i].stage.knowledge = defineKnowledge(i, story)
    })

    let finalboss = story[Math.max($("#storylength").val() * 2 - 3, 0)].enemy

    let stageindex = 0;

    let storyname = String(storyNamer(finalboss, story[Math.max($("#storylength").val() * 2 - 3, 0)].stage))

    let referencetext = referenceText(globalgladiators, allygroup, allymotivation, rivalgroup, rivalmotivation, finalboss)

    let cardtexts = textMaker(story, alliesandrivals, heronames, enemies, herodialogue);

    let pagecontent = { reference: referencetext, text: cardtexts, storyname: storyname, finalboss: finalboss.name }

    createPageContent(pagecontent)


}

function defineAddressing(enemy) {

    let addressing = randFrom([enemy.addressing, "Global Gladiators", "Gladiators"])

    return addressing
}

function gPron(character, form) {
    let gPron

    switch (character.gender) {
        case "male":
            switch (form) {
                case "subject": gPron = "he";
                    break;
                case "object": gPron = "him";
                    break;
                case "possessive": gPron = "his";
                    break;
                case "reflexive": gPron = "himself";
                    break;
                case "sex": gPron = "man";
                    break;
                default: gPron = "UNDEFINED"
            }
            break;
        case "female":
            switch (form) {
                case "subject": gPron = "she";
                    break;
                case "object":
                case "possessive": gPron = "her";
                    break;
                case "reflexive": gPron = "herself";
                    break;
                case "sex": gPron = "woman";
                    break;
                default: gPron = "UNDEFINED";
            }
            break;
        default:
            gPron = "UNDEFINED"

    }
    return gPron

}

function ucInit(word) {
    let result = word.charAt(0).toUpperCase() + word.substring(1);
    return result
}

function lowerCaseInitial(word) {
    let result = word.charAt(0).toLowerCase() + word.substring(1);
    return result
}

function whichPreposition(word) {
    if (/[aeiou]/.test(word.toLowerCase().charAt(0))) {
        return "an " + word
    } else {
        return "a " + word
    }
}

function latestScheme(enemy) {
    let latestscheme = [
        `In Citadel's ongoing investigations, rumors have been uncovered that`,
        `In the wake of the Kingdom's latest scheme, the Citadel has learned a new threat on the rise: `,
        `Following the aftermath of the Kingdom's latest scheme,`,
        `The Citadel has learned the nefarious motives behind the latest criminal activities: `,
        `In a situation familiar to the Citadel and Global Gladiators, `,
        `In a street-level recon operation, Citadel has uncovered a job fit for Global Gladiators: `,
        `Thanks to Citadel's resourcefulness and your familiarity with the Kingdom's street-level activity, there's new intel that`,
        `You have received a note signed by the ${enemy.name} boss that instructs you not to interfere or you'll be in for the fight of your lives, as `,
        `Responding to a crisis, the Global Gladiators are called into action. You come into play as `,
        `The previous team of Gladiators has not been heard of. Communications disruption can mean only one thing: `,
        `Thought defeated for good, your old nemesis has returned with vengenace: `,
        `For months, the citizens of Ransom City have struggled against the relentless criminal forces. Further resistance seems impossible, as `,
        `Ransom City had been breeding ground for crime and corruption long before the shadow of ${enemy.name == "Kingdom" ? "the Master" : "the Kingdom"} fell over, thanks to a large portion of the presence of the ${enemy.name}. Now `,
        `Your team is on a routine recon mission abroad, when Agent Fletch pulls you out with a new task: `,
        `Agent Fletch informs you that your previous team has been taken out by unknown mercenaries. He suspects there is a connection to a recent development: `,
        `Another team of Global Gladiator were on a sting operation against ${enemy.boss}. ${ucInit(gPron(enemy, "subject"))} managed to escape, and now `,
        `A self-destructing ${getGizmo()} was delivered to you with a mission briefing: `,
        `Your personal pursuits are once again disrupted by a new orders from Citadel. You are to intervene, as `,
        `You have retreated to a monastery but after months of solitude, Agent Fletch has reached out for you once again:`,
        `You have been set to take ${enemy.boss} down and place ${gPron(enemy, "object")} on trial for ${gPron(enemy, "possessive")} crimes: `,
        `Amidst the chaos of the night, a coded message finds its way to your hands, hinting at a looming threat: `,
        `As dawn breaks over Ransom City, a suspicious silence pervades the streets, signaling that `,
        `A trusted informant whispers of a plot that could unravel the very fabric of the Citadel, revealing that `,
        `A sudden surge in encrypted communications across the city's underworld has the Citadel on high alert, as it suggests that `,
        `The discovery of an abandoned hideout yields clues to a plan more sinister than any before, indicating that `,
        `During a covert surveillance mission, an unexpected encounter provides a lead on a new menace: `,
        `A series of unexplained disruptions in the city's power grid points to a coordinated effort by the enemy, as `,
        `A mysterious package left at Citadel's doorstep contains evidence of a conspiracy brewing in the shadows, showing that `,
        `An intercepted transmission reveals a call to arms among the ranks of ${enemy.name}, signaling `,
        `Citadel's analysts decode a hidden message within the enemy's communications, uncovering that `,
        `A break-in at a top-secret research facility raises alarms within the Citadel, pointing towards that `,
        `The sudden disappearance of key witnesses in a major case against ${enemy.name} suggests that `,
        `An eerie calm has fallen over Ransom City, but intelligence suggests this is the quiet before the storm, as `,
        `Recent sightings of ${enemy.boss} in unexpected locations hint at a broader scheme at play, potentially revealing that `,
        `A sequence of targeted attacks on Citadel's outposts across the city unveils a pattern, leading to the assumption that `,
        `A cryptic warning received via an anonymous channel alludes to imminent danger, cautioning that `,
        `In the heart of Ransom City's most troubled district, graffiti symbols linked to ${enemy.name} emerge overnight, forewarning that `,
        `Agent Fletch has intercepted a shipment meant for ${enemy.boss}, inside which lies a clue to the fact that `,
        `The underground networks are abuzz with rumors of a significant power shift within ${enemy.name}, suggesting that `,
        `You've uncovered evidence of a secret alliance between ${enemy.name} and an unknown faction, indicating that `

    ];
    latestscheme = randFrom(latestscheme);
    return latestscheme
}

function preGamePrologue(stage, enemy) {

    //more masterplans: complete desctruction; activate superweapon?

    let latestscheme = latestScheme(enemy)

    let masterplan

    let vip = randFrom([["President", "White House"], ["Colonel", "Pentagon"], ["Mayor", "City Hall"], ["Police Chief", "Ransom P.D. Headquarters"], ["Citadel Commander", "Citadel HQ"],["Foreign Ambassador","Foreign Embassy"],["Head of LoN","League of Nations"]])

    switch (stage.masterplan) {
        case "actsofterror": masterplan = `the vicious criminal syndicate ${enemy.name} believes they do not have to bow to the government or even the
police force of Ransom City. ${enemy.boss} is going to let everyone know that Ransom has become a center of violence and crime where no-one is safe. `
            break;
        case "illegalgains": masterplan = `the ${possessiveSuffix(enemy.name)} vast network of crime and
${(enemy.desc).replace("the", "")} require substantial financial pipelines, and ${enemy.boss} is organizing a big score to fund
${gPron(enemy, "possessive")} operations. `
            break;
        case "kidnapping": masterplan = randFrom(
            [`the ${vip[1]} is not the exception to the rampant crimes related to the Kingdom these days. The ${vip[0]} has been kidnapped by the ${enemy.minions()} of ${enemy.boss}. Are you a bad enough dude to rescue the ${vip[0]}? `,
            `${enemy.boss} is holding Ransom City captive and the ${vip[0]} hostage. With ${gPron(enemy, "possessive")} gang of ${enemy.minions()}, nobody but you can stop ${gPron(enemy, "object")} now. `,
            `${enemy.boss} has captured the ${vip[0]}, and via a live two-way radio broadcast, demands the ${vip[1]} to secure a one hundred billion dollar ransom in three days. `])
            break;
        case "strengtheningforces": masterplan = `the ${enemy.bosstitle()} ${enemy.boss} has been covertly making efforts to
    strengthen the forces of the ${enemy.name}. Their plans must be thwarted before their forces become unstoppable. `
            break;
        case "personalpower": masterplan = `the ${enemy.bosstitle()} ${enemy.boss} has moved across the region with ${gPron(enemy, "possessive")}
${enemy.minions()} in search for power. If ${gPron(enemy, "possessive")} power levels will near five figures, ${gPron(enemy, "subject")}
just might become invincible. `
    }


    masterplan = { storytext: latestscheme + " " + masterplan, vip: vip }

    return masterplan
}

function mysticalSynonym() {


    let mystical = ["esoteric", "magical", "arcane", "ethereal", "mystical", "cabalistic", "mysterious", "occult", "obscure", "cryptic", "fabulous secret", "strange"];
    mystical = mystical[Math.floor(Math.random() * mystical.length)];

    return mystical;

}

function getMotivation(alliesandrivals) {

    let supportmotivate = []
    $(alliesandrivals).each(function () {
        supportmotivate = supportmotivate.concat(this.keywords)
    })

    let motivations = supportmotivate.reduce((r, k) => { r[k] = 1 + r[k] || 1; return r }, {})

    motivations = _.pickBy(motivations, function (o) {
        return o >= $("#players").val();
    })

    return (randFrom(Object.keys(motivations)))

}

function storyNamer(finalboss, finalstage, number = 16) {

    let bossadjectives
    let bossnouns
    let stageadjectives
    let stagenouns
    let adjectives = ["Avenging", "Deadly", "Final", "Mortal", "Double", "Twin", "Fighting", "Bad", "Mysterious", "Lost", "Unleashed", "New", "Eternal", "Forever", "Ultimate", "Evil", "Rumble"];
    let nouns = [["Revenge", "Revenge"], ["Fate", "Fates"], ["Destiny", "Destiny"], ["Redemption", "Redemption"], ["Aftershock", "Aftershock"], ["Warrior", "Warriors"], ["Combat", "Kombat"], ["Challenger", "Challengers"], ["Fighter", "Fighters"], ["Force", "Forces"], ["Thug", "Thugs"], ["Rage", "Rage"], ["City", "City"], ["Ransom", "Ransom"], ["Legend", "Legends"], ["Fight", "Fights"], ["Kingdom", "Kingdoms"], ["Street", "Streets"], ["Master", "Masters"], ["Rise", "Rise"], ["Strike", "Strikes"], ["Tide", "Tides"]];

    switch (finalboss.boss) {
        case "Ah Long":
            bossadjectives = ["Heavenly", "Phasing", "Golden", "Black", "Merciless", "Invincible", "Shadowy"]
            bossnouns = [["Dragon", "Dragons"], ["Businessman", "Businessmen"], ["Hook", "Hooks"], ["Karate", "Karate"], ["Kendo", "Kendo"], ["Jing Wu", "Jing Wu"], ["Punch", "Punches"], ["Triad", "Triads"], ["Yakuza", "Yakuza"], ["Monk", "Monks"], ["Typhoon", "Typhoons"], ["Kick", "Kicks"], ["Shadowson", "Shadowsons"], ["Clutch", "Clutces"], ["Katana", "Katana"], ["Staff", "Staves"], ["Knuckle-Duster", "Knuckle-Dusters"]]
            break;
        case "Dmitri":
            bossadjectives = ["Punishing", "Modified", "Trusty", "Steely", "Loaded", "Extra", "Russian", "Eastern", "Military", "Angry", "Strong", "Skilled", "Loyal", "Espionage", "Undercover"]
            bossnouns = [["Knife", "Knives"], ["Brotherhood", "Brotherhood"], ["Knife", "Knives"], ["Rocket", "Rockets"], ["Rocket Launcher", "Rocket Launchers"], ["Kevlar", "Kevlar"], ["Defense", "Defenses"], ["Hold", "Holds"], ["Ammo", "Ammo"], ["Mercenary", "Mercenaries"], ["Soldier", "Soldiers"], ["Spy", "Spies"], ["Honor", "Honor"], ["Hit", "Hits"], ["Sabotage", "Sabotage"], ["General", "Generals"]]
            break;
        case "Jackal":
            bossadjectives = ["Broken", "Neural", "Darker", "Wild", "Mad", "Insane", "Genius", "Grapsing", "Growing", "Forced", "Leaching", "Possession", "Torturous", "Unbelievable", "Scientific", "Experimental", "Psychic", "Biological", "Tightened"]
            bossnouns = [["Kingdom", "Kingdom"], ["Scientist", "Scientists"], ["Jackal", "Jackals"], ["Directive", "Directives"], ["Dread", "Dread"], ["Experiment", "Experiments"], ["Influence", "Influences"], ["Kick", "Kicks"], ["Dark Matter", "Dark Matter"], ["Sister", "Sisters"], ["Flesh", "Flesh"], ["Lances", "Lances"], ["Invasion", "Invasion"], ["Mind", "Minds"], ["Mold", "Molds"], ["Ninja", "Ninja"], ["Clone", "Clones"], ["General", "Generals"], ["Mountain", "Mountains"], ["Marionette", "Marionettes"], ["Soldier", "Soldiers"], ["Spike", "Spikes"], ["Doll", "Dolls"], ["Presence", "Presences"], ["Rein", "Reins"]]
            break;
        case "Juan":
            bossadjectives = ["Unloading", "Getaway", "Covering", "Alert", "Hard", "Honorable", "Hot", "Ruthless", "Avenging", "One", "Loyal", "Devoted", "Reloading", "Tough"]
            bossnouns = [["Business", "Businesses"], ["Con Artist", "Con Artists"], ["Getaway", "Getaway"], ["Revenge", "Revenge"], ["Cartel", "Cartel"], ["Flintlock", "Flintlocks"], ["Code", "Code"], ["Orphan", "Orphans"], ["Outcast", "Outcasts"], ["Gun", "Guns"], ["Gangster", "Gangsters"], ["Extortion", "Extortion"], ["Honor", "Honor"], ["Lead", "Lead"], ["Protection", "Protection"], ["Carbine", "Carbines"], ["Human Shield", "Human Shields"], ["Double Barrels", "Double Barrels"], ["Family", "Families"], ["Drug", "Drugs"], ["Gang", "Gangs"], ["Bat", "Bats"], ["Dealer", "Dealers"], ["Ganger", "Gangers"], ["Shell", "Shells"], ["Kickback", "Kickback"], ["Shot", "Shots"], ["Scattershot", "Scattershot"]]
            break;
        case "Kemono":
            bossadjectives = ["Apocalypse", "Imposing", "Green", "Enraged", "Hulking", "Loyal", "Uncontrollable", "Crackling", "Static", "Quadruple", "Electrical", "Savage", "Mountain"]
            bossnouns = [["Hulk", "Hulk"], ["Kingdom", "Kingdom"], ["Mutant", "Mutants"], ["Horseman", "Horsemen"], ["Beast", "Beasts"], ["Surge", "Surges"], ["Lash", "Lashes"], ["Grab", "Grabs"], ["Arms", "Arms"], ["Prowess", "Prowess"], ["Current", "Currents"], ["Brute", "Brutes"], ["Ninja", "Ninja"], ["Clone", "Clones"], ["General", "Generals"], ["Mountain", "Mountains"], ["Marionette", "Marionettes"], ["Soldier", "Soldiers"], ["Doll", "Dolls"]]
            break;
        case "Mack":
            bossadjectives = ["Hot", "Suppressing", "Black-Hearted", "Aimed", "Ruthless", "Reckless", "Whipped", "Anarchic"]
            bossnouns = [["Trigger", "Triggers"], ["Lead", "Lead"], ["Fire", "Fire"], ["Crosshair", "Crosshairs"], ["Salt", "Salt"], ["Pepper", "Pepper"], ["Blackheart", "Blackheart"], ["Mercy", "Mercy"], ["Overlord", "Overlords"], ["Protection", "Protection"], ["Gang", "Gangs"], ["Machine Gun", "Machine Guns"], ["Bullet", "Bullets"]]
            break;
        case "Project X":
            bossadjectives = ["Amalgam", "Toxic", "Toughened", "Horrifying", "Creeping", "Biological", "Terrifying"]
            bossnouns = [["Tendril", "Tendrils"], ["Emission", "Emissions"], ["Growth", "Growths"], ["Flesh", "Flesh"], ["Mind", "Minds"], ["Link", "Links"], ["Bloodbath", "Bloodbath"], ["Dark Matter", "Dark Matter"], ["Blade", "Blades"], ["Electroshock", "Electroshocks"], ["Nurse", "Nurses"]]
            break;
        case "The Proxy":
            bossadjectives = ["Hostile", "Trading", "Pharmaseutical", "Unscheluded","Researching","Ruthless","Clean","Sweeping"]
            bossnouns = [["Takeover","Takeovers"],["Insider","Insiders"],["Trade","Trades"],["Vandal","Vandal"],["Research","Research"],["Meeting","Meetings"],["Plan","Plans"],["Reorganization","Reorganization"], ["Shareholder","Shareholders"],["Interest","Interests"],["Executive","Executives"],["Lab","Labs"],["Serum","Serums"], ["Proxy","Proxies"]]
            break;
        case "Shadow":
            bossadjectives = ["Hexed", "Prescient", "Mysterious", "Ancient", "Divine", "Explosive", "Hidden"]
            bossnouns = [["Kingdom", "Kingdom"], ["Blade", "Blades"], ["Jing Wu", "Jing Wu"], ["Dragon", "Dragons"], ["Illusion", "Illusions"], ["Sword", "Swords"], ["Shadow", "Shadows"], ["Spirit", "Spirits"], ["Clone", "Clones"], ["General", "Generals"], ["Mountain", "Mountains"], ["Marionette", "Marionettes"], ["Soldier", "Soldiers"], ["Doll", "Dolls"]]
            break;
        case "Tlazolteotl":
            bossadjectives = ["Faithful", "Aztec", "Summoned", "Otherworldly", "Death", "Pale", "Avenging", "Foul", "Decaying", "Enfeebling", "Ageless", "Beautiful", "Restless", "Pestilent", "Below"]
            bossnouns = [["Time", "Time"], ["Undead", "Undead"], ["Faithful", "Faithful"], ["Sorcery", "Sorceries"], ["Portal", "Portals"], ["Pestilence", "Pestilence"], ["Dead", "Dead"], ["Nahualli", "Nahualli"], ["Faithful", "Faithful"], ["Necromancer", "Necromancers"], ["Zombie", "Zombies"], ["Caller", "Callers"], ["Essence", "Essences"], ["Prophecy", "Prophecies"], ["Blast", "Blasts"], ["Flesh", "Flesh"], ["Hex", "Hexes"], ["Burden", "Burdens"]]
            break;
        case "Train":
            bossadjectives = ["Inhuman", "Heightened"]
            bossnouns = [["Billionaire", "Billionaires"], ["Body", "Bodies"], ["CEO", "CEO"], ["Reflex", "Reflexes"], ["Shaolin", "Shaolin"], ["Steel", "Steel"], ["Triad", "Triads"]]
            break;
            break;
        case "Yokai":
            bossadjectives = ["Cursed", "Deceptive", "Eldritch", "Raging", "Unleashed", "Dynasty", "Enraged", "Nine-Tailed", `Hungry`]
            bossnouns = [["47", "47"], ["Hellfire", "Hellfire"], ["Sorrow", "Sorrows"], ["Monster", "Monsters"], ["Oni", "Oni"], ["Demon", "Demons"], ["Yurei", "Yurei"], ["Ninja", "Ninja"], ["Shadow", "Shadows"], ["Strike", "Strikes"], ["Swarm", "Swarms"], ["Fox", "Foxes"], ["Rage", "Rage"], ["Aura", "Auras"], ["Oblivion", "Oblivion"], ["Shackle", "Shackles"], ["Fear", "Fear"], ["Devil", "Devil"], [`Spirit`, `Spirits`]]
            break;
        default:
            bossadjectives = adjectives
            bossnouns = nouns
    }

    switch (finalstage.name) {
        case "Ashes of the Eternal":
            stageadjectives = ["Unholy", "Unclean", "Rising", "Blazing", "Burnt"]
            stagenouns = [["Eternal", "Eternals"], ["Ash", "Ashes"], ["Inferno", "Inferno"], ["Urn", "Urns"], ["Demon", "Demons"], ["Apparition", "Apparitions"], ["Path", "Paths"], ["Flame", "Flames"], ["Fire", "Fires"]]
            break;
        case "Cashed Out":
            stageadjectives = ["Winning", "Cashed Out", "Loose", "Gambling", "Risky", "Loaded", "Opulent"]
            stagenouns = [["Casino", "Casinoes"], ["Blackjack", "Blackjack"], ["Bet", "Bets"], ["Card", "Cards"], ["Cash", "Cash"], ["Chip", "Chips"], ["Damage", "Damages"], ["Dealer", "Dealers"], ["Die", "Dice"], ["Gambler", "Gamblers"], ["Hand", "Hand"], ["House", "House"], ["Money", "Money"], ["Odds", "Odds"], ["Poker", "Poker"]]
            break;
        case "Compromised":
            stageadjectives = ["Compromised", "Armed", "Heroic", "Rising", "Misguided", "Calming", "Scared", "Panicking"]
            stagenouns = [["Downtown", "Downtown"], ["Panic", "Panic"], ["Hostage", "Hostages"], ["Intruder", "Intruders"], ["Bribe", "Bribes"], ["Offices", "Offices"], ["Threat", "Threats"], ["Fear", "Fear"], ["Heroic", "Heroics"], ["Word", "Words"], ["Staff", "Staff"], ["Security System", "Security Systems"]]
            break;
        case "Gone Ballistic":
            stageadjectives = ["Concealed", "Proximity", "Stray", "Illegal", "Explosive", "Stolen", "Ballistic", "Bulletproof"]
            stagenouns = [["Dealer", "Dealers"], ["Grenade", "Grenades"], ["Gun", "Guns"], ["Mine", "Mines"], ["Rocket", "Rockets"], ["Sidearm", "Sidearms"], ["Supply", "Supplies"], ["Trigger", "Triggers"], ["Truck", "Trucks"], ["Vest", "Vests"], ["Weapon", "Weapons"]]
            break;
        case "One Step Ahead":
            stageadjectives = ["High", "Atop", "Underground", "Steep", "Windy", "Strong", "Climbing"]
            stagenouns = [["Peak", "Peaks"], ["Cave", "Caves"], ["Mountain", "Mountains"], ["Step", "Steps"], ["Cliff", "Cliffs"], ["Grappling Hook", "Grappling Hooks"], ["Wind", "Winds"], ["Avalanche", "Avalance"], ["Vertigo", "Vertigo"]]
            break;
        case "Original Copy":
            stageadjectives = ["Duplicated", "Mutated", "Accelerated", "Deadly", "Regenerative", "Experimental", "Growing", "Original", "Dynasty"]
            stagenouns = [["Lab", "Labs"], ["Cell", "Cells"], ["Clone", "Clones"], ["Computer", "Computers"], ["Copy", "Copies"], ["Duplicate", "Duplicates"], ["Mutation", "Mutations"], ["Protocol", "Protocols"], ["Serum", "Serums"], ["Subject", "Subjects"], ["Test", "Tests"], ["Vandal", "Vandal"], ["Vat", "Vats"]]
            break;
        case "Out of Time":
            stageadjectives = ["Afflicted", "Putrid", "Fallen", "Profane", "Dead", "Dimensional", "Hellish", "Extradimensional"]
            stagenouns = [["Pit", "Pits"], ["World", "Worlds"], ["Spike", "Spikes"], ["Time", "Time"], ["Zombie", "Zombies"], ["Remnant", "Remnants"], ["Altar", "Altars"], ["Refuge", "Refuges"], ["Below", "Below"], ["Offering", "Offerings"], ["Undead", "Undead"]]
            break;
        case "Poison the Well":
            stageadjectives = ["Poisoned", "Infected", "Addicted", "Filthy", "Stinking", "Smelly", "Insane", "Subterranean", "Underground"]
            stagenouns = [["Experiment", "Experiment"], ["Poison", "Poison"], ["Well", "Wells"], ["Sewer", "Sewers"], ["Vandal", "Vandal"], ["Vat", "Vats"], ["Addict", "Addicts"], ["Thrall", "Thralls"], ["City", "City"], ["Rat", "Rats"], ["Pursuit", "Pursuit"]]
            break;
        case "Right to Remain Silent":
            stageadjectives = ["Blindfolded", "Escaped", "Silent", "Recovered", "Armed", "Sneaking", "Captured", "Interrogated"]
            stagenouns = [["Right", "Rights"], ["Captive", "Captives"], ["Intel", "Intel"], ["Prisoner", "Prisoners"], ["Guard", "Guards"], ["Tripwire", "Tripwires"], ["Interrogation", "Interrogation"]]
            break;
        case "Rude Awakening":
            stageadjectives = ["Rude", "Afflicted", "Decayed", "Rotting", "Summoned", "Risen", "Awakened", "Rotten", "Dark", "Black"]
            stagenouns = [["Undead", "Undead"], ["Awakening", "Awakening"], ["Remnant", "Remnants"], ["Dead", "Dead"], ["Undead", "Undead"], ["Zombie", "Zombies"], ["Rot", "Rots"], ["Decay", "Decay"], ["Necromancer", "Necromancers"], ["Realm", "Realms"], ["Below", "Below"]]
            break;
        case "Running Wild":
            stageadjectives = ["Unturned", "Blessed", "Wild", "Lost", "Hidden", "Buried", "Final"]
            stagenouns = [["Shrine", "Shrines"], ["Search", "Search"], ["Demon", "Demons"], ["Wild", "Wilds"], ["Key", "Keys"], ["Hunt", "Hunt"], ["Idol", "Idols"], ["Blessing", "Blessings"], ["Beyond", "Beyond"], ["Oni", "Oni"], ["Curse", "Curses"], ["Tree", "Trees"], ["Trail", "Trail"], ["Call", "Call"]]
            break;
        case "Steel Memories":
            stageadjectives = ["New", "Steel", "Fresh", "True", "Demoralizing", "Upcoming", "Encircling", "Dark", "Brutal", "Overwhelming"]
            stagenouns = [["Newcomer", "Newcomers"], ["Melee", "Melee"], ["Memory", "Memories"], ["Recruit", "Recruits"], ["Crowbar", "Crowbars"], ["Underdog", "Underdogs"], ["Edge", "Edges"], ["Defeat", "Defeat"], ["Finisher", "Finisher"], ["Challenger", "Challengers"], ["Contest", "Contests"], ["Challenge", "Challenges"]]
            break;
        case "Sudden Death":
            stageadjectives = ["Boasting", "Sudden", "Culling", "Personal", "Mutual", "New", "Overconfident", "Urban", "Deadly", "Ruthless", "Underground", "Brutal"]
            stagenouns = [["Death", "Death"], ["Vendetta", "Vendetta"], ["Assistance", "Assistance"], ["Cause", "Causes"], ["Challenger", "Challengers"], ["Competition", "Competition"], ["Tournament", "Tournament"], ["Contest", "Contests"]]
            break;
        case "Supply & Demand":
            stageadjectives = ["Distribution", "Pinned", "Rising", "Hooked", "Addicted", "Dealing", "Pushing"]
            stagenouns = [["Supply", "Supplies"], ["Demand", "Demand"], ["Crossfire", "Crossfire"], [`Island`, `Islands`], ["Drug", "Drugs"], ["Smuggler", "Smugglers"], ["Network", "Networks"], ["Kingpin", "Kingpin"], ["Drive-By", "Drive-By"], ["Contraband", "Contraband"], ["Island", "Islands"], ["Camp", "Camps"], ["Junkyard", "Junkyard"]]
            break;
        case "The Ceremony":
            stageadjectives = ["Eldritch", "Whispered", "Unholy", "Unclean", "Ceremonial", "Cursed", "Lured", "Promised"]
            stagenouns = [["Ceremony", "Ceremony"], ["Alignment", "Alignment"], ["Vessel", "Vessels"], ["Embrace", "Embrace"], ["Lure", "Lures"], ["Promise", "Promises"], ["Conduit", "Conduits"], ["Oni", "Oni"], ["Demon", "Demons"], ["Servant", "Servants"]]
            break;
        case "Under Destruction":
            stageadjectives = ["Risky", "Collateral", "Timed", "Remote", "Armed", "Explosive", "Demolished"]
            stagenouns = [["Explosion", "Explosions"], ["Destruction", "Destruction"], ["Conveyor", "Conveyor"], ["Demolition", "Demolitions"], ["Buzzsaw", "Buzzsaws"], ["Bomb", "Bombs"], ["Construction", "Construction"], ["Trigger", "Triggers"]]
            break;
        default:
            stageadjectives = adjectives
            stagenouns = nouns
    }

    adjectives = _.union(adjectives, bossadjectives, stageadjectives)
    nouns = _.union(nouns, bossnouns, stagenouns)

    let plural = randFrom([0, 1])

    let storyname = ""
    switch (Math.floor((Math.random() * number) + 1)) {
        case 1: storyname = randFrom(adjectives) + " " + randFrom(nouns)[plural];
            break;
        case 2: storyname = randFrom(adjectives) + " " + randFrom(nouns)[0] + " " + randFrom(nouns)[plural]
            break;
        case 3: storyname = randFrom(adjectives) + " " + randFrom(adjectives) + " " + randFrom(nouns)[plural]
            break;
        case 4: storyname = randFrom(adjectives) + " " + randFrom(nouns)[plural] + ", " + randFrom(adjectives) + " " + randFrom(nouns)[plural]
            break;
        case 5: storyname = randFrom(nouns)[plural] + " of the " + randFrom(adjectives)
            break;
        case 6: storyname = randFrom(nouns)[0] + " " + randFrom(nouns)[plural]
            break;
        case 7: storyname = randFrom(nouns)[0] + " " + randFrom(nouns)[0]
            break;
        case 8: storyname = randFrom(nouns)[plural] + " of" + (plural == 0 ? " the " : " ") + randFrom(nouns)[(plural == 0 ? 0 : 1)]
            break;
        case 9: storyname = randFrom(nouns)[0] + " of the " + randFrom(nouns)[0] + " " + randFrom(nouns)[0]
            break;
        case 10: storyname = randFrom(nouns)[0] + " " + randFrom(nouns)[0] + " " + randFrom(nouns)[plural]
            break;
        case 11: storyname = (plural == 0 ? " The " : " ") + randFrom(nouns)[plural] + " and " + (plural == 0 ? " the " : " ") + randFrom(nouns)[plural]
            break;
        case 12: storyname = randFrom(nouns)[0] + ": " + storyNamer(finalboss, finalstage, 15)
            break;
        case 13: storyname = randFrom(nouns)[0] + " for " + (plural == 0 ? " the " : "") + randFrom(nouns)[plural]
            break;
        case 14: storyname = "From the " + randFrom(adjectives) + " " + randFrom(nouns)[0]
            break;
        case 15: storyname = randFrom([`Another ${randFrom(nouns)[0]}`, `For ${randFrom(nouns)[plural]}`, `Enter the ${randFrom(nouns)[plural]}`, `The ${randFrom([randFrom(adjectives), randFrom(nouns)[plural]])}`])
            break;
        case 16: storyname = storyNamer(finalboss, finalstage, 15) + randFrom([": the Return", " - Part Two", " - Part One", ": the Final Chapter"])
            break;
        default: storyname = "New Rise of the Kingdom"
    }

    storyname.length > 42 ? storyNamer(finalboss, finalstage, 15) : ``

    return storyname.toUpperCase();

}

function compileStory(stages, enemies) {


    let story = []

    let chapters = ["1", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"];

    var chapter
    for (i = 0; i < Math.ceil($("#storylength").val() * 2) - 1; i++) {
        chapter = { chapter: chapters[i], stage: _.cloneDeep(stages[i]), enemy: enemies[i] }
        story.push(chapter)
    }

    return story

}

function storyStages(stages) {


    let storystages = []

    let randomstage = Math.floor(Math.random() * stages.length);

    let finalstage = stages[randomstage];
    stages.splice(randomstage, 1);

    if ($("#storylength").val() > 1) {

        randomstage = Math.floor(Math.random() * stages.length);

        storystages.push(stages[randomstage]);
        stages[randomstage].instory = stages[randomstage].instory + 1
        stages = cleanStages(stages);

        if ($("#storylength").val() > 2) {
            let i = 0
            do {
                (Math.random() <= 0.75 ?
                    (randomstage = Math.floor(Math.random() * stages.length),
                        storystages.push(stages[randomstage]),
                        stages[randomstage].instory = stages[randomstage].instory + 1,
                        (stages[randomstage].instory < 2 ?
                            (storystages.push(stages[randomstage]),
                                stages[randomstage].instory = stages[randomstage].instory + 1,
                                stages = cleanStages(stages)) :
                            (stages = cleanStages(stages),
                                randomstage = Math.floor(Math.random() * stages.length),
                                storystages.push(stages[randomstage]),
                                stages[randomstage].instory = stages[randomstage].instory + 1,
                                stages = cleanStages(stages))
                        )
                    ) :
                    (randomstage = Math.floor(Math.random() * stages.length),
                        storystages.push(stages[randomstage]),
                        stages[randomstage].instory = stages[randomstage].instory + 1,
                        stages = cleanStages(stages),
                        randomstage = Math.floor(Math.random() * stages.length),
                        storystages.push(stages[randomstage]),
                        stages[randomstage].instory = stages[randomstage].instory + 1,
                        stages = cleanStages(stages))
                )
                i = i + 1
            } while (i < $("#storylength").val() - 2);
        }


        (Math.random() < 0.75 ?

            (storystages.push(finalstage),
                storystages.push(finalstage)) :
            (storystages.push(finalstage),
                storystages.push(stages[Math.floor(Math.random() * stages.length)])))


    } else { storystages.push(finalstage) }
    //console.log(JSON.stringify(storystages))
    if(true===false) {
    let fillstage = stages.filter(stage => stage.name == "Supply & Demand")[0]
    storystages[7] = fillstage
    storystages[8] = fillstage
    }
    return [storystages, stages]

}

function getMasterPlan() {

    final_texts = ["final", "ultimate", "diabolical", "culminating", "terminal", "paramount", "consummate", "paramount", "utmost", "fiendish"]
    plan_texts = ["plan", "master plan", "scheme", "endgame", "design"]
    return `${randFrom(final_texts)} ${randFrom(plan_texts)}`

}

function loungeMusic() {

    let music = randFrom(["Don't Stop Believing", "Faithfully", "Don't Stop Me Now", "Open Arms", "Wheel in the Sky", "Separate Ways", "Livin' on a Prayer", "Any Way You Want It", "We Are the Champions", "Chariots of Fire", "We Will Rock You", "Hero", "Walking on Sunshine", "Always Look on the Bright Side of Life",
        "Eye of the Tiger", "The Final Countdown", "Burning Heart", "Every Breath You Take", "Another One Bites the Dust", "Never Gonna Give You Up", "Gonna Fly Now", "One Moment In Time"])

    return music
}

function storyEnemies(storystages, enemies, heroenemies) {

    heroenemies = heroenemies.map(enemy => enemy.boss);

    let storyenemies = [], randomenemy;

    function pickAndSlice() {
        if (storyenemies.length <= 3) {
            randomenemy = randFrom(enemies)
            do { randomenemy = randFrom(enemies) } while (heroenemies.includes(randomenemy.boss)) } else {
                randomenemy = randFrom(enemies)
                }
        enemies = filterArray(enemies, "boss", randomenemy.boss, true)
    }

    pickAndSlice()

    let finalboss = randomenemy

    if ($("#storylength").val() > 1) {

        let r = randFrom([1, 2])
        switch (r) {
            case 1: storyenemies.push(randomenemy);
                break;
            case 2: pickAndSlice(), storyenemies.push(randomenemy);
        }

        for (i = 0; storyenemies.length < Math.ceil($("#storylength").val() / 2) * 2 + 1; i++) {

            let random = randFrom([1, 2, 3])
            switch (random) {
                case 1: pickAndSlice(), storyenemies.push(randomenemy), storyenemies.push(randomenemy);
                    break;
                case 2: pickAndSlice(), storyenemies.push(randomenemy), storyenemies.push(randomenemy);
                    break;
                case 3: pickAndSlice(), storyenemies.push(randomenemy), pickAndSlice(), storyenemies.push(randomenemy)
            }
        }

    }


    storyenemies.push(finalboss);

    if ($("#storylength").val() > 1) {

        if (storystages[storystages.length - 2].name == storystages[storystages.length - 1].name) {
            storyenemies.push(finalboss);
        } else {
            pickAndSlice(), storyenemies.push(randomenemy)
        }

    }

    return [storyenemies, enemies]

}

function evilPlace() {

    let evilterm = ["ancient", "cursed", "damned", "eldritch", "evil", "unholy", "unclean", "vile"]
    let place = ["burial ground", "altar", "sanctum", "shrine", "temple"]

    let evilplace = //evilterm.splice(Math.floor(Math.random()*evilterm.length), 1) + " and " +
        evilterm.splice(Math.floor(Math.random() * evilterm.length), 1) + " " +
        place.splice(Math.floor(Math.random() * place.length), 1)

    return evilplace
}

const possessiveSuffix = (name) => `${name}'${name.endsWith('s') ? '' : 's'}`;

function allyNamer(alliesandrivals, enemy, heronames, finalboss) {

    let ally = _.cloneDeep(randFrom(alliesandrivals))

    while (ally.name === enemy.boss && heronames.includes(ally.name)) {
        ally = randFrom(alliesandrivals)
    }

    alliesandrivals = _.filter(alliesandrivals, !{ name: ally.name })

    if (ally.name === enemy.boss || heronames.includes(ally.name) || finalboss.name == ally.name) { ally.name = "Mirror " + ally.name }
    /*             if (ally.name === enemy.boss) { ally.name = "Mirror " + ally.name } */
    /*             else if (heronames.includes(ally.name)) { ally.name = "Shadow " + ally.name } */

    return ally
}

function defineKnowledge(i, story) {
    let knowledge


    switch (i) {
        case 0: knowledge = story[i].stage.hasOwnProperty(`captured`) ? randFrom(["coldtrail", "clueless", "captured"]) : randFrom(["coldtrail", "clueless"])
            break;
        case 1: case 3: case 5: case 7:
            knowledge = "hottrail"
            break;
        case 2: case 4: case 6: case 8:
            if (story[i].stage.name === story[i - 1].stage.name) {
                knowledge = "coldtrail"
            } else if (story[i].stage.hasOwnProperty(`captured`) && i > 3) {
                knowledge = randFrom(["clueless", "captured"])
            } else knowledge = "clueless"
            break;
    }
    return knowledge
}

function loseResult(stageindex, story, nextstage, gizmo, wincondition, rival, rivalpresence, ally) {

    let finalboss = story[Math.max($("#storylength").val() * 2 - 3, 0)].enemy

    let enemy = story[stageindex].enemy
    let stage = story[stageindex].stage

    let nextenemy = story[nextstage].enemy
    let nextmission = story[nextstage].stage
    let altstage = (nextstage - 1)

    let minion = randFrom(enemy.minionnames)
    let nextminion = randFrom(nextenemy.minionnames)

    let evilplace = evilPlace()
    let contact = randFrom(["he", "she"])

    let captured = nextmission.hasOwnProperty("captured") && nextmission.knowledge == "captured" ? true : false

    let retreat = [`You were unable to learn anything important before your retreat, and when you reconnect with Agent Fletch, he has little time to debrief you.`,
        `You retreat and regroup nearby, having lost to ${enemy.boss} and ${gPron(enemy, "possessive")} forces.`,
        `You are regrouping some distance away.`,
        `Overwhelmed by the might of the ${enemy.name}, you're forced to flee.`,
        `After failing to contain the situation, you are forced to flee from ${possessiveSuffix(enemy.name)} forces.`,
        `You regain your consciousness after a while and pick yourself up. ${enemy.boss} is nowhere to be found.`,
        `"You are not worth my time, ${defineAddressing(enemy)}!" ${enemy.boss} growls, and leaves you lying on the ground, defeated.`,
        `You can't let this defeat stop you! You pick yourself up, and dust yourself off.`,
        `You hurry away from the conflict, beaten and defeated.  You hear the sound of ${possessiveSuffix(enemy.boss)} laughter echoing behind you.`,
        `After an uphill battle against overwhelming odds, ${enemy.boss} apparently becomes bored with the uneven competition and unleashes ${getEnemyAttack(enemy, "antiair", "an unrelenting assault")} into the melee. "Let's move out!" ${gPron(enemy, "subject")} commands. "This is not worth our time." Left for dead, you have no chance of following. `,
        `"You were close, ${defineAddressing(enemy)}", ${enemy.boss} calls to you. "But not close enough." ${ucInit(gPron(enemy, "subject"))} clutches at ${gPron(enemy, "possessive")} wounds, and though they are serious, at least ${gPron(enemy, "subject")} is still standing. ${ucInit(gPron(enemy, "subject"))} watches you writhe on the ground for a moment longer, and spits in your direction. "Go ahead," ${gPron(enemy, "subject")} says. "Follow me. I don't care. You'll walk right into the ${possessiveSuffix(finalboss.name)} lap."`,
        `"Do not follow us, ${defineAddressing(enemy)}," ${enemy.boss} threatens. "${enemy.boss == finalboss.boss ? `I now know` : `We will go now warn ${finalboss.boss}`} of you, and if you still continue on this ill-conceived mission, you will meet your end by ${enemy.boss == finalboss.boss ? `my` : `${gPron(finalboss, "possessive")}`} hand."<br><br>"Go then," you say, spitting blood. "Scurry ${enemy.boss == finalboss.boss ? `back to wherever you crawled out of` : `to the ${finalboss.bosstitle()}`}, and see what good that will do you in the end."`,
        `Bleeding from multiple cuts, you distract the ${enemy.bosstitle()} and make your retreat in the moment of confusion. You escape ${enemy.boss}, but just barely.`,
        `You gasp for breath, refusing this defeat to stop you from confronting ${finalboss.boss}.`,
        `"I am done with you," the ${enemy.bosstitle()} says, and tosses you aside like a rag. You are left in a heap, beaten and humiliated.`,
        `You have no option but to retreat.`
    ]

    let rescue = [`Suddenly, Citadel agents rappel down out of nowhere. ${enemy.boss} and ${gPron(enemy, "possessive")} ${enemy.minions()} flee as the agents free you.`,
        `You slowly awaken in a helicopter, confused on how you wound up there.`,
        `A squad of Citadel soldiers rushes in and sends the enemies focused on you fleeing.`,
    `When all seems lost, a Citadel operative pilots an armored transport through the ${enemy.minions()} and knocks ${enemy.boss} aside. "Come with me if you want to live!"`]

    let fletch_gadget = getGizmo()

    let intel = [`While you were bumbling, Citadel's efforts have paid off, and you have a little time to recover before you're sent off to your next target, where ${nextenemy.boss} has been seen.`,
    `You overheard a lead, but it will be a struggle for you to catch up with the ${possessiveSuffix(finalboss.name)} plans now.`,
        `You have no real leads to follow up on. However, after returning to HQ, the news report on a situation that guides you on where to go next.`,
        `Ashamed and frustrated, you have no choice but to return to Ransom and hope someone at the police department would hear you out. You can't think of any other option at this point.`,
    `"Gladiators," a Citadel agent greets you. "I have a location of heavy ${nextenemy.name} activity that could use your particular brand of investigating."`,
    `Agent Fletch leans toward you. "No idea what you thought you were doing down there. Now we must hurry to ${nextenemy.name} if we're to fix this!"`,
    `You see your first welcome sight; Agent Fletch approaches with ${whichPreposition(fletch_gadget)} in hand. "Don't get comfy," Fletch said, booting up the ${fletch_gadget}. "After this fiasco, we might recover if we rapidly strike at key targets, and hopefully throw the ${finalboss.name} off-balance."`,
        `Citadel soldiers take a moment to patch up your wounds, getting you prepared to return to the Citadel.`,
        `With no clue what to do next, you have no choice but to reconnect with Agent Fletch and hope the Citadel has more intel.`,
    `You call Agent Fletch and request a cleanup team, and then you begin searching through the area, and find ${whichPreposition(getGizmo())} placed almost intentionally where you would find it. From the device you find maps and coordinates.`,
    `You vow to catch the ${finalboss.name} before their ${getMasterPlan()} is complete!`,
    `This was only a delay in the inevitable. You know ${enemy.boss} is only a beatstick, not the mastermind. ${ucInit(gPron(enemy, "subject"))} will lead you to ${finalboss.boss == enemy.boss ? `The Master` : finalboss.boss}, and you will be making examples of them both.`,
        `Just then, you got a call on your communicator from Agent Fletch. "Heads up, Gladiators." Agent Fletch said. "We've got a a problem."`
    ]

    let capture = [
        `${enemy.boss} kicks you while you're down, and then pushes you hard into the ground. You look up slowly to see two others join him — ${nextenemy.boss} and ${nextminion} of the ${nextenemy.name}. "Wholly unimpressive," ${nextenemy.boss} comments.  "Perhaps, with a little more work, they can become somehow... useful?" `,
        `${enemy.boss} looks down at you. "So this is the sad excuse for a fighter that has been harrying the ${finalboss.name}?" ${gPron(enemy, "subject")} says looking you over. "You've thrown a wrench
in our plans, ${enemy.addressing}." And then ${gPron(enemy, "subject")} grins, and you feel your heart stop. "And so now you will go to ${nextenemy.boss}!" and then laughs at your fate.`,
        `"Just as I thought," ${enemy.boss} says with calm confidence as he paces around you. "Absolutely pathetic." "What should we do with them?" ${minion} asks. "They are worthless."<br><br>"Not entirely,"
${enemy.boss} says. "Bind them. Perhaps ${nextenemy.boss} will have a use for their inadequate talents."`,
        `"Your pitiful ${enemy.boss == "Jackal" ? `genes` : `husks`} won't serve me," ${enemy.boss} says. "Perhaps you'll be worth something on the black market. ${ucInit(gPron(enemy, "possessive"))} ${enemy.minions()} approach to apprehend you.`,
        `${enemy.boss} ${enemy.threat} before ${nextenemy.boss} gestures for ${gPron(enemy, "object")} to stop. "No," ${gPron(nextenemy, "subject")} says. We have a better use for the Gladiators.
After all, who better to think ${enemy.boss == finalboss.boss ? `the Master` : finalboss.boss} would want than the Citadel's best?" ${minion} and ${nextenemy.boss == finalboss.boss ? nextenemy.minion : nextenemy.boss} share an amused glance as ${enemy.boss} opens a secret passage. The three of them lead you to the unknown.`,
        `Cackling maniacally the whole time, ${enemy.boss} and ${gPron(enemy, "possessive")} ${enemy.minions()} surround you, overwhelming you. Their constant attacks become too much for you, and soon you black out, ${possessiveSuffix(enemy.boss)} haunting laughter echoing through your head all the while.`,
        `${enemy.boss} laughs quietly and sinisterly as ${gPron(enemy, "subject")} slowly licks a bleeding wound on ${gPron(enemy, "possessive")} hand. "${finalboss.boss == enemy.boss ? `I'm proud of your efforts` : `${finalboss.boss} would be proud`}," ${gPron(enemy, "subject")} tells as you are tied and your vision fades. You barely hear ${possessiveSuffix(enemy.boss)} final command: "Take them to the ${nextenemy.name}!"`,
        `You find yourself immediately surrounded by ${possessiveSuffix(enemy.boss)} ${enemy.minions()}. "You're due at the next stop," ${enemy.boss} says menacingly. "The ${nextenemy.name} still has some uses for you.`,
        `"You were close, ${defineAddressing(enemy)}", ${enemy.boss} calls to you. "But not close enough." ${ucInit(gPron(enemy, "subject"))} clutches at ${gPron(enemy, "possessive")} wounds, and though they are serious, at least ${gPron(enemy, "subject")} is still standing. ${ucInit(gPron(enemy, "subject"))} watches you writhe on the ground for a moment longer, and spits in your direction. "Subdue them," ${gPron(enemy, "subject")} orders the ${enemy.minions()}.`,
        `You fall on your back, and ${enemy.boss} rushes in, planting ${gPron(enemy, "possessive")} foot on your chest, keeping you down. "No more," ${enemy.boss} says and ${enemy.threat}, ready, should you try to retaliate. "We are done."`,
        `"You want to bring me down? You have to do it yourself, ${enemy.boss}! Take your shot!" you challenge the ${enemy.bosstitle()}, ignoring the ${enemy.minions()}, even though you can barely stand. "I need not fight you. I have done as I was bid," ${gPron(enemy, "subject")} answers. "None shall harm you here, angry little ${defineAddressing(enemy)}. You are awaited.. by ${nextenemy.boss}!"`
    ]

    let intel_words = [`intel`, `evidence`, `knowledge`, `information`]
    let revolting_words = [`disgusting`, `revolting`, `repulsive`, `nauseating`, `stomach-churning`]

    let stage_loot = stage.loot != undefined ? stage.loot : "haste"
    let stage_swarm = []
    stage.hasOwnProperty("swarm") ? stage_swarm = [stage.swarm, ...stage_swarm] : () => { }
    enemy.hasOwnProperty("swarm") ? stage_swarm = [enemy.swarm, ...stage_swarm] : () => { }


    let generic = captured ? randFrom(capture) : `${randFrom([...retreat, ...rescue])}<br><br>${randFrom(intel)}`

    let blade = [
        `With multiple superficial and some severe cuts from ${possessiveSuffix(enemy.boss)} mastery with ${gPron(enemy, "possessive")} ${enemy.blade}, you ${captured ? `feel you strength sapping.<br><br>${randFrom(capture)}` : `have to choose: retreat or die. As you are yet to stop ${finalboss.boss}, the choice is obvious.<br><br>${randFrom(intel)}`}`,
        `${enemy.boss} draws your head back, with ${gPron(enemy, "possessive")} ${enemy.blade} on your throat. ${captured ? `"Wait!" ${randFrom(enemy.minionnames)} shouts. "I hear ${nextenemy.boss} is looking for them."` : `Suddenly, ${gPron(enemy, "subject")} lets you drop. "No. I will not soil my blade with sucn an unworthy opponent."<br><br>${randFrom(intel)}`}`
    ]

    let escort = [
        `Spitting up blood, you look up just in time to see ${ally.name} getting dragged away. ${captured ? randFrom(capture) : `${randFrom([`As ${ally.name} is carted off, you see the ${possessiveSuffix(gPron(ally, "sex"))} ${getGizmo()} fall, apparently unseen, onto the ground as the enemy retreats.`, `<br><br>${generic}`])}`}`,
        `You became so obsessed with your fight, that you barely caught the sight of ${ally.name} taken away by the ${enemy.minions()}. ${captured ? randFrom(capture) : `Not only were you unable to retrieve any ${randFrom(intel_words)} on ${finalboss.boss}, but also got a valuable ally captured in the process.<br><br>${randFrom(intel)}`}`,
        `With defeat inevitable, you back up with ${ally.name}. Your only hope of escape is ${stage.hasOwnProperty("pit") ? stage.pit : "a bottomless pit"}. ${ally.name} offers to help you climb down. As you descend, ${ally.name} is overwhelmed${captured ? `, and the ${enemy.minions()} pull you back. ${randFrom(capture)}` : `. Clenching your jaw, you turn away and make your escape.<br><br>${randFrom(intel)}`}`,
        `${ally.name} had limped away, bleeding, and the others had gone after ${gPron(ally, "object")}, probably to finish ${gPron(ally, "object")} off.${captured ? `<br><br> ${randFrom(capture)}` : ` You could do nothing. They'd already finished with you.<br><br>${randFrom(intel)}`}`,
        captured ? randFrom(capture) : `"We've failed ${gPron(ally, "object")}," you say, clenching your fist by your side. "This doesn't mean you're done," Agent Fletch responds. "You can do better next time." Agent Fletch is right.`,
        `"Go! Now! Get to the chopper!" ${ally.name} shouts as ${enemy.boss} steps over ${gPron(ally,"object")}. ${captured ? `You are in no shape to move. ${randFrom(capture)}`: `<br><br>${randFrom(retreat)} ${randFrom(intel)}`}`,
    ]

    let experiment = [captured ? `You are strapped in a metal apparatus, and ${randFrom(enemy.minionnames)} injects you with the vile substance. Immediately you start to lose consciousness. "The serum is not working as expected, we need to run more tests," you hear ${enemy.boss} saying, before you're out cold.` : `"Should we not test the serum on the Gladiators?" ${randFrom(enemy.minionnames)} asks ${enemy.boss}. "No. They are completely worthless."<br><br>${randFrom(intel)}`]

    let explosion_cause = []
    stage.hasOwnProperty("explosions") ? explosion_cause = [stage.explosions, ...explosion_cause] : () => { }
    enemy.hasOwnProperty("explosions") ? explosion_cause = [enemy.explosions, ...explosion_cause] : () => { }
    let explosion = [`You barely clear the area when the ${randFrom(explosion_cause)} finally bring everything crumbling down. ${captured ? randFrom(capture) : generic} `]

    let find_intel = [
        `${captured ? `"Looking for this?" ${enemy.boss} holds ${whichPreposition(gizmo)} in front of you. ${randFrom(capture)}` : `You could not obtain whatever ${randFrom(intel_words)} ${enemy.boss} had. ${generic}`}`,
        `${captured ? randFrom(capture) : `The ${enemy.name} escaped with ${stage_loot}, and the ${gizmo} in your hands looks damaged. "Agent Fletch," you got into your communications device. "I've got the ${gizmo}, but it looks damaged." "At least we have it," Agent Fletch replied in your ear. "Bring it back to Citadel HQ and we'll see what data we can pull from it.`}`,
        `"${captured ? nextenemy.boss : finalboss.boss} will hear of your interference," ${enemy.boss} says. "And you will beg for ${gPron(captured ? nextenemy : finalboss, "possessive")} mercy." ${ucInit(gPron(enemy, "subject"))} then reaches out to a ${getGizmo()}. "This is what you were after?"`,
        captured ? randFrom(capture) : `"We've failed to secure the ${randFrom(intel_words)}," you say, clenching your fist by your side. "This doesn't mean you're done," Agent Fletch responds. "You can do better next time." Agent Fletch is right.`
    ]

    let gunk = [`You are forced to duck from ${getEnemyAttack(enemy, "antiair", "a relentless assault")}. You lose your balance and fall straight into ${stage.gunk}. You try to desperately not to swallow any of the ${randFrom(revolting_words)} liquid${captured ? ` but fail, and start to lose your consciousness. When almost passed out, you feel you're dragged back to the surface. "Clean them up," you think you hear ${enemy.boss} say. "${nextenemy.boss} won't want them like that."` : `, and when you finally manage to get to the surface, ${enemy.boss} has disappeared with ${gPron(enemy, "possessive")} ${enemy.minions()}.<br><br>${randFrom(intel)}`}`]

    let guide = [
        `"Unfortunate that ${gPron(enemy, "subject")} came out on top this time," ${ally.name}" says afterward. "${ucInit(gPron(enemy, "subject"))} won't be challenged again for some time. By you or by anyone else". You look at ${ally.name} in question, but the ${gPron(ally, "sex")} had vanished! ${captured ? randFrom(capture) : `You are left to contemplate your place in the world, alone. ${randFrom(intel)}`}`,
        `"You led me into a deathtrap," you say. "A rush like this is against everything we know." You and ${ally.name} stare hard at each other for a moment. "Very well. Strike your own path," ${ally.name} says, and turns, ${capture ? `leaving you in a heap. ${randFrom(capture)}` : `striding into the distance. ${randFrom(intel)}`}`,
        `"You cannot expect to win every conflict," ${ally.name} says. "You almost got me killed!" you shout back, looking down at your bruised body. You are about to apologize, but when you look up, ${captured ? `you are faced with ${enemy.minions()}. ${randFrom(capture)}` : ` ${gPron(ally, "subject")} is gone. ${randFrom(intel)}`}`,
        `${captured ? randFrom(capture) : `"Dammit!" you say to ${ally.name}. "They got away."<br><br>"It was a long shot. I'm sorry." ${gPron(ally, "subject")} answers. "Don't be," you answer. "We caused a stir. That's something." ${randFrom(intel)}`}`,
        `"Go! Now! Get to the chopper!" ${ally.name} shouts as ${enemy.boss} steps over ${gPron(ally,"object")}. ${captured ? `You are in no shape to move. ${randFrom(capture)}`: `<br><br>${randFrom(retreat)} ${randFrom(intel)}`}`,
    ]

    let gunmen = []
    stage.hasOwnProperty("gunmen") ? gunmen = [stage.gunmen, ...gunmen] : () => { }
    enemy.hasOwnProperty("gunmen") ? gunmen = [enemy.gunmen, ...gunmen] : () => { }
    let guns = [`You duck behind cover as the ${randFrom(gunmen)} fire on you. To move would be a a suicide, and you are forced to watch as the ${enemy.name} leaves with ${stage_loot}. ${captured ? `You are pinned by the fire, and after a while you are surrounded by gun-toting enemies from all sides. ${randFrom(capture)}` : `You hunker down to avoid being hit by stray bullets.<br><br>${randFrom(rescue)} ${randFrom(intel)}`}`,
    `Bullets are flying everywhere as you flit from cover to cover. The ${randFrom(gunmen)} pour fire on you, and ${captured ? `finally you have nowhere to run. ${randFrom(capture)}` : `you are running out of places to go to.<br><br>${randFrom(rescue)} ${randFrom(intel)}`}`,
    `Torrents of fire from the ${randFrom(gunmen)} force you to pull back${captured ? ` until you are cornered. ${randFrom(capture)}` : `, leaving the ${enemy.name} free to go through with their plan.<br><br>${generic}`}`]

    let heights = [captured ? `${enemy.boss} holds you on the edge of a drop to oblivion. "Wait!" ${randFrom(enemy.minionnames)} shouts. "I hear ${nextenemy.boss} is looking for them." ` : `"Get rid of them. They are useless," ${enemy.boss} orders the ${enemy.minions()}. You have no strength to resist as you are dragged to the edge and thrown to your deaths.<br><br>You are falling toward a certain death, when suddenly a daring Citadel pilot comes to rescue with incredible vehicular acrobacy, and you are caught by the chopper!<br><br>${randFrom(intel)}`]

    let hostages = [
        `${captured ? `You are lying on the ground, defeated and helpless, as` : `Despite all of your efforts,`} ${enemy.boss} executes another one of the ${stage.hostages}.<br><br>${captured ? randFrom(capture) : generic}`,
        `You weren't able to save the ${stage.hostages}, and now their lives are on your hands. ${captured ? randFrom(capture) : generic}`,
        captured ? randFrom(capture) : `"We've failed to save them," you say, clenching your fist by your side. "This doesn't mean you're done," Agent Fletch responds. "You can do better next time." Agent Fletch was right.`,
        `"Go! Now! Get to the chopper!" one of the ${stage.hostages} shouts as ${enemy.boss} steps over ${randFrom([`him`,`her`])}. ${captured ? `You are in no shape to move. ${randFrom(capture)}`: `<br><br>${randFrom(retreat)} ${randFrom(intel)}`}`,]

    let labyrinth = [
        `The relentless ${enemy.bosstitle()} forces you to full rout, and you soon find yourselves lost in the ${stage.labyrinth}. You rush through the area to escape, ${captured ? `but suddenly you find yourself surrounded by ${enemy.minions()}. You feel exhausted, and cannot push on. "How could you face the ${finalboss.name} if you can't even find your own way?" ${enemy.boss} says, eyeing you with contempt.` : `and suddenly you are in the clear.<br><br>${randFrom(intel)}`}`,
        captured ? randFrom(capture) : `Beaten, you are left where you were. You awaken hours later in the dark, disoriented, and spend a good while trying to find your way out of the lightless ${stage.labyrinth}. A rescue team of Citadel soldiers eventually finds you and speeds you back to HQ.`
    ]

    let oni = [`Standing before you, the ${mysticalSynonym()} power of Oni fills ${enemy.boss}. ${ucInit(gPron(enemy, "subject"))} rises up off the ground, the ${mysticalSynonym()} powers swirling around ${gPron(enemy, "object")}. You watch as ${gPron(enemy, "possessive")} muscles grow, ${gPron(enemy, "possessive")} eyes burn, and ${gPron(enemy, "possessive")} body pulses with the ${mysticalSynonym()} energies! ${captured ? `You lose consciousness in front of that ${mysticalSynonym()} power!` : `You have no choice but to flee for your lives!`}`]

    let retrieval = [
        `${captured ? `The ${enemy.name} collects the last of ${stage.loot}. ${randFrom(capture)}` : `The ${enemy.name} was able to escape with ${stage.loot}. ${randFrom(intel)}`}`,
        `Even with the prepared positioning and the upper hand in the fight, ${enemy.boss} and ${gPron(enemy, "possessive")} ${randFrom(["forces", enemy.minions()])} beat you ${captured ? `down. ${randFrom(capture)}` : `back and slow your down, giving them time to get ${stage.loot} and retreat. ${randFrom(intel)}`}`,
        `${captured ? randFrom(capture) : `"Dammit!" you contact Agent Fletch with your communicator. "They got ${stage.loot}." "It was a long shot," he answers. "We caused a stir. That's something." You disconnect and pick yourselves up.<br><br>${randFrom(intel)}`}`,
        captured ? randFrom(capture) : `"We've failed to secure ${stage.loot}," you say, clenching your fist by your side. "This doesn't mean you're done," Agent Fletch responds. "You can do better next time." Agent Fletch is right.`]

    let ritual_focus = []
    stage.hasOwnProperty("ritual") ? ritual_focus = [stage.ritual, ...ritual_focus] : () => { }
    enemy.hasOwnProperty("ritual") ? ritual_focus = [enemy.ritual, ...ritual_focus] : () => { }
    ritual_focus = randFrom(ritual_focus)
    let this_blade = enemy.hasOwnProperty("blade") ? enemy.blade : null
    let ritual = [
        `You were not able to stop ${enemy.boss} from completing the ritual! ${getTransformationSequence(enemy, this_blade, ritual_focus)} ${captured ? `You lose consciousness in front of that ${mysticalSynonym()} power!` : `You have no choice but to flee for your lives!`}`,
        `You're thrown to the ground by a blast of ${mysticalSynonym()} force, ${captured ? `and you are sucked through a shimmering, twisting portal.` : `and the ${enemy.bosstitle()} disappears in a flash of brilliant purple light. ${randFrom(intel)}`}`,
        `${enemy.boss} looks down at you, a smug smirk spreading across ${gPron(enemy, "possessive")} face. ${ucInit(gPron(enemy, "subject"))} reaches up and recites a few strange words in a language you've never heard before. In an instant, the world blows away around you in a deafening explosion of ${mysticalSynonym()} energy${captured ? ` and then` : `, and for a moment,`} all you can see is the blackness.${captured ? `` : `<br><br>${randFrom(intel)}`}`
    ]

    let rival_interrogate = [
        `${captured ? `${rival.name} smirks at you as you are beaten. ${randFrom(captured)}` : `Despite your best efforts, ${rival.name} has slipped away. ${generic}`}`,
        `${captured ? randFrom(capture) : `The ${enemy.name} was able to escape with ${rival.name}. ${randFrom(intel)}`}`,
        `${captured ? randFrom(capture) : `${rival.name} showed ${gPron(rival, "reflexive")} to be a true coward and fled before you could make ${gPron(rival, "object")} reveal what ${randFrom(intel_words)} ${gPron(rival, "subject")} has. ${generic}`}`,
        `"${captured ? nextenemy.boss : finalboss.boss} will hear of your interference," ${rival.name} says. "And you will beg for ${gPron(captured ? nextenemy : finalboss, "possessive")} mercy." ${ucInit(gPron(rival, "subject"))} then reaches out to a ${getGizmo()}. "This is what you were after?"`,
        `You could not reach ${randFrom(intel_words)}, ${rival.name} evading you at every opportunity. With a screech, ${gPron(rival.name, "subject")} leaps down on you from the shadows, ${captured ? `and you lose your balance.<br><br>${randFrom(capture)}` : `and you react the only way you can. You knock ${gPron(rival, "object")} away, and use the opportunity to escape. ${randFrom(intel)}`}`,
        `${captured ? randFrom(capture) : `"Dammit!" you contact Agent Fletch with your communicator. "${rival.name} got away."<br><br>"It was a long shot," he answers. "We caused a stir. That's something." You hang up and pick yourselves up. ${randFrom(intel)}`}`,
        captured ? randFrom(capture) : `"We've failed to catch ${rival.name}," you say, clenching your fist by your side. "This doesn't mean you're done," Agent Fletch responds. "You can do better next time." Agent Fletch is right.`]

    let swarmed = [
        `Despite all of your skills, the endless waves of ${randFrom(stage_swarm)} eventually tire you out${captured ? `.<br><br>${randFrom(capture)}` : `, and you almost give up.<br><br>${generic}`}`,
        `With a never-ending stream of ${randFrom(stage_swarm)}, you never should have hoped to win. ${captured ? randFrom(capture) : generic}`,
        `There is no end to the ${randFrom(stage_swarm)}, and inch by inch you are forced to retreat${captured ? `, until there is nowhere to retreat to, and you are buried under the avalanche of assailants.` : `. ${generic}`}`,
        `You look over the battlefield, and scores more ${randFrom(stage_swarm)} are moving in to flank you. In just moments you are about to be completely overrun.<br><br>${captured ? randFrom(capture) : generic}`,
        `"Go! Now! Get to the chopper!" ${whichPreposition(stage.bystander)} shouts as ${enemy.boss} steps over ${randFrom([`him`,`her`])}. ${captured ? `You are in no shape to move. ${randFrom(capture)}`: `<br><br>${randFrom(retreat)} ${randFrom(intel)}`}`
    ]

    let undead = [
        `Looking out over the battlefield, you see the zombies are too many for you to keep at bay. ${captured ? `You fight as long as you can, but eventually you are overrun by the horde.` : `"Agent Fletch," you say into your radio. "The target's fled, and the horde is loose. Requesting extraction.`}`,
        `"Go!" ${whichPreposition(stage.bystander)} yells at you from where ${contact} lies, wounded and pinned. "Get out of here!" You turn and flee as the unstoppable horde of zombies approaches${captured ? `, but you are not fast enough in your current state.` : `. Sounds of fighting can be heard as ${contact} fights them off as long as ${contact} can, but all too soon those sounds give way to screams of pain.<br><br>${randFrom(intel)}`}`
    ]

    let loseresult

    let keywords = ["generic"]

    wincondition != "" ? keywords = [wincondition, wincondition, ...keywords] : () => { }

    stage.hasOwnProperty("keywords") ? keywords = [...keywords, ...stage.keywords, ...stage.keywords] : () => { }
    enemy.hasOwnProperty("keywords") ? keywords = [...keywords, ...enemy.keywords, ...stage.keywords] : () => { }
    keyword = randFrom(keywords)

    switch (keyword) {
        case "generic": loseresult = generic;
            break;
        case "blade": loseresult = randFrom(blade);
            break;
        case "escort": loseresult = randFrom(escort);
            break;
        case "experiment": loseresult = randFrom(experiment)
            break;
        case "explosion": loseresult = randFrom(explosion)
            break;
        case "guns": loseresult = randFrom(guns)
            break;
        case "guide": loseresult = randFrom(guide)
            break;
        case "gunk": loseresult = randFrom(gunk)
            break;
        case "hostages": loseresult = randFrom(hostages)
            break;
        case "intel": loseresult = randFrom(find_intel)
            break;
        case "labyrinth": loseresult = randFrom(labyrinth)
            break;
        case "oni": loseresult = randFrom(oni)
            break;
        case "retrieval": loseresult = randFrom(retrieval);
            break;
        case "ritual": loseresult = randFrom(ritual);
            break;
        case "rival": loseresult = randFrom(rival_interrogate);
            break;
        case "swarmed": loseresult = randFrom(swarmed)
            break;
        case "undead": loseresult = randFrom(undead);
            break;
        default: loseresult = generic;
    }

    return loseresult
}

function getEnemyAttack(enemy, attack, alternative) {

    if (enemy.hasOwnProperty("attacks") && enemy.attacks.hasOwnProperty(attack)) {

        attack = enemy.attacks[attack]
    } else { attack = alternative }

    return attack


}

function victoryResult(stageindex, story, nextstage, gizmo, masterplan) {

    let finalboss = story[Math.max($("#storylength").val() * 2 - 3, 0)].enemy
    let enemy = story[stageindex].enemy
    let stage = story[stageindex].stage
    let nextenemy = story[nextstage].enemy
    let nextmission = story[nextstage].stage
    let minion = randFrom(enemy.minionnames)
    let contact = randFrom(["He", "She"])
    let location = story[stageindex].stage.location
    let bystanders = story[stageindex].stage.bystander
    let clue
    let evilplace = evilPlace()
    let detonationaction = getEnemyAttack(enemy, "detonation", `${gPron(enemy, "subject")} produces a remote and presses a button. An explosion knocks you down`)

    let wanting = randFrom(["you are after", "you want", "", "you pursue", "the Citadel is after", "behind all this", "all too familiar to you"])

    let supposition = randFrom(["", "supposedly ", "rumored to be ", "who to your understanding are ", "who according to Agent Fletch are ", "apparently ", "probably ", "believed to be ", "most likely ", "in all likelihood ","presumably ", "surely ", "assumably ", "who you believe are ", "the Citadel analysts are saying is ", "apparently ", "in fact ", "indeed ", "as a matter of fact ", "in truth "])

    switch (nextmission.name) {
        case "Ashes of the Eternal":
        case "The Ceremony": clue = [
            `${nextenemy.boss} has an interest on a certain ${evilplace}`,
            `mysterious rituals are taking place in a distant ${evilplace}, closely tied to grand scheme of ${nextenemy.boss}.`
        ]
            break;
        case "Cashed Out": clue = [
            `there is a gambling den operated by the ${nextenemy.name}`,
            `you need to investigate the location of a high-stakes underground casino operated by the ${nextenemy.name}, understood to be laundering massive sums`,
            `exclusive gambling events are hosted by ${nextenemy.name}, drawing in the city's elite under suspicious circumstances`
            ]
            break;
        case "Compromised": clue = [
             `${nextenemy.boss} is orchestrating a large-scale hostage situation within the corporate towers of downtown`,
             `you need to speed to stop a daylight abduction by ${nextenemy.name} in a bustling downtown office building`,
             `${nextenemy.boss} is planning to take hostages in a downtown office building`
             ]
            break;
        case "Gone Ballistic": clue = [
             `${nextenemy.name} - ${nextenemy.desc} - orchestrating an illegal arms trade, equipped for a small army`,
             `a secretive military-grade arms exchange facilitated by ${nextenemy.name} is going on hidden within the industrial district`,
            `${nextenemy.name} - ${nextenemy.desc} - are conducting an arms deal at a nearby warehouse`
            ]
            break;
        case "One Step Ahead": clue = [
            `recent tracks of ${nextenemy.name} along secluded mountain routes have been observed, hinting at strategic movements against the Citadel`,
            `evidence of encampments of ${nextenemy.name} are dotting a hidden mountain trail, preparing for an unknown operation`,
            `the ${nextenemy.name} have been seen along a distant mountain path with their ${nextenemy.minions()}`
            ]
            break;
        case "Original Copy": clue = [
            `there are illicit cloning activities linked to ${nextenemy.boss}, within the depths of a hidden research facility`,
            `there are stolen genetic research being replicated at an unauthorized lab, directly involving ${nextenemy.boss}`,
            `${nextenemy.boss} and ${gPron(nextenemy, "possessive")} ${nextenemy.minions()}, have been spotted at a suspicious lab`
            ]
            break;
        case "Out of Time":
        case "Rude Awakening": clue = [
             `there is a resurgence of dark magic, centered around ${evilplace}, with ${nextenemy.name} orchestrating the chaos`,
             `there are unearthly disturbances reported near ${evilplace}, where ${nextenemy.boss} has been seen with entities not of this world`,
             `strange sorcery and walking corpses have been witnessed, along with ${nextenemy.boss} in ${whichPreposition(evilplace)}`
            ]
            break;
        case "Poison the Well": clue = [
            `the ${nextenemy.name} has hauled some equipment to the sewers`,
            `suspicious chemicals and devices being moved into the city's sewers by ${nextenemy.name}, hinting at a toxic plot`,
            `there are subterranean machinations of ${nextenemy.name} within the sewers, threatening the city's water supply`
            ]
            break;
        case "Right to Remain Silent": clue = [
             `the Citadel's undercover operatives already gone silent within the territory of ${nextenemy.name} territory, are compromised.`,
             `there has been an extended surveillance of Citadel scouts by ${nextenemy.name}, raising alarms of their capture`,
             `the undercover Citadel scouts have been captured by ${nextenemy.name}`
             ]
            break;
        case "Supply & Demand": clue = [
              `the shadowy corners of Ransom City flicker with the activities of ${nextenemy.name}, trading in forbidden substances`,
              `an intricate network led by ${nextenemy.name}, distributing narcotics through abandoned structures`,
              `the ${nextenemy.name} - ${nextenemy.desc} - are conducting a drug deal at a nearby abandoned property`
              ]
            break;
        case "Under Destruction": clue = [
            `there has been suspicious activity by ${nextenemy.name} at an unfinished construction site`,
            `the blueprint of an unfinished skyscraper reveals alterations not part of the original design, apparently by ${nextenemy.name}`,
            `the ${nextenemy.name} - had something going down at an unfinished construction site`]
            break;
        case "Running Wild": clue = [
            `the ancient ruins in the heart of the forest, now home to ${nextenemy.minions()} of the ${nextenemy.name}, are hiding something valuable`,
            `the labyrinthine Forest of Sorrows becomes the stage for ${nextenemy.name}'s excavation, seeking relics of untold power`,
            `the ${nextenemy.minions()} of the ${nextenemy.name} have set up a dig in a labyrinthine forest`
            ]
            break;
        case "Steel Memories": clue = [
             `a once-abandoned bunker is now buzzing with activity under ${nextenemy.boss}`,
             `a fortified hideaway is where ${nextenemy.boss} guards their secrets closely`,
            `the location of the secret base of ${nextenemy.boss} has been hidden in plain sight all along.`
            ]
            break;
        case "Sudden Death": clue = [
              `there's a revival of gladiatorial combats by ${nextenemy.name}, mirroring the dark traditions you thought you had already shut down.`,
              `the underbelly of Ransom City stirs with whispers of a deadly tournament, resurrected by ${nextenemy.name} for grim purposes.`,
            `the ${nextenemy.name == "Kingdom" ? nextenemy.boss + ` was back to ${gPron(nextenemy, "possessive")} previous practice` : " the customary recruitment methods of the Kingdom been duplicated by " + nextenemy.name}`]
            break;
    };

    clue = randFrom(clue)

    let gatherclues = [
        `${enemy.boss} forces you to dodge ${gPron(enemy, "possessive")} attack, and when you return to your stance, ${gPron(enemy, "subject")} is gone! Rather than give chase, you interrogate ${minion} who reveals`,
        `After the skirmish, the ${enemy.name} scared away, you rush to one of the ${bystanders}s' side - an undercover Citadel scout, who holds ${whichPreposition(gizmo)} in hand. ${contact}'s alive, bleeding out from an attack. "The ${gizmo}!" you ask. "What's in it?" ${contact} doesn't make it, but the intel you recovered tells that`,
        `Before you can finish the job, ${enemy.boss} leaps through ${stage.hasOwnProperty("pit") ? stage.pit : "a bottomless pit"}. You race to the edge after ${gPron(enemy, "object")}, but ${gPron(enemy, "subject")} is nowhere to be seen. You doubt this is the last you see of the ${enemy.bosstitle()} of the ${enemy.name}. You turn to the ${bystanders}s and one of them approaches you.  "Thank you!" ${lowerCaseInitial(contact)} says, and tells of overhearing that`,
        `As you tie up the unconscious members of the ${enemy.name}, left on their own devices by ${enemy.boss}, you're shocked when ${minion} approaches you calmly. ${minion} - a double agent - informs you that`,
        `"Sir, we've captured one of the ${enemy.minions()} and are holding them for questioning."  The technician got to Agent Fletch, and then paused for a moment.  "Find out what they are up to!" Fletch told the technician.  "By any means necessary!" ${minion} revealed that`,
        `${enemy.boss} made a hasty retreat, but thanks to the information you got after the encounter, you have learned`,
        `"Thank you!" one of the ${bystanders}s said as ${lowerCaseInitial(contact)} approached, as the forces of ${enemy.boss} made their retreat. "I overheard what they're planning." ${contact} goes on to explain about `,
        `With the last of the ${enemy.minions()} defeated, you turn to face ${enemy.boss} again. You're confident that if you could only get close to ${gPron(enemy, "object")}, you could end this game of cat and mouse. But ${gPron(enemy, "subject")} has disappeared into the thin air! You don't have the time to ponder this, as the intel from here tells that`,
        `After your victory over ${possessiveSuffix(enemy.boss)} goons and a short call to Agent Fletch, Citadel forces secure the area and begin their investigation with you. ${enemy.boss} might have slipped away, but among the debris of the fight, you find out`,
        `${enemy.boss} forces you to dodge ${gPron(enemy, "possessive")} ferocious onslaught, and when you regain your footing, ${gPron(enemy, "subject")} has vanished into the shadows! Rather than giving yet another futile chase, you corner ${minion}, whose fear overpowers loyalty. ${minion} spills the beans, revealing`,
        `In the aftermath of the skirmish that sent the ${enemy.name} scrambling for cover, you rush to the aid of one of the ${bystanders}s — an undercover agent of the Citadel, clutching ${whichPreposition(gizmo)}. "The secrets?" you demand urgently. With last breaths, ${lowerCaseInitial(contact)} entrusts the device to you. Analyzing the ${gizmo}, you uncover`,
        `Before you can land the final blow, ${enemy.boss} executes a daring escape, leaping through ${stage.hasOwnProperty("pit") ? stage.pit : "a concealed trapdoor"}. Racing to the brink, you peer into the abyss, but ${gPron(enemy, "subject")} has slipped away. The echo of your foe's retreat lingers, but a brave ${bystanders} comes forward with crucial information overheard during the chaos:`,
        `As you secure the last of the ${possessiveSuffix(enemy.name)} underlings, left leaderless in the fray, a surprising ally emerges. ${minion}, known to you only as a face among the enemy ranks, reveals a hidden allegiance to the Citadel. "They planned all along to..." ${minion} begins, offering up the intel that`,
        `"Sir, one of the ${enemy.minions()} has been apprehended," the technician reports to Agent Fletch. After a brief, tense pause, Fletch orders, "Learn what they're scheming. Spare no method." From the coerced ${minion}, the truth emerges:`,
        `"Thank heavens you're here!" exclaims one of the ${bystanders}s, relief evident as the imminent threat recedes with ${possessiveSuffix(enemy.boss)} forces. Drawing closer, ${lowerCaseInitial(contact)}, visibly shaken yet resolute, shares an overheard plot that sheds light on the enemy's next steps:`,
        `With ${possessiveSuffix(enemy.boss)} minions scattered and defeated, you steel yourself for the final confrontation, only to find ${gPron(enemy, "subject")} has evaded capture once more, disappearing as if into thin air. The battle may be over, but the war rages on, as indicated by the intel gathered on site:`,
        `Victory is yours, but as the dust settles and Citadel forces secure the perimeter, ${enemy.boss} remains a ghost. Amidst the chaos, a crucial piece of intel emerges from the ruins — a ${gizmo}, something ${enemy.boss} believed destroyed. It hints that`
    ]

    // remote: nextmission.hasOwnProperty("captured"): If the Fighters lose: Tlazolteotl looks down at you, a smug smirk spreading across her face.  She reaches up and holds her amulet gingerly, reciting a few strange words in a language you've never heard before.  In an instant, the world blows away around you in a deafening explosion of arcane energy, and for a moment, all you can see is the blackness Advance to Part 5B.
    if (location == "base") {
        gatherclues = gatherclues.concat([
            `With a hail of attacks, ${enemy.boss} and ${gPron(enemy, "possessive")} surviving cronies fled the encounter. Taking a moment to catch your breath, you managed to find the most conscious of the ${bystanders}s. "${ucInit(gPron(enemy, "subject"))} never told us the plan!" ${lowerCaseInitial(contact)} cried. ${contact} tells that`,
            `Accessing ${possessiveSuffix(enemy.boss)} ${gizmo}, you are able to determine that`,
            `"You think you have won?"  ${enemy.boss} says as you're closing in. "You have won nothing!" ${detonationaction}, and the floor collapses beneath you as ${gPron(enemy, "subject")} escapes. You save who you can and ${minion} returns the favor by telling you that`,
            `With the Citadel on the way, you head deeper to find an array of computer screens. Sifting through files, you learn that`,
            `Accessing ${possessiveSuffix(enemy.boss)} files, you were able to determine that `,
            `You snatch up a ${gizmo} and press the communications device in your ear.  "I've got some intel."  "Excellent," Agent Fletch responds.  "We'll see what data we can pull from it." Turns out`,
            `After the fight, with no sight of ${enemy.boss}, you couldn't help but wonder what ${gPron(enemy, "subject")} was trying to cover up with this. Inside you found a ${gizmo} with intel that ${enemy.boss} definitely didn't want you to find:`,
            `As you sift through the debris of the latest encounter, a hidden panel catches your eye. Inside, you find detailed plans and a list of ${enemy.minions()} yet to be mobilized. It appears that`,
            `After disabling the last of the security measures, you uncover a series of transactions linking ${enemy.boss} to unknown offshore accounts. It's clear that`,
            `In the aftermath of the skirmish, a ${gizmo} left behind by ${enemy.boss} starts beeping. Upon inspection, it reveals a map with several marked locations. Piecing together the puzzle, you realize that`,
            `Despite ${possessiveSuffix(enemy.name)} abrupt withdrawal from the field, the breadcrumbs left behind weave a tale of their next move. From documents retrieved in the heat of battle to whispered confessions of a captured minion, the pieces come together to reveal`
        ])
    } else if (location == "neutral") {
        gatherclues = gatherclues.concat([
            `"You think you have won?"  ${enemy.boss} says you're closing in. "You have won nothing!" ${detonationaction}, and the floor collapses beneath you as ${gPron(enemy, "subject")} escapes. You save who you can and ${minion} returns the favor by telling you`,
            `After the fight, with no sight of ${enemy.boss}, you couldn't help but wonder what ${gPron(enemy, "subject")} was trying to cover up with this. Inside you found a ${gizmo} with intel that ${enemy.boss} definitely didn't want you to find:`,
            `In the midst of the chaos, a discarded ${gizmo} belonging to ${enemy.boss} reveals communications between ${gPron(enemy, "subject")} and an unknown entity. The messages hint that`,
            `Inspecting the area, you stumble upon a hastily abandoned safe house used by ${enemy.boss}. Among the personal effects left behind, a set of encoded documents stands out. Deciphering them, you learn that`,
            `Amid the area, ${minion}, a loyalist to ${enemy.boss}, cornered and desperate, offers a trade for their life. The information they provide is chilling, revealing that`,
        ])
    } else if (location == "cursed") {
        gatherclues = gatherclues.concat([
            `You were strong and fast enough to prevent ${enemy.boss} from finishing the ritual, the ${mysticalSynonym()} powers dissipating into the temple like a voice on the wind. You search through the area, and find out that`,
            `With each blow to ${enemy.boss}, the very world around you shudders. ${ucInit(gPron(enemy, "object"))} screams of pain carry on the winds around you as ${gPron(enemy, "subject")} attempts to fight you off.  Suddenly there's blinding flash and ${gPron(enemy, "subject")}'s gone. You can only look throuh what's left, and you determine that`,
            `The dust settles from the battle, revealing ancient inscriptions that were previously hidden. These cryptic messages seem to foretell ${possessiveSuffix(enemy.boss)} plans, indicating that`,
            `As the ritual is disrupted, a spectral figure materializes, offering a warning and a clue. With a voice echoing through the chambers, it divulges that`,
            `In the aftermath, amidst the relics and arcane symbols, a shattered artifact whispers its secrets. Piecing together its history, you uncover that`,

        ])
    }

let masterodds = Math.random()
if (masterodds < 0.33) {
    let masterplanclues;
    let ambiguous_word = randFrom([`subtly`,`cryptically`,`eerily`,`discreetly`,`abstractly`, `curiously`, `indirectly`, `cryptically`, `unexpectedly`, `vaguely`, `broadly`])
    let definite_word = randFrom(['explicitly', 'precisely', 'unmistakably', 'definitively', 'conclusively', 'unequivocally', 'directly', 'specifically', 'clearly', 'unambiguously', 'decisively']);
    let hinting_word = randFrom([`indicating that`,`leading to conclusion that`, `pointing towards the conclusion that`, `suggesting the idea that`, `leading to a realization:`, `guiding you to a conclusion:`, `hinting that`, `suggests that`, `revealing that`, `alluding that`,  `directing you towards a surprising conclusion:`, `suggesting the idea that`
])
    let ambiguity_element = (nextstage >= $("#storylength").val() * 2 - 3) ? `${definite_word} ${hinting_word}` : `${ambiguous_word} ${hinting_word}`
    switch (masterplan) {
        case "kidnapping":
            masterplanclues = [
                `A torn map is found among the gear of ${enemy.minions()}, marked with specific locations and times. "Could ${finalboss.name} be planning the victim's transfer here?" you wonder, the clues ${ambiguity_element}`,
                `Recovered communications between ${enemy.boss} and unknown contacts discuss a "precious cargo" being moved at dawn. "Could this be ${possessiveSuffix(finalboss.boss)} doing?" you ponder, the message ${ambiguity_element}`,
                `A witness comes forward, shaken, reporting a suspicious exchange in the shadows of the city. "They were talking about a key location for ${possessiveSuffix(finalboss.name)} 'cargo'," the witness recalls, their account ${ambiguity_element}`,
                `A hastily deleted email recovered from ${possessiveSuffix(enemy.boss)} computer mentions a change in the pickup location. "They're on the move," you realize, the digital paper trail ${ambiguity_element}`,
                `Surveillance footage of the area captures a van with obscured plates frequently visiting. "Could have been their holding spot," you theorize, the video evidence ${ambiguity_element}`,
                `A forgotten diary at the skirmish site contains veiled references to "the taken" and "the exchange." "Codes for the kidnapping operation?" you speculate, the diary's entries ${ambiguity_element}`,
                `You discover a series of burner phones with only one number dialed. "A direct line to ${bossDescription(finalboss)}?" you ponder, the call logs ${ambiguity_element}`
                ];
            break;
        case "personalpower":
            masterplanclues = [
                `Investigating the aftermath of the battle reveals extensive research into surpassing human limits, seemingly connected to ${finalboss.name}. "Seeking to surpass human boundaries.." you wonder out loud, the evidence ${ambiguity_element}`,
                `You come across heavily encrypted files detailing experimental trials under ${possessiveSuffix(enemy.boss)} orders, aimed at significant power enhancements. "For ${possessiveSuffix(finalboss.boss)} ambition?" It becomes evident, the findings ${ambiguity_element}`,
                `Uncovering a series of confidential documents, there's a clear trail back to ${finalboss.name}, outlining a comprehensive study for transcending physical and mental human capacities. "A blueprint for ${possessiveSuffix(finalboss.boss)} supremacy," you conclude. The research ${ambiguity_element}`,
                `The defeated ${enemy.minions()} speak of a hidden gym where ${enemy.boss} is seen entering at odd hours, sometimes with ${finalboss.boss === enemy.boss ? `a mysterious trainer` : `${possessiveSuffix(finalboss.boss)} company`}. "Merely training, or something more?" you wonder, the whispers in the wind ${ambiguity_element}`,
                `In the aftermath you find a ${gizmo}, filled with cellular modification records. "${finalboss.boss} playing god," you mutter, the clues ${ambiguity_element}`,
                `Scattered notes about harnessing untapped potential suggest a pursuit of dangerous knowledge. "What limits is ${finalboss.name} trying to break?" you wonder, the notes ${ambiguity_element}`,
                `An artefact is found in the aftermath, with no clear function but emitting a low hum of energy. You get a feeling this has to have something to do with ${finalboss.boss}. "A tool for empowerment or destruction?" you question. Investigation of the trail of possession ${ambiguity_element}`
                ];
            break;
        case "illegalgains":
            masterplanclues = [
                `An audit of suspicious financial transactions left behind by ${enemy.name}, possibly funding ${possessiveSuffix(finalboss.boss)} operations, uncovers a pattern of money moving through shell companies. "Laundering toward a larger transaction, no doubt," you conclude, the trail of funds ${ambiguity_element}`,
                `Recovery of a hacked ${gizmo} reveals bids for illegal deals under the guidance of ${enemy.boss}, implicating ${finalboss.name}. "This is how they've been funding their schemes," you realize, the digital breadcrumbs subtly leading to`,
                `Upon inspecting the area post-skirmish, you find forged documents and counterfeit currencies likely tied to ${finalboss.name}. "A financial foundation built on deception for ${finalboss.boss}," you note, the evidence ${ambiguity_element}`,
                `A coded ledger reveals a meeting point for a high-stakes underground auction. "Artifacts or weapons?" you ponder, the coded messages ${ambiguity_element}`,
                `Interrogation of a captured ${enemy.minions()} uncovers plans to raid ${finalboss.boss === enemy.boss ? possessiveSuffix(finalboss.name) : possessiveSuffix(finalboss.boss)} cache. "Infighting for profit," you surmise, the confession ${ambiguity_element}`,
                `Ledgers with coded entries recovered on-site reveal a network far more extensive than anticipated. "${possessiveSuffix(finalboss.name)} web of illicit trade?" you think, the ledgers ${ambiguity_element}`,
                `An unmarked container nearby filled with rare minerals hints at unregulated trade. "Funding ${finalboss.boss === enemy.boss ? possessiveSuffix(finalboss.name) : possessiveSuffix(finalboss.boss)} operations through the shadows?" you guess, the contents ${ambiguity_element}`
                ];
            break;
        case "strengtheningforces":
            masterplanclues = [
                `An increase in secure communications and suspicious activity around certain facilities after the last fight raises questions. "Is ${finalboss.name} mobilizing, but for what purpose?" you ponder, each piece of evidence collectively ${ambiguity_element}`,
                `Citadel agents recover detailed logs of recent acquisitions, ordered by ${enemy.boss} for ${finalboss.name}, hint at extensive preparations. "They're gearing up for something big," you note, the variety of resources ${ambiguity_element}`,
                `Eyewitness accounts nearby describe groups gathering under the guise of night, likely for ${possessiveSuffix(finalboss.boss)} cause. "A gathering force for ${finalboss.name}, but to what end?" you wonder, the reports ${ambiguity_element}`,
                `Found among ${possessiveSuffix(enemy.boss)} belongings, a recruitment flyer for private military training by ${finalboss.name}. "Expanding their reach," you determine, the propaganda piece ${ambiguity_element}`,
                `A defector from ${enemy.name} speaks of a secret initiation ceremony. "An oath of loyalty," you ponder, the insider's knowledge ${ambiguity_element}`,
                `A collection of foreign military manuals is found among the enemy's possessions. "${finalboss.name} preparing for a bigger fight?" you surmise, the manuals ${ambiguity_element}`,
                `Training schedules for with high-intensity regimens but for tactics generally not associated with ${finalboss.name} hint at an imminent escalation have been left behind. "Who are they readying for battle?" you question, the schedules ${ambiguity_element}`
                ];
            break;
        case "actsofterror":
            masterplanclues = [
                `Following the clash with ${enemy.boss}, an uptick in encrypted messages across networks known for shadowy dealings, coinciding with unusual power outages. "Is this ${possessiveSuffix(finalboss.name)} coordination for something covert?" you question, the odd correlation ${ambiguity_element}`,
                `The evacuation plans of several key buildings, a maneuver likely ordered by ${finalboss.name}, under questionable pretenses catches your attention. "A diversion crafted by ${finalboss.boss}?" you speculate, the circumstances ${ambiguity_element}`,
                `Discovery of detailed city blueprints, after defeating ${enemy.boss}, alongside notes on public gatherings and infrastructure vulnerabilities, alarms you. "Is this ${finalboss.name} strategizing for terror?" you ponder, the information ${ambiguity_element}`,
                `Among the debris of the recent skirmish, a set of encrypted ${gizmo}s is discovered. "Communication by  ${finalboss.name}, for coordinated chaos?" you muse, the devices ${ambiguity_element}`,
                `In the aftermath, you find meticulously drawn maps of Ransom with certain areas circled. "Targets or diversions for  ${finalboss.name}?" you ponder, the ambiguity of the markings ${ambiguity_element}`,
                `Investigating the site you finally come across a whiteboard covered in complex timelines and event predictions, with clear ${finalboss.name} handiwork. "Plotting out terror, or preventing it?" you debate, the timelines ${ambiguity_element}`,
                `Recovered documents contain fragmented discussions about disrupting the city's equilibrium. "${finalboss.name} is sowing chaos, but how?" you reflect, the documents ${ambiguity_element}`
                ];
            break;
    }

    gatherclues = masterplanclues;
}


    let planning = [`. You decide to pay them a visit.`, `. Agent Fletch suggests you continue your investigations there.`, `. A frightened ${bystanders} begs you to hurry up!`, `, and you think there really is no other option than to investigate.`, `. Perhaps it is time to visit ${nextenemy.boss}.`,`. This new insight leaves you with no choice but to take immediate action.`,`. With the information in hand, your next move is clear. The team is ready to follow your lead.`,`. The intel points towards a pivotal next step; hesitation is no longer an option.`,`. Now, with a clearer picture, it's time to plan your next strategic move.`,`. The revelations compel you to act swiftly; there's much to be done.`,`. Armed with this knowledge, you're one step closer to thwarting their plans.`,`. The pieces are coming together, prompting an urgent response.`,`. With these clues unraveled, the path forward is undeniable.`,`. This information is the key you needed; now it's time to unlock the next door.`,`. Understanding their motives better now, you prepare to counter their next move.`]

    let finalclue = randFrom([
        `where ${finalboss.boss} is waiting for you.`,
        `where your final showdown will go down!`,
        `the critical piece of information that leads you to the location of ${finalboss.boss}!`,
        `where ${finalboss.boss} is!`,
        `where the fight to end this will be.`,
        `the location where your ultimate destiny lies.`,
        `${nextenemy.boss} in fact is where all the clues were pointing at.`,
        `the very heart of ${possessiveSuffix(finalboss.boss)} masterplan, where the decisive battle awaits.`,
        `the place where history will be made in your confrontation with ${finalboss.boss}.`,
        `the exact coordinates of ${possessiveSuffix(finalboss.boss)} location, marking the beginning of the end.`,
        `the ultimate arena, chosen by ${finalboss.boss} for your final clash.`,
        `where ${possessiveSuffix(finalboss.boss)} plots have ripened in the shadows, awaiting your arrival with bated breath.`,
        `the culmination of your journey, directly leading you to ${possessiveSuffix(finalboss.boss)} lair.`,
        `the nexus of fate, where you and ${finalboss.boss} will decide the future.`,
        `the last stand of ${finalboss.boss}, where all scores will be settled.`,
        `the ground zero of your saga, pinpointing ${possessiveSuffix(finalboss.boss)} last defiance.`,
        `the showdown site with ${finalboss.boss}, where legends will be forged and fates sealed.`,
        `the gateway to ${finalboss.boss}, where the final act of this drama unfolds.`,
        `the stage is set at the location of ${possessiveSuffix(finalboss.boss)} choosing, where the ultimate test of courage beckons.`,
        `the final battlefield, meticulously chosen by ${finalboss.name} for their endgame.`,
        `the epicenter of conflict, where ${finalboss.boss} awaits to challenge the very essence of your resolve.`
        ])
    let finality = randFrom([``, `You're going to stop this once and for all.`, `You prepare for a fight this one last time.`, `This is it!`, `This is the end, at last.`, `No escape for ${finalboss.boss} now!`, `You can almost taste the victory!`, `Everything has led to this moment.`, `It is in your hands now.`, `The time has come for your final confrontation!`, `You know this, the final confrontation, won't be easy!`])

    let victoryresult = (nextstage >= $("#storylength").val() * 2 - 3) ? randFrom(gatherclues).replace(" that", "").replace("continues", "reveals") + " " + finalclue + "<br><br>" + finality : randFrom(gatherclues) + " " + clue + randFrom(planning)

    return victoryresult
}

function determineNextStage(stageindex, story, result) {

    let nextstage = Math.ceil(stageindex / 2) * 2 + 1 + result

    if (stageindex >= $("#storylength").val() * 2 - 3) { nextstage = 0 }

    return nextstage
}

function getRandomMinions(enemy, getdeck = false) {

    let clones = randFrom(enemiescopy)

    while (clones.name === enemy) { clones = randFrom(enemiescopy) }

    if (getdeck == false) {
        return `choose ${randFrom([clones.minionnames[0], clones.minionnames[1]])} from the ${clones.name} deck as the minion`
    } else { return clones.name }
}


function setUpInstructions2(stageindex, enemy, rival, ally, knowledge, stagebonus, stagemalus) {

    let addrival

    ally == null ? ally = rival : () => { }

    let penalty = Math.max(0, Math.round(stageindex / 3))

    if (knowledge == "clueless") {
        penalty = penalty + 1
    } else if (knowledge == "hottrail") {
        penalty = penalty - 1
    } else { penalty = penalty }

    //gladiator, stage and boss  difficulty, if implemented :

    //penalty = penalty + round(round(grating)+srating+brating)

    //add cards that add to story pool
    //gettin a positive card nets increased difficulty!

    penalty < 1 ? addrival = false : addrival = randFrom([true, false])

    let preparedboss = randFrom(enemy.preparedboss)

    let genericbonus = [
        { allysetup: `Put ${ally.name} (ally) into play.`, prologue: "guide" },
        { setup: `Each fighter may take a second mulligan.` },
        { setup: `Each fighter gains 2 random defense tokens.` },
        { setup: `Search the enemy deck for ${preparedboss[0]} and discard it. Shuffle the enemy deck.` },
        { setup: `Each fighter may draw one loot card.` },
        { setup: `Each fighter may draw one card and gain 1 defense token of their choice.` }, // exhaust to attack with guard
        { persisent: `<b>Exhaust:</b> Choose one unengaged fighter to draw one card.` }, // feint to draw loot?ß
        { activate: `Each engaged fighter gains 1 power for each enemy engaged with them. Each unengaged fighter heals 1 damage.` },
        { rivalsetup: `Put ${rival.name} (rival) into play.`, wincondition: [`If ${rival.name} is defeated:`, `If ${rival.name} is not defeated:`], prologue: "rival" }
    ]

    let intel_words = [`the intel`, `the evidence`, `the intelligence`, `the information`, `what was needed`]
    let acquire_words = [`acquired`, `obtained`, `collected`, `found`, `discovered`, `learned`, `tracked down`]
    let interrogate_words = randFrom([`interrogated`, `questioned`, `examined`])
    let intel_goal = `${randFrom(acquire_words)} ${randFrom(intel_words)}`

    let angryrival = [
        { setup: `${rival.name} (rival) gains 1 of each type of defense token, and is placed within 3 spaces of a fighter. Activate ${rival.name} (rival).`, rivalboost: true },
        { activate: `${rival.name} (rival) gains 1 random defense token and advances 2 spaces toward the nearest fighter.`, rivalboost: true },
        { activate: `${rival.name} (rival) gains 2 random defese tokens.`, rivalboost: true },
        { activate: `${rival.name} (rival) gains gains 1 defense token from each fighter ${gPron(rival, "subject")} is engaged to.`, rivalboost: true },
        { activate: `The fighter furthest from ${rival.name} (rival) discards 1 power.`, rivalboost: true },
        { wincondition: [`If the fighters win and ${rival.name} is defeated:`, `If ${rival.name} is not defeated:`], prologue: "rival" },
        { persistent: `If ${rival.name} is engaged with one or more fighters, each of those fighters places 1 power on this card. If there is 3P power on this card, you've ${intel_goal}`, wincondition: [`If you have ${intel_goal}:`, `If you have not ${intel_goal}:`], prologue: "rival" },
        { setup: `Each fighter may search their deck for 1 Tactic card to put into play. ${rival.name} (rival) gains 3P of each type of defense token.`, wincondition: [`If the fighters win and ${rival.name} is defeated:`, `If ${rival.name} is not defeated:`], prologue: "rival" },
        { activate: `If ${rival.name} (rival) is in play, each fighter discards 2 defense tokens of different types. For each fighter that did not, deal that fighter and each figure adjacent to them 3 general damage.`, rivalboost: true }
    ]

    let penalties = [
        { activate: `If ${enemy.boss} is unengaged, ${gPron(enemy, "subject")} gains 1 defense token.` },
        { setup: `Reveal cards from the ${getRandomMinions(enemy.name, true)} deck until 1P minions are revealed. Each fighter puts one of the revealed minions in their threat area, and puts their figure into play. When one of these minions is defeated, that minion is removed from the game.` },
        { setup: `Each fighter randomly discards 1 card.` },
        { activate: `Each fighter discards 1 defense token.` },
        { setup: `Each fighter suffers 2 direct damage.` },
        { setup: `Search the enemy deck for ${preparedboss[0]}, ${preparedboss[1]}. Shuffle the enemy deck.` },
        { setup: `${enemy.boss} gains 2 defense tokens of each type.` },
        { setup: `Place 3P power on this card.`, activate: `Each fighter discards 1 defense token. For each fighter that did, remove 1 power from this card. If no power remains on this card, you have rescued the innocent.`, wincondition: [`If you win and have rescued the innocent:`, `If you have not rescued the innocent:`], prologue: "hostages" },
        { persistent: `${enemy.boss} gains +1 attack value.` },
        { persistent: `${enemy.boss} gains ${enemy.boss == "Ah Long" ? "2P" : "4P"} health value.` },
        { activate: `The fighter furthest from ${enemy.boss} within 4 spaces of ${gPron(enemy, "object")} discards 1 power.` },
        { activate: `Each fighter discards 1 power or 1 defense token of their choice.` },
        { allysetup: `Put ${ally.name} (ally) into play.`, wincondition: [`If the fighters win and ${ally.name} is not defeated:`, `If ${ally.name} is defeated:`], prologue: "escort" },
        { allysetup: `Put ${ally.name} (ally) into play.`, setup: `Put this card in one fighter's threat area.`, activate: `If ${ally.name} (ally) is ready, gain 1 power`, wincondition: [`If the fighters win and ${ally.name} is not defeated:`, `If ${ally.name} is defeated:`], prologue: "escort" },
        { persistent: `Put 2P power on this card. <b>Interact:</b> If engaged with ${enemy.boss}, discard 1 defense token of a type of which ${gPron(enemy, "subject")} has 0 of to discard 1 power from this card and if no power remains, ${enemy.boss} is successfully ${interrogate_words}.`, wincondition: [`If the fighters win and ${enemy.boss} is ${interrogate_words}:`, `If ${enemy.boss} is not ${interrogate_words}:`], prologue: "intel" },
        { persistent: `<b>Interact:</b> If you are in a crate space, you may discard 1 of each type of defense token on this card. Once there is 1P of each defense token on this card, you have ${intel_goal}.`, activate: `Each fighter discards 1 defense token for each space the nearest crate space is from them.`, wincondition: [`If the fighters win and have ${intel_goal}:`, `If you have not ${intel_goal}:`], prologue: "intel" },
        { persistent: `Each time a fighter discards a crate token, that fighter may place that crate token on this card instead of drawing a loot card. <b>Interact:</b> For each crate token on this card, you may reveal 1 card from the loot deck. Choose 1 revealed card to give to any fighter, then shuffle the rest of the cards back into the loot deck. If 5 crate tokens are on this card, you ${intel_goal}`, wincondition: [`If the fighters win and have ${intel_goal}:`, `If you have not ${intel_goal}:`], prologue: "intel" },
        { persistent: `If there is 3P power on this card at the end of the game, you have ${intel_goal}. <b>Exhaust:</b> Each fighter in a crate space may place 1 power on this card.`, wincondition: [`If the fighters win and have ${intel_goal}:`, `If you have not ${intel_goal}:`], prologue: "intel" },
        { activate: `Every fighter not engaged with an enemy must discard 1 power and 1 defense token of their choice.` },
        { persistent: `Place 5P power tokens on this card. After a fighter defeats an enemy in their threat area, they may discard 1 defense token to gain 1 power from this card. If there is no power on this card, you have ${intel_goal}.`, activate: `Place 1 power on this card for any unengaged enemy except for the boss.`, wincondition: [`If the fighters win and have ${intel_goal}:`, `If you have not ${intel_goal}:`], prologue: "intel" },
        { allysetup: `Put ${ally.name} (ally) into play.`, persistent: `If ${ally.name} (ally) would be dealt any damage, deal it to one fighter instead.`, prologue: "escort" },
    ]

    addrival ? penalties = _.union(penalties, angryrival) : penalties = penalties

    let directions = []

    Array.isArray(stagebonus) ? stagebonus = randFrom(stagebonus) : () => { }
    Array.isArray(stagemalus) ? stagemalus = randFrom(stagemalus) : () => { }

    if (penalty < 0) { directions.push(randFrom([stagebonus, randFrom(genericbonus)])) }
    else if (penalty == 0) { directions = directions }
    else if (penalty == 1) {
        addrival ?
            directions.push({ rivalsetup: `Put ${rival.name} (rival) into play.` }) :
            directions.push(randFrom([stagemalus, randFrom(penalties)]))
    }
    else {
        addrival ?
            (directions.push({ rivalsetup: `Put ${rival.name} (rival) into play.` }), directions.push(randFrom([stagemalus, randFrom(penalties)]))) :
            (directions.push(randFrom(penalties)), directions.push(stagemalus))
    }

    let persistence = false
    let activate = false
    let rivalboost = false
    let allysetup = false
    let rivalsetup = false
    let setuptext = ""
    let activatetext = ""
    let persistenttext = ""
    let wincondition = [`If the fighters win:`, `If the fighters lose:`]
    let prologue = ""

    $(directions).each(function () {
        this.hasOwnProperty("setup") ? (setuptext = `${setuptext} ${this.setup}`) : () => { }
        this.hasOwnProperty("activate") ? (persistence = true, activate = true, activatetext = `${activatetext} ${this.activate}`) : () => { }
        this.hasOwnProperty("persistent") ? (persistence = true, persistenttext = `${persistenttext} ${this.persistent}`) : () => { }
        this.hasOwnProperty("allysetup") ? (allysetup = true, setuptext = `${setuptext} ${this.allysetup}`) : () => { }
        this.hasOwnProperty("rivalsetup") ? (rivalsetup = true, setuptext = `${setuptext} ${this.rivalsetup}`) : () => { }
        this.hasOwnProperty("rivalboost") ? rivalboost = true : () => { }
        this.hasOwnProperty("wincondition") ? wincondition = this.wincondition : () => { }
        this.hasOwnProperty("prologue") ? prologue = this.prologue : () => { }
    })

    let instructions = `<b>Stage Setup:</b> ${setuptext}${persistence ? ` Put this card into play in the stage play area.` : ""} ${persistence ? persistenttext : ""}${activate ? ` <b>Activate:</b> ` : ""}${activate ? activatetext : ""}`

    instructions.trim() == "<b>Stage Setup:</b>" ? instructions = `<b>Stage Setup:</b> No special setup` : () => { }

    return ({ setup: instructions, allysetup: allysetup, rivalsetup: rivalsetup, rivalboost: rivalboost, wincondition: wincondition, prologue: prologue })

}

function createLeadIn(pregameprologue, stageindex, wincondition, enemy, stage, finalboss, rival, ally) {
    function trueMastermind() {
        true_words = ["true", "real", "paramount", "utmost"]
        mastermind_words = ["mastermind", "architect", "engineer", "intellect", "prime mover"]
        description_words = [`recent`, `devious`, `criminal`, `insidious`]
        plot_words = [`plot`, `masterplan`, `events`, `incidents`]
        finalboss_words = [`the ${randFrom(description_words)} ${randFrom(plot_words)}`, `the ${randFrom(description_words)} ${randFrom(plot_words)}`, `${finalboss.boss}`, `the ${finalboss.name}`]
        return `the ${randFrom(true_words)} ${randFrom(mastermind_words)} behind ${randFrom(finalboss_words)}`

    }

    pregameprologue = stageindex == 0 ? pregameprologue : ``
    let find_out_words = [`you discover`, `you find out`, `you learn of`, `you get wind of`, `you determine`, `it seems`, `turns out`]
    let this_boss = finalboss.name == enemy.name ? enemy.boss : randFrom([enemy.boss, `the ${enemy.name}`])
    let this_finalboss = finalboss.name == enemy.name ? finalboss.boss : randFrom([finalboss.boss, `the ${finalboss.name}`])
    if (stageindex >= Math.max($("#storylength").val() * 2 - 3, 0) || finalboss.boss == enemy.boss) { this_finalboss = trueMastermind() }
    let intel_words = ["intel", "intelligence", "information", "a clue", "a word", "lowdown"]
    let location_words = ["locale", "location", "whereabouts", "position", "scene", "station", "bearings"]
    let investigator_words = ["Citadel analysts", "you", "Agent Fletch and you"]
    let citadel_words = [`the Gladiators`, `you`, `Citadel`, `Global Gladiators`, `Agent Fletch`]
    let assumption_words = ["believe", "consider", "conclude", "suppose", "think", "regard", "assume", "postulate", "deem", "surmise", "resolve"]
    let decision_words = [`resolve`, `determine`, `come to a decision`, `decide`, `come to a conclusion`]
    let priority_words = [`a priority`, `a first concern`, `the most pressing matter`, `the most important consideration`, `most important`, `takes precedence`]
    let turns_out_words = [`it turns out`, `it emerges`, `it comes to light`, `it transpires`, `you find out`, `${randFrom(investigator_words)} ${randFrom(assumption_words)}`]
    let intel_words_2 = [`intel`, `evidence`, `intelligence`, `information`]

    let first_is_final = enemy.boss != finalboss.boss && stageindex == 0 ?
        `Without ${randFrom(intel_words)} on the current ${randFrom(location_words)} of ${finalboss.boss}, ${randFrom(investigator_words)} ${randFrom(assumption_words)} ${enemy.boss} is the best source for more information.<br><br>` : ``

    let hence_words = [`Accordingly`, `Hence`, `So`, `Consequently`, `Therefore`, `Thus`]
    let default_clues = [
        "Based on current intel", "Chasing the clues", "Following your leads", "In pursuit of clues", "After a little more intel-gathering", "Following this lead", "As you investigated further", "After searching for more intel", "Following the intel you had", "After searching for more information", "Reviewing what you got", "With the information you gathered", `You tracked down some of the ${enemy.name} associates and tailed their movements. ${randFrom(hence_words)}`, `Following the trail of money leading from the previous encounter`, `"We've traced them," Agent Fletch says, seated across the table. He takes out a satellite image and lays it on the table, pointing to a small red dot near the image's center. ${randFrom(hence_words)}`, `"Here," Agent Fletch stabs his finger onto the table, pointing on a map unfolded there. "Is where there your next stop is." ${randFrom(hence_words)}`, `"The ${randFrom(intel_words_2)} has been confirmed," the Citadel analyst turns from ${randFrom([`his`, `her`])} computer. ${randFrom(hence_words)}`,
        `A Vandal-addicted informat had some oddly specific ${randFrom(intel_words_2)}, and you decided to check how it fits with what you already knew. Surprised by the accuracy`,
        `Your ${randFrom(intel_words_2)} was not specific enough, but a mysterious government official approaches you to lead you further. "The most important thing is that you cannot tell anyone that I was here or that we spoke," ${randFrom([`he`, `she`])} reminds you. ${randFrom(hence_words)}`,
        `"With the clues pieced together," you remark, looking over the compiled data. "It's time we follow where they point." ${randFrom(hence_words)}`,
        `"This breadcrumb trail is leading us somewhere," you muse aloud, studying the patterns of the enemy's recent activities. ${randFrom(hence_words)}`,`"Our latest intel sheds new light on their operations," your teammate observes, handing you a file of gathered evidence. ${randFrom(hence_words)}`,`"Cross-referencing the information," you begin, laying out the connections on the digital map. "Leads us right here." ${randFrom(hence_words)}`,`After decrypting the last of the ${randFrom(intel_words_2)}, "We've got a lead worth chasing," you declare. ${randFrom(hence_words)}`,`"This snippet," you replay the audio, "pinpoints their next move." ${randFrom(hence_words)}`,`"The satellite images don't lie," you note, zooming in on a suspicious compound. "They've been busy." ${randFrom(hence_words)}`,`"Their mistake was leaving traces," you say, scanning through ${randFrom(intel_words_2)}. "Now, we're on their trail." ${randFrom(hence_words)}`,`"The ledger reveals more than they intended," you point out, highlighting the anomalies. "Follow the money." ${randFrom(hence_words)}`,`"Detaled analysis of the recovered ${randFrom(intel_words_2)} confirms us our next target." ${randFrom(hence_words)}`,`"The pattern is no coincidence," you deduce, plotting out the ${randFrom(intel_words_2)} you have over your map. "It all connects here." ${randFrom(hence_words)}`,`After a confidential informant comes forward, "This might just be the breakthrough we needed," you realize. ${randFrom(hence_words)}`,`"Correlating the ${randFrom(intel_words_2)} with the witness statements," you conclude, "points us directly to their next operation." ${randFrom(hence_words)}`,`"Surveillance footage gave us the last piece," you highlight the key moments. "Time to act on it." ${randFrom(hence_words)}`,`"The intercepted communique is clear," you decipher the coded message with the aid of existing ${randFrom(intel_words_2)}. "Their next move is imminent." ${randFrom(hence_words)}`
    ]
    let wincondition_txt = ""

    if (wincondition == "intel") {

        let evidence_clues = [
            ` that ${this_boss} possesses unexpected insights into ${possessiveSuffix(this_finalboss)} weaknesses and strategies.`,
            ` reveals ${this_boss} has meticulously compiled ${randFrom(intel_words_2)} on the hidden agendas of ${this_finalboss}.`,
            ` uncovers ${this_boss} secretly harboring ${randFrom(intel_words_2)} crucial for dismantling ${this_finalboss}'s network.`,
            ` indicates ${this_boss} recently brokered a deal with ${this_finalboss}, exchanging sensitive ${randFrom(intel_words_2)} for mutual benefit.`,
            ` that ${this_boss} was once a confidant of ${this_finalboss}, privy to intimate ${randFrom(intel_words_2)} on ${possessiveSuffix(this_finalboss)} plans and vulnerabilities.`,
            ` shows ${this_boss} maintains a covert communication channel with ${this_finalboss}, offering a direct line to intercept critical ${randFrom(intel_words_2)}.`,
            ` suggests ${this_boss} holds the key to deciphering ${this_finalboss}'s next move, thanks to a cache of encrypted ${randFrom(intel_words_2)}.`,
            ` that ${this_boss} has been tracking ${this_finalboss}'s movements and alliances, amassing a detailed dossier that could expose ${possessiveSuffix(this_finalboss)} ultimate endgame.`
        ]
        let acquire_words = [`obtaining`, `acquiring`, `securing`, `procuring`, `getting`, `finding`]
        let priority_words = [`a priority`, `a first concern`, `the most pressing matter`, `the most important consideration`, `most important`, `takes precedence`]
        let decision_txt = `${ucInit(randFrom(investigator_words))} ${randFrom(decision_words)} ${randFrom(acquire_words)} the ${randFrom(intel_words_2)} is ${randFrom(priority_words)}.`
        wincondition_txt = `${ucInit(randFrom(find_out_words))}${randFrom(evidence_clues)} ${decision_txt} ${randFrom(hence_words)}`

    } else if (wincondition == "rival") {

        let rivals_fate_words = [`capturing`, `seizing`, `arresting`, `catching`, `interrogating`, `grilling`, `questioning`]
        let rival_capture = `${ucInit(randFrom(investigator_words))} ${randFrom(decision_words)} ${randFrom(rivals_fate_words)} ${gPron(rival, "object")} is ${randFrom(priority_words)}`

        wincondition_txt = randFrom([
            `${ucInit(randFrom(find_out_words))} ${this_boss} has an associate who knows more about the plans of ${this_finalboss}. ${rival_capture}. ${randFrom(hence_words)}`,
            `${ucInit(randFrom(find_out_words))} ${this_boss}  is linked to an insider with key insights on the operations of ${this_finalboss}. ${rival_capture}. ${randFrom(hence_words)}`
        ])

    } else if (wincondition == "escort") {

        let escort_prologue = [
            `${ally.name} has agreed to share ${gPron(ally, "possessive")} ${randFrom(intel_words_2)} on ${this_finalboss} if you help ${gPron(ally, "object")} with ${this_boss}.`,
            `${randFrom(default_clues)}, ${randFrom(turns_out_words)} that ${ally.name} has ${randFrom(intel_words_2)} on ${this_finalboss}. You need to make sure ${gPron(ally, "subject")} survives for ${randFrom(investigator_words)} to get that ${randFrom(intel_words_2)}.`,
            `${ally.name} has approached ${randFrom(citadel_words)} for assistance in exchange for ${randFrom(intel_words_2)} on ${this_finalboss}. ${ucInit(gPron(ally, "subject"))} needs your protection from ${this_boss}.`,
            `${ally.name} is on a parallel Citadel mission to yours, and you need to protect ${gPron(ally, "object")} so ${gPron(ally, "subject")} can obtain whatever ${randFrom(intel_words_2)} ${gPron(ally, "subject")} is after.`,
            `After the previous encounter, you see a familiar silhouette materialize from the smoke and dust before you: ${ally.name}. Your occasional ally approaches, smirking slyly. "Fancy meeting you here", you say to ${gPron(ally, "object")}. "Thanks for the heads-up." ${ucInit(gPron(ally, "subject"))} claps ${gPron(ally, "possessive")} hand on your shoulder. "Help me defeat ${enemy.desc}, and I will tell you all about ${this_finalboss}."`,
            `"${ally.name}!" you shout at ${gPron(ally, "object")}. "Is this on you? What do you know about ${this_finalboss}?" "I can tell you something," ${gPron(ally, "subject")} answers. "But not for nothing. Are you willing to help me with something?"`,
            `As you navigate through the remnants of a recent skirmish, a coded message from ${ally.name} lands in your hands. "I've got a lead on ${this_finalboss}," the note reads, "but I'm in a tight spot with ${this_boss}. Lend a hand?" It seems your paths are intertwined once more.`,
            `"Look who it is," ${ally.name} exclaims, emerging from the shadows. "Got a bit of a situation here involving ${this_boss}. Sort this out with me, and I've got crucial info on ${this_finalboss}." Trust and suspicion mingle in the air as past alliances are put to the test.`,
            `In the hush of a clandestine meeting, ${ally.name} lays out a map, fingers tracing a path to ${possessiveSuffix(this_boss)} location. "We strike here, we strike hard," ${gPron(ally, "subject")} asserts. "And after? I'll spill everything I know about ${this_finalboss}." The promise of secrets untold sharpens your resolve.`,
            `A sudden alliance forms in the chaos as ${ally.name} steps from ${this_boss} ranks, a defector with invaluable knowledge. "I can help you with ${this_finalboss}," ${gPron(ally, "subject")} proposes, "but first, we deal with ${this_boss}." A flicker of trust sparks amidst the turmoil, offering a beacon of hope.`
        ]
        wincondition_txt = `${randFrom(escort_prologue)} ${randFrom(hence_words)}`

    } else if (wincondition == "guide") {

        let guide_prologue = [
            `You meet ${ally.name} on the corner of a warehouse. "Glad you found the place alright," ${ally.name} says. "This is a big catch," you answer. "Good work finding it." "It's easy to find ${enemy.name} activity if you merely keep your eyes open," ${ally.name} responds. "Let's do this," you say.`,
            `${ally.name} follows you and gives you a warning. "${enemy.boss} will make you regret your challenge, Gladiators," ${gPron(ally, "subject")} calls. "Prepare to meet your fate by ${gPron(enemy, "possessive")} hands." "Hah" you laugh. "I better come and show the right approach," ${ally.name} says, unamused by your flippant attitude.`,
            `The Citadel has assigned you a handler for this mission. "I don't understand," you say, looking at ${ally.name} with skepticism. "Why such a reckless attack plan? Agent Fletch would not risk everything like this." "I'm not Agent Fletch," ${ally.name} says. "Now prepare yourself, and we are almost out of time."`,
            `The Citadel has assigned you a handler for this mission. "And what of now?" you ask, frustrated with the unexpected addition. "Today, I will personally oversee your actions and I will give detailed report to my superiors," ${ally.name} answers.`,
            `"It is dangerous out there. You shouldn't go alone," ${ally.name} tells you. "Take me with you."`,
            `"I see you have taken the lonely path", you tell ${ally.name} in your chance meeting. "I care not about company. I care about vengeance," ${gPron(ally, "subject")} answers. "I take you have tracked ${enemy.boss} down?"`,
            `A mysterious stranger approaches you. "I can help you with the ${enemy.name}," a voice of a ${gPron(ally, "sex")} calls you from the shadows. You're sure you've heard that voice before. "Are you.. ${ally.name}? Why the mystery?"`,
            `"Under the cover of night, ${ally.name} slips from the darkness to join you. "Every shadow conceals secrets, and every secret is a weapon," ${gPron(ally, "subject")} murmurs, eyeing your battle plan. "Tonight, we turn their secrets against them."`,
            `In a quiet, tension-filled moment, ${ally.name} appears at your side, as if conjured by the very need for an edge in the looming battle. "In the art of war, knowledge is power," they intone. "Let's ensure we're the ones wielding it tonight."`,
            `"This mission could change everything," you assert, finding ${ally.name} already surveying the analysts' plan with experienced eye. "Indeed," ${gPron(ally, "subject")} agrees, offering a rare smile of camaraderie. "And it's the reason I'm here. Together, we'll turn the tide."`,
            `As dawn breaks, casting long shadows over your rendezvous point, ${ally.name} approaches with a determined stride. "The early bird," ${gPron(ally, "subject")} quips, handing you a dossier. "Gets the intel. Let's make sure it also gets the worm."`
        ]
        wincondition_txt = `${randFrom(guide_prologue)} ${randFrom(hence_words)}`

    } else if (wincondition == "hostages") {

        let bystander_words = [`bystanders`, `people`]

        let protection_prologue = [`there are numerous innocent ${randFrom(bystander_words)} in the area, and protecting them is ${randFrom(priority_words)}`]

        wincondition_txt = `${randFrom(default_clues)} ${randFrom(find_out_words)} ${randFrom(protection_prologue)}. ${randFrom(default_clues)}`

    } else { wincondition_txt = randFrom(default_clues) }

    let lead_in = pregameprologue + first_is_final + wincondition_txt
//console.log(wincondition)
//console.log(wincondition_txt)
    return lead_in
}

function getGizmo() {
    return randFrom(["data disc", "keycard", "tape recorder", "floppy disc", "microchip", "communicator", "cell phone", "diskette", "data cartridge", "tablet", "magnetic tape", "computer","laser disc","minidisc","memory ribbon","data crystal","neural interface card","cyberdeck","video wristwatch"])
}

function removeLastBrBr(str) {
if (str.endsWith("<br><br>")) {
// Remove "<br><br>" only at the end of the string
return str.substring(0, str.length - "<br><br>".length);
}
// If "<br><br>" is not at the end, return the original string
return str;
}

function createPrologue(stageindex, story, alliesandrivals, heronames, enemies, pregameprologue, vip, herodialogue) {
    let finalboss = story[Math.max($("#storylength").val() * 2 - 3, 0)].enemy
    let finalstage = story[Math.max($("#storylength").val() * 2 - 3, 0)].stage
    let enemy = story[stageindex].enemy
    let stage = story[stageindex].stage
    let rival = allyNamer(alliesandrivals, enemy, heronames, finalboss)
    let ally = allyNamer(alliesandrivals, enemy, heronames, finalboss)
    let knowledge = stage.knowledge
    let minion = randFrom(enemy.minionnames)
    let instructions = setUpInstructions2(stageindex, enemy, rival, ally, knowledge, stage.stagebonus, stage.stagepenalty)
    let allypresence = instructions.allysetup
    let rivalpresence = instructions.rivalsetup
    let rivalboost = instructions.rivalboost
    let trail = createLeadIn(pregameprologue, stageindex, instructions.prologue, enemy, stage, finalboss, rival, ally)
    let setup = `<b>${stage.name}: ${enemy.name} ${enemy.name == "Kingdom" ? `(${enemy.boss})` : ""}</b><br>` + ((stage.name == "Original Copy") ? ucInit(getRandomMinions(enemy.name)) + ".<br>" : ``) + instructions.setup
    let win = determineNextStage(stageindex, story, 0)
    let lose = determineNextStage(stageindex, story, 1)
    let gizmo = getGizmo()

    let smallvictory = randFrom([
    `You could not stop ${finalboss.boss}, but your efforts were not in vain, as a threat as serious was neutralized. `,
    `While the shadow of ${finalboss.boss} looms large, your valor shines through the darkness. You may not have crossed paths with the ultimate foe, yet the downfall of ${enemy.boss} marks a critical blow to their nefarious plans. Ransom City breathes easier tonight, saved from a catastrophe just as dire, thanks to your unwavering courage. `,
    `The elusive ${finalboss.boss} remains at large, a reminder of the battles yet to come. However, your triumph over ${enemy.boss} has severed a crucial arm of their dark ambitions. This victory, though not the final confrontation you sought, is a testament to your strength and a beacon of hope in the fight against the encroaching darkness. `,
    `Though ${finalboss.boss} eludes justice for now, your strategic dismantling of ${possessiveSuffix(enemy.boss)} plan has dealt a significant blow to their operations. Each step you take unravels the web of terror they sought to weave. Today, you have proven that even in the face of elusive evil, the light of hope cannot be extinguished. `,
    `In the chase for ${finalboss.boss}, fate took a different turn, leading you to confront and overcome ${enemy.boss}. Your success has not only thwarted an immediate threat but has also sown seeds of resilience and defiance against the darkness. The path ahead remains fraught with peril, but your actions have ensured that hope endures. `,
    `Agent Fletch’s voice crackles through the comms, "You might not have caught ${finalboss.boss}, but taking down ${enemy.boss} has sent shockwaves through their ranks. You've done more than just win a battle; you've sown chaos among our enemies. That's a victory in its own right. Well done."" His words serve as a reminder that every action contributes to the larger fight for justice.`,
    `In the aftermath of the clash, Agent Fletch meets you with a steady gaze. "Missing ${finalboss.boss} stings, I won’t lie,' he admits, 'but don’t overlook the victory you've claimed today. Defeating ${enemy.boss} was no small feat. It's a testament to your dedication and skill. We're closer to our goal because of what you've accomplished."`
    ])

    let winepilogue = stageindex >= Math.max(($("#storylength").val() * 2 - 3), 0) ? finalResult(stage, enemy, rival, vip, 1) + "<br><br>" + `${finalboss.boss != enemy.boss ? smallvictory : ``}The fighters win this story.` : victoryResult(stageindex, story, win, gizmo, finalstage.masterplan)
    let loseepilogue = stageindex >= Math.max(($("#storylength").val() * 2 - 3), 0) ? finalResult(stage, enemy, rival, vip, 0) + "<br><br>" + `The fighters lose this story.` : loseResult(stageindex, story, lose, gizmo, instructions.prologue, rival, rivalpresence, ally)
    let gloat = gloatingList(enemy, stage, herodialogue, heronames)
    let prologue
    let casino = getCasino(enemy)

    let masterplan = stage.masterplan

    gloat === undefined ? console.log(stage) : ``
    gloat === undefined ? console.log(enemy) : ``

    //stage.name == "Casdft" && knowledge != "" ? console.log(stage.name + Math.random()) : ``

    let template_settings = { "finalboss": finalboss, "enemy": enemy, "rival": rival, "minion": minion, "gloat": gloat, "rivalpresence": rivalpresence, "rivalboost": rivalboost, "stageindex": stageindex, "knowledge": knowledge, "gizmo": gizmo, "trail": trail, "casino": casino, "vip": vip, "approach": stage.approach }

    let stageriv = stage.rivaltext(template_settings)

    template_settings["rivaltext"] = stageriv

    //if(stage.name === "Steel Memories") { console.log(stage.name) }

    let stagevar
    switch (knowledge) {
        case "hottrail": stagevar = stage.hottrail()(template_settings);
            break;
        case "coldtrail": stagevar = stage.coldtrail()(template_settings);
            break;
        case "clueless": stagevar = stage.clueless()(template_settings);
    }

    template_settings["stagevar"] = stagevar
    stage.hasOwnProperty("finalvar") ? template_settings["finalvar"] = stage.finalvar(template_settings) : ``

    if (knowledge == "captured") {
        prologue = stage.captured(template_settings)
    } else if (stageindex >= Math.max($("#storylength").val() * 2 - 2, 0) && enemy.boss != finalboss.boss) {
        masterplan = stage.masterplan
        stageindex != 0 ? template_settings.trail = changeOfPlans(trail, finalboss, enemy, stage) : ``
        stage.hasOwnProperty(masterplan) ? prologue = stage[masterplan](template_settings) : prologue = stage.prologue()(template_settings)
    } else if (stageindex >= Math.max($("#storylength").val() * 2 - 3, 0) && stage.hasOwnProperty(masterplan) && knowledge != "clueless") {
        prologue = stage[masterplan](template_settings)
    } else {
        prologue = stage.prologue()(template_settings)
    }


    return { chapter: story[stageindex].chapter, prologue: removeLastBrBr(prologue), setup: setup, wincondition: instructions.wincondition, winepilogue: winepilogue, loseepilogue: loseepilogue }
}

function textMaker(story, alliesandrivals, heronames, enemies, herodialogue) {

    let cardtext
    let cardtexts = []
    let winepilogue = "Victory text"
    let loseepilogue = "Defeat text"
    let pregameprologue = preGamePrologue(story[Math.max($("#storylength").val() * 2 - 3, 0)].stage, story[Math.max($("#storylength").val() * 2 - 3, 0)].enemy)

    for (i = 0; i < story.length; i++) {
        cardtext = createPrologue(i, story, alliesandrivals, heronames, enemies, pregameprologue.storytext, pregameprologue.vip, herodialogue);
        cardtexts.push(cardtext)
    }

    return cardtexts

}

function changeOfPlans(trail, finalboss, enemy, stage) {


    let newintel = randFrom([
        `There is no time for regrets, and you need to leave the failure of stopping ${finalboss.boss} behind. ${preGamePrologue(stage, enemy).storytext}`,
        `Citadel analysts have gone over every bit of intel you have gathered on ${finalboss.boss}, but have nothing to go on. But there are more pressing concers. ${preGamePrologue(stage, enemy).storytext}`,
        `While you may have lost the fight, the battle is far from over. ${preGamePrologue(stage, enemy).storytext}`,
        `Focusing on ${finalboss.boss} has let other, just as devious issues grow. ${preGamePrologue(stage, enemy).storytext}`
    ])

    let conclusion = randFrom([
        `, you slowly come to the conclusion that you have failed to locate ${finalboss.boss}. But suddenly, Agent Fletch contacts you and says: "${newintel}"`,
        `, you decide you need to contact Agent Fletch for assistance, as you don't have a clue where to proceed. "${newintel}"`,
        `, you conclude that ${finalboss.boss} has won this time. ${newintel}`,
        `, you accept your defeat and retreat to Citadel HQ. ${newintel}`,
        `, you realize you will not be able to catch ${finalboss.boss}. Meeting up with Agent Fletch, he says: "${newintel}"`
    ])

    let hence_words = randFrom([`Accordingly`, `Hence`, `So`, `Consequently`, `Therefore`, `Thus`])

    conclusion = trail + conclusion + hence_words

    return conclusion
}

function finalResult(stage, enemy, rival, vip = null, result) {

    let masterplan = stage.masterplan
    let neutralize

    switch (masterplan) {
        case "kidnapping":
            neutralize = `${randFrom([`${vip[0]} is safely returned`, `${vip[0]} is rescued`, `${vip[0]} has been liberated from ${possessiveSuffix(enemy.name)} clutches`,`${vip[0]} has been aquired from the ${enemy.name}`])}`;
            break;
        case "personalpower":
            neutralize = `${randFrom([`power levels of the ${enemy.bosstitle()} remain in check`,`ambitions of ${enemy.boss} have been curtailed`, `ascent of ${enemy.boss} is halted`, `power surge of ${enemy.bosstitle()} is neutralized`])}`;
            break;
        case "strengtheningforces":
            neutralize = `${randFrom([`army of the ${enemy.name} has been neutralized`,`military buildup of ${enemy.name} is dismantled`, `the reinforcements of ${enemy.name} are dispersed`, `combat readiness of ${enemy.name} is weakened`])}`;
            break;
        case "actsofterror":
            neutralize = `${randFrom([`plan to destablize Ransom City has been countered`,`scheme to disrupt Ransom City's peace is thwarted`, `plot against Ransom City's stability is foiled`, `designs on terrorizing Ransom City has been upended`])}`;
            break;
        case "illegalgains":
            neutralize = `${randFrom([`plan to fund ${enemy.name} operations has been countered`,`financial channels of ${enemy.name} have been cut off`, `illicit funding streams ${possessiveSuffix(enemy.name)} are dried up`, `economic backbone of ${possessiveSuffix(enemy.boss)} operations is broken`])}`;
            break;
        default: neutralize = "plan is stopped"
    }

    let winresult = [
        `You have finally beaten the last of the minions of ${enemy.desc}, and try find their defeated boss. But ${gPron(enemy, "subject")} has disappeared! At least the ${neutralize}.`,
        `"The ${neutralize}," you report to Agent Fletch. "But ${enemy.boss} is nowhere to be found."`,
        `"Gladiator?" Agent Fletch's voice sounds in your ear, small and tinny from your damaged communicator. "What's the status?" You press your finger to the comm button. "The ${neutralize}," you respond, breathing heavily. "${enemy.boss} has been defeated but is nowhere to be found."`,
        `"You may have me," ${enemy.boss} says as the Citadel agents surround them. "But I am only one." Agent Fletch approaches. "Say goodbye to your precious ${enemy.name}," he says. ${randFrom([rival.name, randFrom(enemy.minionnames)])} laughs. "Who do you think you're working for?"`,
        `"You may think you have me," ${enemy.boss} says as the Citadel agents surround them. Suddenly, ${gPron(enemy, "subject")} starts to deteriorate, and in mere seconds, there's nothing but dust left. Agent Fletch approaches. "It must have been a clone! At least the ${neutralize}, that's a victory in my books."`,
        `In a blinding flash, ${enemy.boss} disappears just as Agent Fletch approaches. "The ${neutralize}," you report. "We may have won the battle, but the war is not over," Agent Fletch says.`,
        `You ensured that the ${neutralize}. As ${possessiveSuffix(enemy.boss)} minions flee, ${gPron(enemy, "subject")} wipes blood from ${gPron(enemy, "possessive")} mouth. "We're not done. This is MY city. The ${enemy.name} never forgets! So you better never show your face here again!" With that, they quickly fled in the darkness.`,
        `With each blow to ${enemy.boss}, ${gPron(enemy, "subject")} attempts to fight you off. Finally, ready to end it all, you swing with what will be your final attack, but suddenly there's blinding flash and  ${gPron(enemy, "subject")}'s gone. The ${neutralize}, nevertheless.`,
        `With ${enemy.boss} defeated, Citadel soldiers secure the area and you return home. Now that the ${neutralize}, the Mayor arranges a parade for the heroes of the city, and most of you get a medal!`,
        `Suddenly, there's a blinding flash and ${possessiveSuffix(enemy.boss)} gone! It's all gone. Shockingly, you're back at Citadel HQ, surrounded by agents all going about their business. Did all that even happen?`,
        `You are lying in the corner, exhausted, all enemies defeated - but their master is nowhere to be found. "You've done a hero's job, Gladiators. I guess you're through, huh?" Agent Fletch asks as he approaches you. "Finished," you answer wearily. "It's too bad we couldn't catch ${enemy.boss}. But then again, do we really ever?"`,
        `Your intense fight takes you to the edge of ${stage.hasOwnProperty(`pit`) ? stage.pit : `a bottomless pit`}. Just as you're about to strike ${enemy.boss} down, ${gPron(enemy, "subject")} dives in, and that's the last you see of ${gPron(enemy, "object")}. For now!`,
        `You are sure you have cornered ${enemy.boss} with no route of escape, when all of a sudden a sleek ${enemy.name} helicopter descends and ${gPron(enemy, "subject")} leaves, dangling from a ladder. "The ${neutralize}, but ${enemy.boss} slipped away," you report to Agent Fletch with your communicator.`,
        `Your body spasms, fighting against the green gel. Unable to breathe, you claw wildly at the hard, translucent surface encasing you. Shadowy figures move about on the other side of the barrier, and suddenly the lid slides open, and you fall to the ground. The lights are blindingly bright to your aching eyes, and you draw air in your lungs like it's the first time in your life. "Welcome, child!" you hear a voice calling. What is happening? Was that a dream?`,
        `"If you strike me down, I shall become more powerful than you possibly can imagine," ${enemy.boss} says. ${ucInit(gPron(enemy, "subject"))} drops ${gPron(enemy, "possessive")} guard, and you strike ${gPron(enemy, "object")} one last time, and there's a blinding flash! ${ucInit(possessiveSuffix(gPron(enemy, "subject")))} gone! Disappeared! At least the ${neutralize}.`,
        `The screens of your VR helmets go dark, and the Citadel scientists and support team help you take off your training gear. "${Math.ceil(Math.random() * 100000)} points! You beat the high score for this simulation! Good job, Gladiators!" Agent Fletch calls from beyond the observation screen. "When you have to face ${enemy.boss} for real, you just might be ready."`,
        `With the last of the adversaries down, you realize ${enemy.boss} has eluded capture once more. Despite this, the immediate danger has been averted because the ${neutralize}`,
        `"We've secured the area," you communicate over the radio. "The immediate threat is contained. The ${neutralize}, but we've lost track of ${enemy.boss} ${gPron(enemy, 'reflexive')}."`,
        `Catching your breath, you survey the scene of the last stand. Although ${enemy.boss} slipped through the net, the ${neutralize}, ensuring the city's safety for now.`,
        `As the dust settles, you find ${possessiveSuffix(enemy.boss)} plans in ruins, though ${gPron(enemy, "subject")} remains at large. "At least the ${neutralize}," you remind yourself, a small victory amid the uncertainty.`,
        `The operation concludes with ${possessiveSuffix(enemy.boss)} forces dismantled, yet the mastermind behind the chaos has vanished. "Still, the ${neutralize}," you report back, focusing on the positive outcome.`,
        `"The operation is a success," you confirm, the aftermath of the battle still smoldering around you. "The ${neutralize}, but the trail for ${enemy.boss} goes cold here."`,
        `After the intense confrontation, you realize the threat is over and - for now, the ${neutralize}. However, ${enemy.boss}'s disappearance casts a long shadow over the victory.`,
        `"All objectives completed," you announce, though the victory feels incomplete without ${enemy.boss} in custody. "Nonetheless, the ${neutralize}, putting an end to their immediate plans."`,
        `In the quiet that follows the storm, you reflect on the battle's outcomes. "${enemy.boss} may have escaped, but the ${neutralize}, disrupting their network significantly."`,
        `As you regroup with your team, the reality of ${enemy.boss}'s escape settles in. Despite the setback, the ${neutralize}, marking a crucial win against their operations.`,
        `Just as victory seemed within grasp, ${enemy.boss} smirks. ${getEnemyAttack(enemy, "detonation", `${gPron(enemy, "subject")} produces a remote and presses a button. The room shudders with the force of an explosion`)}, momentarily obscuring everything. "Coward's exit," you cough out, once the debris settles. Though ${enemy.boss} has vanished, the ${neutralize}, ensuring their immediate plan crumbles to dust along with ${possessiveSuffix(enemy.name)} escape route.`,
        `The confrontation reaches its peak and ${enemy.boss} is cornered and desperate. ${getEnemyAttack(enemy, "detonation", `${ucInit(gPron(enemy, "subject"))} reveals a detonator and triggers the explosives`)},  ${gPron(enemy, "object")} vanishing amidst chaos. Rubble and confusion fill the space where ${gPron(enemy, "subject")} once stood. "Gone, but not victorious," you declare to your team, as the dust clears revealing that, despite the dramatic escape, the ${neutralize}, dismantling the threat piece by piece.`
    ]

    let finisher = randFrom(["Finish them", "Show no mercy", "End them", "Put an end to this", "Kill them, and send what remains to Agent Fletch", "Wipe them out, all of them", "Put a stop to this"])

    let gloat = gloatingList(enemy, stage)
    let submission = lastWords(enemy)
    let defiance = defiantEnd(enemy)
    let lastwords = randFrom([submission, defiance])
    let lastthoughts = lastThoughts(enemy)

    let loseresult = [
        `"${gloat[0]}" ${enemy.boss} says as ${gPron(enemy, "subject")} stalks around you, beaten. "${gloat[1]}"`,
        `"${gloat[0]}" ${enemy.boss} says, arms crossed confidently in front of ${gPron(enemy, "object")}. "${gloat[1]}" ${ucInit(gPron(enemy, "subject"))} turns to face ${rival.name + " and " + randFrom(enemy.minionnames)}, ${gPron(enemy, "possessive")} final command echoing powerfully off the walls with a sudden finality. "${finisher}!"`,
        `"${gloat[0]}" ${enemy.boss} says as your body is strapped into a large metal apparatus in ${enemy.boss == "Jackal" ? "her" : "Jackal's"} laboratory. "${gloat[1]}"`,
        `"Gladiator?" Agent Fletch's voice sounds in your ear, small and tinny from your damaged communicator." What's the status?" You watch from your place on the floor, unable to respond as ${enemy.boss} returns to ${gPron(enemy, "possessive")} plan.`,
        `"${lastwords[0]}" ${heroSpeech()}. "${lastwords[1]}" ${enemy.boss} laughs wickedly. "${gloat[0]}" ${gPron(enemy, "subject")} gloats. "${gloat[1]}"`,
        `${lastthoughts} ${enemy.boss} laughs wickedly. "${gloat[0]}" ${gPron(enemy, "subject")} gloats. "${gloat[1]}"`,
        `${enemy.boss} pushes you down, forcing you into submission. You try to fight ${gPron(enemy, "object")} off but can't, and instead watch in horror as ${gPron(enemy, "subject")} ${enemy.threat}. Your scream is lost on the winds as ${gPron(enemy, "subject")} extinguishes your life!`,
        `Last of the Gladiators have fallen to ${enemy.boss} and ${gPron(enemy, "possessive")} ${enemy.minions()}. "${gloat[0]}" ${gPron(enemy, "subject")} says. "${gloat[1]}" ${ucInit(gPron(enemy, "subject"))} ${enemy.threat}.`,
        `"${gloat[0]}" says ${enemy.boss} as ${gPron(enemy, "subject")} ${enemy.threat}. ${randFrom([`You can only watch, horrified.<br><br>"${gloat[1]}"`, `"${gloat[1]}"<br><br>${lastthoughts}`])}`,
        `"${gloat[0]}" ${enemy.boss} says, and ${enemy.threat}. Those are the last words you ever hear.`,
        `"Maybe The Master would have a better use for the Gladiators?" ${randFrom(enemy.minionnames)} asks. "No," ${enemy.boss} answers${randFrom([` as ${gPron(enemy, "subject")} ${enemy.threat}`, `, and orders: "${finisher}"`])}.`,
        `You gave all you've got, but it was not enough. Not even close. "${finisher}!" ${enemy.boss} orders ${randFrom(enemy.minionnames)}.`,
        `${enemy.boss} stands over your limp body. "${gloat[0]}" ${gPron(enemy, "subject")} says, as ${gPron(enemy, "possessive")} ${enemy.minions()} draw nearer. "${gloat[1]} ${finisher}!" The minions follow the order.`,
        `As you're lying on the ground, bleeding out,${randFrom([``, ` ${heroSpeech()}: "${lastwords[0]}" but the ${enemy.bosstitle()} cuts you off.`, ` ${lowerCaseInitial(lastthoughts)}`])} "${gloat[0]}" ${enemy.boss} says. "${gloat[1]}"`,
        `"${gloat[0]}" the ${enemy.bosstitle()} says. You don't answer anything. ${lastthoughts} ${enemy.boss} goes on: "${gloat[1]}" ${ucInit(gPron(enemy, "subject"))} ${enemy.threat}.`,
        `"${gloat[0]}" ${enemy.boss} shouts. ${ucInit(gPron(enemy, "subject"))} ${enemy.threat}. "${gloat[1]}"`,
        `"${gloat[0]}" ${enemy.boss} says, hellfire twinkling visibly in ${gPron(enemy, "possessive")} eyes. "${gloat[1]}"`,
        `You are lying on the ground, defeated. "${finisher}!" ${enemy.boss} orders${randFrom([` ${gPron(enemy, "possessive")} goons.`, `. ${lastthoughts}`])}`,
        `You try to stagger away from your defeat. "${gloat[0]}" ${enemy.boss} growls, while ${gPron(enemy, "subject")} comes at you, unrelenting. "${gloat[1]}"`,
        `With ${gPron(enemy, "possessive")} right hand, ${enemy.boss} grabs your face and pushes your aching body, sapped of all strength, slowly backward toward ${stage.hasOwnProperty("pit") ? stage.pit : `a bottomless chasm`}. "${gloat[0]}" ${gPron(enemy, "subject")} says. "${gloat[1]}"`,
        `Agent Fletch and Citadel soldiers have arrived just a few moments too late. "${submission[0]}" ${heroSpeech()}, and fall forever silent. Fletch lets out a scream of despairing anguish, knowing you were senselessly lost because of miscommunications and bad timing.`,
        `Agent Fletch finds you broken and battered where ${enemy.boss} left you. "${submission[0]}" ${heroSpeech()}. "${submission[1]}"<br><br>You close your eyes slowly and your head goes limp.`,
        `"${finisher}!" ${enemy.boss} orders. The ${enemy.minions()} remorselessly beat you until you feel nothing.`,
        `${enemy.boss} looks at you, lying at ${gPron(enemy, "possessive")} feet. "${gloat[0]}" ${gPron(enemy, "subject")} says, looking disappointedly at you. "${gloat[1]}${randFrom([` ${finisher}." ${randFrom(enemy.minionnames)} steps closer.`, `" ${ucInit(gPron(enemy, "subject"))} ${enemy.threat}.`])}`,
        `"${lastwords[0]}" ${heroSpeech()}. "${lastwords[1]}"<br><br>"${gloat[0]}" ${enemy.boss} answers. "${gloat[1]}"`,
        `Citadel aircraft speeds you to medical care, but you know it is too late. "${submission[0]}" ${heroSpeech()} to Agent Fletch, at your side.<br><br>"${submission[1]}"`,
        `"Gladiator?" Agent Fletch's voice penetrates your fading mind. "${submission[0]}" ${heroSpeech()}, before the darkness overcomes you.`,
        `You are lying on your back, the pain preventing you from moving. ${randFrom([`${lastthoughts}. and this is the last thought you will ever have.`, `"${submission[0]}" ${heroSpeech()} to no-one in particular as you draw your last breath. "${submission[1]}"`])}`,
        `Citadel soldiers are clearing the area from the aftermath of your fight, long after victorious ${enemy.boss} has left. "${submission[0]}" ${heroSpeech()} to Agent Fletch. "Don't try to speak," he answers, but you know it will not make any difference. ${ucInit(heroSpeech())} your last words: "${submission[1]}"`,
        `"Finish them off, ${enemy.boss}! Do it now!" shouts ${randFrom(enemy.minionnames)}. "${gloat[0]}" ${enemy.boss} says, and ${enemy.threat}. "${gloat[1]}"`,
        `"${randFrom([`No more, ${enemy.boss}! Grant me mercy!" you shout.`, `${lastwords[0]}" ${heroSpeech()}, "${lastwords[1]}"`])} ${enemy.boss} ${enemy.threat}${randFrom([`. "I thought you were made of sterner stuff," ${gPron(enemy, "subject")} responds.`, `, and orders ${gPron(enemy, "possessive")} minions: "${finisher}!"`])}`,
        `${enemy.boss} has you pinned. Without a word, ${gPron(enemy, "subject")} ${enemy.threat}. With grim determination in ${gPron(enemy, "possessive")} eyes ${gPron(enemy, "subject")} ends your life.`,
        `"${defiance[0]}" you spit defiantly in the face of the victorious ${enemy.bosstitle()}. "${defiance[1]}"<br><br>"${gloat[0]}" ${gPron(enemy, "subject")} answers. "${gloat[1]}"`,
        `"${lastwords[0]}" ${heroSpeech()}, but ${enemy.boss} cuts you off by grabbing your throat. "${gloat[0]}" ${gPron(enemy, "subject")} says and starts to squeeze the life out of you. "${gloat[1]}"`,
        `Suddenly, there's a blinding flash and ${possessiveSuffix(enemy.boss)} gone! It's all gone. Shockingly, you're back at Citadel HQ, surrounded by agents all going about their business. Did all that even happen?`,
        `Your body spasms, fighting against the green gel. Unable to breathe, you claw wildly at the hard, translucent surface encasing you. Shadowy figures move about on the other side of the barrier, and suddenly the lid slides open, and you fall to the ground. The lights are blindingly bright to your aching eyes, and you draw air in your lungs like it's the first time in your life. "Welcome, my children!" you hear a woman calling. What is happening? Was that a dream?`,
        `The screens of your VR helmets go dark, and the Citadel scientists and support team help you take off your training gear. "Gladiators!" Agent Fletch calls from beyond the observation screen, his face dark with disappointment. "Only ${Math.ceil(Math.random() * 10000)} points! How do you think you can face the real ${enemy.name}?!"`,
        `${enemy.boss} cackles as you fall back, defeated. "${gloat[0]}" "You will fall. If not now, then one day," you retort. "${gloat[1]}"`,
        `"${gloat[0]}" ${enemy.boss} taunts you. "${gloat[1]}"`
    ]

    let finalresult

    result == 1 ? finalresult = randFrom(winresult) : finalresult = randFrom(loseresult)

    return finalresult

}

function heroSpeech() {
    let effort = [` `, ` manage to `,]
    let speak = [`cough out`, `wheeze`, `utter`, `gasp`, `say`, `hiss`, `groan`]
    let descriptive = [`with your last bit of strength`, `with a smile`, `through bloodied lips`]

    return "you" + randFrom(effort) + randFrom(speak)
}

function defiantEnd(enemy) {
    let defiance = [
        [`You're sick,`, `Where do people like you come from?`],
        [`You won't get away with this!`, `Citadel will make sure of it!`],
        [`No matter where you go or what you do,`, `You're going down.`],
        [`When beasts like you have devoured each other,`, `The world will belong again to the little people.`],
        [`Come on down. You haven't got a chance,`, `Come on!`],
        [`Come on, I love it. Bring on some more!`, `Come on, ${enemy.boss}!`],
        [`Just finish this,`, `What are you waiting for?`],
        [`Was that all you got?`, `I excpected more of you.`],
        [`One day another Gladiator will rise,`, `And you shall fall.`]
    ]

    return randFrom(defiance)
}

function lastWords(enemy) {
    let lastwords = [
        [`Tomorrow, at sunrise..`, `I shall no longer be here.`],
        [`I was not supposed to die, not here..`, `Not like this.`],
        [`I do not grieve,`, `One day another Gladiator will rise and uses the power of ${randFrom(["Street Masters", "the Tiger"])} to light the darkest hour.`],
        [`It's over,`, `Goodbye.`],
        [`One never knows the ending,`, `One has to die to know exactly what happens after.`],
        [`If I'll close my eyes now,`, `I'm not going to wake up.`],
        [`I must go in..`, `The fog is rising.`],
        [`Tired..`, `So.. tired.`],
        [`Goodbye..`, `Farewell.`],
        [`You always were a pain in the rear,`, `It was nice knowing you.`],
        [`I'm afraid,`, `And I'm glad to be afraid.`],
        [`I'm a leaf on the wind,`, `Watch how I..`],
        [`It's been a funny sort of day,`, `Isn't it?`],
        [`It's..`, `Beautiful.`],
        [`I'll see you in another life,`, `When we are both Tigers.`],
        [`Death smiles at us all,`, `All you can do is to smile back.`],
        [`I got what everyone gets,`, `I got a lifetime`],
        [`Time..`, `To die.`],
        [`My only hope,`, `Is that the next team will do what I could not.`],
        [`My only regret is that I failed to stop the ${possessiveSuffix(enemy.name)} scheme,`, `And my failure has doomed Ransom.`],
        [`I can only think of all the innocent lives that will perish,`, `Because of this insane scheme I failed to thwart.`],
        [`I gave everything,`, `I have no regrets.`],
        [`When death comes,`, `It will come as an old friend.`],
        [`To dream, perchance to sleep,`, `Aye, there's the rub.`],
        [`'tis but a scratch,`, `Had worse.`]
    ]

    return randFrom(lastwords)
}

function lastThoughts(enemy) {
    let lastthoughts = [
        `You can only think of all the innocent lives that will perish because of this insane scheme you failed to thwart.`,
        `Your only regret is that you failed to stop the ${possessiveSuffix(enemy.name)} scheme, and your failure has doomed Ransom.`,
        `From out of nowhere a thought crosses your mind: one day another Gladiator will rise and uses the power of ${randFrom(["Street Masters", "the Tiger"])} to light the darkest hour.`,
        `You can only think that if you'll close your eyes now, you're not going to wake up.`,
        `You think to yourself it's been a funny sort of day in a way.`,
        `Your only hope is that the next team Agent Fletch will send will do what you could not.`,
        `You think that even with a lifetime of preparation, you could never have been ready.`,
        `You have a fleeting moment where you think this is not really happening - these are someone else's memories.`
    ]

    return randFrom(lastthoughts)
}

function gloatingList(enemy, stage, herodialogue = [], heronames = undefined) {

    let gloating = [
        ["You've fought well,", "There will be no-one to mourn your death."],
        ["I'm not even going to kill you myself!", "I'll let my minions take care of that."],
        [`Everything comes to ${gPron(enemy, "object")} who waits,`, "And I have waited for so very long for this moment."],
        [`Where are they now? Where are your friends now?`, `Tell me about the loneliness of good. Is it equal to the loneliness of evil?`],
        [`This is finally turning into my kind of day,`, `The monument to my humble genius is now complete!`],
        [`Mwahahaha!`, `I'm so powerful I even impress myself!`],
        [`Please meet your end with dignity,`, `I hate whiners.`],
        [`Only you were brave - or stupid enough to oppose the ${enemy.name}.`, `Ransom City is now under martial law.. and I am the marshal.`],
        [`This is almost too easy,`, `Such heroic nonsense.`],
        [`${ucInit(defineAddressing(enemy))}!`, `Why throw away your lives so recklessly?`],
        [`I would've waited an eternity for this,`, `It's over, ${defineAddressing(enemy)}.`],
        [`It's a pity you Gladiators die so easily,`, `Or I might have a sense of satisfaction now.`],
        [`Come now, ${defineAddressing(enemy)},`, `We all must die sometime.`],
        [`You don't have to do this," you say. "That's tiresome,`, `You Gladiators always say the same thing.`],
        [`Do you like life?" ${enemy.boss} asks. "Yes," you answer. "That's good,`, `Because I take no pleasure in taking a life if it’s from a person who doesn’t care about it.`],
        [`You should've moved to a Brook City, or somewhere the rule of law still exists,`, `You will not survive here. You are not a ${enemy.name == "Golden Dragons" ? `dragon` : `tiger`}, and this is a land of ${enemy.name == "Golden Dragons" ? `dragons` : `tigers`} now.`],
        [`It looks like you have run out of luck,`, `How dare you challenge us?!`],
        [`Proud of yourself, ${randFrom([defineAddressing(enemy), "little Gladiator"])}?`, `Time to die!`],
        [`You must make a friend of horror,`, `Horror and moral terror are your friends. If they are not, then they are enemies to be feared.`],
        [`I don't blame myself,`, `You see, ${defineAddressing(enemy)}, most people never have to face the fact that, at the right time and the right place, they're capable of anything.`],
        [`There are times when I...`, `I look at people and I see nothing worth liking.`],
        [`Don't you think of your victims?" you ask. "You think there are victims? Don't be melodramatic,`, `Look, people are of no consequence. You shouldn't feel pity for any single one.`],
        [`Everything I touch becomes food for my hunger,`, `My hunger for power!`],
        [`I will win by any means!`, `By any cost!`],
        [`Power flows to the one who knows how,`, `Desire is not enough.`],
        [`This is becoming a wonderful day for evil,`, `Soon I shall have all in my power!`],
        [`You were always too late,`, `All your efforts were futile.`],
        [`You've come to the wrong place, ${defineAddressing(enemy)},`, `You will not leave here alive.`],
        [`I had heard you were sticking your nose in my business,`, `Fortunately, your efforts have been wasted.`],
        [`I was counting on you to come to try your pitiful mission, but I have news for you,`, `None of you will leave this place alive!`],
        [`I must possess all,`, `Or I possess nothing!`],
        [`I ache to smash you out of existence!`, `To drive your cursed face from my memories forever!`],
        [`You can't win," you tell ${enemy.boss} wearily. "I've already won this this the old-fashioned way, the tried and true way,`, `I cheated!`],
        [`Welcome to your doom, ${defineAddressing(enemy)},`, `I would have waited an eternity for this!`],
        [`This is how it begins!`, `The ${enemy.name} triumphant at last!`],
        [`How I loathe heroes!`, `Always getting in the way and acting so.. heroic!`],
        [`I cannot be defeated,`, `I defeat all.`],
        [`You lived for something!`, `But you will die for nothing.`],
        [`Game over, Gladiators! Game over!`, `What are you going to do now?`],
        [`Gladiators! You know, I.. I expected more from you,`, `I thought you'd be tougher than this.`],
        [`Wait!" you shout.<br><br>"Wait? Are you kidding me? Did you just say 'Wait'?`, `You know what? I expected more from you. Wait for what? Wait for me to change my mind?`],
        [`Any last words?", ${enemy.boss} asks. You deprive ${gPron(enemy, "object")} of an answer. "Any?`, `Thought as much.`],
        [`Have you any last words?`, `Before I dispatch you?`],
        [`You're quite the piece of work, ${defineAddressing(enemy)},`, `But I am superior!`],
        [`You think you can take on me?`, `You need an army to take on me! You hear?! Who do you think you're dealing with?!`],
        [`When you have a chance to kill someone,`, `Don't hesitate.`],
        [`You've gotta ask yourself one question: Do I feel lucky?`, `Well, do you, ${defineAddressing(enemy)}?`],
        [`Did you believe I would let you on my trail by mistake?`, `Now face your death!`],
        [`Death smiles at us all,`, `All you can do is to smile back.`],
        [`Why, ${defineAddressing(enemy)}? Why do you do it? Why keep fighting?`, `Do you believe you're fighting for something? Can you tell me what it is? Do you even know?`],
        [`You must be able to see it. You must know it by now,`, `You can't win. It's pointless to keep fighting. Why do you persist?`],
        [`You won't get away with this," you tell ${enemy.boss}. "I won't get away with this?`, `I already have!`],
        [`You have no idea how much I've wanted to do this.`, `You have no idea.`],
        [`You Gladiators are always rushing,`, `Rushing to your death!`],
        [`You've dug your own grave,`, `You're dead!`],
        [`I am your death,`, `Are you prepared?`],
        [`I've never been beat. A lot of Gladiators have have tried,`, `Seems to me there's more Gladiators lately than ever.`],
        [`Frankly,`, `I find the idea of a Gladiator that lives.. offensive.`],
        [`Remember, I AM the ${enemy.name},`, `I AM ${enemy.boss.toUpperCase()}!`],
        [`You cannot win, you devil," you grunt. "You're wrong,`, `I cannot lose.`],
        [`Come to me, ${defineAddressing(enemy)},`, `Kneel before ${randFrom([enemy.boss, `the ${enemy.name}`])}!`],
        [`Yes!`, `Let this be our final battle!`],
        [`It is not too late to undo this madness," you tell ${enemy.boss}. "Madness! I demand of destitution, shame and loneliness of scorn!`, `It is my destiny! It is my right!`],
        [`Who crave for power look back over the mistakes of their lives, pile them all together and call it destiny," you say. "Thank you for that bit of philosophy, ${defineAddressing(enemy)},`, `Yes, this is my destiny! Now and forever!`],
        [`How unpleasant it is to see you,`, `You sniveling cowards!`],
        [`I'm judging you,`, `I'm judging you, and I find you.. wanting.`],
        [`They say violence is never the answer,`, `They are wrong.`],
        [`You want to kill me, don't you, ${defineAddressing(enemy)}?`, `Get a number and get in line.`],
        [`If you want something done,`, `Do it yourself. Yep!`],
        [`You think you're big time?`, `You're gonna die big time!`],
        [`When we last met, you were but a learner,`, `You still are.`],
        [`You have this one chance to give up," you browbeat ${enemy.boss}. "How very generous of you,`, `I can't wait to see what happens when I don't!`],
        [`There is still time to stop this," you plead to ${enemy.boss}. "No,`, `It is far too late for that.`],
        [`You can still end this," you plead to ${enemy.boss}. "Yes,`, `It is you who I shall end!`],
        [`Do you expect me to yield?" you ask defiantly. "No, ${defineAddressing(enemy)},`, `I expect you to die.`],
        [`Poor ${defineAddressing(enemy)}!`, `I would offer you a place in the ${enemy.name}, but you fail to see the bigger picture." "I still believe in Global Gladiators, not the ${randFrom([enemy.name, "Kingdom"])}!" you retort through gritted teeth. "That will always be your downfall.`],
        [`When you are out of my way, there's nothing holding the ${enemy.name} back,`, `From prosperity in my hands!`]
    ]

    let gloat = [randFrom(gloating)];
    let clone_present = false;
    if(heronames !== undefined) {
        clone_present = heronames.filter(str => str.includes(enemy.boss)).length > 0
        }

    if(clone_present) {
        console.log("clouuun")
        let clone_dialogue = [
            [`We stand face to face, yet worlds apart. Your actions have cast a long shadow, one I intend to erase," you state, your voice steady, revealing a resolve as unwavering as steel. "Erase? You're a part of me,`,`Denying my deeds is denying yourself`],
            [`I've seen the chaos you've sown, felt the pain you've inflicted. It ends now, even if I must end with it," you declare, a note of finality in your voice that echoes in the emptiness between you "End with it? Don't be naive,`,`You can no more end me than you can end your own heartbeat.`],
            [`You're a shadow, a dark reflection of what I could have become. I'm here to ensure that never happens," you assert, your gaze locked on your mirror image of your darkest fears. "A dark reflection? Foolish. I am the truth of our soul laid bare,`,`You cannot fight the inevitable.`],
            [`Your reign of terror, it's a path I refuse to walk. I'll dismantle everything you've built, piece by piece," you vow, each word imbued with the weight of your shared history. "Dismantle? You aim to destroy your own legacy,`,`Without me, what are you?`],
            [`I could have been you, but I chose a different path. A path of light, away from your darkness," you proclaim, standing firm in the face of your dark counterpart's malevolence. "Chose? There is no choice. There's only power, and how one chooses to wield it,`,`You'll learn.`],
            [`This ends here, with me. I won't let your deeds define our legacy. I fight for redemption, for a chance to right your wrongs," you promise, your voice echoing a deep-seated yearning for change. "Redemption? There's no redemption for us. `,`Only the abyss that awaits when you finally realize we are one and the same.`],
            [`I stand before you, not as your enemy nor your ally. My mission... I thought I knew, but now, the lines blur," you admit, your voice tinged with uncertainty as you regard your counterpart. "Blur? The only thing that's blurred is your conviction,`,`How pitiful, to be so lost,`],
            [`They say we're two sides of the same coin, but I find myself wondering if the coin ever existed at all," you muse, your gaze distant, as if searching for answers in the void between you. "Existential doubts now? How delightful,`,`While you ponder, I act. That's what separates us!`],
            [`Your actions, they mirror the darkness I've fought within myself. Yet here we stand, divided by more than just ideals," you reflect, your words heavy with the burden of your internal struggle."Fought and lost, it seems,`,`There's clarity in embracing your nature. You should try it sometime.`],
            [`What if the hero I sought to be was never meant to fight you, but to understand you?" you ponder aloud, your voice a mix of resolve and confusion, a paradox personified. "Understand me? You can't even understand yourself,`,`Don't flatter yourself thinking you can unravel me!`],
            [`I walked this path believing I could be the barrier between your chaos and the world's peace. Now, I'm not so sure," you confess, a shadow of doubt clouding your once-clear purpose. "Doubt is a luxury I cannot afford, and neither can you,`,`Make up your mind, or I'll make it up for you.`],
            [`Maybe in trying to stop you, I've become you. What separates us now but the choices we've made?" you question, your identity crisis casting a long shadow over your confrontation.  "You becoming me? Don't flatter yourself,`,` You lack the conviction, the strength. You're but a shadow of a shadow.`],
            [`How could you stray so far from what we were meant to be? Your existence is a betrayal of our very essence," you accuse, your voice trembling with rage. "Betrayal? I am the culmination of our potential,`,`Your fury is but a sign of your inability to comprehend our destiny`],
            [`You wear our face, but your deeds? From a world I don't recognize. I'll correct the course you've corrupted with my own hands if need be!" you declare, fists clenched in righteous indignation. "Correct the course? You're nothing more than a pale shadow,`,`An echo of my greatness. Your indignation is pathetic!`],
            [`Your reign ends with me. I am the fury, the justice you've forsaken. This aberration stops now!" you vow, your voice a beacon of resolve amidst the darkness your counterpart has wrought. "Justice? You're a mere byproduct of my ambition,`,`Your fury will extinguish in the face of my indomitable will.`],
            [`The audacity to stand against me, to claim you could ever rectify my deeds. You're an insult to our name," your dark reflection's words aim to cut, but the your stance is unwavering. "An insult? I am the redemption you're too cowardly to pursue. Your deeds end with me," you reply, your voice a mix of defiance and determination, a clear light in the darkness the villain casts. "Redemption?`,`You're a mere glitch in my grand design. I'll erase you as easily as a mistake on paper.`],
            [`You dare mimic my power, challenge my reign? You're a flawed copy, a mistake I'll rectify," your counterpart says in contempt. Flawed? No, I am the correction to your mistake. I am what we should have been," you assert, standing firm, a beacon against the villain's shadow. "Correction? You're but a footnote in my saga,`,`Prepare to be expunged from the narrative I've written!`],
            [`You're a blemish on our legacy, a footnote I'll erase from our story," your clone says with hatred burning in the eyes. "A blemish? I am the clean slate, the new chapter. You're the past, and I am the future," you state, your conviction clear in your steady gaze. "Future? There is no future for you, only the oblivion I grant you,`,`Your chapter ends before it begins!`]
        ]

        gloat.push(randFrom(clone_dialogue))
        gloat.push(randFrom(clone_dialogue))

    } else {
        if(herodialogue.length > 0) {
            herodialogue = randFrom(Array.from(herodialogue))
            herodialogue[0] = _.template(herodialogue[0])({boss: enemy.boss})
            herodialogue[1] = _.template(herodialogue[1])({boss: enemy.boss})
        }

        herodialogue.length > 0 ? gloat.push(herodialogue) : () => { }
        herodialogue.length > 0 ? console.log("herodialogue present") : () => { }
        stage.hasOwnProperty("gloat") ? gloat.push(randFrom(stage.gloat)) : () => { }
        enemy.hasOwnProperty("gloat") ? gloat.push(randFrom(enemy.gloat)) : () => { }
    }
    stage.hasOwnProperty("gloat") ? gloat.push(randFrom(stage.gloat)) : () => { }
    enemy.hasOwnProperty("gloat") ? gloat.push(randFrom(enemy.gloat)) : () => { }
//            enemy.hasOwnProperty("gloat") ? console.log(enemy.gloat) : () => { }
    gloat = randFrom(gloat)
    return gloat

}

function laconicStatement(enemy) {
    laconicstatements = [
        `${ucInit(gPron(enemy, "subject"))} might be right, but you have to try and stop ${gPron(enemy, "object")}.`,
        "You agree to disagree.",
        `You don't know if this a fight you can win, but you have to try to stop ${gPron(enemy, "object")}.`,
        "While there is life, there is hope, you remind yourself.",
        "You've heard that line before.",
        "This isn't going to be easy.",
        "You shrug. It doesn't need to be this way, but it always is.",
        `You have a feeling ${gPron(enemy, "subject")} might be right.`,
        `${ucInit(gPron(enemy, "subject"))} won't get away with that - not this time, that's for sure.`,
        "That's not a completely bad point, you think to yourself.",
        "You will never give up!",
        "You don't plan to let these criminals get away.",
        "You know the dark can embrace the light, but never eclipse it.",
        "You begin to wonder if you're in over your head..",
        `${ucInit(gPron(enemy, "possessive"))} plan ends here!`,
        `"Your plan ends here, ${enemy.boss}!" you say, and drop in your ready stance.`,
        `Either you dismantle the ${enemy.name} from the upper echelons of its leadership, or you go down swinging.`,
        `The fight for the future starts now, in the shadow of ${enemy.name}!`,
        `The clash of ideals, the race against time, and the battle for the fate of everything has begun!`,
        `Every moment counts as you push forward, determined to avert disaster and secure a victory not just for yourself, but for everything you care for.`,
        `The fate of all hangs in the balance as you navigate this challenge, a testament to courage in the face of overwhelming odds.`,
        `You steel yourself for the trials ahead.`,
        `With determination, you stand your ground, ready to face ${gPron(enemy,"object")} and the trials that lie ahead.`,
        `The moment of truth is upon you, a test of wills where only one can prevail.`,
        `With the stakes now clear, your resolve hardens.`
    ]

    return randFrom([randFrom(laconicstatements), ``])
}

function referenceText(gladiators, allygroup, allymotivation, rivalgroup, rivalmotivation, finalboss) {

    let ourheroes = "This story is best experienced with "
    for (i = 0; i < gladiators.length; i++) {
        ourheroes = ourheroes + "<b>" + gladiators[i].name + "</b>" + (i == gladiators.length - 2 ? " and " : ", ")
    }

    gladiators.length > 0 ? ourheroes = ourheroes.substring(0, ourheroes.length - 2) +
        ". You can pick any Global Gladiators for this story, but some might make more sense than others. The story is not intentionally balanced for any specific fighters." :
        ourheroes = `You can pick any Global Gladiators for this story, but some might make more sense than others.<br>`


    let personalsetup = ""
    for (i = 0; i < gladiators.length; i++) {
        if (gladiators[i].hasOwnProperty('instructions'))
            personalsetup = personalsetup + " " + gladiators[i].instructions + " "
    }
    personalsetup != "" ? personalsetup = `<b>Hero story instructions:</b> ${personalsetup}` : () => { }

    ourheroes = [`${ourheroes}<br>`, personalsetup]

    let allytext = motivationText(allymotivation, allygroup, "Ally", finalboss, gladiators)

    let rivaltext = motivationText(rivalmotivation, rivalgroup, "Rival", finalboss, gladiators)

    let setup = `<b>Story Setup:</b> Put `

    let allysetup = setup

    for (i = 0; i < allygroup.length; i++) {
        allysetup = allysetup + " " + allygroup[i].name + " (Ally)" + (i == allygroup.length - 2 ? " and " : ", ")
    }

    allygroup.length > 0 ? allysetup = allysetup.substring(0, allysetup.length - 2) + " in the Story Pool." : allysetup = `You can pick any Allies for this story, but some might make more sense than others.`

    let rivalsetup = setup

    for (i = 0; i < rivalgroup.length; i++) {
        rivalsetup = rivalsetup + " " + rivalgroup[i].name + " (Rival)" + (i == rivalgroup.length - 2 ? " and " : ", ")
    }

    rivalgroup.length > 0 ? rivalsetup = rivalsetup.substring(0, rivalsetup.length - 2) + " in the Story Pool." : rivalsetup = `You can pick any Rivals for this story, but some might make more sense than others.`

    let text = []

    text.push(ourheroes)
    text.push(allytext)
    text.push(rivaltext)
    text.push(allysetup)
    text.push(rivalsetup)

    return text
}

function numberAsString(number) {
    switch (number) {
        case 1: number = "one";
            break;
        case 2: number = "two";
            break;
        case 3: number = "three";
            break;
        case 4: number = "four"
            break;
        default: number
    }
    return number
}

function motivationText(motivation, group, stance, finalboss, gladiators) {

    gladiators = _.map(gladiators, 'name')

    let bossclone = _.map(group, 'name').includes(finalboss.boss)

    let redemption = ["Kemono", "Shadow", "Jackal", "Juan", "Yokai", "Tlazolteotl", "Mack", "Ah Long", "Dmitri"]

    let personalstory_ally = `${possessiveSuffix(motivation)} personal goals have taken the same path as your mission. ${_.map(group, 'name').includes(motivation) ? `${motivation}${group.length == 2 ? `, along with ${(_.map(group, 'name')).filter(character => character != motivation)}` : ""} will accompany you on your mission.` : `${possessiveSuffix(motivation)} closest ally accompanies you on your mission.`} `

    let personalstory_enemy = `${possessiveSuffix(motivation)} personal goals and your mission have opposing paths. ${_.map(group, 'name').includes(motivation) ? `${motivation}${group.length == 2 ? `, along with ${(_.map(group, 'name')).filter(character => character != motivation)}` : ""} will be facing you wherever you mission will take you.` : `${possessiveSuffix(motivation)} closest ally will be facing you wherever your mission will take you.`} `

    let oneP = group.length == 1 ? true : false

    let text
    switch (motivation) {
        case "Ah Long":
            if (stance == "Ally" && finalboss.boss == "Ah Long" && !gladiators.includes("Ah Long")) {
                text = `The Kingdom has put a clone in Ah Long's place to rule over the Golden Dragons. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? "Wan Bo has already shared so much with Ah Long, and together they will fight alongside you for the lost honor of the Dragons." : "He knows there is only one way to convince who is the real Head of the Dragon and regain their lost strength and independence.") : "Wan Bo, who has already shared so much with Ah Long, stands with you to regain the lost honor of the Dragons."}`
            } else if (stance == "Ally" && !gladiators.includes("Ah Long")) {
                text = `The Kingdom is disappointed in Ah Long's performance, and have told ${finalboss.name == `Kingdom` ? `they` : `the ${finalboss.name}`} will take over the Golden Dragons from him. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? "Ah Long and his closest friend Wan Bo stand together with you to regain the lost strength and independence of the Dragons." : "He knows he will need your help against the Kingdom to regain the lost strength and independence of the Dragons.") : "Wan Bo, who has shared so much with Ah Long, stands with you to regain the lost strength and independence of the Dragons."}`
            } else if (stance == "Ally") {
                text = `The Kingdom is disappointed in Ah Long's performance, and have told ${finalboss.name == `that it is time for the Golden Dragons to have new leadership.` ? `` : `him the ${finalboss.name}`} will take over all Golden Dragons' operations. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? "Ah Long and his closest friend Wan Bo stand together with you to regain the lost strength and independence of the Dragons." : "He knows he will need your help against the Kingdom to regain the lost strength and independence of the Dragons.") : "Wan Bo, who has shared so much with Ah Long, stands with you to regain the lost strength and independence of the Dragons."}`
            } else if (stance == "Rival" && gladiators.includes("Ah Long")) {
                text = `The Jackal has cloned you multiple times over and one of the clones firmly believes he is the real Ah Long. He thinks there is only one way to convince who is the real Head of the Dragon and regain the favor of the Kingdom.`
            } else if (stance == "Rival" && (gladiators.includes("Jackal"))) {
                text = `Ah Long has disappointed the Kingdom, he is now attempting to regain his lost "strength" and "independence". ${_.map(group, 'name').includes(motivation) ? `` : `He has sent his whelp Wan Bo to fight his battles with you. Such a shame Shadow once thought so highly of them!`}${group.length == 2 ? `His closest ally, Wan Bo, showed some potential, but it seems all of the Dragons are marred with treason. Such a shame!` : ``}`
            } else { text = `Ah Long has fallen into disfavor with the Kingdom, and is in danger of losing the leadership of the Dragons. Now ${_.map(group, 'name').includes(motivation) ? `his closest ally`: `he`} has vowed to stop the Golden Gladiators at any cost to prove their dedication to the Kingdom.` };
            break;
        case "Ah Long of Brook City":
            if (stance == "Ally" && finalboss.boss == "Ah Long" && !gladiators.includes("Ah Long")) {
                text = `The younger Ah Long from the past of Brook City wants to rise as the Head of the Dragon in place of the older Ah Long. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? `He, along with Lotus has joined you to face` : `He has joined you to face`) : `He has sent Lotus with you to find`} the Ah Long he believes to be old and tired.`
            } else if (stance == "Ally") { text = personalstory_ally } else if (stance == "Rival" && gladiators.includes("Ah Long")) {
                text = `The younger Ah Long from the past of Brook City wants to rise as the Head of the Dragon in your place. ${_.map(group, 'name').includes(motivation) ? `${group.length == 2 ? `He and Lotus will confront you wherever you will go.` : `He will confront you wherever you will go.`}` : `Lotus is following you wherever you will go in order to young Ah Long to learn of your weaknesses.`}`
            } else if (stance == "Rival" && gladiators.includes("Ying Hua")) {
                text = `The younger Ah Long from the past of Brook City knows only of the younger Ying Hua, but understands you are even the greater threat now that you are older and wiser. ${_.map(group, 'name').includes(motivation) ? `${group.length == 2 ? `He and Lotus will confront you` : `He has taken as his personal mission`} to take you out before you can take him in.` : `Lotus is following you wherever you go to inform the young Ah Long of your plans.`}`
            } else { text = personalstory_enemy };
            break;
        case "Aztec": text = (stance == "Ally" ?
            `${oneP == 1 ? "A single warrior" : "A group of warriors"} with the might of the bygone Aztec empire has received a prophecy of the future from ${randFrom(["Mictecacihuatl", "Xolotl",])}. The soul of ${finalboss.boss} belongs in Mictlan and ${oneP ? `this warrior` : "these warriors"} will deliver ${gPron(finalboss, "object")} there!` :
            `${oneP ? "A single warrior" : "A group of warriors"} with the might of the bygone Aztec empire has received a prophecy of the future from ${randFrom(["Mictecacihuatl", "Xolotl",])}. Your souls belong in Mictlan and ${oneP ? `this warrior` : "these warriors"} will deliver you there!`);
            break;
        case "Beast": text = (stance == "Ally" ?
            `${oneP ? "This individual is" : "These individuals are"} little more than savage beasts, but ${oneP ? "this one seems" : "these seem"} to have been tamed - for now.
    The strength of the ${oneP ? "beast" : "beasts"} is welcome if unnerving addition to your mission to end ${possessiveSuffix(finalboss.boss)} plans.` :
            `${oneP ? "This individual is" : "These individuals are"} little more than savage beasts, and ${oneP ? "this one is" : "they are"} in the tight leash of ${finalboss.boss}, who has sent them to hunt you.
    ${oneP ? "It" : "They"} won't stop hunting their quarry.`);
            break;
        case "Blade": text = (stance == "Ally" ?
            `A wandering ${oneP ? "blademaster" : "host of blademasters"} sees ${finalboss.boss} as an opportunity to test their mettle, and has decided to walk with you.` :
            `A wandering ${oneP ? "blademaster" : "host of blademasters"} sees you as an opportunity to test their mettle. They seem to show up wherever you go.`);
            break;
        case "Black Ops": text = (stance == "Ally" ? `Citadel has many spies and assassins in their contacts, and a ${oneP ? "single operative" : "team of specialists"}
    has been assigned with you to eliminate the threat ${finalboss.boss} poses.` :
            `The world is full of shadowy organizations with spies and assassins everywhere. A mysterious malefactor has sent a
    ${oneP ? "single operative" : "team of specialists"} to eliminate the Citadel's finest. They will not stop until you are dead.`);
            break;
        case "Boss": text = (stance == "Ally" ?
            `A secret cabal of powerful and influential individuals have decided that ${possessiveSuffix(finalboss.boss)} plans are a threat to the long game, and fixing it is far too hazardous for them to leave it to the
    rank and file of their organizations - or to you.
    ${group.length == 1 ? `${bossclone ? `The have created a clone of ${finalboss.boss} who has` : `${group[0].name} has`}` : `${bossclone ? `They have created a clone of ${finalboss.boss} and have` : `Several of them have`}`}
    joined you in your mission whether you wish it or not.` :
            `Whatever ${possessiveSuffix(finalboss.boss)} endgame is, it will serve the powerful men and women of different shadowy organizations well. You are considered such a threat that this cabal
    has ${bossclone ? `created a clone of ${finalboss.boss}` : `decided no mere mooks are enough`} to stop you.`);
            break;
        case "Brandon":
            if (stance == "Ally" && finalboss.boss == "Ah Long" && !gladiators.includes("Ah Long") && !gladiators.includes("Brandon")) {
                text = `The movie star Brandon does not care about his career or public anymore. He is on a mission of revenge against Ah Long, and for everything he has done against Brandon's family. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? "Isabella, a fan of his, has joined to help him find his true potential." : "") : "Isabella, Brandon's fan has joined you, as she wants to help Brandon find Ah Long."}`
            } else if (stance == "Ally" && finalboss.boss != "Ah Long" && !gladiators.includes("Brandon")) {
                text = `The tabloids speculate the movie star Brandon is a fraud and his martial arts are just for show, and he is set to prove himself and make a comeback. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? "Isabella, a fan of his, has joined to help him regain the favor of the studios." : "The test footage he will get with you must convince the studio executives of his talent!") : "Isabella, Brandon's fan tries to convince you to help him get some test footage."}`
            } else if (stance == "Ally") { text = personalstory_ally } else if (stance == "Rival" && gladiators.includes("Ah Long") && !gladiators.includes("Brandon")) {
                text = `The movie star Brandon does not care about his career or public anymore. He is on a mission of revenge against you, and for everything you have done against his family. ${_.map(group, 'name').includes(motivation) ? `` : `His fan Isabella tries to help by getting you first!`}${group.length == 2 ? "Isabella, a fan of his, has joined to help him find his true potential." : ``}`
            } else if (stance == "Rival" && !gladiators.includes("Brandon")) {
                text = `The tabloids speculate the movie star Brandon is a fraud and his martial arts are just for show, and he is set to prove himself and make a comeback. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? "Isabella, a fan of his, has joined to help him to get test footage out of you to regain the favor of the studios." : "The test footage he will get out of you must convince the studio executives of his talent!") : "Isabella, Brandon's fan risks everything trying get some suitably impressive test footage out of you to be his co-star."}`
            } else { text = personalstory_enemy };
            break;
        case "Brook City": text = (stance == "Ally" ?
            `${group.length == 1 ? "This resident" : "A group of residents"} of Brook City believes that if ${finalboss.boss} is not stopped, their home will be next. They will do what they can to help you.` :
            `If ${finalboss.boss} can just do what ${gPron(finalboss, "subject")} wants in Ransom, maybe Brook City will be left in peace? ${group.length == 1 ? "A citizen" : "A group of citizens"} has traveled to Ransom to see that ${gPron(finalboss, "subject")} will.`);
            break;
        case "Brotherhood": text = (stance == "Ally" ?
            `${bossclone ? `"An impostor has taken over my organization, and he must go down," Dmitri tells you. You're wary of the Brotherhood,
    but you think you can count on them this one time. But which one is the clone?`: `"The enemy of my enemy is my friend, and a friend with money is a friend indeed," ${group[0].name} tells you. You're wary of the Brotherhood,
    but there is no job they wouldn't handle for the right price, and you can't deny their effectiveness.`}` :
            `Your intel tells you that the mercenaries of the Brotherhood have been paid to make sure you will not interfere with ${possessiveSuffix(finalboss.boss)} plans,
    and you can be certain they will not stop until you have been eliminated.`);
            break;
        case "Cartel": text = (stance == "Ally" ?
            `${bossclone ? `"An impostor has taken over my family, and he must go down," Juan tells you. Juan and his Cartel might be criminals,
    but you think you can count on them this one time. But which one is the clone?`: `"${finalboss.boss} puts the family at risk, and we will not allow that," ${group[0].name} says, and continues: "The enemy of our enemy is our friend."
    Juan and his Cartel might be criminals, but at least you know they are honorable and willing to even die for their "family".`}` :
            `You have been a thorn in the side of the Cartel for a long time. While you are busy with your mission to get ${finalboss.boss}, they have sent a
    ${group.length == 1 ? "single enforcer" : "group of enforcers"} to remove that thorn.`);
            break;
        case "Celebrity": text = (stance == "Ally" ?
            `Some celebrities, socialites and influencers want all the attention, and ${group.length == 1 ? "this one is" : `these ${numberAsString(group.length)} are`} the worst. With
    ${group.length == 1 ? "this fool" : "these fools"} appearing everywhere for cheap publicity, you just hope nobody gets hurt.` :
            `Some celebrities, socialites and influencers want all the attention, and ${group.length == 1 ? "this one is" : `these ${numberAsString(group.length)} are`} the worst. With
    ${group.length == 1 ? "this fool" : "these fools"} appearing everywhere for cheap publicity, you're afraid someone will get hurt.. not that it would deter them.`);
            break;
        case "Chi": text = (stance == "Ally" ?
            `${group.length == 1 ? "This warriors is" : "These warriors are"} privy to ${mysticalSynonym()} Chi powers. Their deep understanding of the flow of
    ${mysticalSynonym()} energies that flow through all life has revealed to them that ${finalboss.boss} is a great disturbance in this force. For the balance to be regained ${gPron(finalboss, "subject")} must be stopped.` :
            `${group.length == 1 ? "This warrior is" : "These warriors are"} privy to ${mysticalSynonym()} Chi powers. Their deep understanding of the flow of
    ${mysticalSynonym()} energies that flow through all life has revealed to them that you are a great disturbance in this force. For the balance to be regained you must be stopped.`);
            break;
        case "Cifarelli": text = (stance == "Ally" ?
            `The ongoing plans of ${finalboss.boss} risks the stability that the operation of the Cifarelli family requires, and a ${group.length == 1 ? "single enforcer" : "group of enforcers"}
    has been sent to crush the opposition. You're lucky to have them on your side!` :
            `The Cifarelli family sees the ongoing plans of ${finalboss.boss} a perfect time to hit law enforcement everywhere, and Citadel is no exception to their plans. A
    ${group.length == 1 ? "single enforcer" : "group of enforcers"} has been sent to take you out.`);
            break;
        case "Clone": text = (stance == "Ally" ?
            `With the multitude of clones unleashed upon the world from Jackal's secret experiments, you are bound to run into some from time to time that
    ${finalboss.boss == "Jackal" ? `seek their creator and want more life` : `would ally themselves to your cause`}.` :
            `With the multitude of clones unleashed upon the world from Jackal's secret experiments, sometimes you find surprising parties of people working together,
    furthering the goals of the Kingdom.`);
            break;
        case "Competitor": text = (stance == "Ally" ?
            `${group.length == 1 ? "This gladiator is not a Global Gladiator, but a seasoned fighter" : "These gladiators are not Global Gladiators, but seasoned fighters"}
    of competetive - and deadly - events. Now they pursue the victory of the ultimate challenge: ${finalboss.boss}!` :
            `${group.length == 1 ? "This gladiator is not a Global Gladiator, but a seasoned fighter" : "These gladiators are not Global Gladiators, but seasoned fighters"}
    of competetive - and deadly - events. Now they pursue the victory of the ultimate challenge: you!`);
            break;
        case "Dark Matter": text = (stance == "Ally" ?
            `${bossclone ? `"My mother is insane, and evil to an extent you cannot begin to understand," an exact replica of Jackal tells you. You're extremely wary of the Kingdom, but you think you can count on Jackal this one time. But which one is really the clone?` : `The Jackal feels ${finalboss.boss} interferes with her research, and
    ${_.map(group, 'name').includes("Jackal") ? `${group.length == 1 ? "has joined you" : "leads her creations alongside you"}` : `has sent a ${group.length == 1 ? "creation of hers" : "force of her creations"} alongside you`}
    to remove the interference.`}` :
            `${bossclone ? `The Jackal knows the Citadel will move against her, and has created a clone of herself${group.length == 1 ? "" : " to lead her creations"}
    to eliminate the threat.`: `The Jackal feels you interfere with her research, and
    ${_.map(group, 'name').includes("Jackal") ? `${group.length == 1 ? "has left her fortress" : "leads her creations"}` : `has sent a persistent ${group.length == 1 ? "creation of hers" : "force of her creations"}`}
    to remove the interference.`}`);
            break;
        case "Dmitri":
            if (stance == "Ally" && finalboss.boss == "Dmitri" && !gladiators.includes("Dmitri")) {
                text = `Dmitri, the true leader of the Brotherhood has realized that following Kingdom is not true to Brotherhood's mission. He believes they are better than mere soldiers of fortune, and is determined to take down whatever puppet the Kingdom has put in his place.`
            } else if (stance == "Ally") { text = personalstory_ally } else { text = personalstory_enemy };
            break;
        case "Extraplanar": text = (stance == "Ally" ?
            `${group.length == 1 ? "This individual is" : "These individuals are"} privy to the secrets of planes of existence beyond yours. For whatever ${mysticalSynonym()}
    reason, the stars are right for them to stop ${finalboss.boss}, no matter the cost.` :
            `${group.length == 1 ? "This individual is" : "These individuals are"} privy to the secrets of planes of existence beyond yours. For whatever ${mysticalSynonym()}
    reason, the stars are right for them to stop you, no matter the cost.`);
            break;
        case "Fraud": text = (stance == "Ally" ?
            `The lost reputation and ridicule of some unlucky or incapable fighters has driven them to desperation, and now they believe the only way to restore their name
    is to defeat ${finalboss.boss}. You just hope nobody gets too badly hurt.` :
            `The lost reputation and ridicule of some unlucky or incapable fighters has driven them to desperation, and ${finalboss.boss} has manipulated them
    think that the only way to restore their name is to defeat you. Sadly the fools absolutely will not stop hounding you no matter what you do.`);
            break;
        case "Gabriel":
            if (stance == "Ally" && !gladiators.includes(finalboss.boss) && !gladiators.includes("Gabriel")) {
                text = `Gabriel has received a letter from his sister Regina that informed him she is been held by ${finalboss.boss}. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? "He has joined you with his friend Drago to find his sister." : "He hopes you can help him locate his sister.") : "His mute friend Drago has joined you to help Gabriel's sister."}`
            } else if (stance == "Ally") {
                text = `Gabriel has received a letter from his sister Regina that informed him she is been held, but by whom? ${_.map(group, 'name').includes(motivation) ? `${motivation}${group.length == 2 ? `, along with Drago` : ""} will accompany you on your mission in order to find any clues.` : `${possessiveSuffix(motivation)} closest ally Drago accompanies you on your mission to find any clues on her whereabouts.`} `
            } else if (stance == "Rival" && gladiators.includes("Jackal") && !gladiators.includes("Gabriel")) {
                text = `You have apparently captured Gabriel's sister Regina at one point, but you cannot remember this - you have not been yourself. ${_.map(group, 'name').includes(motivation) ? `Now Gabriel is determined to confront you to locate his sister.${group.length == 2 ? ` His mute friend Drago follows him like a dog.` : ``}` : `His mute friend Drago hounds you to find the location of Gabriel's missing sister.`} They won't be hearing that you just don't know about Regina.`
            } else {
                text =
                    `Gabriel has received a letter from his sister Regina that informed him she is been held, but by whom? ${_.map(group, 'name').includes(motivation) ? `${motivation}${group.length == 2 ? `, along with Drago` : ""} believes you have information on her whereabouts and will not take no for an answer.` : `${possessiveSuffix(motivation)} believes you have information on her whereabouts and will not take no for an answer.`} `
            };
            break;
        case "Global Gladiator": text = (stance == "Ally" ?
            `Citadel has determined this mission to be of topmost priority. Agent Fletch has pulled all Global Gladiators available from less important tasks to aid you here.` :
            `Miscommunication, misunderstanding and misdirection has led Citadel to deploy a ${group.length == 1 ? "single Global Gladiator" : "group of Global Gladiators"}
    against you, and nothing you say can sway them from their mission.`);
            break;
        case "Golden Dragons": text = (stance == "Ally" ?
            `${bossclone ? `"An impostor has taken over my business, and he must go down," Ah Long tells you. You are not sure the Golden Dragons is the sort of ally you'd want to have,
    but you think you can count on them this one time. But which one is the clone?`: `"What ${finalboss.boss} is attempting is a risk to our businesses. The enemy of our enemy is our friend," ${group[0].name} says.
    You are not sure the Golden Dragons are the sort of friends you'd want to have, but they might be the ones you need.`}` :
            `You have been a thorn in the side of the Golden Dragons for a long time. While you are busy with your mission to get ${finalboss.boss}, they have sent a
    ${group.length == 1 ? "single enforcer" : "group of enforcers"} to remove that thorn.`);
            break;
        case "Gunslinger": text = (stance == "Ally" ?
            `A wandering ${group.length == 1 ? "gunslinger" : "band of gunslingers"} sees ${finalboss.boss} as an opportunity to test their mettle, and has decided to walk with you.` :
            `A wandering ${group.length == 1 ? "gunslinger" : "band of gunslingers"} sees you as an opportunity to test their mettle. They seem to show up wherever you go.`);
            break;
        case "Horseman": text = (stance == "Ally" ?
            `The mysterious Master must believe ${finalboss.boss} is truly a lost cause to his secretive goals, as ${group.length == 1 ? "a Horseman has" : `not one, but ${numberAsString(group.length)} horsemen have`} been sent after ${gPron(finalboss, "object")}.` :
            `The mysterious Master must believe you truly are an immense threat to his secretive goals, as ${group.length == 1 ? "a Horseman has" : `not one, but ${numberAsString(group.length)} horsemen have`} been sent to take you down.`);
            break;
        case "Indines": text = (stance == "Ally" ?
            `${group.length == 1 ? "This warrior" : "These warriors"} have been sent through from another world, a world of conflict and adventure. To stop Dragon King
    Greyheart being freed and save their world they have to save yours!` :
            `${group.length == 1 ? "This warrior" : "These warriors"} have been sent through from another world, a world of conflict and adventure. To stop Dragon King
    Greyheart being freed and save their world they have to doom yours!`);
            break;
        case "Insane": text = (stance == "Ally" ?
            `${group.length == 1 ? "This individual is" : "These individuals are"} unpredictable and dangerously unhinged. For their own reasons,
    they are following you around, dead set on taking on ${finalboss.boss}. You just have to hope they will not turn on you.` :
            `${group.length == 1 ? "This individual is" : "These individuals are"} unpredictable and dangerously unhinged. For whatever deranged reason,
    they are dead set on taking you out.`);
            break;
        case "Jackal":
            if (stance == "Ally" && !gladiators.includes(finalboss.boss) && !gladiators.includes("Jackal")) {
                text = `The Jackal has been doubting herself. Has Dark Matter changed her? Is she really herself anymore? The Kingdom is to blame. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? `She has joined you in hopes of ${finalboss.name == "Kingdom" ? `confronting their leadership` : `injuring their allies`}, and taken her greatest creation with her.` : `She has joined you in hopes of ${finalboss.name == "Kingdom" ? `confronting their leadership` : `injuring their allies`}.`) : `Her greatest creation, a snarling beast, stalks after you to get ${finalboss.name == "Kingdom" ? `their leadership` : `their allies`}.`}`
            } else if (stance == "Ally") { text = personalstory_ally } else if (stance == "Rival" && gladiators.includes("Shadow") && !gladiators.includes("Jackal")) {
                text = `The Jackal thinks you have changed her with Dark Matter, but you have only unleashed her true self. ${_.map(group, 'name').includes(motivation) ? `Now she is determined to confront you with this ridiculousness.${group.length == 2 ? ` She even has one of her genetic mutants following her around!` : ``}` : `She has sent one of her genetic mutants to find you!`} You really wouldn't have time for this nonsense.`
            } else { text = personalstory_enemy };
            break;
            case "James Wong": text = (stance == "Ally" ?
            `${(finalboss.name == "Kingdom" ? `James Wong is on a special mission by the BCPD to keep tabs on ${finalboss.boss}.`: `James Wong has been sent by the BCPD to help you search deeper on ${finalboss.name} operations and take them down.`)}${(group.length == 2 ? ` He has persuaded the FBI agent Ying Hua to search deeper into the situation.`: ``)}` :
            `James Wong, an officer from BCPD keeps on coming after you, slowing your investigation.${group.length == 2 ? ` He has the FBI agent Ying Hua assisting him.  ` : ` `}Is he who he says he is?`);
            break;
        case "Juan":
            if (stance == "Ally" && gladiators.map(x => x != finalboss.boss && x != "Juan")) {
                text = `Juan thinks the Kingdom has made the Cartel something it is not, and he needs to take the gang back. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? `He has joined forces with Tiger Azules to help the communities by confronting people like ${finalboss.boss} with you.` : `He will start by helping the communities by confronting people like ${finalboss.boss} with you.`) : "Tiger Azules has protected the people while the Cartel was a lost cause, and now tries to help Juan get them back on the right path by setting an example."}`
            } else if (stance == "Ally") { text = personalstory_ally } else if (stance == "Rival" && (redemption.some(v => gladiators.indexOf(v) !== -1) == true) && !gladiators.includes("Juan")) {
                text = `Juan thinks the Kingdom has made the Cartel something it is not. ${_.map(group, 'name').includes(motivation) ? `Now he is determined to show the communities that people like you can be stopped.${group.length == 2 ? ` Tiger Azules, defender of the streets has joined forces with him.` : ``}` : "Tiger Azules has protected the people while the Cartel was a lost cause, and now tries to help Juan get them back on the right path by setting an example."}`
            } else { text = personalstory_enemy };
            break;
        case "Kemono":
            if (stance == "Ally" && !gladiators.includes("Kemono") && !gladiators.includes("Shadow")) {
                text = `Kemono feels lost, questioning his actions for the Kingdom, struck by the cruelty of it. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? `The ancient warrior Darius is guiding him to end the malicious work of any enemy, no matter their loyalties.` : `The words of the ancient warrior Darius guide him to end the malicious work of any enemy, no matter their loyalties.`) : "The ancient warrior Darius walks with you to show Kemono the path to end the malicious work of any enemy, no matter their loyalties."}`
            } else if (stance == "Ally") { text = personalstory_ally } else if (stance == "Rival" && (redemption.some(v => gladiators.indexOf(v) !== -1) == true) && !gladiators.includes("Kemono")) {
                text = `Kemono feels lost, questioning his actions for the Kingdom, struck by the cruelty of it. ${_.map(group, 'name').includes(motivation) ? `${group.length == 2 ? `The ancient warrior Darius is guiding him to salvation by ending the malicious work of any enemy, no matter their loyalties.` : `The words of the ancient warrior Darius guide him to salvation by ending the malicious work of any enemy, no matter their loyalties.`}` : "The ancient warrior Darius does everything he can you to stop you to show Kemono the path to salvation by ending the malicious work of any enemy, no matter their loyalties."}`
            } else { text = personalstory_enemy };
            break;
        case "Kingdom": text = (stance == "Ally" ?
            `${bossclone ? `"An impostor has taken over my place in the Kingdom, and must go down," ${finalboss.boss} tells you. You're extremely wary of the Kingdom,
    but you think you can count on ${finalboss.boss} this one time. But which one is the clone?` : `The Kingdom knows you are their most dangerous enemy, but all their plans are smoke and mirrors. For some devious reason ${group.length == 1 ? "this warrior has" : "these warriors have"}
    joined you to stop ${finalboss.boss}. You are quite sure this alliance is tenuous and temporary at best, but you know you will need the help.`}` :
            `The Kingdom knows you are the only credible threat to their long-term plans, and ${group.length == 1 ? "this warrior has" : "these warriors have"} been
    sent to make sure the threat you pose will be neutralized.`);
            break;
        case "Law Enforcement": text = (stance == "Ally" ?
            `The law enforcement agencies around the world do not really understand the threat the Kingdom poses and are not equipped to properly fight it, but
    sometimes their operations align with your efforts.` :
            `The law enforcement agencies and their contacts and informants around the world are not immune to the reach of the Kingdom, and ${group.length == 1 ? "this corrupt individual" : "these corrupt officers or informants"}
    are determined to take you in - or take you out!`);
            break;
        case "Martial Arts Master": text = (stance == "Ally" ?
            `A wandering ${group.length == 1 ? "martial arts master" : "band of martial artists"} sees ${finalboss.boss} as an opportunity to test their mettle, and has decided to walk with you.` :
            `A wandering ${group.length == 1 ? "martial arts master" : "band of martial artists"} sees you as an opportunity to test their mettle. They seem to show up wherever you go.`);
            break;
        case "Megan":
            let megansenemy = finalboss.name
            if (stance == "Ally" && !gladiators.includes(finalboss.boss) && !gladiators.includes("Megan")) {
                text = `The ${megansenemy} is behind the theft of tens of thousands of dollars from Megan's family's company. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? `She has joined forces with the unhinged criminal Sera O'Quinn, who believes they are responsible for her father's corruption, and they will help you take the ${megansenemy} down.` : `She has joined forces with you to help you take the ${megansenemy} down.`) : `The unhinged criminal Sera O'Quinn believes this is somehow related to her family, and has joined you to take the ${megansenemy} down.`}`
            } else if (stance == "Ally") { text = personalstory_ally } else if (stance == "Rival" && (redemption.some(v => gladiators.indexOf(v) !== -1) == true) && !gladiators.includes("Megan")) {
                text = `Under the influence of the Kingdom, you has been involved in many things that you regret. ${_.map(group, 'name').includes(motivation) ? `${group.length == 2 ? ` Megan and Sera both accuse you of ruining their family businesses, and now they do everything they can to bring you down.` : `Megan accuses you of an extensive theft from her company, which was techincally the doings of the O'Quinn family.`}` : `Sera O'Quinn accuses you of corrupting her father, and tries to bring you down.`} You admit you might be responsible, but your hands would be full as they are!`
            } else { text = personalstory_enemy };
            break;
        case "Mr. Apple":
            if (stance == "Ally") {
                text = `After an exhibition Sensei Apple was surrounded by ${finalboss.minions()} and their leader challenged him to a fight. Unfortunately, due to lack of music Sensei Apple lost his rhythm and it didn't take long for him to be overwhelmed. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? `Now he has joined forces with his protege to find his assailant and show ${gPron(finalboss, "object")} what true skill is.` : `Now he has joined forces with you to find his assailant and show ${gPron(finalboss, "object")} what true skill is.`) : `His protege is determined to find the assailants and return the honor of her master.`}`
            } else { text = `After and exhibition Sensei Apple was surrounded by an unknown group of martial artists. Unfortunately, due to lack of music Sensei Apple lost his rhythm and it didn't take long for him to be overwhelmed. ${_.map(group, 'name').includes(motivation) ? `Confused and angry, he is determined you are the assailants, and tries to face you at every turn${group.length == 2 ? `, and drags his apprentice along` : ``}.` : `Confused and angry, he is determined you are the assailants, and his protege is determined to return the honor of her master.`}` };
            break;
        case "Monk": text = (stance == "Ally" ?
            `${group.length == 1 ? `A lone warrior monk has` : `A group of warrior monks have`} left their distant monastery to deliver ${finalboss.boss} the wisdom to leave the corrupt way.
    Wisdom often comes with pain.` :
            `${group.length == 1 ? `A lone warrior monk has` : `A group of warrior monks have`} left their distant monastery to bring down the oppressor.
    You certainly didn't see Citadel that way.`);
            break;
        case "Music": text = (stance == "Ally" ?
            `${group.length == 1 ? "This talent is" : "These talents are"} true royalty of rhythm, while they find ${finalboss.boss} clearly is not.
    To show ${finalboss.boss} who should be crowned the Majesty of Music, the ${group.length == 1 ? "artist has" : "artists have"} unfortunately decided to follow you to face ${gPron(finalboss, "object")} in a dance-off.` :
            `Wherever you go, ${group.length == 1 ? "this talent" : "these talents are"} there, ready for a dance-off. For what purpose, you cannot fathom, but you're afraid they will get hurt.`);
            break;
        case "Natalia":
            if (stance == "Ally" && !gladiators.includes(finalboss.name) && !gladiators.includes("Natalia")) {
                text = `${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? `Natalia and her young protege Zane join your mission, as they are going to avenge the ${finalboss.name} strike that killed the boy's parents.` : `Natalia joins your mission, as she is going to avenge the ${finalboss.name} strike that killed Zane's parents.`) : `The orphaned boy Zane is trying to track down the murderous ${finalboss.name} who are responsible for the death of his parents, and has asked for your help.`}`
            } else if (stance == "Ally") { text = personalstory_ally } else if (stance == "Rival" && gladiators.map(x => redemption.includes(x)) && !gladiators.includes("Natalia")) {
                text = `The Kingdom orchestrated the strike that left Zane's parents dead${_.map(group, 'name').includes(motivation) ? `${group.length == 2 ? `, and Natalia is helping the boy confront those responsible.` : `, and Natalia will confront those responsible for the boy.`}` : ", and the orphaned boy is determined to confront those responsible."}`
            } else { text = personalstory_enemy };
            break;
        case "Onyx League": text = (stance == "Ally" ?
            `The ongoing plans of ${finalboss.boss} will lead only to mindless destruction, not anarcy through strength the Onyx League is after.
    A ${group.length == 1 ? "single enforcer" : "group of enforcers"} has been sent to correct this course. You're lucky to have them on your side!` :
            `You have been a thorn in the side of the Onyx League for a long time. While you are busy with your mission to get ${finalboss.boss}, they have sent a
    ${group.length == 1 ? "single enforcer" : "group of enforcers"} to remove that thorn.`);
            break;
        case "Organized Crime": text = (stance == "Ally" ?
            `The ongoing plans of ${finalboss.boss} risks the stability that organized crime requires, and a ${group.length == 1 ? "single enforcer" : "group of enforcers"}
    has been sent to crush the opposition. You're lucky to have them on your side!` :
            `Organized crime sees the ongoing plans of ${finalboss.boss} a perfect time to hit law enforcement everywhere, and Citadel is no exception to their plans. A
    ${group.length == 1 ? "single enforcer" : "group of enforcers"} has been sent to take you out.`);
            break;
        case "Parasol": text = (stance == "Ally" ? (bossclone ? `"An impostor has taken over my place in Parasol, and he must go down," ${finalboss.boss} tells you. You're extremely wary of Parasol,
    but you think you can count on ${finalboss.boss} this one time. But which one is the clone?`:
            `The ongoing plans of ${finalboss.boss} risks the stability that the operation of Parasol requires, and a ${group.length == 1 ? "single enforcer" : "group of enforcers"} has been sent to crush the opposition. You're lucky to have them on your side!`) :
            `Parasol sees the ongoing plans of ${finalboss.boss} a perfect time to hit their opponents hard, and Citadel is no exception to their plans. A
    ${group.length == 1 ? "single enforcer" : "group of enforcers"} has been sent to take you out.`);
            break;
        case "Past": text = (stance == "Ally" ?
            `${group.length == 1 ? "A single warrior" : "A group of warriors"} from the past holds archaic knowledge that they will use to determine the future.
    Fortunately for you, you seem to be a part of that future.` :
            `${group.length == 1 ? "A single warrior" : "A group of warriors"} from the past holds archaic knowledge that they will use to determine the future.
    Unfortunately for you, you need to be erased from that future.`);
            break;
        case "Project X":
            if (stance == "Ally" && finalboss.boss == "Jackal" && !gladiators.includes("Jackal") && !gladiators.includes("Project X")) {
                text = `The eerie, fightening creature known as Project X is searching for her "mother",  ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? "and it seems like this will not be a social call. Natalia vouches for her good heart, but you have your suspicions." : "and it seems like this will not be a social call. You feel you have no choice but to let her stalk with you.") : "and Natalia has joined you to help her locate her."}`
            } else if (stance == "Ally") { text = personalstory_ally } else { text = personalstory_enemy };
            break;
        case "Psychic": text = (stance == "Ally" ?
            `${group.length == 1 ? "This mysterious figure" : "This mysterious group"} has mastered the ${mysticalSynonym()} powers of the mind, and has foreseen the future.
    They have determined ${possessiveSuffix(finalboss.boss)} plans will have to change.` :
            `${group.length == 1 ? "This mysterious figure" : "This mysterious group"} has mastered the ${mysticalSynonym()} powers of the mind, and has foreseen the future.
    They have determined ${possessiveSuffix(finalboss.boss)} plans must come to fruition. They seem to know your every move, and appear wherever you go!`);
            break;
        case "Science": text = (stance == "Ally" ?
            `What ${finalboss.boss} is planning has a scientific angle that an inquiring mind cannot bypass. This ${group.length == 1 ? "analyst" : "group of analysts"}
    will follow you for research purposes.` :
            `What ${finalboss.boss} is planning has a scientific angle that an inquiring mind cannot bypass. This ${group.length == 1 ? "analyst" : "group of analysts"}
    is trying to stop you so they can observe this interesting event first hand!`);
            break;
        case "Sensei": text = (stance == "Ally" ?
            `${group.length == 1 ? "A wandering sensei has" : "Wandering sensei have"} decided your training is not quite complete, and they oversee your journey to
    ensure your discipline will reach its potential.` :
            `${group.length == 1 ? "A wandering sensei has" : "Wandering sensei have"} decided your training is not quite complete, and they follow you on your path to teach you a lesson in
    discipline and skill.`);
            break;
        case "Sera O'Quinn":
            let serassenemy = finalboss.name == "Kingdom" ? finalboss.boss : finalboss.name
            if (stance == "Ally" && !gladiators.includes(finalboss.boss) && !gladiators.includes("Sera O'Quinn")) {
                text = `The ${megansenemy} is behind the corruption of Sera's father, of so she believes. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? `She has joined forces with a friend of hers, and together they will help you bring ${megansenemy} down.` : `She has joined forces with you to help you take the ${megansenemy} down.`) : `A friend of hers will assist you in taking ${megansenemy} down.`}`
            } else if (stance == "Ally") { text = personalstory_ally } else if (stance == "Rival" && (redemption.some(v => gladiators.indexOf(v) !== -1) == true) && !gladiators.includes("Sera O'Quinn")) {
                text = `Under the influence of the Kingdom, you has been involved in many things that you regret. Sera O'Quinn accuses you of corrupting a legitimate businessman: his father, Jack O'Quinn. Now ${_.map(group, 'name').includes(motivation) ? `${group.length == 2 ? `she and her friend` : `she`}` : `her friend`} will do everything they can to bring you down. You admit you might be responsible, but your hands would be full as they are!`
            } else { text = personalstory_enemy };
            break;
        case "Shadow":
            let alliesofthekingdom = ["Juan", "Tlazolteotl", "Mack", "Ah Long", "Dmitri"]
            if (stance == "Ally" && finalboss.boss.includes(alliesofthekingdom) && !gladiators.includes("Shadow")) {
                text = `The mysterious figure behind the Kingdom has suspicion that Shadow is losing his grip on the allies of the Kingdom. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? `As if this accusation was not enough, Shin Yokai has been sent to "assist" Shadow in ensuring ${possessiveSuffix(finalboss.boss)} loyalty.` : `Shadow has decided to personally ensure ${finalboss.boss} will remain loyal.`) : `Shin Yokai has been sent to ensure ${possessiveSuffix(finalboss.boss)} loyalty.`}`
            } else if (stance == "Ally" && !gladiators.includes(finalboss.boss) && !gladiators.includes("Shadow")) {
                text = `Shadow feels ${finalboss.boss} needs a reminder of who is ${gPron(finalboss, "possessive")} true master. ${_.map(group, 'name').includes(motivation) ? `${group.length == 2 ? `Shin Yokai has been ordered to assist him if ${finalboss.boss} seems to have forgotten ${gPron(finalboss, "possessive")} true loyalties.` : `He has decided to remind ${gPron(finalboss, "object")} personally.`}` : `Shin Yokai has been sent to remind ${gPron(finalboss, "object")} of ${gPron(finalboss, "possessive")} loyalty.`}`
            } else if (stance == "Ally") { text = personalstory_ally } else if (stance == "Rival" && (alliesofthekingdom.some(v => gladiators.indexOf(v) !== -1) == true) && !gladiators.includes("Shadow")) {
                text = `The mysterious figure behind the Kingdom has suspicion that Shadow is losing his grip on the allies of the Kingdom. ${_.map(group, 'name').includes(motivation) ? `${group.length == 2 ? `As if this accusation was not enough, Shin Yokai has been sent to "assist" Shadow in ensuring your loyalty.` : `Shadow has decided to show his loyalty by personally confronting you.`}` : `Shin Yokai has been sent to ensure your loyalty.`}`
            } else if (stance == "Rival" && (gladiators.includes("Jackal") || gladiators.includes("Kemono")) && !gladiators.includes("Shadow")) {
                text = `Shadow feels you need a reminder of who is your true master. ${_.map(group, 'name').includes(motivation) ? `${group.length == 2 ? `Shin Yokai has been ordered to assist him if you seem to have forgotten your true loyalties.` : `He has decided to remind you personally.`}` : `Shin Yokai has been sent to remind you of your loyalty.`}`
            } else { text = personalstory_enemy };
            break;
        case "Shin Yokai":
            if (stance == "Ally" && finalboss.boss != "Yokai" && !gladiators.includes("Yokai")) {
                text = `The furious master of the Oni, Shin Yokai believes he has been betrayed by his Master, and wants to find ${finalboss.boss} to find out what ${gPron(finalboss, "subject")} knows. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? `He has taken pity on one Marionette Doll called June, and protects her on their travels.` : `He looks like he is unable to control the demonic force, and is no longer in touch with his human side.`) : `June, a Marionette Doll he once helped tries to repay the debt helping you find ${finalboss.boss} for him.`}`
            } else if (stance == "Ally") { text = personalstory_ally } else if (stance == "Rival" && gladiators.includes("Shadow") && !gladiators.includes("Yokai")) {
                text = `The furious master of the Oni, Shin Yokai believes he has been betrayed by his Master, and wants to find out what you know about him. ${_.map(group, 'name').includes(motivation) ? `${group.length == 2 ? `A Marionette Doll called June he once helped tries to repay this by helping him interrogate you.` : `He looks like he is unable to control the demonic force, and is no longer in touch with his human side.`}` : `A Marionette Doll called June he once helped tries to repay this by fishing the information out of you.`} You know nothing but this matters not. You have to deal with this yourself.`
            } else { text = personalstory_enemy };
            break;
        case "Soldier": text = (stance == "Ally" ?
            `Citadel has many soldiers and mercenaries in their contacts, and a ${group.length == 1 ? "single soldier" : "team of soldiers"}
    has been assigned with you to eliminate the threat ${finalboss.boss} poses.` :
            `The world is full of rogue nations and terrorist organizations with soldiers for hire and private armies everywhere. A mysterious malefactor has sent a
    ${group.length == 1 ? "a formidable mercernary" : "team of mercenaries"} to eliminate the Citadel's finest. They will not stop until you are dead.`);
            break;
        case "Street": text = (stance == "Ally" ?
            `The streets have had enought of the constant threat the evil machinations of ${finalboss.boss} and ${gPron(finalboss, "possessive")} ilk pose to the common people.
    ${group.length == 1 ? "A defender of the streets has" : "Defenders of the streets have"} decided to aid you in taking ${finalboss.boss} out!` :
            `Your perpetual fights with ${finalboss.boss} and ${gPron(finalboss, "possessive")} ilk pose a constant threat to the common people.
    ${group.length == 1 ? "A defender of the streets has" : "Defenders of the streets have"} decided you are the worse of two evils!`);
            break;
        case "Tlazolteotl":
            if (stance == "Ally" && finalboss.name == "Kingdom" && !gladiators.includes("Tlatzoleotl")) {
                text = `The supposed Aztec god of renewal Tlazolteotl has seen that there is a new power that is worshiped above the powers of the old. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? `The creature Kemono has submitted to his true master's will, and travels with the empress` : `The empress will travel with you`) : `The creature Kemono has submitted to his true master's will and comes with you`} to teach the Kingdom of the wrath of the old gods.`
            } else if (stance == "Ally") { text = personalstory_ally } else if (stance == "Rival" && (["Shadow", "Kemono", "Jackal"].some(v => gladiators.indexOf(v) !== -1) == true) && !gladiators.includes("Tlazolteotl")) {
                text = `The supposed Aztec god of renewal Tlazolteotl sees you represent a new power that is worshiped above the powers of the old. ${_.map(group, 'name').includes(motivation) ? `${group.length == 2 ? `The creature Kemono has submitted to his true master's will, and travels with the empress` : `The empress will hunts you`}` : `The creature Kemono has submitted to his true master's will and hunts you`} to teach you of the wrath of the old gods.`
            } else { text = personalstory_enemy };
            break;
        case "Toxic": text = (stance == "Ally" ?
            `${group.length == 1 ? "This warrior has" : "These warriors have"} received a vision of the future from toxin experimentation. They have determined ${finalboss.boss} cannot be allowed to continue on this path. They have joined you in your mission.` :
            `${group.length == 1 ? "This warrior has" : "These warriors have"} received a vision of the future from toxin experimentation. They have determined ${finalboss.boss} must be allowed to continue on this path. They attempt to stop you at every turn.`);
            break;
        case "Twin Tiger": text = (stance == "Ally" ?
            `Twin Tiger dojo has decided your skills are lacking, and ${group.length == 1 ? `${group[0].name}` : "these fighters"} oversee your journey to
    ensure your discipline will reach its potential.` :
            `Twin Tiger dojo has decided your recklessness is not a good example to the community, and ${group.length == 1 ? `${group[0].name} follows` : "these fighters follow"} you on your path to teach you a lesson in discipline and skill.`);
            break;
        case "Wanderer": text = (stance == "Ally" ?
            `Some wander the world on their personal quests, and now your goals seem to have aligned.
    They will travel with you, and if defeating ${finalboss.boss} is what is needed to accomplish their goals, they would die trying.` :
            `Some wander the world on their personal quests, and now you seem to be in the way of ${group.length == 1 ? `the goal of this individual` : `the mutual purpose of these fighters`}.
    They will go wherever it takes, and if your defeat is what is needed to accomplish their goals, then so be it.`);
            break;
        case "Ying Hua":
            if (stance == "Ally" && !gladiators.includes("Ying Hua")) {
                text = `Officer Ying Hua has reveived a mysterious invitation lodged in the skull of an infamous ${finalboss.name == "Golden Dragons" || finalboss.name == `All-Heaven Gang` ? `Triad leader` : `crime boss`} and is looking to find the highest ranks of the ${finalboss.name} and confront whoever is pulling the strings. ${_.map(group, 'name').includes(motivation) ? (group.length == 2 ? "She has enlisted an ambitious enforcer of the Dragons as an informant to help her and you." : "She has decided she cannot play this one by the book, and has joined forces with you.") : "She has sent an ambitious enforcer of the Dragons she recruited as an informant to assist in locating the mysterious leader."}`
            } else if (stance == "Ally") { text = personalstory_ally } else if (stance == "Rival" && gladiators.includes("Ah Long") && !gladiators.includes("Ying Hua")) {
                text = `The mysterious invitation you had sent to officer Ying Hua was supposed to keep her occupied and give the Golden Dragons room to operate, but she has learned who is behind he invite, and wants an explanation. Now the original plan is unnecessary, and you have to deal with her himself. ${(!(_.map(group, 'name').includes(motivation)) || group.length == 2) ? `Jin has even been assisting the officer. You are ashamed he recovered his honor before you did.` : ``}`
            } else { text = personalstory_enemy };
            break;
        case "Youth": text = (stance == "Ally" ?
            `${group.length == 1 ? "This youth" : "These youths"} hold more power than anyone of their age should have. With recklessness of their age, they are trying to
    stop the evil of ${finalboss.boss}. You don't think you can restrain them, so the only way you can look after them is to let them accompany you.` :
            `${group.length == 1 ? "This exceptionally powerful youth" : "These exceptionally powerful youths"} are trying to find their place in the world.
    ${finalboss.boss} has manipulated them to follow the path of darkness. They seem to be wherever you go, and you have no choice but to fight them.`);
            break;
        default: text = (stance == "Ally" ? "For whatever reason, these people stand with you againt the schemes of the Kingdom." : "For whatever reason, these people stand with the Kingdom against you.");
    }

    text = `If you choose to use additional ${stance == "Ally" ? "Allies" : "Rivals"} during this story, read the following text and use the setup instructions below.<br><br><i>`
        + text + `</i>`
    return text

}

function getTransformationSequence(enemy, blade = null, source = null) {

    source == null ? source = enemy.name : () => { }
    blade == null ? blade = `blade` : () => { }

    tranformations = [`Standing in the middle of the temple, ${gPron(enemy, "subject")} rises up off the stone floor, the ${mysticalSynonym()} powers swirling around ${gPron(enemy, "object")}. You watch as ${gPron(enemy, "possessive")} muscles grow, ${gPron(enemy, "possessive")} eyes burn, and ${gPron(enemy, "possessive")} body pulses with the ${mysticalSynonym()} energies!`,
    `Surrounded by an aura as dark and ominous as ${gPron(enemy, "possessive")} very reputation, ${gPron(enemy, "subject")} steps forth. ${ucInit(gPron(enemy, "possessive"))} eyes glow with a deep red energy, and ${gPron(enemy, "subject")} turns those burning orbs on you.`,
    `With a release of ${mysticalSynonym()} energy that leaves a crater beneath ${gPron(enemy, "object")}, ${gPron(enemy, "possessive")} skin peels off and ${gPron(enemy, "possessive")} blood turns into a red-black layer of horned carapace. Bony spurs burst forth, connected to ${gPron(enemy, "possessive")} body by ligaments. ${ucInit(gPron(enemy, "subject"))} turns ${gPron(enemy, "possessive")} dead-white, glowing eyes on you.`,
    `${ucInit(gPron(enemy, "subject"))} makes a strangling sound, and the ${mysticalSynonym()} transformation begins. ${ucInit(gPron(enemy, "possessive"))} skin turns gray all over, like a corpse. Every part of ${gPron(enemy, "possessive")} body swells up like it is about to burst. You hear the cracking noise of ${gPron(enemy, "possessive")} bones stretching. ${ucInit(gPron(enemy, "subject"))} rises to ${gPron(enemy, "possessive")} new, full height, towering over you, and slams ${gPron(enemy, "possessive")} mighty fists against ${gPron(enemy, "possessive")} chest with a release of ${mysticalSynonym()} energy.`,
    `"${ucInit(mysticalSynonym())} power has been revealed to me!" ${gPron(enemy, "subject")} says. Lifting aloft ${gPron(enemy, "possessive")} ${mysticalSynonym()} ${blade}, ${gPron(enemy, "subject")} shouts: "By the power of ${source}!" A shimmering cascade of ${mysticalSynonym()} energy rains down on ${gPron(enemy, "object")}. ${ucInit(gPron(enemy, "possessive"))} muscles bulge, and ${gPron(enemy, "subject")} brings the ${blade} in front of ${gPron(enemy, "object")} in a wide, two-handed grip. "I have the power!"`
    ]

    return randFrom(tranformations)


}

function getCasino(enemy) {

    let animal, prefix

    switch (enemy.name) {
        case "Brotherhood":
            animal = randFrom(["Bear", "Wolf", "Domovoy", "Rusalka", "Fox", "Rooster", "Wolf", "Dragon"]);
            prefix = randFrom(["Red", "Black", "Yellow", "Comrade", "Working", "Industrial"]);
            break;
        case "Nahualli":
            animal = randFrom(["Jaguar", "Rabbit", "Frog", "Monkey", "Butterfly", "Eagle", "Wolf", "Crocodile", "Hummingbird"]);
            prefix = randFrom(["Sky", "Jade", "Sun", "Turquoise", "Comet", "Blue", "Leaf"]);
            break;
        case "Cartel":
            animal = randFrom(["Lamb", "Phoenix", "Dove", "Peacock", "Phoenix", "Lion", "Ox", "Eagle", "Pelican", "Siren", "Ram", "Fish"]);
            prefix = randFrom(["White", "Golden", "Brazen", "Red", "Brown", "Green", "Fire", "Light"]);
            break;
        case "Onyx League":
            animal = randFrom(["Cat", "Fox", "Coyote", "Spider", "Raven", "Leviathan"]);
            prefix = randFrom(["Black", "Red", "Chaos", "Unbound", "Green", "Orange", "Onyx", "Shadow"]);
            break;
        default:
            animal = randFrom(["Dragon", "Tiger", "Serpent", "Phoenix", "Tortoise", "Lion", "Crane", "Oyster", "Fox", "Snake", "Panda", "Mantis", "Snake"])
            prefix = randFrom(["Cloud", "Black", "Terracotta", "Jade", "Azure", "Vermilion", "White", "Yellow", "Wood", "Fire", "Metal", "Water", "Earth", "Void", "Sky", "Blue"]);
    }

    let suffix = randFrom(["Den", "Nest", "Sanctuary", "Cloister", "Retreat"])

    let casino = randFrom([`${possessiveSuffix(animal)} ${suffix}`, `${prefix} ${animal}`])

    return casino
}
