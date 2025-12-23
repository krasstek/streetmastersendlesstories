import _ from 'lodash';

import { getEnemies, getStages, getGladiators } from '$lib/stages';


export function randFrom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

export function filterArray(array, key, filter, exclusion = false) {
    if (exclusion == false) {
        array = _.filter(array, function (o) { return o[key] == filter })
    } else array = _.filter(array, function (o) { return o[key] != filter });
    return array
}

function cleanStages(stages) {
    for (let i = 0; i < stages.length; i++) {
        if (stages[i].instory >= 2) {
            stages.splice(i, 1);
            i = i - 1;

        }
    }
    return stages

}

export function globalGladiators(enemies, stages, expansionfilter, gladiatorselect, players) {

    let gladiators = getGladiators(expansionfilter, enemies, stages)
    let selected_gladiators = gladiators.filter(g => gladiatorselect.includes(g.name))
    gladiators = gladiators.filter(g => !gladiatorselect.includes(g.name))
    let globalgladiators = []

    while (globalgladiators.length < players) {
        if (selected_gladiators.length > 0) {
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
    //console.log(globalgladiators);
    return globalgladiators;
}

export function bossDescription(enemy) {
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

export function createStory(expansionfilter, gladiatorfilter, players, nstages) {

    let enemies = getEnemies(expansionfilter);
    let stages = getStages(expansionfilter);

    let globalgladiators = globalGladiators(enemies, stages, expansionfilter, gladiatorfilter, players)

    let herostages = []
    let supportingcast = []
    let heronames = []
    let heroenemies = []
    let herodialogue = []

    globalgladiators.forEach(g => {
        herostages.push(g.stage);
        supportingcast = _.union(supportingcast, g.ally);
        supportingcast = _.union(supportingcast, g.rival);
        heronames.push(g.name);

        if (Array.isArray(g.enemy)) {
            heroenemies.push(...g.enemy);
        }

        if (Array.isArray(g.dialogue)) {
            herodialogue.push(...g.dialogue);
        }

    });

    herostages = _.flatten(herostages)

    if (nstages > 1) { // only if more than one stage
        herostages = (_.uniq(herostages)).filter(function (el) { return el; });
        supportingcast = (_.uniq(supportingcast)).filter(function (el) { return el; });
        heroenemies = (_.uniq(heroenemies)).filter(function (el) { return el; });
    } else {
        herostages = [""]
        supportingcast = [""]
        heroenemies = [""]
    }

    let alliesandrivals = [
        // add keywords:
        { name: "Abolo", expansion: "rumblepack", gender: "male", keywords: ["Clone", "Arcade", "Onyx League", "Street"] },
        { name: "Ah Long", expansion: "riseofthekingdom", gender: "male", keywords: ["Boss", "Golden Dragons", "Organized Crime", "Martial Arts Master", "Chi", "Clone", "Ah Long", "Arcade"] },
        { name: "Ah Long of Brook City", expansion: "keystothekingdom", gender: "male", keywords: ["Boss", "Brook City", "Golden Dragons", "Organized Crime", "Past", "Clone", "Ah Long of Brook City", "Arcade"] },
        { name: "Anastasia", expansion: "redemption", gender: "female", keywords: ["Brotherhood", "Black Ops", "Gunslinger", "Soldier", "Clone", "Arcade"] },
        // add keywords:
        { name: "Axel", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade", "Law Enforcement", "Street"] },
        // add keywords:
        { name: "Bartholomew", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade", "Blade", "Extraplanar", "Black Ops", "Davenport Manor"] },
        // add keywords:
        { name: "Bonnie", expansion: "stretchgoals18", gender: "female", keywords: ["Clone", "Arcade"] },
        // add keywords:
        { name: "Boris", expansion: "rumblepack", gender: "male", keywords: ["Clone", "Arcade", "Brotherhood"] },
        { name: "Brandon", expansion: "redemption2", gender: "male", keywords: ["Celebrity", "Fraud", "Martial Arts Master", "Global Gladiator", "Wanderer", "Clone", "Brandon", "Music", "Arcade"] },
        { name: "Chan Chan", expansion: "stretchgoals17", gender: "female", keywords: ["Beast", "Dark Matter", "Martial Arts Master", "Kingdom", "Insane", "Clone", "Arcade"] },
        // add keywords:
        { name: "Clint", expansion: "rumblepack", gender: "male", keywords: ["Clone", "Arcade", "Gunslinger", "Wanderer", "Street"] },
        // add keywords:
        //        { name: "Chian", expansion: "rumblepack", gender: "male", keywords: ["Clone", "Arcade"] },
        { name: "Clinhyde Eight", expansion: "battlecon", gender: "male", keywords: ["Black Ops", "Indines", "Psychic", "Toxic", "Clone", "Arcade"] },
        // add keywords:
        { name: "Crunk", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade"] },
        // add keywords:
        { name: "Dao", expansion: "rumblepack", gender: "male", keywords: ["Clone", "Arcade", "Golden Dragons"] },
        // add keywords:
        //        { name: "Dan", expansion: "rumblepack", gender: "male", keywords: ["Clone", "Arcade"] },
        { name: "Darius", expansion: "redemption", gender: "male", keywords: ["Past", "Kingdom", "Martial Arts Master", "Toxic", "Clone", "Kemono", "Arcade"] },
        { name: "Dmitri", expansion: "riseofthekingdom", gender: "male", keywords: ["Boss", "Black Ops", "Brotherhood", "Soldier", "Clone", "Arcade"] },
        // add keywords:
        { name: "Dolores", expansion: "stretchgoals18", gender: "female", keywords: ["Clone", "Arcade", "Davenport Manor", "Blade"] },
        { name: "Drago", expansion: "riseofthekingdom", gender: "male", keywords: ["Black Ops", "Brotherhood", "Competitor", "Street", "Clone", "Gabriel", "Arcade"] },
        // add keywords:
        { name: "Felicia Salt", expansion: "rumblepack", gender: "female", keywords: ["Clone", "Arcade", "Onyx League", "Street"] },
        { name: "Gabriel", expansion: "redemption2", gender: "male", keywords: ["Global Gladiator", "Martial Arts Master", "Street", "Wanderer", "Clone", "Gabriel", "Arcade"] },
        { name: "Genesis", expansion: ["redemption2", "stretchgoals18"], gender: "female", keywords: ["Cifarelli", "Organized Crime", "Extraplanar", "Street", "Clone", "Music", "Arcade"] },
        // add keywords:
        { name: "Glam", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade"] },
        // add keywords:
        { name: "Grill", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade"] },
        { name: "Hanzo", expansion: "riseofthekingdom", gender: "male", keywords: ["Past", "Sensei", "Wanderer", "Blade", "Global Gladiator", "Kingdom", "Clone", "Arcade"] },
        // add keywords:
        { name: "Ignacio", expansion: "rumblepack", gender: "male", keywords: ["Clone", "Arcade", "Street", "Organized Crime", "Cartel", "Gunslinger"] },
        // add keywords: maybe "Oni" would be better..
        { name: "Ikuchi", expansion: "essenceofevil", gender: "male", keywords: ["Clone", "Arcade", "Extraplanar", "Shin Yokai"] },
        { name: "Isabella", expansion: "riseofthekingdom", gender: "female", keywords: ["Celebrity", "Martial Arts Master", "Wanderer", "Clone", "Brandon", "Golden Dragons", "Music", "Arcade"] },
        { name: "Jackal", expansion: "riseofthekingdom", gender: "female", keywords: ["Dark Matter", "Insane", "Kingdom", "Psychic", "Science", "Clone", "Jackal", "Arcade"] },
        /*add keywords*/
        { name: "Jade", expansion: "aftershock", gender: "female", keywords: ["Clone", "Arcade"] },
        // add keywords:
        { name: "James Wong", expansion: "rumblepack", gender: "male", keywords: ["Black Ops", "Brook City", "James Wong", "Law Enforcement", "Kingdom", "Clone", "Arcade"] },
        { name: "James Wong of Brook City", expansion: "keystothekingdom", gender: "male", keywords: ["Black Ops", "Brook City", "James Wong", "Law Enforcement", "Kingdom", "Past", "Clone", "Arcade"] },
        { name: "Jin", expansion: "riseofthekingdom", gender: "male", keywords: ["Golden Dragons", "Organized Crime", "Blade", "Law Enforcement", "Clone", "Ying Hua", "Arcade"] },
        { name: "Juan", expansion: "riseofthekingdom", gender: "male", keywords: ["Cartel", "Organized Crime", "Gunslinger", "Street", "Clone", "Juan", "Arcade"] },
        { name: "Kemono", expansion: "riseofthekingdom", gender: "male", keywords: ["Beast", "Kingdom", "Competitor", "Chi", "Clone", "Kemono", "Tlazolteotl", "Horseman", "Aztec", "Arcade"] },
        // add keywords:
        { name: "Kenshin", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade"] },
        { name: "Khadath Ahemusei", expansion: "battlecon", gender: "male", keywords: ["Indines", "Science", "Extraplanar", "Wanderer", "Clone", "Arcade"] },
        // add keywords:
        { name: "Kitsune", expansion: "rumblepack", gender: "female", keywords: ["Clone", "Arcade", "Extraplanar", "Shin Yokai"] },
        // add keywords: Maybe "Oni" would work better
        { name: "Kyoryu", expansion: "essenceofevil", gender: "male", keywords: ["Clone", "Arcade", "Shin Yokai", "Global Gladiator", "Chi", "Martial Arts Master"] },
        { name: "Leeta", expansion: ["twintiger", "redemption", "Arcade"], gender: "female", keywords: ["Brook City", "Street", "Wanderer", "Past", "Clone", "Onyx League", "Arcade"] },
        // add keywords:
        { name: "Lola", expansion: "stretchgoals18", gender: "female", keywords: ["Clone", "Arcade"] },
        { name: "Lotus", expansion: "keystothekingdom", gender: "female", keywords: ["Brook City", "Golden Dragons", "Organized Crime", "Past", "Clone", "Ah Long of Brook City", "Arcade"] },
        // add keywords:
        { name: "Luke", expansion: "tideofthedragon", gender: "male", keywords: ["Clone", "Arcade"] },
        { name: "Marionette Doll", expansion: "redemption2", gender: "female", keywords: ["Dark Matter", "Kingdom", "Martial Arts Master", "Psychic", "Clone", "Shin Yokai", "Arcade"] },
        { name: "Mary Ann", expansion: "twintiger", gender: "female", keywords: ["Street", "Clone", "Twin Tiger", "Onyx League", "Youth", "Arcade"] },
        // add keywords:
        { name: "Master Pie", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade", "Sensei", "Martial Arts Master"] },
        // add keywords:
        { name: "Max", expansion: "rumblepack", gender: "male", keywords: ["Clone", "Arcade", "Boss", "Global Gladiator", "Celebrity"] },
        { name: "Megan", expansion: "redemption2", gender: "female", keywords: ["Celebrity", "Chi", "Fraud", "Global Gladiator", "Martial Arts Master", "Wanderer", "Clone", "Megan", "Law Enforcement", "Mr. Apple", "Arcade"] },
        // add keywords: ## add Ying Hua relation
        { name: "Miss Matrix", expansion: "stretchgoals18", gender: "female", keywords: ["Clone", "Arcade", "Boss"] },
        // add keywords:
        { name: "Mountain General", expansion: "rumblepack", gender: "male", keywords: ["Clone", "Arcade", "Kingdom", "Martial Arts Master"] },
        { name: "Mr. Apple", expansion: "stretchgoals17", gender: "male", keywords: ["Celebrity", "Fraud", "Sensei", "Music", "Clone", "Mr. Apple", "Arcade"] },
        { name: "Natalia", expansion: "redemption2", gender: "female", keywords: ["Black Ops", "Global Gladiator", "Martial Arts Master", "Soldier", "Wanderer", "Clone", "Natalia", "Project X", "Street", "Arcade"] },
        { name: "Power Soldier", expansion: "redemption2", gender: "undefined", keywords: ["Dark Matter", "Beast", "Black Ops", "Kingdom", "Martial Arts Master", "Clone", "Arcade"] },
        { name: "Project X", expansion: ["redemption", "aftershock"], gender: "female", keywords: ["Dark Matter", "Beast", "Insane", "Martial Arts Master", "Youth", "Clone", "Jackal", "Project X", "Arcade"] },
        // add keywords:
        { name: "Pux", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade"] },
        // add keywords:
        { name: "Reika", expansion: "stretchgoals18", gender: "female", keywords: ["Clone", "Arcade"] },
        // add keywords:
        { name: "Rhys", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade", "Street", "Law Enforcement"] },
        // add keywords:
        { name: "Selene", expansion: "stretchgoals18", gender: "female", keywords: ["Clone", "Arcade", "Blade", "Insane", "Davenport Manor"] },
        { name: "Sera O'Quinn", expansion: "riseofthekingdom", gender: "female", keywords: ["Boss", "Celebrity", "Insane", "Organized Crime", "Clone", "Megan", "Sera O'Quinn", "Arcade"] },
        { name: "Shadow", expansion: "riseofthekingdom", gender: "male", keywords: ["Boss", "Kingdom", "Martial Arts Master", "Chi", "Clone", "Shadow", "Horseman", "Sensei", "Arcade"] },
        { name: "Shin Yokai", expansion: "redemption", gender: "male", keywords: ["Boss", "Insane", "Extraplanar", "Chi", "Clone", "Shadow", "Shin Yokai", "Horseman", "Arcade"] },
        // add keywords:
        { name: "Sin-D", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade"] },
        // add keywords
        { name: "Stacey", expansion: "aftershock", gender: "female", keywords: ["Clone", "Parasol", "Science", "Organized Crime", "Arcade"] },
        { name: "Star Knight Iri", expansion: "battlecon", gender: "female", keywords: ["Indines", "Extraplanar", "Blade", "Soldier", "Clone", "Arcade"] },
        { name: "Swiftclaw", expansion: "lamentofthebloodmoon", gender: "male", keywords: ["Extraplanar", "Blade", "Clone", "Boss", "Beast", "Insane", "Arcade"] },
        // add keywords:
        { name: "The Don", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade", "Organized Crime", "Boss"] },
        // add keywords:
        { name: "The Plumber", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade", "Organized Crime"] },
        // add keywords:
        { name: "The Proxy", expansion: "aftershock", gender: "male", keywords: ["Organized Crime", "The Proxy", "Parasol", "Clone", "Arcade", "Science", "Boss"] },
        { name: "Tiger Azules", expansion: "redemption", gender: "male", keywords: ["Aztec", "Street", "Cartel", "Martial Arts Master", "Clone", "Juan", "Wanderer", "Arcade"] },
        { name: "Tlazolteotl", expansion: "redemption2", gender: "female", keywords: ["Past", "Aztec", "Boss", "Extraplanar", "Clone", "Tlazolteotl", "Arcade"] },
        // add keywords:
        { name: "Tora", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade"] },
        // add keywords:
        { name: "Tommy", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade"] },
        // add keywords:
        { name: "Tyrone", expansion: "rumblepack", gender: "male", keywords: ["Clone", "Arcade", "Cartel", "Organized Crime", "Street"] },
        // add keywords:
        { name: "Ume", expansion: "stretchgoals18", gender: "female", keywords: ["Clone", "Arcade"] },
        // add keywords:
        { name: "Veronica Pepper", expansion: "rumblepack", gender: "female", keywords: ["Clone", "Arcade", "Onyx League", "Street"] },
        { name: "Wan Bo", expansion: "redemption", gender: "male", keywords: ["Golden Dragons", "Martial Arts Master", "Chi", "Monk", "Clone", "Ah Long", "Arcade"] },
        // add keywords:
        { name: "Wicked", expansion: "stretchgoals18", gender: "male", keywords: ["Clone", "Arcade"] },
        // add keywords: add Miss Matrix relation
        { name: "Ying Hua", expansion: "redemption2", gender: "female", keywords: ["Global Gladiator", "Law Enforcement", "Martial Arts Master", "Science", "Clone", "Ying Hua", "Arcade"] },
        { name: "Ying Hua of Brook City", expansion: "keystothekingdom", gender: "female", keywords: ["Brook City", "James Wong", "Law Enforcement", "Past", "Science", "Clone", "Arcade"] },
        // add keywords:
        { name: "Ylfa", expansion: "stretchgoals18", gender: "female", keywords: ["Clone", "Arcade", "Beast", "Insane", "Davenport Manor"] },
        // add keywords:
        { name: "Yurei Ninja", expansion: "rumblepack", gender: "undefined", keywords: ["Clone", "Arcade", "Extraplanar", "Black Ops", "Shin Yokai", "Chi"] },
        { name: "Zane", expansion: "riseofthekingdom", gender: "male", keywords: ["Competitor", "Chi", "Youth", "Clone", "Natalia", "Arcade"] }
    ];

    alliesandrivals = alliesandrivals.filter(character => expansionfilter.some(xp => character.expansion.includes(xp)))

    for (let i = alliesandrivals.length - 1; i > 0; i--) {
        if (supportingcast.includes(alliesandrivals[i].name)) {
            alliesandrivals.splice([i], 1)

        }
    }

    if (nstages > 1) {
        globalgladiators.forEach(g => {
            if (g.rival.includes("random")) {
                g.rival = randFrom(alliesandrivals).name
                let remove = alliesandrivals.map(function (e) { return e.name; }).indexOf(g.rival)
                let instructions = `select ${g.rival} as the rival in your personal story.`
                instructions = (g.instructions || "").length > 0 ? `${g.instructions} ${ucInit(instructions)}` : `If you choose to use <i>${g.name}</i>, ${instructions}`
                alliesandrivals.splice([remove], 1)
                delete g.instructions
                g.instructions = instructions
            }
            if (g.ally.includes("random")) {
                g.ally = randFrom(alliesandrivals).name
                let remove = alliesandrivals.map(function (e) { return e.name; }).indexOf(g.ally)
                let instructions = `select ${g.ally} as the ally in your personal story.`
                instructions = (g.instructions || "").length > 0 ? `${g.instructions} ${ucInit(instructions)}` : `If you choose to use <i>${g.name}</i>, ${instructions}`
                alliesandrivals.splice([remove], 1)
                delete g.instructions
                g.instructions = instructions
            }
        })
    }

    //   console.log(_.sampleSize(alliesandrivals, 4))
    let allymotivation = nstages == 1 ? "Arcade" : getMotivation(alliesandrivals, players)

    let allygroup = []

    while (allygroup.length < players) {
        let random = Math.floor(Math.random() * alliesandrivals.length)
        let ally = alliesandrivals[random]
        if (ally.keywords.includes(allymotivation)) {
            allygroup.push(ally)
            alliesandrivals.splice(random, 1)
        }
    }

    let rivalmotivation = nstages == 1 ? "Arcade" : getMotivation(alliesandrivals, players)

    let rivalgroup = []
    while (rivalgroup.length < players) {
        let random = Math.floor(Math.random() * alliesandrivals.length)
        let rival = alliesandrivals[random]
        if (rival.keywords.includes(rivalmotivation)) {
            rivalgroup.push(rival)
            alliesandrivals.splice(random, 1)
        }
    }


    for (let i = 0; i < stages.length; i++) {
        for (let y = 0; y < herostages.length; y++) {
            if (herostages[y] === stages[i].name) {
                stages[i].instory = stages[i].instory + 1
            }
        }
    }

    stages = cleanStages(stages);

    let storystages = storyStages(stages, nstages);

    stages = storystages[1].splice(0)

    storystages = storystages[0].splice(0)

    /*             console.log(JSON.stringify(storystages, ["name"])) */

    let storyenemies = storyEnemies(storystages, enemies, heroenemies, nstages);

    enemies = storyenemies[1].splice(0)

    storyenemies = storyenemies[0].splice(0)

    let story = compileStory(storystages, storyenemies, nstages)

    story.forEach((entry, i) => {

        //if(entry.stage.expansion == "aftershock") { console.log(i)}
        entry.stage.knowledge = defineKnowledge(i, story);

    });

    let finalboss = story[Math.max(nstages * 2 - 3, 0)].enemy

    let storyname = String(storyNamer(finalboss, story[Math.max(nstages * 2 - 3, 0)].stage))

    let referencetext = referenceText(globalgladiators, allygroup, allymotivation, rivalgroup, rivalmotivation, finalboss, nstages)


    let cardtexts = textMaker(story, alliesandrivals, heronames, enemies, herodialogue, nstages, expansionfilter);

    let pagecontent = { reference: referencetext, text: cardtexts, storyname: storyname, finalboss: finalboss.name }

    return pagecontent
    //    createPageContent(pagecontent)


}

export function defineAddressing(enemy) {

    let addressing = randFrom([enemy.addressing, "Global Gladiators", "Gladiators"])

    return addressing
}

export function gPron(character, form) {
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
        case "undefined":
            switch (form) {
                case "subject": gPron = "it";
                    break;
                case "object":
                case "possessive": gPron = "it";
                    break;
                case "reflexive": gPron = "itself";
                    break;
                case "sex": gPron = "thing";
                    break;
                default: gPron = "UNDEFINED";
            }
            break;
        default:
            gPron = "UNDEFINED"

    }
    return gPron

}

export function ucInit(word) {
    let result = word.charAt(0).toUpperCase() + word.substring(1);
    return result
}

export function lowerCaseInitial(word) {
    let result = word.charAt(0).toLowerCase() + word.substring(1);
    return result
}

export function whichPreposition(word) {
    if (/[aeiou]/.test(word.toLowerCase().charAt(0))) {
        return "an " + word
    } else {
        return "a " + word
    }
}

export function latestScheme(enemy) {
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
        `A sequence of targeted attacks on Citadel's safehouses across the city unveils a pattern, leading to the assumption that `,
        `A cryptic warning received via an anonymous channel alludes to imminent danger, cautioning that `,
        `In the heart of Ransom City's most troubled district, graffiti symbols linked to ${enemy.name} emerge overnight, forewarning that `,
        `Agent Fletch has intercepted a shipment meant for ${enemy.boss}, inside which lies a clue to the fact that `,
        `The underground networks are abuzz with rumors of a significant power shift within ${enemy.name}, suggesting that `,
        `You've uncovered evidence of a secret alliance between ${enemy.name} and an unknown faction, indicating that `,
        `After weeks of radio silence, Citadel's black-ops division resurfaces with one message: `,
        `An anonymous tip filters through a backchannel known only to Agent Fletch — it's fragmented, but one line is clear: `,
        `A journalist investigating deep corruption in Ransom City turns up dead. The footage from their last interview reveals that `,
        `The ruins of a bombed-out safehouse still radiate heat when Citadel agents arrive. Among the wreckage, they find undeniable proof that `,
        `The Kingdom's influence was supposed to be crushed — but whispers in the alleyways and encrypted channels confirm that `,
        `In a high-security prison transport gone wrong, several inmates vanish. One of them was ${randFrom(enemy.minionnames)} - someone you thought was buried. It soon became clear: `,
        `During a blacksite raid on the Eastern coast, an enemy operative shouted one name before biting down on a poison pill. That name was yours. This could only mean that `,
        `A VIP extraction went south fast  —every backup team disappeared off the grid. The only remaining trace is a bloodied badge and a half-written message telling a harrowing story: `,
        `A street gang known for petty thefts suddenly escalates into military-grade tactics. Citadel suspects they're no longer acting alone, which can only mean one thing: `,
        `While analyzing thermal signatures around a remote bunker, analysts notice a pulse of energy unlike anything on file. Preliminary readings suggest that `,
        `An elite arms dealer was taken out in his own compound — no one saw the assailants leave. Surveillance blacked out at exactly 0200. It's clear that `,
        `A storm shutter in the Citadel archives rattled loose during maintenance, revealing a long-forgotten case file marked "DO NOT OPEN." Inside: classified evidence that `,
        `During a public gala meant to celebrate peace between factions, a rogue drone detonates near the dais. As chaos unfolds, intel confirms: `,
        `The global black market has gone eerily quiet. A dozen arms deals have been pulled in under 48 hours. The reason? Citadel analysts have concluded that `,
        `A supposed arms dump in a derelict warehouse turns out to be a staging ground — half the crates are still warm. The conclusion is simple: `,
        `A recent jailbreak wasn’t about freeing prisoners — it was about recruiting soldiers. Those men now work for ${enemy.boss}, and this makes it clear: `,
        `Satellite footage of the Alps reveals a facility long buried by rockfall. It now hums with activity. If the signal is right, then `,
        `Citadel’s informants in the Yakuza pass along one cryptic phrase: "The Phoenix breathes again." It can only mean one thing: `,
        `The last words of a dying mercenary: "The Queen has awakened." Cross-referenced with Kingdom codes, that implies `,
        `A rogue AI embedded in street cameras begins tagging known operatives with kill markers. Its programming leads back to ${enemy.name}, suggesting `,
        `An auction of rare tech draws in enemies and allies alike. But one item isn’t on the official list — an object Citadel once buried. Now `,
        `One of the Citadel’s retired field leaders breaks cover to warn you: "They’re gathering again, under a new banner." Now `,
        `An unmarked submarine surfaces in Delta Keys and vanishes before anyone can respond. Sensor data shows it dropped something. This means `,
        `After weeks of decoding layered comms traffic, Citadel’s linguists stumble across a phrase repeated in multiple dialects: “Phase Two begins.” It’s now clear that `,
        `A respected senator’s aide is found unconscious with a burned symbol carved into their desk — the same one traced to ${enemy.name}. This means `,
        `A drone returning from routine surveillance delivers unexpected footage that proves your worst suspicions: `,
        `Someone is erasing enemy records from Citadel databases in real time. Whoever’s doing it knows the system. This must mean `,
        `A smuggling route used for decades suddenly dries up — and then reactivates, now flowing in the other direction. Experts believe this indicates `,
        `An elite strike team sent to dismantle a cartel stronghold down south goes dark. The only signal left behind is a looping audio message: `,
        `An explosion in the Ransom City underways triggers tremors felt for miles. But when Citadel investigates, all they find are scorch marks — and the logo of ${enemy.name}. This confirms: `,
        `A piece of encrypted chatter caught during a cyber raid repeats one word in every language it translates into: “Resurgence”. All evidence points to the fact that `,
        `You awake to find your old Citadel communicator blinking for the first time in years. The only message: "We need you. They're back." This can only mean `,
        `You told Agent Fletch you're too old for this crap, and that was years ago. But now he has sent you a communication through personal channels only known to you. You must answer this one more time, as `

    ];
    latestscheme = randFrom(latestscheme);
    return latestscheme
}

export function preGamePrologue(stage, enemy) {

    //more masterplans: complete desctruction; activate superweapon?

    let latestscheme = latestScheme(enemy)

    let masterplan

    let vip = randFrom([["President", "White House"], ["Colonel", "Pentagon"], ["Mayor", "City Hall"], ["Police Chief", "Ransom P.D. Headquarters"], ["Citadel Commander", "Citadel HQ"], ["Foreign Ambassador", "Foreign Embassy"], ["Head of League of Nations", "League of Nations"]])
    switch (stage.masterplan) {
        case "actsofterror":
            masterplan = randFrom([
                `${enemy.boss} wants the people of Ransom to feel their fear in every shadow, every echo, every empty street. The ${enemy.name} are sending a message: the city no longer belongs to the innocent.`,
                `whispers of chaos ripple through the streets as the ${enemy.name} tighten their grip. ${enemy.boss} has no interest in subtlety — only in spectacle.`,
                `the city trembles. Panic is no accident — it's a weapon. ${enemy.boss} has set events in motion that will leave no corner of Ransom untouched.`,
                `something terrible is coming, and the ${enemy.name} want everyone to see it. This is not about profit. This is about power — raw, unchecked, and unforgettable.`,
                `the vicious criminal syndicate ${enemy.name} believes they do not have to bow to the government or even the police force of Ransom City. ${enemy.boss} is going to let everyone know that Ransom has become a center of violence and crime where no-one is safe.`
            ])
            break;
        case "illegalgains":
            masterplan = randFrom([
                `power needs fuel, and the ${enemy.name} know exactly where to find it. ${enemy.boss} is pulling strings and moving pieces — quietly building towards something big.`,
                `somewhere in the underworld, deals are being made and debts collected. The ${enemy.name} are preparing for a windfall that could shift the balance of the Ransom City.`,
                `money flows through the city like blood through veins — and ${enemy.boss} is cutting deep. Every stolen coin feeds a deeper hunger.`,
                `Ransom City won’t see the theft until it's too late. ${enemy.boss} has built an empire beneath the surface, and it’s growing stronger with every passing hour.`,
                `the ${possessiveSuffix(enemy.name)} vast network of crime and ${(enemy.desc).replace("the", "")} require substantial financial pipelines, and ${enemy.boss} is organizing a big score to fund ${gPron(enemy, "possessive")} operations.`
            ]);
            break;
        case "kidnapping":
            masterplan = randFrom([
                `the ${vip[1]} is not the exception to the rampant crimes related to the Kingdom these days. The ${vip[0]} has been kidnapped by the ${enemy.minions()} of ${enemy.boss}. Are you a bad enough dude to rescue the ${vip[0]}?`,
                `${enemy.boss} is holding Ransom City captive and the ${vip[0]} hostage. With ${gPron(enemy, "possessive")} gang of ${enemy.minions()}, nobody but you can stop ${gPron(enemy, "object")} now.`,
                `${enemy.boss} has captured the ${vip[0]}, and via a live two-way radio broadcast, demands the ${vip[1]} to secure a one hundred billion dollar ransom in three days.`,
                `the ${vip[1]} stands silent, its halls emptied by fear. The ${vip[0]} has vanished, and all signs point to the ${enemy.minions()} of ${enemy.boss}.`,
            ])
            break;
        case "strengtheningforces":
            masterplan = randFrom([
                `the ${enemy.name} are gathering strength — not loudly, but surely. Rumors circulate, but no one dares to ask questions.`,
                `${enemy.boss} doesn’t shout conquest from rooftops. ${ucInit(gPron(enemy, "subject"))} prepares. And when the time comes, there will be no warning.`,
                `in the quiet places, something grows. The ${enemy.name} are no longer content with their slice of the city — they want it all.`,
                `what once was scattered is now becoming unified. The ${enemy.name} have a vision, and it's unfolding beneath everyone's feet.`,
                `the ${enemy.bosstitle()} ${enemy.boss} has been covertly making efforts to strengthen the forces of the ${enemy.name}. Their plans must be thwarted before their forces become unstoppable.`
            ]);
            break;
        case "personalpower":
            masterplan = randFrom([
                `${enemy.boss} walks a path few would dare — one of whispers, symbols, and secrets. Whatever awaits at the end, ${gPron(enemy, "subject")} intends to claim it.`,
                `power calls to the ambitious, and ${enemy.boss} is listening. The ${enemy.name} follow not out of loyalty, but awe.`,
                `the air around ${enemy.boss} feels heavier now. Something is changing, and those closest to ${gPron(enemy, "object")} can feel it in their bones.`,
                `${enemy.boss} is no longer bound by the city, the law, or the rules others follow. ${gPron(enemy, "subject")} is becoming something else — something dangerous.`,
                `the ${enemy.bosstitle()} ${enemy.boss} has moved across the region with ${gPron(enemy, "possessive")} ${enemy.minions()} in search for power. If ${gPron(enemy, "possessive")} power levels will near five figures, ${gPron(enemy, "subject")} just might become invincible. `
            ]);
    }


    masterplan = { storytext: latestscheme + " " + masterplan + " ", vip: vip }

    return masterplan
}

export function mysticalSynonym(ignore = "") {


    let mystical = ["esoteric", "magical", "arcane", "ethereal", "mystical", "cabalistic", "mysterious", "occult", "obscure", "cryptic", "fabulous secret", "strange", "dark", "cursed"];
    mystical = mystical.filter(function (e) { return e !== ignore; })
    mystical = mystical[Math.floor(Math.random() * mystical.length)];

    return mystical;

}

export function getMotivation(alliesandrivals, players) {

    let supportmotivate = []

    alliesandrivals.forEach(g => {
        supportmotivate = supportmotivate.concat(g.keywords)
    })

    let motivations = supportmotivate.reduce((r, k) => { r[k] = 1 + r[k] || 1; return r }, {})

    motivations = _.pickBy(motivations, function (o) {
        return o >= players;
    })

    return (randFrom(Object.keys(motivations)))

}

export function storyNamer(finalboss, finalstage, number = 16) {

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
        case "Anja":
            bossadjectives = ["Rogue", "Fallen", "Rallying", "Sabotaged", "Resolute", "Paid Off", "Distracted", "Sanctioned"]
            bossnouns = [["Agent", "Agents"], ["Citadel", "Citadel"], ["Teamwork", "Teamwork"], ["Plan", "Plans"], ["Resolve", "Resolve"], ["Killer", "Killers"]]
            break;
        case "Blood Moon":
            bossadjectives = ["Ethereal", "Terrible", "Lunar", "Bloody", "Vengeful", "Lamenting", "Ancient", "Bolstered", "Exsanguinated", "Eviscerating"]
            bossnouns = [["Avenger", "Avengers"], ["Revenge", "Revenge"], ["Empire", "Empires"], ["Lament", "Laments"], ["Blood", "Blood"], ["Moon", "Moon"], ["Spirit", "Spirits"], ["Shade", "Shades"], ["Salaryman", "Salarymen"], ["Mirage", "Mirages"]]
            break;
        case "Butler":
            bossadjectives = ["Escalating", "Ascetic", "Reckless", "Roaming", "Collateral", "Nomadic", "Charismatic", "Unbound", "Lawless", "Drunken"]
            bossnouns = [["Martyr", "Martyrs"], ["Juggernaut", "Juggernauts"], ["Reckoning", "Reckonings"], ["Damage", "Damage"], ["Outcast", "Outcasts"], ["Nomad", "Nomads"]]
            break;
        case "Caitlyn":
            bossadjectives = ["Whirling", "Dancing", "Nimble", "Determined", "Symmetric"]
            bossnouns = [["Yakuza", "Yakuza"], ["Dervish", "Dervishes"], ["Blade", "Blades"], ["Dance", "Dancers"], ["Phoenix", "Phoenix"], ["Fan", "Fans"], ["Lady", "Ladies"]]
            break;
        case "Castle":
            bossadjectives = ["Full", "New", "Marked", "Defensive", "Wet", "Ruthless"]
            bossnouns = [["Brotherhood", "Brotherhood"], ["Agent", "Agents"], ["Castle", "Castles"], ["Unload", "Unload"], ["Target", "Targets"], ["Killer", "Killers"], ["Sniper", "Snipers"], ["Work", "Works"], ["Lion", "Lions"], ["Reinforcements", "Reinforcements"], ["Soldier", "Soldiers"], ["Hit", "Hits"], ["Job", "Jobs"]]
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
            bossadjectives = ["Hostile", "Trading", "Pharmaseutical", "Unscheluded", "Researching", "Ruthless", "Clean", "Sweeping"]
            bossnouns = [["Takeover", "Takeovers"], ["Insider", "Insiders"], ["Trade", "Trades"], ["Vandal", "Vandal"], ["Research", "Research"], ["Meeting", "Meetings"], ["Plan", "Plans"], ["Reorganization", "Reorganization"], ["Shareholder", "Shareholders"], ["Interest", "Interests"], ["Executive", "Executives"], ["Lab", "Labs"], ["Serum", "Serums"], ["Proxy", "Proxies"]]
            break;
        case "Shadow":
            bossadjectives = ["Hexed", "Prescient", "Mysterious", "Ancient", "Divine", "Explosive", "Hidden"]
            bossnouns = [["Kingdom", "Kingdom"], ["Blade", "Blades"], ["Jing Wu", "Jing Wu"], ["Dragon", "Dragons"], ["Illusion", "Illusions"], ["Sword", "Swords"], ["Shadow", "Shadows"], ["Spirit", "Spirits"], ["Clone", "Clones"], ["General", "Generals"], ["Mountain", "Mountains"], ["Marionette", "Marionettes"], ["Soldier", "Soldiers"], ["Doll", "Dolls"]]
            break;
        case "Swiftclaw":
            bossadjectives = ["Clawed", "Infernal", "Relentless", "Aggressive", "Swift", "Lunar", "Bloody"]
            bossnouns = [["Aggression", "Aggression"], ["Inferno", "Inferno"], ["Strike", "Strikes"], ["Shade", "Shades"], ["Salaryman", "Salarymen"], ["Mirage", "Mirages"], ["Moon", "Moon"], ["Blood", "Blood"]]
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
        case "Higher Purpose":
            stageadjectives = ["Higher", "High", "Purposeful", "Descending"]
            stagenouns = [["Purpose", "Purposes"], ["Cargo", "Cargo"], ["Elevator", "Elevators"], ["Lift", "Lifts"], ["Forklift", "Forklifts"], ["Drop", "Drops"], ["Descent", "Descent"], ["Purpose", "Purpose"]]
            break;
        case "Meltdown":
            stageadjectives = ["Remote", "Radioactive", "Unstable", "Leaking", "Nuclear"]
            stagenouns = [["Meltdown", "Meltdowns"], ["Panel", "Panels"], ["Fallout", "Fallouts"], ["Waste", "Waste"], ["Facility", "Facilities"], ["Suit", "Suits"], ["Hazmat", "Hazmat"], ["Valve", "Valves"], ["Code", "Codes"]]
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
        case "Reel Terror":
            stageadjectives = ["Terrifying", "Astral", "Defiled"]
            stagenouns = [["Terror", "Terrors"], ["Lobby", "Lobbies"], ["Glob", "Globs"], ["Count", "Counts"], ["Alien", "Aliens"], ["Fascist", "Fascists"], ["Sludge", "Sludges"], ["Lust", "Lusts"], ["Night", "Nights"], ["Lord", "Lords"], ["Coming", "Comings"], ["Night", "Nights"], ["Havoc", "Havocs"], ["Slaughterhouse", "Slaughterhouses"], ["Tombs", "Tombs"], ["Intermission", "Intermissions"]]
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
        case "Snowdown":
            stageadjectives = ["Red", "White", "Bloody", "Moonlit", "Lunar", "Quiet"]
            stagenouns = [["Altar", "Altars"], ["Shrine", "Shrines"], ["Ritual", "Rituals"], ["Moon", "Moon"], ["Blood", "Blood"], ["Snowfall", "Snowfalls"]]
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

export function compileStory(stages, enemies, storylength) {


    let story = []

    let chapters = ["1", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"];

    var chapter
    for (let i = 0; i < Math.ceil(storylength * 2) - 1; i++) {
        chapter = { chapter: chapters[i], stage: _.cloneDeep(stages[i]), enemy: enemies[i] }
        story.push(chapter)
    }

    return story

}

export function storyStages(stages, storylength) {


    let storystages = []

    let randomstage = Math.floor(Math.random() * stages.length);

    let finalstage = stages[randomstage];
    stages.splice(randomstage, 1);

    if (storylength > 1) {

        randomstage = Math.floor(Math.random() * stages.length);

        storystages.push(stages[randomstage]);
        stages[randomstage].instory = stages[randomstage].instory + 1
        stages = cleanStages(stages);

        if (storylength > 2) {
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
            } while (i < storylength - 2);
        }


        (Math.random() < 0.75 ?

            (storystages.push(finalstage),
                storystages.push(finalstage)) :
            (storystages.push(finalstage),
                storystages.push(stages[Math.floor(Math.random() * stages.length)])))


    } else { storystages.push(finalstage) }
    //console.log(JSON.stringify(storystages))
    if (true === false) {
        let fillstage = stages.filter(stage => stage.name == "Supply & Demand")[0]
        storystages[7] = fillstage
        storystages[8] = fillstage
    }
    return [storystages, stages]

}

export function getMasterPlan() {

    let final_texts = ["final", "ultimate", "diabolical", "culminating", "terminal", "paramount", "consummate", "paramount", "utmost", "fiendish", "shocking"]
    let plan_texts = ["plan", "master plan", "scheme", "endgame", "design"]
    return `${randFrom(final_texts)} ${randFrom(plan_texts)}`

}

export function loungeMusic() {

    let music = randFrom(["Don't Stop Believing", "Faithfully", "Don't Stop Me Now", "Open Arms", "Wheel in the Sky", "Separate Ways", "Livin' on a Prayer", "Any Way You Want It", "We Are the Champions", "Chariots of Fire", "We Will Rock You", "Hero", "Walking on Sunshine", "Always Look on the Bright Side of Life",
        "Eye of the Tiger", "The Final Countdown", "Burning Heart", "Every Breath You Take", "Another One Bites the Dust", "Never Gonna Give You Up", "Gonna Fly Now", "One Moment In Time"])

    return music
}

export function storyEnemies(storystages, enemies, heroenemies, storylength) {

    heroenemies = heroenemies.map(enemy => enemy.boss);

    let storyenemies = [], randomenemy;

    function pickAndSlice() {
        if (storyenemies.length <= 3) {
            randomenemy = randFrom(enemies)
            do { randomenemy = randFrom(enemies) } while (heroenemies.includes(randomenemy.boss))
        } else {
            randomenemy = randFrom(enemies)
        }
        enemies = filterArray(enemies, "boss", randomenemy.boss, true)
    }

    pickAndSlice()

    let finalboss = randomenemy

    if (storylength > 1) {

        let r = randFrom([1, 2])
        switch (r) {
            case 1: storyenemies.push(randomenemy);
                break;
            case 2: pickAndSlice(), storyenemies.push(randomenemy);
        }

        for (let i = 0; storyenemies.length < Math.ceil(storylength / 2) * 2 + 1; i++) {

            let random = (enemies.length <= (Math.ceil(storylength / 2) * 2 + 1) - storyenemies.length + 1) == true ? 1 : randFrom([1, 2, 3])
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

    if (storylength > 1) {

        if (storystages[storystages.length - 2].name == storystages[storystages.length - 1].name) {
            storyenemies.push(finalboss);
        } else {
            pickAndSlice(), storyenemies.push(randomenemy)
        }

    }

    return [storyenemies, enemies]

}

export function evilPlace() {

    let evilterm = ["ancient", "cursed", "damned", "eldritch", "evil", "unholy", "unclean", "vile"]
    let place = ["burial ground", "altar", "sanctum", "shrine", "temple"]

    let evilplace = //evilterm.splice(Math.floor(Math.random()*evilterm.length), 1) + " and " +
        evilterm.splice(Math.floor(Math.random() * evilterm.length), 1) + " " +
        place.splice(Math.floor(Math.random() * place.length), 1)

    return evilplace
}

const possessiveSuffix = (name) => `${name}'${name.endsWith('s') ? '' : 's'}`;

export function allyNamer(alliesandrivals, enemy, heronames, finalboss) {

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

export function defineKnowledge(i, story) {
    let knowledge
    switch (i) {
        case 0: 
          knowledge = randFrom([story.length === 1 ? "hottrail" : "coldtrail","coldtrail","clueless","clueless", story[i].stage.captured ? "captured" : "clueless"])
            break;
        case 1: case 3: case 5: case 7:
            knowledge = "hottrail"
            break;
        case 2: case 4: case 6: case 8:
            if (story[i].stage.name === story[i - 1].stage.name) {
                knowledge = "coldtrail"
            } else {
                knowledge = randFrom(["clueless", story[i].stage.captured ? "captured" : "clueless"])
            }
            break;
    }
    return knowledge
}

function getPropertyValue(obj1, obj2, propName, defaultValue = undefined) {
    const has1 = propName in obj1;
    const has2 = propName in obj2;

    if (has1 && has2) {
        return randFrom([obj1[propName], obj2[propName]]);
    } else if (has1) {
        return obj1[propName];
    } else if (has2) {
        return obj2[propName];
    } else {
        return defaultValue;
    }
}

// segue can be intel, rescue, retreat, or combination. look for generalization of some items below
// maybe let result handler decide on the segue element
function hostageLoseResult(enemy, stage, contact, captured, segue) {
    const hostages = getPropertyValue(enemy, stage, "hostages")
    if (!hostages) {
        return undefined
    }
    return randFrom([
        `${captured ? `You are lying on the ground, defeated and helpless, as` : `Despite all of your efforts,`} ${enemy.boss} executes another one of the ${the_hostages}.<br><br>${segue}`,
        `You weren't able to save the ${the_hostages}, and now their lives are on your hands.<br><br>${segue}`,
        captured ? segue: `"We've failed to save them," you say, clenching your fist by your side. "This doesn't mean you're done," Agent Fletch responds. "You can do better next time." Agent Fletch was right.`,
        `"Go! Now! Get to the chopper!" one of the ${hostages} shouts as ${enemy.boss} steps over ${gPron(contact, "subject")}. ${captured ? `You are in no shape to move.` : ``}<br><br>${segue}`,
        ]
        )

}

function ritualLoseResult(enemy, stage, captured, segue) {
    const ritual = getPropertyValue(enemy, stage, "ritual")
    if (!ritual) {
        return undefined
    }
    let this_blade = getPropertyValue(enemy, stage, "blade", "ritual blade")
    return randFrom([
        `Standing before you, the ${mysticalSynonym()} power of ${ritual} fills ${enemy.boss}. ${ucInit(gPron(enemy, "subject"))} rises up off the ground, the ${mysticalSynonym()} powers swirling around ${gPron(enemy, "object")}. You watch as ${gPron(enemy, "possessive")} muscles grow, ${gPron(enemy, "possessive")} eyes burn, and ${gPron(enemy, "possessive")} body pulses with the ${mysticalSynonym()} energies! ${captured ? `You lose consciousness in front of that ${mysticalSynonym()} power!` : `You have no choice but to flee for your lives!`}`,
        `You were not able to stop ${enemy.boss} from completing the ritual! ${getTransformationSequence(enemy, this_blade, ritual_focus)} ${captured ? `You lose consciousness in front of that ${mysticalSynonym()} power!` : `You have no choice but to flee for your lives!`}`,
        `You're thrown to the ground by a blast of ${mysticalSynonym()} force, ${captured ? `and you are sucked through a shimmering, twisting portal.` : `and the ${enemy.bosstitle()} disappears in a flash of brilliant purple light. ${segue}`}`,
        `${enemy.boss} looks down at you, a smug smirk spreading across ${gPron(enemy, "possessive")} face. ${ucInit(gPron(enemy, "subject"))} reaches up and recites a few strange words in a language you've never heard before. In an instant, the world blows away around you in a deafening explosion of ${mysticalSynonym()} energy${captured ? ` and then` : `, and for a moment,`} all you can see is the blackness.${captured ? `` : `<br><br>${segue}`}`
    ])

}

function explosionLoseResult(enemy, stage, capture, segue) {
    const explosions = getPropertyValue(enemy, stage, "explosions")
    if (!explosions) {
        return undefined
    }
    randFrom([`You barely clear the area when the ${explosions} finally bring everything crumbling down. ${segue}`])
}

function bladeLoseResult(enemy, stage, captured, segue) {
    const blade = getPropertyValue(enemy, stage, "blade")
    if (!blade) {
        return undefined
    }
    randFrom([
        `With multiple superficial and some severe cuts from ${possessiveSuffix(enemy.boss)} mastery with ${gPron(enemy, "possessive")} ${blade}, you ${captured ? `feel you strength sapping.<br><br>${segue}` : `have to choose: retreat or die. As you are yet to stop ${finalboss.boss}, the choice is obvious.<br><br>${segue}`}`,
        `${enemy.boss} draws your head back, with ${gPron(enemy, "possessive")} ${blade} on your throat. ${captured ? `"Wait!" ${randFrom(enemy.minionnames)} shouts. "I hear ${nextenemy.boss} is looking for them."` : `Suddenly, ${gPron(enemy, "subject")} lets you drop. "No. I will not soil my blade with such an unworthy opponent."<br><br>${segue}`}`
    ])
}

function gunkLoseResult(enemy, stage, captured, segue) {
    const gunk = getPropertyValue(enemy, stage, "gunk")
    if (!gunk) {
        return undefined
    }
    randFrom([`You are forced to duck from ${getPropertyValue(enemy, stage, "antiair", "a relentless assault")}. You lose your balance and fall straight into ${stage.gunk}. You try to desperately not to swallow any of the ${randFrom(revolting_words)} liquid${captured ? ` but fail, and start to lose your consciousness. When almost passed out, you feel you're dragged back to the surface. "Clean them up," you think you hear ${enemy.boss} say. "${nextenemy.boss} won't want them like that."` : `, and when you finally manage to get to the surface, ${enemy.boss} has disappeared with ${gPron(enemy, "possessive")} ${enemy.minions()}.<br><br>${segue}`}`])
}

function experimentLoseResult(enemy, stage, captured, segue) {
    const experiment = getPropertyValue(enemy, stage, "experiment")
    if (!experiment) {
        return undefined
    }
    randFrom([
        captured ? `You are strapped in a metal apparatus, and ${randFrom(enemy.minionnames)} injects you with the vile substance. Immediately you start to lose consciousness. "The serum is not working as expected, we need to run more tests," you hear ${enemy.boss} saying, before you're out cold.` : `"Should we not test the serum on the Gladiators?" ${randFrom(enemy.minionnames)} asks ${enemy.boss}. "No. They are completely worthless."<br><br>${segue}`]
    )
}

function gunmenLoseResult(enemy, stage, captured, segue) {
    const gunmen = getPropertyValue(enemy, stage, "gunmen")
    if (!gunmen) {
        return undefined
    }
    randFrom([
        `You duck behind cover as the ${gunmen} fire on you. To move would be a a suicide, and you are forced to watch as the ${enemy.name} leaves with ${stage_loot}. ${captured ? `You are pinned by the fire, and after a while you are surrounded by gun-toting enemies from all sides. ${randFrom(capture)}` : `You hunker down to avoid being hit by stray bullets.<br><br>${segue}`}`,
        `Bullets are flying everywhere as you flit from cover to cover. The ${gunmen} pour fire on you, and ${captured ? `finally you have nowhere to run. ${randFrom(capture)}` : `you are running out of places to go to.<br><br>${segue}`}`,
        `Torrents of fire from the ${gunmen} force you to pull back${captured ? ` until you are cornered. ${randFrom(capture)}` : `, leaving the ${enemy.name} free to go through with their plan.<br><br>${segue}`}`])
}

export function loseResult(stageindex, story, nextstage, gizmo, wincondition, rival, rivalpresence, ally, nstages) {

    let finalboss = story[Math.max(nstages * 2 - 3, 0)].enemy

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
        `After an uphill battle against overwhelming odds, ${enemy.boss} apparently becomes bored with the uneven competition and unleashes ${getPropertyValue(enemy, stage, "antiair", "an unrelenting assault")} into the melee. "Let's move out!" ${gPron(enemy, "subject")} commands. "This is not worth our time." Left for dead, you have no chance of following. `,
        `"You were close, ${defineAddressing(enemy)}", ${enemy.boss} calls to you. "But not close enough." ${ucInit(gPron(enemy, "subject"))} clutches at ${gPron(enemy, "possessive")} wounds, and though they are serious, at least ${gPron(enemy, "subject")} is still standing. ${ucInit(gPron(enemy, "subject"))} watches you writhe on the ground for a moment longer, and spits in your direction. "Go ahead," ${gPron(enemy, "subject")} says. "Follow me. I don't care. You'll walk right into the ${possessiveSuffix(finalboss.name)} lap."`,
        `"Do not follow us, ${defineAddressing(enemy)}," ${enemy.boss} threatens. "${enemy.boss == finalboss.boss ? `I now know` : `We will go now warn ${finalboss.boss}`} of you, and if you still continue on this ill-conceived mission, you will meet your end by ${enemy.boss == finalboss.boss ? `my` : `${gPron(finalboss, "possessive")}`} hand."<br><br>"Go then," you say, spitting blood. "Scurry ${enemy.boss == finalboss.boss ? `back to wherever you crawled out of` : `to the ${finalboss.bosstitle()}`}, and see what good that will do you in the end."`,
        `Bleeding from multiple cuts, you distract the ${enemy.bosstitle()} and make your retreat in the moment of confusion. You escape ${enemy.boss}, but just barely.`,
        `You gasp for breath, refusing this defeat to stop you from confronting ${finalboss.boss}.`,
        `"I am done with you," the ${enemy.bosstitle()} says, and tosses you aside like a rag. You are left in a heap, beaten and humiliated.`,
        `You have no option but to retreat.`
    ]

    let rescue = [
        `Suddenly, Citadel agents rappel down out of nowhere. ${enemy.boss} and ${gPron(enemy, "possessive")} ${enemy.minions()} flee as the agents free you.`,
        `You slowly awaken in a helicopter, confused on how you wound up there.`,
        `A squad of Citadel soldiers rushes in and sends the enemies focused on you fleeing.`,
        `When all seems lost, a Citadel operative pilots an armored transport through the ${enemy.minions()} and knocks ${enemy.boss} aside. "Come with me if you want to live!"`
        ]

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

    let this_blade = getPropertyValue(enemy, stage, "blade", "blade")

    let escort = [
        `Spitting up blood, you look up just in time to see ${ally.name} getting dragged away. ${captured ? randFrom(capture) : `${randFrom([`As ${ally.name} is carted off, you see the ${possessiveSuffix(gPron(ally, "sex"))} ${getGizmo()} fall, apparently unseen, onto the ground as the enemy retreats.`, `<br><br>${generic}`])}`}`,
        `You became so obsessed with your fight, that you barely caught the sight of ${ally.name} taken away by the ${enemy.minions()}. ${captured ? randFrom(capture) : `Not only were you unable to retrieve any ${randFrom(intel_words)} on ${finalboss.boss}, but also got a valuable ally captured in the process.<br><br>${randFrom(intel)}`}`,
        `With defeat inevitable, you back up with ${ally.name}. Your only hope of escape is ${stage.hasOwnProperty("pit") ? stage.pit : "a bottomless pit"}. ${ally.name} offers to help you climb down. As you descend, ${ally.name} is overwhelmed${captured ? `, and the ${enemy.minions()} pull you back. ${randFrom(capture)}` : `. Clenching your jaw, you turn away and make your escape.<br><br>${randFrom(intel)}`}`,
        `${ally.name} had limped away, bleeding, and the others had gone after ${gPron(ally, "object")}, probably to finish ${gPron(ally, "object")} off.${captured ? `<br><br> ${randFrom(capture)}` : ` You could do nothing. They'd already finished with you.<br><br>${randFrom(intel)}`}`,
        captured ? randFrom(capture) : `"We've failed ${gPron(ally, "object")}," you say, clenching your fist by your side. "This doesn't mean you're done," Agent Fletch responds. "You can do better next time." Agent Fletch is right.`,
        `"Go! Now! Get to the chopper!" ${ally.name} shouts as ${enemy.boss} steps over ${gPron(ally, "object")}. ${captured ? `You are in no shape to move. ${randFrom(capture)}` : `<br><br>${randFrom(retreat)} ${randFrom(intel)}`}`,
    ]

    let explosion_cause = []
    stage.hasOwnProperty("explosions") ? explosion_cause = [stage.explosions, ...explosion_cause] : () => { }
    enemy.hasOwnProperty("explosions") ? explosion_cause = [enemy.explosions, ...explosion_cause] : () => { }
    let explosion = [`You barely clear the area when the ${randFrom(explosion_cause)} finally bring everything crumbling down. ${captured ? randFrom(capture) : generic} `]

    let find_intel = [
        `${captured ? `"Looking for this?" ${enemy.boss} holds ${whichPreposition(gizmo)} in front of you. ${randFrom(capture)}` : `You could not obtain whatever ${randFrom(intel_words)} ${enemy.boss} had. ${generic}`}`,
        `${captured ? randFrom(capture) : `The ${enemy.name} escaped with ${stage_loot}, and the ${gizmo} in your hands looks damaged. "Agent Fletch," you got into your communications device. "I've got the ${gizmo}, but it looks damaged." "At least we have it," Agent Fletch replied in your ear. "Bring it back to Citadel HQ and we'll see what data we can pull from it.`}`,
        `"${captured ? nextenemy.boss : finalboss.boss} will hear of your interference," ${enemy.boss} says. "And you will beg for ${gPron(captured ? nextenemy : finalboss, "possessive")} mercy." ${ucInit(gPron(enemy, "subject"))} then reaches out to a ${gizmo}. "This is what you were after?"${captured ? `` : `<br><br>${generic}`}`,
        captured ? randFrom(capture) : `"We've failed to secure the ${randFrom(intel_words)}," you say, clenching your fist by your side. "This doesn't mean you're done," Agent Fletch responds. "You can do better next time." Agent Fletch is right.`
    ]

    let gunk = [`You are forced to duck from ${getPropertyValue(enemy, stage, "antiair", "a relentless assault")}. You lose your balance and fall straight into ${stage.gunk}. You try to desperately not to swallow any of the ${randFrom(revolting_words)} liquid${captured ? ` but fail, and start to lose your consciousness. When almost passed out, you feel you're dragged back to the surface. "Clean them up," you think you hear ${enemy.boss} say. "${nextenemy.boss} won't want them like that."` : `, and when you finally manage to get to the surface, ${enemy.boss} has disappeared with ${gPron(enemy, "possessive")} ${enemy.minions()}.<br><br>${randFrom(intel)}`}`]

    let guide = [
        `"Unfortunate that ${gPron(enemy, "subject")} came out on top this time," ${ally.name} says afterward. "${ucInit(gPron(enemy, "subject"))} won't be challenged again for some time. By you or by anyone else". You look at ${ally.name} in question, but the ${gPron(ally, "sex")} had vanished! ${captured ? randFrom(capture) : `You are left to contemplate your place in the world, alone. ${randFrom(intel)}`}`,
        `"You led me into a deathtrap," you say. "A rush like this is against everything we know." You and ${ally.name} stare hard at each other for a moment. "Very well. Strike your own path," ${ally.name} says, and turns, ${capture ? `leaving you in a heap. ${randFrom(capture)}` : `striding into the distance. ${randFrom(intel)}`}`,
        `"You cannot expect to win every conflict," ${ally.name} says. "You almost got me killed!" you shout back, looking down at your bruised body. You are about to apologize, but when you look up, ${captured ? `you are faced with ${enemy.minions()}. ${randFrom(capture)}` : ` ${gPron(ally, "subject")} is gone. ${randFrom(intel)}`}`,
        `${captured ? randFrom(capture) : `"Dammit!" you say to ${ally.name}. "They got away."<br><br>"It was a long shot. I'm sorry." ${gPron(ally, "subject")} answers. "Don't be," you answer. "We caused a stir. That's something." ${randFrom(intel)}`}`,
        `"Go! Now! Get to the chopper!" ${ally.name} shouts as ${enemy.boss} steps over ${gPron(ally, "object")}. ${captured ? `You are in no shape to move. ${randFrom(capture)}` : `<br><br>${randFrom(retreat)} ${randFrom(intel)}`}`,
    ]

    let gunmen = []
    stage.hasOwnProperty("gunmen") ? gunmen = [stage.gunmen, ...gunmen] : () => { }
    enemy.hasOwnProperty("gunmen") ? gunmen = [enemy.gunmen, ...gunmen] : () => { }
    let guns = [`You duck behind cover as the ${randFrom(gunmen)} fire on you. To move would be a a suicide, and you are forced to watch as the ${enemy.name} leaves with ${stage_loot}. ${captured ? `You are pinned by the fire, and after a while you are surrounded by gun-toting enemies from all sides. ${randFrom(capture)}` : `You hunker down to avoid being hit by stray bullets.<br><br>${randFrom(rescue)} ${randFrom(intel)}`}`,
    `Bullets are flying everywhere as you flit from cover to cover. The ${randFrom(gunmen)} pour fire on you, and ${captured ? `finally you have nowhere to run. ${randFrom(capture)}` : `you are running out of places to go to.<br><br>${randFrom(rescue)} ${randFrom(intel)}`}`,
    `Torrents of fire from the ${randFrom(gunmen)} force you to pull back${captured ? ` until you are cornered. ${randFrom(capture)}` : `, leaving the ${enemy.name} free to go through with their plan.<br><br>${generic}`}`]

    let heights = [captured ? `${enemy.boss} holds you on the edge of a drop to oblivion. "Wait!" ${randFrom(enemy.minionnames)} shouts. "I hear ${nextenemy.boss} is looking for them." ` : `"Get rid of them. They are useless," ${enemy.boss} orders the ${enemy.minions()}. You have no strength to resist as you are dragged to the edge and thrown to your deaths.<br><br>You are falling toward a certain death, when suddenly a daring Citadel pilot comes to rescue with incredible vehicular acrobacy, and you are caught by the chopper!<br><br>${randFrom(intel)}`]

    let the_hostages = stage.hasOwnProperty("hostages") ? stage.hostages : "bystanders"
    let hostages = [
        `${captured ? `You are lying on the ground, defeated and helpless, as` : `Despite all of your efforts,`} ${enemy.boss} executes another one of the ${the_hostages}.<br><br>${captured ? randFrom(capture) : generic}`,
        `You weren't able to save the ${the_hostages}, and now their lives are on your hands. ${captured ? randFrom(capture) : generic}`,
        captured ? randFrom(capture) : `"We've failed to save them," you say, clenching your fist by your side. "This doesn't mean you're done," Agent Fletch responds. "You can do better next time." Agent Fletch was right.`,
        `"Go! Now! Get to the chopper!" one of the ${the_hostages} shouts as ${enemy.boss} steps over ${randFrom([`him`, `her`])}. ${captured ? `You are in no shape to move. ${randFrom(capture)}` : `<br><br>${randFrom(retreat)} ${randFrom(intel)}`}`,]

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
        `You could not reach ${randFrom(intel_words)}, ${rival.name} evading you at every opportunity. With a screech, ${gPron(rival, "subject")} leaps down on you from the shadows, ${captured ? `and you lose your balance.<br><br>${randFrom(capture)}` : `and you react the only way you can. You knock ${gPron(rival, "object")} away, and use the opportunity to escape. ${randFrom(intel)}`}`,
        `${captured ? randFrom(capture) : `"Dammit!" you contact Agent Fletch with your communicator. "${rival.name} got away."<br><br>"It was a long shot," he answers. "We caused a stir. That's something." You hang up and pick yourselves up. ${randFrom(intel)}`}`,
        captured ? randFrom(capture) : `"We've failed to catch ${rival.name}," you say, clenching your fist by your side. "This doesn't mean you're done," Agent Fletch responds. "You can do better next time." Agent Fletch is right.`]

    let swarmed = [
        `Despite all of your skills, the endless waves of ${randFrom(stage_swarm)} eventually tire you out${captured ? `.<br><br>${randFrom(capture)}` : `, and you almost give up.<br><br>${generic}`}`,
        `With a never-ending stream of ${randFrom(stage_swarm)}, you never should have hoped to win. ${captured ? randFrom(capture) : generic}`,
        `There is no end to the ${randFrom(stage_swarm)}, and inch by inch you are forced to retreat${captured ? `, until there is nowhere to retreat to, and you are buried under the avalanche of assailants.` : `. ${generic}`}`,
        `You look over the battlefield, and scores more ${randFrom(stage_swarm)} are moving in to flank you. In just moments you are about to be completely overrun.<br><br>${captured ? randFrom(capture) : generic}`,
        `"Go! Now! Get to the chopper!" ${whichPreposition(stage.bystander)} shouts as ${enemy.boss} steps over ${randFrom([`him`, `her`])}. ${captured ? `You are in no shape to move. ${randFrom(capture)}` : `<br><br>${randFrom(retreat)} ${randFrom(intel)}`}`
    ]

    let undead = [
        `Looking out over the battlefield, you see the zombies are too many for you to keep at bay. ${captured ? `You fight as long as you can, but eventually you are overrun by the horde.` : `"Agent Fletch," you say into your radio. "The target's fled, and the horde is loose. Requesting extraction.`}`,
        `"Go!" ${whichPreposition(stage.bystander)} yells at you from where ${contact} lies, wounded and pinned. "Get out of here!" You turn and flee as the unstoppable horde of zombies approaches${captured ? `, but you are not fast enough in your current state.` : `. Sounds of fighting can be heard as ${contact} fights them off as long as ${contact} can, but all too soon those sounds give way to screams of pain.<br><br>${randFrom(intel)}`}`
    ]

    let loseresult

    let keywords = ["generic"]

    wincondition != "" ? keywords = [wincondition, wincondition, wincondition, wincondition, ...keywords] : () => { }

    stage.hasOwnProperty("keywords") ? keywords = [...keywords, ...stage.keywords, ...stage.keywords] : () => { }
    enemy.hasOwnProperty("keywords") ? keywords = [...keywords, ...enemy.keywords, ...stage.keywords] : () => { }
    let keyword = randFrom(keywords)

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
    //    if(wincondition === keyword) {
    //        console.log(wincondition);
    //       console.log(enemy.boss)
    //      console.log(loseresult)
    //    }
    return loseresult
}

export function victoryResult(stageindex, story, nextstage, gizmo, masterplan, wincondition, ally, rival, nstages) {

    let finalboss = story[Math.max(nstages * 2 - 3, 0)].enemy
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
    let detonationaction = getPropertyValue(enemy, stage, "detonation", `${gPron(enemy, "subject")} produces a remote and presses a button. An explosion knocks you down`)

    switch (nextmission.name) {
        case "Ashes of the Eternal":
        case "The Ceremony":
        case "Snowdown": clue = [
            `${nextenemy.boss} has an interest on a certain ${evilplace}`,
            `mysterious rituals are taking place in a distant ${evilplace}, closely tied to grand scheme of ${nextenemy.boss}.`
        ]
            break;
        case "Bogged Down": clue = [
            `toxic equipment and modified pumps have been spotted deep in the wetlands, operated by ${nextenemy.name}`,
            `${nextenemy.name} has established a staging site in the wetlands, with reports of gator activity`, `barrels of hazardous waste marked with ${possessiveSuffix(nextenemy.name)} insignia have been found leaking into protected marshland`,
            `the wetlands are showing signs of rapid contamination, possibly caused by operations run by ${nextenemy.boss}`,
            `locals have reported strange lights and heavy machinery within the swamp — ${nextenemy.name} may be behind it`,
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
        case "Higher Purpose": clue = [
            `${nextenemy.name} is moving illicit cargo under cover of night at an old shipping warehouse`,
            `someone spotted ${nextenemy.name} unloading crates marked for "industrial use" with a little too much muscle nearby`,
            `${nextenemy.name} is running a black market pipeline straight through Ransom City’s forgotten ports`,
            `the ${nextenemy.name} and their crew are hauling goods not meant for public sale in an old freight depot lit only by flickering halogens`,
            `${nextenemy.boss} has been spotted wearing a smug grin and mirrored shades around a warehouse whose alarms keep "mysteriously" failing`,
            `a warehouse full of unmarked boxes is used by the ${nextenemy.name}, and whatever they are moving, it ain’t legal`
        ]
            break;
        case "Meltdown": clue = [
            `${nextenemy.name} - ${nextenemy.desc} - have seized control of a nuclear facility under the guise of emergency drills`,
            `there are radiation spikes that suggest ${nextenemy.name} - ${nextenemy.desc} - are tampering with active reactor cores`,
            `${nextenemy.boss} appears to be initiating a deliberate meltdown at a civilian energy plant`,
            `a suspicious shutdown at a local nuclear site has been traced to ${nextenemy.name}, who now occupy the control wing`,
            `${nextenemy.name} are preparing a large-scale energy surge, likely tied to reactor manipulation`,
            `you must prevent ${possessiveSuffix(enemy.name)} unauthorized fission experiments deep within a decommissioned plant`
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
        case "Reel Terror": clue = [
            `the curtain rises as ${nextenemy.boss} is planning something downtown`,
            `the ${nextenemy.name} is preparing a major move in the city center. The previews are over`,
            `the opening act from ${nextenemy.boss} is about to happen downtown`
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
            `the ${nextenemy.name} has something going down at an unfinished construction site`]
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
            `In the midst of the chaos, a discarded ${gizmo} belonging to ${enemy.boss} reveals communications between ${gPron(enemy, "object")} and an unknown entity. The messages hint of`,
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
        let ambiguous_word = randFrom([`subtly`, `cryptically`, `eerily`, `discreetly`, `abstractly`, `curiously`, `indirectly`, `cryptically`, `unexpectedly`, `vaguely`, `broadly`])
        let definite_word = randFrom(['explicitly', 'precisely', 'unmistakably', 'definitively', 'conclusively', 'unequivocally', 'directly', 'specifically', 'clearly', 'unambiguously', 'decisively']);
        let hinting_word = randFrom([`indicating that`, `leading to conclusion that`, `pointing towards the conclusion that`, `suggesting the idea that`, `leading to a realization:`, `guiding you to a conclusion:`, `hinting that`, `suggests that`, `revealing that`, `alluding that`, `directing you towards a surprising conclusion:`, `suggesting the idea that`
        ])
        let ambiguity_element = (nextstage >= nstages * 2 - 3) ? `${definite_word} ${hinting_word}` : `${hinting_word}`
        switch (masterplan) {
            case "kidnapping":
                masterplanclues = [
                    `A torn map is found among the gear of ${enemy.minions()}, marked with specific locations and times. "Could ${finalboss.name} be planning the victim's transfer here?" you wonder, the clues ${ambiguity_element}`,
                    `Recovered communications between ${enemy.boss} and unknown contacts discuss a "precious cargo" being moved at dawn. "Could this be ${possessiveSuffix(finalboss.boss)} doing?" you ponder, the message ${ambiguity_element}`,
                    `A witness comes forward, shaken, reporting a suspicious exchange in the shadows of the city. "They were talking about a key location for ${possessiveSuffix(finalboss.name)} 'cargo'," the witness recalls, their account ${ambiguity_element}`,
                    `A hastily deleted email recovered from ${possessiveSuffix(enemy.boss)} computer mentions a change in the pickup location. "They're on the move," you realize, the digital paper trail ${ambiguity_element}`,
                    `Surveillance footage of the area captures a van with obscured plates frequently visiting. "Could have been their holding spot," you theorize, the video evidence ${ambiguity_element}`,
                    `A forgotten diary at the skirmish site contains veiled references to "the taken" and "the exchange." "Codes for the kidnapping operation?" you speculate, the diary's entries ${ambiguity_element}`,
                    `You discover a series of burner phones with only one number dialed. "A direct line to ${finalboss.boss}?" you ponder, the call logs ${ambiguity_element}`
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
                    `An increase in secure communications and suspicious activity around certain facilities after the last fight raises questions. "Is ${finalboss.name} mobilizing? For what purpose?" you ponder, each piece of evidence collectively ${ambiguity_element}`,
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

    let winconditiontext = ""
    if (wincondition != "") {
        let guide_condition = randFrom([
            `"With ${enemy.name} finally behind us, we've done more than survive; we've sent a message," ${ally.name} declares, relief and pride mingling in ${gPron(ally, "possessive")} eyes. "Thanks to you, we've made it through." As you share a moment of triumph, the realization of what you've achieved together settles in, leaving a lasting bond that even time cannot erode. In the aftermath, you find a clue left behind by the enemy, revealing that`,
            `"That was a close one," you exhale, watching as ${possessiveSuffix(enemy.name)} ruined plans fade into the distance. ${ally.name} nods in agreement, a smile breaking through the tension. "We did it. Together." The path ahead seems less daunting now, your success a beacon for future endeavors. The journey has changed you both, for better. Amidst the relief, you uncover evidence indicating that`,
            `"We've turned the tide this day," ${ally.name} says, the weight of victory evident in ${gPron(ally, "possessive")} tone. "What we've done here... it's the start of something new." The ${possessiveSuffix(enemy.name)} defeat marks not just a win, but the beginning of a new chapter, one that you and ${ally.name} have penned with courage and determination. As the dust settles, pieces come together to reveal`,
            `As the dust settles and the last of ${possessiveSuffix(enemy.name)} forces retreat, you turn to ${ally.name}, victorious. "We've secured a future," you say, the triumph clear in your voice. ${ally.name} simply nods, the shared victory speaking volumes of the trust and camaraderie forged in the heat of battle. Together, you've not only survived; you've prevailed. In the quiet that follows, you learn that`,
            `"Consider this a promise kept," ${ally.name} says, watching as the enemy falters and falls back. The victory is more than a mere win; it's a testament to your resilience, strategy, and the unbreakable spirit you and ${ally.name} possess. As you stand together, a sense of accomplishment and hope for the future fills the air, a bright contrast to the trials you've faced. However, amidst the celebration, you stumble upon a secret that leads to the realization:`
        ])
        let escort_condition = randFrom([
            `"Mission accomplished," ${ally.name} breathes out, the relief palpable. "Thanks to you, we've navigated through the danger." Standing side by side, you share a look of mutual respect. The journey has bonded you in ways you hadn't anticipated. Just as you begin to relax, ${ally.name} hands you a document, its contents leading to the realization that`,
            `"We've made it, against all odds," you say, marveling at the resilience both of you have shown. ${ally.name} nods, a smile of gratitude lighting up ${gPron(ally, "possessive")} face. "Your protection made all the difference." As the dust of your journey settles, ${ally.name} reveals a piece of intel, indicating that`,
            `"I owe you my life," ${ally.name} says, once you've reached safety. The journey, fraught with peril, has tested you in ways you never imagined. Yet, here you are, victorious. In the moment of victory, ${ally.name} shares a crucial piece of information, revealing that`,
            `The safe passage you've secured for ${ally.name} feels like a significant victory, not just for the mission, but for the principles you stand for. "We've done more than survive; we've thrived," you reflect aloud. ${ally.name} agrees, and in the aftermath of your success, presents you with a coded message. Deciphering it leads to the realization that the  ${nextenemy.boss == finalboss.boss ? `plans of ${trueMastermind(finalboss)}` : `${possessiveSuffix(finalboss.name)} plans`} are far from thwarted:`,
            `"Your courage is the reason we're here," ${ally.name} tells you once you've both emerged from the shadows of danger. The sense of accomplishment is overwhelming, but so is the sense of impending challenges. As ${ally.name} debriefs you on the mission's findings, you uncover a clue hinting that`
        ]);
        let intel_condition = randFrom([
            `"This is what we came for," you say, holding the ${randFrom([`newly acquired intel`, `${gizmo}`])} securely. Despite the ${possessiveSuffix(enemy.name)} formidable defenses, you've managed to outmaneuver them, securing a critical advantage. As you and your team process the implications of your victory, it becomes clear that you now hold information revealing that`,
            `"Got it," you whisper into the comms, feeling the weight of victory as you secure the ${gizmo}. Through cunning and guile, you've extracted data that could shift the balance of power. The true value of this operation becomes apparent as you make your escape, understanding that you've obtained information that`,
            `The dust settles, and you find yourself looking over the secured ${gizmo}, a testament to the risks taken and the success achieved. This operation's payoff is immense, offering a beacon of hope as you realize the ${nextenemy.boss == finalboss.boss ? `once-impenetrable facade of ${trueMastermind(finalboss)}` : `${possessiveSuffix(finalboss.name)} once-impenetrable facade`} begins to show cracks, ready to be exploited:`,
            `"The pieces are finally coming together," you muse, after successfully intercepting encrypted ${randFrom([`messages`, `messages in a ${gizmo}`])} from ${nextenemy.boss == finalboss.boss ? `the ${trueMastermind(finalboss)}` : `${finalboss.boss}`}. The decrypted ${randFrom([`data`, `${gizmo}`])} not only shifts the dynamics of your conflict but also marks the beginning of a new chapter in your campaign against the darkness as it reveals that`,
            `"We've broken through," announces Agent Fletch, as the ${randFrom([`data`, `${gizmo}`])} decryption completes. The room buzzes with a renewed sense of purpose and direction, as what you've secured from ${enemy.boss} finally becomes clear. The decrypted intel paints a new target and opens a path forward, showing that`
        ])

        let rival_condition = randFrom([
            `"You know why we're here," you start, eyeing  ${rival.name} bound before you. Despite their resistance, your determination pays off. As the questioning proceeds, ${gPron(rival, "subject")} finally breaks. The moment is pivotal, marking not just a victory in interrogation but a crucial turning point in your quest, revealing that`,
            `${rival.name} sits across from you, defiance in ${gPron(rival, "possessive")} eyes. Yet, as the conversation unfolds, your skillful probing begins to erode ${gPron(rival, "possessive")} resolve. What comes next is a flood of information that could very well be the key to dismantling your greatest adversary. A testament to your interrogation prowess, you uncover that`, `
            "Talk," you urge, your voice a mix of command and persuasion. ${rival.name}, cornered and outmatched, starts with hesitations but soon divulges secrets you had only hoped to learn. The breakthrough comes when ${gPron(rival, "subject")} discloses that`,
            `The room is quiet, save for the conversation between you and ${rival.name}. Each question you pose is a calculated step towards unveiling the truth. Success comes quietly, shifting the balance of your ongoing struggle. The path ahead clarifies, laden with opportunities for striking back with ${possessiveSuffix(rival.name)} revelation:`,
            `Under the pressure of your unyielding gaze, ${possessiveSuffix(rival.name)} facade begins to crack. What starts as a trickle of reluctance turns into a cascade of revelations. The climax of your interrogation changes the course of your mission:`
        ])

        let hostage_condition = randFrom([
            `"Everyone's safe," you announce, a sigh of relief shared among your team as the last of the bystanders is brought to safety. This operation wasn't just about thwarting the ${enemy.name}; it was about preserving lives. As the rescued individuals recount their experiences, they inadvertently revealing a threat looming on the horizon:`,
            `As the dust settles and the area is secured, you take a moment to look over the people you've just saved. Their gratitude is palpable, but it's the unexpected intel they provide that catches your attention. In their accounts of captivity, they mention details uncovering that`,
            `"It's over, you're safe now," you reassure the bystanders, guiding them to the extraction point. The mission was fraught with danger, but every risk taken was worth the lives saved today. Among the expressions of thanks, one of the bystanders shares a crucial piece of information, opening up new avenues for your mission's objectives:`,
            `With the area finally clear of threats, you gather the rescued bystanders for a quick debrief. It's standard procedure, but today it yields something far from ordinary. One of the people you've saved begins tell what they had overheard, the information being the breakthrough you've been searching for:`,
            `The mission's success is measured not just in the ${enemy.name} defeated but in the lives touched and saved. As you debrief the people you've rescued, their stories of endurance and survival inspire you. But it's the unexpected discovery among their belongings — a ${gizmo}, containing information that`
        ])

        switch (wincondition) {
            case "escort": winconditiontext = escort_condition;
                break;
            case "guide": winconditiontext = guide_condition;
                break;
            case "intel": winconditiontext = intel_condition;
                break;
            case "rival": winconditiontext = rival_condition;
                break;
            case "hostages": winconditiontext = hostage_condition;
                break;
            default: winconditiontext = "Your goals were fulfilled, and you come to the realization that"
        }

        gatherclues = [winconditiontext]
        //        console.log(wincondition);
        //        console.log(`${conditiontext}`)

    }

    let planning = [`. You decide to pay them a visit.`, `. Agent Fletch suggests you continue your investigations there.`, `. A frightened ${bystanders} begs you to hurry up!`, `, and you think there really is no other option than to investigate.`, `. Perhaps it is time to visit ${nextenemy.boss}.`, `. This new insight leaves you with no choice but to take immediate action.`, `. With the information in hand, your next move is clear. The team is ready to follow your lead.`, `. The intel points towards a pivotal next step; hesitation is no longer an option.`, `. Now, with a clearer picture, it's time to plan your next strategic move.`, `. The revelations compel you to act swiftly; there's much to be done.`, `. Armed with this knowledge, you're one step closer to thwarting their plans.`, `. The pieces are coming together, prompting an urgent response.`, `. With these clues unraveled, the path forward is undeniable.`, `. This information is the key you needed; now it's time to unlock the next door.`, `. Understanding their motives better now, you prepare to counter their next move.`]

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

    let victoryresult = (nextstage >= nstages * 2 - 3) ? randFrom(gatherclues).replace(" that", "").replace("continues", "reveals") + " " + finalclue + "<br><br>" + finality : randFrom(gatherclues) + " " + clue + randFrom(planning)

    return victoryresult
}

export function determineNextStage(stageindex, story, result, nstages) {

    let nextstage = Math.ceil(stageindex / 2) * 2 + 1 + result

    if (stageindex >= nstages * 2 - 3) { nextstage = 0 }

    return nextstage
}

export function getRandomMinions(enemy, getdeck = false, enemies = getEnemies()) {

    let clones = randFrom(enemies.filter(e => e.name !== enemy.name))

    if (getdeck == false) {
        const final = [clones.minionnames[0], clones.minionnames[1]];
        const these_minions = enemy.minionnames.map(m => m.replace("Veronica Pepper", "Veronica"))
        const exclude = [...new Set(["Goliath", "Lion"].concat(these_minions))]
        const filtered = final.filter(word => !exclude.includes(word.replace));
        return `select ${randFrom(filtered)} from the ${clones.name} deck as the minion`
    } else { return clones.name }
}


export function setUpInstructions2(stageindex, enemy, rival, ally, knowledge, stagebonus, stagemalus, expansions) {

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
        { setup: `Reveal cards from the ${getRandomMinions(enemy, true, getEnemies(expansions))} deck until 1P minions are revealed. Each fighter puts one of the revealed minions in their threat area, and puts their figure into play. When one of these minions is defeated, that minion is removed from the game.` },
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

    directions.forEach(dir => {
        if ('setup' in dir) {
            setuptext += ` ${dir.setup}`;
        }
        if ('activate' in dir) {
            persistence = true;
            activate = true;
            activatetext += ` ${dir.activate}`;
        }
        if ('persistent' in dir) {
            persistence = true;
            persistenttext += ` ${dir.persistent}`;
        }
        if ('allysetup' in dir) {
            allysetup = true;
            setuptext += ` ${dir.allysetup}`;
        }
        if ('rivalsetup' in dir) {
            rivalsetup = true;
            setuptext += ` ${dir.rivalsetup}`;
        }
        if ('rivalboost' in dir) {
            rivalboost = true;
        }
        if ('wincondition' in dir) {
            wincondition = dir.wincondition;
        }
        if ('prologue' in dir) {
            prologue = dir.prologue;
        }
    });

    let instructions = `<b>Stage Setup:</b> ${setuptext}${persistence ? ` Put this card into play in the stage play area.` : ""} ${persistence ? persistenttext : ""}${activate ? ` <b>Activate:</b> ` : ""}${activate ? activatetext : ""}`

    instructions.trim() == "<b>Stage Setup:</b>" ? instructions = `<b>Stage Setup:</b> No special setup` : () => { }

    return ({ setup: instructions, allysetup: allysetup, rivalsetup: rivalsetup, rivalboost: rivalboost, wincondition: wincondition, prologue: prologue })

}

function trueMastermind(finalboss) {
    let true_words = ["true", "real", "paramount", "utmost", "mysterious"]
    let mastermind_words = ["mastermind", "architect", "engineer", "intellect", "prime mover"]
    let description_words = [`recent`, `devious`, `criminal`, `insidious`]
    let plot_words = [`plot`, `masterplan`, `events`, `incidents`]
    let finalboss_words = [`the ${randFrom(description_words)} ${randFrom(plot_words)}`, `the ${randFrom(description_words)} ${randFrom(plot_words)}`, `${finalboss.boss}`, `the ${finalboss.name}`]
    return `the ${randFrom(true_words)} ${randFrom(mastermind_words)} behind ${randFrom(finalboss_words)}`

}

function assumption_words() { return randFrom(["believe", "consider", "conclude", "suppose", "think", "regard", "assume", "postulate", "deem", "surmise", "resolve"]) }
function citadel_words() { return randFrom([`the Gladiators`, `you`, `Citadel`, `Global Gladiators`, `Agent Fletch`])}
function hence_words() { return randFrom([`Accordingly`, `Hence`, `So`, `Consequently`, `Therefore`, `Thus`]) }
function intel_words_2() {  return randFrom([`intel`, `evidence`, `intelligence`, `information`]) }
function investigator_words() { return randFrom(["Citadel analysts", "you", "Agent Fletch and you"]) }

function default_clues(enemy, _hence, _citadel_word, _intel_word, _investigator_word) {
        return randFrom(["Based on current intel", 
        "Chasing the clues", 
        "Following your leads", 
        "In pursuit of clues", 
        `After a little more ${_intel_word}-gathering`, 
        "Following this lead", 
        "As you investigated further", 
        "After searching for more intel", 
        `Following the ${_intel_word} you had`, 
        `After searching for more ${_intel_word}`, 
        "Reviewing what you got", 
        `With the ${_intel_word} you gathered`, 
        `You tracked down some of the ${enemy.name} associates and tailed their movements. ${_hence}`, 
        `Following the trail of money leading from the previous encounter`, 
        `"We've traced them," Agent Fletch says, seated across the table. He takes out a satellite image and lays it on the table, pointing to a small red dot near the image's center. ${_hence}`, 
        `"Here," Agent Fletch stabs his finger onto the table, pointing on a map unfolded there. "Is where there your next stop is." ${_hence}`, 
        `"The ${_intel_word} has been confirmed," the Citadel analyst turns from ${randFrom([`his`, `her`])} computer. ${_hence}`,
        `A Vandal-addicted informat had some oddly specific ${_intel_word}, and you decided to check how it fits with what you already knew. Surprised by the accuracy`,
        `Your ${_intel_word} was not specific enough, but a mysterious government official approaches you to lead you further. "The most important thing is that you cannot tell anyone that I was here or that we spoke," ${randFrom([`he`, `she`])} reminds you. ${_hence}`,
        `"With the clues pieced together," you remark, looking over the compiled data. "It's time we follow where they point." ${_hence}`,
        `"This breadcrumb trail is leading us somewhere," you muse aloud, studying the patterns of the enemy's recent activities. ${_hence}`, `"Our latest intel sheds new light on their operations," your teammate observes, handing you a file of gathered evidence. ${_hence}`, `"Cross-referencing the information," you begin, laying out the connections on the digital map. "Leads us right here." ${_hence}`, 
        `After decrypting the last of the ${_intel_word}, "We've got a lead worth chasing," you declare. ${_hence}`, 
        `"This snippet," you replay the audio, "pinpoints their next move." ${_hence}`, 
        `"The satellite images don't lie," you note, zooming in on a suspicious compound. "They've been busy." ${_hence}`, 
        `"Their mistake was leaving traces," you say, scanning through ${_intel_word}. "Now, we're on their trail." ${_hence}`, 
        `"The ledger reveals more than they intended," you point out, highlighting the anomalies. "Follow the money." ${_hence}`, `"Detaled analysis of the recovered ${_intel_word} confirms us our next target." ${_hence}`, 
        `"The pattern is no coincidence," you deduce, plotting out the ${_intel_word} you have over your map. "It all connects here." ${_hence}`, 
        `After a confidential informant comes forward, "This might just be the breakthrough we needed," you realize. ${_hence}`, 
        `"Correlating the ${_intel_word} with the witness statements," you conclude, "points us directly to their next operation." ${_hence}`, 
        `"Surveillance footage gave us the last piece," you highlight the key moments. "Time to act on it." ${_hence}`, 
        `"The intercepted communique is clear," you decipher the coded message with the aid of existing ${_intel_word}. "Their next move is imminent." ${_hence}`,
        `After studying the uncovered ${enemy.name} supply routes, ${_investigator_word} pinpointed a location that didn’t fit the pattern. It was worth checking out. ${_hence}`,
        `The ${_intel_word} led you to a forgotten ${randFrom(getEnemies()).name} safehouse, untouched since the last operation months ago. It was as empty as the last time, expect for one important clue that previously seemed irrelevant. ${_hence}`,
        `"Cross-checking patrol schedules and public camera feeds revealed a consistent anomaly," ${_investigator_word} explain to the team. "We should move to investigate". ${_hence}`,
        `"They slipped up," you mutter, circling a date on the timeline. "That’s our window." ${_hence}`,
        `A retired agent contacted ${_citadel_word} through an encrypted channel. "They’re resurfacing," ${randFrom([`he`, `she`])} warned. You can't hesitate. ${_hence}`,
        `"This frequency only activates when they're planning on making a move," the Citadel tech says. You monitor it closely for a while. ${_hence}`,
        `"Whoever scrubbed these files missed a folder," ${_investigator_word} point out. "And that might have just given us what we needed." ${_hence}`
        ])
}

function winConditionLeadIn(wincondition, default_text, enemy, this_boss, this_finalboss, ally, rival) {
    
    let wincondition_txt;
    let _priority_word = randFrom([`a priority`, `a first concern`, `the most pressing matter`, `the most important consideration`, `most important`, `takes precedence`]);
    let _intel_word_2 = intel_words_2();
    let _investigator_word = investigator_words();
    let _decision_word = randFrom([`resolve`, `determine`, `come to a decision`, `decide`, `come to a conclusion`])
    let find_out_words = randFrom([`you discover`, `you find out`, `you learn of`, `you get wind of`, `you determine`, `it seems`, `turns out`, `it is revealed`]);
    let _hence = hence_words();
    let turns_out_words = randFrom([`it turns out`, `it emerges`, `it comes to light`, `it transpires`, `you find out`, `${_investigator_word} ${assumption_words()}`])
    let _citadel_word = citadel_words();

    if (wincondition == "intel") {

        let evidence_clues = [
            ` that ${this_boss} possesses unexpected insights into ${possessiveSuffix(this_finalboss)} weaknesses and strategies.`,
            ` ${this_boss} has meticulously compiled ${_intel_word_2} on the hidden agendas of ${this_finalboss}.`,
            ` how ${this_boss} is secretly harboring ${_intel_word_2} crucial for dismantling ${this_finalboss}'s network.`,
            ` the ${_intel_word_2} indicating ${this_boss} recently brokered a deal with ${this_finalboss}, exchanging sensitive ${_intel_word_2} for mutual benefit.`,
            ` that ${this_boss} used to be a confidant of ${this_finalboss}, privy to intimate ${_intel_word_2} on ${possessiveSuffix(this_finalboss)} plans and vulnerabilities.`,
            ` there is ${_intel_word_2} that shows ${this_boss} maintains a covert communication channel with ${this_finalboss}, offering a direct line to intercept critical ${_intel_word_2}.`,
            ` ${_intel_word_2} suggests ${this_boss} holds the key to deciphering ${this_finalboss}'s next move, thanks to a cache of encrypted ${_intel_word_2}.`,
            ` that ${this_boss} has been tracking ${this_finalboss}'s movements and alliances, amassing a detailed dossier that could expose ${possessiveSuffix(this_finalboss)} ultimate endgame.`
        ]
        let acquire_words = [`obtaining`, `acquiring`, `securing`, `procuring`, `getting`, `finding`]
        let decision_txt = `${ucInit(_investigator_word)} ${_decision_word} ${randFrom(acquire_words)} the ${_intel_word_2} is ${_priority_word}.`
        wincondition_txt = `${ucInit(find_out_words)}${randFrom(evidence_clues)} ${decision_txt} ${_hence}`

    } else if (wincondition == "rival") {

        let rivals_fate_words = [`capturing`, `seizing`, `arresting`, `catching`, `interrogating`, `grilling`, `questioning`]
        let rival_capture = `${ucInit(_investigator_word)} ${_decision_word} ${randFrom(rivals_fate_words)} ${gPron(rival, "object")} is ${_priority_word}`

        wincondition_txt = randFrom([
            `${ucInit(find_out_words)} ${this_boss} has an associate who knows more about the plans of ${this_finalboss}. ${rival_capture}. ${_hence}`,
            `${ucInit(find_out_words)} ${this_boss}  is linked to an insider with key insights on the operations of ${this_finalboss}. ${rival_capture}. ${_hence}`
        ])

    } else if (wincondition == "escort") {

        let escort_prologue = [
            `${ally.name} has agreed to share ${gPron(ally, "possessive")} ${_intel_word_2} on ${this_finalboss} if you help ${gPron(ally, "object")} with ${this_boss}.`,
            `${default_text}, ${turns_out_words} that ${ally.name} has ${_intel_word_2} on ${this_finalboss}. You need to make sure ${gPron(ally, "subject")} survives for ${_investigator_word} to get that ${_intel_word_2}.`,
            `${ally.name} has approached ${_citadel_word} for assistance in exchange for ${_intel_word_2} on ${this_finalboss}. ${ucInit(gPron(ally, "subject"))} needs your protection from ${this_boss}.`,
            `${ally.name} is on a parallel Citadel mission to yours, and you need to protect ${gPron(ally, "object")} so ${gPron(ally, "subject")} can obtain whatever ${_intel_word_2} ${gPron(ally, "subject")} is after.`,
            `After the previous encounter, you see a familiar silhouette materialize from the smoke and dust before you: ${ally.name}. Your occasional ally approaches, smirking slyly. "Fancy meeting you here", you say to ${gPron(ally, "object")}. "Thanks for the heads-up." ${ucInit(gPron(ally, "subject"))} claps ${gPron(ally, "possessive")} hand on your shoulder. "Help me defeat ${enemy.desc}, and I will tell you all about ${this_finalboss}."`,
            `"${ally.name}!" you shout at ${gPron(ally, "object")}. "Is this on you? What do you know about ${this_finalboss}?" "I can tell you something," ${gPron(ally, "subject")} answers. "But not for nothing. Are you willing to help me with something?"`,
            `As you navigate through the remnants of a recent skirmish, a coded message from ${ally.name} lands in your hands. "I've got a lead on ${this_finalboss}," the note reads, "But I'm in a tight spot with ${this_boss}. Lend a hand?" It seems your paths are intertwined once more.`,
            `"Look who it is," ${ally.name} exclaims, emerging from the shadows. "Got a bit of a situation here involving ${this_boss}. Sort this out with me, and I've got crucial info on ${this_finalboss}." Trust and suspicion mingle in the air as past alliances are put to the test.`,
            `In the hush of a clandestine meeting, ${ally.name} lays out a map, fingers tracing a path to ${possessiveSuffix(this_boss)} location. "We strike here, we strike hard," ${gPron(ally, "subject")} asserts. "And after? I'll spill everything I know about ${this_finalboss}." The promise of secrets untold sharpens your resolve.`,
            `A sudden alliance forms in the chaos as ${ally.name} steps from ${enemy.name} ranks, a defector with invaluable knowledge. "I can help you with ${this_finalboss}," ${gPron(ally, "subject")} proposes, "but first, we deal with ${this_boss}." A flicker of trust sparks amidst the turmoil, offering a beacon of hope.`
        ]
        wincondition_txt = `${randFrom(escort_prologue)} ${_hence}`

    } else if (wincondition == "guide") {

        let guide_prologue = [
            `You turn around in the safehouse, and see ${ally.name} sitting in another room. "${ally.name}! You old dog!" You clasp hands in a fierce, arm-wrestle shake. The two of you strain, muscles flexing. "${ally.name}... still pushing too many pencils?" you ask. "You never did know when to quit," ${gPron(ally, "subject")} replies. "Neither did you. So what’s the real story?" you say, narrowing your eyes. ${ally.name} smirks. "Same old mission. Just... more complications." You let go and crack your knuckles. "Let’s get to work."`,
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
        wincondition_txt = `${randFrom(guide_prologue)} ${_hence}`

    } else if (wincondition == "hostages") {

        let bystander_words = [`bystanders`, `people`]

        let protection_prologue = [`there are numerous innocent ${randFrom(bystander_words)} in the area, and protecting them is ${_priority_word}`]

        wincondition_txt = `${default_text} ${find_out_words} ${randFrom(protection_prologue)}. ${randFrom(default_clues)}`

    } else { wincondition_txt = default_text }
    
    return wincondition_txt
}

export function createLeadIn(pregameprologue, stageindex, wincondition, enemy, stage, finalboss, rival, ally, nstages) {

    pregameprologue = stageindex == 0 ? pregameprologue : ``
    let this_boss = finalboss.name == enemy.name ? enemy.boss : randFrom([enemy.boss, `the ${enemy.name}`])
    let this_finalboss = finalboss.name == enemy.name ? finalboss.boss : randFrom([finalboss.boss, `the ${finalboss.name}`])
    if (stageindex >= Math.max(nstages * 2 - 3, 0) || finalboss.boss == enemy.boss) { this_finalboss = trueMastermind(finalboss) }
    let intel_words = ["intel", "intelligence", "information", "a clue", "a word", "lowdown", "leads"]
    let location_words = ["locale", "location", "whereabouts", "position", "scene", "station", "bearings"]
    let _investigator_word = investigator_words()
    let _citadel_word = citadel_words()
    let _intel_word_2 = intel_words_2()
    
    let first_is_final = enemy.boss != finalboss.boss && stageindex == 0 && wincondition == "" ?
    randFrom([`Without ${randFrom(intel_words)} on the current ${randFrom(location_words)} of ${finalboss.boss}, ${_investigator_word} ${assumption_words()} ${enemy.boss} is the best source for more information.<br><br>`,
            `There's little ${intel_words_2()} about the ${randFrom(location_words)} of ${finalboss.boss}, leaving ${_investigator_word} to ${assumption_words()} ${enemy.boss} as the next best lead.<br><br>`,
            `With no clear ${intel_words_2()} on where ${finalboss.boss} is now, ${_investigator_word} ${assumption_words()} that ${enemy.boss} might hold some answers.<br><br>`,
            `${intel_words_2()} regarding ${possessiveSuffix(finalboss.boss)} current ${randFrom(location_words)} is missing, so ${_investigator_word} ${assumption_words()} ${enemy.boss} as a crucial informant.<br><br>`,
            `No reliable ${intel_words_2()} exists about ${finalboss.boss} at the moment, making ${enemy.boss} the most obvious source to question, according to ${_investigator_word}.<br><br>`,
            `Without updated ${intel_words_2()} on ${possessiveSuffix(finalboss.boss)} whereabouts, ${_investigator_word} ${assumption_words()} that pressing ${enemy.boss} might be the only option.<br><br>`,
            `The trail to ${finalboss.boss} has gone cold; ${_investigator_word} ${assumption_words()} ${enemy.boss} is still in a position to shed some light.<br><br>`,
            `Missing ${intel_words_2()} about the ${randFrom(location_words)} of ${finalboss.boss} forces ${_investigator_word} to ${assumption_words()} that ${enemy.boss} could fill in the blanks.<br><br>`]) : ``

    let _hence = hence_words()
    
    let d_clues = default_clues(enemy, _hence, _citadel_word, _intel_word_2, _investigator_word)
    
    let wincondition_txt = winConditionLeadIn(wincondition, d_clues, enemy, this_boss, this_finalboss, ally, rival)

    let lead_in = pregameprologue + first_is_final + wincondition_txt

    return lead_in
}

export function getGizmo() {
    return randFrom(["data disc", "keycard", "tape recorder", "floppy disc", "microchip", "communicator", "cell phone", "diskette", "data cartridge", "tablet", "magnetic tape", "computer", "laser disc", "minidisc", "memory ribbon", "data crystal", "neural interface card", "cyberdeck", "video wristwatch"])
}

export function removeLastBrBr(str) {
    if (str.endsWith("<br><br>")) {
        // Remove "<br><br>" only at the end of the string
        return str.substring(0, str.length - "<br><br>".length);
    }
    // If "<br><br>" is not at the end, return the original string
    return str;
}

export function createPrologue(stageindex, story, alliesandrivals, heronames, enemies, pregameprologue, vip, herodialogue, nstages, expansions) {
    let finalboss = story[Math.max(nstages * 2 - 3, 0)].enemy
    let finalstage = story[Math.max(nstages * 2 - 3, 0)].stage
    let enemy = story[stageindex].enemy
    let stage = story[stageindex].stage
    let rival = allyNamer(alliesandrivals, enemy, heronames, finalboss)
    let ally = allyNamer(alliesandrivals, enemy, heronames, finalboss)
    let knowledge = stage.knowledge
    let minion = randFrom(enemy.minionnames)
    let instructions = setUpInstructions2(stageindex, enemy, rival, ally, knowledge, stage.stagebonus, stage.stagepenalty, expansions)
    let rivalpresence = instructions.rivalsetup
    let rivalboost = instructions.rivalboost
    let trail = createLeadIn(pregameprologue, stageindex, instructions.prologue, enemy, stage, finalboss, rival, ally, nstages)
    let setup = `<b>${stage.name}: ${enemy.name} ${(["Kingdom", "Empire"]).includes(enemy.name) ? `(${enemy.boss})` : ""}</b><br>` + ((stage.name == "Original Copy") ? ucInit(getRandomMinions(enemy, false, enemies = getEnemies(expansions))) + ".<br>" : ``) + instructions.setup
    let win = determineNextStage(stageindex, story, 0, nstages)
    let lose = determineNextStage(stageindex, story, 1, nstages)
    let gizmo = getGizmo()

    let smallvictory = randFrom([
        `You could not stop ${finalboss.boss}, but your efforts were not in vain, as a threat as serious was neutralized. `,
        `While the shadow of ${finalboss.boss} looms large, your valor shines through the darkness. You may not have crossed paths with the ultimate foe, yet the downfall of ${enemy.boss} marks a critical blow to their nefarious plans. Ransom City breathes easier tonight, saved from a catastrophe just as dire, thanks to your unwavering courage. `,
        `The elusive ${finalboss.boss} remains at large, a reminder of the battles yet to come. However, your triumph over ${enemy.boss} has severed a crucial arm of their dark ambitions. This victory, though not the final confrontation you sought, is a testament to your strength and a beacon of hope in the fight against the encroaching darkness. `,
        `Though ${finalboss.boss} eludes justice for now, your strategic dismantling of ${possessiveSuffix(enemy.boss)} plan has dealt a significant blow to their operations. Each step you take unravels the web of terror they sought to weave. Today, you have proven that even in the face of elusive evil, the light of hope cannot be extinguished. `,
        `In the chase for ${finalboss.boss}, fate took a different turn, leading you to confront and overcome ${enemy.boss}. Your success has not only thwarted an immediate threat but has also sown seeds of resilience and defiance against the darkness. The path ahead remains fraught with peril, but your actions have ensured that hope endures. `,
        `Agent Fletch’s voice crackles through the comms, "You might not have caught ${finalboss.boss}, but taking down ${enemy.boss} has sent shockwaves through their ranks. You've done more than just win a battle; you've sown chaos among our enemies. That's a victory in its own right. Well done." His words serve as a reminder that every action contributes to the larger fight for justice.`,
        `In the aftermath of the clash, Agent Fletch meets you with a steady gaze. "Missing ${finalboss.boss} stings, I won’t lie,' he admits, 'but don’t overlook the victory you've claimed today. Defeating ${enemy.boss} was no small feat. It's a testament to your dedication and skill. We're closer to our goal because of what you've accomplished."`
    ])

    let winepilogue = stageindex >= Math.max((nstages * 2 - 3), 0) ? finalResult(stage, enemy, rival, vip, 1, stageindex, story[0]) + "<br><br>" + `${finalboss.boss != enemy.boss ? smallvictory : ``}The fighters win this story.` : victoryResult(stageindex, story, win, gizmo, finalstage.masterplan, instructions.prologue, ally, rival, nstages)
    let loseepilogue = stageindex >= Math.max((nstages * 2 - 3), 0) ? finalResult(stage, enemy, rival, vip, 0, stageindex, story[0]) + "<br><br>" + `The fighters lose this story.` : loseResult(stageindex, story, lose, gizmo, instructions.prologue, rival, rivalpresence, ally, nstages)
    let gloat = gloatingList(enemy, stage, herodialogue, heronames)
    let prologue
    let casino = getCasino(enemy)

    let masterplan = stage.masterplan

    gloat === undefined ? console.log(stage) : ``
    gloat === undefined ? console.log(enemy) : ``

    //stage.name == "Casdft" && knowledge != "" ? console.log(stage.name + Math.random()) : ``

    let template_settings = {
        "stage": stage,
        "enemy": enemy,
        "finalboss": finalboss,
        "enemy": enemy,
        "rival": rival,
        "minion": minion,
        "gloat": gloat,
        "rivalpresence": rivalpresence,
        "rivalboost": rivalboost,
        "stageindex": stageindex,
        "knowledge": knowledge,
        "gizmo": gizmo,
        "trail": trail,
        "casino": casino,
        "vip": vip,
        "approach": stage.approach,
        "blade": getPropertyValue(enemy, stage, "blade", "blade")
    }

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
    } else if (stageindex >= Math.max(nstages * 2 - 2, 0) && enemy.boss != finalboss.boss) {
//        console.log("changed")
        masterplan = stage.masterplan
//        console.log(template_settings.trail)
        stageindex != 0 ? template_settings.trail = changeOfPlans(trail, finalboss, enemy, stage) : ()=>{}
//        console.log(template_settings.trail)
        //stage.hasOwnProperty(masterplan) ? prologue = stage[masterplan](template_settings) : 
        prologue = stage.prologue()(template_settings)
    } else if (stageindex >= Math.max(nstages * 2 - 3, 0) && stage.hasOwnProperty(masterplan) && knowledge != "clueless") {
        prologue = stage[masterplan](template_settings)
    } else {
        prologue = stage.prologue()(template_settings)
    }

    if (nstages === 1) {
        instructions.wincondition = ["If the fighters win:", "If the fighters lose:"]
        let ourheroes = ""
        heronames = heronames.sort();
        for (let i = 0; i < heronames.length; i++) {
            ourheroes = ourheroes + heronames[i] + (i == heronames.length - 2 ? " and " : i == heronames.length - 1 ? "" : ", ")
        }
        setup = setup.replace(/<b>Stage Setup:.*$/s, `<b>Arcade Mode:<b> ${ourheroes}`);
    }

    return { chapter: story[stageindex].chapter, prologue: removeLastBrBr(prologue), setup: setup, wincondition: instructions.wincondition, winepilogue: winepilogue, loseepilogue: loseepilogue }
}

export function textMaker(story, alliesandrivals, heronames, enemies, herodialogue, nstages, expansions) {

    let cardtext
    let cardtexts = []
    let pregameprologue = preGamePrologue(story[Math.max(nstages * 2 - 3, 0)].stage, story[Math.max(nstages * 2 - 3, 0)].enemy)

    for (let i = 0; i < story.length; i++) {
        cardtext = createPrologue(i, story, alliesandrivals, heronames, enemies, pregameprologue.storytext, pregameprologue.vip, herodialogue, nstages, expansions);
        cardtexts.push(cardtext)
    }

    return cardtexts

}

export function changeOfPlans(trail, finalboss, enemy, stage) {


    let _hence = hence_words()
    let _citadel = citadel_words()
    let _intel = intel_words_2()
    let _investigator = investigator_words()
    let clues = default_clues(enemy, _hence, _citadel, _intel, _investigator)
    
    let newintel = randFrom([
        `There is no time for regrets, and you need to leave the failure of stopping ${finalboss.boss} behind.`,
        `Citadel analysts have gone over every bit of intel you have gathered on ${finalboss.boss}, but have nothing to go on. But there are more pressing concers.`,
        `While you may have lost the fight, the battle is far from over.`,
        `Focusing on ${finalboss.boss} has let other, just as devious issues grow.`
    ])

    let conclusion = randFrom([
        `You slowly come to the conclusion that you have failed to locate ${finalboss.boss}. But suddenly, Agent Fletch contacts you and says: "${newintel}"`,
        `You decide you need to contact Agent Fletch for assistance, as you don't have a clue where to proceed. He answers: "${newintel}"`,
        `You conclude that ${finalboss.boss} has won this time. ${newintel}`,
        `You accept your defeat and retreat to Citadel HQ. ${newintel}`,
        `You realize you will not be able to catch ${finalboss.boss}. Meeting up with Agent Fletch, he says: "${newintel}"`
    ])

    conclusion = `${conclusion} ${clues}`

    return conclusion
}

export function finalResult(stage, enemy, rival, vip = null, result, stageindex, firstpart) {

    let masterplan = stage.masterplan
    let neutralize

    switch (masterplan) {
        case "kidnapping":
            neutralize = `${randFrom([`${vip[0]} is safely returned`, `${vip[0]} is rescued`, `${vip[0]} has been liberated from ${possessiveSuffix(enemy.name)} clutches`, `${vip[0]} has been aquired from the ${enemy.name}`])}`;
            break;
        case "personalpower":
            neutralize = `${randFrom([`power levels of the ${enemy.bosstitle()} remain in check`, `ambitions of ${enemy.boss} have been curtailed`, `ascent of ${enemy.boss} is halted`, `power surge of ${enemy.bosstitle()} is neutralized`])}`;
            break;
        case "strengtheningforces":
            neutralize = `${randFrom([`army of the ${enemy.name} has been neutralized`, `military buildup of ${enemy.name} is dismantled`, `the reinforcements of ${enemy.name} are dispersed`, `combat readiness of ${enemy.name} is weakened`])}`;
            break;
        case "actsofterror":
            neutralize = `${randFrom([`plan to destablize Ransom City has been countered`, `scheme to disrupt Ransom City's peace is thwarted`, `plot against Ransom City's stability is foiled`, `designs on terrorizing Ransom City has been upended`])}`;
            break;
        case "illegalgains":
            neutralize = `${randFrom([`plan to fund ${enemy.name} operations has been countered`, `financial channels of ${enemy.name} have been cut off`, `illicit funding streams ${possessiveSuffix(enemy.name)} are dried up`, `economic backbone of ${possessiveSuffix(enemy.boss)} operations is broken`])}`;
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
        `Just as victory seemed within grasp, ${enemy.boss} smirks. ${ucInit(getPropertyValue(enemy, stage, "detonation", `${gPron(enemy, "subject")} produces a remote and presses a button. The room shudders with the force of an explosion`))}, momentarily obscuring everything. "Coward's exit," you cough out, once the debris settles. Though ${enemy.boss} has vanished, the ${neutralize}, ensuring their immediate plan crumbles to dust along with ${possessiveSuffix(enemy.name)} escape route.`,
        `The confrontation reaches its peak and ${enemy.boss} is cornered and desperate. ${getPropertyValue(enemy, stage, "detonation", `${ucInit(gPron(enemy, "subject"))} reveals a detonator and triggers the explosives`)},  ${gPron(enemy, "object")} vanishing amidst chaos. Rubble and confusion fill the space where ${gPron(enemy, "subject")} once stood. "Gone, but not victorious," you declare to your team, as the dust clears revealing that, despite the dramatic escape, the ${neutralize}, dismantling the threat piece by piece.`
    ]

    let collapse = fighterCollapse(stageindex, firstpart)
    let finishorder = randFrom(["Finish them", "Show no mercy", "End them", "Put an end to this", "Kill them, and send what remains to Agent Fletch", "Wipe them out, all of them", "Put a stop to this"])
    let gloat = gloatingList(enemy, stage)
    let submission = lastWords(enemy)
    let defiance = defiantEnd(enemy)
    let lastwords = randFrom([submission, defiance])
    let lastthoughts = lastThoughts(enemy)
    const _subject = gPron(enemy, "subject") //he
    const _object = gPron(enemy, "object") //him
    const _possessive = gPron(enemy, "possessive") //his

    let loseresult = [
        `"${gloat[0]}" ${enemy.boss} says as ${_subject} stalks around your beaten body. "${gloat[1]}"`,
        `"${gloat[0]}" ${enemy.boss} says, arms crossed confidently in front of ${_object}. "${gloat[1]}" ${ucInit(_subject)} turns to face ${rival.name + " and " + randFrom(enemy.minionnames)}, ${_possessive} final command echoing powerfully off the walls with a sudden finality. "${finishorder}!"`,
        `"Gladiator?" Agent Fletch's voice sounds in your ear, small and tinny from your damaged communicator." What's the status?" You watch from your place on the floor, unable to respond as ${enemy.boss} returns to ${_possessive} plan.`,
        `"${lastwords[0]}" ${heroSpeech()}. "${lastwords[1]}" ${enemy.boss} laughs wickedly. "${gloat[0]}" ${_subject} gloats. "${gloat[1]}"`,
        `${lastthoughts} ${enemy.boss} laughs wickedly. "${gloat[0]}" ${_subject} gloats. "${gloat[1]}"`,
        `${enemy.boss} pushes you down, forcing you into submission. You try to fight ${_object} off but can't, and instead watch in horror as ${_subject} ${enemy.threat}. Your scream is lost on the winds as ${_subject} extinguishes your life!`,
        `Last of the Gladiators have fallen to ${enemy.boss} and ${_possessive} ${enemy.minions()}. "${gloat[0]}" ${_subject} says. "${gloat[1]}" ${ucInit(_subject)} ${enemy.threat}.`,
        `"${gloat[0]}" says ${enemy.boss} as ${_subject} ${enemy.threat}. ${randFrom([`You can only watch, horrified.<br><br>"${gloat[1]}"`, `"${gloat[1]}"<br><br>${lastthoughts}`])}`,
        `"${gloat[0]}" ${enemy.boss} says, and ${enemy.threat}. Those are the last words you ever hear.`,
        `"Maybe The Master would have a better use for the Gladiators?" ${randFrom(enemy.minionnames)} asks. "No," ${enemy.boss} answers${randFrom([` as ${_subject} ${enemy.threat}`, `, and orders: "${finishorder}"`])}.`,
        `You gave all you've got, but it was not enough. Not even close. "${finishorder}!" ${enemy.boss} orders ${randFrom(enemy.minionnames)}.`,
        `${enemy.boss} stands over your limp body. "${gloat[0]}" ${_subject} says, as ${_possessive} ${enemy.minions()} draw nearer. "${gloat[1]} ${finishorder}!" The minions follow the order.`,
        `As you're lying on the ground, bleeding out,${randFrom([``, ` ${heroSpeech()}: "${lastwords[0]}" but the ${enemy.bosstitle()} cuts you off.`, ` ${lowerCaseInitial(lastthoughts)}`])} "${gloat[0]}" ${enemy.boss} says. "${gloat[1]}"`,
        `"${gloat[0]}" the ${enemy.bosstitle()} says. You don't answer anything. ${lastthoughts} ${enemy.boss} goes on: "${gloat[1]}" ${ucInit(_subject)} ${enemy.threat}.`,
        `"${gloat[0]}" ${enemy.boss} shouts. ${ucInit(_subject)} ${enemy.threat}. "${gloat[1]}"`,
        `"${gloat[0]}" ${enemy.boss} says, hellfire twinkling visibly in ${_possessive} eyes. "${gloat[1]}"`,
        `You are lying on the ground, defeated. "${finishorder}!" ${enemy.boss} orders${randFrom([` ${_possessive} goons.`, `. ${lastthoughts}`])}`,
        `You try to stagger away from your defeat. "${gloat[0]}" ${enemy.boss} growls, while ${_subject} comes at you, unrelenting. "${gloat[1]}"`,
        `Agent Fletch and Citadel soldiers have arrived just a few moments too late. "${submission[0]}" ${heroSpeech()}, and fall forever silent. Fletch lets out a scream of despairing anguish, knowing you were senselessly lost because of miscommunications and bad timing.`,
        `Agent Fletch finds you broken and battered where ${enemy.boss} left you. "${submission[0]}" ${heroSpeech()}. "${submission[1]}"<br><br>You close your eyes slowly and your head goes limp.`,
        `"${finishorder}!" ${enemy.boss} orders. The ${enemy.minions()} remorselessly beat you until you feel nothing.`,
        `${enemy.boss} looks at you, lying at ${_possessive} feet. "${gloat[0]}" ${_subject} says, looking disappointedly at you. "${gloat[1]}${randFrom([` ${finishorder}." ${randFrom(enemy.minionnames)} steps closer.`, `" ${ucInit(_subject)} ${enemy.threat}.`])}`,
        `"${lastwords[0]}" ${heroSpeech()}. "${lastwords[1]}"<br><br>"${gloat[0]}" ${enemy.boss} answers. "${gloat[1]}"`,
        `Citadel aircraft speeds you to medical care, but you know it is too late. "${submission[0]}" ${heroSpeech()} to Agent Fletch, at your side.<br><br>"${submission[1]}"`,
        `"Gladiator?" Agent Fletch's voice penetrates your fading mind. "${submission[0]}" ${heroSpeech()}, before the darkness overcomes you.`,
        `You are lying on your back, the pain preventing you from moving. ${randFrom([`${lastthoughts}. and this is the last thought you will ever have.`, `"${submission[0]}" ${heroSpeech()} to no-one in particular as you draw your last breath. "${submission[1]}"`])}`,
        `Citadel soldiers are clearing the area from the aftermath of your fight, long after victorious ${enemy.boss} has left. "${submission[0]}" ${heroSpeech()} to Agent Fletch. "Don't try to speak," he answers, but you know it will not make any difference. ${ucInit(heroSpeech())} your last words: "${submission[1]}"`,
        `"Finish them off, ${enemy.boss}! Do it now!" shouts ${randFrom(enemy.minionnames)}. "${gloat[0]}" ${enemy.boss} says, and ${enemy.threat}. "${gloat[1]}"`,
        `"${randFrom([`No more, ${enemy.boss}! Grant me mercy!" you shout.`, `${lastwords[0]}" ${heroSpeech()}, "${lastwords[1]}"`])} ${enemy.boss} ${enemy.threat}${randFrom([`. "I thought you were made of sterner stuff," ${_subject} responds.`, `, and orders ${_possessive} minions: "${finishorder}!"`])}`,
        `${enemy.boss} has you pinned. Without a word, ${_subject} ${enemy.threat}. With grim determination in ${_possessive} eyes ${_subject} ends your life.`,
        `"${defiance[0]}" you spit defiantly in the face of the victorious ${enemy.bosstitle()}. "${defiance[1]}"<br><br>"${gloat[0]}" ${_subject} answers. "${gloat[1]}"`,
        `"${lastwords[0]}" ${heroSpeech()}, but ${enemy.boss} cuts you off by grabbing your throat. "${gloat[0]}" ${_subject} says and starts to squeeze the life out of you. "${gloat[1]}"`,
        `Suddenly, there's a blinding flash and ${possessiveSuffix(enemy.boss)} gone! It's all gone. Shockingly, you're back at Citadel HQ, surrounded by agents all going about their business. Did all that even happen?`,
        `Your body spasms, fighting against the green gel. Unable to breathe, you claw wildly at the hard, translucent surface encasing you. Shadowy figures move about on the other side of the barrier, and suddenly the lid slides open, and you fall to the ground. The lights are blindingly bright to your aching eyes, and you draw air in your lungs like it's the first time in your life. "Welcome, my children!" you hear a woman calling. What is happening? Was that a dream?`,
        `The screens of your VR helmets go dark, and the Citadel scientists and support team help you take off your training gear. "Gladiators!" Agent Fletch calls from beyond the observation screen, his face dark with disappointment. "Only ${Math.ceil(Math.random() * 10000)} points! How do you think you can face the real ${enemy.name}?!"`,
        `${enemy.boss} cackles as you fall back, defeated. "${gloat[0]}" "You will fall. If not now, then one day," you retort. "${gloat[1]}"`,
        `"${gloat[0]}" ${enemy.boss} taunts you. "${gloat[1]}"`,
        `You're still alive. Barely. ${enemy.boss} doesn’t bother to finish it. "${finishorder}" is spoken like a closing line in a forgotten play.`
    ]

    let finalresult

    const bladelose = bladeFinalResult(enemy, stage, gloat, finishorder, _subject, _possessive, _object, collapse)
    const rituallose = ritualFinalResult(enemy, stage, gloat, _subject, _possessive, _object, collapse)
    const hostagelose = hostageFinalResult(enemy, stage, gloat, _subject, _possessive, collapse)
    const swarmlose = swarmFinalResult(enemy, stage, gloat, _subject, _possessive, collapse)
    const pitlose = pitFinalResult(enemy, stage, gloat, _subject, _possessive, _object, collapse)
    const detonationlose = detonationFinalResult(enemy, stage, gloat, _subject, _possessive, collapse)
    const explosionlose = explosionsFinalResult(enemy, stage, gloat, _subject, _possessive, collapse)
    const gunlose = gunFinalResult(enemy, stage, gloat, finishorder, _subject, _possessive, collapse)
    const gunklose = gunkFinalResult(enemy, stage, gloat, finishorder, _subject, _possessive, collapse)
    const gunmenlose = gunmenFinalResult(enemy, stage, gloat, _subject, _possessive, finishorder, collapse)
    const brutelose = bruteFinalResult(enemy, stage, gloat, _subject, _possessive, collapse)
    const lablose = labFinalResult(enemy, stage, gloat, _subject, _possessive, finishorder, collapse)
    loseresult = [loseresult, bladelose, rituallose, hostagelose, swarmlose, pitlose, detonationlose, explosionlose, gunlose, gunklose, gunmenlose, brutelose, lablose].filter(entry => entry !== undefined);
    loseresult = randFrom(loseresult)

    result == 1 ? finalresult = randFrom(winresult) : finalresult = randFrom(loseresult)
    //    result == 0 
    //&& getPropertyValue(enemy, stage, "brute") !== undefined 
    //? console.log(finalresult) : () => {}
    return finalresult

}

function fighterCollapse(stageindex, firstpart) {

    const firstenemy = firstpart.enemy

    let preludes = [
        `You catch your reflection in a broken panel — pale, bloodied, unfamiliar. You can’t remember the last time you slept.`,
        `Your legs ache with something deeper than pain. You haven’t rested since Agent Fletch called you into this mess.`,
        `You blink against the sweat in your eyes and wonder when you last took a full breath that didn’t taste like smoke.`,
        `It hits you all at once: you haven’t stopped moving since the moment ${firstenemy.boss} pulled that stunt back there.`,
        `This mission started three days ago. Or was it five? You’ve stopped keeping track of your initial encounter with ${firstenemy.name}.`,
        `Somewhere in your pocket is the message that started all this. You haven’t looked at it since you got it. You don’t need to.`,
        `You remember the briefing room, Agent Fletch’s voice, the urgency. It feels like another life now.`,
        `You think back to that first brawl with ${firstenemy.boss} leading up to this. You’ve been running ever since.`,
        `You’d kill for five minutes of silence. But silence means stopping. And stopping means dying.`,
        `You wonder, briefly, if any of your team are still alive. Then you keep moving.`,
        `You told yourself this would be the last fight. You’ve told yourself that a lot lately.`,
        `You flex your fingers and feel the bruises crackle. Nothing feels like yours anymore — not even your own body.`,
        `You glance at your hands and realize you haven’t felt them in hours.`,
        `You can’t remember if you ever took that last stim. You don’t remember what it was for anymore.`,
        `You’ve been patched up so many times your bandages have bandages.`,
        `Everything since ${firstenemy.boss} first showed ${gPron(firstenemy, "possessive")} face feels like fallout.`,
        `You’ve been holding on by instinct. That instinct finally lets go.`,
        `Every muscle aches like it’s been screaming for a way out. Maybe this is it.`,
        `You’ve been fighting for what feels like hours. At some point, something had to give.`,
        `Somewhere deep down, you already knew you weren’t walking out of this one.`,
        `You’ve outrun worse. Outfought worse. But not forever.`,
        `Every second bought came at a cost. And you've finally ran out of credit.`,
        `The blood loss? The exhaustion? The bruised ribs? Pick one. It doesn’t matter now.`,
        `You've pushed past the pain. Past the fear. But there’s nothing left to push with.`,
        `You’ve run, climbed, punched, bled, burned. It was bound to end eventually.`,
        `You’ve bought yourself so many chances already. You think this one finally comes up short.`,
        `You’ve been swinging for too long. This time, your arms just don’t come back up.`,
        `You always knew you wouldn’t get through every fight. You just thought you'd finish this one first.`,
        `You’ve dodged, blocked, resisted everything — until now. This is where the streak ends.`,
        `You’ve been running on fumes since the last encounter. Now even those are gone.`,
        `Your focus falters — just long enough for you to make a mistake.`,
    ]
    let collapses = [
        `You wipe blood from your face and realize it’s not the first time today. Or the second.`,
        `You take a step and feel your boot squish from your own blood. Just another detail to ignore.`,
        `You close your eyes for half a second too long. It feels like falling asleep standing up.`,
        `You feel your heart hammering like it’s trying to run without you.`,
        `You’ve been bleeding for a while, but now you can feel it catching up.`,
        `There’s a sharp pull in your side you hadn’t noticed until now.`,
        `You’re moving slower than you thought — just enough for it to be dangerous.`,
        `Something’s off in your step — maybe it’s the injury, maybe it’s the floor.`,
        `Your body hesitates when your mind doesn’t.`,
        `Your vision blurs, then refocuses, then blurs again.`,
        `Your footing slips — no impact, no warning, just gone.`,
        `You take the wrong step, the wrong breath, the wrong moment.`,
        `Your last hit took more out of you than you realized.`,
        `Pain flares in your leg as you try to shift your weight.`,
        `You feel the weakness crawling up from your core.`,
        `You slip on something — water? Blood? It doesn’t matter.`,
        `You don’t stumble because you were struck. You stumble because you can’t keep standing.`,
        `You misstep — too far, too fast, too tired.`,
        `You have given everything you've got, and now there's nothing left.`,
        `You hear a voice — maybe your own — whispering, “Enough.”`,
        `You’re not surprised. Not anymore. Just tired.`,
        `You feel your knees buckle and realize you don’t want to stop it.`,
        `You almost smile - this is farther than anyone thought you would get.`
    ]
    let bridge = randFrom(["And now", "Then,", "You barely register as"])
    let prelude = randFrom(preludes)
    collapses = _.sampleSize(collapses, 2)
    prelude = randFrom([prelude, collapses[0]])
    let res = randFrom([
        ``,
        `${prelude} `,
        `${prelude} `,
        `${prelude} `,
        `${prelude} ${bridge} ${lowerCaseInitial(collapses[1])} `,
        `${prelude} ${bridge} ${lowerCaseInitial(collapses[1])} `
    ])
    return (res)
}

function hostageFinalResult(enemy, stage, gloat, _subject, _possessive, collapse) {
    const hostages = getPropertyValue(enemy, stage, "hostages")
    if (!hostages) {
        return undefined
    } else {
        const gun = getPropertyValue(enemy, stage, "gun")
        let gunresults
        if (gun) {
            gunresults = [
                `"Let them go," you gasp, blood trickling down your lips. ${enemy.boss} simply smiles. "${gloat[0]}" ${_subject} answers smoothly, raising ${_possessive} ${gun} toward the ${hostages}. You surge forward—but it's too late. Your body hits the ground as the sound of "${gloat[1]}" fades into darkness.`,
                `"Any last words?" ${enemy.boss} asks mockingly, ${gun} trained calmly on your forehead. You glare in silence. The shot is deafening, and your body falls limp as the ${hostages} watch in horror.`,
            ]

        }
        const ritual = getPropertyValue(enemy, stage, "ritual")
        let ritualresults
        if (ritual) {
            const m1 = mysticalSynonym()
            ritualresults = [
                `Without a word, ${enemy.boss} raises one hand. The ${m1} force of ${ritual} crushes you and the ${hostages} instantly, bones shattering. Your body crumples, consciousness fading as their quiet laughter rings softly in the distance.`,
                `${getTransformationSequence(enemy, undefined, ritual)} You can only watch from where you lie, your lifeblood flowing from you, as ${enemy.boss} feasts on the ${hostages}.`,
            ]

        }

        const gunmen = getPropertyValue(enemy, stage, "gunmen")
        let gunmenresults = undefined
        if (gunmen) {
            gunmenresults = [
                `You freeze as the ${gunmen} take aim — there’s no way to shield ${hostages} and defend yourself. A heartbeat later, they fire. You die watching their faces.`,
                `You make eye contact with one of the ${hostages} — then the ${gunmen} fire. It's precise. You drop instantly. The hostages are still screaming when ${enemy.boss} walks away.`
            ]

        }

        let results = [
            `You stagger toward the ${hostages}, heart pounding. Before you reach them, ${enemy.boss} cuts you down effortlessly. As you fall, you wonder bitterly if it was all for nothing. "${gloat[0]}" echoes distantly, but you’re already beyond hearing.`,
            `Everything slows as ${enemy.boss} advances toward the ${hostages}, their fate sealed. You move to intercept, knowing it’s your last act. Silence falls as you collapse, the world fading to a shadowy quiet.`,
            `Your limbs refuse to move. ${enemy.boss} steps past your broken form toward the ${hostages}. "${gloat[0]}" ${_subject} says softly. Helpless, you can only close your eyes as ${_possessive} laughter fills your final moments "${gloat[1]}"`,
            `"You'll have to kill me first!" you shout defiantly as you lunge at ${enemy.boss}. A brutal blow ends your charge instantly. As you lie broken, ${enemy.boss} whispers mockingly, "${gloat[0]}" ${_subject} turns to the ${hostages}. "${gloat[1]}"`,
            `On your knees, vision blurred, you look desperately toward the ${hostages}. Your silent plea is cut short as ${enemy.boss} delivers the finishing blow. Darkness claims you without another sound.`,
            `Bloodied and barely conscious, you whisper to the ${hostages}, "Don't give up..." ${enemy.boss} ends your speech abruptly. You fall into darkness, never knowing if your words reached them.`,
            `Time stretches endlessly as ${enemy.boss} strikes at the ${hostages}. You rush into the blow, feeling it strike you instead. As you fall, your heartbeat slows, fading gently alongside their muffled screams.`
        ]

        let extraresults = [gunresults, ritualresults, gunmenresults]
        extraresults.forEach(r => r !== undefined ? results = results.concat(r) : () => { })
        return [randFrom(results)]
    }

}

function bladeFinalResult(enemy, stage, gloat, finishorder, _subject, _possessive, _object, collapse) {
    const blade = getPropertyValue(enemy, stage, "blade")
    if (!blade) {
        return undefined
    } else {

        const gun = getPropertyValue(enemy, stage, "gun")
        let gunresults
        if (gun) {
            gunresults = [
                `You parry the first strike, but ${enemy.boss} is faster. The ${blade} slides into your side. You try to stand, but the ${gun} fires next—close, brutal, final.`,
                `${enemy.boss} lunges with the ${blade}, slashing deep. As you stagger back, ${_subject} draws the ${gun} and fires into your chest. You never reach the ground.`,
                `"${gloat[0]}" ${_subject} hisses, carving a line across your ribs with the ${blade}. "${gloat[1]}" Then the ${gun} rises, and a flash ends everything.`,
                `The fight is close—too close. The ${blade} cuts deep before you can react. As you stumble, ${enemy.boss} doesn’t hesitate. One shot. No mercy. You watch the smoking ${gun} for a moment, then you crumple.`,
                `"${gloat[0]}" ${_subject} grunts as you brace for another strike — but it never comes. ${enemy.boss} uses the ${blade} to knock your guard away, then fires the ${gun} point-blank. "${gloat[1]}" is the last thing you hear.`
            ]
        }

        let results = [
            `"${gloat[0]}" ${enemy.boss} declares. The ${blade} slices through your side. "${gloat[1]}" You crumple to the ground.`,
            `One swift swing of the ${blade} cleaves through you. "${finishorder}!" ${enemy.boss} commands as darkness overtakes you.`,
            `You feel the ${blade} bite deep before you can react. "${gloat[0]}" ${enemy.boss} taunts. "${gloat[1]}"`,
            `The ${blade} arcs in a blur and strikes true. "${gloat[0]}" echoes from somewhere that feels far away as you collapse. "${gloat[1]} ${finishorder}!"`,
            `Pain flares as the ${blade} finds flesh. "${gloat[0]}" ${enemy.boss} continues. "${gloat[1]}"`,
            `Holding the ${blade}, ${enemy.boss} ends your fight with a single blow. "${gloat[0]}" you hear ${_object} starting as you lose consciousness.`,
            `The ${blade} whistles in the air before it lands. "${finishorder}!" ${enemy.boss} pronounces triumphantly.`,
            `A deadly sweep of the ${blade} sends you sprawling. "${gloat[0]}" ${enemy.boss} sighs in satisfaction. "${gloat[1]}"`,
            `The ${blade} gleams moments before it strikes. "${gloat[0]}" ${enemy.boss} murmurs as you fall. "${gloat[1]}" "${finishorder}!"`,
            `Your last sight is the ${blade} descending. "${gloat[0]}" whispers ${enemy.boss}, sealing your fate. You never hear the rest.`,
            `With a roar, ${enemy.boss} thrusts the ${blade} skyward—then rips it down through your torso, bisecting you. "${gloat[0]}" echoes as your halves fall apart. "${gloat[1]}"`,
            `${enemy.boss} spins the ${blade} in a blur before sweeping it low, truncating your legs. You crawl hopelessly as ${enemy.boss} laughs. "${finishorder}!" You don't get far.`,
            `The ${blade} flashes at lightning speed — severing your head in a single strike. Your body collapses limply.`,
            `"${gloat[0]}" and with a twisted flourish, ${enemy.boss} plunges the ${blade} into your chest, then yanks it free — your heart comes with it. "${gloat[1]}" You gasp as life drains away.`,
            `${enemy.boss} swings the ${blade} under your jaw; your face is peeled back in a grotesque mask. You sink to the ground as ${enemy.boss} sneers.`,
            `The ${blade} hums as it swipes through the air, then erupts in a shower of gore — ripping your spine clean out. ${enemy.boss} holds it aloft. "Fatality," ${_subject} whispers.`,
            `In one savage arc, ${enemy.boss} decapitates you and impales your head on the ${possessiveSuffix(blade)} tip. You spend your few last seconds watching in horror at ${_possessive} unremorseful eyes.`,
            `${enemy.boss} jabs the ${blade} into your gut, twists sharply, and pulls out your entrails like a twisted ribbon. You start to collapse as ${enemy.boss} watches, "${gloat[0]}" ${_subject} says, watching you fall. "${gloat[1]}"`,
            `The ${blade} glints ominously as ${enemy.boss} drives it straight through your back, out your chest. You crumple; your last sight is ${enemy.boss}'s triumphant grin. "${finishorder}!"`,
            `"${gloat[0]}" ${enemy.boss} finishes, and with chilling precision, slices your throat with ${_possessive} ${blade}, then lifts your head by the chin as you bleed out. "${gloat[1]}" ${enemy.boss} declares as darkness claims you.`
        ]

        let extraresults = [gunresults]
        extraresults.forEach(r => r !== undefined ? results = results.concat(r) : () => { })
        return [randFrom(results)]

    }
}

function gunkFinalResult(enemy, stage, gloat, finishorder, _subject, _possessive, collapse) {
    const gunk = getPropertyValue(enemy, stage, "gunk")
    if (!gunk) {
        return undefined
    } else {

        const gun = getPropertyValue(enemy, stage, "gun")
        let gunresults
        if (gun) {
            gunresults = [
                `${enemy.boss} fires without hesitation. The shot from the ${gun} knocks you into ${gunk}, which swallows your body in slow, slurping silence. You don’t resurface.`
            ]
        }

        let results = [
            `${collapse}You try to crawl, but your hand plunges into ${gunk}. It grips you like tar, bubbling with unnatural heat. You scream—but by the time it’s over, there’s nothing left above the surface.`,
            `${enemy.boss} grabs you by the collar and hurls you bodily into ${gunk}. It sizzles on contact, bubbling up around your limbs as you thrash once — twice — then disappear. "${gloat[0]}" echoes behind you, but you never hear anything else..`,
            `${collapse}Your foot catches, your balance breaks, and you plunge backward into ${gunk}. It’s thicker than it should be. Hungry. You’re gone before help can reach you.`,
            `${collapse}You're already bleeding when you land in ${gunk}. It seeps into your wounds. You scream—but it’s not your voice anymore.`,
            `${collapse}${enemy.boss} watches you slip to ${gunk}. ${ucInit(_subject)} doesn't bother finishing the job. You fall in on your own, and the surface closes over you without a ripple.`,
            `${collapse}You stagger back, hit the edge, and tumble into ${gunk}. There’s no sound. No light. Just the slow, thick quiet of something that was never meant to be touched.`,
            `${collapse}You're too weak to stand. "${gloat[0]}" ${enemy.boss} finishes without even looking at you. Instead, a nod is given — and ${enemy.minions()} grab you without ceremony. You're dragged to the edge of ${gunk}, and before you can beg, you're plunged beneath the surface. "${gloat[1]}" follows as the last air leaves your lungs.`,
            `\"${finishorder}!\" Limp in their grip, you’re hoisted by ${possessiveSuffix(enemy.boss)} enforcers. They don’t speak. They don’t need to. You hit the surface of ${gunk} hard, sink fast, and are gone before your body stops twitching.`,
            `They find your gear first, half-submerged in ${gunk}. Then a hand. Then the rest. Your body is drained, your eyes open but blind. No one speaks. The agents know better than to ask what killed you.`, `Hours later, the search team finds your remains fused with the edge of ${gunk}. There’s no pulse, no breath, no dignity left. Only a bitter silence as the field report is filed: "Gladiator confirmed KIA."`

            //  `The ${blade} doesn’t kill you. It sends you reeling into ${gunk}, where the real horror begins. You try to scream, but whatever it is pulls you under.`,
        ]

        let extraresults = [gunresults]
        extraresults.forEach(r => r !== undefined ? results = results.concat(r) : () => { })
        return [randFrom(results)]

    }
}

function gunFinalResult(enemy, stage, gloat, finishorder, _subject, _possessive, collapse) {
    const gun = getPropertyValue(enemy, stage, "gun")
    if (!gun) {
        return undefined
    } else {

        const blade = getPropertyValue(enemy, stage, "blade")
        let bladeresults
        if (blade) {
            bladeresults = [
                `A single shot from ${possessiveSuffix(enemy.boss)} ${gun} hits you square in the chest. As you fall, ${_subject} steps in close and drives the ${blade} in without a word. "${gloat[0]}" echoes as everything fades. "${gloat[1]}"`,
                `"${gloat[0]}" ${enemy.boss} says matter-of-factly, and fires ${_possessive} ${gun} — fast, clean. You hit the ground hard. The ${blade} is just for emphasis, slid across your throat as ${_subject} whispers, "${gloat[1]}"`,
                `The blast from the ${gun} knocks you to your knees. You look up just in time to see the ${blade} descending. You don’t get a second chance.`,
                `"${gloat[0]}" ${enemy.boss} says, firing the ${gun} casually. As you reel back, ${_subject} walks forward and finishes it with the ${blade}, smooth and unhurried.`,
                `"${gloat[0]}" ${_subject} says and just then you sense a shift in ${_possessive} stance. You dodge left — a bad choice. The ${gun} fires once, dropping you. You’re still breathing when the ${blade} ends it for good. "${gloat[1]}" comes softly, like an afterthought.`
            ]
        }

        const brute = getPropertyValue(enemy, stage, "brute")
        let bruteresults
        if (brute) {
            bruteresults = [
                `${enemy.boss} holds the ${gun} in one hand, looks at it, then tosses it away. ${_subject} won’t be needing need it for what comes next.`,
                `You expect the ${gun}. Instead, ${enemy.boss} grabs you with ${brute} and slams you into the wall hard enough to crack concrete.`,
                `${enemy.boss} raises the ${gun}, then lowers it slowly. "${gloat[0]}" ${_subject} says. "${gloat[1]}" follows as ${_subject} ${brute} start their work on you.`,
                `The ${gun} in ${possessiveSuffix(enemy.boss)} is just for show. ${ucInit(_subject)} steps forward and breaks you with a single blow before you can even breathe.`,
                `${enemy.boss} never touches the ${gun}. There’s no need. You're broken with a backhand before it even comes into play.`,
                `${enemy.boss} could’ve shot you. Instead, ${_subject} grabs you with ${brute}, crushing you against the floor like a bug.`,
                `${enemy.boss} raises the ${gun}, then smiles and sets it aside. "A waste of ammo," ${_subject} says. You don’t get a chance to answer.`,
                `Citadel agents survey the scene. The ${gun} lies clean on the floor beside your broken body. It never fired. ${enemy.boss} didn’t need it.`,
                `When Citadel agents breach the scene, they find the ${gun} resting beside what’s left of your body — clean, untouched. Your limbs are twisted, ribs shattered inward like folded metal. There are no bullet wounds. ${enemy.boss} didn’t need it.`,
                `The ${gun} lies where it fell — no powder burn, no casing ejected. But your body tells the story to Citadel forensic team: spine crushed, jaw dislocated, internal bleeding everywhere. ${enemy.boss} never had to pull the trigger.`
            ]
        }

        let results = [
            `${collapse}The shot cracks through the tension like thunder. ${enemy.boss} lowers the ${gun} as your body hits the ground. No words. No theatrics. Just one clean kill.`,
            `${collapse}${enemy.boss} fires once — just once. The force from the ${gun} throws you back, breath stolen before it can even become a scream. You never hear ${_possessive} final quip as the world fades.`,
            `"${gloat[0]}" ${enemy.boss} says with a faint smile. "${gloat[1]}" Then comes the flash. The ${gun} barks and you're gone, erased in a blink.`,
            `${collapse}Your last breath is a gasp as the muzzle of the ${gun} presses to your chest. ${enemy.boss} doesn't hesitate. "${gloat[0]}" is the last thing you hear from anyone.`,
            `${collapse}There is a loud crack of a gunshot. Your knees give. The ground feels cold. ${enemy.boss} lets the ${gun} down and doesn't even look at you as you collapse.`,
            `${collapse}You flinch as ${enemy.boss} raises the ${gun}. But the shot isn’t meant to intimidate. It finishes you instantly. Clean. Efficient. Absolute.`,
            `${collapse}You try to stand. ${enemy.boss} barely glances at you with the ${gun} in hand. The shot comes casually, almost bored. You fall, forgotten before you hit the floor.`,
            `${collapse}Wounded and crawling, you look up to see ${enemy.boss} walking away. The ${gun} lowers. "${finishorder}", ${_subject} mutters to ${randFrom(enemy.minionnames)}. The final strike doesn't come from ${possessiveSuffix(enemy.boss)} hand.`,
            `${collapse}The muzzle of the ${gun} flashes. ${enemy.boss} watches you bleed, then turns away. "${finishorder}", echoes coldly across the room as footsteps approach.`
        ]

        let extraresults = [bladeresults, bruteresults]
        extraresults.forEach(r => r !== undefined ? results = results.concat(r) : () => { })
        return [randFrom(results)]

    }
}

function bruteFinalResult(enemy, stage, gloat, _subject, _possessive, collapse) {
    const brute = getPropertyValue(enemy, stage, "brute")
    if (!brute) {
        return undefined
    } else {

        const pit = getPropertyValue(enemy, stage, "pit")
        let pitresults
        if (pit) {
            pitresults = [
                `You try to scramble away, but ${enemy.boss} grabs you with ${_possessive} ${brute} and spins. The impact hurls you straight into the ${pit}. You vanish with a scream that cuts off too soon.`
            ]
        }

        const blade = getPropertyValue(enemy, stage, "blade")
        let bladeresults
        if (blade) {
            bladeresults = [
                `${enemy.boss} doesn’t stab. ${_subject} drives the ${blade} through you with both hands like a spike, pinning you to the floor. You writhe once. Then stop.`,

            ]
        }

        const gun = getPropertyValue(enemy, stage, "gun")
        let gunresults
        if (gun) {
            gunresults = [
                `${enemy.boss} tosses the ${gun} away—unneeded. ${_subject} approaches your broken body slowly and grabs you by the head, lifting it clean off with ${_possessive} ${brute}. The scream never makes it out.`
            ]
        }


        const ritual = getPropertyValue(enemy, stage, "ritual")
        let ritualresults
        if (ritual) {
            ritualresults = [
                `As the power of ${ritual} fills ${enemy.boss}, ${_subject} grows still larger, more monstrous. The ground shakes as ${_subject} closes in and grabs you with glowing ${brute}. Your body never survives the first impact.`
            ]
        }

        let results = [
            `${enemy.boss} grabs you mid-motion with ${_possessive} ${brute} and hurls you into the ground like a broken toy. You hear something crack — maybe in your chest, maybe in the ground. Everything fades to black.`,
            `You lash out desperately, but ${enemy.boss} closes in and wraps ${_possessive} ${brute} around you. The squeeze is immediate. Bones snap. Air vanishes. You go limp long before ${_subject} lets go.`,
            `${enemy.boss} extends ${_possessive} ${brute}, seizes you by the throat and slams you down with force that splits stone. You don’t rise. You don’t move. The crater says everything.`,
            `The last thing you see is a massive fist drawing back. It hits like a meteor. Your ribs cave inward, and you're airborne for just a second before the wall — or the floor — catches you. You don’t remember which.`,
            `You duck the first swing, but the second catches your side. Then another—then another. ${enemy.boss} doesn’t stop until you're a heap of blood and silence.`,
            `${enemy.boss} grabs you mid-strike and smashes you against the nearest surface. Then again. And again. The third hit is just for sound.`,
            `${enemy.boss} grabs both your arms. You realize too late what’s about to happen. The force is inhuman. The pain is worse. Then it’s over.`,
            `You’re crawling, broken, and trying to reach cover. ${enemy.boss} just steps forward — and down. Your body doesn't move anymore.`,
            `${enemy.boss} says nothing. No threats. No gloat. Just an arm raised high, and then the hammering blow that drives your body into the ground like a stake.`,
            `"${gloat[0]}" ${enemy.boss} says, lifting you overhead. Then you’re thrown down with bone-snapping force. "${gloat[1]}" comes as you twitch once, then stop.`,
            `The ${brute} wrap around your limbs before you can react. ${enemy.boss} pulls hard — something gives. You scream, then you don’t.`,
            `${enemy.boss} charges with impossible speed and rams into you like a freight train. You're thrown into the air — twisting, limp. You never stand again.`
        ]

        let extraresults = [bladeresults, pitresults, gunresults, ritualresults]
        extraresults.forEach(r => r !== undefined ? results = results.concat(r) : () => { })
        return [randFrom(results)]

    }
}


function ritualFinalResult(enemy, stage, gloat, _subject, _possessive, _object, collapse) {
    let ritual = getPropertyValue(enemy, stage, "ritual", undefined)
    if (!ritual) {
        return undefined
    } else {
        const blade = getPropertyValue(enemy, stage, "blade", undefined)
        let m1 = mysticalSynonym()
        const _transformation = getTransformationSequence(enemy, blade, ritual)
        ritual = ritual.replace(enemy.boss, `the inhuman divinity within`)
        const ritualCurse = randFrom([
            `By the divine will of ${ritual}, may your soul be forever shackled in darkness!`,
            `In the name of ${ritual}, your essence is cast into the void for all eternity!`,
            `May the wrath of ${ritual} fracture your spirit beyond repair!`,
            `By sacred oath to ${ritual}, your memory shall vanish from the world!`,
            `Let ${ritual} claim your being and bind you in eternal night!`,
            `By the ancient power of ${ritual}, your final breath is stolen!`,
            `In ${possessiveSuffix(ritual)} name, your hope is snuffed out like a dying star!`,
            `By the cursed pact with ${ritual}, your fate is sealed beyond redemption!`
        ]);
        let result = randFrom([
            `As ${enemy.boss} channels the ${m1} force of ${ritual}, you feel your life starting to ebb away. "${gloat[0]}" ${_subject} crows. "${gloat[1]}" You can do nothing but die.`,
            `${_transformation} Then ${enemy.boss} finishes you without mercy. "${ritualCurse}"`,
            `A wave of ${possessiveSuffix(ritual)} force surges through ${enemy.boss}, and you begin to collapse. "${gloat[0]}" ${_possessive} words haunt you and you cannot hold your footing. "${gloat[1]}" echoes as you fade.`,
            `${_transformation} In that twisted form, ${enemy.boss} strikes the killing blow.`,
            `With a final invocation of the ${m1} power of ${ritual}, ${enemy.boss} snuffs out your spark. "${ritualCurse}"`,
            `The ${m1} gift of ${ritual} bleeds from ${enemy.boss}, draining your will. "${gloat[0]}" rings hollow in the void you collapse into. "${gloat[1]}"`,
            `${_transformation} Empowered by this horror, ${enemy.boss} ends you for good.`,
            `Channeling the raw force of ${ritual}, ${enemy.boss} crushes your resistance. "${ritualCurse}"`,
            `The sinister glow of ${m1} force of ${ritual} envelops ${enemy.boss}. Your body goes limp. "${gloat[0]}" ${_subject} says. "${gloat[1]}" Your world drifts into silence.`,
            `With a guttural chant, ${enemy.boss} beckons ${ritual}. A torrent of ${m1} flame erupts, burning flesh from bone as you scream in agony.`,
            `${ucInit(m1)} runes blaze on your skin as ${enemy.boss} intones the power of ${ritual}. Your veins boil and burst, sending hot ichor across the floor.`,
            `A skeletal hand made of ${m1} shadows claws through your chest as ${enemy.boss} wields the power of ${ritual}. You collapse, organs splayed in a crimson puddle.`,
            `${enemy.boss} raises ${_possessive} arms in a dark gesture, and the ${m1} power of ${ritual} fractures reality. Limb by limb, your body dismembers itself in a single, gruesome moment.`,
            `Waves of ${m1} energy pulse from ${enemy.boss}. Your eyes liquify into black tar as ${ritual} consumes your sight and mind.`,
            `The force of ${ritual} wielded by ${enemy.boss} summons wailing ${m1} spirits that tear at your flesh. You fall, voice lost among their screams, blood pooling beneath you.`,
            `With a whispered invocation of the power of ${ritual}, ${enemy.boss} turns your blood to acid. Your muscles liquefy, dripping through your bones as ${_subject} laughs.`,
            `A halo of ${m1} shadows surrounds ${enemy.boss}. ${ucInit(possessiveSuffix(ritual))} power animates them into blades that slice through you, piece by piece.`,
            `${ucInit(m1)} lightning crackles from ${possessiveSuffix(enemy.boss)} fingertips as ${_subject} channels ${ritual}. Your body convulses, bones shattering under the force.`,
            `As ${enemy.boss} utters the final ${m1} words in the name of ${ritual}, a rift opens beneath you. You plummet into a chasm of living spikes, your screams echoing forever.`,
            `${_transformation} Then ${enemy.boss} utters, "${ritualCurse}" sealing your fate.`
        ])
        return [result]
    }
}

function swarmFinalResult(enemy, stage, gloat, _subject, _possessive, collapse) {

    const swarm = getPropertyValue(enemy, stage, "swarm", undefined)
    if (swarm === undefined) {
        return undefined
    } else {

        const sd = randFrom(["seething ", "churning ", "infinite ", "unstoppable ", "unending ", "writhing ", "", ""])
        let st = randFrom(["swarm of", "tide of", "mass of ", "horde of", "wave of", "storm of", "onslaught of"])
        st = `${sd}${st}`

        const ritual = getPropertyValue(enemy, stage, "ritual")
        const blade = getPropertyValue(enemy, stage, "blade")
        let ritualresults = undefined
        if (ritual) {
            const m1 = mysticalSynonym()
            ritualresults = [
                `The ${st} ${swarm} shudders violently as ${enemy.boss} unleashes the power of ${ritual}. Their movements shift — no longer wild, but coordinated. You barely raise your guard before they descend in ${m1}, unnatural rhythm. You're torn from your feet, and the rest is lost beneath the storm.`,
                `${getTransformationSequence(enemy, blade, ritual)} The ${st} ${swarm} responds instantly, howling as one and surging forward with unnatural speed. You strike down the first wave, but it doesn’t slow them. It never slows. Soon you’re on the ground, buried beneath the tide, your final sight a sky choked with movement and smoke.`
            ]

        }

        const hostages = getPropertyValue(enemy, stage, "hostages")
        let hostageresults = undefined
        if (hostages) {
            hostageresults = [
                `You reach for ${hostages}, but the ${st} ${swarm} is faster. They're dragged away screaming as you’re slammed to the ground under the crushing tide. ${enemy.boss} watches calmly, ${_possessive} voice low: "${gloat[0]}" ${_subject} observes as more ${swarm} bury you under. "${gloat[1]}"`,
                `${collapse}You slam your fist into the floor, rising for one last stand. The ${st} ${swarm} doesn’t slow. You’re swept off your feet, carried down by sheer numbers. The last thing you hear is ${hostages} screaming your name.`,
            ]

        }

        if (ritual && hostages) {
            ritualresults = ritualresults.concat([
                `As the ritual of ${ritual} concludes, the ${st} ${swarm} surges with new purpose. ${enemy.boss} smiles faintly as ${hostages} are overtaken in moments. You follow seconds later, your screams lost in the roar.`
            ])

        }

        const gun = getPropertyValue(enemy, stage, "gun")
        let gunresults = undefined
        if (gun) {
            gunresults = [
                `The ${st} ${swarm} flood the space like gunsmoke. You hold your ground, but then you hear the distinct click of ${possessiveSuffix(enemy.boss)} ${gun}. A flash. A sound. You're knocked backward — into the arms of the swarm, who eagerly finish what the weapon started.`,
                `${collapse}A single shot from ${possessiveSuffix(enemy.boss)} ${gun} brings you to your knees. You’re still alive — barely — when the ${st} ${swarm} piles onto your body like a burial. "${gloat[0]}" echoes distantly as you're smothered in motion and heat. "${gloat[1]}"`
            ]

        }

        let bladeresults = undefined
        if (blade) {
            bladeresults = [
                `${collapse}Through the ${st} the ${swarm}, you catch sight of ${enemy.boss} striding calmly forward, ${blade} dripping. ${ucInit(_subject)} doesn’t run. ${ucInit(_subject)} doesn’t need to. One gesture — and the ${swarm} descend on you as the blade rises for the final cut.`,
                `${collapse}The ${blade} rises in ${possessiveSuffix(enemy.boss)} hand, gleaming with finality. ${ucInit(_subject)} doesn't need to swing. The ${st} ${swarm} takes that as their signal. You disappear beneath them before the weapon even falls.`,
            ]

        }

        const pit = getPropertyValue(enemy, stage, "pit")
        let pitresults = undefined
        if (pit) {
            pitresults = [
                `${collapse}The ${st} ${swarm} presses in, and there's no room left to stand. You’re driven to the brink and beyond, vanishing into ${pit} as their voices fade.`
            ]

        }

        let results = [
            `You strike, turn, strike again — but the ${st} ${swarm} never stops coming. They're endless. ${collapse}Eventually, your body gives out, and they collapse over you like a wave. There is no air left. No light. Only the end.`,
            `${collapse}You fall to one knee, then both. The ${st} ${swarm} surround you from every direction. You raise your fists one last time—then vanish beneath them without a sound.`,
            `${collapse}You can’t breathe. You can’t move. The ${st} ${swarm} are everywhere, pressing against you, pressing through you. Your screams are muffled, your fate sealed in the crush of bodies.`,
            `${collapse}Someone once told you no one dies alone. As the ${st} ${swarm} closes in from all sides, you realize that’s not always true.`,
            `${enemy.boss} doesn’t raise a hand — ${_subject} doesn’t have to. The ${st} ${swarm} pours in, endless and unfeeling. "${gloat[0]}" echoes distantly as you're buried alive in a frenzy of violence. "${gloat[1]}"`,
            `${collapse}There is no final strike. No last stand. Only the slow drowning in a ${st} ${swarm}, every breath harder than the last, until there are none left to take.`,
            `You drop one. Then two. Then a dozen. It doesn't matter. The ${st} ${swarm} pushes forward relentlessly, replacing each one with two more. When you fall, they do not stop.`,
            `${collapse}You manage to push yourself upright one more time, bloodied and broken. The ${st} ${swarm} flows around you like a tide. Your body disappears beneath them. No one reaches you in time.`,
            `${collapse}You whisper something—maybe a name, maybe nothing at all — as the weight of the ${st} ${swarm} pulls you to the floor. There is no space left to move. You die with your eyes open.`,
            `${collapse}The moment your legs give out, it's over. The ${st} ${swarm} doesn't hesitate. You're dragged down, consumed not by rage or cruelty — but by numbers. An ending that never needed ${possessiveSuffix(enemy.boss)} hand.`,
            `${collapse}You can’t move. Can’t think. The ${st} ${swarm} is everywhere. Crushing you. Smothering you. ${enemy.boss} doesn’t even approach — "${gloat[0]}" ${_subject} just whispers as the world goes black. "${gloat[1]}"`,
            `${collapse}There’s no scream. No final blow. Just pressure, and heat, and the ever-tightening crush of the swarm of ${swarm}. You stop fighting, and the silence takes you.`
        ]

        let extraresults = [hostageresults, ritualresults, gunresults, bladeresults, pitresults]
        extraresults.forEach(r => r !== undefined ? results = results.concat(r) : () => { })

        return [randFrom(results)]


    }

}

function pitFinalResult(enemy, stage, gloat, _subject, _possessive, _object, collapse) {

    const pit = getPropertyValue(enemy, stage, "pit", undefined)
    if (pit === undefined) {
        return undefined
    } else {

        const ritual = getPropertyValue(enemy, stage, "ritual")
        const blade = getPropertyValue(enemy, stage, "blade")
        let ritualresults = undefined
        if (ritual) {
            const m1 = mysticalSynonym()
            ritualresults = [
                `As ${enemy.boss} bursts with the ${m1} power of ${ritual}, you are thrown backward. You scramble for footing, but there’s nothing left to grip. ${ucInit(pit)} takes you to your doom.`,
                `${getTransformationSequence(enemy, blade, ritual)} "${gloat[0]}" ${possessiveSuffix(enemy.boss)} voice has a crushing force behind it. You stumble back first toward ${pit}, and find yourself broken and dying at the bottom. "${gloat[1]}"`
            ]

        }

        const hostages = getPropertyValue(enemy, stage, "hostages")
        let hostageresults = undefined
        if (hostages) {
            hostageresults = [
                `${collapse}You make one last desperate charge toward ${hostages}, but you have no more strength left and your feet collapse under you. You reach for the edge — your fingers slip. ${ucInit(pit)} consumes you in a single breath.`,
                `${collapse}You lunge toward ${hostages}, knowing you won’t reach them. Your step falters, your weight shifts — and suddenly, you're falling. ${ucInit(pit)} swallows everything.`,
                `${collapse}You throw yourself forward to protect ${hostages}, but gravity wins the fight. ${ucInit(pit)} opens like a mouth beneath you.`,
                `${collapse}You crawl toward ${hostages}, one hand at a time. Then the ground shifts — a crack, a drop, a scream — and you're gone. ${ucInit(pit)} doesn’t give second chances.`,
                `${collapse}You barely rise again, just enough to shout their names. Then your heel finds nothing but air. You fall backwards. ${ucInit(pit)} takes everything you were.`,
                `${collapse}You try to drag yourself between ${hostages} and danger — but you tip forward, too far. Your fingers scrape at the ledge before ${ucInit(pit)} takes you down forever.`
            ]

        }

        const gun = getPropertyValue(enemy, stage, "gun")
        let gunresults = undefined
        if (gun) {
            gunresults = [
                `A single shot from ${possessiveSuffix(enemy.boss)} ${gun} misses — but the shock stuns you. You stumble, arms wide, and fall backward. The outline of ${pit} grows smaller above you, until it disappears.`,
                `A shot cracks past your ear from ${possessiveSuffix(enemy.boss)} ${gun}. You spin on instinct — and take a step too far. ${ucInit(pit)} welcomes you without warmth.`,
                `You duck the shot — barely. But your foot lands wrong, and gravity takes over. One last glance up shows ${enemy.boss} lowering ${_possessive} ${gun}. Then ${pit} takes you.`,
                `You lurch aside as ${enemy.boss} fires again. You survive the bullet. You don’t survive the fall. ${ucInit(pit)} doesn’t care which finished you.`,
                `The shot isn’t meant to hit. It’s meant to herd. You realize too late that your next step leads off the edge. ${ucInit(pit)} takes the rest.`,
                `You flinch at the crack of ${possessiveSuffix(enemy.boss)} ${gun}, and lose your footing entirely. The drop is sudden, silent. ${ucInit(pit)} swallows the sound.`,
                `The round grazes your side — not lethal. But your reaction sends you stumbling backward into nothing. ${ucInit(pit)} opens beneath you like a story’s last page.`,
                `A spark erupts at your feet as ${enemy.boss} fires. You twist to avoid it — but your foot skids off the edge. There’s no time to scream. ${ucInit(pit)} was always there.`,
                `The last thing you see is ${enemy.boss} raising ${_possessive} ${gun}. The next is the sky, spinning away, as you fall backward into ${pit}.`
            ]

        }

        if (hostages && gun) {
            let gunhostages = [
                `${collapse}You take one shaky step toward ${hostages}, but ${enemy.boss} calmly raises their ${gun}. "${gloat[0]}" ${_subject} says and pulls the trigger. The shot rings out—sharp, final. It doesn't need to hit you dead - on. The force alone hurls you backward. Your heel finds only air. Then nothing. You tumble into ${pit}, arms flailing, the echo of "${gloat[1]}" chasing you into the depths.`
            ]
            gunresults = gunresults.concat(gunhostages)
        }

        const gunmen = getPropertyValue(enemy, stage, "gunmen")
        let gunmenresults = undefined
        if (gunmen) {
            gunmenresults = [
                `The ${gunmen} open fire. You throw yourself sideways, but lose your balance. ${ucInit(pit)} doesn’t wait for a second chance, and they don't need to shoot again.`,
                `${collapse}A bullet grazes your arm. The pain jolts you off-balance — your next step lands on nothing. ${ucInit(pit)} takes care of the rest.`,
                `You’re out of cover, trying to regroup, when the ${gunmen} advance. One step back becomes your last — straight into ${pit}. A resounding <b>crack</b> tells them the essentials.`,
                `Shots slam into the wall behind you. You turn to run, but you’ve already stepped over the edge. ${ucInit(pit)} meets you halfway, and the fall finishes the job.`,
                `You duck the first volley from the ${gunmen}, but stumble on a downed henchman. There’s no time to recover. Riddled with bullets, you fall backward straight into ${pit}.`,
                `${collapse}The ${gunmen} close in from all sides. You pivot left, then back — and find only ${pit} waiting. The drop is instant. The silence after, permanent.`,
                `You try to zig left to avoid the firing ${gunmen}, but your foot lands badly. One slip, and the rest is falling. ${ucInit(pit)} was closer than you realized, but at least you didn't have to ponder your mistake for long.`,
                `Bullets tear through cover behind you as the ${gunmen} have you from multiple angles. You backpedal fast, too fast — until there's nothing left to stand on. ${ucInit(pit)} is open wide and welcomes you to your demise.`,
                `You're driven back by a constant spray of gunfire from the ${gunmen}. The moment your foot finds nothing but air, you know it's over. ${ucInit(pit)} doesn't forgive panic.`
            ]

        }

        let bladeresults = undefined
        if (blade) {
            bladeresults = [
                `${collapse}${enemy.boss} circles you slowly, the ${blade} glinting with intent. You dodge too wide, too fast — there’s nothing behind you. Only space. ${ucInit(pit)} waits without judgment.`,
                `${collapse}You charge one last time, but ${enemy.boss} sidesteps effortlessly. The ${blade} drives through your gut, stopping you cold. For a moment, the world is silent — just the two of you, locked in place. Then ${_subject} leans close. "${gloat[0]}" ${_subject} murmurs, yanking the it free. One swift kick to your chest, and you stagger backward, falling helplessly into ${pit}. "${gloat[1]}" is the last thing you hear before everything goes dark.`,
                `${enemy.boss} slashes wide with ${_possessive} ${blade}. You stagger once, twice, and then there’s no more floor. ${ucInit(pit)} takes you whole.`, 
                `The ${blade} cuts across your shoulder. The pain blinds you for a second — and ${enemy.boss} kicks you hard. You fall, spinning, and ${pit} swallows you.`,
                `A feint, then a sudden lunge — ${possessiveSuffix(enemy.boss)} ${blade} doesn't score a lethal hit, but herds you back a step too far. ${ucInit(pit)} finishes what ${_subject} didn't.`
            ]

        }

        const brute = getPropertyValue(enemy, stage, "brute")
        let bruteresults = undefined
        if (brute) {
            bruteresults = [
                `${possessiveSuffix(enemy.boss)} ${ucInit(brute)} grab you and lift you. In a single fluid motion, you’re hurled like debris into ${pit}, your scream cut off by the void.`,
                `${brute} slam into your chest like a piledriver, then catch your leg mid-fall. ${enemy.boss} growls through gritted teeth, then hurls you straight into ${pit} like throwing away trash.`,
                `With ${brute}, ${enemy.boss} grabs your throat and lifts you off the ground. “Down,” ${_subject} growls — and drops you into ${pit}.`,
                `You try to duck beneath ${enemy.boss}'s swing, but ${brute} wrap around your waist. You are launched like a spear straight to ${pit}.`,
                `You land one punch — useless. ${possessiveSuffix(enemy.boss)} ${brute} tighten, then launch you in a spinning arc. ${ucInit(pit)} receives you like a mouth closing.`,
                `You raise your guard, but ${possessiveSuffix(enemy.boss)} ${brute} knock it aside like paper. You’re backpedaling, and then you're falling. ${ucInit(pit)} ends it, not ${_object}.`
            ]

        }

        const explosions = getPropertyValue(enemy, stage, "explosions")
        let explosionsresults = undefined
        if (explosions) {
            explosionsresults = [
                `The force of the ${explosions} hits you like a wall. You're thrown sideways — and off balance. One foot finds air. The next finds nothing. ${ucInit(pit)} is already waiting.`,
                `A blast from the ${explosions} rocks the entire area. You stumble, spin, and take one step too far. You don’t fall alone — the fallout follows you into ${pit}.`,
                `Shrapnel from the ${explosions} slices past your shoulder. You reel, disoriented — and step straight into open space. ${ucInit(pit)} takes you before the next blast can.`,
                `You’re running through smoke when the ${explosions} tear through the area behind you. The ground collapses. You don’t fall — you vanish to ${pit}.`,
                `The ground trembles. The heat hits like a hammer. You stagger toward safety, but a final jolt from the ${explosions} sends you flying — and falling. ${ucInit(pit)} ends the story.`,
                `The edge was already crumbling. When the ${explosions} go off, it just finishes the job. You try to scramble back — too late. ${ucInit(pit)} pulls you in like gravity's final command.`,
                `Your next step would’ve been solid — until the ${explosions} tore through. The ground collapses. You tumble with it. ${ucInit(pit)} doesn’t wait for an apology.`,
                `A shockwave from the ${explosions} hits your back like a truck. You’re airborne for a blink, and then you’re not. ${ucInit(pit)} takes everything that’s left.`
            ]

        }


        let results = [
            `${collapse}Your foot slides, balance gone in an instant. There’s no time to react. One heartbeat later, you're gone—swallowed by ${pit}, waiting for its victim.`,
            `${collapse}"${gloat[0]}" ${enemy.boss} laughs, steps forward and plants a final shove to your chest. You stumble back, arms flailing — then nothing but air and the receding mouth of ${pit}. The last words of ${enemy.boss} follows you down. "${gloat[1]}"`,
            `${collapse}With ${_possessive} right hand, ${enemy.boss} grabs your face and pushes your aching body, sapped of all strength, slowly backward toward ${pit}. "${gloat[0]}" ${_subject} says. "${gloat[1]}"`,
            `${collapse}You don't scream. You don’t fight. You just step backward, into the void. ${ucInit(pit)} accepts you without sound, without ceremony. Maybe it was always meant to end here.`,
            `${collapse}"Do it," you whisper. ${enemy.boss} nods. One motion, and you're over the edge. ${ucInit(pit)} swallows you — endless and final.`,
            `${collapse}Your scream vanishes long before your body. The fall goes on, and on, until even the idea of impact feels like a lie. ${ucInit(pit)} gives nothing back.`
        ];

        let extraresults = [hostageresults, ritualresults, gunresults, bladeresults, gunmenresults, bruteresults, explosionsresults]
        extraresults.forEach(r => r !== undefined ? results = results.concat(r) : () => { })

        return [randFrom(results)]


    }

}

function detonationFinalResult(enemy, stage, gloat, _subject, _possessive, collapse) {

    let detonation = getPropertyValue(enemy, stage, "detonation", undefined)
    if (detonation === undefined) {
        return undefined
    } else {

        detonation = lowerCaseInitial(detonation).replace("the Boss", enemy.boss)

        const pit = getPropertyValue(enemy, stage, "pit")
        let pitresults = undefined
        if (pit) {
            pitresults = [
                `${ucInit(detonation)}. The ground collapses beneath you in the chaos. You tumble — into flame, into smoke, into ${pit}. No one sees where you land.`
            ]

        }

        const ritual = getPropertyValue(enemy, stage, "ritual")
        let ritualresults = undefined
        if (ritual) {
            ritualresults = [
                `The ${mysticalSynonym()} powers of ${ritual} fill ${enemy.boss}, and you shield your eyes. Before you can even process what is happening, ${detonation}, erupting chaos around you. It's not just power — it's finality. You don't survive it.`,
            ]

        }

        const hostages = getPropertyValue(enemy, stage, "hostages")
        let hostageresults = undefined
        if (hostages) {
            hostageresults = [
                `You reach for the ${hostages}, but ${detonation}. You are all thrown like matchsticks. You land in a heap, unmoving. Their cries are lost beneath the cacophony, and soon you hear nothing at all.`
            ]

        }


        const swarm = getPropertyValue(enemy, stage, "swarm")
        let swarmresults = undefined
        if (swarm) {
            swarmresults = [
                `The horde of ${swarm} hesitates, just for a second — then ${detonation}. The force rips through the field. Whether you die from the blast or the flood of bodies after, no one can say.`
            ]

        }


        let results = [
            `${ucInit(detonation)}. There’s no time to react — no cover, no clever escape. You're thrown through the air like a rag doll, the world swallowed in heat and noise. Your story ends mid-breath.`,
            `"${gloat[0]}" ${enemy.boss} smiles — and then, ${detonation}. You feel your body lifted, twisted, broken. Light and sound become one blinding thing. When it fades, you're gone.`,
            `${collapse}You realize too late what's about to happen. ${ucInit(detonation)}. The shockwave hits like a fist, and everything turns sideways. You crash to the ground, breathless, burning, broken. You don’t get back up.`,
            `${ucInit(detonation)}. The blast wipes out every sound, every thought, every breath. When the smoke clears, there’s only silence where you once stood.`,
            `You lunge toward ${enemy.boss}, a last-ditch effort. ${ucInit(detonation)}, cutting your momentum short. You're gone before you hit the floor, scattered in the light.`,
            `${collapse}Everything slows — your heart, your thoughts, your stance. Then: ${detonation}. The world cracks open, and you’re just... not there anymore.`
        ];

        let extraresults = [pitresults, ritualresults, hostageresults, swarmresults]
        extraresults.forEach(r => r !== undefined ? results = results.concat(r) : () => { })

        return [randFrom(results)]


    }

}

function explosionsFinalResult(enemy, stage, gloat, _subject, _possessive, collapse) {

    let explosions = getPropertyValue(enemy, stage, "explosions", undefined)
    if (explosions === undefined) {
        return undefined
    } else {

        const pit = getPropertyValue(enemy, stage, "pit")
        let pitresults = undefined
        if (pit) {
            pitresults = [
                `${collapse}You're avoiding the attacks of ${enemy.boss} with the last of your strength, and ${explosions} throw you straight over the threshold of ${pit}, your mangled body falling to your death.`
            ]

        }

        const ritual = getPropertyValue(enemy, stage, "ritual")
        let ritualresults = undefined
        if (ritual) {
            let blade = getPropertyValue(enemy, stage, "blade")
            ritualresults = [
                `${ucInit(explosions)} burst from everywhere. You're caught between all of it. ${getTransformationSequence(enemy, blade, ritual)} Even if the ${explosions} would not have put you down, there would have been nothing you could have done. Your remains are ripped apart by the ${ritual}-powered ${enemy.boss}.`,
            ]

        }

        const hostages = getPropertyValue(enemy, stage, "hostages")
        let hostageresults = undefined
        if (hostages) {
            hostageresults = [
                `You're attempting to help the ${hostages} when ${explosions} erupt across the area. You throw yourself forward, trying to shield them — but you're caught mid‑motion. Your body never reaches them.`
            ]

        }

        const swarm = getPropertyValue(enemy, stage, "swarm")
        let swarmresults = undefined
        if (swarm) {
            swarmresults = [
                `The mass of ${swarm} are everywhere, but it's the ${explosions} that finish you. The blasts scatter the ${swarm} — and you with it. You never get up again.`
            ]

        }


        let results = [
            `${ucInit(explosions)} erupt all around you. You dodge the first wave, but there’s no pattern, no escape. The next one catches you full force, hurling you into the air. You don’t land.`,
            `"${gloat[0]}" ${enemy.boss} says, stepping back into the shadows. ${ucInit(explosions)} detonate across the space seconds later. The last thing you see is chaos, rolling toward you like a wave. "${gloat[1]}" echoes as you're swallowed.`,
            `There’s no warning. Just ${explosions} — and then you're gone. Reduced to motion, to flame, to a silhouette lost in light.`,
            `A blast tears through the floor beneath your feet. ${ucInit(explosions)} rip upward, and the ground vanishes. You fall into smoke, into fire, into whatever waits below. You will never get back up.`,
            `You almost reach cover — but the room erupts. ${ucInit(explosions)} ripple through the area. The force picks you up and throws you like a broken toy. You never stand again.`,
            `You can't tell what caused it — only that it's out of control. ${ucInit(explosions)} chain through the space, and before you can breathe, you're lifted and lost in the carnage.`,
            `${ucInit(explosions)} detonate one after another — so loud, you forget what silence sounds like. Then it comes. You're lying still. You never heard the last one.`
        ];

        let extraresults = [pitresults, ritualresults, hostageresults, swarmresults]
        extraresults.forEach(r => r !== undefined ? results = results.concat(r) : () => { })

        return [randFrom(results)]


    }

}

function gunmenFinalResult(enemy, stage, gloat, _subject, _possessive, finishorder, collapse) {

    let gunmen = getPropertyValue(enemy, stage, "gunmen", undefined)
    if (gunmen === undefined) {
        return undefined
    } else {

        const gun = getPropertyValue(enemy, stage, "gun")
        let gunresults = undefined
        if (gun) {
            gunresults = [
                `${collapse}The ${gunmen} hit you first—two rounds. You're barely hanging on when ${enemy.boss} steps forward, raising ${_possessive} ${gun}. "${gloat[0]}" comes as the barrel meets your forehead. One last flash, and you're gone.`,
                `${collapse}You duck left — bad call. The ${gunmen} track you instantly, and ${enemy.boss} raises ${_possessive} ${gun} at the same time. The final shot could come from either. It doesn't matter. You’re dead before you find out.`,
            ]

        }
        const pit = getPropertyValue(enemy, stage, "pit")
        let pitresults = undefined
        if (pit) {
            pitresults = [
                `${collapse}The gunfire shatters your footing. You stagger, clutching a wound, and fall backward over the edge of ${pit} behind you. You don’t hear the final volley from the ${gunmen} — only the wind as you disappear.`,
                `You lunge forward, but the ${gunmen} pin you in place with bullets. Your cover splinters away, and you dash blindly straight into ${pit}, falling with a scream that is ends abruptly.`,
                `${collapse}You’re forced back, step by step, under fire from the ${gunmen}. There’s nowhere left to go. One final bullet hits you square, and you tumble into ${pit} without a sound.`,
            ]

        }

        const ritual = getPropertyValue(enemy, stage, "ritual")
        let ritualresults = undefined
        if (ritual) {
            let blade = getPropertyValue(enemy, stage, "blade")
            ritualresults = [
                `As ${possessiveSuffix(ritual)} power fills ${_possessive} body, ${enemy.boss} doesn’t even look at you. "${finishorder}," is spoken like an afterthought. The zealous ${gunmen} fire with fanatical discipline. You collapse mid-step, and the sigils continue to glow.`,
                `${getTransformationSequence(enemy, blade, ritual)} The ${gunmen} fire in perfect sync in devotional frenzy. You're struck through the heart. ${enemy.boss} devours what is left.`

            ]

        }

        const swarm = getPropertyValue(enemy, stage, "swarm")
        let swarmresults = undefined
        if (swarm) {
            swarmresults = [
                `"${gloat[0]}" ${enemy.boss} calls, standing behind the advancing ${swarm}. The ${gunmen} open fire, driving you back into the mass. You vanish under the mass of ${swarm} and bullets alike. "${gloat[1]}" follows from somewhere behind the chaos.`,
                `${collapse}The unending ${swarm} herd you into a dead end. The ${gunmen} are waiting. You turn — but it's too late. Gunfire rips through your chest, and the heaving horde of ${swarm} parts as you fall.`,
            ]

        }

        const hostages = getPropertyValue(enemy, stage, "hostages")
        let hostageresults = undefined
        if (hostages) {
            hostageresults = [
                `"${gloat[0]}" ${enemy.boss} says and only then you see the danger. You throw yourself toward ${hostages}, but the ${gunmen} are faster. Shots ring out — one, then many. You collapse between them and the line of fire. "${gloat[1]}" comes as your body goes still.`,
                `"${gloat[0]}" ${enemy.boss} says with quiet satisfaction. ${ucInit(hostages)} scream as the ${gunmen} raise their weapons. "${gloat[1]}" You shout something defiant — then vanish in the thunder of the first volley.`,
                `${collapse}You’re wounded, bleeding, and trying to drag yourself toward ${hostages}. ${enemy.boss} doesn’t even look at you. "${finishorder}." is all they say. The ${gunmen} do the rest.`,
                `You try to act as a shield, standing between ${hostages} and the ${gunmen}. But they don't care. The bullets pass through you and keep going. The laughter of ${enemy.boss} drifts through the haze of gunfire and screams.`,
                `The ${gunmen} open fire, riddling you with rounds. ${hostages} can do nothing but watch. "${gloat[0]}" comes from ${enemy.boss} just before the final shot. "${gloat[1]}" follows as your body hits the floor.`
            ]

        }


        let results = [
            `"${gloat[0]}" ${enemy.boss} states as the ${gunmen} begin firing. You try to answer, but the first shot hits your side. The rest finish the job. "${gloat[1]}" echoes over your body.`,
            `${collapse}You’re wounded but still alive, clutching your side. ${enemy.boss} doesn't bother to finish it. "${finishorder}!" is all ${_subject} says, and the ${gunmen} comply without a pause.`,
            `You sprint for cover, but the ${gunmen} already have the angle. You're hit three times before your knees buckle. You fall face-first, never hearing another word.`,
            `"${gloat[0]}" ${enemy.boss} mutters. The ${gunmen} fire cleanly. No mess, no hesitation. You’re down in a heartbeat. You don't get to hear what else ${_subject} was going to say.`,
            `"${gloat[0]}", ${enemy.boss} says, and the ${gunmen} open fire before you’re ready. You collapse, gasping, struggling. "${gloat[1]}" comes as ${enemy.boss} passes your dying body.`,
            `${collapse}Bleeding and downed, you try to crawl away. ${enemy.boss} looks on with mild contempt. "${finishorder}" ${_subject} says, and the ${gunmen} move in. You don’t make it far.`,
            `${collapse}You flinch at the first shot, but it misses. Then the ${gunmen} correct and fire again and again — accurately, ruthlessly. You're dropped before a second thought. ${enemy.boss} doesn’t intervene.`,
            `"You'll regret this," you growl. The ${gunmen} ignore you, already firing. You’re hit mid-sentence. ${enemy.boss} comes too late for any banter.`,
            `${collapse}The ${gunmen} act with cold discipline. You fall without fanfare, a single shot through the chest. ${enemy.boss} doesn't even register your fall.`,
            `"${gloat[0]}" ${enemy.boss} calls as you struggle to stay on your feet, bleeding from a gunshot. "${gloat[1]}" Then the air erupts in gunfire from the ${gunmen}, and you're torn down in a heartbeat. The only sound afterward is your body hitting the ground.`,
            `"${gloat[0]}" ${enemy.boss} mutters as you collapse from the first volley. "${gloat[1]} ${finishorder}" follows, and the ${gunmen} close in without hesitation. You never get back up.`,

        ];

        let extraresults = [gunresults, pitresults, ritualresults, swarmresults, hostageresults]
        extraresults.forEach(r => r !== undefined ? results = results.concat(r) : () => { })

        return [randFrom(results)]


    }

}

function labFinalResult(enemy, stage, gloat, _subject, _possessive, finishorder, collapse) {

    let lab = getPropertyValue(enemy, stage, "lab", undefined)
    let o_enemy = enemy
    if (!lab) {
        let madscientists = [enemy]
        if (enemy.name == "Kingdom") {
            madscientists = madscientists.concat(getEnemies().filter(e => e.boss == "Jackal"))
        }
        madscientists = madscientists.concat(getEnemies().filter(e => e.boss.includes("Jackal") | e.boss.includes("The Proxy")))
        enemy = randFrom(madscientists)
        lab = getPropertyValue(enemy, stage, "lab", undefined)
        enemy.boss != o_enemy.boss ? gloat = gloatingList(enemy, stage, undefined, undefined) : () => { }
        _subject = gPron(enemy, "subject")
        _possessive = gPron(enemy, "possessive")
    }
    if (!lab) {
        return undefined
    } else {

        let results = [
            `"${gloat[0]}" ${o_enemy.boss} says as your body is strapped into a large metal apparatus in ${o_enemy.boss == enemy.boss ? _possessive : `${possessiveSuffix(enemy.boss)}`} laboratory. "${gloat[1]}"`,
            `You're strapped to the slab in ${possessiveSuffix(enemy.boss)} hideout. No words. Just a hiss and a sharp jab. The fluid burns as it hits your veins. You convulse once, then go still. ${enemy.boss} marks the clipboard.`,
            `You come to your senses in a cavernous lab. "${finishorder}," ${enemy.boss} mutters, already turning to another screen. One of the ${o_enemy.minions()} of the ${o_enemy.name} steps forward with a syringe. You flinch, then nothing.`,
            `${enemy.boss != o_enemy.boss ? `You find yourself in ${possessiveSuffix(enemy.boss)} hideout, strapped to a table. ` : ``}You claw at your chest, circuits flaring under the skin. Whatever they injected is rewriting you — faster than you can resist. You try to scream, but your jaw locks. You stop moving a moment later.`,
            `${enemy.boss != o_enemy.boss ? `You groggily observe your surroundings in ${possessiveSuffix(enemy.boss)} lab. ` : ``}You’re fully awake when the paralytic hits. You can’t move. Can’t scream. You can barely hear while you see ${enemy.boss} mouthing. ${ucInit(_subject)} walks to the table. ${ucInit(_subject)} leans closer. "${gloat[1]}"`,
            `${enemy.name} technicians inject you with something viscous and green while ${o_enemy.boss} watches. One of them mutters about dosage. You don't get to hear the rest.`,
            `Your vitals flatline, and no one reacts. ${enemy.boss} logs the result: "Prototype rejected." Your body is pushed aside on a tray while another subject is wheeled in by ${randFrom(o_enemy.minionnames)}.`,
            `You slump forward in the lab. Wires pierce skin, feed data, overwrite muscle. Your eyes stay open — but they aren’t yours anymore. A screen pings confirmation. ${enemy.boss} nods to ${o_enemy.boss !== enemy.boss ? o_enemy.boss : `${_possessive} ${enemy.minions()}`}.`,
            `You wake up. ${enemy.boss != o_enemy.boss ? `${o_enemy.boss} is nowhere to be seen.` : ``} "${gloat[0]}" ${enemy.boss} says but anything after is suddenly a jumble. Your limbs lock as the neuromapping finishes. Your pulse stabilizes, but it's not yours anymore. You stare straight ahead, awaiting instruction.`,
            `The helmet in ${possessiveSuffix(enemy.boss)} lab clamps down, and cold gel floods over your scalp. ${enemy.boss != o_enemy.boss ? `You just get a glimpse of ${o_enemy.boss} in the corner of your eye. ` : ``}You hear a rising tone, then silence. "${gloat[0]}" is the last thing you recognize before your name, your mission — everything — is gone.`,
            `The ${o_enemy.minions()} hold you down as ${enemy.boss} injects you with something vile. You try to resist, but it's too late. Your bloodstream's already full of whatever ${_subject} put in you. You collapse on the floor, hands trembling, vision double. You see ${enemy.boss} talking, but "${gloat[1]}" is the only thing that makes sense.`,
            `Citadel agents breach the lab days later. It smells of rot and solvent. They find one pod still humming, still occupied. It's you—or something that used to be.`,
            `The retrieval team during an unrelated mission finds traces of combat and scattered clone tanks, with your name on one. No confirmed body. Your fate is marked: \"Unresolved. Subject presumed cloned and / or terminated.\"`,
            `One of the Citadel techs pulls the content from a ${getGizmo()} recovered during an operation in ${whichPreposition(randFrom(getEnemies()).name)} hideout and plays it. It’s a loop of your final moments, overwritten dozens of times. They turn it off before it finishes.`,
            `Months later, the Citadel recovery team has tracked you down. The lab was there. Equipment still warm. But there's no sign of you. Just an empty gurney, a fresh bloodstain, and a terminal reading \"Memory flush complete.\"`
        ]

        let cloneresults

        let gunmen = getPropertyValue(o_enemy, enemy, "gunmen", undefined)
        let gunmenresults
        if (gunmen) {
            gunmenresults = [
                `You watch as your clone takes its first breath. ${enemy.boss} doesn't even look at you. "${gloat[0]}" is spoken over your head. The ${gunmen} behind you fire, and you don't feel a thing ever again.`
            ]
        }

        if (["clones", "any"].includes(lab)) {
            cloneresults = [
                `You lie still under the scanning beam as a fresh clone of you stands nearby, already dressed, already breathing. "${gloat[0]}" ${enemy.boss} says. "${gloat[1]}" Your neural pattern is wiped, and only a corpse remains.`,
                `They don’t even need to interrogate you. Your replacement is already walking the halls, copied from your own DNA. "${gloat[0]}" is spoken as the lights go dim and your vitals drop. "${gloat[1]}"`,
                `You look across the lab and see it—half-formed, twitching, bubbling in fluid. Your face, twisted. "${gloat[0]}" ${enemy.boss} says. "${gloat[1]}" comes as you’re injected with whatever broke the last one.`,
                `“Clone series: unstable.” That’s the last thing you hear. Your body is dropped into ${possessiveSuffix(enemy.boss)} tank for breakdown, while ${enemy.name} technicians prep a new specimen from the same batch.`,
                `You awaken, restrained. Not in your body — just… like it. "${gloat[0]}" ${enemy.boss} says through glass. "${gloat[1]}" Your clone stands across the room, already responding to your name.`,
                `You’re sedated, wheeled under the scanner. ${enemy.boss} adjusts the parameters for neural overwrite. "${finishorder}," is muttered without interest. You are already gone when the replication completes.`,
                `Two of you are standing. The other one doesn’t look tired. You don't remember how you ended up fighting this antithesis of yourself. "${gloat[0]}" ${enemy.boss} muses. "${gloat[1]} ${finishorder}."`,
                `The ${enemy.name} technician shakes their head: “Conscious imprint unstable.” You’re still breathing, but not for long. A new file is loaded, and your mind starts slipping away. You feel the clone inside you waking up.`,
                `The cloning chamber hums. "${gloat[0]}" ${enemy.boss} says. You're not the result, just the rough draft. One of the ${o_enemy.minions()} kicks your table loose, rolling you toward a disposal chute. "${gloat[1]}" comes from the observation deck.`,
                `You remember the fight. You remember losing. What you don’t remember is being born yesterday. "${gloat[0]}" from ${enemy.boss} confirms it. You're the expendable version. And now you're no longer needed. "${gloat[1]}"`,
                `The others in the room look just like you. They all breathe. One of them is still alive tomorrow. It's not you. A decision is made without a word. "${finishorder}." says ${enemy.boss}, clinically.`,
                `The tests are conclusive: you're unstable. The chamber locks. Gases hiss. "${gloat[0]}" you hear ${enemy.boss} speaking over the comm. "${gloat[1]}" comes after the ignition.`,
                `"Interesting degradation curve," the ${enemy.name} tech murmurs. You're not screaming anymore. ${enemy.boss} notes the data as your clone's vitals replace yours in the system. You're erased by efficiency.`,
                `You're wheeled down a corridor marked with your own serial number. No one speaks. ${enemy.boss} doesn't need to. The clone is already active. You are not.`
            ];

        }


        let extraresults = [cloneresults, gunmenresults]
        extraresults.forEach(r => r !== undefined ? results = results.concat(r) : () => { })

        return [randFrom(results)]


    }

}

export function heroSpeech() {
    let effort = [` `, ` manage to `,]
    let speak = [`cough out`, `wheeze`, `utter`, `gasp`, `say`, `hiss`, `groan`]
    //    let descriptive = [`with your last bit of strength`, `with a smile`, `through bloodied lips`]

    return "you" + randFrom(effort) + randFrom(speak)
}

export function defiantEnd(enemy) {
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

export function lastWords(enemy) {
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

export function lastThoughts(enemy) {
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

export function gloatingList(enemy, stage, herodialogue = [], heronames = undefined) {

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
        [`You have no idea how much I've wanted to do this..`, `You have no idea.`],
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
        [`Poor ${defineAddressing(enemy)}! I would offer you a place in the ${enemy.name}." "I still believe in Global Gladiators, not the ${randFrom([enemy.name, "Kingdom"])}!" you retort through gritted teeth. "But of course, you fail to see the bigger picture,`, `That will be your downfall.`],
        [`When you are out of my way, there's nothing holding the ${enemy.name} back,`, `From prosperity in my hands!`]
    ]

    let gloat = [randFrom(gloating)];
    let clone_present = false;
    if (heronames !== undefined) {
        clone_present = heronames.filter(str => str.includes(enemy.boss)).length > 0
    }

    if (clone_present) {
        //        console.log("clouuun")
        let clone_dialogue = [
            [`We stand face to face, yet worlds apart. Your actions have cast a long shadow, one I intend to erase," you state, your voice steady, revealing a resolve as unwavering as steel. "Erase? You're a part of me,`, `Denying my deeds is denying yourself`],
            [`I've seen the chaos you've sown, felt the pain you've inflicted. It ends now, even if I must end with it," you declare, a note of finality in your voice that echoes in the emptiness between you "End with it? Don't be naive,`, `You can no more end me than you can end your own heartbeat.`],
            [`You're a shadow, a dark reflection of what I could have become. I'm here to ensure that never happens," you assert, your gaze locked on your mirror image of your darkest fears. "A dark reflection? Foolish. I am the truth of our soul laid bare,`, `You cannot fight the inevitable.`],
            [`Your reign of terror, it's a path I refuse to walk. I'll dismantle everything you've built, piece by piece," you vow, each word imbued with the weight of your shared history. "Dismantle? You aim to destroy your own legacy,`, `Without me, what are you?`],
            [`I could have been you, but I chose a different path. A path of light, away from your darkness," you proclaim, standing firm in the face of your dark counterpart's malevolence. "Chose? There is no choice. There's only power, and how one chooses to wield it,`, `You'll learn.`],
            [`This ends here, with me. I won't let your deeds define our legacy. I fight for redemption, for a chance to right your wrongs," you promise, your voice echoing a deep-seated yearning for change. "Redemption? There's no redemption for us,`, `Only the abyss that awaits when you finally realize we are one and the same.`],
            [`I stand before you, not as your enemy nor your ally. My mission... I thought I knew, but now, the lines blur," you admit, your voice tinged with uncertainty as you regard your counterpart. "Blur? The only thing that's blurred is your conviction,`, `How pitiful, to be so lost. You don't deserve to carry my name nor my face. You will lose them both!`],
            [`They say we're two sides of the same coin, but I find myself wondering if the coin ever existed at all," you muse, your gaze distant, as if searching for answers in the void between you. "Existential doubts now? How delightful,`, `While you ponder, I act. That's what separates us!`],
            [`Your actions, they mirror the darkness I've fought within myself. Yet here we stand, divided by more than just ideals," you reflect, your words heavy with the burden of your internal struggle."Fought and lost, it seems,`, `There's clarity in embracing your nature. You should try it sometime.`],
            [`What if the hero I sought to be was never meant to fight you, but to understand you?" you ponder aloud, your voice a mix of resolve and confusion, a paradox personified. "Understand me? You can't even understand yourself,`, `Don't flatter yourself thinking you can unravel me!`],
            [`I walked this path believing I could be the barrier between your chaos and the world's peace. Now, I'm not so sure," you confess, a shadow of doubt clouding your once-clear purpose. "Doubt is a luxury I cannot afford, and neither can you,`, `Make up your mind, or I'll make it up for you.`],
            [`Maybe in trying to stop you, I've become you. What separates us now but the choices we've made?" you question, your identity crisis casting a long shadow over your confrontation.  "You becoming me? Don't flatter yourself,`, `You lack the conviction, the strength. You're but a shadow of a shadow.`],
            [`How could you stray so far from what we were meant to be? Your existence is a betrayal of our very essence," you accuse, your voice trembling with rage. "Betrayal? I am the culmination of our potential,`, `Your fury is but a sign of your inability to comprehend our destiny`],
            [`You wear our face, but your deeds? From a world I don't recognize. I'll correct the course you've corrupted with my own hands if need be!" you declare, fists clenched in righteous indignation. "Correct the course? You're nothing more than a pale shadow,`, `An echo of my greatness. Your indignation is pathetic!`],
            [`Your reign ends with me. I am the fury, the justice you've forsaken. This aberration stops now!" you vow, your voice a beacon of resolve amidst the darkness your counterpart has wrought. "Justice? You're a mere byproduct of my ambition,`, `Your fury will extinguish in the face of my indomitable will.`],
            [`The audacity to stand against me, to claim you could ever rectify my deeds. You're an insult to our name," your dark reflection's words aim to cut, but the your stance is unwavering. "An insult? I am the redemption you're too cowardly to pursue. Your deeds end with me," you reply, your voice a mix of defiance and determination, a clear light in the darkness the villain casts. "Redemption?`, `You're a mere glitch in my grand design. I'll erase you as easily as a mistake on paper.`],
            [`You dare mimic my power, challenge my reign? You're a flawed copy, a mistake I'll rectify," your counterpart says in contempt. Flawed? No, I am the correction to your mistake. I am what we should have been," you assert, standing firm, a beacon against the villain's shadow. "Correction? You're but a footnote in my saga,`, `Prepare to be expunged from the narrative I've written!`],
            [`You're a blemish on our legacy, a footnote I'll erase from our story," your clone says with hatred burning in the eyes. "A blemish? I am the clean slate, the new chapter. You're the past, and I am the future," you state, your conviction clear in your steady gaze. "Future? There is no future for you, only the oblivion I grant you,`, `Your chapter ends before it begins!`]
        ]

        gloat.push(randFrom(clone_dialogue))
        gloat.push(randFrom(clone_dialogue))

    } else {
        if (herodialogue.length > 0) {
            herodialogue = randFrom(Array.from(herodialogue))
            herodialogue[0] = _.template(herodialogue[0])({ boss: enemy.boss })
            herodialogue[1] = _.template(herodialogue[1])({ boss: enemy.boss })
        }

        herodialogue.length > 0 ? gloat.push(herodialogue) : () => { }
        stage.hasOwnProperty("gloat") ? (g = randFrom(stage.gloat)) => gloat.push([_.template(g[0])({ enemy: enemy }), _.template(g[1])({ enemy: enemy })]) : () => { }
        enemy.hasOwnProperty("gloat") ? (g = randFrom(enemy.gloat)) => gloat.push([_.template(g[0])({ enemy: enemy }), _.template(g[1])({ enemy: enemy })]) : () => { }
    }
    //    enemy.hasOwnProperty("gloat") ? console.log(_.template(randFrom(enemy.gloat))({enemy: enemy})) : () => { console.log(enemy.name) }

    stage.hasOwnProperty("gloat") ? (g = randFrom(stage.gloat)) => gloat.push([_.template(g[0])({ enemy: enemy }), _.template(g[1])({ enemy: enemy })]) : () => { }
    enemy.hasOwnProperty("gloat") ? (g = randFrom(enemy.gloat)) => gloat.push([_.template(g[0])({ enemy: enemy }), _.template(g[1])({ enemy: enemy })]) : () => { }
    //            enemy.hasOwnProperty("gloat") ? console.log(enemy.gloat) : () => { }
    gloat = randFrom(gloat)

    return gloat

}

export function laconicStatement(enemy) {
    let laconicstatements = [
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
        `With determination, you stand your ground, ready to face ${gPron(enemy, "object")} and the trials that lie ahead.`,
        `The moment of truth is upon you, a test of wills where only one can prevail.`,
        `With the stakes now clear, your resolve hardens.`,
        `There's no hesitation — only hostility.`,
        `The fight begins!`,
        `This wasn't how ${possessiveSuffix(enemy.boss)} plan was supposed to end — but it's how it's going to be.`
    ]

    return randFrom([randFrom(laconicstatements), ``])
}

export function referenceText(gladiators, allygroup, allymotivation, rivalgroup, rivalmotivation, finalboss, nstages) {

    let ourheroes = nstages > 1 ? "This story is best experienced with " : "Use "
    for (let i = 0; i < gladiators.length; i++) {
        ourheroes = ourheroes + "<b>" + gladiators[i].name + "</b>" + (i == gladiators.length - 2 ? " and " : ", ")
    }

    if (nstages > 1) {
        gladiators.length > 0 ? ourheroes = ourheroes.substring(0, ourheroes.length - 2) +
            ". You can pick any Global Gladiators for this story, but some might make more sense than others. The story is not intentionally balanced for any specific fighters." :
            ourheroes = `You can pick any Global Gladiators for this story, but some might make more sense than others.<br>`
    } else {
        ourheroes = `${ourheroes} or switch out someone you'd prefer.`
    }


    let personalsetup = ""
    if (nstages > 1) {
        for (let i = 0; i < gladiators.length; i++) {
            if (gladiators[i].hasOwnProperty('instructions'))
                personalsetup = personalsetup + " " + gladiators[i].instructions + " "
        }
        personalsetup != "" | nstages === 1 ? personalsetup = `<b>Hero story instructions:</b> ${personalsetup}` : () => { }
    } else {
        personalsetup = "Arcade Mode, no special setup."
    }

    ourheroes = [`${ourheroes}<br>`, personalsetup]

    let allytext = motivationText(allymotivation, allygroup, "Ally", finalboss, gladiators, nstages)

    let rivaltext = motivationText(rivalmotivation, rivalgroup, "Rival", finalboss, gladiators, nstages)

    let setup = nstages > 1 ? `<b>Story Setup:</b> Put ` : `<b>Stage Setup:</b> Put `

    let allysetup = setup

    for (let i = 0; i < allygroup.length; i++) {
        allysetup = allysetup + " " + allygroup[i].name + " (Ally)" + (i == allygroup.length - 2 ? " and " : ", ")
    }

    allygroup.length > 0 ? allysetup = allysetup.substring(0, allysetup.length - 2) + (nstages > 1 ? " in the Story Pool." : ` into play.`) : allysetup = `You can pick any Allies for this story, but some might make more sense than others.`

    let rivalsetup = setup

    for (let i = 0; i < rivalgroup.length; i++) {
        rivalsetup = rivalsetup + " " + rivalgroup[i].name + " (Rival)" + (i == rivalgroup.length - 2 ? " and " : ", ")
    }

    rivalgroup.length > 0 ? rivalsetup = rivalsetup.substring(0, rivalsetup.length - 2) + (nstages > 1 ? " in the Story Pool." : ` into play.`) : rivalsetup = `You can pick any Rivals for this story, but some might make more sense than others.`

    let text = []

    text.push(ourheroes)
    text.push(allytext)
    text.push(rivaltext)
    text.push(allysetup)
    text.push(rivalsetup)

    return text
}

export function numberAsString(number) {
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

export function motivationText(motivation, group, stance, finalboss, gladiators, nstages) {

    gladiators = _.map(gladiators, 'name')

    let bossclone = _.map(group, 'name').includes(finalboss.boss)

    let redemption = ["Kemono", "Shadow", "Jackal", "Juan", "Yokai", "Tlazolteotl", "Mack", "Ah Long", "Dmitri", "Train", "Tiger Ip", "Swiftclaw", "Blood Moon"]

    let personalstory_ally = `${possessiveSuffix(motivation)} personal goals have taken the same path as your mission. ${_.map(group, 'name').includes(motivation) ? `${motivation}${group.length == 2 ? `, along with ${(_.map(group, 'name')).filter(character => character != motivation)}` : ""} will accompany you on your mission.` : `${possessiveSuffix(motivation)} closest ally accompanies you on your mission.`} `

    let personalstory_enemy = `${possessiveSuffix(motivation)} personal goals and your mission have opposing paths. ${_.map(group, 'name').includes(motivation) ? `${motivation}${group.length == 2 ? `, along with ${(_.map(group, 'name')).filter(character => character != motivation)}` : ""} will be facing you wherever you mission will take you.` : `${possessiveSuffix(motivation)} closest ally will be facing you wherever your mission will take you.`} `

    let oneP = group.length == 1 ? true : false

    let text
    switch (motivation) {
        case "Arcade":
            text = `This group of goons is ready to duke it out against anyone ${stance == "Ally" ? "trying to hinder you in your task" : `standing against ${finalboss.boss}`}.`;
            break;
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
            } else { text = `Ah Long has fallen into disfavor with the Kingdom, and is in danger of losing the leadership of the Dragons. Now ${_.map(group, 'name').includes(motivation) ? `his closest ally` : `he`} has vowed to stop the Golden Gladiators at any cost to prove their dedication to the Kingdom.` };
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
        case "Davenport Manor":
            if (stance == "Ally" && gladiators.includes("Raven")) {
                text = `The power of the Hallower has compelled these former slaves of the darkness in Davenport to turn to Light! They will help you strike down ${finalboss.boss}, possibly enjoying the process.`
            } else if (stance == "Ally") { text = `The dark forces of Davenport have their own reasons for revenge. They will help you strike down ${finalboss.boss} with wanton violence.` } else if (stance == "Rival" && gladiators.includes("Raven")) {
                text = `The blasted Order of the Hallower has brought the dark forces of Davenport Manor out to hunt you down.`
            } else { text = `The evil of Davenport Manor wants to exact a revenge on you. For what, you cannot tell.` };
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
            `${(finalboss.name == "Kingdom" ? `James Wong is on a special mission by the BCPD to keep tabs on ${finalboss.boss}.` : `James Wong has been sent by the BCPD to help you search deeper on ${finalboss.name} operations and take them down.`)}${(group.length == 2 ? ` He has persuaded the FBI agent Ying Hua to search deeper into the situation.` : ``)}` :
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
    but you think you can count on ${finalboss.boss} this one time. But which one is the clone?` :
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

    text = `If you choose to use additional ${stance == "Ally" ? "Allies" : "Rivals"} ${nstages > 1 ? `during this story` : `for this stage`}, read the following text and use the setup instructions below.<br><br><i>`
        + text + `</i>`
    return text

}

export function getTransformationSequence(enemy, blade = undefined, source = null) {

    let m1 = mysticalSynonym()
    let m2 = mysticalSynonym(m1)
    const _subject = gPron(enemy, "subject") //he
    const _object = gPron(enemy, "object") //him
    const _possessive = gPron(enemy, "possessive") //his
    let bladetransformations

    source == null ? source = enemy.name : () => { }
    if (blade !== undefined) {
        bladetransformations = [
            `"${ucInit(m1)} power has been revealed to me!" ${enemy.boss} says. Lifting aloft ${_possessive} ${m2} ${blade}, ${_subject} shouts: "By the power of ${source}!" A shimmering cascade of ${mysticalSynonym()} energy rains down on ${_object}. ${ucInit(_possessive)} muscles bulge, and ${_subject} brings the ${blade} in front of ${_object} in a wide, two-handed grip. "I have the power!"`,
            `Bathed in the flickering ${m1} light, ${enemy.boss} lifts the ${blade} skyward. ${ucInit(_possessive)} voice deepens as runes blaze across ${_possessive} arms. "This is the will of ${source}," ${_subject} growls. The ${m2} energy crackles around you.`,
            `A corona of inverted ${m1} light coils around ${enemy.boss}, and the world seems to hold its breath. The ${blade} in ${_possessive} hands glows white-hot, veins of ${m2} energy spiraling toward the heavens.<br><br>`,
            `"By the right of ${source}," ${enemy.boss} shouts, lifting ${_possessive} ${blade}. "I claim this world!" Energy spirals down from the air, drawn into ${_possessive} heart. You feel it in your teeth.<br><br>`,
            `A ripple of energy bursts out as ${_subject} drops the pretense of humanity. The ${blade} fuses into ${_possessive} arm. Spines tear through flesh as ${_possessive} silhouette grows jagged and wrong. This isn’t a transformation — it’s a revelation.<br><br>`,
            `${enemy.boss} shakes violently as  ${m1} tendrils snake across ${_possessive} form. With a final snap, the ${blade} is swallowed into ${_possessive} body — not destroyed, but *incorporated*. Everyone stops. No one dares speak.<br><br>`
        ]
    }

    let transformations = [
        `Standing in the middle of the temple, ${enemy.boss} rises up off the stone floor, the ${m1} powers swirling around ${_object}. You watch as ${_possessive} muscles grow, ${_possessive} eyes burn, and ${_possessive} body pulses with the ${m2} energies!`,
        `Surrounded by an aura as dark and ominous as ${_possessive} very reputation, ${enemy.boss} steps forth. ${ucInit(_possessive)} eyes glow with a deep red energy, and ${_subject} turns those burning orbs on you.`,
        `With a release of ${m1} energy that leaves a crater beneath ${enemy.boss}, ${_possessive} skin peels off and ${_possessive} blood turns into a red-black layer of horned carapace. Bony spurs burst forth, connected to ${_possessive} body by ligaments. ${ucInit(_subject)} turns ${_possessive} dead-white, glowing eyes on you.`,
        `${enemy.boss} makes a strangling sound, and the ${m1} transformation begins. ${ucInit(_possessive)} skin turns gray all over, like a corpse. Every part of ${_possessive} body swells up like it is about to burst. You hear the cracking noise of ${_possessive} bones stretching. ${ucInit(_subject)} rises to ${_possessive} new, full height, towering over you, and slams ${_possessive} mighty fists against ${_possessive} chest with a release of ${m2} energy.`,
        `${ucInit(_subject)} hovers above the cracked floor, surrounded by a ring of hovering glyphs. The wind howls. "You see it now, don't you?" ${enemy.boss} intones. "The ${m1} power was never for mortals, but for ME!"`,
        `From every direction, strands of ${m1} power converge on ${possessiveSuffix(enemy.boss)} chest. ${ucInit(_subject)} roars—not in pain, but in triumph — as ${_possessive} form shines like a star.<br><br>`,
        `${enemy.boss} steps forward, feet leaving the ground. ${_possessive} earthly form burns away in strands of ${m1} fire. A pulse of ${m2} power bursts from ${_object}, freezing ${_possessive} surroundings midair.`,
        `${enemy.boss} lets out a soundless scream. Time seems to halt. ${_possessive} bones twist with audible cracks, joints realigning into something no longer human. ${ucInit(_subject)} flexes fingers that now end in talons.`,
        `${possessiveSuffix(enemy.boss)} body fractures along glowing seams, shards of former flesh falling away. A radiant exoskeleton of ${m1} crystal erupts outward, and ${_subject} steps forward as the air bends.`,
        `${enemy.boss} convulses. A halo of ${m1} matter forms above ${_possessive} head as limbs elongate. The voice that emerges isn’t just deeper — it’s layered, like multiple versions of ${_object} speaking at once, speaking not words but <b>power</b>.`,
        `"No more masks," ${enemy.boss} snarls. ${ucInit(_possessive)} skin hardens into obsidian shell, threaded with molten lines of ${m1} light. The very ground seems to recoil.`
    ]

    if (bladetransformations !== undefined) {
        transformations = transformations.concat(bladetransformations);
    }

    return randFrom(transformations)


}

export function getCasino(enemy) {

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

_.templateSettings.imports = {
    randFrom,
    gPron,
    possessiveSuffix,
    ucInit,
    mysticalSynonym,
    loungeMusic,
    bossDescription,
    getMasterPlan,
    laconicStatement,
    defineAddressing,
    whichPreposition,
    evilPlace,
    getTransformationSequence,
    getCasino,
    getMotivation,
    numberAsString,
    getPropertyValue,
    lowerCaseInitial
};
