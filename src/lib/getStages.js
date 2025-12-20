import _ from 'lodash';
import { randFrom, whichPreposition } from '$lib/story_utils';
import { getMasterPlan } from './story_utils';

export function getStages(expansionfilter) {

    let stages = [

        {
            name: "All the Rave", expansion: "stretchgoals18", instory: 0, location: "neutral", bystander: "partygoer",
            stagebonus: { setup: `Any fighter may put this card in their play area. <b>Feint:</b> One fighter may resolve the Dance With effect of an objective adjacent to them.` },
            stagepenalty: { setup: `Resolve the <b>Activate</b> effect on stage rules card.` },
            masterplan: randFrom(["strengtheningforces", "actsofterror", "illegalgains", "kidnapping", "personalpower"]),
            keywords: ["hostages"],
            hostages: "panicking partiers",
            gloat: [
                [`You think fighting me in some nightclub is going to stop the downfall of Ransom?`, `I'm not your problem. I'm just doing business.`],
                ['Didn’t expect to see you in my club.', 'Shame you won’t make last call.'],
                ['You think this place plays your song?', 'Tonight, you dance to mine.'],
                ['I run this crowd now.', 'And after I\'ve handled you Citadel twerps, I’ll run this city.'],
                ['Didn’t anyone tell you? Gladiators don’t get past the velvet rope.', 'Security’s going to enjoy this.'],
                ['You really wore that to my club?', 'Guess it’ll look fine in the ER.'],
                ['Your timing’s perfect, the drop is about to hit.', 'And so am I.'],
                ['You’ve got some nerve coming here!" "Let\'s take this outside — no need to endanger these people," you try to reason. "Hah! When the drop hits, <span class="emphasis">more</span> people will hit the floor,', 'And so will you.']
            ],
            rivaltext: _.template('<%=rivalboost ? ` Suddenly, one of the tubes crashes open, and a figure can be seen within the steam, kneeling, faced away. It stands, slowly, powerfully built, dripping with green gel. It is the ultimate clone, ${rival.name.toUpperCase()}-EX!<br><br>` : ` Apparently ${enemy.boss} is taking blood samples from ${rival.name}.`%>'),
            hottrail: () => _.template(randFrom([
                '${trail}, you conclude ${enemy.boss} plans to flip the whole club tonight — and you’re walking in before the final player falls in line. You push through the alley entrance, cutting past the crowd, already spotting ${enemy.minions()} working the floor.',
                '${trail}, you pinpoint the club’s opening night as the turning point for ${enemy.name}. You slip past the velvet rope just as the headliner track hits, scanning the crowd for the faces already swayed to ${enemy.boss}’s side.',
                '${trail}, you trace the manipulation to this night, this stage, this crowd. You stride past the entrance of ${casino} like you own the place, catching the bartender’s uneasy glance and the DJ’s setlist shifting on cue.'
            ])),
            coldtrail: () => _.template(randFrom([
                '${trail}, you hit the ${casino} club as the second set kicks in — the lights pulse red, and ${enemy.boss} is already working the floor. ${ucInit(enemy.minions())} are blending with the dancers, twisting the crowd into a loyal army.',
                '${trail}, your leads bring you to the pulse of the ${casino} just as the power players start falling under ${possessiveSuffix(enemy.boss)} sway. You force your way through the packed floor, spotting the bartender about to hand over control of the night.',
                '${trail}, you realize too late that ${enemy.boss} didn’t come to ${casino} to party — they came to claim the crowd. You breach the dance floor as the lighting techs follow ${gPron(enemy,"possessive")} signal and the bassline warps the room’s mood.'
            ])),
            clueless: () => _.template(randFrom([
                'You came to ${casino} club looking to blow off steam, maybe catch the headliner, when you spot ${enemy.boss} deep in conversation with the DJ. Suddenly the next track hits — darker, sharper — and the crowd\'s energy turns tense.',
                '${trail}, you figured this was just a stakeout on a low-level deal — until you step onto the floor and see ${enemy.minions()} already locking down exits, while ${enemy.boss} sways the crowd with whispered commands.',
                'It was supposed to be a quiet night — pizza, a club set at the ${casino}, maybe some downtime. But the moment you enter, you catch ${enemy.boss} pulling strings across the dance floor. The beat drops, the lights cut, and the room turns hostile.'
            ])),
            prologue: () => _.template(randFrom([
                '${stagevar}<br><br>${enemy.boss} finishes a quiet conversation with the head bartender. Laughter rises from the VIP booth, drinks clink, and ${loungeMusic("rave")}. ${enemy.boss} glances toward you, amusement flickering beneath the neon lights. "${gloat[0]}" ${gPron(enemy,"subject")} says and ${enemy.threat}, voice almost drowned out by the beat. "${gloat[1]}"',
                '${stagevar}<br><br>The lights flash gold across the dance floor as ${enemy.boss} steps down from the lounge, nodding to the ${enemy.minions()} in passing. A new track fades in, pulsing with anticipation. ${enemy.boss} locks eyes with you through the haze, flashing a thin smile. "${gloat[0]}" ${gPron(enemy,"subject")} calls out over ${loungeMusic("rave")}. "${gloat[1]}"',
                '${stagevar}<br><br>The crowd surges as ${loungeMusic("rave")} builds, dancers oblivious to the tension threading through the club. ${bossDescription(enemy)} leans against the bar, waiting for you to make the first move. "${gloat[0]}" ${gPron(enemy,"subject")} says, glass in hand. "${gloat[1]}"'
            ]))
            ,
            captured: _.template(
                randFrom([
                    'You come to in the DJ booth of the ${casino}, wrists bound, forced to watch the set unfold. Below, ${enemy.boss} leans close to the DJ, whispering something before stepping away into the shadows. ${ucInit(loungeMusic("rave"))} hits — harder, faster — and the crowd changes with it. But you’re not part of their rhythm. You break free, kill the monitors, and drop into the chaos below.',
                    'Bound in a storage alcove behind the bar, you hear the beat shift and the crowd roar in response. ${enemy.boss} leans over the bartender, flipping a switch on the lights to match the rising tempo. The room bends to ${gPron(enemy,"possessive")} will, but you’re not part of this script. You rip free of the zip ties and burst onto the floor before the next track takes hold.',
                    'The bass rattles your ribs as you regain focus, tied to a catwalk high above the floor. Below, ${enemy.boss} moves from the dancers to the bouncers, each nodding in turn before taking their place. Every beat of ${loungeMusic("rave")} locks the room tighter under their control. But before the last note lands, you break your bonds and drop into the heart of the crowd, ready to change the tune.',
                    'Chained to a sound rig at the side of the stage inside the ${casino}, you feel the pulse of the club shift as ${enemy.boss} makes the rounds. The bartender gets a nod, the bouncers a quiet command. ${ucInit(loungeMusic("rave"))} changes the mood, drawing the crowd further under ${gPron(enemy,"possessive")} sway. You tear loose the cabling and throw yourself into the storm before it’s too late.',
                    'You wake behind the curtain in the ${casino}, bruised and restrained, just as ${enemy.boss} finishes talking with the head dancer. On cue, the floor lights shift and the crowd’s energy turns electric, driven by the new routine. But this isn’t your encore. You break free, rip down the curtain, and step into the floodlights as the tempo of ${loungeMusic("rave")} surges.',
                    'Stashed beneath the stage of the ${casino}, you groggily weak up as you hear snippets of the takeover in motion. ${enemy.boss} brokers deals between the club’s key players. Each one nods as another section of the club falls in line. But the night’s not theirs yet. You break your restraints and crash through the trapdoor, scattering the plan like broken records.'
                ])),
            finalvar: _.template(randFrom([
                '<br><br>The next track drops like a hammer and the club explodes into motion. ${ucInit(enemy.minions())} charge through the dancers as the lights strobe out of sync. ${enemy.boss} watches and from the balcony, ${enemy.threat} as the crowd panics or rallies — it’s hard to tell. "${gloat[0]}" ${enemy.boss} calls from above. "${gloat[1]}" You shove past the chaos and close in on your target.',
                '<br><br>Lasers slice the fog as you hit the floor. ${ucInit(enemy.minions())} turn from bystanders to combatants in an instant, throwing bottles, swinging bar stools, and using the stage as a barricade. Above it all, ${enemy.boss} leans against the rail, savoring the moment. "${gloat[0]}" ${enemy.boss} laughs through the noise. "${gloat[1]}" You wade into the storm.',
                '<br><br>You crash through the bar as the beat twists and the lighting rigs spark overhead. ${ucInit(enemy.minions())} swarm the floor, blending with the dancers in a violent blur. ${enemy.boss} raises a glass, voice sharp above the chaos. "${gloat[0]}" ${enemy.boss} taunts. "${gloat[1]}" The scene dissolves into a riot of neon and fists. You’re done waiting — time to break the rhythm.'
            ])),
            illegalgains: _.template(randFrom([
                '${trail}, you uncover the ${getMasterPlan()} — ${enemy.boss} isn’t just laundering petty cash. ${ucInit(gPron(enemy,"subject"))} is building a war chest so vast it will bankroll the ${enemy.name} for years to come. If this deal closes, every racket in the city will owe them a cut. You smash through the back hall as the final transfers lock in.${finalvar}',
                '${trail}, you realize this isn’t about running a club — it’s about running the city. With the ${casino} as the money hub, the ${enemy.name} stands to control every black market deal, every fix, every payoff that matters. You burst onto the floor before the last account is sealed.${finalvar}',
                '${trail}, your sources confirm that ${enemy.boss} is pulling in enough dirty money tonight to rewrite the criminal order of the whole sector. This club isn’t a hideout — it’s a financial fortress of the ${enemy.name}. You hit the floor before the empire cashes out.${finalvar}'
            ])),
            actsofterror: _.template(randFrom([
                '${trail}, you uncover the ${getMasterPlan()} behind the ${casino} — a hypnotic track embedded with subliminal frequencies, turning the entire crowd into mindless followers of ${enemy.boss}. If the final drop hits, they’ll never think for themselves again. You reach the sound booth seconds before the signal spikes.${finalvar}',
                '${trail}, you uncover ${enemy.boss}’s ${getMasterPlan()}: the entire club is rigged to blow, taking out hundreds of patrons in a single blast designed to terrify the city into submission. You break through the service entrance just as the detonator’s countdown is about to start. ${finalvar}',
                '${trail}, you uncover the ugliest ${getMasterPlan()}: ${enemy.boss} is using the ${casino} as the test site for a new ${randFrom(["Vandal","Dark Matter","Dynasty"])} variant, flooding the scene with an addiction so strong no one will escape its pull. Tonight’s party is the launch event — a chemical leash around the city’s youth. You crash through the floor just as the first wave hits their veins. ${finalvar}'
            ])),
            strengtheningforces: _.template(randFrom([
                '${trail}, you realize the ${casino} isn’t a party — it’s a recruiting ground. ${enemy.boss} is building a loyal street army from the toughest and most desperate in the crowds. You breach the floor just as ${enemy.minions()} finish closing the exits.${finalvar}',
                '${trail}, the plan becomes clear — ${enemy.boss} is using the club as a staging ground for a gang war large enough to take over Ransom City in the name of ${enemy.name}. The first wave is soon ready to march out the side doors unless you stop it now. You charge the stage as the orders fly.${finalvar}',
                '${trail}, you piece together the horrifying truth — tonight’s headliner isn’t music, it’s mind control. ${enemy.boss} plans to turn the crowd into an obedient mass, draining them of free will through rhythm and resonance, a mindless army ready to fight and die for the ${enemy.name}. You hit the stage before the chorus locks them in forever.${finalvar}'
            ])),
            personalpower: _.template(randFrom([
                '${trail}, you uncover ${possessiveSuffix(enemy.boss)} ${getMasterPlan()} — the ${casino} itself is a conduit. The crowd’s energy, the music’s pulse, even the lights are feeding into ${gPron(enemy,"possessive")} body, amplifying ${gPron(enemy,"possessive")} strength with every beat. You reach the stage as the final transfer begins.${finalvar}',
                '${trail}, your intel reveals the darkest ${getMasterPlan()} yet: ${enemy.boss} is turning the club into a living battery, draining the life force of every dancer, every staff member, every person under the lights. If you don’t stop it now, ${gPron(enemy,"subject")} will ascend beyond human limits. You break through the backstage doors as the siphoning begins.${finalvar}'
            ])),
            kidnapping: _.template(randFrom([
                '${trail}, you discover ${vip.vip} is being held in the VIP lounge of the ${casino} — bait for the power brokers of the ${vip.location}. ${enemy.boss} plans to trade them for total control of Ransom City. You storm the lounge just before the deal goes down.${finalvar}',
                '${trail}, you confirm ${vip.vip} is trapped upstairs of the ${casino}, surrounded by ${enemy.minions()} and held as leverage over ${vip.location}. If you don’t act now, ${enemy.boss} walks away with both the hostage and the city. You breach the catwalk just as the power shifts.${finalvar}',
                '${trail}, your intel reveals that ${enemy.boss} is using ${vip.vip} as a bargaining chip to take over not just this club, but the city. You hit the ${casino} before the contract is signed.${finalvar}'
            ]))

        },

        {
            name: "Ashes of the Eternal", expansion: "legendofoni", instory: 0, location: ["cursed", "remote"], bystander: "temple caretaker", pit: "a bottomless well",
            stagebonus: { setup: `Any fighter may put this card in their play area. <b>Feint:</b> Remove this card from the game to discard 1 fire token from the map.` },
            stagepenalty: { setup: `One fighter places 1 fire token in the space nearest to them.` },
            masterplan: randFrom(["actsofterror", "personalpower", "kidnapping", "strengtheningforces"]), keywords: ["ritual", "explosion", "oni", "swarmed"], explosions: "uncontrollable fires", ritual: "Oni", swarm: "evil fire spirits",
            gloat: [
                [`You won’t stop the inevitable!`, `I’ll end you here, with or without the Oni!`],
                [`Fire is a living thing, Gladiators,`, `It breaths, it eats. And it hates.`],
                [`You should be glad to go out like this,`, `You will have a funeral pyre of a true warrior!`],
                [`The fire you've unleashed will consume everything! We're putting an end to this madness," you shout over the roar of the rising flames. "You think you can douse the flames of destiny with such simple acts? Those urns are mine by right, the key to the power I've sought all along,`, `The fires are but a trial, one I am prepared to endure for my ascension!`],
                [`This isn't power; it's destruction! Can't you see the ruin you're bringing upon us all?" you argue. "Ruin? No, it is purification! Only through destruction can we rebuild, stronger and unbound by the old ways. You aim to lock away the future I am offering,`, `Fools! I will not allow it!`],
                [`The fire, it purifies, it transforms,`, `The flames are but a fraction of the inferno within me, a blaze of ambition and power!`],
                [`You believe you can save the day by returning the urns,`, `But my vision cannot be so easily extinguished!`]
                ,],
            rivaltext: _.template(', but ${rival.name}<%=rivalboost ? `, possessed by the infernal force` : `, looking to gain some of the infernal force`%> moves in to intervene'),
            hottrail: () => _.template(randFrom([
                '<br><br>The chamber ignites in flames, casting an otherworldly glow on ${enemy.boss}, who struggles against the overwhelming power. With a gasp of awe and terror, ${gPron(enemy, "subject")} gazes upon ${gPron(enemy, "possessive")} hands, now aglow with a fiery essence. "Impossible," ${gPron(enemy, "subject")} rasps, disbelief etched across ${gPron(enemy, "possessive")} visage. As ${gPron(enemy, "subject")} meets your gaze, a spark of fear flickers.',
                '<br><br>You were not too late! ${enemy.boss} falls on the floor, barely able to stand up, and stares at ${gPron(enemy, "possessive")} hands with astonishment.  "This can\'t be," ${gPron(enemy, "subject")} says hoarsely.  "I have come so far..." ${ucInit(gPron(enemy, "subject"))} looks up to you with a look of shock.'
            ])),
            coldtrail: () => _.template(randFrom([
                '<br><br>${enemy.boss} drops lightly to the floor, the interrupted ritual\'s power already coursing through ${gPron(enemy, "object")}. ${ucInit(gPron(enemy, "subject"))} examines ${gPron(enemy, "possessive")} hands, now emblazoned with symbols of power. "So, it comes to this," ${gPron(enemy, "subject")} murmurs. ${ucInit(gPron(enemy, "subject"))} locks eyes with you, ${gPron(enemy, "possessive")} initial shock giving way to a smoldering fury.',
                '<br><br>${enemy.boss} descends on the floor, then straightens ${gPron(enemy,"reflexive")} up, standing up and staring at ${gPron(enemy, "possessive")} hands with astonishment.  "The power," ${gPron(enemy, "subject")} says calmly. "This can\'t be all..." ${ucInit(gPron(enemy, "subject"))} looks up to you,  ${gPron(enemy, "possessive")} look of shock changing to one of pure rage.',
            ])),
            clueless: () => _.template(randFrom([
                '<br><br>The ground trembles as ${enemy.boss} lands amidst the ruins, now fully embracing the Oni\'s might. With deliberate movements, ${gPron(enemy, "subject")} unfurls ${gPron(enemy, "possessive")} newfound strength, ${gPron(enemy, "possessive")} fists clenched in anticipation. A sinister laugh escapes ${gPron(enemy, "object")}, echoing through the chamber as ${gPron(enemy, "subject")} fixes a triumphant gaze upon you, reveling in the dark power that now courses through ${gPron(enemy, "possessive")} veins.',
                '<br><br>${enemy.boss} falls down to the floor of the temple, landing solidly on ${gPron(enemy, "possessive")} feet. ${ucInit(gPron(enemy, "subject"))} flexes ${gPron(enemy, "possessive")} muscles slowly, staring at ${gPron(enemy, "possessive")} clenched fists, an evil grin on ${gPron(enemy, "possessive")} face. ${ucInit(gPron(enemy, "subject"))} then looks up to you, and laughs.'
            ])),
            prologue: () => _.template(randFrom([
                '${trail} you find ${bossDescription(enemy)} in the middle of a ritual at a remote ${evilPlace()}. The ${mysticalSynonym()} powers float ${gPron(enemy, "object")} as ${gPron(enemy, "subject")} draws in a portion of the hellfire of the cursed Oni. You rush in to disrupt the ritual, scattering the unholy urns positioned around the temple.${stagevar} "${gloat[0]}" ${gPron(enemy, "subject")} says. "${gloat[1]}" ${laconicStatement(enemy)}<br><br>You stand ready to face ${gPron(enemy, "object")}, and suddenly wince as your hands begin burning with a searing hot pain. You look down to see bright red lines snaking their way along your hands. You must have disrupted some ancient power by scattering the urns. Gritting your teeth, you pick up the urns and prepare to return them to their rightful place<%=rivalpresence ? `${rivaltext}` : ``%>.',
                '${trail} you are led deep into the heart of ${evilPlace()}, where you\'re met with a scene of ominous power. ${bossDescription(enemy)}, caught in the act of harnessing the hellfire of the Oni, turns to face you with a look of disdain. The air floating ${gPron(enemy, "object")} shimmers with ${mysticalSynonym()} energy, as the sacred urns — key to controlling the inferno — lay scattered due to your sudden intrusion.${stagevar} "${gloat[0]}" ${gPron(enemy, "subject")} addresses you: "${gloat[1]}" It\'s clear: the disrupted urns must be returned to their rightful place to halt the spreading flames and the summoning of of the hellish powers of the Oni. You step forth<%=rivalpresence ? `${rivaltext}` : `, ready to end this at any cost.`%>.'
            ])),
            captured: _.template('You awaken to searing hot pain, and look down to see bright red lines snaking their way along your hands. ${bossDescription(enemy)} is floated by some ${mysticalSynonym()} powers as ${gPron(enemy, "subject")} draws in a portion of the igniting hellfire. You see ${mysticalSynonym()} urns scattered nearby - ${gPron(enemy, "subject")} must have used you to activate the ${mysticalSynonym()} powers of the cursed Oni!${stagevar} "${gloat[0]}" ${gPron(enemy, "subject")} says. "${gloat[1]}" ${laconicStatement(enemy)}<br><br>You rip your bonds, grit your teeth, and prepare to return the urns to their rightful place<%=rivalpresence ? `${rivaltext}` : ``%>.'),
            finalvar: _.template('You rush in to disrupt the ritual, scattering the unholy urns positioned around the temple.<br><br>${enemy.boss} falls down to the floor of the temple, landing solidly on ${gPron(enemy, "possessive")} feet.  ${ucInit(gPron(enemy, "subject"))} flexes ${gPron(enemy, "possessive")} muscles slowly, staring at ${gPron(enemy, "possessive")} clenched fists, an evil grin on ${gPron(enemy, "possessive")} face. ${ucInit(gPron(enemy, "subject"))} then looks up to you, and laughs. "${gloat[0]}" ${gPron(enemy, "subject")} says. "${gloat[1]}" ${laconicStatement(enemy)}<br><br>You stand ready to face ${gPron(enemy, "object")}, and suddenly wince as your hands begin burning with a searing hot pain. You look down to see bright red lines snaking their way along your hands. You must have disrupted some ancient power by scattering the urns. Gritting your teeth, you pick up the urns and prepare to return them to their rightful place<%=rivalpresence ? `${rivaltext}` : ``%>.'),
            actsofterror: _.template('${trail}, you find out that the ${getMasterPlan()} of ${enemy.boss} is to channel the full power of the demonic force Oni through ${enemy.boss} to create a world molded from the flames of destruction, where ${enemy.name} reigns supreme over the cinders of the old. You arrive at the remote ${evilPlace()}. The ${mysticalSynonym()} powers float ${gPron(enemy, "object")} as ${gPron(enemy, "subject")} undoes the ${mysticalSynonym()} bindings of the cursed Oni. ${finalvar}'),
            personalpower: _.template('${trail}, you finally find out that the ${getMasterPlan()} of ${enemy.boss} is to completely bind the cursed Oni spirit with ${gPron(enemy, "reflexive")}, losing the last of ${gPron(enemy, "possessive")} humanity, but gaining power of unimaginable scale.<br><br>You arrive at the remote ${evilPlace()}. The ${mysticalSynonym()} powers float ${bossDescription(enemy)} as ${gPron(enemy, "subject")} undoes the ${mysticalSynonym()} bindings of the cursed Oni. ${finalvar}'),
            kidnapping: _.template('${trail}, you find out where ${enemy.boss} holds the ${vip.vip} - ${whichPreposition(evilPlace())} sacred to the demonic Oni, and the ${getMasterPlan()} is to sacrifice ${randFrom(["him","her"])} to that diabolical spirit.<br><br>You arrive at the remote ${evilPlace()}. The ${mysticalSynonym()} powers float ${bossDescription(enemy)} as the ${mysticalSynonym()} flames are peaking. ${finalvar}'),
            strengtheningforces: _.template('${trail}, a darker purpose reveals itself. ${enemy.boss}, through the ${mysticalSynonym()} ritual, seeks not only to wield the Oni\'s destructive might but to subjugate the very essence of the fire itself under the command of ${enemy.name}. The fire spirits, once wild and untamable, now converge around ${gPron(enemy, "object")}, their flickering forms bending to a will as formidable as the ancient forces they embody. The spreading fire is no mere act of terror but a call to arms, a beacon enslave the fire spirits as soldiers of ${enemy.name}. ${finalvar}')
        },

        {
            name: "Bogged Down", expansion: "aftershock", instory: 0, location: "remote", bystander: "hitchiker",
            stagebonus: { setup: `Any fighter may put this card in their play area. <b>Feint:</b> When Toxic 'Gators would attack, discard this card to cancel that attack.` },
            stagepenalty: { setup: `Each fighter searches the stage deck for 1 copy of ${randFrom(["From the Sludge ", "Big Bugs"])} and draws it. Shuffle the stage deck.` },
            masterplan: randFrom(["strengtheningforces", "actsofterror", "illegalgains", "kidnapping", "personalpower"]),
            keywords: ["swarmed", "gunk"],
            swarm: `${randFrom(["toxic", "big", "radioactive"])} ${randFrom(["bugs", "gators", "wildlife"])}`,
            gunk: `a ${randFrom(["barrel", "vat", "pool", "runoff"])} of ${randFrom(["radioactive", "toxic", "caustic", "viscous", "sizzling", "chemical", "oily", "black"])} ${randFrom(["sludge", "muck", "froth", "waste", "ooze"])}`,
            explosions: "methane bursts",
            gloat: [
                [`You really thought this was just pollution?`, `It's a blueprint for domination — one barrel at a time.`],
                [`Welcome to the food chain,`, `and down here, the gators make the rules.`],
                [`You're destroying an ecosystem!" you shout. \"No. I’m improving it,`, `Predators up, nuisances down.`],
                [`Don't worry,`, `The gators know the difference between trespassers and snacks.`],
                [`You think the swamp is dying?`, `It’s just molting. You’ll love what grows back.`],
                [`Nature doesn’t pick sides,`, `So I gave it one—mine.`],
                [`This is insane!\" you yell. \"Insane is what happens when science runs its due course,`, `And runs out of permits.`],
                [`The 'gators are territorial,`, `Let's see how they feel about you!`]
            ],
            rivaltext: _.template('<%=rivalboost ? ` Suddenly, one of the tubes crashes open, and a figure can be seen within the steam, kneeling, faced away. It stands, slowly, powerfully built, dripping with green gel. It is the ultimate clone, ${rival.name.toUpperCase()}-EX!<br><br>` : ` Apparently ${enemy.boss} is taking blood samples from ${rival.name}.`%>'),
            hottrail: () => _.template(
                randFrom([
                    "${trail}, you take a Citadel hovercraft as far as you dare and hike the rest. The boardwalk splits and creaks beneath your weight. Gas bubbles rise through the water. ${ucInit(enemy.minions())} scatter into the reeds as you step into view — too late to stop the contamination,  but just in time for whatever comes next.<br><br>At the water’s edge, ${enemy.boss} stands ankle-deep in filth, one hand on a pump lever, the other resting calmly on a tranquilized gator.",
                    '${trail} you intercept a supply run of toxic materials bound for the swamp. You beat the first ${enemy.minions()} right there and catch the rest mid-dump, their containment barrels still sealed. ${enemy.boss} exits a tent — clearly not expecting company. You’ve got position, intel, and a very narrow window.'
                ])),
            coldtrail: () => _.template(
                randFrom([
                    "${trail}, you follow hazmat residue and drone footage straight into the wetlands. The pollution is already spreading. ${ucInit(enemy.minions())} are in position, working pumps and dumping barrels. ${bossDescription(enemy)} watches from an old hunting tower, unfazed. The gators haven’t arrived — <span class = 'emphasis'>yet</span>.",
                    "${trail}, you arrive by airboat to what looks like an abandoned nature preserve — until the stench hits. The water’s black, the birds are gone, and the abnormally large bugs buzz like warning sirens. ${ucInit(enemy.minions())} work undisturbed.<br><br>${enemy.boss} doesn’t even glance your way at first — just adjusts the dosage valve and lets it flow. You step off the boat into ankle-deep ooze, already behind."
                ])
            ),
            clueless: () => _.template(
                randFrom([
                    "${trail}, you arrive expecting an abandoned drug lab, maybe illegal dumping at most — but this? The swamp has been transformed. Mutated flora pulse with chemical light, and something large is moving beneath the surface. ${enemy.boss} is already in position, arms raised in mid-speech as ${enemy.desc()} pump black sludge into the water. You freeze, unsure whether to stop them — or call for backup.",
                    "${trail}, you expected a few leaking barrels and a fast cleanup — but arriving at the wetlands you realize they are already lost. The trees are dying upright, the water stinks of solvents, and the frogs have stopped making noise. ${enemy.boss} is calmly overseeing a pump array the size of a freight truck, while ${enemy.minions()} unload a second wave of canisters."
                ])
            ),
            prologue: () => _.template(
                randFrom([
                    "${stagevar}  \"${gloat[0]}\" ${gPron(enemy, 'subject')} grins. \"${gloat[1]}\" The air is already turning toxic.",
                    "${stagevar}  \"${gloat[0]}\" ${gPron(enemy, 'subject')} grins. \"${gloat[1]}\"<br><br>${laconicStatement(enemy)}"
                ])),
            captured: _.template(
                randFrom([
                    "You come to just as ${randFrom(enemy.minionnames)} kicks you off a wooden pier. You land hard, ankle-deep in sludge. ${enemy.boss} leans on a rusted railing nearby, watching ${gPron(enemy, 'possessive')} minions dump toxins into the water. \"${gloat[0]}\" ${gPron(enemy, 'subject')} says, almost amused. \"${gloat[1]}\"<br><br>You snap your bindings just as something splashes closer than you'd like.",
                    'You jolt awake as your body hits wet mud—flung from the back of a transport skiff. ${ucInit(enemy.minions())} unload barrels of glowing runoff, each hissing as it leaks into the swamp. Standing atop a half-submerged pipe stack, ${enemy.boss} watches silently, arms folded. The water begins to stir. You grit your teeth and roll for cover.',
                    "You groggily pull yourself from a crate labeled “LIVE BAIT.” The reeds part nearby as ${enemy.boss} steps into view, boots sinking into the muck. Behind ${gPron(enemy, 'object')}, ${enemy.minions()} hammer runoff pipes into the soil. The stench is unreal. ${ucInit(gPron(enemy, 'subject'))} smirks but says nothing. The water ripples. The trees go quiet.<br><br>And you tighten your stance."
                ])),
            finalvar: _.template(
                randFrom([
                    'You push through waist-high water, the air thick with decay and insect buzz. ${enemy.boss} turns at the sound of your approach, unfazed by your arrival. "${gloat[0]}" ${gPron(enemy, "subject")} says while pouring another barrel into the marsh. "${gloat[1]}"<br><br>',
                    'The boardwalk collapses behind you as you enter the clearing. Pumps churn sludge into the wetlands, and the toxic gators are already circling. "${gloat[0]}" ${enemy.boss} says, adjusting a control valve that makes the swamp hiss louder. "${gloat[1]}"<br><br>',
                    'You reach the edge of the operation just as another barrel topples into the swamp. ${ucInit(enemy.minions())} move quickly, but not fast enough to stop you now. "${gloat[0]}" ${enemy.boss} calls from atop a pile of leaking drums. "${gloat[1]}"<br><br>',
                    'The wind shifts, and you see the heart of it: a makeshift platform covered in tubing, tanks, and swamp-soaked tech — ${bossDescription(enemy)} stands at the center, ready. ${ucInit(gPron(enemy, "subject"))} ${enemy.threat}<br><br>'
                ])
            ),
            strengtheningforces: _.template(
                randFrom([
                    '${trail}, you uncover that ${ucInit(enemy.name)} ${getMasterPlan()} is to mutate the local wildlife into combat units. A squadron of Citadel soldiers have escorted you to your destination, but they were bogged down in a fight against the mutated beasts.<br><br>${finalvar}One of the gators rears up — too big, too fast, too unnatural — and you realize this swamp isn’t just terrain. It’s a breeding ground.',
                    '${trail}, it becomes clear: the chemical dumping wasn’t careless — it’s the ${getMasterPlan()}. ${enemy.boss} is building an army of enhanced swamp beasts. You move in as quickly as you can.<br><br>${finalvar}You spot vats marked “stabilizer,” but it’s already too late for whatever’s moving in the water.'
                ])),
            actsofterror: _.template(
                randFrom([
                    '${trail}, it becomes clear the pollution isn’t meant to be hidden — it’s <b>the point</b>. ${enemy.boss} is livestreaming the devastation across public networks. Citadel analysts have pinpointed the location, and you are dropped to nearby area via high-altitude aircraft. ${finalvar} Cameras hover above as the wetlands blacken, and the world watches in horror.',
                    '${trail}, you finally understand: this isn’t a secret operation — it’s a message. ${enemy.boss} is poisoning the swamp to make a statement. It\'s not difficult to find your way on location. ${finalvar}'
                ])
            ),
            illegalgains: _.template(
                randFrom([
                    '${trail}, you follow the money trail straight into the bog. ${enemy.name} has transformed the swamp into a black-market disposal hub — a haven for rogue tech, chemical waste, and high-paying villains looking to stay off the grid. ${finalvar}Cargo containers marked “biohazard” float half-sunk beneath drone-mounted invoice scanners, and every transfer pushes ${enemy.name} closer to becoming a global force.',
                    '${trail}, you uncover a shipment manifest linking ${enemy.boss} to at least six other major players. This isn’t just a dump site — it’s an empire built on environmental collapse. You follow the money on location.<br><br>${finalvar}The swamp is rapidly becoming the dumping ground of choice for the world’s worst, and the ${enemy.name} is raking in credits, favors, and power with every load.'
                ])
            ),
            kidnapping: _.template(
                randFrom([
                    '${trail}, you have located the missing ${vip.vip}. You speed on location with Citadel helicopter, when ${getPropertyValue(enemy, stage, "antiair", "an anti-air shell")} forces you to land before you reach your target. You advance on foot to find the ${vip.vip} left exposed in the rising mire, tied down to a barge weighed with chemical drums. It’s not just a trap — it’s a demonstration. ${enemy.boss} wants everyone to see what happens to those who stand in the way.${finalvar}',
                    '${trail}, you have uncovered that ${vip.vip} is alive at an old illegal dump site, but barely. ${enemy.boss} is using them as leverage to keep authorities away from ${gPron(enemy, "object")} while ${gPron(enemy, "subject")} makes his move on the ${vip.location}. You move quickly.<br><br>${finalvar}The hostage is chained near the waste valve, the gators are getting close — and the swamp is getting hotter.'
                ])
            ),
            personalpower: _.template(
                randFrom([
                    '${trail}, you realize ${enemy.boss} is using the swamp as a crucible — ${gPron(enemy, "possessive")} ${getMasterPlan()} is absorbing contaminated waste in pursuit of a powerful transformation. ${finalvar}${ucInit(gPron(enemy,"possessive"))} skin already glows faintly green, and something is shifting behind ${gPron(enemy, "possessive")} eyes.',
                    '${trail}, you realize the pipe system built in the wetland isn’t just for dumping — it’s feeding directly into ${enemy.boss}’s body. You take the Citadel motorboat as close as it can get you, and hike the rest.<br><br>${finalvar}You see the toxic gators flee as ${gPron(enemy,"subject")} begins to change, muscle swelling under cracked skin.'
                ])
            )
        },

        {
            name: "Cashed Out", expansion: "riseofthekingdom", instory: 0, location: "base", bystander: "gambler", pit: 'a broken window of the high rise',
            stagebonus: [{ setup: `Each fighter may put a random defense token on a Frightened Gambler in their threat area.` },
            { persistent: `<b>Interact</b>: If a fighter is in a space with an active objective token, place 1 damage on this card. If 1P damage is on this card, you have acquired the evidence.`, wincondition: [`If you acquired the evidence:`, `If you did not acquire the evidence:`], prologue: "intel" }],
            stagepenalty: [{ setup: `Search the stage deck for a Pit Boss and put it into play. Shuffle the stage deck.` },
            { persistent: `<b>Interact</b>: If a fighter is in a space with an active objective token, place 1 damage on this card. If 1P damage is on this card, you have acquired the evidence.`, wincondition: [`If you won and acquired the evidence:`, `If you did not acquire the evidence:`] }],
            masterplan: randFrom(["actsofterror", "illegalgains", "personalpower"]), keywords: ["hostages", "retrieval", "guns"],
            gunmen: "armed dealers", hostages: "innocent gamblers", loot: "the money",
            gloat: [
                [`If you have a gun, you can rob a casino,`, `But if you have a casino, you can rob everyone!`],
                [`You think fighting me in some nightclub is going to stop the downfall of Ransom?`, `I'm not your problem. I'm just doing business.`],
                [`Gambling with lives is a bet you're going to lose," you state matter-of factly. "Ah, but everyone loves a gamble, Gladiators. Let's see if luck is in your favor...`, `Too bad the house always wins!`],
                [`You've stepped into a game where the stakes are life and death,`, `Ready to play, or will you fold?`]
            ],
            rivaltext: _.template(' But ${gPron(enemy,"subject")} is not alone. Alongside ${gPron(enemy,"object")} is ${rival.name}, <%=rivalboost ? `eyes glowing green of Vandal!` : `here to sell an encrypted ${gizmo} to ${enemy.boss}.`%>'),
            hottrail: () => _.template(randFrom([
                'Bursting through the gilded double doors, you enter the heart of decadence. Surrounded by the trappings of wealth, ${bossDescription(enemy)} sits at a high-stakes table, momentarily caught off guard. The shock on ${gPron(enemy, "possessive")} face quickly turns to recognition. "So, we meet at last," ${gPron(enemy, "subject")} muses as the game of cat and mouse turns into a direct confrontation.',
                'You quickly find your way to a set of double doors. You step into the VIP room of the opulent casino. Seated before you, surprised, is ${bossDescription(enemy)}.'
            ])),
            coldtrail: () => _.template(randFrom([
                'The sounds of chaos echo from behind the grand double doors, sparking a rush of adrenaline as you prepare to face what lies ahead. With a swift kick, the doors fly open, revealing a scene of frantic activity. Amid the flurry, ${bossDescription(enemy)} stands calm and collected, a stark contrast to the panic around. "Secure our assets," ${gPron(enemy, "subject")} coolly orders the minions, before turning to you with a defiant glare.',
                'You eventually find your way to a set of double doors. You hear a commotion inside and - fearing you have lost the element of surprise - you bust in.  Your hunch was right; ${bossDescription(enemy)}, knew you were coming. "Get the money," ${gPron(enemy,"subject")} commands ${gPron(enemy,"possessive")} goons. "I\'ll hold them off."'
            ])),
            clueless: () => _.template(randFrom([
                'After going through many ${enemy.minions()} of the ${enemy.name}, you reach the VIP room of the casino. Inside, ready to face you is ${bossDescription(enemy)}.',
                'Navigating through a labyrinth of chaos and the ${enemy.minions()} you finally stand before the opulent double doors of the VIP room. Without a moment\'s hesitation, you push through into the tiger\'s den. There, amidst the luxury that belies the casino\'s darker dealings, stands ${bossDescription(enemy)}, anticipation etched into ${gPron(enemy, "possessive")} features. "I was wondering when you\'d show up," ${gPron(enemy, "subject")} taunts.'
            ])),
            prologue: () => _.template(randFrom([
                '${trail}, you <%=knowledge != "hottrail" ? `investigate the gambling den ${casino}` : `arrive at the ${casino}` %>, where you sneak in, and make your way through the halls of the casino. The surroundings speak volumes about the vast wealth channeled into the ${possessiveSuffix(enemy.name)} operations.<%=randFrom([``,` You take an elevator, and wait patiently while a ${loungeMusic()} plays over the speakers.`])%><br><br>${stagevar}<%=!rivalpresence ? ``:`${rivaltext}`%><br><br>${enemy.boss} looks at you and grins. "${gloat[0]}" ${gPron(enemy,"subject")} says. "${gloat[1]}" At that, ${enemy.boss} snaps ${gPron(enemy,"possessive")} fingers, and it becomes clear that the chat is over.',
                '${trail}, you <%=knowledge != "hottrail" ? `delve deeper into the neon-lit corridors of ${casino}` : `step into the opulent world of the ${casino}` %>, blending with the crowd as you navigate the maze of slot machines and gaming tables. The lavish decor is a testament to the immense wealth flowing through ${possessiveSuffix(enemy.boss)} empire, every corner a display of excess funded by <%=randFrom(["ill-gotten gains", "dark dealings"])%>. You ascend to the VIP area, the clink of chips and the soft hum of jazz setting a stark contrast to the tension that awaits.<br><br>${stagevar}<br><br>Confronting ${enemy.boss} amidst the clatter of roulette wheels, you\'re met with a smug smile. "${gloat[0]}" ${gPron(enemy,"subject")} taunts. "${gloat[1]}" That moment ${enemy.boss} signals <%=!rivalpresence ? `${gPron(enemy,"possessive")} security`: `${rival.name}`%><%=rivalpresence && rivalboost ? ` armed to the teeth`: ``%>, and the facade of hospitality crumbles, revealing the high stakes of this gamble.'
            ]
            )),
            captured: _.template('You are thrown to the floor of the VIP room in the ${casino} casino, beaten by the many ${enemy.minions()}. Seated before you is ${bossDescription(enemy)}<%=!rivalpresence ? `.`:`. ${rivaltext}`%><br><br>${enemy.boss} looks at you, grins and ${enemy.threat}. "${gloat[0]}" ${gPron(enemy,"subject")} says. "${gloat[1]}" At that, ${enemy.boss} snaps ${gPron(enemy,"possessive")} fingers, and it becomes clear that the chat is over.'),
            actsofterror: _.template('${trail}, you have uncovered ${possessiveSuffix(enemy.name)} ${getMasterPlan()}: to take over Ransom not by force, but by guile. The glamorous nightclub ${casino} hosts nightly parties full of vice and wickedness for the cream of society, including the ${vip.vip}! If ${enemy.boss} is not stopped, ${gPron(enemy,"subject")} will extend ${gPron(enemy,"possessive")} grip of corruption to control the city, and then the country!<br><br>You make your way to the nightclub, where the surroundings speak volumes about the vast wealth channeled into the ${possessiveSuffix(enemy.name)} operations. You eventually find ${bossDescription(enemy)}. <%=!rivalpresence ? ``:`But ${gPron(enemy,"subject")} is not alone - ${rival.name} has joined ${gPron(enemy, "object")} in a private party!`%><br><br>${enemy.boss} looks at you and grins. "${gloat[0]}" ${gPron(enemy,"subject")} says. "${gloat[1]}"<br><br>${laconicStatement(enemy)}'),
            illegalgains: _.template('${trail}, you have uncovered ${possessiveSuffix(enemy.name)} ${getMasterPlan()}: to take over Ransom not by force, but by guile. Turns out the premier casino ${casino} is owned by the ${enemy.name}. The illegal business there brings in money from everyone! If the criminally lucrative casino is not shut down, the ${enemy.name} will be able to extend their criminal activities to be too much to handle for a handful of Gladiators such as yourselves.<br><br>You make your way to the casino, where the surroundings speak volumes about the vast wealth channeled into the ${possessiveSuffix(enemy.name)} operations. You eventually find ${bossDescription(enemy)}. <%=!rivalpresence ? ``:`${rivaltext}`%><br><br>${enemy.boss} looks at you and grins. "${gloat[0]}" ${gPron(enemy,"subject")} says. "${gloat[1]}"<br><br>${laconicStatement(enemy)}'),
            personalpower: _.template('${trail}, you have uncovered the most ludicrous ${getMasterPlan()} yet: ${enemy.boss} is channeling the very essence of fortune into ${gPron(enemy, "possessive")} being. The casino floor, usually alight with the sound of luck and the thrill of risk, now thrums with a different kind of energy. At its center, surrounded by slot machines turned arcane conduits, stands ${bossDescription(enemy)}.<br><br>"Behold, the ultimate gamble!" ${gPron(enemy, "subject")} exclaims, as ${gPron(enemy, "possessive")} hands crackle with the raw power of a thousand lost bets and unclaimed jackpots. "With every spin, I grow stronger!" The absurdity of the spectacle is matched only by the danger it represents. "${gloat[0]}" ${enemy.boss} proclaims, while bending the odds of reality itself to ${gPron(enemy, "possessive")} will. "${gloat[1]}"<br><br>${laconicStatement(enemy)}')
        },
        {
            name: "The Ceremony", expansion: "legendofoni", instory: 0, location: ["cursed", "remote"], bystander: "duped acolyte",
            stagebonus: { setup: `Flip 2 objective tokens furthest from a fighter to their active side. Each fighter gains 1 random defense token.` },
            stagepenalty: { setup: `Each fighter must either discard a card at random or place 1 power on "Oni's Vessel".` },
            masterplan: randFrom(["kidnapping", "personalpower", "actsofterror"]), keywords: ["ritual", "oni"], ritual: "Oni",
            gloat: [
                [`You're too late!`, `You're efforts are futile!`],
                [`You won’t stop the inevitable!`, `I’ll end you here, with or without the Oni!`],
                [`I am the Alpha and the Omega. Death and rebirth,`, `And, as you die, so will I be reborn!`],
                [`We've come to end this madness. Your ritual stops here, with the removal of the Oni's urns," you declare.  "Ah, but you see, the moment you set foot in this sacred place, the outcome was already sealed. The urns, mere vessels of a power you cannot begin to comprehend,`, `Do you truly believe you can disrupt the inevitable.`],
                [`Your arrogance blinds you. These urns will not be your salvation but your undoing," you retort. "Arrogance? No, it is you who fail to see the grandeur of my vision,`, `But please, by all means, attempt to stop me!`],
                [`As the pawns have moved into place, attempting to thwart my ascent, I cannot help but savor the irony of your efforts. The urns, imbued with the essence of the Oni, are but the keys to a lock you cannot see. My ritual, a masterpiece of dark intent, is not so easily undone. You believe you fight against the tide of darkness,`, `In truth, you are but insects struggling against the storm.`],
                [`You have come with your misguided valor. Believe you can disrupt the workings of fate if you wish. In the end, it is not the gods who will shape this world, but those who dare to wield the gods' power,`, `My triumph will be not just in the ritual's completion, but in the despair you will feel as your hope turns to ash.`],
                [`You dare to defy me? To disrupt the ritual I have bled for?`, `Your courage will be your undoing!`],
                [`This ends now. Your path of destruction stops with us," your voice a beacon of defiance amidst the gathering storm. "Ends? No, it merely begins! You think you can halt the tide of destiny?`, `With the power of the Oni, I will remake this world in fire and ash!`],
                [`Let this forsaken place bear witness to my wrath. The Oni's urns, keys to the power that will cleanse the world of weakness now pulse with the beat of my heart—a heart blackened by the fires of rage. Today, I am not just a summoner of dark forces; I am the force itself, unstoppable and beyond the ken of mortal men,`, `This day, this moment, will be remembered as the dawn of my reign, forged in fury and unfettered by the chains of the past.`]
            ],
            rivaltext: _.template(' To your dismay ${rival.name}<%=rivalboost ? `, arms engulfed with burning lines of power`: ``%> has joined the ${enemy.minions()} of the ${enemy.name} in the ritual.'),
            hottrail: () => _.template(' in the hopes of preventing ${enemy.boss} from realizing ${gPron(enemy,"possessive")} plans. "${gloat[0]}" calls ${bossDescription(enemy)}. "${gloat[1]}" ${ucInit(gPron(enemy,"subject"))} and ${gPron(enemy,"possessive")} forces have reached the entrance, and now stand ready to engage you!'),
            coldtrail: () => _.template('. ${enemy.boss} and ${gPron(enemy,"possessive")} forces are already starting the ritual. "${gloat[0]}" calls the confident ${bossDescription(enemy)}, ${gPron(enemy,"possessive")} voice echoing off the stone walls. "${gloat[1]}" ${ucInit(gPron(enemy,"possessive"))} forces charge you while ${gPron(enemy,"subject")} continues the ritual.'),
            clueless: () => _.template('. ${enemy.boss} and ${gPron(enemy,"possessive")} forces have already started the ritual, and you feel the the air intensifying. "${gloat[0]}" calls the confident ${bossDescription(enemy)}, ${gPron(enemy,"possessive")} voice echoing off the stone walls. "${gloat[1]}" ${ucInit(gPron(enemy,"possessive"))} forces charge you while ${gPron(enemy,"subject")} finalizes the ritual.'),
            prologue: () => _.template('${trail}, <%=knowledge != "hottrail" ? `you find out about a sighting of the ${enemy.name} near a hidden ${evilPlace()}, and move to investigate` : `you reach the hidden ${evilPlace()}`%>. You see the main chamber of the ancient stone structure is encircled with multiple pedestals, each with a mysterious urn placed on top. The urns are etched with a series of images depicting powerful warriors defeating mighty foes.<br><br>Thinking that these may be part of <%=knowledge == "hottrail" ? `the` : `a`%> ritual, you decide you must quickly remove them from their pedestals${stagevar}<%=rivalpresence ? rivaltext : ``%><br><br>${laconicStatement(enemy)}'),
            captured: _.template('Your captors have brought you into a hidden, ${evilPlace()}, where the air is thick with intensifying heat, and thrown in front of ${bossDescription(enemy)}.<%=rivalpresence ? rivaltext : ``%> "${gloat[0]}" ${enemy.boss} calls out. "${gloat[1]}"<br><br>You see the main chamber of the ancient stone structure is encircled with multiple pedestals, each with a mysterious urn placed on top. The urns are etched with a series of images depicting powerful warriors defeating mighty foes. Thinking that you must be the final part of some dark ritual with the urns, you suddenly fight your captors off, and move in to remove the urns from their pedestals.'),
            finalvar: _.template('<br><br>You arrive at the remote ${evilPlace()}. You see the main chamber of the ancient stone structure is encircled with multiple pedestals, each with a mysterious urn placed on top, with ${bossDescription(enemy)} in the center of it all. "${gloat[0]}" ${gPron(enemy,"subject")} greets you. "${gloat[1]}"<br><br>Thinking the urns must be part of the ritual, you decide you must quickly remove them from their pedestals. "You won\'t stop the inevitable!"<%=rivalpresence ? rivaltext : ``%><br><br>${laconicStatement(enemy)}'),
            kidnapping: _.template('${trail}, you find out where ${enemy.boss} holds the ${vip.vip} -  ${whichPreposition(evilPlace())} sacred to the demonic Oni, and the ${getMasterPlan()} is to sacrifice ${randFrom(["him","her"])} to gain the favor of that cursed spirit.${finalvar}'),
            personalpower: _.template('${trail}, you finally find out that the ${getMasterPlan()} of ${enemy.boss} is to completely bind the cursed Oni spirit with ${gPron(enemy, "reflexive")}, losing the last of ${gPron(enemy, "possessive")} humanity, but gaining power of unimaginable scale.${finalvar}'),
            actsofterror: _.template('${trail}, you finally find out that the ${getMasterPlan()} of ${enemy.boss} is to channel the Oni\'s hellfire, amplifying its wrath through the ancient artifacts, and direct this unleashed fury to scorch the earth, leaving nothing but ashes in its wake.${finalvar}')
        },

        {
            name: "Compromised", expansion: "riseofthekingdom", instory: 0, location: "neutral", bystander: "hostage", pit: 'a broken window of the skyscraper',
            stagebonus: { setup: `Each fighter may search the stage deck for 1 copy of Calming Words and add it to their fighter play area. Shuffle the stage deck.` },
            stagepenalty: { setup: `Each fighter places 1 power on a different "Scared Staff" card.` },
            masterplan: randFrom(["actsofterror", "personalpower", "illegalgains"]), keywords: ["guns", "hostages", "labyrinth"], gunmen: "armed intruders", hostages: "hostages", labyrinth: "complex hallways of the building", gun: `black-market ${randFrom(["Glock", "Desert Eagle", "FN P90", "AK-47", "AR-15", "MP5", "Beretta"])}`,
            gloat: [
                ["I have some bad news for you!", "Nobody will leave this building alive!"],
                ["You think you could be of use as a hostage?", "I have no use for you."],
                [`Let the hostages go," you demand. "And we can work something out?`, `I don't negotiate with Global Gladiators.`],
                [`Why do this? What can you possibly gain from endangering innocent lives?" you demand, your voice echoing slightly in the open-plan office space, the tension palpable in the air. "Gain? This is about sending a message. These 'innocents' are mere pieces in a larger puzzle,`, "You think you understand the stakes, but you're merely scratching the surface."],
                ["Let the hostages go. There's still time to end this without further bloodshed,\" you plead, trying to reason with <%=enemy.boss%>, hoping to find a sliver of humanity within them. \"Bloodshed? I prefer to think of it as negotiation. Each life here holds value, yes, but not in the way you think,", "They are currency, and I intend to spend wisely."],
                [`This spectacle you've created, do you think it will end in your favor? People's lives are at stake!" you exclaim, urgency in your voice. "End in my favor? Oh, it's already a triumph, my heroic interloper. You see, this 'spectacle,' as you call it, is my magnum opus. The lives at stake? Merely the price of admission,`, `The world will remember my name after this — guaranteed.`],
                [`You're delusional if you think you'll walk away from this unscathed. There's still time to end this madness," you reason, trying to pierce the veneer of bravado. "Madness? This is theater, and I, the director and star. Walk away? Gladiator, I plan to take my bow and exit stage left with the world's applause ringing in my ears.`, `You, however, should worry about the next move.`],
                [`As the architect of this grand drama, I've ensured every act, every scene, is dripping with tension and spectacle. The hostages, my unwilling cast, play their roles to perfection — fear, hope, despair. And you Gladiators, always so predictably noble. But you lack vision,`, `You may call me mad; I prefer 'visionary.'`]
            ],
            rivaltext: _.template('<%=(knowledge == "clueless") ? ` Suddenly, a janitor takes off a cap and rips off a fake moustache${rivalboost ? `and snaps the neck of a nearby agent` : ``}! It is ${rival.name} in disguise, an agent for the ${enemy.name}!` : ` ${ucInit(gPron(enemy,"subject"))} is not working alone. Alongside ${gPron(enemy,"object")} is ${rival.name}, ${rivalboost ? `eyes glowing green, a telltale sign of Vandal use!` : `furthering some personal agenda.`}`%>'),
            hottrail: () => _.template(randFrom([
                '${trail}, you rush the offices and strike the ${enemy.minions()} of the ${enemy.name} before they have a proper foothold in the building. "Get behind me!" you shout to the hostages. Scattered around you are the unconscious bodies of the captors, and you know you only have a fleeting moment of respite before the fight begins again. You hear the sound of rapidly approaching footsteps.',
                '${trail}, you arrive at the offices just in the nick of time. <%=randFrom([`The ${enemy.name}`,ucInit(enemy.desc())])%> is ushering their people in, ready to take hostages. You manage to slip ahead of them.  "There\'s no escape," a ${gPron(enemy,"sex")} shouts out. "The ${finalboss.name} needs your operation, and you will abide by our demands. We speak for <%=finalboss.boss == enemy.boss ? `the ${finalboss.name}` : finalboss.boss%> and ${gPron(finalboss, "subject")} speaks for the <%=finalboss.name != "Kingdom" && enemy.name != "Kingdom" ? `Kingdom` : `Master`%>." As panic ensues around the offices, you manage to calm several employees, making sure they keep their heads. Then you make your move on the ${enemy.name}.'
            ])),
            coldtrail: () => _.template('${trail} you conclude the next target of the ${enemy.name}. You arrive at an office building, and know it is too late. Gunshots can be heard inside the building, followed by screams inside and out.  "Call the police!"  several fleeing employees shout, but you know it is futile.  The chances of any Ransom P.D. response is beyond unlikely. The police are as corrupt as the very criminals they are charged to protect the city against. You rush into the building, heedless of all the warnings shouted at you.'),
            clueless: () => randFrom([_.template('${trail}, you investigate a building you believe ${finalboss.name} have been operating out of. As you make your way into the darkened interior, you see a number of people through the windows, held at gunpoint. Hostages! <%= finalboss.boss == enemy.boss ? `You can\'t let ${enemy.boss} get away with this!` : `While ${finalboss.boss} is your primary objective, you can\'t let ${enemy.boss} get away with this!`%>'),
            _.template('<%=stageindex == 0 ? `You are preparing for a hard-earned vacation, but just as you are about to take your leave from Citadel HQ` : `${trail}, you are at the Citadel HQ, reviewing what you\'ve got.  "We\'ve had the intel for a week," Fletch says. "I need to show something to the top brass." "There\'s a lot of dead ends," the analyst says.  "It\'s like they expected us to get the data."  Fletch considers those words.  What if the ${finalboss.name} wanted the Citadel to get a hold of the intel? Just as he was about to call his superiors`%>, a klaxon starts blaring in the facility."Sir!" a technician says. "I\'m picking up multiple hostiles on the scanners!" "Scramble our defenses!" Fletch commands.  "And alert the Global Gladiators!"')]),
            prologue: () => _.template('${stagevar}<br><br>"${gloat[0]}" greets a familiar face that you hoped you might have seen the last of: ${bossDescription(enemy)}. "${gloat[1]}"<%=!rivalpresence ? ``:` ${rivaltext}`%>'),
            captured: _.template('Your hands bound, bags over your heads, you\'re finally dropped off on a cold concrete floor. "Not here!" you hear a ${gPron(enemy, "sex")} shout in anger.  "What can I do with them here?!"  There is a pause, and you hear footsteps receding until the door closes and your world is silent once more.<br><br>You quickly work yourself out of the bonds - the ${enemy.name} needs to invest in a stronger rope! - and make your way to the door you heard close a moment ago. Pushing slowly through it, you see an office on the other side. Standing in there is ${bossDescription(enemy)} and ${gPron(enemy,"possessive")} ${enemy.minions()}, surrounding a group of scared-looking scientists.<%=rivalpresence ? rivaltext : ``%> You know you have to stop ${gPron(enemy,"object")} and free the researchers at once!'),
            actsofterror: _.template('${trail}, you learn that the ${getMasterPlan()} of ${enemy.name} is to execute everyone in ${vip.location} in a show of power. Agent Fletch sits behind the pilot\'s seat of the plane as you lean in from the back. "We\'re coming up on the ${possessiveSuffix(enemy.name)} location," he says to you. "I\'ll see if I can put her down over-" His words are interrupted as an explosion from ${getPropertyValue(enemy, stage, "antiair", "an anti-air shell")} shakes the plane. "Nevermind, looks like you\'re jumping in!"  Grabbing a parachute, you leap from the plane as it peels off and heads toward safety, and crash right into the building.<br><br>"${gloat[0]}" greets ${bossDescription(enemy)}. "${gloat[1]}"<%=!rivalpresence ? ``:` ${rivaltext}`%>'),
            personalpower: _.template('${trail}, you learn that ${possessiveSuffix(enemy.boss)} ${getMasterPlan()} is to force the scientist of a ${randFrom([`cutting edge medical company`,`cybernetics research company`])} to upgrade ${gPron(enemy,"object")} into an enhanced version of ${gPron(enemy,"reflexive")} with their state-of-the art technology. The imbued powers might turn the ${enemy.bosstitle()} truly unstoppable!<br><br>You arrive at the ${randFrom([`research facility`,`headquarters`,`manufacturing facility`])} of the corporation. "There\'s no escape," ${enemy.boss} explains the scientist. "You can rebuild me. You have the technology. Better than I was before. Stronger. Faster. Better!" As panic ensues around the offices, you manage to calm several employees, making sure they keep their heads. Then you make your move on the ${enemy.name}. "${gloat[0]}" greets ${bossDescription(enemy)}. "${gloat[1]}"<%=!rivalpresence ? ``:` ${rival.name} is here, too, ${rivalboost ? `and looks like ${gPron(rival,"subject")} has already gained`: `looking to gain`} some modifications of ${gPron(rival,"possessive")} own!`%>'),
            illegalgains: _.template('${trail}, you learn that the ${getMasterPlan()} of ${enemy.name} to fund the ${enemy.name} operations is to hold the whole ${vip.location} hostage for ransom! Agent Fletch sits behind the pilot\'s seat of the plane as you lean in from the back. "We\'re coming up on the ${possessiveSuffix(enemy.name)} location," he says to you. "I\'ll see if I can put her down over-" His words are interrupted as an explosion from ${getPropertyValue(enemy, stage, "antiair", "anti-air shell")} shakes the plane. "Nevermind, looks like you\'re jumping in!"  Grabbing a parachute, you leap from the plane as it peels off and heads toward safety, and crash right into the building.<br><br>"${gloat[0]}" greets ${bossDescription(enemy)}. "${gloat[1]}"<%=!rivalpresence ? ``:` ${rivaltext}`%>')
        },

        {
            name: "Derailed", expansion: "aftershock", instory: 0, location: ["remote", "neutral"], bystander: "railyard worker",
            stagebonus: { setup: `Any fighter may put this card in their play area. <b>Feint:</b> Search the Stage Deck for an objective card and draw it. Shuffle the Stage Deck.` },
            stagepenalty: { setup: `Resolve the Activate ability on Stage Rules.` },
            masterplan: randFrom(["strengtheningforces", "actsofterror", "illegalgains", "kidnapping"]),
            keywords: ["retrieval"], loot: "the shipments",
            gloat: [
                [`You’re too late, <%=defineAddressing(enemy)%>!`, `This freight is bound for destiny — and you’re stuck on the platform!`],
                [`I built this train to break the world,`, `and you’re first on the tracks!`],
                [`You should’ve stayed behind the crossing gate,`, `Because the crossing light for this train is green!`],
                [`The engines are roaring, the clock is ticking,`, `And you’re nothing but leftover cargo!`],
                [`You're fast, but not fast enough,`, `Next stop: your demise!`],
                [`You think you can stop momentum with fists?`, `Let’s see how you 10,000 tons of fury!`],
                [`Tickets, please,`, `Next stop: Pain!`],
                [`Hope you packed light,`, `Because this train only delivers pain!`]
            ]
            ,
            rivaltext: _.template('<%=rivalboost ? ` Suddenly, one of the tubes crashes open, and a figure can be seen within the steam, kneeling, faced away. It stands, slowly, powerfully built, dripping with green gel. It is the ultimate clone, ${rival.name.toUpperCase()}-EX!<br><br>` : ` Apparently ${enemy.boss} is taking blood samples from ${rival.name}.`%>'),
            hottrail: () => _.template(
                randFrom([
                    '${trail}, you intercept shipment manifests showing an unauthorized loadout by ${enemy.name}. You arrive just as the last containers are secured — but before the engines have cleared the yard.',
                    '${trail} you beat the convoy here, slipping between containers as ${enemy.desc()} scramble to assemble the shipment. ${enemy.boss} is close by, inspecting high-value crates — vulnerable, but not for long.',
                    '${trail} you move fast to the shipping lot, catching the ${enemy.name} mid-operation. The shipment isn’t sealed yet. You have the drop — but if you wait too long, you’ll lose the advantage.'
                ])),
            coldtrail: () => _.template(
                randFrom([
                    '${trail} you track the cargo movements too late to stop the loading. ${ucInit(enemy.desc())} have already secured most of the shipment, and ${enemy.boss} is directing departure orders.',
                    '${trail}, you arrive to find the railyard under tight control. ${ucInit(enemy.desc())} lock down containers with ruthless efficiency. ${enemy.boss} is shouting angrily at ${gPron(enemy, "possessive")} crew, confident it’s already too late.',
                    '${trail}, you make it onto the yard — but ${enemy.name} has fortified the area well. Containers block view and routes, and guards move with grim purpose. The trains are almost ready to roll.'
                ])
            ),
            prologue: () => _.template(
                randFrom([
                    '${stagevar}<br><br>You vault over stacked crates as alarms blare across the yard. ${ucInit(enemy.minions())} scramble to finish loading the last of the cargo. ${enemy.boss} stands atop a switching platform, surveying the chaos with a satisfied smirk. "${gloat[0]}" ${gPron(enemy,"subject")} calls over the din. "${gloat[1]}" ${laconicStatement(enemy)}',
                    '${stagevar}<br><br>You charge into the railyard as engines roar to life. Shipping containers groan against their locks, and ${enemy.minions()} hustle cargo toward waiting flatbeds. ${enemy.boss} doesn’t even flinch as you appear — just signals for the operation to continue. ${laconicStatement(enemy)}',
                    '${stagevar}<br><br>You burst onto the loading tracks as a freighter screeches forward. ${ucInit(enemy.minions())} hustle crates onto flatcars while ${enemy.boss} oversees the operation, barking rapid orders. "${gloat[0]}" ${gPron(enemy,"subject")} shouts without slowing. "${gloat[1]}" ${laconicStatement(enemy)}',
                    '${stagevar}<br><br>As the engines roar to life, you weave between forklifts and shipping containers. ${randFrom(enemy.minionnames)} spots you, shouting warnings, but ${enemy.boss} just smiles from the engine platform — confident you’re already too late to matter. "${gloat[0]}" ${gPron(enemy,"subject")} says, almost amused. "${gloat[1]}" ${laconicStatement(enemy)}'
                ])
            ),
            clueless: () => _.template(
                randFrom([
                    '${trail}, you go through a number of cargo depots — only to find your target at the last on your list, diving into the middle of a full-scale heist. The ${enemy.name} already control the tracks. ${enemy.boss} is just sealing the final shipment.',
                    '${trail}, you expected a smuggling operation, not a full cargo diversion. ${ucInit(enemy.desc())} are already waving trains onto secret routes. ${enemy.boss} nods in approval as the engines scream to life around you.'
                ])),
            captured: _.template(
                randFrom([
                    'The freight car shudders and you jolt to your senses. You climb out of a cargo box labeled “Priority” and peek out. Outside, ${enemy.minions()} rush to finish loading the last container. ${enemy.boss} is too busy inspecting a sealed crate to notice you’ve slipped your bonds. You were never the main prize — just a rolling distraction to buy them time. Now they’re out of time.',
                    'You twist out of the last restraint just as your car’s side door clatters open. ${ucInit(enemy.minions())} are loading cargo at a sprint — whatever this shipment is, you are about to be packed along as excess baggage. ${enemy.boss} checks manifests near the engine cab, unaware the package is no longer secured.',
                    'Your wrist bindings snap against the corner of a cargo rack. ${enemy.boss} paces on a nearby loading platform, casually overseeing their operation. You don\'t exactly know why you are here or where \'here\' is, but you better stop the ${enemy.name} before they advance with their plan. You burst out of the train car.<br><br>"${gloat[0]}" ${gPron(enemy,"subject")} says as ${gPron(enemy, "subject")} notices you. "${gloat[1]}" You’re about to return this delivery <span class = "emphasis">personally</span>.',
                    'You drop to the floor just as the chains give way. ${ucInit(enemy.minions())} are too busy locking down a crate labeled “Priority” to hear you move. ${enemy.boss} oversees the operation from a control car, a smug expression confirming it — this shipment wasn’t just cargo. It was meant to erase a problem. Time to return the favor.'
                ])),
            finalvar: _.template(
                randFrom(['<br><br>You sprint between idling train cars and containers marked with danger symbols. Ahead, ${enemy.minions()} slam a final crate into place as ${enemy.boss} checks a manifest clipboard. "${gloat[0]}" ${gPron(enemy,"subject")} says as ${gPron(enemy, "subject")} notices you. "${gloat[1]}" Whatever’s about to leave this yard — it’s critical.',
                    '<br><br>You skid across an oil-slick platform just as ${enemy.minions()} lock the final container. ${enemy.boss} waves toward the engineer cabin—giving the all-clear. You have seconds before the first engines roll out and the prize vanishes. "${gloat[0]}" ${gPron(enemy,"subject")} shouts at you. "${gloat[1]}" ${laconicStatement(enemy)}',
                    '<br><br>The freight lines tremble as multiple engines rev up. ${enemy.minions()} finish chaining the cargo doors. ${enemy.boss} shouts something over the radio—this shipment isn’t just valuable, it’s <span class = "emphasis">vital</span> to ${possessiveSuffix(enemy.name)}’s rise.',
                    '<br><br>You sprint across the shifting cars as ${enemy.minions()} bolt down the last cargo. ${enemy.boss} watches from the engine platform, unmoved. "${gloat[0]}" ${gPron(enemy,"subject")} shouts, a smile tugging at the corner of ${gPron(enemy,"possessive")} mouth. "${gloat[1]}" ${laconicStatement(enemy)}',
                    '<br><br>The yard erupts into shouting as the engines roar. ${ucInit(enemy.minions())} scatter to their posts. ${enemy.boss} steps into view, framed against the floodlights and steel. "${gloat[0]}" ${gPron(enemy,"subject")} calls out coolly. "${gloat[1]}" ${laconicStatement(enemy)}',
                    'You leap clear of a forklift as it crashes into a stack of crates. ${ucInit(enemy.minions())} rush to regroup while ${enemy.boss} raises a hand, signaling calmly. "${gloat[0]}" ${gPron(enemy,"subject")} says, amusement clear in ${gPron(enemy,"possessive")} voice. "${gloat[1]}" ${laconicStatement(enemy)}',
                    'Engines thunder through the rail lines as the operation nears its climax. ${enemy.boss} stands atop a cargo flat, arms wide like a ringmaster. "${gloat[0]}" ${gPron(enemy,"subject")} booms over the loudspeakers. "${gloat[1]}" ${laconicStatement(enemy)}'
                ])
            ),
            strengtheningforces: _.template(
                randFrom([
                    '${trail}, you have finally uncovered the ${getMasterPlan()}: ${enemy.boss} has been stockpiling advanced weapons and combat drones within the shipment. The trains aren’t just cargo—they\'re a mobile fortress in the making, and if you don’t act, ${enemy.name} will roll out an army no one can stop.${finalvar}',
                    '${trail} you realize the shipment you have tracked for all this time is no shipment at all — the train itself is the real weapon. Reinforced armor, mounted cannons, and a mobile garrison ready to deploy ${enemy.minions()} anywhere. Left unchecked, ${enemy.boss} won’t just escape with the prize — they’ll carve a smoking trail straight through the heart of the country.${finalvar}'

                ])),
            illegalgains: _.template(
                randFrom([
                    '${trail}, you discover the shipment contains stolen tech, black-market weapons, and rare contraband worth a fortune. ${enemy.boss} isn’t just moving goods — ${gPron(enemy, "possessive")} ${getMasterPlan()} is cementing an empire built on corruption, and every crate you let escape is another nail in the city’s coffin. You move in as fast as you can.${finalvar}',
                    '${trail}, you realize the shipment you have been tracking contains more than stolen goods — it’s a rolling auction house of forbidden tech, hidden experiments, and off-the-books arsenals. ${enemy.boss} isn’t just making a fortune — ${gPron(enemy, "subject")} is arming the next generation of villains while you scramble to catch a runaway train.'
                ])
            ),
            actsofterror: _.template(
                randFrom([
                    '${trail}, you piece together the ${getMasterPlan()}: ${enemy.boss} intends to unleash en explosive device hidden within the shipment — something catastrophic enough to devastate entire Ransom City if the cargo gets to its destination. The clock is ticking, and the first freight engine is already throttling up.${finalvar}'
                ])
            ),
            kidnapping: _.template(
                randFrom([
                    '${trail}, you discover ${vip.vip} is hidden inside one of the armored containers at ${whichPreposition(enemy.desc())} run depot, drugged and shackled for transit. ${enemy.boss} isn’t just after money or tech — this is a power play designed to finally put ${vip.location} to its knees and at the mercy of the ${enemy.name}.${finalvar}'
                ])
            )
        },

        {
            name: "Gone Ballistic", expansion: "riseofthekingdom", instory: 0, location: "neutral", bystander: "warehouse worker",
            stagebonus: { setup: `One fighter may move 3 spaces toward the nearest objective token.` },
            stagepenalty: { setup: `Search the Stage Deck for an additional objective card and put it into play. Shuffle the Stage Deck.` },
            masterplan: randFrom(["illegalgains", "strengtheningforces", "actsofterror"]), keywords: ["explosion", "guns", "retrieval"],
            explosions: "stray grenades", gunmen: "armed minions", loot: "the weapons",
            rivaltext: _.template(' turns to you as ${gPron(enemy, "possessive")} partner in trade, ${rival.name},<%=rivalboost ? ` heavily armed and armored,`: ``%> stashes <%=(knowledge == "clueless" || knowledge == "captured") ? "a" : "the"%> ${gizmo}.'), gun: `black-market ${randFrom(["Glock", "Desert Eagle", "FN P90", "AK-47", "AR-15", "MP5", "Beretta"])}`,
            gloat: [
                [`It's better to have a gun and not need it,`, `Than to need a gun and not have it.`],
                [`This is my boomstick,`, `Good or bad, I'm the one with the gun.`],
                [`Seems like you're expecting a war. Or is this just your idea of a negotiating tactic?" you ask, your gaze coolly appraising the arsenal that surrounds your opponent. "In our line of work, firepower is persuasion,`, `But don't worry, I'm sure we can come to an... understanding.`],
                [`All these guns, yet here you are, still afraid to face me without them," you taunt, your confidence undiminished by the overwhelming display of weaponry.  "Afraid? No,`, `I prefer to think of it as being prepared.`],
                [`These aren't just guns, they're a statement,`, `Let the city whisper about tonight. Let them know that when it comes to arms, we're the only game in town.`],
                [`Impressive, isn't it? Each weapon here tells a story — a story of power, control, and survival,`, `You see, in this city, the one with the most guns dictates the future. And I intend to write the next chapter.`],
                [`You thought you had me cornered, but you've merely stepped into my arena,`, `Look around; you're surrounded by the finest arms money can buy, and each one of my followers is eager to demonstrate their... loyalty.`],
                [`Ah, the Gladiators with the bulletproof morality. Admirable, but ultimately naive,`, `Morality won't stop a bullet, nor will it save you from what's coming.`]
            ],
            hottrail: () => _.template(randFrom([
                'pick up whispers and clanking metal, and move closer. Hiding behind a stack of crates, you catch ${enemy.name} in the act, serving <%=finalboss.name == enemy.name ? finalboss.boss : `the enigmatic ${finalboss.boss}`%>. Their trade – heavy arms for an encrypted ${gizmo} – unfolds before you. You listen as plans for further escalation are unwittingly revealed. With enough intel, you emerge from hiding, surprising them in the midst of negotiation.',
                'hear voices nearby. Ducking behind cover, you listen intently to hear that the ${enemy.name} is acting on behalf of <%=finalboss.name == enemy.name ? finalboss.boss : `the ${finalboss.name}`%>.<br><br>They\'re in the middle of a trade giving away heavy artillery in order to get their hands on an encrypted ${gizmo}. The pair in the discussion start to move away, and their voices begin to fade. You creep low, listening carefully as the they spill all the plans. Once you\'ve heard enough, you jump the startled pair.'
            ])),
            coldtrail: () => _.template(randFrom([
                'are led within earshot of the deal by echoes. Concealed by the warehouse\'s skeletal structure, you eavesdrop on ${enemy.name}, who represents <%=finalboss.name == enemy.name ? finalboss.boss : `the shadowy ${finalboss.name}`%>, engaging in a dangerous exchange. Just as you piece together their sinister plot, involving artillery for an encrypted ${gizmo}, your cover is blown by an unseen lookout. "Intruder!" the alert bounces off the metal walls, abruptly ending your surveillance.',
                'hear voices nearby. Ducking behind cover, you listen intently to hear that the ${enemy.name} is acting on behalf of the <%=finalboss.name == enemy.name ? finalboss.boss : `the ${finalboss.name}`%>.<br><br>They\'re in the middle of a trade giving away heavy artillery in order to get their hands on an encrypted ${gizmo}. The pair in the discussion start to move away, and their voices begin to fade. You move quickly to keep up and continue your eavesdropping. "Boss!" a guard calls out. You hadn\'t seen him behind the crates nearby, but when you moved to take cover behind them, you were spotted instantly.'
            ])),
            clueless: () => _.template(randFrom([
                'stumble upon a scene of a deal, and inadvertently alert ${enemy.minions()} stationed around the deal\'s perimeter. "Secure the perimeter!" echoes through the warehouse as you duck behind cover. The air crackles with urgency as the trade – a cache of weapons for a mysterious ${gizmo} – teeters on the brink of chaos, your unexpected arrival sparking immediate hostility."',
                'have to dive for cover behind nearby crates as you run into the ${enemy.minions()} guarding the trade. "Get the guns!" you hear a voice call out. "And get those spies!"'
            ])),
            prologue: () => _.template(randFrom([
                '${trail}, the trail leads you to a nondescript warehouse on the outskirts of the city, rumored to be a hub for the black market. Within its steel-clad walls, the air hums with the tension of illicit transactions. As you meld with the shadows, you ${stagevar}<br><br>The sudden shift in the deal turns lethal: ${enemy.boss} ${enemy.execution(contact)}, seizing control of a sought-after ${gizmo} from the now-silenced opposition.<%=rivalpresence ? ` ${enemy.boss}${rivaltext}` : ``%> "${gloat[0]}" ${gPron(enemy,"subject")} remarks coolly. "${gloat[1]}" ${laconicStatement(enemy)}',
                '${trail}, you locate <%=knowledge == "hottrail" ? `the` : `a suspicious` %> warehouse. You enter, and almost immediately ${stagevar}<br><br>${bossDescription(enemy)}<%=rivalpresence ? rivaltext : `, standing next to the contact for the trade, ${enemy.execution(contact)}, taking ${knowledge == "clueless" ? "a" : "the"} ${gizmo} from the body.`%> "${gloat[0]}" ${gPron(enemy,"subject")} says. "${gloat[1]}" ${laconicStatement(enemy)}'
            ])),
            captured: _.template('Grogginess fades as the chill of the concrete floor seeps into your bones. A voice cuts through the silence, brimming with enthusiasm: "Behold the pinnacle of our engineering prowess! Light, yet robust; adjustable grip for all, dismantles into discreet components. Perfect for those... unexpected altercations." A brief pause hangs in the air, filled with anticipation. "And now, for the demonstration."<br><br>As the ${enemy.minions()} unveil your faces, anticipation turns to shock — ${bossDescription(enemy)} stands there, a gleam of approval in the clients\' eyes as they survey the scene. "We\'ll proceed with the practical application shortly," ${gPron(enemy, "subject")} comments, eyeing the ${gizmo} that the head of the clients casually hands off to an associate — perhaps the item to trade. Just then, <%=rivalpresence ? rival.name : gPron(enemy, "subject")%> notices your alertness to your predicament. "Ah, how timely of you!"'),
            illegalgains: _.template('${trail}, you learn that the ${getMasterPlan()} of ${enemy.boss} to fund the operations of ${enemy.desc()} of ${gPron(enemy,"possessive")} by selling experimental arms to the highest bidder among many rogue nations and shadowy organizations.<br><br>You enter the warehouse where the major deal is happening, and ${bossDescription(enemy)}<%=rivalpresence ? rivaltext : `, standing next to the contact for the trade, ${enemy.execution(contact)}, taking ${whichPreposition(gizmo)} from the body.`%> "${gloat[0]}" ${gPron(enemy,"subject")} says. "${gloat[1]}" ${laconicStatement(enemy)}'),
            strengtheningforces: _.template('${trail}, you learn that the ${getMasterPlan()} of ${enemy.boss} is to arm ${enemy.desc()} of the ${enemy.name} with enough firepower to take over a small country. Not even the military could stop them - it is up to the Global Gladiators to stop ${gPron(enemy, "object")} before it is too late!<br><br>You arrive at the warehouse where the ${enemy.name} is arming themselves. ${ucInit(bossDescription(enemy))} watches your approach rashly. "${gloat[0]}" ${gPron(enemy,"subject")} says to you while ${gPron(enemy, "subject")} hands a gun to <%=rivalpresence ? rival.name : minion%>. "${gloat[1]}"<br><br>${laconicStatement(enemy)}'),
            actsofterror: _.template('${trail}, you find yourself outside a weapons facility operated by <%=rivalpresence ? rival.name : `${enemy.name}`%>. You have learned from your investigations that the ${getMasterPlan()} of ${enemy.boss} is to arm the ${enemy.minions()} with heavy artillery for a targeted, brutal strike on Ransom with maximum civilian casualties. You have no clue what the ${enemy.name} would gain from such orchestrated chaos, but that does not matter now. You will end this here and now.<br><br>"${gloat[0]}" says ${bossDescription(enemy)}, while ${gPron(enemy, "subject")} examines a gun handed by <%=rivalpresence ? rival.name : randFrom(enemy.minionnames)%>. "${gloat[1]}"<br><br>${laconicStatement(enemy)}')
        },

        {
            name: "Higher Purpose", expansion: "lamentofthebloodmoon", instory: 0,
            location: "base", bystander: "startled dockworker",
            pit: "a yawning shaft of industrial silence",
            stagebonus: { setup: `Any fighter may place this card in their play area. <b>Feint:</b> Remove this card from the game to force a minion of your choice drop an objective it is carrying to an adjacent space.` },
            stagepenalty: { setup: `Place 1P power on "Elevator".` },
            masterplan: randFrom(["actsofterror", "kidnapping", "strengtheningforces", "illegalgains"]),
            keywords: ["heights", "retrieval", "swarmed"], explosions: `scattering crate shrapnel`, swarm: `dockhands`, loot: `the cargo`,
            gloat: [
                ["You should’ve stayed home,\" <%=enemy.boss%> says. \"I’m just here for the overtime,\" you grin. <%=ucInit(gPron(enemy, 'subject'))%> grits <%=gPron(enemy, 'possessive')%> teeth. \"Then clock out — permanently,", "You’ll be leaking red by the minute."],
                ["Stacked crates, locked doors, no exits. You’re boxed in.\" \"I’ll make my own exit,\" you grin. \"Head-first through the loading dock, then,", "You're about to go down."],
                ["These crates go international. You? You don’t even leave this dock.\" \"Then let’s change the shipping manifest,\" you smirk. \"Fine. One-way trip to hell,", "Freight class: broken bones."],
                ["This place was built for hard labor and harder endings,", "Loading dock closes in five. So does your heart!"]
            ],
            rivaltext: _.template(', but ${rival.name} appears'),
            prologue: () => _.template(randFrom([
                "${trail}, you arrive at a decaying warehouse hub tucked between forgotten shipping lanes. The only way forward is down—and the elevator’s waiting.<br><br>${stagevar}",
                "${trail}, you find youself at an old industrial site, lights flickering and machinery humming below. A battered freight lift stands open.<br><br>${stagevar}",
                "${trail}, you arrive at a seemingly abandoned freight central. The smell of oil and ozone hangs thick in the air. An elevator platform sits idle nearby, just large enough for you and your answers.<br><br>${stagevar}",
                "${trail}, you arrive at an abandoned shipping depot with more power running through it than expected. The elevator beckons.<br><br>${stagevar}",
                "${trail}, you arrive at a decaying warehouse complex — the air still hums with recent activity. An old industrial elevator waits, open and ready.<br><br>${stagevar}",
                "${trail}, you come to a freight zone wrapped in scaffolding and shadows. The only path down is the battered elevator before you.<br><br>${stagevar}",
                "${trail}, the trail ends at a derelict cargo bay — quiet, but not abandoned. A flickering lift platform rumbles softly, its cage door ajar.<br><br>${stagevar}",
                "${trail}, you push through broken fencing into an overgrown loading area. Ahead, the elevator platform hums with power.<br><br>${stagevar}"
            ])),
            hottrail: () => _.template(randFrom([
                "You hit the warehouse hard and fast — whatever they were doing here, you caught it mid-step. ${randFrom(enemy.minionnames)} yells, \"They’re here!\" as you leap onto the descending freight elevator.",
                "You charge through the upper floor, forcing your way past scattered crates and fleeing workers. The freight lift is still warm. You slam the button and drop in.",
                "You burst through a side entrance as the last of the ${enemy.minions()} flees below. You jump onto the freight lift just before it locks into motion. Someone on the intercom panics: \"They’re on the platform!\"",
                "The upper level is chaos— gear scattered, footsteps fresh. You catch the elevator just as it starts descending. From the intercom: \"Stop that lift! They made it in!\" But you're already moving."

            ])),
            coldtrail: () => _.template(randFrom([
                "The elevator whines as it lowers — you might be too late to stop the cargo, but maybe not the ${enemy.name}. A monitor flickers to life. ${bossDescription(enemy)} stares into the camera, calm and calculating. \"${gloat[0]}\" ${gPron(enemy,\"subject\")} says and glances at a datapad. \"${gloat[1]}\"",
                "You catch the scent of ozone and fresh oil as the platform descends. A nearby speaker crackles. \"Let them come. We're ready.\" You recognize the voice: it's ${enemy.boss}, expecting a confrontation.",
                "The lift drops through half-lit levels—each one buzzing with hurried movement. From a busted panel above, the all-too familiar voice of ${enemy.boss} breaks through: \"ETA sixty seconds. Jump them before they reach us.\" It’s not panic. It’s preparation.",
                "The freight shaft hums. You descend just in time to see shadows moving — too organized for retreat. They knew someone was coming.",
                "Halfway down, a dusty screen springs to life. ${ucInit(bossDescription(enemy))} leans toward the lens, expression flat. \"${gloat[0]}\" ${gPron(enemy,\"subject\")} says while someone yells \"Crate four is sealed!\" offscreen. \"${gloat[1]}\"",
                "Your gut tells you're late. The elevator groans, lights flicker, and an intercom cuts in: \"They finally made it. Begin phase two.\" No need for introductions. ${enemy.boss} was waiting for you.",
                "The platform descends into cold concrete and rhythmic machinery. From the walls, you hear muffled voices: \"They're on the way down.\" Someone was briefed. Someone was waiting.",
                "You spot motion on the camera display just before the feed cuts in. ${enemy.boss} is giving orders fast, then turns to the lift feed. \"${gloat[0]}\" ${gPron(enemy,\"subject\")} says with ${gPron(enemy,\"possessive\")} voice distorted by the cheap system. \"${gloat[1]}\""

            ])),
            clueless: () => _.template(randFrom([
                "You expected silence — but the elevator responds too quickly. As it descends, a screen blinks on. ${bossDescription(enemy)} is already watching. \"${gloat[0]}\" ${gPron(enemy,\"subject\")} says more loudly as crates shift behind ${gPron(enemy,\"object\")} leaning closer to the lens. \"${gloat[1]}\"",
                "You thought this was just another empty warehouse—until the platform began to drop. Midway down, a voice cuts through an overhead speaker: \"They finally found it. Let's give them a welcome.\" You weren’t expected — but you’re definitely noticed.",
                "The lift jolts into motion, and you almost regret pressing the button. Then, the screen flickers on. ${ucInit(bossDescription(enemy))} smirks like this was always part of the plan. \"${gloat[0]}\" ${gPron(enemy,\"subject\")} says, with smirk widening. A faint alarm pulses in the background. \"${gloat[1]}\"",
                "You step into the elevator assuming it's just for recon. Halfway down, you hear it — footsteps. Movement. An unseen voice from a wall speaker: \"Camera two active. They're on their way.\" You suddenly wish you'd knocked.",
                "The lift descends, slower than expected, as if it knows you're hesitating. A screen crackles on. ${enemy.boss} glances at the monitor, not surprised at all. \"${gloat[0]}\" ${gPron(enemy,\"subject\")} raises ${gPron(enemy,\"possessive\")} voice as behind ${gPron(enemy,\"object\")}, equipment is already being moved. \"${gloat[1]}\"",
                "You weren’t sure you’d find anything. But now, descending into dim light and echoing steel, you hear a faint voice through the static: \"Don’t stop the lift, we don't want any interruptions. Just stop them.\" That wasn’t a random message.",
                "The elevator cage rattles downward. You were expecting dust, not broadcast. But here it is — an active screen. ${bossDescription(enemy)} turns from a console and speaks directly to the camera. \"${gloat[0]}\" ${gPron(enemy,\"subject\")} exclaims, while a container is sealed in the background. \"${gloat[1]}\"",
                "You enter cautiously, thinking this was just another empty lead. The elevator lowers—then a PA system crackles to life: \"They’re coming. Finish the loadout. And finish those Gladiators!\" You’re not intruding. You’re invited."
            ])),
            captured: _.template(randFrom([
                "You come to with a dull ache and the taste of rust. The platform rattles beneath you, descending into shadow. ${ucInit(enemy.minions())} stand guard, silent but alert. ${randFrom(enemy.minionnames)} mutters, \"The boss wants eyes on 'em till the end.\" You steel yourself, snap the restraints with a surge of fury, and drive your knee into the nearest jaw.",
                "The lift groans like a dying beast. You're zip-tied to a railing, half-slumped between crates. ${randFrom(enemy.minionnames)} leans in and says, \"You're lucky they want you alive.\" But luck cuts both ways. You rip free, swing the crate lid up, and make it count.",
                "Flickering lights and the screech of pulleys greet you as you wake. ${ucInit(enemy.minions())} line the edges of the descending platform like statues. One checks their weapon. No one speaks. You twist your wrists, pop the cuffs loose, and launch yourself forward like a coiled spring.",
                "You're bound at the wrists, knees stiff, sitting between crates marked with hazard symbols. The elevator drops deeper with every second. ${randFrom(enemy.minionnames)} smirks, \"Hope you like surprises.\" You give 'em one, back—shatter your binds and drive an elbow into their ribs.",
                "Everything smells like oil and blood. You blink, chained to a support bar, flanked by ${enemy.minions()}. ${randFrom(enemy.minionnames)} mutters, '${enemy.boss} will want to see these personally.' You grunt, brace yourself, and hurl the chain over their head like a whip.",
                "Chains clink as the elevator descends. ${ucInit(enemy.minions())} stand still, but you can feel their eyes. Someone whispers, \"They wake up again, break something.\" So you do. Your arms snap free, and the nearest guard hits the floor before they even know you’re up."
            ])),
            strengtheningforces: _.template(randFrom([
                "${trail}, you arrive at a warehouse that functions as the armory, the factory, and the bootcamp. Crates of riot armor, ordnance, combat drug injectors, and encrypted comms are being locked down and shipped out. The recruits are ready. The war is starting. ${finalvar}",
                "${trail}, you arrive at a fortified loading zone where they’ve been building toward this for months — tanks tuned, enhancements tested, loyalty bought. The cargo floor is swarming with loaders packing assault kits and synthetic soldier vests. You’re here to stop a deployment. ${finalvar}"
            ])),
            actsofterror: _.template(randFrom([
                "${trail}, you arrive at a warehouse that isn’t just where the terror was made—it’s where it’s being launched. Below, crates of explosive devices are being loaded into trucks bound for the city. The ${enemy.minions()} aren't running—they're delivering destruction. ${finalvar}",
                "${trail}, you arrive at the final link in the chain. The warehouse floor below is alive with movement: timers are being set, payloads are being sealed. They're not hiding anymore. They're sending a message in flame. ${finalvar}"
            ])),
            /*          personalpower: _.template(randFrom([
                        "${trail} Beneath the warehouse, power thrums through ritualized tech. Minions load arcane fuel cells, grafted limbs, and sealed stasis crates onto glowing platforms. Whatever’s inside them is feeding the thing ${enemy.boss} is becoming. ${finalvar}",
                        "${trail} This place was a lab, then a shrine — now it’s a crucible. Crates of bio-mechanical constructs, restructured nerves, and pulsing machinery are being transported into a central core. ${enemy.boss} isn’t leaving. ${ucInit(gPron(enemy,'subject'))} is ascending. ${finalvar}",
                      ])),*/
            illegalgains: _.template(randFrom([
                "${trail}, you follow the money — right into its distribution center. The ground level alone is covered in shrink-wrapped bricks of currency, contraband tech, and liquid narcotics.${finalvar}",
                "${trail}, you arrive at the edge of a fast-moving operation. Below, forklifts rush to finish the payout: cases of forged credentials, high-grade stimulants, and military surplus get packed like candy. This isn’t just profit — it’s pure power. ${enemy.boss} is cashing out hard. ${finalvar}"
            ])),
            kidnapping: _.template(randFrom([
                "${trail}, you arrive to find that ${vip.vip} isn’t just bait — ${gPron(vip, 'subject')}'s cargo. Below, containment crates are being bolted shut, with ${gPron(enemy,'possessive')} agents loading them next to escort tech and decoy intel. Whatever they’re planning for ${vip.location}, it’s already in motion. This isn’t an escape. It’s a final exchange. ${finalvar}",
                "${trail}, you arrive just as the extraction begins. ${vip.vip} is in one of the sealed capsules on the warehouse floor below, indistinguishable from the rest — unless you act fast. ${enemy.boss} doesn’t just want ${gPron(vip, 'object')} gone. There’s something huge coming for ${vip.location}, and this is the first move. ${finalvar}"
            ])),
            finalvar: _.template(randFrom([
                "<br><br>The freight elevator descends with a shriek of steel cables. Cargo sways. A flickering monitor flares to life — ${bossDescription(enemy)} grins into the feed. \"${gloat[0]}\" ${gPron(enemy,'subject')} says as sparks scatter across the screen. \"${gloat[1]}\" Then the ceiling above ruptures. ${ucInit(enemy.minions())} drop in through a service hatch, landing hard and ready. No time to breathe.",
                "You enter the cargo elevator.<br><br>Chains rattle. The platform creaks. The screen flickers to life, showing ${enemy.boss}, arms crossed, flanked by loading equipment. \"${gloat[0]}\" ${gPron(enemy,'subject')} says coolly as cargo cranes move behind. \"${gloat[1]}\" Then the wall panels burst open — ${ucInit(enemy.minions())} flood in from side alcoves, shouting and swinging. It's on.",
                "<br><br>The elevator slams downward past an open maintenance floor — too fast to react. Too late. ${ucInit(enemy.minions())} leap from the ledge above, landing between you and the nearest crate. Before you can shout, the monitor lights up. ${ucInit(bossDescription(enemy))} smirks into the lens. \"${gloat[0]}\" ${gPron(enemy,'subject')} says as alarms flicker in the background. \"${gloat[1]}\"",
                "<br><br>As the elevator drops, a low hum pulses through the deck beneath you. You’re not alone. From beneath tarps and false crates, ${enemy.minions()} erupt with a yell. The screen activates mid-motion — ${enemy.boss} leans toward the camera. \"${gloat[0]}\" ${gPron(enemy,'subject')} snarls, barely audible over the chaos. \"${gloat[1]}\"",
                "There's only one way - down.<br><br>You brace yourself as the platform descends — but the threat isn’t below. From scaffolding above, ${ucInit(enemy.minions())} rappel down, feet slamming onto crates, hands already swinging. The screen hisses to life. ${bossDescription(enemy)} speaks through static. \"${gloat[0]}\" ${gPron(enemy,'subject')} says with a cruel smile as sparks dance on steel. \"${gloat[1]}\"",
                "You enter the elevator cabin and hit the button.<br><br>The descent starts calm — too calm. Then floor access hatches clang open. ${ucInit(enemy.minions())} rise from hidden compartments, ready for a scrap. The screen overhead buzzes to life. ${enemy.boss} watches with satisfaction. \"${gloat[0]}\" ${gPron(enemy,'subject')} says as explosions rock the bay beneath you. \"${gloat[1]}\""
            ]))

        },

        {
            name: "Market Crash",
            expansion: "tideofthedragon",
            instory: 0,
            location: "urban",
            bystander: "market vendor",
            stagebonus: { setup: `Place 1P defence tokens on this card as Spring-Up tokens. Any player may spend Spring-Up tokens from this card to enter a Market Stall space.`},
            stagepenalty: {setup: `Search the stage deck for a copy of Bottleneck, and play it. Shuffle the Stage Deck.`},
            masterplan: randFrom(["illegalgains", "actsofterror"]),
            keywords: ["hostages","retrieval", "guns"],
            gunmen: "armed enforcers",
            hostages: "terrified stall owners",
            loot: "the protection money",
            gloat: [
                [`Look around you — commerce doesn’t stop just because someone gets in the way.`,`It simply replaces the obstacle.`],[`These stalls, these workers, this crowd — they all know the rules here.`,`You either pay... or you pay later.`],[`Order isn’t created by law or heroes.`,`It’s created by whoever controls the fear.`],
                [`You think you’re protecting these people.`,`But they were safer the moment they learned to obey.`],
                [`Markets live and die on confidence.`,`And right now, everyone here trusts me more than you.`],
                [`You want to make this personal — I understand.`,`But this is strictly business.`],
                [`A crowd is the perfect battlefield.`,`Your conscience slows you down — mine never does.`],
                [`There’s profit in chaos.`,`And today’s yield looks very promising.`]],
            rivaltext: _.template(
                '<%=rivalboost ? ` As you cut through the chaos, ${rival.name} drops from a sagging awning, landing between you and ${enemy.boss}. For a moment, the crowd parts — everyone can feel the grudge in the air.` : ` The clash twists through the maze of stalls until a familiar voice cuts through the panic. ${rival.name} steps out from behind an overturned cart, clearly here on ${gPron(rival,"possessive")} own terms.` %>'
            ),

            hottrail: () => _.template(
                randFrom([
                    '${trail}, you trace a string of shaken vendors all giving the same story: thugs demanding stall fees and smashing stock when refused. The trail leads straight to the busiest open-air market in the district — and collection time is now.',
                    '${trail}, you locate ${enemy.minions()} moving cash through the back alleys, steering terrified vendors toward a central plaza. The more you listen, the clearer it becomes: the market itself has become ${enemy.boss}’s personal toll booth.'
                ])
            ),

            coldtrail: () => _.template(
                randFrom([
                    '${trail}, you arrive to find overturned carts and shaken vendors counting their remaining stock. The big payoffs have already been dragged toward the far exits, guarded by ${enemy.minions()} using civilians as moving cover.',
                    '${trail}, you reach the market after the first round of "collections". Stalls near the main street are stripped clean, and rumors say ${enemy.boss} is already preparing to move the take off-site.',
                    '${trail}, you push through a crowd of frightened shoppers while ${enemy.minions()} tighten their formation near the side streets. The cash is bagged, the exits are watched, and every second you lose gives ${enemy.boss} more room to escape.'
                ])
            ),

            prologue: () => _.template(
                randFrom([
                    '${stagevar}<br><br>Canvas awnings flap overhead as vendors shout, argue, and beg. Coins jingle, crates crash, and terrified shoppers surge like a living tide. In the middle of it all, ${enemy.boss} stands on a toppled stall, counting thick rolls of cash while ${enemy.minions()} shove civilians toward the exits.<br><br>"${gloat[0]}" ${gPron(enemy,"subject")} calls out over the chaos. "${gloat[1]}"',
                    '${stagevar}<br><br>A crate of fruit explodes at your feet as a fleeing shopper trips, sending produce rolling across the cobbles. Above, minions leap from stall to stall, using the sagging canvas as springboards toward the side streets. ${enemy.boss} doesn’t even look worried — not with so many scared bodies between you and the money.',
                    '${stagevar}<br><br>The market should be all color and noise, but today the sound is different — tighter, meaner. Vendors pass stuffed envelopes down the line while ${enemy.minions()} drag anyone who hesitates toward the edge of the square. ${enemy.boss} watches from atop a shaded stall, one boot grinding into a collapsed awning as ${gPron(enemy,"subject")} gives the signal to move out.'
                ])
            ),

            clueless: () => _.template(
                randFrom([
                    '${trail}, you follow rumors of market trouble expecting shoplifters or a simple shake-up. Instead, you step into a warzone of overturned stalls and crying vendors as ${enemy.minions()} form a living wall around the exits.',
                    '${trail}, you cut through the side streets thinking you’re just on patrol — until a stampede of shoppers barrels past, screaming about protection collections gone bad. By the time you reach the plaza, ${enemy.boss} is already using the panicked crowd as a shield.',
                    '${trail}, you came looking for a quiet stakeout spot and found a festival of fear. Only when you see bags of cash changing hands and vendors forced to their knees do you realize: you’ve walked in right as ${enemy.boss} closes the books on this district.',
                    'You have given up your hopes of finding anything on ${finalboss.boss}, and have retreated to ponder your life choices at a small back-alley joint. "In tonight\'s news," barks the television set in the corner of the bar, "local authorities say they are unable to stop the ongoing wave of extortion and forced collections in the Old Market District. Vendors report being harassed, robbed, and threatened." A shaky clip shows overturned produce crates and terrified shoppers running for cover.<br><br>"Residents are urged to avoid the area until further notice," the reporter continues. "City leadership has issued no official statement. Business owners insist the market will remain open regardless of the escalating violence."<br><br>You stare at your drink for a long, heavy second — then slam the glass down, pay your tab, and head for the street. The market is only a few blocks away, and your gut twists with a familiar certainty: this reeks of <%=finalboss.name === enemy.name ? finalboss.boss : `the ${finalboss.name}` %>.<br><br>When you arrive, you’re not surprised to see the market already packed again — and the ${enemy.name} patrolling like they own the place. Time to take a closer look... assuming you can avoid ${possessiveSuffix(enemy.boss)} goons long enough to do so.'

                ])
            ),

            captured: _.template(
                randFrom([
                    'You wake up sprawled across a torn canvas awning, wrists bound to a bent support pole. Below, the market slowly reopens under new “management.” Vendors hand over heavier envelopes while ${enemy.minions()} strut between stalls. Their glances aren’t pity — they’re amusement. You weren’t spared by accident. ${enemy.boss} wanted you conscious long enough to witness the moment the city bends. One sharp pull will snap the pole — and the second you move, the whole market will erupt.',

                    'Consciousness returns with the taste of dust and spices on your tongue. You’re wedged beneath a collapsed stall, half-covered in crates while civilians pretend not to see you. Near the main gate stands ${enemy.boss}, laughing with enforcers and counting tribute like trophies. You should be dead — but instead, you’ve been staged like a failed warning. Their message is simple: even the city’s defenders kneel. Your hands loosen, muscles tense. The next breath isn’t hiding — it’s the signal.',
                    
                    'You come to inside a shuttered stall, tied to a central post while muffled bargaining resumes on the other side of thin wood. Every so often, a minion checks to ensure you’re still awake — still \<span class = "emphasis"\>watching\</span\>. You weren’t spared out of mercy; you were meant to see how thoroughly the ${enemy.name} own this place. Coins exchange hands again. Fear becomes routine. That’s when you feel it — the rope gives. This ends now.'
                    
                    
                ])
            ),
            
            actsofterror: _.template(randFrom([
                '${trail}, and the truth finally takes shape: every mode that ${enemy.name} has made this far was a step toward total dominance. You push through the last crowded street and reach the open-air market just as the final act begins. Tents are slashed open, goods smashed underfoot, and terrified merchants are forced to kneel beside their ruined stalls. The last payments have already been collected — now the ${enemy.name} are here to show what happens to anyone who ever thinks about saying no. This isn’t business anymore. It’s terror, staged for Ransom City to remember.<br><br>${enemy.boss} turns slowly toward you and says, "${gloat[0]}" A heartbeat later, quieter but sharper: "${gloat[1]}"',
            
                '${trail}, and your stomach sinks — ${enemy.name} is going to send a message Ransom City will never forget. You cut across back alleys toward the open-air market as smoke rises and civilians flee in panic. When you arrive, the plaza has transformed into a stage of fear: smashed carts form makeshift walls, flames lick at cloth awnings, and the ${enemy.name} guard civilians like prisoners. Those who couldn’t or wouldn’t pay are singled out, forced into the center while the rest are made to watch. This is a public act of terror, designed to keep an entire city obedient.<br><br>${enemy.boss} acknowledges your arrival: "${gloat[0]}" ${ucInit(gPron(enemy, "subject"))} continues with absolute confidence: "${gloat[1]}"',
            
                '${trail}, and the realization hits hard: ${enemy.boss} has created an extortion scheme that\'s never just about money — it\'s about obedience purchased with fear. You sprint toward the market as warning sirens echo across the district and terrified vendors scatter. When you arrive, you see order through destruction — the ${enemy.name} have turned the stalls into a killing ground in waiting, a public example of what happens when resistance flickers. The cash has already changed hands; this spectacle is meant to make sure it never has to be argued for again. Everyone here has already heard the message. Now you have too.<br><br>${enemy.boss} steps into view, as if you arrived exactly on cue: "${gloat[0]}". Then ${gPron(enemy, "subject")} finishes the thought like a verdict: "${gloat[1]}"'
            ])),
            
            illegalgains: _.template(randFrom([
                '${trail}, and the scale of the ${getMasterPlan()} finally hits with crushing clarity — the protection racket was never the point. It was the foundation. You race toward the open-air market as encrypted transfers ripple through nations, offshore networks light up, and entire sectors of the city’s economy buckle. When you arrive, crates of luxury goods, weapons, currency, and data drives are packed with military precision. The ${enemy.name} aren’t collecting anymore — they’re ascending.<br><br>${enemy.boss} watches the operation with the satisfaction of someone who already considers the city a completed acquisition: "${gloat[0]}" ${ucInit(gPron(enemy, "subject"))} then adds, as if the future is carved in stone: "${gloat[1]}"',
                
                '${trail}, and the truth finally sets in — the protection racket wasn’t about dominance here. It was a launchpad. You push toward the marketplace as secure channels flood with acknowledgments from foreign syndicates, investors, and warlords. By the time you reach the plaza, the scene is unforgettable: extorted wealth sorted by destination, encrypted ledgers finalized, and terrified merchants made to witness the moment their oppressors evolve past needing their obedience. This isn’t a payday.<br>It’s an entry fee to the global stage.<br><br>${enemy.boss} turns toward you, more amused than concerned: "${gloat[0]}" ${ucInit(gPron(enemy,"subject"))} lets out a low, knowing laugh before delivering the final line: "${gloat[1]}"',
                
                '${trail}, and everything aligns — the intimidation, the “fees,” the disappearances, the silence from those who resisted. It all led here: the final consolidation before the market, the city, and every fearful voice in it are irrelevant. You sprint toward the open-air market just as the last armored cases are sealed, the final transfers confirmed, and the escape routes activated. The ${enemy.name} aren’t just stealing wealth — they’re buying a seat at a bigger table.<br><br>The era of paying tribute is over.<br>Now others will pay *them*.<br><br>${enemy.boss} greets you like someone wrapping up a legacy, not starting a confrontation: "${gloat[0]}" Then ${gPron(enemy,"subject")} ends it with the weight of inevitability: "${gloat[1]}"'
                ])),
                
                    
        },


        {
            name: "Meltdown", expansion: "aftershock", instory: 0, location: "base", bystander: "panicking power plant worker",
            stagebonus: { setup: `Any fighter may put this card in their play area. <b>Feint:</b> Resolve the <b>Interact</b> on the Stage Rules card as if you were standing in any one objective's space.` },
            stagepenalty: { setup: `Discard the top 3 cards from the stage deck.` },
            masterplan: randFrom(["personalpower", "actsofterror", "illegalgains"]),
            keywords: ["hostages", "gunk", "explosions"],
            explosion: "reactor bursts",
            pit: whichPreposition(randFrom(["hollow coolant shaft", "silent heat chute", "dusty turbine hollow", "empty reactor core"])),
            gunk: "a container of radioactive waste",
            hostages: "innocent power plant workers",
            gloat: [
                [`Shut it down, <%=enemy.boss%>! There’s still time!\" you yell. \"Time is the fuel,`, `And it’s already burning.`],
                [`You can't possibly control this!\" you shout as the reactor pulses violently. \"Control? Maybe not,`, `But I can RIDE it to glory!`],
                [`This will kill you too!\" you say, looking through the steam. \"If I die, I die,`, `But I’ll die eternal, remembered!`],
                [`So this is your solution? Meltdown and madness?\" you challenge <%=enemy.boss%>. \"No... \<span class = 'emphasis'\>Deterrence\</span\>,`, `The world listens when it glows red-hot.`],
                [`You’d kill thousands just to feel powerful?\" you shout, amazed at the audacity. \"Power isn’t felt — it’s \<span class = 'emphasis'\>measured\</span\>,`, `In megatons.`],
                [`We’ve shut you down before. We’ll do it again,\" you say with gravity. \"And yet here you are,`, `Glowing with fear and radiation.`],
                [`You’re just in time to witness the chain reaction,`, `And just too late to stop it.`],
                [`So many safeguards, so many protocols,`, `And not one of them stopped me.`],
                [`The rods are out, the core is primed,`, `And you brought nothing but hope.`],
                [`You fear the meltdown,`, `But I AM the meltdown.`],
                [`You think I’d risk annihilation without reward?`, `This is \<span class = 'emphasis'\>investment\</span\>.`],
                [`Let it melt. Let it roar,`, `Only the strong will survive the fire.`]
            ],
            rivaltext: _.template('<%=rivalboost ? ` Suddenly, one of the tubes crashes open, and a figure can be seen within the steam, kneeling, faced away. It stands, slowly, powerfully built, dripping with green gel. It is the ultimate clone, ${rival.name.toUpperCase()}-EX!<br><br>` : ` Apparently ${enemy.boss} is taking blood samples from ${rival.name}.`%>'),
            hottrail: () => _.template(
                randFrom([
                    "you intercept scrambled reactor logs and arrive through a rear ventilation shaft, bypassing the main alarms. The reactor is unstable — but not lost. ${ucInit(enemy.desc())} haven’t noticed your entry. You’ve got a chance — if you act fast.",
                    "you intercept the ${enemy.name} schematics and reroute through a forgotten access corridor. You breach the facility just as ${enemy.boss} begins the startup sequence. ${ucInit(gPron(enemy, 'subject'))} hasn’t noticed you — yet."
                ])),
            coldtrail: () => _.template(
                randFrom([
                    "you trace the reports to this facility, arriving just as the lockdown begins. ${ucInit(enemy.minions())} flood the command tier, and the core glows dangerously. There’s no turning back now.",
                    "you follow traces of radiation spikes and black-market energy siphons straight to the plant. The facility’s been overrun by ${enemy.desc()}, and the control rods are already being extracted. ${enemy.boss} sees you enter—and smiles."
                ])
            ),
            clueless: () => _.template(
                randFrom([
                    "arriving at the power plant you expected an energy theft or weapons deal — not a facility seconds from implosion. You step inside just as the inner blast doors seal. The temperature’s climbing, and every screen flashes with ${enemy.name} encryption.",
                    "you arrive at the power facility, expecting at most sabotage, not a full meltdown. There are no guards — just open doors and rising heat. Then you see the symbol of ${enemy.name} etched into the steel floor… and realize you’ve walked into something far worse."
                ])
            ),
            prologue: () => _.template(
                randFrom([
                    "${trail}, ${stagevar}<br><br>Once inside, heat rolls out at you like a furnace blast. ${ucInit(enemy.minions())} scatter across catwalks and stairwells, frantically carrying components and canisters. ${enemy.boss} stands beside the glowing reactor control panel, arms spread in triumph. \"${gloat[0]}\" ${gPron(enemy, \"subject\")} calls out. \"${gloat[1]}\"<br><br>${laconicStatement(enemy)}",
                    "${trail}, ${stagevar}<br><br>Warning sirens wail overhead as you enter the lobby — a concrete cathedral of steam, cables, and panic. Control panels spark, and hazmat suits lie crumpled on the floor. ${ucInit(enemy.minions())} swarm the walkways, bolting down components or tossing them aside. ${enemy.boss} turns, flanked by glowing coolant tanks. \"${gloat[0]}\" ${gPron(enemy, 'subject')} says, voice calm against the chaos. \"${gloat[1]}\"<br><br>${laconicStatement(enemy)}"
                ])),
            captured: _.template(
                randFrom([
                    "You jolt awake in the dim glow of the control room. Red strobes pulse with every screaming alarm. Footsteps hammer the metal floor — and then you see ${enemy.boss} emerging through a burst of smoke, a shadow among the flashing lights. Above the reactor core, ${enemy.desc()} swarm across the catwalks. Sparks rain down from the ruptured ceiling as the entire power plant trembles<br><br>\"${gloat[0]}\" ${gPron(enemy,'subject')} bellows, voice slicing through the chaos like a blade. \"${gloat[1]}\"<br><br>The truth hits you — ${enemy.boss} wants to turn this reactor into a tomb.<br><br>${laconicStatement(enemy)}",
                    "Your vision clears just as another klaxon erupts. You’re strapped into a chair in what looks like a reactor access terminal. Monitors show core temperature rising fast. ${enemy.name} symbols flash on every console. ${enemy.boss}, haloed in green light has been observing you. \"${gloat[0]}\" ${gPron(enemy,'subject')} sneers. \"${gloat[1]}\" Reactor alarms scream around you. ${ucInit(gPron(enemy, 'possessive'))} hand hovers on the main console, daring you to stop the meltdown.<br><br>${laconicStatement(enemy)}",
                    "You come to on a steel platform suspended over the exposed reactor chamber. Radiation warnings blare from every speaker. Below, ${enemy.minions()} move with eerie coordination. ${ucInit(bossDescription(enemy))} stands at the far end, watching you stir. \"${gloat[0]}\" ${gPron(enemy, 'subject')} hisses. \"${gloat[1]}\" You shove aside loose grating and haul yourself up. Heat and smoke swirl in the air, the scent of burning metal filling your lungs.<br><br>${laconicStatement(enemy)}"
                ])),
            finalvar: _.template(
                randFrom([
                    'You <%= randFrom([`step into the lobby where the linoleum has begun to bubble`, `descend a buckled access ramp under sparking fluorescent lights`, `enter the turbine chamber repurposed as a staging ground`, `force your way through a collapsing service tunnel`]) %>. The walls hiss with escaping steam. Pressure valves scream in protest. Warning klaxons overlap — one for radiation, one for coolant failure, and another that simply reads: \'NO RETURN\'.<br><br>',
                    'You <%= randFrom([`arrive in the reinforced central lobby`, `push through the half-melted blast doors`, `emerge from the service tunnel into the heart of the plant`, `descend into the main control concourse`]) %>. Radiation alarms blare in short bursts, and emergency lights flicker above cracked concrete walls. The reactor pulses behind layered glass, its glow rising and falling like a mechanical heartbeat. Panic lingers in the air—but the real danger hasn’t yet escaped.<br><br>',
                ])
            ),
            personalpower: _.template(
                randFrom([
                    '${trail}, the ${getMasterPlan()} becomes clear—${enemy.boss} isn’t running from the meltdown. ${ucInit(gPron(enemy,"subject"))} is embracing it, merging with it. The core’s radiation twists around ${gPron(enemy,"possessive")} body, transforming it into something elemental. ${finalvar}${bossDescription(enemy)} hovers above the control rods, eyes burning like twin suns. \"${gloat[0]}\" ${gPron(enemy,"subject")} intones, voice warping with energy. \"${gloat[1]}\"<br><br<${laconicStatement(enemy)}',
                    '${trail}, your realize the ${getMasterPlan()}: the reactor isn’t a target — it’s a crucible. ${enemy.boss} intends to absorb the core’s energy and emerge reborn as something post-human. ${finalvar}${bossDescription(enemy)} stands at the heart of a containment ring, tendrils of energy crawling toward ${gPron(enemy, "possessive")} skin. \"${gloat[0]}\" ${gPron(enemy,"subject")} whispers as the lights dim around ${gPron(enemy,"object")}. \"${gloat[1]}\"<br><br<${laconicStatement(enemy)}'
                ])),
            actsofterror: _.template(
                randFrom([
                    '${trail}, the panic was never a cover or a trick — it IS the ${getMasterPlan()}. ${enemy.boss} wants the world to see what happens when civilization melts. The reactor core has minutes left, and the failsafes are offline. ${finalvar}From the catwalk above the control floor, ${enemy.boss} watches the countdown tick down. \"${gloat[0]}\" ${gPron(enemy,"subject")} says as klaxons rise to a scream. \"${gloat[1]}\"',
                    '${trail}, you uncover the full horror of the ${getMasterPlan()}: this isn’t just a meltdown — it’s a live event. The ${enemy.name} has hijacked every broadcast frequency in Ransom City to make the city watch itself burn. ${finalvar}Cameras hover midair, capturing the chaos from every angle. ${enemy.boss} raises a trembling hand to the lens. \"${gloat[0]}\" ${gPron(enemy,"subject")} says, smiling as the countdown beeps escalate. \"${gloat[1]}\"<br><br<${laconicStatement(enemy)}'
                ])
            ),
            illegalgains: _.template(
                randFrom([
                    '${trail}, you uncover a darker angle to ${possessiveSuffix(enemy.boss)} ${getMasterPlan()}: the reactor core isn\'t the weapon—it\'s the <b>product</b>. Rare unstable isotopes harvested mid-meltdown are being sold to warlords, rogue states, and arcane engineers. ${finalvar}${ucInit(enemy.minions())} in lead-lined suits extract glowing canisters from open chambers as ${enemy.boss} oversees the auction feed. \"${gloat[0]}\" ${gPron(enemy,"subject")} announces, watching the value rise. \"${gloat[1]}\"<br><br<${laconicStatement(enemy)}',
                    '${trail}, you discover the ${getMasterPlan()}: ${enemy.boss} isn’t trying to destroy the city — ${gPron(enemy,"subject")} is *selling* the meltdown. Energy derivatives, chaos-futures, black-market core fragments—an economy of destruction. ${finalvar}Hazmat-suited ${enemy.minions()} work terminals beside glowing coolant tanks. ${enemy.boss} gestures grandly to a reactor graph ticking upward. \"${gloat[0]}\" ${gPron(enemy,`subject`)} says as currency figures roll in. \"${gloat[1]}\"<br><br<${laconicStatement(enemy)}'
                ])
            )
        },

        {
            name: 'Mob Rules', expansion: "stretchgoals18", instory: 0,
            location: 'base', bystander: "server",
            stagebonus: { setup: `Search the stage deck for a copy of On the House, and play it. Shuffle the Stage Deck.` },
            stagepenalty: { setup: `Each fighter must search the stage deck for a copy of The Main Course, and put in into play. Shuffle the stage deck.` },
            masterplan: randFrom(["kidnapping", "actsofterror", "strengtheningforces", "illegalgains"]),
            keywords: ["hostages", "guns", "retrieval"], gunmen: "armed mobsters", hostages: "panicked diners", loot: "the money",
            rivaltext: _.template('<%=rivalboost ? `. Leaping from the shadows in the trees, ${rival.name} ambushes you!` : ` and to your dismay you find that ${rival.name} has joined forces with ${enemy.boss}.` %>'),
            prologue: () => _.template(randFrom([
                '${stagevar} "Take the cash, leave the pepperoni," ${enemy.boss} snaps to ${enemy.minions()} and the mobsters without taking ${gPron(enemy,"possessive")} eyes off you. "${gloat[0]}" ${enemy.boss} sneers. "${gloat[1]}"',
                '${stagevar} "We\'re done here, boys — grab the loot, forget the leftovers," ${enemy.boss} mutters, dusting off ${gPron(enemy,"possessive")} hands as they square up to face you. "${gloat[0]}" ${enemy.boss} grins coldly. "${gloat[1]}"',
                '${stagevar} "Take your cut and disappear. This part’s on me," ${enemy.boss} says, rising from the table and locking eyes with you. "${gloat[0]}" ${enemy.boss} says and ${enemy.threat}, ready to fight. "${gloat[1]}"',
                '${stagevar} "Deal\'s done, plates are cold. Now clear out," ${bossDescription(enemy)} tells the mobsters, rolling ${gPron(enemy,"possessive")} shoulders before ${gPron(enemy, "subject")} ${enemy.threat}. "${gloat[0]}" ${enemy.boss} growls low. "${gloat[1]}"',
                '${stagevar} "Grab the cash, boys. The only thing left here is a fight," ${enemy.boss} tells the mobsters as they scatter. "${gloat[0]}" ${enemy.boss} says, adjusts ${gPron(enemy,"possessive")} stance and smirks. "${gloat[1]}"'
            ])),
            gloat: [
                ['Didn’t your mamas tell you not to crash dinner?', 'Now it’s personal.'],
                ['You walked into the wrong pizza joint, tough guys,', 'Hope you like your knuckles well-done.'],
                ['Dinner’s over, dessert’s pain.', 'Let’s slice this up the hard way!'],
                ['Should’ve called ahead for a reservation.', 'I\'m fresh out of mercy tonight!'],
                ['Wrong place, wrong time, wrong table.', 'Let’s settle the bill.'],
                ['And here I thought this would be a quiet night.', 'But breaking you will be the perfect nightcap.'],
                ['Funny, I didn’t order any clowns." "Well I didn’t order any criminals, yet here you are," you shoot back. "Too bad', 'All sales are final — and so are you!'],
                ['I came for pizza, not a workout', 'But breaking you is a bonus.'],
            ],
            hottrail: () => _.template(randFrom([
                '${trail}, the pieces are clear: ${enemy.boss} is sealing a weapons deal with mob, right here and now. You hit the alley at full speed and kick open the back door before the first handshake finishes.<br><br>Conversations cut off mid-word. Chairs topple as mobsters scramble for cover, fumbling for their weapons. ${enemy.boss} whirls toward the noise, eyes narrowing in sudden fury.',
                '${trail}, it all points to a mob meetup tonight at Matteo\'s. You don’t wait for backup — you shove through the kitchen entrance, cutting straight into the heart of the deal.<br><br>The room jolts to life in a chaos of clattering plates and grabbed briefcases. ${enemy.boss} throws a hand up, voice sharp and rattled.',
                '${trail}, there’s no time to waste — ${enemy.boss} and the mob are mid-negotiation. You break through the service door like a battering ram, catching them in the act.<br><br>For a heartbeat, no one moves. Then the mobsters erupt in a flurry of curses and drawn guns. ${enemy.boss} slams a fist on the table, teeth clenched against the rising panic.'
            ])),
            coldtrail: () => _.template(randFrom([
                '${trail}, you pinpoint the location too late to stop the meeting, but just in time to interrupt it. You slip through the kitchen side door as the mobsters finish counting the cash.<br><br>The room falls still, save for the quiet click of safety catches disengaging. ${loungeMusic("restaurant")} ${enemy.boss} glances your way, unimpressed, and wipes a smudge of grease from ${gPron(enemy, "possessive")} sleeve.',
                '${trail}, it leads you to Matteo\'s — a backroom deal already in motion. You ease through the service hall, hoping to catch them before they wrap it up.<br><br>Murmurs die and heads turn in unison, calm but alert. ${loungeMusic("restaurant")} ${enemy.boss} straightens slowly. "Right on time," ${gPron(enemy, "subject")} says, giving you a thin, knowing smile.',
                '${trail}, your intel confirmed the where, but not the when — and you’re minutes behind. You slip inside, finding ${enemy.boss} already deep in conversation with the mob.<br><br>Mobsters pause mid-bite, mid-deal, but no one bolts. ${loungeMusic("restaurant")} ${enemy.boss} calmly sets down a glass and meets your gaze without flinching.'])),
            clueless: () => _.template(randFrom([
                'Quite exhausted from your investigations, you have arrived for pizza and maybe some downtime at Matteo\'s — until raised voices and the smell of trouble pulls you toward the backroom. You take a peek through the kitchen doors and find far more than dinner.<br><br>The room turns toward you, cold and calculating. ${loungeMusic("restaurant")} ${enemy.boss} adjusts ${gPron(enemy, "possessive")} napkin, gaze steady.',
                '${trail}, have arrived at a nondescript pizza place. Even though you are sure of the location, nothing seems out of place. Unsure of what to expect, you are alerted at the sound of a ${gPron(enemy, "sex")} shouting. You follow the noise, brushing past confused waitstaff.<br><br>The cash keeps counting for a moment longer, then stops with a snap. ${loungeMusic("restaurant")} ${enemy.boss} lets out a slow breath, already weighing the odds.',
                'After the previous bout, you cannot make heads or tails out of the clues and decide to clear your head over some dinner. You wander into a nerby pizza joint expecting nothing but a hot slice — only to find ${enemy.boss} brokering something far bigger than your lunch order.<br><br>Silence settles like dust on cracked linoleum. ${enemy.boss} tilts ${gPron(enemy, "possessive")} head, the faintest smirk curling at the corner of ${gPron(enemy, "possessive")} mouth. ${loungeMusic("restaurant")}'
            ])),
            captured: _.template(randFrom([
                'They drag you into Matteo’s front room and dump you in a chair still warm from the last poor fool. ${enemy.boss} doesn’t bother with threats — just a quiet nod to the mobsters counting cash at the next table. "Keep them breathing," ${gPron(enemy,"subject")} mutters to ${randFrom(enemy.minionnames)}, "We might need a bargaining chip when things turn south." But you don’t wait to be traded away. As the deal wraps up, you wrench your arms free and flip the table, sending chairs and cash flying as chaos erupts.',
                'Your hands are tied, your gear gone, but your senses sharpen the second you’re shoved inside. ${enemy.boss} lounges by the register like this is just another Thursday night, barely giving you a glance. "Didn’t think you\'d show up this easy," ${gPron(enemy,"subject")} says. "Stick around, maybe you’ll learn something." But the only lesson you’re here to give is violence. You kick the chair backward, take the first thug by surprise, and bring the whole deal crashing down.',
                'Your head swims as the haze clears — broken lights, greasy tablecloths, and the stench of scorched cheese hit first. Voices drift through the fog: laughter, casual, confident. ${enemy.boss} is across the room, counting out the final stacks of cash like your capture meant nothing. "${ucInit(gPron(enemy,"subject"))} said you\'d fold easy," one thug sneers nearby. Bad call. You fake one more moment of weakness... then hurl your chair sideways into the nearest mobster, catching them flat-footed as you roll to cover. Chaos spills across the pizzeria in an instant.',
                'You wake slumped against the cracked tile floor, pulse pounding, wrists raw from whatever restraints they used. The deal’s still going — briefcases snap shut, mobsters chuckle over your capture, and ${enemy.boss} barely spares you a glance. "Let ’em watch how real business gets done," ${gPron(enemy,"subject")} mutters. But you’ve watched enough. With a surge of will, you kick the leg of your chair forward, tipping yourself into a crouch and sending a stack of cash scattering across the floor. Guns turn. So do you.'
            ])),
            finalvar: _.template(randFrom([
                '<br><br>The fight erupts in an instant. Chairs flip, cash scatters, and plates crash to the floor. ${enemy.boss} plants ${gPron(enemy, "possessive")} feet as gangsters scramble for the exits. "${gloat[0]}" ${enemy.boss} roars, fists clenched. "${gloat[1]}"',
                '<br><br>Chaos spills across the pizzeria. Mobsters dive for cover, briefcases forgotten amid spilled marinara and shattered glass. ${enemy.boss} steps through the smoke like ${gPron(enemy, "subject")} owns the place. "${gloat[0]}" ${gPron(enemy, "subject")} says with a grin. "${gloat[1]}"',
                '<br><br>The first punch flies before anyone can run. Ovens blaze, smoke rolls through the kitchen, and the sharp scent of scorched pepperoni fills the air. "${gloat[0]}" ${enemy.boss} growls, advancing without hesitation. "${gloat[1]}"'
            ])),
            strengtheningforces: _.template(randFrom([
                '${trail}, you uncover ${enemy.boss} pulling the mob into ${possessiveSuffix(enemy.boss)}\'s personal army — enough firepower to lock down entire Ransom City. Every gang recruitment, every missing weapons shipment, all point back to a single gathering at Matteo\'s. You cut through the alley behind the joint, hearing oaths sworn and cash changing hands as you reach the service entrance. ${finalvar}',
                '${trail}, it becomes clear this isn’t street-level recruitment — ${enemy.boss} is forging an alliance to challenge every rival on the continent, finally cementing the ${enemy.name} as the iron fist of crime. You shove through the doors of the meeting place as the final vows seal the pact. ${finalvar}',
                '${trail}, your intel reveals the meeting between ${enemy.boss} and the mob will arm dozens of street gangs under the banner of ${enemy.name}, flipping the balance of power overnight. You burst through the entrance as the last payments are made. ${finalvar}'
            ])),
            actsofterror: _.template(randFrom([
                '${trail}, you piece together a plan to plunge the city into chaos — ${enemy.boss} is funding a wave of coordinated riots and gang hits set to detonate tonight. The escalating riots and attacks all point to Matteo\'s as the ignition point. You reach the restaurant as the last payments are made. ${finalvar}',
                '${trail}, your sources confirm this isn’t turf war — it’s urban warfare. ${enemy.boss} is paying the mob to burn down the competition and flood the streets with violence. You break through the doors of their front as the war plan unfolds. ${finalvar}',
                '${trail}, you realize the mob deal is the fuse to a city-wide bloodbath, where ${enemy.name} will rise on top and rule all of Ransom City, and piece together that Matteo\'s isn’t just a front — it’s the war room where tonight’s destruction begins. You slam through the doors before the first spark lights. ${finalvar}'
            ])),
            illegalgains: _.template(randFrom([
                '${trail}, you realize the old pizza joint down the street from the cinema — Matteo\'s — is the front ${enemy.boss} has been using to launder enough cash to fund an army. You reach the delivery alley just as the final payment is made.${finalvar}',
                '${trail}, you conclude that the unusual shipments passing through this district all point to one place: Matteo\'s, where ${enemy.boss} is counting the credits that could tip the entire shadow war against the Kingdom. You crash through the doors as the last transaction of this ${getMasterPlan()} is just about to be signed.${finalvar}',
                '${trail}, you piece together the financial shell game and trace it back to one unlikely spot — Matteo\'s, where dirty money buys real power and is about to change the streets of Ransom foreer, lifting the ${enemy.name} to unimaginable power. You breach the doors as the deal hits its final moments.${finalvar}'
            ])),
            kidnapping: _.template(randFrom([
                '${trail}, you uncover the ${getMasterPlan()}: a hostage exchange that will give ${enemy.boss} the ultimate leverage over the ${vip.location}. You hit Matteo’s just as the freezer unlocks and the deal begins. ${finalvar}',
                '${trail}, your leads point to ${vip.vip} being held at the freezer of Matteo\'s — someone too important to disappear quietly. ${possessiveSuffix(enemy.boss)} ${getMasterPlan()} is to trade ${gPron(vip, "subject")} for immunity and protection, a deal no one else could broker. You breach the back door as the handoff starts. ${finalvar}',
                '${trail}, the ${getMasterPlan()} isn’t ransom — it’s a power grab. With ${vip.vip} in mob hands, ${enemy.boss} gains control of everything that matters. You arrive at Matteo\'s as the mob closes in on their prize. ${finalvar}'
            ]))
        },

        {
            name: "One Step Ahead", expansion: "legendofoni", instory: 0, location: "remote", bystander: "mountain climber", pit: "the edge of the cliff",
            stagebonus: { setup: `Each fighter may search the enemy deck for a Minion card to discard. Shuffle the enemy deck.` },
            stagepenalty: { setup: `Each fighter must put search the stage deck for a copy of Vertigo, and put in into play. Shuffle the stage deck.` },
            masterplan: randFrom(["personalpower", "kidnapping", "actsofterror"]), keywords: ["heights", "labyrinth"], labyrinth: "twisting mountain paths",
            rivaltext: _.template('<%=rivalboost ? `. Leaping from the shadows in the trees, ${rival.name} ambushes you!` : ` and to your dismay you find that ${rival.name} has joined forces with ${enemy.boss}.` %>'),
            gloat: [
                [`Even the strongest warriors cannot take this fall,`, `And you are not the strongest.`],
                [`It'll not be the fall that kills you,`, `It's the sudden stop at the end!`],
                [`It's a long way down, Gladiators,`, `You'll have a lot of time to reflect on your mistakes.`],
                [`Only one way down for you,`, `The quickest possible!`],
                [`Think you can beat nature at its own game?`, `This mountain bows to me, and soon, so will you!`],
                [`One wrong step here could be your last. This mountain doesn't forgive," you say, your eyes scanning the precarious ledge that stands between you and your goal. "Ah, but the mountain is an old friend of mine,`, ` It knows better than to betray me.`],
                [`Many have tried to conquer this peak, only to become part of its legend. I won't let you add more names to that list," you state, your voice carrying the weight of resolve, strong against the howling wind. "Legends? I'm not here to be remembered,`, `I'm here to win, and this mountain will bear witness.`],
                [`Look around you, at the precipice that awaits the faint of heart,`, `Let the fall claim those who doubt, for I am beyond its reach!`],
                [`This peak, this guardian of despair and triumph, it understands the cost of victory,`, `And so do I. The fear of falling? It's but a tool to weed out the unworthy. Today, it carves my path to destiny.`]
            ],
            hottrail: () => _.template('Climbing the mountain is arduous, but you make good time and come to a point where your path crosses that of ${possessiveSuffix(enemy.boss)} band of goons: the ${enemy.name}! Knowing they are only a short distance behind, you hunker down to spring an ambush. As they rush around the bend, you leap out of your hiding spot taking out a number of ${gPron(enemy,"possessive")} forces before they can regroup and face you.'),
            coldtrail: () => _.template('The path is winding and overgrown and difficult to traverse, but you refuse to slow down. You finally come to face ${possessiveSuffix(enemy.boss)} forces.'),
            clueless: () => _.template('The path is winding and overgrown and difficult to traverse, and when you finally come to face ${possessiveSuffix(enemy.boss)} forces, you are completely exhausted.'),
            prologue: () => _.template(randFrom([
                '${trail}, you have affirmed that the ${randFrom(["minions",enemy.minions()])} of ${enemy.boss} have been using <%=knowledge != "hottrail" ? `a remote mountain path`: `the mountain path you suspected` %>, so that\'s where you head to catch up with them.<br><br>${stagevar}<%=rivalpresence ? rivaltext : ``%><br><br>${bossDescription(enemy)} doesn\'t seem surprised by your efforts. "${gloat[0]}" ${gPron(enemy,"subject")} laughs. "${gloat[1]}" ${ucInit(gPron(enemy,"subject"))} readies to strike back! <br><br>${laconicStatement(enemy)}',
                '${trail}, it is revealed the ${randFrom(["minions", enemy.minions()])} of ${enemy.boss} have been ascending through <%= knowledge != "hottrail" ? "an obscure route up the mountain": "the very mountain route you anticipated" %>, aiming for the cave that legends say channels the mountain\'s ancient energies. Determined, you set out to intercept them before they can harness such power.<br><br>${stagevar}<%= rivalpresence ? rivaltext : `` %><br><br>As you navigate the treacherous path, every step threatens to be your last, with the abyss lying just one misstep away. Yet, ${bossDescription(enemy)} stands defiantly at the path\'s narrowest ledge, blocking your way to the summit. "${gloat[0]}" ${enemy.boss} says with a menacing grin as wind howls louder. "${gloat[1]}" With a sneer, ${gPron(enemy,"subject")} prepares for your advance, the wind howling as if to underscore the impending clash.<br><br>${laconicStatement(enemy)}'
            ])),
            finalvar: _.template('<br><br>A Citadel aircraft speeds you to the mountain, but <%=getPropertyValue(enemy, stage, "antiair", "an ominous aura")%> drives the plane away. You parachute to the mountainside, and have to finish this with your fists.'),
            personalpower: _.template('${trail}, you have affirmed that the ${possessiveSuffix(enemy.bosstitle())} ${getMasterPlan()} has led ${gPron(enemy,"object")} to the ${mysticalSynonym()} energy that rests at the top of the Cursed Mountain of Oni on a moment of cosmic conjunction, ready to have the power of The Oni be directed into ${gPron(enemy,"reflexive")}. Having trekked through the Forest of Sorrow, ${enemy.boss} and ${gPron(enemy,"possessive")} minions have begun their ascent.${finalvar} "${gloat[0]}" ${bossDescription(enemy)} laughs<%=rivalpresence ? `, with ${rival.name} at ${gPron(enemy,"possessive")} side, looking for ${gPron(rival,"possessive")} part of the ${mysticalSynonym()} power` : ``%>. "${gloat[1]}"'),
            kidnapping: _.template('${trail}, you have affirmed that the ${enemy.bosstitle()} has ${vip.vip} holed up in a remote mountain cave. ${finalvar} "Get to the cave and finish ${gPron(vip, "subject")}, <%=rivalpresence ? rival.name : randFrom(enemy.minionnames) %>! I can handle the ${defineAddressing(enemy)}." ${bossDescription(enemy)} shouts. "${gloat[0]}" ${gPron(enemy, "subject")} laughs. "${gloat[1]}"'),
            actsofterror: _.template('${trail}, the pieces coalesce into a terrifying picture: the ${getMasterPlan()} of the ${enemy.name} is to to awaken the slumbering fury of the mountain itself, a cataclysmic volcanic eruption that would unleash destruction on an unimaginable scale, reshaping the land in fire and ash. ${finalvar} "Get to the cave and finish the rites, <%=rivalpresence ? rival.name : randFrom(enemy.minionnames) %>! I can handle the ${defineAddressing(enemy)}." ${bossDescription(enemy)} shouts. "${gloat[0]}" ${gPron(enemy, "subject")} laughs. "${gloat[1]}"')
        },

        {
            name: "Original Copy", expansion: "riseofthekingdom", instory: 0, location: "base", bystander: "scientist", pit: "a pitch-black elevator shaft",
            stagebonus: { setup: `Any fighter may put this card in their play area. <b>Feint:</b> Remove this card from the game to choose a copy of Vandal Serum attached to a card in the Cloning Area. Return the selected card to Serum Supply.` },
            stagepenalty: { setup: `Put 1 damage on this card.`, activate: `Each fighter suffers 1 direct damage if there is damage on this card. Then, if any fighter is on or adjacent to an objective space, remove 1 damage from this card.` },
            masterplan: randFrom(["strengtheningforces", "personalpower", "kidnapping"]), keywords: ["swarmed", "gunk", "experiment", "labyrinth", "retrieval"], gunk: "a vat of green gel", loot: `the ${randFrom(["Dark Matter", "Vandal", "Dynasty Cell"])} samples`, swarm: "clones", labyrinth: "underground passages", lab: "clone",
            gloat: [
                [`New subjects have arrived,`, `Contain them and proceed with the experiments.`],
                [`You have played your part well,`, `But do you think you were born and not made?`],
                [`You always are so predictable,`, `Where do you think you were made in?`],
                [`I couldn't have asked for better specimens,`, `It's time you provide your skills and abilities to the Kingdom.`],
                [`So this is your vision? An army of soulless copies, each one a mockery of human life?" you say, your voice echoing off the cold surfaces. "Mockery? No, improvement,`, `You see mere clones; I see the future of evolution, beyond the limits nature imposed upon us.`],
                [`You've turned creation into a weapon, experimenting without conscience. Where does it end?" you ask, your gaze sweeping over the lab's vast array of genetic experiments. "It ends where I say it does,`, `With these resources, I'll sculpt a new world order. And you? You're just an outdated model, destined for obsolescence.`],
                [`Activate the cloning sequence,`, `It's time to test the limits of what these shells can become.`],
                [`This laboratory is the cradle of a new dawn,`, `Here, in these vats, lies the answer to mortality, to imperfection!`],
                [`All these experiments, and what? You're still looking for more subjects?" you ask, your voice laced with both anger and disbelief as you take in the array of clone-vats. "Ah, but you misunderstand. You're not just any subjects; you're the pièce de résistance,`, `Imagine the potential — heroes, cloned, enhanced. Your very essence could revolutionize the future!`],
                [`The irony is delicious,`, `You sought to end this work, yet you will become its crowning achievement!`]
            ],
            rivaltext: _.template('<%=rivalboost ? ` Suddenly, one of the tubes crashes open, and a figure can be seen within the steam, kneeling, faced away. It stands, slowly, powerfully built, dripping with green gel. It is the ultimate clone, ${rival.name.toUpperCase()}-EX!<br><br>` : ` Apparently ${enemy.boss} is taking blood samples from ${rival.name}.`%>'),
            hottrail: () => _.template('${trail}, you locate the facility. You are surprised to find the laboratory not heavily guarded, and slipping in is not challenging.  You '),
            coldtrail: () => _.template('${trail}, you investigate a facility where ${enemy.name} has reportedly been seen. You defeat a few guards in your way and '),
            clueless: () => _.template('${trail}, you investigate a facility in the outskirts of the city that develops cutting edge genetic enhancements and conducts non-sanctioned medical experiments. You fight your way in and '),
            prologue: () => _.template('${stagevar}<%=randFrom([`proceed down to `,`take an elevator down. You wait patiently while ${loungeMusic()} plays over the cheap speakers. You arrive at`])%> the large lab, a cavernous room filled with row upon row of glass containment tubes. Each tube has a motionless body in it; some of you recognize as opponents you\'ve faced before.<br><br>Standing at the far end of the room, you see ${bossDescription(enemy)}, overseeing the activity.<%=rivalpresence ? rivaltext : ``%> "Just get the serum," ${enemy.boss} commands ${gPron(enemy,"possessive")} ${enemy.minions()}. "<%=finalboss.boss == enemy.boss ? `Let me be clear; we need as much of it as possible to make it work. And I need it to work!`: `${finalboss.boss} has made it clear; ${gPron(finalboss,"subject")} needs as much of it as possible to make it work. And we all need it to work!`%>"<br><br>${enemy.boss} lifts ${gPron(enemy,"possessive")} eyes to you. "${gloat[0]}" ${gPron(enemy,"subject")} calls out. "${gloat[1]}" ${laconicStatement(enemy)}'),
            captured: _.template('As you slowly regain consciousness, you notice an IV hooked up to your arm.  Your strength had been completely drained and you are unable to even stand up.  "Calm down there," an arrogant voice calls. "<%=enemy.boss == finalboss.boss ? `I want`: `${finalboss.boss} wants`%> to run some tests to see if you\'re worth keeping alive.”<br><br>As your vision clears, you see the voice belongs to ${bossDescription(enemy)}.<%=rivalpresence ? rivaltext : ``%> You also see that you are surrounded by sterile lab equipment and ominous test tubes occupied by shadowy figures. You suddenly feel a surge of strength return and yank out the IV. "Fine, let\'s do it the hard way.”'),
            finalvar: _.template('You <%=randFrom([`proceed down to `,`take an elevator down. You wait patiently while ${loungeMusic()} plays over the cheap speakers. You arrive at`])%> the large lab, a cavernous room filled with hundreds of glass containment tubes. Each tube has a motionless body in it; some of you recognize as opponents you\'ve faced before.<br><br>'),
            strengtheningforces: _.template('${trail}, you zero on the location of the secret cloning facility where the ${getMasterPlan()} of the ${enemy.name} to grow an army of clones will be enacted. ${finalvar}Standing at the far end of the room, you see ${enemy.boss} ${gPron(enemy,"reflexive")}.<%=rivalpresence ? rivaltext : ``%> "${gloat[0]}" ${gPron(enemy,"subject")} calls out. "${gloat[1]}" ${ucInit(gPron(enemy,"subject"))} looks at you and grins, as a dozen of ${gPron(enemy,"possessive")} ${enemy.minions()} descend on you, emerging from the shadows.'),
            personalpower: _.template('${trail}, you piece together the ${getMasterPlan()} of ${enemy.boss}: ${gPron(enemy,"subject")} is about to be reborn with power from a modified strain of ${randFrom(["Dynasty Cells", "Vandal Serum", "Dark Matter"])}! ${finalvar}You see <%=rivalpresence ? rival.name : randFrom(enemy.minionnames) %>, standing near a large incubation tube and pressing a few buttons on the side of the tube, and you watch as it slides open. Out steps ${bossDescription(enemy)}, surrounded by an aura as dark and ominous as ${gPron(enemy, "possessive")} very reputation. ${ucInit(gPron(enemy, "possessive"))} eyes glow with a deep red energy, and ${gPron(enemy, "subject")} turns those burning orbs on you. "${gloat[0]}" ${gPron(enemy, "subject")} says as ${gPron(enemy, "subject")} clenches ${gPron(enemy, "possessive")} fists. "${gloat[1]}"<br><br>${laconicStatement(enemy)}'),
            kidnapping: _.template(randFrom([
                '${trail}, finally piece together the ${getMasterPlan()} of the ${enemy.name}! They will clone ${vip.vip} and take control of the ${vip.location}.${finalvar}Standing at the far end of the room, you see ${enemy.boss} ${gPron(enemy,"reflexive")}.<%=rivalpresence ? rivaltext : ``%> "${gloat[0]}" ${gPron(enemy,"subject")} calls out. "${gloat[1]}" ${ucInit(gPron(enemy,"subject"))} looks at you and grins, as a dozen of ${gPron(enemy,"possessive")} ${enemy.minions()} descend on you, emerging from the shadows.',
                '${trail}, you reach the facility where you believe the ${enemy.name} is holding the ${vip.vip}, and push open the large doors. "So, this is where ${enemy.boss} does her dirty work?" you as out loud from no-one in particular. "Seems deserted for a secret lair".<br><br>Then, out of the corner of your eyes, you catch a familiar face. Locked inside one of the countless tanks in this facility you see the ${vip.vip}! Their ${getMasterPlan()} must be to clone ${gPron(vip, "subject")}! You rush forward, and too late you notice the danger. Just as you reach the tank where the ${vip.vip} is held, dozens of enemies leap out from the shadows.<br><br>"${gloat[0]}" a sinister voice of a ${gPron(enemy,"sex")} echoes throughout the lab. "${gloat[1]}" <%=rivalpresence ? rivaltext : ``%>'
            ]))
        },

        {
            name: "Out of Time", expansion: "stretchgoals17", instory: 0, location: "cursed", bystander: "scared gravedigger", pit: "a glowing portal to Afflicted Realm",
            stagebonus: { setup: `The fighters may choose to flip one objective to its inactive side.` },
            stagepenalty: { activate: `The boss gains 1 random defense token for each Remnant engaged with a fighter.` },
            masterplan: randFrom(["strengtheningforces", "personalpower"]), keywords: ["ritual", "undead", "swarmed"], ritual: "Afflicted Realm", swarm: "undead",
            gloat: [
                [`Klaatu verata..`, `Nikto!`],
                [`Even the strongest warriors will fall,`, `In the face of the power of death!`],
                [`Now I call upon my army of the dead,`, `Arise, my messengers of death! Our time has arrived!`],
                [`Magic, the darkest magic,`, `My soul swims in it..`],
                [`I am the Alpha and the Omega. Death and rebirth,`, `And, as you die, so will I be reborn!`],
                [`You've delved into depths that were meant to stay hidden. For what? Power that corrupts your very soul?" you challenge.  "Corrupts? No, it enlightens,`, `This power, drawn from the veil itself, is the ultimate liberation. With it, I am bound by neither death nor mortal whims.`],
                [`Your quest for power has blinded you to the cost. How many spirits have you ensnared to feed your ambition?" you question. "Every great achievement demands its price,`, `The spirits are merely stepping stones on the path to transcendence. Soon, none will question my might!`],
                [`Behold the fruits of my labor, a tapestry woven from the essence of the afterlife itself,`, `With each spirit I command, my dominion over life and death grows!`],
                [`This power, ancient and untamed, recognizes no master,`, `But I have tamed it, bent it to my will. Let the living cower and the dead whisper my name in fear. I am the architect of my destiny, the harbinger of a new era!`]
            ],
            rivaltext: _.template(' To your horror, you see <%=rivalboost ? `the rotting corpse of ${rival.name} dig itself out of the ground!`: `${rival.name} joining ${enemy.boss} in the atrocious rite!`%>'),
            hottrail: () => _.template('${ucInit(gPron(enemy, "subject"))} is just starting a ghastly ritual, and ominous clouds are gathering above you.<br><br>The wind is rising and the air feels heavy'),
            coldtrail: () => _.template('Animated corpses are digging their way out the ground all around you. A heavy mass of dark clouds has gathered above you.<br><br>An ominous wind is rising and the very air around you feels hot and heavy'),
            clueless: () => _.template('Animated corpses are digging their way out the ground all around you. The sky is a boiling, writhing mass of clouds, each black as coal but glowing with an intense, blood-red heat.<br><br>Dark winds sting your skin and the very air around you smolders your throat and lungs'),
            prologue: () => _.template('${trail}, you find ${bossDescription(enemy)} at a remote ${evilPlace()}. A large structure where ${gPron(enemy,"subject")} is standing on dominates the scene. ${stagevar} as ${enemy.boss}<%=knowledge == "clueless" ? `, bristling with power,`: ``%> looks down at you. "${gloat[0]}" ${gPron(enemy,"subject")} continues ${gPron(enemy,"possessive")} magic. "${gloat[1]}"<%=rivalpresence ? rivaltext : ``%> All around ${gPron(enemy,"object")} the ground breaks apart as<%=knowledge == "hottrail" ? ``: ` more and more`%> undead climb to the surface. Death permeates everything here.<br><br>${laconicStatement(enemy)}'),
            captured: _.template('You come to your senses as undead hands are gripping you, guiding you upwards to an ominous altar on a large pedestal in front of you. What ${mysticalSynonym()} sorcery had kept you enthralled is weakening, and you put your captor down. Dark winds sting your skin and the very air around you smolders your throat and lungs as ${bossDescription(enemy)} looks down at you "${gloat[0]}" ${gPron(enemy,"subject")} works ${gPron(enemy,"possessive")} magic. "${gloat[1]}"<%=rivalpresence ? rivaltext : ``%><br><br>All around ${gPron(enemy,"object")} the ground breaks apart as more and more undead climb to the surface. Death permeates everything here. ${laconicStatement(enemy)}'),
            finalvar: _.template('${trail}, you accompany Citadel agents to the base of the ${enemy.name}. Suddenly, everything disappears in a flash of brilliant purple!<br><br>The world around you is nothing like the one you have lived in all of your life. ${enemy.boss} has apparently transported you to another dimension, one where the dark winds sting your skin and the very air around you smolders your throat and lungs. The sky is a boiling, writhing mass of clouds, each black as coal but glowing with an intense, blood-red heat. If there is a hell, this may as well be it.<br><br>You see ${bossDescription(enemy)}, not far away, continuing ${gPron(enemy,"possessive")} magic. "${gloat[0]}" ${gPron(enemy,"subject")} laughs over the rising winds. "${gloat[1]}"<%=rivalpresence ? rivaltext : ``%>'),
            strengtheningforces: _.template('${finalvar} A swirling, ${mysticalSynonym()} portal appears! ${ucInit(gPron(enemy,"possessive"))} ${getMasterPlan()} is to bolster the ranks of the ${enemy.name} with the dead and send them back to Ransom!'),
            personalpower: _.template('${finalvar} A boom rolls across the area, and a blood-red, ${mysticalSynonym()} funnel starts to gather onto ${enemy.boss}. ${ucInit(gPron(enemy,"possessive"))} ${getMasterPlan()} is to gather the necromantic energy of this dark dimension and become a true God of Death!')
        },

        {
            name: "Pier Pressure",
            expansion: "stretchgoals18",
            instory: 0,
            location: ["neutral"],
            bystander: "alarmed dockworker",
            stagebonus: {
                setup: `Each fighter may either move 1 space or gain a defense token of their choice.`
            },
            stagepenalty: {
                setup: `Complete the topmost objective.`
            },
            masterplan: randFrom(["actsofterror", "illegalgains", "kidnapping", "strengtheningforces"]),
            keywords: ["retrieval"],
            loot: "the cargo",
            rivaltext: _.template(' ${rival.name} stands guard<%= rivalboost ? `, vigilant and keen-eyed.`: `.`%>'),
            hottrail: () => _.template(randFrom([
                '${trail}, you realize every stolen shipment, every missing manifest, pointed here: the south pier, where ${enemy.boss} is fueling a personal escape boat. You race along the dockside access lanes, sirens wailing in the distance as your boots hit the wet planks just before departure.',
                '${trail}, you conclude the only way out is by sea — and the fastest boat belongs to ${enemy.boss}. You cut through the warehouse alleys and emerge at Dock 13 just as ${enemy.minions()} finish loading the last crate. No more running. Not for either of you.',
                '${trail}, you piece together the smuggling routes and shipment delays, triangulating them to a single destination: the private pier where ${enemy.boss} makes a break for open water. Fog curls between stacked containers as you charge down the service road, catching the ${enemy.name} at the last possible moment.'
            ])),
            coldtrail: () => _.template(randFrom([
                '${trail}, you arrive at the docks to find the water churning and the pier alive with movement. ${ucInit(enemy.minions())} are already loading the last crates onto a waiting speedboat, and ${enemy.boss} is shouting orders through the fog. You’re cutting it close — but not too late.',
                '${trail}, your search points to the south docks, but the smoke and engine roar tell you ${enemy.boss} is already halfway gone. You sprint along the slick planks as the final cargo is shoved aboard, hoping you can reach them before they disappear beyond the breakwater.',
                '${trail}, you follow the scattered intel to the industrial piers, but find the plan already underway. ${ucInit(enemy.minions())} scatter across the docks, and the sleek escape boat idles at the water’s edge. You break into a run as ${enemy.boss} steps toward the mooring.'
            ]
            )),
            clueless: () => _.template(randFrom([
                '${trail}, you head to the docks expecting a weapons stash or a smuggling handoff. What you find instead is ${enemy.boss} preparing a high-speed escape, the boat already revving at the pier. By the time you spot them, the game is already on.',
                'Without anything to latch on, you figured the docks were just another dead end — a routine patrol, maybe a tip-off gone cold. But as you round the corner, spotlights snap on and ${enemy.boss} shouts across the water, giving orders to cast off. You’re out of time and out of guesses.',
                '${trail}, you came looking for stolen cargo, maybe a late-night dockside deal. What you find is much bigger: ${enemy.boss}, personally overseeing a getaway while ${enemy.minions()} scramble to finish loading. You weren’t ready for this — but you’ll have to be now.'
            ])),
            prologue: () => _.template(randFrom([
                '${stagevar}<br><br>${enemy.boss} spots you through the fog and cracks a wicked grin. "${gloat[0]}" ${gPron(enemy,"subject")} calls out as ${enemy.minions()} scramble to cover the escape. "${gloat[1]}" The boat’s pulling away unless you act now.',
                '${stagevar}<br><br>Engines roar as ${enemy.boss} prepares for departure, voice cutting through the chaos. "${gloat[0]}" ${gPron(enemy,"subject")} shouts, leveling a final threat your way. "${gloat[1]}" ${ucInit(enemy.minions())} pivot to block your advance — no time for hesitation.',
                '${stagevar}<br><br>Across the shifting crates and swirling fog, ${bossDescription(enemy)} stands like a phantom at the water’s edge. "${gloat[0]}" ${gPron(enemy,"subject")} laughs, daring you to stop what’s already begun. "${gloat[1]}" The crew rushes to cast off as your window closes fast.'
            ]))
            ,
            captured: _.template(randFrom([
                'Dragged to the end of the dock, you feel the salt wind bite your skin and the hum of the boat’s engines rumble through the planks. ${enemy.boss} stands nearby, checking a ${gizmo}, not even sparing you a glance. "Interrogate them at sea," ${gPron(enemy,"subject")} orders flatly. "Cleaner that way." But they forgot one thing — you’re not waiting for open water. As your captors haul you toward the gangplank, you wrench free, driving a shoulder into the nearest of the ${enemy.minions()} and send them over the pier’s edge. The fog hides your next move as chaos breaks loose.',
                'Your arms ache from the tight bindings as the dockworkers argue about your fate. ${enemy.boss} paces by the sleek speedboat, barking final orders. "The boss says no witnesses," ${randFrom(enemy.minionnames)} grunts. "But the engines ain’t warmed up yet." Their mistake. As they toss your gear aside, you twist free, slam your foot into a crate, and send a stack of cargo toppling into ${enemy.minions()}. Shouts echo across the fog-shrouded dock as you bolt toward ${enemy.boss}.',
                'You regain consciousness against the cold steel of a dockside winch, wrists tied and jacket torn. The acrid scent of fuel and saltwater fills your nose. ${enemy.boss} checks your restraints personally, muttering, "You’ll talk. Eventually." But you’ve got one answer ready now. The second ${gPron(enemy,"subject")} turns toward the boarding ramp, you snap your arms free and lunge, knocking ${enemy.minions()} guarding you flat.',
                'Slumped by the water’s edge, you overhear your fate like a bad punchline. "${ucInit(gPron(enemy,"subject"))} wants them alive until we hit the safe zone," a voice mutters, "then... overboard." The dock creaks beneath shifting crates and retreating footsteps. But they underestimated how fast you recover. As the gangplank lowers, you twist your restraints loose and throw your weight into a nearby crate, sending it crashing across the dock and scattering your captors.',
                'Left tied up, you’re supposed to be out of the game — one loose end waiting to be cut. ${enemy.boss} barely spares you a glance, ${gPron(enemy, "possessive")} focus on launching the boat before backup arrives. But the fight’s not over until you say it is. You yank against the restraints until the rust gives way, kicking loose just as ${enemy.boss} grabs a mooring. With one sharp breath, you charge into the dock chaos before your chance slips away.'
            ])),
            illegalgains: _.template(randFrom([
                '${trail}, you piece together the ${getMasterPlan()}: ${enemy.boss} is fleeing with a fortune stolen from the city’s underbelly. If this shipment reaches open water, ${enemy.name} bankrolls their next crime wave or such magnitude that Citadel can no longer contain it. ${finalvar}',
                '${trail}, you confirm that this escape is no mere getaway — it’s the final step of ${possessiveSuffix(enemy.boss)} ${getMasterPlan()}, draining the city dry. You reach the docks as the last crates of cash and contraband are secured aboard. ${finalvar}',
                '${trail}, your intel reveals a massive payout in motion — ${enemy.boss} is making off with enough wealth to fund a private war that even you could not hope to win. You break through the dockyard gates as their fortune is loaded aboard. ${finalvar}'
            ])),
            strengtheningforces: _.template(randFrom([
                '${trail}, you uncover the ${getMasterPlan()} of ${enemy.boss}: ${gPron(enemy, "subject")} is shipping elite recruits and mercenaries to a secret war camp in international waters. If they reach it, the next generation of killers will march under the ${enemy.name} with skills and gear you cannot dream of. You hit the docks just as the boarding starts. ${finalvar}',
                '${trail}, the trail leads you to the ${getMasterPlan()}: ${enemy.boss} is moving hardened fighters to an offshore training ground, a fortress where they’ll prepare to conquer Ransom City once and for all. You race onto the pier as the final gangplank is raised. ${finalvar}',
                '${trail}, you realize this escape isn’t retreat — it’s reinforcement. ${enemy.boss} is sending key lieutenants and weapons to a remote stronghold, where they’ll sharpen their blades for war. You arrive at the pier just before the launch. ${finalvar}'
            ])),
            actsofterror: _.template(
                '${trail}, you piece together ${possessiveSuffix(enemy.boss)} ${getMasterPlan()} — the boat itself is a mobile bomb, sailing straight for the heart of the city. If it reaches its target, the docks won’t be the only place burning. You hit the wharf as the engines fire up. ${finalvar}'
            ),
            kidnapping: _.template(randFrom([
                '${trail}, you confirm the rumors — the ${vip.vip} is being taken aboard ${enemy.boss}’s boat, a living bargaining chip in their ${getMasterPlan()}. You burst onto the pier as the hostage is forced below deck. ${finalvar}',
                '${trail}, you track the ${vip.vip} to the south docks, where ${enemy.boss} plans to vanish beyond the bay. If they escape, the ransom demands will be catastrophic. You reach the pier just as the hostage is dragged aboard. ${finalvar}',
                '${trail}, your leads all point here: the ${vip.vip} is minutes from disappearing into the night. ${enemy.boss} intends to use them for leverage and power over ${vip.location} unattainable otherwise. You break through the dock barriers as the final deal is sealed. ${finalvar}'
            ])),
            finalvar: _.template(randFrom([
                '<br><br>Shouts crack across the dockyard as you vault over stacked crates, water spraying from ruptured pipes. ${enemy.boss} barks the order to cast off, but you close the gap before the mooring lines hit the water. The speedboat’s engines scream to life, shaking the pier as the first shots fly. "${gloat[0]}" ${enemy.boss} shouts. "${gloat[1]}" ${laconicStatement(enemy)}',
                '<br><br>You burst through the fog just as ${enemy.minions()} scramble to cut your advance. ${enemy.boss} moves in to cut the moorings, a silhouette against the floodlights, voice cutting through the chaos. The ramp clatters down and you charge, weapons drawn, as the boat’s turbines spin up to full power. "${gloat[0]}" ${enemy.boss} bellows over the engines. "${gloat[1]}" ${laconicStatement(enemy)}',
                '<br><br>Floodlights snap on as you hit the last stretch of dock, feet pounding over cracked planks slick with seawater. ${ucInit(enemy.minions())} dive for cover while ${bossDescription(enemy)} remains calm amid the storm, shouting orders above the rising engine howl. The boat surges forward — if you hesitate now, it’s gone. "${gloat[0]}" ${enemy.boss} roars through the fog. "${gloat[1]}" ${laconicStatement(enemy)}'
            ])),
            gloat: [
                ['Party’s over. I’m taking the boat,', 'You’re taking a swim.'],
                ['End of the line, <%=defineAddressing(enemy)%>,', 'Hope you packed a life vest.'],
                ['You hear the engine? That’s the sound of me winning,', 'And you drowning.'],
                ['You should’ve stayed home, now you’ll be sleeping with the fishes,', 'First one to sink buys the drinks.'],
                ['This dock’s seen better men disappear,', 'Tonight, it sees you.'],
                ['I don’t run from trouble — I leave it choking on my wake,', 'Good luck treading water.']
            ]
        },


        {
            name: "Poison the Well", expansion: "twintiger", instory: 0, location: "neutral", bystander: "addict", pit: "an empty outflow shaft",
            stagebonus: { setup: `Remove each copy of Vandal Addict from the stage deck and remove them from the game. Shuffle the stage deck.` },
            stagepenalty: { setup: `Each fighter searches the stage deck for 1 copy of Infected Rats and adds it to their Threat area. Shuffle the stage deck.` },
            masterplan: randFrom(["actsofterror", "strengtheningforces"]), keywords: ["gunk", "experiment", "labyrinth", "swarmed"],
            gunk: "the disgusting sewer channel", labyrinth: "endless tunnels", swarm: "mutated rats", lab: "drugs",
            // After setting up the stage, flip 1 objective token to its active side.
            gloat: [
                [`You will get a bath,`, `A bath that will melt the skin off of you!`],
                [`How nice that you decided to show up,`, `Better to test the cocktail before deployment!`],
                [`You will have a proper burial for a Gladiator,`, `Within the sewage!`],
                [`So this is your plan? Poison the city from its veins with this gunk? Not on my watch," you proclaim, your gaze fixed on the ominous machinery. "Poison? A crude term for enlightenment,`, `But go ahead, try to stop the inevitable. This 'gunk', as you so eloquently put it, is my magnum opus.`],
                [`You've turned these tunnels into veins of death, pumping your madness into the heart of the city," you accuse, stepping closer, undeterred by the muck that clings to your boots. "Madness? My dear, it's a catalyst for change. And you?`, `You're just an obstacle in the flow of progress.`],
                [`They thought they ruled from their glass towers,`, `But true power flows in the shadows, in the forgotten places. Today, they'll feel the true pulse of the city!`],
                [`The distribution has begun,`, `Let the undercurrents of this city carry my legacy to every corner, every home!`]
            ],
            rivaltext: _.template(' along with ${rival.name}<%=rivalboost ? `, eyes glowing menacingly green` : ``%>'),
            hottrail: () => _.template(randFrom([
                'Armed with crucial intel, you navigate the twists and turns of the underground with unexpected ease, swiftly making your way to the heart of ${possessiveSuffix(enemy.boss)} clandestine operations. The eerie silence of the sewers belies the activity hidden below.',
                'By the information you\'ve gathered, you are able to find your way quickly through the city sewers to ${possessiveSuffix(enemy.boss)} secret lair.'
            ])),
            coldtrail: () => _.template(randFrom([
                'Despite the cryptic clues at your disposal, persistence pays off. After traversing the damp and echoing passages beneath the city, you uncover the entrance to ${possessiveSuffix(enemy.boss)} hidden sanctum, veiled by shadows and secrecy.',
                'By the information you\'ve gathered, you are eventually able to find your way through the city sewers to ${possessiveSuffix(enemy.boss)} secret lair.'
            ])),
            clueless: () => _.template(randFrom([
                'The sewer maze proves more daunting than anticipated, with each turn leading you further astray. Amidst the echoing drips and distant scurries, you finally stumble upon the ${possessiveSuffix(enemy.name)} stronghold, not before a horde of unnaturally large rats heralds your arrival to anyone listening.',
                'Unfortunately, it is a labyrinth and you lose a lot of time going in circles. By the time you find the ${possessiveSuffix(enemy.name)} operation, you are already swarmed by mutated rats.'
            ])),
            prologue: () => _.template(randFrom([
                '${trail}, your descent into the bowels of the city reveals a network long forgotten by those above. ${stagevar} The neglected tunnels have become a haven for the nefarious, where the ${enemy.name} has established a stronghold within an old pumping station. Here, they concoct their vile brew, tainting the city’s lifeline.<br><br>"${gloat[0]}" echoes through the tunnels, chilling you to the bone. "${gloat[1]}" As your eyes adjust to the dim light, ${bossDescription(enemy)} emerges, a smirk playing across ${gPron(enemy, "possessive")} face, as if welcoming you to ${gPron(enemy, "possessive")} domain<%=rivalpresence ? rivaltext : ``%>.${laconicStatement(enemy)}',
                '${trail}, you descend down to the sewers which are a labyrinth of filth and decay. The city\'s utilities are barely maintained, and since the criminal elements have all but taken over, only the bravest city workers brave these depths. ${stagevar} It appears to be abandoned water treatment facility, and the ${enemy.name} have fitted it with their own crude devices that pump some weird chemical into the water ducts.<br><br>"${gloat[0]}" a familiar voice calls. "${gloat[1]}" ${bossDescription(enemy)} steps out of the shadows<%=rivalpresence ? rivaltext : ``%>. ${laconicStatement(enemy)}'
            ])),
            captured: _.template('You wake up, and the first thing you notice is the intense stench attacking your nostrils. You open your eyes, and as you focus, you can see ${bossDescription(enemy)}<%=rivalpresence ? rivaltext : ``%> standing at a distance. You seem to be underground, in some kind of a crazy scientist setup, and ${enemy.minions()} are moving canisters about big machinery.<br><br>"${gloat[0]}" ${enemy.boss} says. "${gloat[1]}"'),
            finalvar: _.template('${trail}, you find out that ${possessiveSuffix(enemy.boss)} ${getMasterPlan()} is to pump something dangerous in the city waters. By the information you\'ve gathered, you are eventually able to find your way through the Ransom City sewers to ${possessiveSuffix(enemy.name)} secret lair.<br><br>As you enter a large chamber, you find what used to be a water treatment facility that is now being used as some sort of insane science experiment. "${gloat[0]}"  comes a voice, echoing from somewhere else in the chamber. "${gloat[1]}" ${bossDescription(enemy)} steps ouf of the shadows<%=rivalpresence ? rivaltext : ``%>. "Once we get these pumps working, all the water in Ransom City will be'),
            actsofterror: _.template('${finalvar} poisoned by our new toxic cocktail. Many will die, but the surviving will be all the stronger for it. So now you have a choice: join us, or die!" ${ucInit(getPropertyValue(enemy, stage, "antiair", "the approaching enemy minions"))} eliminated one option.'),
            strengtheningforces: _.template('${finalvar} blessed by our new ${randFrom(["Dynasty", "Vandal", "Dark Matter"])} serum. The weak will die, and the surviving strong will join our ranks as thralls! So now you have a choice: join us, or die!" ${ucInit(getPropertyValue(enemy, stage, "antiair", "the approaching enemy minions"))} eliminated one option.')
        },

        {
            name: "Reel Terror", expansion: "stretchgoals18", instory: 0, location: "remote", bystander: "moviegoer",
            stagebonus: { setup: `Any fighter may put this card in their play area. <b>Feint:</b> Advance any active objective 3 spaces to its corresponding objective space.` },
            stagepenalty: { setup: `Flip an inactive objective to its active side.` },
            masterplan: randFrom(["strengtheningforces", "actsofterror", "illegalgains"]),
            keywords: ["swarmed", "ritual", "hostages"],
            hostages: "audience",
            swarm: `${randFrom(["celluloid", "reel", "projector", "cinematic", "filmstrip", "silver-screen"])} ${randFrom(["nightmares", "fiends", "terrors", "horrors", "monsters"])}`,
            gloat: [
                [`The show's just begun,`, `Make sure you won't leave before the climax.`],
                [`You walked straight into the spotlight,`, `And now the reel plays out exactly as I wrote it.`],
                [`You always arrive just in time,`, `Right on cue for the final act.`],
                [`So many eager viewers, so little reality left to spare,`, `Soon they won’t just <span class = "emphasis">watch</span> the monsters — they'll get to meet them!`],
                [`You turned fiction into a weapon. These poor people, do they even know what’s real anymore?" you demand, pushing through the chaos. "Real?" the villain laughs,`, `Reality is what the audience believes. And they believe in *fear*.`],
                [`You're using the screen as a gateway. This is more than a film — it’s a summoning!" you shout. "Exactly," comes the reply,`, `And with each scream, the barrier weakens. Soon, even the credits won’t save you.`],
                [`Lights, camera, ritual,`, `Let the horror bleed through and the stars of pain take the stage!`],
                [`This cinema is more than a relic,`, `It's a shrine — to stories, yes, but also to power. And now, the final tale begins.`],
                [`This isn’t entertainment. It's a slaughterhouse wrapped in celluloid!" you accuse. <%=enemy.boss%> smiles- "No — it's art,`, ` And you, my dear critics, are about to be <b>moved</b>.`],
                [`The curtain rises, the veil tears,`, `And reality takes its final bow.`]
            ],
            rivaltext: _.template('<%=rivalboost ? ` Suddenly, one of the tubes crashes open, and a figure can be seen within the steam, kneeling, faced away. It stands, slowly, powerfully built, dripping with green gel. It is the ultimate clone, ${rival.name.toUpperCase()}-EX!<br><br>` : ` Apparently ${enemy.boss} is taking blood samples from ${rival.name}.`%>'),
            hottrail: () => _.template(
                randFrom([
                    "${trail}, you uncover the final piece of ${possessiveSuffix(enemy.name)} scheme - ${whichPreposition(mysticalSynonym())} ritual disguised as a midnight premiere — and rush to the cinema, heart pounding.",
                    "${trail}, you confirm that ${enemy.boss} plans to breach reality during tonight’s screening, and you head straight for the theater before the summoning completes.",
                    "${trail}, you realize a much-publicized late-night horror marathon in a hipster cinema is a ruse to gather victims for something monstrous — and you arrive just as the first scream cuts through the silence."
                ])),
            coldtrail: () => _.template(
                randFrom([
                    "${trail}, you follow the signs to an off-strip cinema, unsure of what you’ll find — but expecting the worst.",
                    "${trail}, you arrive at a quiet screenhouse moments too late — the screams have already begun, and the lobby lights are flickering.",
                    "${trail}, the clues point to just an obscure moviehouse. You double-check your leads and decide to press on. The moment you arrive, you can tell something's terribly wrong, and you should not have lingered."
                ])
            ),
            clueless: () => _.template(
                randFrom([
                    "${trail}, you follow the last thread of evidence to a a faded old cinema, its marquee missing letters and its windows clouded with age, unsure if it’s a trap, a dead end, or something worse.",
                    "${trail}, you arrive to an forgotten theater wedged between shuttered shops. The trail leads here, though nothing adds up — and everything about this place feels off.",
                    "${trail}, you find youself standing outside of a a run-down moviehouse where the posters haven’t changed in years — and none of them match the current listings. It’s the only lead left, and while it doesn’t make sense, instinct tells you this is the right place.",
                    "${trail}, the clues are scattered and conflicting, but they all point to this obscure little cinema.",
                    "${trail}, you're not sure why the pattern ends here — but the narrow brick building with a crooked ticket booth is where you're at.",
                    "${trail}, it feels wrong, but too many things lead here to ignore — so you push open the doors to a crumbling neighborhood relic still clinging to its old glamour beneath layers of grime and step inside.",
                    "You gave up the chase hours ago. Now you're standing outside a narrow two-screen theater with a sun-bleached marquee and a popcorn machine older than you are. The doors open like it's any other night — until you hear the screaming.",
                    "You just needed a place to sit for a while. The theater's neon buzzes overhead, flickering pink and blue above rusted lettering: \"Tonight Only\". The ticket girl is gone. The glass is cracked. And you see movement inside.",
                    "You were done asking questions. And yet here you are, in front of an old cinema you don’t remember choosing, its lights dimmed and its windows too dark to see through. Something inside is waiting, and it knows your name."
                ])
            ),
            prologue: () => _.template(
                randFrom([
                    "${stagevar}<br><br>The lobby is a war zone — moviegoers scream, tripping over each other as shattered glass rains down from the balcony. Something crawled out of the screen and never went back. Amid the flashing lights and flickering reels, ${bossDescription(enemy)} watches the panic unfold. \"${gloat[0]}\" ${enemy.boss} smirks, unfazed by the chaos. \"${gloat[1]}\"<br><br>${laconicStatement(enemy)}",
                    "${stagevar}<br><br>By the time you push through the broken doors, it's already madness. Theaters have emptied into the lobby, where shrieking patrons claw at locked exits. A reel of darkness unspools from the projection booth — and ${enemy.minions()} herd the victims toward the rising evil. \"${gloat[0]}\" ${enemy.boss} cackles, stepping over a fallen usher. \"${gloat[1]}\"<br><br>${laconicStatement(enemy)}",
                    "${stagevar}<br><br>Chaos has already taken hold. Screaming patrons flee past overturned concession stands and shattered posters, while shadows twist and flicker beneath the projection’s dying light. ${enemy.boss} stands center stage in the lobby, surrounded by ${enemy.desc()}. \"${gloat[0]}\" ${bossDescription(enemy)} says with theatrical calm, arms spread as if introducing an encore. \"${gloat[1]}\"<br><br>${laconicStatement(enemy)}",
                    "${stagevar}<br><br>The lobby's been turned into a waking nightmare — stampeding moviegoers crash through velvet ropes and broken glass, trying to escape the horrors now loose among them. Framed by the stuttering glow of a possessed projector, ${enemy.boss} surveys the scene with eerie satisfaction. \"${gloat[0]}\" A single reel turns slowly behind ${gPron(enemy, 'object')}, glowing with ${mysticalSynonym()} force. \"${gloat[1]}\"<br><br>${laconicStatement(enemy)}"
                ])),
            captured: _.template(
                randFrom([
                    "Dazed and slumped in a cinema seat, you blink awake to sirens, shouting, and flashing lights. Did those goons really take you to the movies?<br><br>The audience is in full retreat, bolting for the exit. You rise and follow — only to halt as the lobby doors swing open, revealing ${enemy.boss} waiting with a flourish and a bow. \"${gloat[0]}\" ${gPron(enemy,'subject')} beams. \"${gloat[1]}\"",
                    "You're jolted awake by screams and the sound of trampling feet. The theater shakes as patrons push past you, eyes wide with terror. You follow them into the lobby — just in time to see ${enemy.boss} step from the shadows. \"${gloat[0]}\" ${gPron(enemy,'subject')} says. \"${gloat[1]}\"",
                    "You awaken in darkness as panicked moviegoers surge past you in a frantic stampede. Disoriented, you stumble after the fleeing crowd into the lobby — only to find ${enemy.boss} standing amid the chaos, grinning at your arrival \"${gloat[0]}\" ${gPron(enemy,'subject')} laughs. \"${gloat[1]}\" How long have they been waiting for you? And why?"
                ])),
            finalvar: _.template(
                randFrom([
                    'You <%= randFrom([`step into the lobby`, `push through the lobby doors`, `burst into the foyer`, `emerge from the side hall into the main lobby`]) %> to find chaos in full bloom. Panic has swallowed the crowd—patrons stampede across broken tiles, dodging overturned furniture and falling light fixtures. Above them, the screen still flickers, but what it projects is no longer fiction. Cracks shimmer in the air where celluloid meets reality, and through them, silhouettes crawl free.<br><br>',
                    'You <%= randFrom([`stride into the lobby`, `arrive amid the screams`, `step through the torn velvet drapes`, `rush in just ahead of the flood of fleeing moviegoers`]) %>. Popcorn litters the ground like ash. The lobby\'s lights strobe as though caught between reels. Patrons crash into furniture and one another in blind terror, while the air itself pulses with unnatural heat. Where the screen’s image should end, something writhes — its form stitched together from flickering frames and projected madness.<br><br>'
                ])
            ),
            strengtheningforces: _.template(
                randFrom([
                    '${trail}, you uncover the true scope of ${possessiveSuffix(enemy.name)} ${getMasterPlan()}: not a spell, not a performance — this is a full-scale summoning. ${finalvar}At the heart of it, ${enemy.boss} stands atop the concession counter like a conductor before an orchestra, arms raised to the glow of the screen. "${gloat[0]}" ${gPron(enemy,"subject")} cries, as the summoned horrors take shape in the flickering light. "${gloat[1]}"<br><br>${laconicStatement(enemy)}',
                    '${trail}, you uncover the horrifying truth: ${enemy.boss} isn’t just summoning monsters — ${gPron(enemy,"subject")} is building an army, pulled straight from the darkest corners of cinema itself. ${finalvar}Above the chaos, ${enemy.boss} gestures theatrically from a staircase landing, as film-born entities — glitching, half-rendered, too large for this world — climb free from the light. "${gloat[0]}" ${gPron(enemy,"subject")} proclaims, voice distorted through the projection. "${gloat[1]}"'
                ])),
            actsofterror: _.template(
                randFrom([
                    '${trail}, you realize the broadcast isn’t meant to be watched—it’s meant to *breach*. Across Ransom City, theaters flicker in sync, each one a gateway. But here, at the epicenter, it’s already begun. ${finalvar}As ${enemy.boss} chants before the screen, the audience collapses into hysteria, and a terrible face begins to form in the frame. "${gloat[0]}" ${gPron(enemy,"subject")} intones. "${gloat[1]}"',
                    '${trail}, it becomes clear: this isn’t a ritual for power—it’s a *broadcast*. ${enemy.name} intends for all of Ransom City to watch — and in watching, let the nightmare through. ${finalvar}Cameras rise from behind shattered counters, filming everything. As ${enemy.boss} raises their arms to the flickering screen, the shadows themselves begin to cheer. "${gloat[0]}" ${gPron(enemy,"subject")} shouts, as the lens turns your way. "${gloat[1]}"'
                ])
            ),
            illegalgains: _.template(
                randFrom([
                    '${trail}, you uncover ${enemy.boss}’s true goal: not terror for power — but profit. ${ucInit(gPron(enemy,"subject"))} has turned the ritual into a business model, where the extradimensional creatures of the night pay to experience the horror and suffering of the audience — night after night. ${finalvar}${ucInit(mysticalSynonym())} concession stands churn out cursed merchandise, and audience members vanish after the credits roll. "${gloat[0]}" ${gPron(enemy,"subject")} announces, surrounded by VIP spirits with premium seating. "${gloat[1]}"',
                    '${trail}, it all comes together—${enemy.name} is running a supernatural investment scheme. By binding entities from across the cinematic netherworld, ${enemy.boss} has monetized horror itself. ${finalvar}On a flickering screen, you see futures traded in fear, agony bottled and sold to infernal shareholders. "${gloat[0]}" ${gPron(enemy,"subject")} grins, gesturing to a reel spinning gold threads. "${gloat[1]}"'
                ])
            )
        },

        {
            name: "Reign Storm", expansion: "essenceofevil", instory: 0, location: ["cursed", "remote"], bystander: "confused storm chaser",
            stagebonus: { setup: `Each fighter gains 3 defence tokens of their choice.` },
            stagepenalty: { setup: `Search the Stage Deck for a copy of Lightning Conduits, and play it. Shuffle the Stage Deck.` },
            masterplan: randFrom(["personalpower", "actsofterror"]), keywords: ["ritual", "explosions"], ritual: randFrom(["Raijin", "Oni"]), detonation: `the boss throws their head back, arms wide, and in a single convulsion unleashes a torrent of lightning from every limb — blinding, screaming, absolute`, explosions: `${randFrom(["blinding", "white-hot", "crackling"])} ${randFrom(["bolts", "blasts", "arcs"])} of lightning`, antiair: "blinding lightning like a divine hammer",
            gloat: [
                ["By the power of <%=stage.ritual%>!", "I have the power!"],
                [`<%=stage.ritual%> chose me, fool!`, `And now I wield him like a sword forged from the heavens themselves!`],
                [`This isn’t just lightning — this is destiny made electric!`, `And it’s got <span class = "emphasis">your name</span> burned into its path!"`],
                [`You’re too late, too small, too mortal!`, `By the time you blink, I’ll be <span class = "emphasis">part of the sky</span>!`],
                [`I offered thunder to the weak and silence to the brave,`, `But you chose neither — so now you get <span class = "emphasis">ruin</span>!`],
                [`Every storm needs a master,`, `And I just fired the gods.`],
                [`Feel that charge in the air?`, `That’s not fear — it’s <span class = "emphasis">your last mistake sizzling to life</span>!`],
                [`You came for justice,`, `But you're leaving <span class = "emphasis">extra crispy</span>!`]
            ],
            rivaltext: _.template(', guided to the location by <%=rivalboost ? `the spirit of Oni possessing`: ``%> ${rival.name}'),
            hottrail: () => _.template(
                randFrom(
                    [
                        '${trail}, you follow the gathering storm to a high ridge where ${enemy.boss} has begun assembling a ritual site, and ${enemy.minions()} are just finishing the final sigils.',
                        '${trail}, you realize ${enemy.boss} is trying to draw power directly from the unnatural lightning building overhead—you catch glimpses of the ritual circle before the wind and thunder drown the hillside.',
                        '${trail}, you intercept fragments of arcane symbols and weather reports cross-referenced with recent attacks — it all points to this: ${enemy.boss} intends to become the storm.'
                    ]
                )
            ),
            coldtrail: () => _.template(
                randFrom(
                    [
                        '${trail}, you piece together the pattern — summoning sites, magnetic surges, old weather myths—and realize ${enemy.boss} is nearly finished calling down the storm’s power.',
                        '${trail}, the signs become unmistakable: ${enemy.name} has rerouted lightning itself through ritual lines across the valley. By the time you reach the summit, the sky is already breaking.',
                        '${trail}, you connect a power surge to an ancient invocation lost to time — by the time you reach the site, the circle is alive with power and ${enemy.boss} is more lightning than flesh.'
                    ]
                )
            ),
            clueless: () => _.template(randFrom(
                [
                    '${trail}, you are tracking strange energy signals through the wilderness, when you suddenly stumble onto a storm-wracked plateau where ${enemy.minions()} form a ring around ${enemy.boss}.',
                    'What you had learned so far didn\'t lead you anywhere, and you were wandering aimlessly, until the weather turned unnatural and you found yourself staring at a living storm fed by arcane markings and rising chants.',
                    '${trail}, what followed as a simple recon turns into something far stranger — the wind howls, the sky tears open, and ${enemy.boss} is already standing in its heart.'
                ]
            )),
            prologue: () => _.template(randFrom(
                [
                    '${stagevar}<br><br>At the heart of the storm, ${enemy.boss} raises ${gPron(enemy, "possessive")} arms and laughs — lightning crawling across ${gPron(enemy, "possessive")} body like armor made of fury. Around the ritual circle, a cult of ${stage.ritual} chants in sync with the sky’s fury, feeding power into the storm. "${gloat[0]}" ${gPron(enemy,"subject")} roars above the rising wind. "${gloat[1]}" The ritual pulses once — inviting anyone bold enough to claim the storm’s power.',
                    '${stagevar}<br><br>The skies split. ${ucInit(gPron(enemy, "subject"))} stands within the glowing circle, eyes blazing, storm-wind coiling like a living thing. Cultists dedicated to ${stage.ritual} kneel nearby, murmuring ancient words as the lightning flares in time with their breath. "${gloat[0]}" ${gPron(enemy,"subject")} calls, voice vibrating with unnatural resonance. "${gloat[1]}" There’s still time — but the storm won’t wait.',
                    '${stagevar}<br><br>You reach the ritual\'s core as ${gPron(enemy, "subject")} begins to glow from within — lightning dancing across skin, eyes, and soul. Servants of ${stage.ritual} hold their positions around the ring, arms raised to the storm, unwilling or unable to break the summoning trance. "${gloat[0]}" comes the voice from the storm. "${gloat[1]}" You either stop it — or seize what’s left.'
                ]
            )),
            captured: _.template(
                randFrom(
                    [
                        'Lightning crashes as your eyes snap open. You’re strapped to a weathered altar, storm surging above. ${ucInit(enemy.minions())} back away — uncertain. ${enemy.boss} raises a hand toward the heavens. "${gloat[0]}" ${gPron(enemy,"subject")} intones without looking your way. "${gloat[1]}" You twist free and launch forward, no longer part of the ritual — only its interruption.',
                        'Rain and thunder rip through your senses as an arc of lightning passes from your body and blasting you awake. You rise from the muddy ritual circle, pulse crackling with stolen energy. ${randFrom(enemy.minionnames)} stumbles back, shouting, "They’re resisting! Cut them down!" You don’t wait. The storm might not have chosen you — but you’re stepping into it anyway.',
                        'You awaken to a world screaming. You tear free from the sacrificial chains just as ${enemy.boss} finishes a final phrase in a dead language. Power cracks overhead like a god’s heartbeat. "${gloat[0]}" ${gPron(enemy,"subject")} sneers, sparks crawling across ${gPron(enemy,"possessive")} arms. "${gloat[1]}" You hit the ground running — lightning at your back.',
                        'You come to in a ruined shrine, blood on your lip and thunder in your ears. The ritual is already pulsing around you, storm coiling downward to the waiting arms of ${enemy.boss}. "Let them watch," ${randFrom(enemy.minionnames)} smirks. "Let them see what real power is." But you rise anyway — wet, furious, and far from done.'
                    ]
                )
            ),
            finalvar: _.template(randFrom(
                [
                    '<br><br>You ascend the storm-wracked peak just as the final arc is drawn — lightning pours from the heavens, twisting through ${enemy.boss} like a living conduit. The ground cracks, the sky opens, and the ritual begins to choose its heir.',
                    '<br><br>Rain whips across the ritual circle as you step into its charged radius. ${ucInit(enemy.minions())} fall back, unsure whether to fight or flee. ${enemy.boss} turns slowly toward you, stormlight crawling over ${gPron(enemy,"possessive")} face.',
                    '<br><br>As you cross the final ridge, the ritual surges like a pulse of thunder through the valley. ${enemy.boss} stands at the center, arms raised—power flowing not just into the sky, but into themselves.',
                    '<br><br>You push through wind and static as ${enemy.boss} lifts into the air, suspended in a web of lightning. The storm begins to spiral—centered on the ritual... or you.'
                ]

            )),
            personalpower: _.template(randFrom([
                '${trail}, you realize too late — this isn’t just a storm, it’s a coronation. ${finalvar} Over the lightning-scarred ground ${enemy.boss} raises ${gPron(enemy, "possessive")} <%= enemy.blade ? enemy.blade : `arms`%> to the sky, lightning crashing down like a divine anointing. Power surges up, arcing across ${gPron(enemy,"possessive")} frame. "${gloat[0]}" ${enemy.boss} bellows, body glowing with stormlight. "${gloat[1]}"',
                '${trail}, you uncover the truth: ${enemy.boss} isn’t just calling the storm — ${gPron(enemy,"subject")} means to fuse with it, becoming the mortal vessel of the divine fury above. The signs, the chants, the targeting — it all leads here. ${finalvar} "${gloat[0]}" ${enemy.boss} thunders, arcs flaring between ${gPron(enemy,"possessive")} fingers. "${gloat[1]}"'

            ])
            ),
            kidnapping: _.template('${trail}, you locate ${vip.vip}, bound within a containment arc at the edge of the storm’s heart. The ritual isn’t complete — because ${enemy.boss} needs them alive for the final surge of power. ${finalvar} "Rescue them if you want," ${enemy.boss} growls, lightning flashing behind ${gPron(enemy,"possessive")} grin, “but you’ll have to survive the storm first.”'
            ),
            actsofterror: _.template('${trail}, you discover the ritual’s real purpose: ${enemy.boss} intends to unleash the storm for untold devastation. If the ${mysticalSynonym()} tempest reaches its full power, Ransom City lies within the blast radius. ${finalvar} "${gloat[0]}" comes the voice crackling with thunder. "${gloat[1]}" The sky begins to scream.'
            )
        },

        {
            name: "Right to Remain Silent", expansion: "riseofthekingdom", instory: 0, location: "base", bystander: "captive",
            stagebonus: { setup: `Each fighter searches the stage deck for a copy of Sneaking, and puts it in their play area.` },
            stagepenalty: { setup: `Add two power to Recoverd Intel.` },
            masterplan: randFrom(["illegalgains", "kidnapping", "strengtheningforces", "personalpower", "actsofterror"]), keywords: ["hostages", "guns"], gunmen: "armed guards", hostages: "captives", loot: "the sensitive intel",
            rivaltext: _.template(' ${rival.name} stands guard<%= rivalboost ? `, vigilant and keen-eyed.`: `.`%>'),
            gloat: [
                [`Welcome to my humble abode," your opponent sneers. "Too bad you won't be leaving." "Not without the captives," you retort. "Oh, I think you'll find leaving without them much easier,`, `But that won't be an option.`],
                [`Ah, I see you've found our little 'guests'," the cruel captor mocks. "Planning a rescue, are we?" "They're leaving with us," you declare. "Ambitious,`, `But foolish.`],
                [`You've made it farther than I expected," the captor admits. "But this is where your story ends." "Not today," you respond. "Today, everyone goes home." "A bold statement,`, `Let's see if you can back it up.`],
                [`Do you like what I've done with the place?" the boss quips, gesturing to the dark, damp room. "Seems a little tight for company," you shoot back. "Oh, they won't be staying long,`, `Neither will you.`],
                [`So noble, so foolish," your opponent observes. "Coming here to save souls you don't even know." "Everyone deserves freedom," you state firmly. "Freedom? Overrated,`, `But pain, now that's something everyone understands.`]
            ],
            hottrail: () => _.template(randFrom([
                'Moving through the shadows, you manage to avoid detection by ${enemy.minions()}. "Stay alert," you whisper, leading your team with the precision of a ghost, ever wary of ${possessiveSuffix(enemy.boss)} lethal strategies. Just as you near the captives, you are suddenly face to face with ${bossDescription(enemy)}. "${gloat[0]}" ${gPron(enemy, "subject")} growls "${gloat[1]}"',
                "You are yet unseen, and dart through the room like shadows to rescue the captured Citadel scouts before they break and ${enemy.boss} finds out what you know about the plans of the ${finalboss.name}."
            ])),
            coldtrail: () =>
                _.template(randFrom([
                    "Your team's aggressive entry into ${possessiveSuffix(enemy.name)} territory triggers alarms. Amidst the chaos, you catch sight of ${enemy.boss} as ${gPron(enemy, 'subject')} ${enemy.threat}, a stark reminder of the lethal dangers that lurk within. 'They think they can intimidate us,' you think to yourself, as you push forward, prepared for whatever may come your way.",
                    "You don\'t think you have time for subtlety, and make your move to rescue the captured Citadel scouts before they break and ${enemy.boss} finds out what you know about the plans of the ${finalboss.name}."
                ])),
            clueless: () => _.template(
                randFrom([
                    'Your position is suddenly compromised, and the mission spirals into chaos. In the confusion, you witness as ${enemy.boss} ${enemy.threat}, signaling his intent to not let you leave without a fight. "This just got more complicated," you realize, as you and your team brace for what\'s to come, knowing full well the risk of direct confrontation has just realized.',
                    'A captured Citadel scout breaks, and tells what little ${randFrom([`he`,`she`])} knows of what you have on ${possessiveSuffix(finalboss.name)} plans. ${enemy.boss} swings the pipe one more time and starts to move toward the next captive.<br><br>You have to move fast before anything important is revealed.'
                ])),
            prologue: () => _.template(randFrom([
                '<%= trail %>, your team discovers <%= knowledge != "hottrail" ? "an obscured" : "the" %> entrance to <%= possessiveSuffix(enemy.name) %> underground facility. Stealthily moving closer, the dim light reveals the extent of security measures deployed around the perimeter.<br><br>Tied up in a secluded corner, you see the captives, their expressions a mix of fear and resolve. Over the sound of a distant generator, ${possessiveSuffix(enemy.boss)} voice cuts through the silence, offering a menacing ultimatum. "This is your final opportunity to align with the inevitable," he declares.<%= rivalpresence ? " Just then, you catch a glimpse of a corner where " + rivaltext : "" %><br><br>${stagevar}',
                '${trail}, you locate <%=knowledge != "hottrail" ? `a`: `the`%> black site of the ${enemy.name}. You observe the bleak location from hiding. There are armed guards here and there, and you are certain there are hidden alarms everywhere.<br><br>The captives have their hands bound above their heads, bodies hanging inches from the floor of the dark and musty room. ${enemy.boss} says: "I\'ll give you this one chance to come clean before we start our procedures again."<%=rivalpresence ? ` Meanwhile,${rivaltext}` : ``%><br><br>${stagevar}',
                '${trail}, you are lead to what appears to be a <%= knowledge != "hottrail" ? "poorly hidden" : "hidden" %> hub of <%= possessiveSuffix(enemy.name) %> operations. Guards patrol diligently, suggesting no blind spot in the security network.<br><br>Within a makeshift prison, the captives are barely visible, shackled and defeated under the watchful eyes of their captors. "Consider your next words very carefully," you overhear ${enemy.boss} menacingly advise them. "They could very well be your last."<%= rivalpresence ? " In the midst of planning your next move, you note to you surprise that " + rivaltext : "" %><br><br>${stagevar}'

            ])),
            captured: _.template(randFrom([
                'Grogginess gives way to sharp clarity as you realize you\'re not in your own bunkroom but a makeshift cell. "Thought you\'d never wake up," a gruff voice sneers from the shadows. The ${enemy.name} has made you their guest — and not the honored kind. <%=stageindex == 0 ? `What was meant to be a stealth operation has turned into a dire standoff, and y` : `Y`%>our resilience has been tested under their relentless scrutiny. From the darkness, ${bossDescription(enemy)} emerges, and ${enemy.threat}. "Last chance to sing," ${gPron(enemy, "subject")} taunts, the threat hanging heavy in the air. Silence fills the room as you meet their gaze with defiance. "Have it your way," ${gPron(enemy, "subject")} scoffs, exiting with a promise of return. <%=rivalpresence ? `${rivaltext} You take advantage of a momentarily lapse in attention, and make your move!` : `You waste no moment, plotting your escape with the resolve of the cornered.`%>',
                '"Finally awake?" That\'s the first thing you hear after the splash of stale water jolts you awake. You have no idea how long you\'ve been a hostage of the ${enemy.name}, ${enemy.desc()} — but you\'d guess it\'s been at least a few days.<br><br><%=stageindex == 0 ? `Your simple recon mission went south, and now y` : `Y`%>ou\'ve been enduring  their tortures as they\'ve tried to get everything they could out of you. You\'ve held out for now but don\'t know how long you\'ll be able to keep it up. ${bossDescription(enemy)} ${enemy.threat} as ${gPron(enemy, "subject")} stares at you down. "I\'ll give you this one chance to come clean before we start our procedures again." Your silence is deafening as you stare at the floor. "Very well," ${enemy.boss} sneers. "I won\'t be gone for too long, ${defineAddressing(enemy)}. Don\'t get comfortable."<br><br>${ucInit(gPron(enemy, "subject"))} exits,<%=rivalpresence ? `while ${rivaltext}` : ` and as soon as the door closes behind ${gPron(enemy, "object")}, you begin working at your bonds.`%>'
            ])),
            finalvar: _.template(randFrom([
                'You have found out the location of their black site, and observe the bleak setting from hiding. There are armed guards here and there, and you are certain there are hidden alarms everywhere.<br><br>The captives have their hands bound above their heads, bodies hanging inches from the floor of the dark and musty room. ${enemy.boss} says:',
                'The compound looms ahead, bathed in the eerie glow of security lights — a fortress against the night. Stealth and cunning are your allies as you survey the scene, noting each guard\'s patrol path with precision.<br><br>Chains rattle softly in the silence, drawing your attention to the captives, each a shadow against the compound\'s stark interior. Amidst their quiet despair, ${possessiveSuffix(enemy.boss)} voice echoes, cold and merciless, a stark contrast to the hope you\'re here to bring:',
            ])),
            illegalgains: _.template(randFrom([
                '${trail}, you find out the ${getMasterPlan()} of the ${enemy.name}. They have covertly abducted some very influential individuals in government, finance and industry, and are blackmailing their families for funds to expand their own criminal operations. ${finalvar} "Hope that your family will cough the money up soon. I\'m at the very end of my patience."<%=rivalpresence ? ` Meanwhile,${rivaltext}` : ``%><br><br>Their captives will not hold much longer.',
                '${trail}, the web of deception unravels, revealing the ${possessiveSuffix(enemy.name)} ${getMasterPlan()}. Each hostage is a key to unlocking vast reserves of wealth and power, and they find themselves ensnared in a meticulously woven web of greed and ambition. ${finalvar} "The clock\'s ticking," sneers ${enemy.boss}, ${gPron(enemy, "subject")} voice a chilling reminder of the stakes at play. <%=rivalpresence ? ` Shadows move slightly, and you note ${rivaltext}` : `With each passing moment, the urgency mounts.`%><br><br>Action is imperative; hesitation could spell disaster not just for the captives but for the city itself.'
            ])),
            kidnapping: _.template(randFrom([
                '${trail}, the veil lifts on the ${possessiveSuffix(enemy.name)} hideout, a labyrinth of secrets with the ${vip.vip} at its core. Their master plan: to leverage the ${possessiveSuffix(vip.vip)} insider knowledge for an audacious bid to dominate ${vip.location}. ${finalvar} "This can go easy, or not," ${enemy.boss} smirks, offering a false choice cloaked in menace. <%=rivalpresence ? ` Tension crackles as ${rivaltext}` : `Time is slipping through your fingers like sand, and with it, the chance to disrupt their scheme.`%><br><br>The mission is clear: rescue the ${vip.vip} and dismantle the enemy\'s plot before it\'s too late.',
                '${trail}, you find out where the ${enemy.name} is holding the ${vip.vip}. Their ${getMasterPlan()} is to squeeze out all pertinent intel about ${vip.location}, and make their final move to control Ransom. ${finalvar} "I\'ll give you this one chance to come clean before we start our procedures again."<%=rivalpresence ? ` Meanwhile,${rivaltext}` : ``%><br><br>You have to move fast before anything important is revealed.'
            ])),
            strengtheningforces: _.template(randFrom([
                '${trail}, you learn that the ${enemy.name} has embarked on a chilling project: turning captives into ${randFrom(["Vandal","Dark Matter","Dynasty"])}-enslaved soldiers. ${finalvar} "Welcome to the future of warfare," ${enemy.boss} declares, showcasing a line of once-defiant Citadel soldiers now silent, their wills being overridden by cellular cortex override. "Your friends are next," ${gPron(enemy, "subject")} ${enemy.threat}. The sight of allies, stripped of their humanity, ignites a fiery resolve within you.<br><br>This mission has become a desperate fight to save your comrades from being lost to the machine.',
                '${trail}, you find out that within the heavily guarded confines of ${possessiveSuffix(enemy.name)} compound, a a grim shift in the balance of power unfolds. Among the captives are distinguished military strategists and seasoned warriors, each being coerced into serving the very force they once vowed to defeat. ${finalvar} "Consider this your new allegiance," ${enemy.boss} declares with a malicious grin, "Refuse, and face consequences far worse than death."<br><br>Your infiltration mission carries the weight of not just liberation but preventing a critical shift in power that could spell disaster for Global Gladiators.'
            ])),
            personalpower: _.template(randFrom([
                '${trail} you learn that in the depths of ${possessiveSuffix(enemy.name)}, science and sorcery converge into a sinister symphony. Here, captives are not merely prisoners; their very essences are siphoned through arcane machinery to fuel ${possessiveSuffix(enemy.boss)} quest for supremacy. ${finalvar} "True power," ${enemy.boss} declares with a predatory grin, "is harvested from the talents of others, concentrated and consumed." The machinery beyond the walls of the prison hum with the stolen vitality of thinkers and warriors alike, their unique abilities and life forces being distilled into elixirs that ${enemy.boss} will consume to gain their skills, knowledge, and prowess.<br><br>Your mission now carries the dual burden of halting this abominable practice and liberating the souls trapped within this nightmare.',
                '${trail}, a ${getMasterPlan()} to usurp untold powers deep within the clandestine chambers of the ${possessiveSuffix(enemy.name)} stronghold comes to light. Captured are the world\'s foremost mystics and sages, each a beacon of knowledge now dimmed by captivity. Bound by arcane restraints, they are compelled to impart their secrets to ${enemy.boss}, who seeks to amalgamate their wisdom for ${gPron(enemy, "possessive")} ${mysticalSynonym()} ascent to unparalleled might. ${finalvar} "Your minds are the keys to my ascension," ${enemy.boss} proclaims.<br><br>The stakes of your covert rescue are monumental, as each moment strengthens ${possessiveSuffix(enemy.boss)} grasp on power that should never be ${gPron(enemy, "possessive")}.'
            ])),
            actsofterror: _.template(randFrom([
                '${trail}, you learn of a repurposed forgotten warehouse where the ${enemy.name} will unveil their harrowing spectacle. Key public figures and vocal opponents, stripped of their freedom have been captured, with ${enemy.name} threatening their execution in a macabre display of power meant to break the spirit of any who oppose ${enemy.boss}. ${finalvar} "Let their fear be a lesson," sneers ${enemy.boss}, reveling in the terror that ${gPron(enemy, "possessive")} actions will unleash across the populace. A captive tries to whimper: "I can\'t bear another moment in this nightmare. I\'ve got family..." ${enemy.boss} ${enemy.execution(contact)}.<br><br>Your covert operation is not just a mission of mercy but a crucial strike against the tyranny threatening to unravel the social fabric.',
                '${trail}, you understand that the final showdown will go about in an abandoned factory turned prison, a stark contrast to the city\'s pulsing life just beyond its walls. Inside, under the harsh glare of flickering lights, a group of captives from all walks of life huddle together, bound and blindfolded, unaware of the fate that awaits them. "${enemy.boss} plans to make an example of them," whispers ${randFrom(enemy.minionnames)}, a hint of excitement in their voice for the dread spectacle to come. ${enemy.boss} surveys the room, a twisted smile spreading across ${gPron(enemy, "possessive")} face.<br><br>${finalvar} "Let the city see the price of resistance," ${gPron(enemy, "subject")} proclaims, setting the stage for a live broadcast of terror meant to shatter the spirit of any who dare oppose the ${enemy.name}. The countdown begins, not just to save the captives from a grim fate, but to prevent a blow that could cripple the resolve of Ransom City.',
            ]))
        },

        {
            name: "Ring of Fire",
            expansion: "essenceofevil",
            instory: 0,
            location: ["cursed", "remote"],
            bystander: "panicked villagers",
            stagebonus: {
                setup: `Flip one inactive objective token to it's active side and move it to a flame space.`
            },
            stagepenalty: {
                setup: `Search the stage deck for a copy of Path of Cinders, and play it.`
            },
            masterplan: randFrom(["actsofterror", "personalpower", "strengtheningforces"]),
            keywords: ["ritual", "explosions", "oni", "hostages"],
            antiair: "an expanding burst of hellfire",
            explosions: "gunpowder explosions",
            ritual: "Oni",
            rivaltext: _.template(' ${rival.name} stands guard<%= rivalboost ? `, vigilant and keen-eyed.`: `.`%>'),
            hottrail: () => _.template(randFrom([
                '${trail}, you piece together the fragments of the ${possessiveSuffix(enemy.name)} plan — a ritual of fire, isolated from prying eyes. You race toward a forgotten village deep in the hills, where the skies already burn with unnatural light.',
                '${trail}, your investigation reveals the target: a remote backwater settlement, far from help and perfect for a ritual this dangerous. You descend the cracked roads with certainty, arriving just as the first flames erupt from the square.',
                '${trail}, all signs point to an ancient village long abandoned by most. You press on through the wilderness, knowing that if you hesitate, ${enemy.boss} will complete the ritual before you even arrive. Smoke already stains the horizon as you close in.'
            ])),
            coldtrail: () => _.template(randFrom([
                '${trail}, you follow the clues to a long-forgotten village hidden deep in the hills. You know this is the ritual site — but as you approach, the sky is already alive with fire, and you can only hope you’re not too late.',
                '${trail}, the evidence finally makes sense — a distant, isolated settlement where no one will hear the screams. You make your way there through broken passes, but by the time you arrive, the ritual is well underway.',
                '${trail}, you are led to a remote village rarely marked on maps, the perfect hiding place for something this dangerous. Flames flicker beyond the treeline as you reach the outskirts, confirming your fears.'
            ]
            )),
            clueless: () => _.template(randFrom([
                '${trail}, you end up in a backwater village so distant it barely clings to the edge of the map. You thought this was a dead end — until smoke and panic pull you toward the square.',
                '${trail}, your search for answers led you to a remote, sleepy hamlet where little happens — except today. You arrive just as the earth shakes and a pillar of flame erupts from the village center.',
                '${trail}, you questioned locals in this forgotten village, expecting rumors of ${enemy.name}, but found nothing. Only when you reach the commons do you realize your mistake — ${enemy.boss} stands there, laughing as fire bursts from ${gPron(enemy,"possessive")} form, sending you reeling.'
            ])),
            prologue: () => _.template(randFrom([
                '${stagevar}<br><br>In the burning village square, ${enemy.boss} stands encircled by flame, ${gPron(enemy, "possessive")} silhouette flickering like a living nightmare. The shrieks of villagers echo between crumbling homes as they scramble toward rusting fire engines, too ancient to stand against this fury. "${gloat[0]}" ${gPron(enemy,"subject")} roars, voice rising above the chaos. "${gloat[1]}"',
                '${stagevar}<br><br>Flames twist skyward as ${enemy.boss} stands at the epicenter of a burning ritual circle. A demonic fury crackles beneath ${gPron(enemy,"possessive")} skin, barely restrained. Villagers scatter, some desperately trying to activate the broken-down fire trucks rusting in the square. "${gloat[0]}" ${gPron(enemy,"subject")} laughs, consumed by the storm. "${gloat[1]}"',
                '${stagevar}<br><br>The inferno reflects in ${possessiveSuffix(enemy.boss)} eyes as ${gPron(enemy, "subject")} raises ${gPron(enemy, "possessive")} arms, fire spiraling inwards. Around ${gPron(enemy, "object")}, villagers flee in panic, shouting for help that will not come. Forgotten fire engines sit idle as the blaze consumes the square. "${gloat[0]}" ${enemy.boss} sneers without fear. "${gloat[1]}"',
                '${stagevar}<br><br>A storm of fire coils around ${enemy.boss}, whose form wavers as something older and angrier leaks through ${gPron(enemy, "possessive")} flesh. Panicked villagers dart between burning structures, their only hope the rusting remnants of firefighting rigs left to rot in the village commons. "${gloat[0]}" ${enemy.boss} bellows, fire crackling from ${gPron(enemy, "possessive")} mouth. "${gloat[1]}"',
                '${stagevar}<br><br>Smoke and flame form a roaring vortex around ${enemy.boss}, ${gPron(enemy, "possessive")} body framed in an unnatural halo of fire. Ancient fire trucks sit silent in the corners of the square, unable to stop what\'s coming. Villagers cry out in terror as ${enemy.boss} shouts: "${gloat[0]}" ${enemy.boss} calls to the storm. "${gloat[1]}"'
            ])),
            captured: _.template(randFrom([
                'The acrid air stings your lungs as you awaken, bound within a circle of cracked earth and burning sigils. Distant chanting fills your ears as the flames pulse in rhythm with some unseen heart. ${enemy.boss} stands nearby, ${gPron(enemy,"possessive")} gaze fixed on the ring of fire, barely acknowledging your struggle. Around you, ${enemy.minions()} stalk the shadows, guarding the perimeter as the ritual nears its climax. Whatever purpose brought you here, you are now little more than pawns in this dark ceremony. The ground trembles violently — and in that moment of distraction, your chance comes. You tear free of your restraints as the inferno erupts around you.',
                'Your senses return amid choking smoke and blistering heat. You lie shackled in the ruins of the village square, the scorched stones beneath you radiating with unnatural warmth. ${enemy.boss} stands tall over the ritual circle, arms raised as ancient words pour from their mouth. Flames spiral upward in a vortex of power, and you realize the invocation is nearly complete. Faint memories return — the fight, the defeat. Whatever your failure was, it has led to this. Sparks ignite the sky as the ritual’s energy lashes out — and in the chaos, your bonds crack. You surge to your feet, ready or not.',
                'The heat claws at your skin as consciousness returns, every breath a struggle against the smoke. You find yourself bound to a scorched pillar at the edge of the ritual site, watching helplessly as ${enemy.boss} channels the firestorm’s fury. ${ucInit(enemy.minions())} chant from the shadows, feeding power into the burning circle that surrounds you. Your fate now seems sealed as fuel for the ritual’s final act. But as the flames surge out of control, cracks form in the ritual circle, sending shockwaves through the ground. You wrench yourself free just as the storm breaks loose, scattering the minions in panic.'
            ])),
            approach: randFrom([
                'You embark on a Citadel transport, but <%=getPropertyValue(enemy, stage, "antiair", "a blast of hellfire")%> forces the plane to veer away. You parachute down and trek the last kilometers through ash-choked fields.',
                `The journey by armored convoy ends at a scorched treeline, where the road dissolves into burning hills. From there, you advance on foot toward the glow of the village inferno.`,
                `A firestorm front cuts off air support, forcing your drop ship to abort its descent. You rappel down through the smoke and emerge on the outskirts, where the land burns under an unnatural sky.`,
                `You traverse a dead riverbed beneath skies of molten red, the village’s flames reflecting on the cracked earth. Every step forward brings searing heat, and the air hums with unholy energy.`,
                `The Oni's wrath has ignited the forests around the village, forcing you to circle through rocky passes and descend into the burning basin. There, the village flickers like a torch in the night.`,
                `The storm of embers parts only briefly as you crest the final ridge. Below lies the village, wreathed in flame, its streets already claimed by the inferno’s hunger.`
            ]),
            personalpower: _.template(randFrom([
                '${trail}, you learn the ${enemy.name} intend to claim ultimate strength from the power of Oni residing in a distant village. ${finalvar} "${gloat[0]}" ${ucInit(gPron(enemy,"possessive"))} voice echoes as ${gPron(enemy,"possessive")} form seems to swell with power, drawing the flames into ${gPron(enemy,"reflexive")}. "${gloat[1]}"${laconicStatement(enemy)}',
                '${trail}, the truth of the ${possessiveSuffix(enemy.name)} ${getMasterPlan()} is revealed. ${enemy.boss} seeks to burn away ${gPron(enemy,"possessive")} mortality and rise reborn in fire. ${finalvar} "${gloat[0]}" ${enemy.boss} growls with the sound of burning embers. ${gloat[1]}${laconicStatement(enemy)}',
                '${trail}, you uncover the ${possessiveSuffix(enemy.name)} ${getMasterPlan()}: for ${enemy.boss} to become one with the flames. ${finalvar} "${gloat[0]}" ${enemy.boss} shouts over the sound of an explosion. "${gloat[1]}"<br><br>This is no mere spectacle — it is an ascension.'

            ])),
            actsofterror: _.template(randFrom([
                '${trail}, you discover the ${enemy.name} have unleashed a terror campaign, escalating the hellfires of Oni to burn alive whole villages, breaking the people\'s will against whatever plans ${enemy.desc()} has. ${finalvar} "${gloat[0]}" ${ucInit(gPron(enemy,"possessive"))} voice cuts through the crackling flames. "${gloat[1]}"${laconicStatement(enemy)}',
                '${trail}, the burning truth behind the ${possessiveSuffix(enemy.name)} ${getMasterPlan()} emerges. ${enemy.boss} seeks not only to destroy the sacred village, but to sow fear that will outlast the fire. ${finalvar} "${gloat[0]}" ${enemy.boss} growls with sadistic delight. "${gloat[1]}"${laconicStatement(enemy)}',
                '${trail}, you uncover the ${possessiveSuffix(enemy.name)} ${getMasterPlan()}: to use the inferno of Oni hidden in a remote mountain village as a symbol of dread. ${finalvar} "${gloat[0]}" ${enemy.boss} roars above the screaming winds. "${gloat[1]}"<br><br>This is no mindless blaze — it is a message of fear.'
            ]
            )),
            strengtheningforces: _.template(randFrom([
                '${trail}, you realize the ${enemy.name} are summoning Oni spirits through raising a firestorm in the sacred village, swelling their forces amidst the flames. ${finalvar} "${gloat[0]}" ${ucInit(gPron(enemy,"possessive"))} voice reverberates like a war drum. "${gloat[1]}"${laconicStatement(enemy)}',
                '${trail}, the ritual hidden in the ${possessiveSuffix(enemy.name)} ${getMasterPlan()} becomes clear: ${enemy.boss} calls forth forgotten horrors from beyond the fire. The distant village is in the crux of the mystical lines where the power of Oni will breach the barriers of this world and the others. ${finalvar} "${gloat[0]}" ${enemy.boss} chants through the smoke. "${gloat[1]}"${laconicStatement(enemy)}',
                '${trail}, you uncover the ${possessiveSuffix(enemy.name)} ${getMasterPlan()}: to awaken an army of demons beneath the burning skies. You must hurry to the mountain village before the ritual finishes and the portal yawns open. ${finalvar} "${gloat[0]}" ${enemy.boss} howls, and the shadows answer. "${gloat[1]}"<br><br>The flames become the forge of war.'
            ])),
            finalvar: _.template(randFrom([
                '${approach}<br><br>Flames twist through the wreckage as you enter the scorched square. ${enemy.boss} stands at the center of a burning halo, a silhouette against the inferno’s glow. Burning debris crashes around you as the ritual’s power builds to its breaking point.',
                '${approach}<br><br>The heat scalds your lungs as you push through collapsing alleyways. ${ucInit(enemy.minions())} scatter into the shadows, unable to endure the blaze. In the heart of the inferno, ${enemy.boss} stands unmoved, arms raised as the firestorm spirals upward in answer to ${gPron(enemy,"possessive")} call.',
                '${approach}<br><br>As you breach the final barricade to the village square, the flames roar high enough to devour the heavens. ${enemy.boss} waits at the epicenter, surrounded by writhing fire and shattered relics. The ritual’s climax is moments away, and the heat radiating from ${gPron(enemy,"object")} is nearly unbearable.'
            ])),
            gloat: [
                [`The flames of Oni will cleanse this land!`, `You cannot douse hatred with buckets and prayers!`],
                [`You fight to save the weak? They will burn all the same!`, `Your struggle only fans the flames higher!`],
                [`The fire trucks are relics of a forgotten age,`, `They’ll rust and burn just like your hope!`],
                [`You cannot comprehend the forces you've awakened," <%=enemy.boss%> growls. "This firestorm isn’t natural — it’s a curse unleashed by your recklessness!" you cry. "Only because you dared challenge me!`, `Now watch your world turn to ash.`],
                [`Your efforts are meaningless in the face of rebirth," <%=enemy.boss%> sneers. "We'll stop this ritual and save these people!" you shout through the smoke. "Ritual? No... This is a rebirth!`, `Burning away your false peace!`],
                [`The village itself rejects your heroism,`, `Its cries silenced beneath the roar of the blaze!`]
            ]
        },

        {
            name: "Sky High",
            expansion: "tideofthedragon",
            instory: 0,
            location: ["urban"],
            bystander: "tower technician",   
            pit: 'the ledge of the skyscraper roof',     
            stagebonus: {setup: `Place 1 damage on each objective.`},        
            stagepenalty: {setup: `Search the Stage Deck for a copy of Reinforcements, and play it. Shuffle the Stage Deck.`},
            masterplan: randFrom(["actsofterror", "illegalgains", "kidnapping", "strengtheningforces"]),
            keywords: ["heights"],
            gloat: [
                [`You climbed all this way just to fall,`, `And I haven’t even finished aligning the arrays yet.`],
                [`Look down, <%=enemy.addressing%>,`, `That whole city is one good signal away from belonging to me.`],
                [`I used the streets to buy silence,`, `Now I’ll use the sky to sell fear to the world.`],
                [`See those blinking lights?`, `Each one is another nail in this city’s coffin.`],
                [`Up here, there’s nowhere else to for you to run,`, `But I'll help you get down faster than running!`],
                [`You think you stopped my people in the streets,`, `But once I'm finished with you, the street will stop you.`],
                [`The wind, the height..`, `It’s the perfect place for the world to watch you lose.`]
            ],
        
            rivaltext: _.template('<%= rivalboost ? ` ${rival.name} is already on the roof, half-sheltered behind a satellite dish, drawn here by the same signal that led you.` : ` You spot ${rival.name} clinging to cover near the helipad, clearly having arrived only moments before you.` %>'),
        
            hottrail: () => _.template(
                randFrom([
                    '${trail} you a helicopter drop is the fastest way up. The cabin shakes violently as the rotors fight the storm. Spotlights sweep across the rooftop as the pilot hovers low enough for you to jump. Boots hit metal, wind surges — you’re on the roof.',            
                    '${trail} there’s no time for subtlety. A tactical drone slings you up the final meters of the tower before banking away into the darkness. You land hard on the rooftop plating, wind howling around you as the situation snaps into focus.',
                    '${trail} a fast-rope deployment gets you airborne and moving. The rope whips in the wind as you descend onto the helipad. The moment your feet touch down, the chopper peels off into the storm — leaving you alone with the rooftop, the arrays, and the enemy.',
                    '${trail} you know getting in from the ground floor is going to be near-impossible due to the heavy security both inside and out. Thankfully, your connections allow you to \'borrow\' a helicopter to land on the roof.'
                ])
            ),
            
        
            coldtrail: () => _.template(
                randFrom([
                    '${trail} you reach a downtown skyscraper, but the elevators are locked down and access points sealed. You climb floor after floor through the maintenance stairwell until your legs burn. One last metal door slams open, and the rooftop wind nearly lifts you off your feet.',
            
                    '${trail} you arrive on location. The lower levels are deserted, but a half-functional freight elevator takes you as high as it dares, and the rest of the ascent is ladders, service shafts, and emergency hatches. At last you shove a final panel aside, and the rooftop storm greets you with force.',
            
                    '${trail} you zero in on downtown corporate tower, but every direct approach is blocked — locked doors, disabled lifts, sealed access points. A rattling fire escape is your only option. Climbing into the storm, you drag yourself up rung by rung until you haul over the final barrier onto the rooftop itself.'
                ])
            ),
            
        
            clueless: () => _.template(
                randFrom([
                    '${trail}, you arrive to check out a routine disturbance at a downtown tower — some lights flickering, some nervous reports about strange work crews. It isn’t until the elevators cut out and the backup generators hum to life that you realize: someone has turned the rooftop into a command center.',
                    'Lost for clues, you were just looking for a vantage point — a rooftop with a clear view of the city. Instead, you find a skyscraper bristling with fresh antennae and scrambled ID tags. None of the crews on site are on any official roster, and every one of them answers to the ${enemy.name}.'
                ])
            ),
        
            prologue: () => _.template(
                randFrom([
                    '${stagevar}<br><br>The wind up here hits hard, tearing at clothes and drowning out weaker sounds. Helicopters circle the tower, their rotors beating the storm into a constant roar. Antennae blink red and white against the night sky, and at the center of it all stands ${enemy.boss}, framed by humming communication arrays and the vast city below. "${gloat[0]}" ${gPron(enemy,"subject")} calls over the gale. "${gloat[1]}"',
                    '${stagevar}<br><br>The rooftop is a maze of cables and anchoring brackets, all leading toward a central uplink dish. The edge is never more than a few strides away, and the storm seems eager to pull anything unwary into the void. Technicians under guard work furiously to finish alignment while spotlights sweep past in jagged arcs. ${enemy.boss} barely spares you a glance, as if you were just another blinking light on the console. "${gloat[0]}" ${gPron(enemy,"subject")} says. "${gloat[1]}"',            
                    '${stagevar}<br><br>The city sprawls beneath you like a map waiting for orders. Spotlights sweep across cloud and glass as choppers orbit the tower, guarding the operation. You can feel the rooftop tremble under the tension. ${enemy.boss} stands with the wind at ${gPron(enemy,"possessive")} back, the arrays almost ready. "${gloat[0]}" ${gPron(enemy,"subject")} announces. "${gloat[1]}"',
                    '${stagevar}<br><br>Unfortunately, it seems the ${enemy.name} knew you were coming, and sent their own helicopter complete with a welcome party. "${gloat[0]}" says ${enemy.boss}. "${gloat[1]}" ${ucInit(gPron(enemy, "subject"))} then turns to ${gPron(enemy,"possessive")} group. "Get that signal out, we\'ll need to get everyone hear for what\'s coming!"'
                ])
            ),
            
            finalvar: _.template(randFrom([
                '<br><br>The storm lashes across the rooftop, lights flashing over steel and concrete as the last systems lock into place. ${enemy.boss} turns fully toward you at last, the arrays humming behind them like a throne made of signal and sky. "${gloat[0]}" ${gPron(enemy,"subject")} says — then, with a voice that cuts through the wind like a blade: "${gloat[1]}"',

                '<br><br>Searchlights sweep across the rooftop, catching ${enemy.boss} standing near the active uplink, utterly fearless in the chaos. The wind whips their coat sideways as they face you, expression sharpened by confidence. "${gloat[0]}" ${enemy.boss} declares over the roar. Then comes the colder sentence — quieter, but final: "${gloat[1]}"',
            
                '<br><br>The last indicator light turns green and the rooftop trembles under the weight of what comes next. ${enemy.boss} watches you with the calm of someone who expected this moment — and welcomes it. "${gloat[0]}" ${gPron(enemy,"subject")} calls, raising a hand toward the arrays. A breath later, the follow-through drops like a verdict: "${gloat[1]}"',
            
                '<br><br>Wind tears across the helipad, scattering grit and paper as helicopters hover overhead. ${enemy.boss} steps forward, confidence carved into every movement, the skyline burning behind ${gPron(enemy, "object")} with possibility. "${gloat[0]}" ${gPron(enemy, "subject")} says — and then, with the unmistakable finality of a bell marking the start of a duel: "${gloat[1]}"'
            ])),
            
            captured: _.template(
                randFrom([
                    'You jolt awake, lashed to a grounded antenna mast as the wind tears at your clothes and stings your eyes. Below, the city glitters, oblivious. Nearby, ${enemy.minions()} work on the final connections, occasionally glancing your way with smug satisfaction. ${enemy.boss} didn’t have you thrown off the edge — ${gPron(enemy,"subject")} wanted you here to see the moment the signal goes live. The cable around your wrists creaks as you pull. One good wrench, and this rooftop turns into a battle.',
                    'The world comes back in fragments — rotor thrum, cold metal, the sharp buzz of electronics. You’re strapped to a maintenance barrier near the edge, the drop yawning just meters away. Technicians rush between consoles as ${enemy.minions()} keep watch. You weren’t executed in some alleyway because a corpse can’t appreciate defeat from this high up. A loose bracket digs into your palm and shifts. One twist, one break — and everything changes.',
                    'You regain consciousness slumped against a rooftop railing, hands bound behind you and rain needling your face. The uplink dish glows brighter with each completed sequence, status lights blinking toward something irreversible. “Leave them,”${randFrom(enemy.minionnames)} mutters. “They should see it.” They expect you to watch this city fall in silence. Instead, you feel the rope give under your weight. The next move is yours.'
                ])
            ),
        
            // Masterplan-specific finale intros for this stage
            actsofterror: _.template(
                randFrom([
                    '${trail}, you uncover the ${getMasterPlan()} — ${enemy.boss} isn’t just controlling one neighborhood through fear, ${gPron(enemy,"subject")} is about to beam that fear into every home, every phone, every emergency channel in the city. The rooftop arrays atop this tower are tuned to hijack the systems people trust most. If you don’t reach the top before the alignment completes, terror stops being rumor and becomes broadcast policy.${finalvar}',
                    '${trail}, the pattern becomes unmistakable: the ${enemy.name} has a message meant for everyone below. ${enemy.boss} plans to use the skyscraper’s communications grid to turn one night of violence into a lasting myth of invincibility. Once the signal goes out, resistance won’t just be dangerous — it’ll feel pointless.${finalvar}'
                ])
            ),
        
            illegalgains: _.template(
                randFrom([
                    '${trail}, you realize the ${getMasterPlan()}: all of the criminal activity fed offshore accounts and bought access to international networks. Now, on a rooftop lined with arrays, ${enemy.boss} is about to move the last of the city’s wealth out of reach while striking alliances far beyond these streets.${finalvar}',
                    '${trail}, you arrove at a corporate tower whose rooftop uplinks are about to turn local extortion into global influence. If you don’t stop the transfer here, the ${enemy.name} won’t just own a neighborhood or a city. They’ll buy their way into the international crime scene overnight.${finalvar}'
                ])
            ),
        
            kidnapping: _.template(
                randFrom([
                    '${trail}, you learn that ${vip.vip} has been taken to the top of a downtown broadcast tower. ${enemy.boss} plans to chain the city’s fear and the world’s attention together by putting the hostage in front of the cameras as the arrays go live. This isn’t just leverage — it’s a public breaking, meant to show that no rank or title stands above the ${enemy.name}.${finalvar}',
                    '${trail}, you uncover that the ${getMasterPlan()} hinges on a single symbol: ${vip.vip}. Held on a windswept rooftop and framed by communication arrays, the captive will be forced into a worldwide message of surrender. If you don’t reach the top in time, the city — and everyone watching — will see its protectors humiliated into silence.${finalvar}'
                ])),
            strengtheningforces: _.template(
                randFrom([
                    '${trail}, you decode the ${getMasterPlan()}: ${enemy.boss} plans to use the rooftop arrays to weld scattered gangs, cells, and crews into a single coordinated force under the ${enemy.name} banner. Once the signal goes live, every corner of the city becomes part of one synchronized army.${finalvar}',
                    '${trail}, the scope of the ${getMasterPlan()} becomes terrifyingly clear. The arrays atop the tower will carry encrypted orders, assignments, and propaganda to every recruit the ${enemy.name} has ever touched. If you don’t sever that connection now, you won’t just be fighting criminals anymore — you’ll be fighting an organized regime that was born in one night, on one roof.${finalvar}'
                ])
            )
        },
        

        {
            name: "Rude Awakening", expansion: "stretchgoals17", instory: 0, location: ["cursed", "remote"], bystander: "trembling graveyard worker", pit: "a bottomless fissure",
            stagebonus: { setup: `Flip all objectives to their inactive side.` },
            stagepenalty: { setup: `Place 1 damage on the Stage Rules card.` },
            masterplan: randFrom(["actsofterror", "strengtheningforces", "illegalgains"]), keywords: ["ritual", "undead", "swarmed"], ritual: "Afflicted Realm", swarm: "undead",
            gloat: [
                [`Klaatu verata..`, `Nikto!`],
                [`Even the strongest warriors will fall,`, `In the face of the power of death!`],
                [`Now I call upon my army of the dead,`, `Arise, my messengers of death! Our time has arrived!`],
                [`Raising the dead won't give you the world," you shout in defiance. "It'll only bring more darkness. We're here to end this nightmare!" "Ah, but darkness is where power lies, Gladiators. My army grows with every moment,`, `Soon, you too will serve the shadow.`],
                [`This is wrong. These souls deserve peace, not enslavement to your twisted will," you assert, your voice a beacon of resolve in the oppressive darkness. "Peace? Peace is a lie for the weak,`, `True power demands sacrifice!`],
                [`Every incantation you utter, every life you disturb, it's all coming back to you. The darkness won't protect you forever," you warn, your stance defiant as you confronts the practitioner of dark arts.  "Ah, but darkness is an old friend,`, ` It whispers secrets of ancient power, of dominion over life and death. Fear it if you must, but I have embraced it.`],
                [`You think you control the dead, but you're just another pawn in a game older than time itself," you state, matter-of-factly, even as the ground trembles with the stirring of restless spirits.  "Control? No, I am their liberator,`, `Their shepherd to a new dawn where death is but a journey to a different kind of power.`],
                [`Arise, my shadowed brethren,`, `Let the chains of mortality fall away as you walk the earth once more!`],
                [`With each soul that bends to my will,`, `Our ultimate victory draws nearer!`]
            ],
            rivaltext: _.template(' To your horror, you see <%=rivalboost ? `the rotting corpse of ${rival.name} among the zombies that climb out of the ground at ${gPron(enemy, "possessive")} feet.`: `${rival.name} joining ${enemy.boss} in the atrocious rite! Even more zombies climb out of the ground at their feet.`%>'),
            hottrail: () => _.template(randFrom([
                'Beneath the cloak of night, your team advances. In the distance, ${bossDescription(enemy)} orchestrates a ghastly ritual with vile ${randFrom(["sorcerers", "wizards", "acolytes", "priests", "necromancers"])} at ${gPron(enemy,"object")} command. The air hums with malevolent energy as the earth splits, unleashing the undead.',
                'You notice in the distance ${bossDescription(enemy)}. A coven of dark ${randFrom(["sorcerers","wizards","acolytes","priests","necromancers"])} is gathering around ${gPron(enemy,"object")}, and broken and decayed bodies are rising from the ground. Maybe you can stop this before it has really begun.'
            ])),
            coldtrail: () => _.template(randFrom([
                'A dense mist obscures your path, you are unsure of what to expect. Farther ahead, through the mist, the silhouette of ${bossDescription(enemy)} emerges, a dark orchestrator in the fog. Suddenly you realize the fog conceals a vast shambling horde of the dead. "Our plans may need adjusting," you concede.',
                'You see a veritable sea of people, all of them shambling about, all of them appearing broken and decayed. As you look over the zombies around you, you notice in the distance ${bossDescription(enemy)}.'
            ])),
            clueless: () => _.template(randFrom([
                'You don\'t know what to expect. The sight that unfolds — a relentless march of the undead towards Ransom City, led by the ominous figure of ${bossDescription(enemy)} — sparks a clarity of purpose. "So this is the storm we must weather," you declare. Though unprepared for this nightmare, your resolve to protect the innocent remains unshaken.',
                'You see a veritable sea of people, all of them appearing broken and decayed. They are shambling in the general direction of Ransom City, like driven by a sinister purpose. As you look over the zombies around you, you notice in the distance ${bossDescription(enemy)}.'
            ])),
            prologue: () => _.template(randFrom([
                '${trail}, you arrive at <%=knowledge != "hottrail" ? `${whichPreposition(evilPlace())}`: `the ${evilPlace()}`%>. ${stagevar}<br><br>With a commanding presence, ${gPron(enemy,"subject")} stands before you, the air around ${gPron(enemy, "object")} crackling with dark energy. "${gloat[0]}” booms across the field, a declaration of power. In response, the earth itself seems to moan, yielding more undead warriors to ${gPron(enemy, "possessive")} call. "${gloat[1]}" The battle lines are drawn, your resolve tested against the gathering storm. <%=rivalpresence ? rivaltext : ``%><br><br>${laconicStatement(enemy)}',
                '${trail}, you find yourself at <%=knowledge != "hottrail" ? `${whichPreposition(evilPlace())}`: `the ${evilPlace()}`%>. ${stagevar}<br><br>${ucInit(gPron(enemy,"subject"))} looks at you and raises ${gPron(enemy, "possessive")} hands. "${gloat[0]}" ${gPron(enemy, "subject")} shouts, and is surrounded by ${mysticalSynonym()} energy. "${gloat[1]}" <%=rivalpresence ? rivaltext : `You see even more zombies climb out of the ground at ${gPron(enemy, "possessive")} feet.`%><br><br>${laconicStatement(enemy)}'
            ])),
            approach: randFrom([
                [`you are flown to your newest target`, `Agent Fletch says, shouting over the roar of the helicopter`, `He looks out the window and then nods to you. "See for yourself." Below you see a veritable sea of people, all of them shambling about, all of them appearing broken and decayed.<br><br>You slide down the climbing rope and watch as the helicopter flies away.`],
                [`the team approaches the target location in the dead of night`, `you whisper to your companions, blending into the shadows`, `You signal the team to look ahead. "There," you murmur. In the moonlight, countless figures move aimlessly, their forms broken, their motions haunting. "It's worse than we thought."<br><br>Moving silently, you blend back into the darkness, the mission clear.`],
                [`the armored van barrels down the deserted streets`, `Agent Fletch says, the rumble of the engine drowning out his voice`, `He slams the van into park and points forward. "Look." The scene outside is grim: a legion of the undead, as far as the eye can see, each step they take a mockery of life. "This is our battleground."<br><br>Doors fly open, and you step out, ready to confront the horror.`]
            ]),
            finalvar: _.template(randFrom([
                'Amidst the relentless advance of the undead, your gaze locks onto ${bossDescription(enemy)} standing defiantly at the epicenter of chaos. ${ucInit(gPron(enemy,"subject"))} meets your stare with a smirk, gesturing grandly as dark energy crackles around ${gPron(enemy, "possessive")} form. "${gloat[0]}" echoes across the battlefield, ${gPron(enemy, "subject")}’s voice laced with power. In response, the ground trembles, as if nature itself rebels against ${gPron(enemy, "possessive")} will, summoning more undead to ${gPron(enemy, "possessive")} side. "${gloat[1]}"<%=rivalpresence ? rivaltext : ``%><br><br>${laconicStatement(enemy)}',
                'As you look over the zombies around you, you notice in the distance ${bossDescription(enemy)}. ${ucInit(gPron(enemy,"subject"))} looks at you and raises ${gPron(enemy,"possessive")} hands. "${gloat[0]}" ${gPron(enemy, "subject")} shouts, and is surrounded by ${mysticalSynonym()} energy. "${gloat[1]}" <%=rivalpresence ? rivaltext : `You see even more zombies climb out of the ground at ${gPron(enemy, "possessive")} feet.`%><br><br>${laconicStatement(enemy)}',
                'As the cacophony of of the dead rages, your focus narrows to ${bossDescription(enemy)}, who stands aloof, a conductor orchestrating a symphony of destruction. With a casual flick of ${gPron(enemy, "possessive")} wrists, ${gPron(enemy, "subject")} summons swirling energies that dance menacingly around. "${gloat[0]}” ${gPron(enemy, "subject")} taunts, the air vibrating with the power of ${gPron(enemy, "possessive")} words. Suddenly, the earth splits, disgorging a fresh wave of undead warriors at ${gPron(enemy, "possessive")} command. "${gloat[1]}"<%=rivalpresence ? rivaltext : ``%><br><br>${laconicStatement(enemy)}.'
            ])),
            illegalgains: _.template(randFrom([
                '${trail}, ${approach[0]}. "In a chilling twist on greed, the ${enemy.boss} has devised a scheme that mocks the very essence of human endeavor," ${approach[1]}. "By enslaving an undead army to toil in the shadows, they plan to flood the market with goods, undercutting the economy and amassing a fortune on the backs of the voiceless dead. This macabre exploitation threatens to upend the financial system, turning wealth and power into playthings for the unscrupulous." ${approach[2]} ${finalvar}',
                '${trail}, ${approach[0]}. "In an audacious move by ${enemy.boss}, capitalism\'s relentless drive has been given a literal skeleton crew," ${approach[1]}. "This undead workforce, tirelessly laboring without complaint, pay, or breaks, represents the ultimate dream of unchecked greed — a bottomless well of labor poised to amass untold wealth for the ${enemy.name}." ${approach[2]} ${finalvar}'
            ])),
            actsofterror: _.template(randFrom([
                '${trail}, ${approach[0]}. "We have uncovered the ${getMasterPlan()} of the ${enemy.name}, Gladiators," ${approach[1]}. "${enemy.boss} is using ${mysticalSynonym()} sorcery to raise the dead to ravage the unsuspecting population of Ransom City." ${approach[2]} ${finalvar}',
                '${trail}, ${approach[0]}. "Ransom City is on edge of abyss, terror gripping its citizens as the undead threat looms at the proverbial gates," ${approach[1]}. "The final act looms, a battle not just for survival, but for the soul of the city itself." ${approach[2]} ${finalvar}',
                '${trail}, ${approach[0]}. "${bossDescription(enemy)}, in a stroke of malevolent genius, seeks to subvert the very foundations of society with an undead workforce," ${approach[1]}. "This army, devoid of will and tireless, is poised to overturn the labor market, plunging the economy into a nightmare from which there might be no awakening." ${approach[2]} ${finalvar}'
            ])),
            strengtheningforces: _.template(randFrom([
                '${trail}, ${approach[0]}. "We have uncovered the ${getMasterPlan()} of the ${enemy.name}, Gladiators," ${approach[1]}. "${enemy.boss} is using ${mysticalSynonym()} sorcery to raise the dead to add to the ranks of the ${enemy.minions()}." ${approach[2]} ${finalvar}',
                '${trail}, ${approach[0]}. "Intelligence reports confirm the worst: the enemy is amassing an army of the undead, unlike anything seen before," ${approach[1]}. "The ${enemy.name} is not just strengthening their forces; they\'re planning an assault that could overrun Ransom!" ${approach[2]} ${finalvar}'
            ]))
        },

        {
            name: "Running Wild", expansion: "legendofoni", instory: 0, location: "remote", bystander: "civilian", pit: "a very deep dig",
            stagebonus: { setup: `Any fighter may put this card in their play area. <b>Feint:</b> Roll 3 enemy dice; for each different result, remove 1 power from "The Final Key".` },
            stagepenalty: { setup: `Each fighter places 3 random defense tokens on their copy of "Hunt for the Idols".`, persistent: `The defense tokens on "Hunt for the Idols" block search successes and are discarded as normal.` },
            masterplan: randFrom(["illegalgains", "personalpower", "actsofterror"]), keywords: ["labyrinth", "retrieval"], labyrinth: "dense woods", loot: "the idols",
            gloat: [
                [`You won’t stop the inevitable!`, `I’ll end you here, with or without the Oni!`],
                [`With the idols in my hands,`, `You and the Citadel will burn.`],
                [`The idols belong in a museum," you say. "You got some nerve, Gladiators!`, `The idols belong to me!`],
                [`These idols hold more than just power; they're the key to stopping what's coming," you mutter. "You think you're the first to try?`, `Many have lost themselves to the forest's embrace!`],
                [`Each step could be a trap, but we can't afford to turn back now," you state, matter-of-factly, your eyes scanning the shadowy terrain for any sign of the relics. "Your bravery is commendable, but futile,`, `The forest guards its secrets well.`],
                [`I can feel the idols calling out. We're close," you whisper to your companions.  "So near, yet so far,`, `This forest is my domain, and it does not yield its treasures lightly!`],
                [`You're free to search. The forest is vast, and its dangers many,`, `Each idol you seek is another chance for you to meet your end.`],
                [`You seek to disrupt the balance for your gain, but you will find only despair here`, `The idols are not meant for the likes of you.`]
            ],
            rivaltext: _.template(', guided to the location by <%=rivalboost ? `the spirit of Oni possessing`: ``%> ${rival.name}'),
            hottrail: () => _.template('Fortunately, it seems the goons of the ${enemy.name} don\'t have too much of a headway.'),
            coldtrail: () => _.template('If you hope to be the first to find them, there\'s no time to waste.'),
            clueless: () => _.template('You are late to the party..'),
            prologue: () => _.template(randFrom([
                '${trail}, it seems there are a number of enchanted idols in the forest, according to legend used in a ritual to channel the Oni\'s power. The <%=finalboss.name == enemy.name ? `${enemy.name} is here`: `${finalboss.name} has sent some mercenaries`%> to recover the idols.<br><br>You make your way to this forest and soon find yourself lost in its natural labyrinth. Finding these idols won\'t be easy. To make matters worse, ${bossDescription(enemy)} is there<%=rivalpresence ? `${rivaltext}. They are` : ``%> overseeing the dig by the ${enemy.minions()} to recover the idols near a crumbling ${evilPlace()}. ${stagevar}<br><br>"${gloat[0]}" ${enemy.boss} shouts at you as ${gPron(enemy, "subject")} watches your approach. "${gloat[1]}"',
                '${trail}, the race is on in the depths of the Forest of Sorrows, where intel indicates some enchanted idols imbued with the essence of Oni are hidden. <%=finalboss.name != enemy.name ? `The fearsome ${enemy.name} has deployed forces` : `${finalboss.boss}, ${finalboss.bosstitle()} has deployed mercenaries`%> to scour the forest and claim the idols for their dark purpose.<br><br>The forest itself is a maze of deceit, with paths that twist and turn, misleading all but the most determined. As you navigate the treacherous terrain, <%=finalboss.name === enemy.name ? `${enemy.name} is already here, conducting the search` : `mercenaries under ${possessiveSuffix(finalboss.name)} command are combing through the forest`%>, determined to unearth the idols. ${bossDescription(enemy)} is there<%=rivalpresence ? `${rivaltext},` : `, a looming threat`%> overseeing the operation. The ${enemy.minions()} move with dark ambition near the ${evilPlace()} that serve as a beacon to those who know what signs to look for. ${stagevar}<br><br>"${gloat[0]}" ${enemy.boss} taunts as ${gPron(enemy, "subject")} surveys the area. "${gloat[1]}"'
            ])),
            finalvar: _.template('You make your way to this forest and soon find yourself lost in its natural labyrinth.<br><br>You eventually find ${bossDescription(enemy)}<%=rivalpresence ? `${rivaltext}.` : `.`%> "${gloat[0]}" ${gPron(enemy,"subject")} greets you. "${gloat[1]}" If you hope to be the first to find the idols, there\'s no time to waste.'),
            personalpower: _.template('${trail}, you have learned the ${getMasterPlan()} of ${enemy.boss}. The ${enemy.name} intend to conduct a ritual with enchanted idols hidden deep in the Forest of Sorrow. If they succeed, they will draw the full power of the mystical Oni to ${enemy.boss} ${gPron(enemy,"reflexive")}, and become a force so relentless that the Citadel and the Global Gladiators will not be able to keep them in check. ${finalvar}'),
            illegalgains: _.template('${trail}, you have learned the ${getMasterPlan()} of ${enemy.boss}. The ${enemy.name} intend to retrieve the idols deep within the Forest of Sorrows that according to legend are used to in the ritual to channel Oni\'s power. They will sell them to the highest bidder among a multitude of rogue nations and shadowy organizations. With the funding they will be able to expand their criminal operations in Ransom so that Global Gladiators can contain them no more. ${finalvar}'),
            actsofterror: _.template('${trail}, you have learned the ${getMasterPlan()} of ${enemy.boss}. The ${enemy.name} intend to conduct a ritual with enchanted idols hidden deep in the Forest of Sorrow. If they succeed, they will use the idols to release the full power of the mystical Oni in Ransom, wiping out most of the city in a calamitous firestorm. ${finalvar}'),
        },

        {
            name: "Snowdown", expansion: "lamentofthebloodmoon", instory: 0, location: ["cursed", "remote"], bystander: "wandering pilgrim",
            stagebonus: { setup: `Any fighter may put this card in their play area. <b>Feint:</b> Remove this card from the game to flip one objective to its inactive side.` },
            stagepenalty: { setup: `The boss gains 1 defense token of each type. Each fighter is dealt 1 direct damage.` },
            masterplan: randFrom(["actsofterror", "kidnapping", "strengtheningforces", "personalpower"]),
            keywords: ["ritual", "blade"],
            ritual: "Blood Moon", blade: "ritual knife", pit: "an otherwordly portal of liquid crimson", gunk: "a pool of unearthly blood",
            rivaltext: _.template(', but ${rival.name}<%=rivalboost ? `, swept up in the rite’s unholy fervor` : `, hoping to steal power from the ceremony`%> steps into the circle to oppose you'),
            prologue: () => _.template(randFrom([
                "${trail}, you arrive at a distant highland ${evilPlace()}, surrounded by solemn pines and coated in silent snowfall. <br><br>${stagevar}",
                "${trail}, the air shifts as you approach the courtyard of the ${evilPlace()} — snowfall slow and deliberate, the kind that hides things instead of covering them. Crimson glistens in the frost.<br><br>${stagevar}",
                "${trail}, you reach the outskirts of the ${evilPlace()} by foot after a drop from a low-flying cargo plane. The snowfall started hours ago... but only here. Candlelight flickers through the trees. <br><br>${stagevar}",
                "${trail}, deep in the woods, the open temple grounds of await. A quiet snowfall veils the blood-marked stones — but the rite is far from silent.<br><br>${stagevar}"
            ])),
            hottrail: () => _.template(randFrom([
                "You charge into the courtyard as the last verse of the chant rings out. ${ucInit(enemy.minions())} stagger back, caught mid-circle. ${randFrom(enemy.minionnames)} hisses: \"They made it this far? Stop them!\" as you leap toward the blood-soaked altar.",
                "The trail was hot — and you arrived just in time to interrupt the rite. The snowfall swirls around you as ${enemy.minions()} throw down incense ready for the fight. ${laconicStatement(enemy)}",
                "You reach the courtyard before the rite ends. Snow sticks to your shoulders. ${bossDescription(enemy)} cracks ${gPron(enemy,'possessive')} voice as you interrupt the verse. \"${gloat[0]}\" ${gPron(enemy,\"subject\")} spits while a blood torch is knocked over in the chaos. \"${gloat[1]}\" ${laconicStatement(enemy)}",
                "The ceremony is active — the blood is warm, the symbols still glowing. The ${enemy.minions()} turn at once, ready for violence. \"${gloat[0]}\" ${enemy.boss} barks. \"${gloat[1]}\" ${laconicStatement(enemy)}"
            ])),
            coldtrail: () => _.template(randFrom([
                "You arrive too late to stop the incantation — but not too late to matter. The courtyard's snow is turning deep red. ${bossDescription(enemy)} looks down at you. \"${gloat[0]}\" ${gPron(enemy,\"subject\")} says. \"${gloat[1]}\"",
                "The ritual is already underway. Blood spills across sacred stones, warming the snow. ${enemy.boss} stands in the courtyard, arms raised. As you approach, ${gPron(enemy, \"subject\")} glances your way. \"${gloat[0]}\" ${gPron(enemy, \"subject\")} says without breaking the chant. \"${gloat[1]}\"",
                "You enter the yard as the final phrase of the ritual echoes. ${bossDescription(enemy)} turns slowly, unafraid. Snowflakes melt on fresh blood at ${gPron(enemy, \"possessive\")} feet. \"${gloat[0]}\" ${gPron(enemy, \"subject\")} murmurs. \"${gloat[1]}\"",
                "You step between statues and ritual fires. The ceremony is nearly complete. ${enemy.boss} meets your eyes with cruel certainty. \"${gloat[0]}\" ${gPron(enemy, \"subject\")} intones. \"${gloat[1]}\" ${laconicStatement(enemy)}"
            ])),
            clueless: () => _.template(randFrom([
                "You thought you were alone — until you step into the temple yard. Snow falls in perfect spirals. The moment your boots touch the stones, braziers ignite ${bossDescription(enemy)} steps into view. \"${gloat[0]}\" ${gPron(enemy,\"subject\")} says. \"${gloat[1]}\"",
                "The shrine looked abandoned from the ridge. But as you step into the courtyard, voices rise in chorus — not of welcome. The snowfall hushes your movement, and ${enemy.boss} is already watching your cumbersome arrival.",
                "You approach cautiously, unaware you’re already in the circle. The snow carries no sound, but the symbols on the stone respond to your presence. Suddenly, you are facing ${bossDescription(enemy)}. \"${gloat[0]}\" ${gPron(enemy,\"subject\")} intones. \"${gloat[1]}\"",
                "You enter a remote shrine, expecting silence and find purpose. The chanting rises slowly, measured — this was always part of the ritual. ${enemy.boss} turns to face you. \"${gloat[0]}\" ${gPron(enemy,\"subject\")} calls. \"${gloat[1]}\""
            ])),
            captured: _.template(randFrom([
                "You come to at the foot of a blood shrine — your wrists bound with ritual cloth. The snowfall is soft, but the chanting is loud. ${ucInit(enemy.minions())} stand around you in a tight ring. ${randFrom(enemy.minionnames)} whispers, \"Offer them before the cycle completes.\" You snap free before they can finish.",
                "You awaken bound to a shrine of black stone, blood already pooling beneath your back. The snowfall is slow, silent, softening the edges of the altar. ${enemy.boss} stands nearby, watching you stir. \"${gloat[0]}\" ${gPron(enemy, 'possessive')} voice breaks the hush like a bell through fog. A blade rises. \"${gloat[1]}\"<br><br>You break your bonds a heartbeat before it descends.",
                "You awaken tied to a shrine beneath gently falling snow. ${ucInit(enemy.minions())} hold you while ${enemy.boss} watches the sky, muttering words older than pain. You tear free before the ${blade} descends.",
                "You blink away blood and snow to find yourself at the foot of a blood altar. ${randFrom(enemy.minionnames)} leans in. \"The offering lives,\" they say. ${enemy.boss} lifts a chalice nearby, unaware you’re already loosening your restraints.",
                "Snow dusts your face as you awaken on frozen ground. Your limbs are bound, but your will isn’t. ${enemy.boss} chants above you, ${blade} drawn. You break free with a roar, and the yard erupts in chaos.",
                "A hush hangs over the yard, broken only by the fall of snow — steady, soundless, covering everything like a burial shroud. You stir on the altar, tied with ritual cloth, barely breathing. ${enemy.boss} looms over you, expression unreadable. \"${gloat[0]}\" ${gPron(enemy, 'subject')} says softly, as the chant falters. The ${blade} is drawn. \"${gloat[1]}\" You snap upright, shattering the peace."
            ])),
            finalvar: _.template(randFrom([
                "<br><br>Snow swirls in sharp spirals as ${enemy.boss} turns to you, voice echoing like frost cracking stone. \"${gloat[0]}\" ${gPron(enemy, 'subject')} says, raising bloodied arms toward the altar. \"${gloat[1]}\" A deep rumble tears through the courtyard as ${enemy.minions()} rise from the snow.",
                "<br><br>The final glyph ignites beneath ${possessiveSuffix(enemy.boss)} feet. A shockwave bursts from the altar, sending snow and blood into the air. \"${gloat[0]}\" ${gPron(enemy, 'subject')} calls out over the howling wind. \"${gloat[1]}\" ${ucInit(enemy.minions())} descend upon you. ${laconicStatement(enemy)}",
                "<br><br>The snow stops falling. ${enemy.boss} stands in the stillness, surrounded by flickering braziers. \"${gloat[0]}\" ${gPron(enemy, 'subject')} says, voice now inhuman. \"${gloat[1]}\" Then the symbols crack open the earth, and the cult leaps into action. ${laconicStatement(enemy)}",
                "<br><br>The last verse of the rite hangs in the air. Snow falls upward now. ${enemy.boss} grins, eyes glowing from within. \"${gloat[0]}\" ${gPron(enemy, 'subject')} hisses. \"${gloat[1]}\" A red bolt of blood made lightning snaps through the courtyard as ${enemy.minions()} swarm forward."
            ])),
            actsofterror: _.template(randFrom([
                "${trail}, you come to the realization that ${possessiveSuffix(enemy.name)} ritual isn't about worship — it's a threat. Symbols carved into the mountain channel the blood downward. If completed, the rite will awaken the long-slumbering dead across nearby cities. ${finalvar}",
                "${trail}, it becomes clear: the ${getMasterPlan()} isn’t just a ceremony, it’s a message in gore. The ${enemy.name} plans to trigger seismic destruction with sacrificial blood tied to ley lines. The shrines at the ${evilPlace()} are part of a bomb. ${finalvar}",
                "${trail}, Agent Fletch pieces it together — the ${getMasterPlan()} hinges on a psychic scream across the region — one strong enough to drive entire city blocks to madness. Blood is the amplifier. The chant is almost complete. ${finalvar}",
                "${trail}, Citadel analysts confirm what you feared: the ${getMasterPlan()} involves the ${possessiveSuffix(enemy.name)} using sacrifices as living runes — terror, encoded in suffering. ${enemy.boss} is there, ${blade} ready. ${finalvar}"
            ])),
            kidnapping: _.template(randFrom([
                "${trail}, there's no more doubt — the ${getMasterPlan()} is written into every stone and symbol here: you find ${vip.vip} bound at the heart of the yard, daubed in ritual ink. Their eyes are wide with terror. ${enemy.boss} is preparing them for something — maybe a vessel, maybe an offering. ${finalvar}",
                "${trail}, you realize the horrifying truth: this is the ${getMasterPlan()}. The cult has already begun carving sigils into the altar stone near ${vip.vip}. ${ucInit(enemy.minions())} whisper about 'the chosen one’s blood'. You only have seconds. ${finalvar}",
                "${trail}, the evidence aligns — ${enemy.boss} is enacting ${gPron(enemy,'possessive')} ${getMasterPlan()} through this ceremony. The ${vip.vip} is in the circle — and it’s not clear if they even *know* they’re the center of the rite. ${enemy.boss} watches you with a calm smile. This was the plan. ${finalvar}"
            ])),
            strengtheningforces: _.template(randFrom([
                "${trail}, you realize the blood spilled across the yard is not symbolic — it’s a summoning medium. ${enemy.boss} intends to call forth an ancient evil, long-buried beneath the shrine. The earth pulses. ${finalvar}",
                "${trail}, the scope finally comes into focus: the ceremony channels energy into ancient shrines ringing the yard. ${enemy.minions()} chant louder. ${enemy.boss} grins, basking in the imminent birth of new daemonic soldiers. ${finalvar}",
                "${trail}, the details click into place: they’re not calling for help — they’re creating it. The ritual infuses corpses from previous sacrifices with rage and ice. You watch a blood mixes in with the snow, slowly forming daemonic shapes. You must stop this before it is too late! ${finalvar}",
                "${trail}, the meaning of the blood rites becomes undeniable: the ${enemy.minions()} are just vessels. If ${enemy.boss} can finish speaking the invocation they will all drop dead — only to rise as horrors of blood and bone, and army for ${finalboss.name} more powerful than Citadel could ever handle. ${finalvar}"
            ])),
            personalpower: _.template(randFrom([
                "${trail}, you finally understand, ${enemy.boss} is the sacrifice \<span class = 'emphasis'\>and\</span\> the beneficiary. Their blood binds the rite to the ancient one buried beneath the yard. You watch their flesh begin to twist and shine. Ascension is close. ${finalvar}",
                "${trail}, you realize the ${enemy.minions()} aren’t just channeling power — they’re *feeding* it to ${enemy.boss}. ${ucInit(gPron(enemy, 'possessive'))} body glows with unnatural heat. Glyphs burn into ${gPron(enemy, 'possessive')} skin, and ${gPron(enemy, 'possessive')} voice deepens into something unholy. ${finalvar}",
                "${trail}, the conclusion stings — the ${getMasterPlan()} was never meant to be subtle. ${enemy.boss} takes the final step onto the altar as the chanting stops. The snow halts mid-air. Silence. Then ${gPron(enemy, 'possessive')} skin starts to cracks like glass and light pours through. The deity is coming — through them. ${finalvar}"
            ])),
            gloat: [
                ["You hear the snow falling? It's not silence — it's surrender. Soon, even the sky will kneel,", "And you're next."],
                ["They said no one would dare interrupt the rite. I'm <span class = 'emphasis'>glad</span> they were wrong — I do like an audience,", "Now watch something truly divine."],
                ["The altar drank well tonight... but not enough. You, though — you're practically overflowing,", "Let’s spill it all!"],
                ["I carved the circle. I lit the fires. I even made the storm. And you think this is YOUR story?", "It ends with MY name!"],
                ["You came all this way through the snow... just to die where you stand? That’s dedication,", "Let’s make it legendary!"],
                ["I summoned the storm, built the shrine, and fed it power. You brought fists to a prophecy,", "Now get ready to vanish from history."],
                ["I thought we were going to finish the ritual alone... but you? You’re a bonus round,", "Let’s see what you’re worth in screams."]
            ]
        },
        {
            name: "Steel Memories", expansion: "riseofthekingdom", instory: 0, location: "base", bystander: "nameless goon", pit: "a pitch-black elevator shaft",
            stagebonus: { setup: `One fighter may move 3 spaces toward the nearest objective.` },
            stagepenalty: { setup: `Each fighter must <b>Recruit</b>.` },
            masterplan: randFrom(["actsofterror", "kidnapping", "strengtheningforces"]), keywords: ["swarmed", "labyrinth"], swarm: "new fighters", labyrinth: "winding passages",
            gloat: [
                ["Believe me when I say this, Global Gladiators,", "Nobody will leave this room alive!"],
                ["I'm not even going to kill you myself!", "I'll let my minions take care of that."],
                [`Looks like you brought an army. Good thing I didn't come to play fair," you say with a confident grin. "This?`, `This is just the welcoming committee. Let's see if you can get past the front door.`],
                [`An impressive crowd. Planning a parade or just scared to face Gladiators without extra help?" you throw out, tone laced with mockery. "Strength in numbers, Gladiators,`, `But by all means, take your best shot.`],
                [`I guess you didn't get the memo. Gladiators thrive when the odds are against them," you state, matter-of-factly. "Let's test that theory,`, `Minions, show our guest some hospitality.`],
                [`You're surrounded!`, `Today, we teach you a lesson in futility!`],
                [`You see this army? Each one stands ready to lay down their life for the cause,`, `What do you stand for?`],
                [`You've come alone, facing an ocean of devotion,`, `Brave, but foolish.`],
                [`This isn't a battle; it's an execution.`, `Witness the power of true loyalty.`]
            ],
            rivaltext: _.template(' accompanied by ${rival.name}<%=rivalboost ? `, eyes green from Vandal dosage, both`: `, both`%>'),
            hottrail: () => _.template(randFrom([
                'with a mix of surprise and defiance in ${gPron(enemy,"possessive")} eyes. "${gloat[0]}" ${enemy.boss} snarls. "${gloat[1]}"',
                'surprised by the rapid assault on ${gPron(enemy, "possessive")} fortress. "${gloat[0]}" ${enemy.boss} says as ${gPron(enemy, "subject")} ${enemy.threat}. "${gloat[1]}"'
            ])),
            coldtrail: () => _.template('standing ready. "I\'m not surprised to see you here," ${enemy.boss} says. "${gloat[0]}" ${gPron(enemy, "subject")} says as ${gPron(enemy, "subject")} ${enemy.threat}. "${gloat[1]}"'),
            clueless: () => _.template(randFrom([
                '${trail}, you find out rumors that the ${enemy.bosstitle()} ${enemy.boss} has been openly recruiting soldiers into the ${enemy.name}. As you investigate the matter further, you find out that the ${enemy.name} <%=enemy.name == "Kingdom" ? `is back to its previous practices`: `has adopted the same practices as the Kingdom` %>: testing out new recruits in a savage melee where only the strong survive.<br><br>You try to go undercover, posing as recruits for yourselves. But ${enemy.name} - familiar with your ploy from the past - sees through your plot and throws you into ${gPron(enemy, "possessive")} "pit." You suddenly become the final exam for ${gPron(enemy, "possessive")} would-be recruits... "${gloat[0]}" says ${bossDescription(enemy)}<rivalpresence ? rivaltext : ``> standing there as ${gPron(enemy,"possessive")} minions pour in from the shadows. "${gloat[1]}"',
                '${trail}, you investigate a site reported to have activity of the ${enemy.name}. You find an elevator an descend down.<%=randFrom([` You wait patiently while ${loungeMusic()} plays over the cheap speakers.`,``])%><br><br>Standing in a pitch black room, you turn around, hoping to find some sort of reference to where exactly you are, but there is none. All you see is the ever-encroaching blackness and the deafening silence surrounding you. And then, cutting through the shadows is a laugh, rolling through the large room to meet you. It is a diabolical sound, smug and evil. It rings through your ears for a moment or two before the lights in the room snap on, almost blinding you with their intensity.<br><br>You blink, and see standing before you ${bossDescription(enemy)}<%=rivalpresence ? rivaltext : ``%> ready to finish it. "${gloat[0]}" ${enemy.boss} says as ${gPron(enemy,"subject")} stalks the darkness. "${gloat[1]}"',
                '${trail}, you receive a tip about suspicious activity linked to the ${enemy.name}. Upon investigation, you stumble upon a makeshift arena where recruits are tested in brutal combat. Unbeknownst to you, your presence is detected, and suddenly you\'re thrown into the midst of the melee as an unexpected challenger. "${gloat[0]}" ${bossDescription(enemy)} ${enemy.threat} as ${gPron(enemy,"possessive")} recruits<%=rivalpresence ? rivaltext : ``%> close in from all sides. "${gloat[1]}"',
                '${trail}, while exploring the outskirts of ${possessiveSuffix(enemy.name)} territory, you come across a hidden compound.<br><br>As you venture inside, to your surprise you discover a training ground where recruits are engaged in intense combat exercises. Before you can retreat, you\'re spotted and forced to defend yourselves against the relentless onslaught. "${gloat[0]}" ${bossDescription(enemy)} ${enemy.threat}<%=rivalpresence ? rivaltext : ``%> overseeing the chaos, as ${gPron(enemy,"possessive")} recruits swarm towards you. "${gloat[1]}"'
            ])),
            prologue: () => _.template(randFrom([
                '<%=knowledge == "clueless" ? ``: `${trail}, you accompany a large squad of Citadel agents as they storm the ${possessiveSuffix(enemy.name)} base. ${ucInit(enemy.minions())} of the ${enemy.name} fall before you as you make your way through the maze-like halls until you finally reach an elevator, indicated as your goal on your map. As you call it, you hear the sounds of more approaching soldiers. The Citadel agents engage these reinforcements as you head up to face ${enemy.boss}.${randFrom([` You wait patiently while ${loungeMusic()} plays over the cheap speakers.`,``])}<br><br>The elevator doors open to reveal ${bossDescription(enemy)} ${rivalpresence ? rivaltext : ``} ` %>${stagevar} ${laconicStatement(enemy)}',
                '${trail}, you infiltrate <%=knowledge == "hottrail" ? `the` : `a suspected`%> ${enemy.name} base. "You have skill," ${enemy.boss} says to the group of recruits before ${gPron(enemy,"object")}. "And with the ${enemy.name}, you will become the greatest fighting force across the entire globe!" "Still spreading your lies, ${enemy.boss}?" you call out across the training grounds.<br><br>${enemy.boss} turns,<%=rivalpresence ? `${rivaltext} ` : ` ` %>ready to face you. "${gloat[0]}" ${gPron(enemy,"subject")} says. "${gloat[1]}" ${enemy.boss} then turns to look at the recruits gathered there. "Alright, rookies, now is your chance to prove yourselves."',
                '<%=knowledge == "clueless" ? ``: `${trail}, you find yourself amidst a chaotic battleground as you lead a squad of Citadel agents through the heart of the ${enemy.name} base. The walls reverberate with the thunderous clash of steel and gunfire as you carve a path forward. With each step, the enemy forces fall before you, but the sound of reinforcements echoes ominously from every corridor. You know that the true test awaits at the top, where ${bossDescription(enemy)} awaits.${randFrom([` ${ucInit(loungeMusic())} drifts through the air, a stark contrast to the violence surrounding you.`,``])}<br><br>As the elevator doors slide open, revealing your destination, you brace yourself for the final showdown against ${enemy.boss}${rivalpresence ? rivaltext : ``}. ${ucInit(gPron(enemy,"subject"))} is `%>${stagevar} ${laconicStatement(enemy)}',
                '<%=knowledge == "clueless" ? ``: `${trail}, you slip into the heart of the ${enemy.name} stronghold under the cover of darkness.<br><br>"Your reign of terror ends here, ${enemy.boss}," you declare boldly, stepping out from the shadows to confront ${bossDescription(enemy)}${rivalpresence ? rivaltext : ""} standing with the assembled recruits. The air crackles with tension as ${gPron(enemy,"subject")} turns to face you, `%>${stagevar} The announcement is a rallying cry for the recruits for the ultimate test of skill and strength.'
            ])),
            captured: _.template(randFrom([
                'Hands tied behind your back, you are led by <%=rivalpresence ? rival.name : minion%> and ${bossDescription(enemy)} into an an underground training facility. The room is hosting several fighters, each of them sparring in deadly martial arts. "You\'re not worthy to walk on this ground," <%=rivalpresence ? rival.name : minion%> growls, glaring at you with a deep-seated hatred. "And so," ${enemy.boss} interjects. "We will allow you the chance to prove your worth. <%=finalboss.boss == enemy.boss? `I have developed a great interest in you. I would be pleased if you\'d demonstrate it to ${rivalpresence ? rival.name : minion}.` : `${finalboss.boss} has taken great interest in you. Show us why that is.`%>"<br><br>"This is unnecessary," <%=rivalpresence ? rival.name : minion%> says quietly to ${enemy.boss}. "You play games with the trust of the <%=finalboss.name == enemy.name ? "Master" : finalboss.name%>." ${enemy.boss} loosens your bonds, ignoring <%=rivalpresence ? possessiveSuffix(rival.name) : possessiveSuffix(minion)%> words. You grab your wrists as they are free, rubbing the pain away, and watch as the other fighters turn toward you.<%=rivalpresence ? `${rivalboost ? ` ${rival.name} moves to end you. "This is ridiculous!"` : ``}` : ``%>',
                'Waking up in a pitch black room, you turn around, hoping to find some sort of reference to where exactly you are but you\'re not fully recovered. All you see is the ever-encroaching blackness and the deafening silence surrounding you. And then, cutting through the shadows is a laugh, rolling through the large room to meet you. It is a diabolical sound, smug and evil. It rings through your ears for a moment or two before the lights in the room snap on, almost blinding you with their intensity. <br><br>You blink, and see standing before you ${bossDescription(enemy)}<%=rivalpresence ? rivaltext : ``%> ready to finish it. "${gloat[0]}" ${enemy.boss} says as ${gPron(enemy,"subject")} stalks the darkness. "${gloat[1]}" ${laconicStatement(enemy)}'
            ])),
            strengtheningforces: _.template(randFrom([
                '${trail} you find the covert entrance to an underground facility where ${enemy.boss} trains his elite army. Slipping past the guards, you enter a world of discipline and darkness. The air hums with the sound of recruits being molded into merciless soldiers under the watchful eyes of ${enemy.minions()}. You steel yourself for the impending clash that will decide the fate of Ransom City and the very fabric the nation. Global Gladiators are the last bastion against the enemy\'s legion, their foot soldiers amassing for a war that threatens to engulf all in its wake. This moment, charged with destiny, stands as the fulcrum upon which the future balances.<br><br>"${gloat[0]}" ${enemy.boss} meets your gaze, recognition dawning. "${gloat[1]}" ${gPron(enemy, "subject")} taunts, poised for battle.',
                '${trail}, the intel has led you here, to a fortified compound where ${enemy.boss} is amassing an army with ambitions that threaten the Ransom City\'s very fabric. As you breach the perimeter, the air crackles with energy; you can feel the intensity of the preparations underway.<br><br>Inside, you witness a scene of controlled chaos. Troops are being drilled by ${enemy.minions()}, their numbers greater than any intel suggested. Amidst the cacophony, ${bossDescription(enemy)} orchestrates the might of a growing force, a dark general preparing for war. "This ends now," you whisper, stepping from the shadows, the element of surprise your ally. As ${enemy.boss} turns <%=rivalpresence ? `${rivaltext} with surprise etched on their faces` : `surprise etched on ${gPron(enemy, "possessive")} face`%>, the battle for the future begins. "${gloat[0]}" ${enemy.boss} growls. "${gloat[1]}"<br><br>${laconicStatement(enemy)}'
            ])),
            actsofterror: _.template(randFrom([
                '${trail}, Agent Fletch explains to you the ${getMasterPlan()} of the ${enemy.name}: "${enemy.boss} has provided the citizens of Ransom City a release for all the hatred, violence, and aggression that they keep up inside them." He leans over the satellite image of the city and continues. "With the people whipped up to a frenzy, a 12 hour marathon of crimes of every imaginable sort - including murder - will start right here." He points at the map. "Unless you can stop the spread of the mob mentality, I don\'t think Ransom will survive the night."<br><br>You move in to confront the mob and the perturbing ${enemy.minions()} of the ${enemy.name}.',
                '${trail}, your team deftly maneuvers through the claustrophobic maze of ancient tunnels beneath the city. ${possessiveSuffix(enemy.boss)} ${getMasterPlan()} is unfolding: to shatter the bedrock of Ransom City with underground explosions, casting the surface world into unrestrained chaos. As shadows give way to the dimly lit underbelly of the enemy\'s headquarters, you emerge from the tunnels\' veil of secrecy, directly into the tiger\'s den.  The element of surprise is momentarily yours as you disrupt the machinations of the countless foot soldiers who stand guard over a plot too vile to fester. "${gloat[0]}" ${possessiveSuffix(enemy.boss)} voice echoing off the cold, unforgiving concrete that forms the backbone of ${possessiveSuffix(enemy.boss)} fortress."${gloat[1]}<br><br>${laconicStatement(enemy)}'
            ])),
            kidnapping: _.template('${trail}, you accompany a large squad of Citadel agents as they storm the ${possessiveSuffix(enemy.name)} base where the ${vip.vip} is being held. ${ucInit(enemy.minions())} of the ${enemy.name} fall before you as you make your way through the maze-like halls until you finally reach an elevator, indicated as your goal on your map. As you call it, you hear the sounds of more approaching soldiers. The Citadel agents engage these reinforcements as you head up to face ${enemy.boss}.<%=randFrom([` You wait patiently while ${loungeMusic()} plays over the cheap speakers.`,``])%><br><br>The elevator doors open to reveal ${bossDescription(enemy)}<%=rivalpresence ? rivaltext : ``%> standing ready. "${gloat[0]}" ${enemy.boss} says. "${gloat[1]}"<br><br>${laconicStatement(enemy)}')
        },

        {
            name: "Sudden Death", expansion: "riseofthekingdom", instory: 0, location: "neutral", bystander: "challenger", pit: "a collapsed portion of the floor",
            stagebonus: { setup: `Put one random defense token on each copy of "A New Challenger".` },
            stagepenalty: { setup: `All the objective tokens advance 2 spaces toward the boss.` },
            masterplan: randFrom(["kidnapping", "strengtheningforces", "illegalgains"]), keywords: ["hostages"], hostages: "doomed fighters",
            gloat: [
                [`This is a private affair, Gladiators,`, `You should not have intervened.`],
                [`In the end,`, `There can be only one!`],
                [`This is madness. These fighters don't stand a chance," you observe, scanning the fighters with a determined gaze. "They seek glory in the wrong place,`, `But you, you're different.`],
                [`You're using these people," you accuse, your voice cutting through the noise of the crowd. "They choose their fate,`, `As do you.`],
                [`Enough of this spectacle. It's you and me," you declare, stepping forward as the crowd's roar crescendos. "Eager to join my collection of defeated ambitions?`, `Very well.`],
                [`This is the crucible where legends are forged or broken,`, `Which will you be?`],
                [`Who among you truly believes you can best me?`, `Step forward and claim your destiny.`]
            ],
            rivaltext: _.template(' To your surprise you see ${rival.name} is among the fighters,<%=rivalboost ? ` quite jacked up,`: ``%> eyes on you.'),
            hottrail: () => _.template(randFrom([
                'You walk calmly into the underground tournament. "I\'m here to compete in this fine affair!" you announce. "I assume you still have room, no?" Taken aback by your sudden, bold appearance, ${bossDescription(enemy)} ${enemy.threat}. "${gloat[0]}" ${gPron(enemy,"subject")} growls. "${gloat[1]}"<%=rivalpresence ? rivaltext : ``%>',
                'Stepping into the underground arena, you declare your intent to compete with confidence. "I\'m here to show everyone what true skill looks like," you assert, catching ${bossDescription(enemy)} off guard. ${ucInit(gPron(enemy, "subject"))} ${enemy.threat} as you make your presence known.<%=rivalpresence ? rivaltext : ``%> "${gloat[0]}" ${gPron(enemy,"subject")} growls menacingly. "${gloat[1]}"',
                'Entering the tournament grounds with a swagger, you announce your participation boldly. "Looks like it\'s time to shake things up," you remark, surprising ${bossDescription(enemy)} with your audacity.<%=rivalpresence ? rivaltext : ``%> "${gloat[0]}" ${gPron(enemy,"subject")} chuckles darkly. "${gloat[1]}"'
            ])),
            coldtrail: () => _.template(randFrom([
                'You infiltrate the underground tournament, and arrive just in time.<%=rivalpresence ? rivaltext : ``%> ${bossDescription(enemy)}, and ${enemy.threat}. You see that none of the competitors are a match for a killer like ${gPron(enemy,"object")}. "${gloat[0]}" ${gPron(enemy,"subject")} laughs. "${gloat[1]}"',
                'Racing against time, you finally arrive at the underground tournament after a prolonged search, the urgency evident in every step you take. You are unexpectedly expected, and ${bossDescription(enemy)} regards you with suspicion, sensing your determination despite your delayed arrival. "${gloat[0]}" ${gPron(enemy,"subject")} sneers disdainfully. "${gloat[1]}"',
                'Arriving with haste at the underground competition, you find yourself breathless from the frantic journey, the adrenaline fueling your resolve. ${bossDescription(enemy)} eyes you warily, recognizing the tenacity that led you here. ${ucInit(gPron(enemy,"subject"))} ${enemy.threat} as you swiftly prepare for the impending confrontation. "${gloat[0]}" ${gPron(enemy,"subject")} chuckles darkly. "${gloat[1]}"'
            ])),
            clueless: () => _.template(randFrom([
                'You have to fight your way through the ${enemy.minions()} securing the underground tournament. When you arrive, you are exhausted, and the see that none of the competitors are a match for a killer like ${gPron(enemy,"object")}.<%=rivalpresence ? rivaltext : ``%> ${bossDescription(enemy)} ${enemy.threat}. "${gloat[0]}" ${gPron(enemy,"subject")} laughs. "${gloat[1]}"',
                'Forcing your way through the throngs of security at the underground contest, you arrive at the arena exhausted but determined. Surveying the competition, you realize the true extent of the challenge ahead.<%=rivalpresence ? rivaltext : ``%> ${ucInit(bossDescription(enemy))} sneers with contempt, underestimating your resolve. ${enemy.threat} as you brace yourself for the impending showdown. "${gloat[0]}" ${gPron(enemy,"subject")} laughs scornfully. "${gloat[1]}"',
                'Navigating through the maze-like corridors of the underground tournament, you finally reach the heart of the action, only to find your formidable adversary waiting for you, surrounded by fighters who look more like victims in comparison.<%=rivalpresence ? rivaltext : ``%> ${bossDescription(enemy)} regards you with disdain, dismissing you as inconsequential. "${gloat[0]}" ${gPron(enemy,"subject")} mocks derisively. "${gloat[1]}"'
            ])),
            prologue: () => _.template(randFrom([
                '${trail}, you enter a competition that is modeled after <%=enemy.name == "Kingdom" && knowledge == "hottrail" ? `their`: `the Kingdom\'s`%> now infamous trials: the winners will be offered prestigious positions as officers in the ${possessiveSuffix(enemy.name)} armed forces, and those who refuse will be captured and killed. You couldn\'t let this happen.<br><br>${stagevar}<br><br>${laconicStatement(enemy)}',
                '${trail}, you find yourself drawn into a deadly competition reminiscent of the infamous trials held by The Kingdom. The stakes are high: victory means prestige, while defeat spells certain doom. With so much on the line, you refuse to back down.<br><br>${stagevar}<br><br>${laconicStatement(enemy)}',
                '${trail}, you venture into the heart of an underground arena, where you are met with a spectacle of blood and glory. The air crackles with tension as competitors vie for supremacy in a contest orchestrated by ${possessiveSuffix(enemy.name)} forces. With courage in your heart, you prepare to face the ultimate challenge.<br><br>${stagevar}<br><br>${laconicStatement(enemy)}'
            ])),
            captured: _.template(
                randFrom([
                    'You awaken to find yourself in a dimly lit arena, surrounded by the echoing cheers of the crowd. Disoriented and groggy from whatever concoction ${possessiveSuffix(enemy.boss)} lackeys administered, you struggle to piece together your surroundings. As the haze begins to lift, you realize the gravity of your situation: you\'ve been captured and thrust into a gladiatorial match against your will. With every passing moment, the crowd\'s anticipation builds, eager for the spectacle about to unfold. Just as the announcer\'s voice booms overhead, signaling the start of the match, a surge of adrenaline floods your veins. With sheer determination, you shake off the effects of the drugs and prepare to fight for your freedom. The fate of the other fighters hangs in the balance, their lives depending on your ability to defeat ${bossDescription(enemy)} before it\'s too late.',
                    'A blinding light floods your vision as you slowly regain consciousness, only to find yourself shackled to the walls of a vast underground arena. The air is thick with anticipation, the sounds of the crowd\'s cheers echoing off the damp stone walls. Through the haze, you catch glimpses of fighters, each a lean and mean, but unfortunately unqualified for the ${possessiveSuffix(enemy.boss)} twisted game of survival. As the announcer\'s voice reverberates through the arena, declaring the commencement of the match, a surge of determination courses through your veins. With the odds stacked against you and your every move scrutinized by the watchful eyes of your captors, you steel yourself for the battle ahead. It\'s time to show ${enemy.boss} and the entire underworld who the real champions are, and to rescue your fellow fighters from the clutches of tyranny.',
                    'As your vision slowly clears, you find yourself bound to crude wooden chairs in the dimly lit backroom of a seedy underground club. The muffled sounds of a rowdy crowd and blaring music seep through the walls, indicating that you\'re in the heart of the ${possessiveSuffix(enemy.boss)} illicit operations. Across from you, your companions stir groggily, their eyes darting around the room in confusion. With a sinking feeling, you realize that you\'ve fallen into the ${possessiveSuffix(enemy.boss)} trap.<br><br>The sight of the other captured fighters, battered and bruised, fuels your determination. Your senses sharpen and adrenaline kicks in, and you break free from your flimsy restraints - the ${enemy.name} may think ${gPron(enemy, "subject")} has you cornered, but little does ${gPron(enemy, "subject")} know, you\'re just getting started.',
                ])
            ),
            finalvar: _.template('${trail}, you learn the ${getMasterPlan()} of the ${enemy.name}. They have arranged a competition modeled after <%=enemy.name == "Kingdom" ? `their`: `the Kingdom\'s`%> original grand tournament where <%= enemy.name == "Kingdom" ? "they" : "the Kingdom"%> initially revealed their diabolical motives'),
            kidnapping: _.template(randFrom([
                '${finalvar}, only this time they have the ${vip.vip} ${randFrom(["him","her"])}self participate in a fight to death for ${possessiveSuffix(enemy.name)} amusement.<br><br>You infiltrate the underground tournament, and hear ${enemy.boss} explaining: "So, today\'s mission is: You fight me until there\'s only one left. Nothing\'s against the rules. The last of you standing gets to leave". At that, you reveal yourselves. "${gloat[0]}" ${gPron(enemy, "subject")} addresses you. "${gloat[1]}"',
                '${finalvar}, but this time ${possessiveSuffix(enemy.name)} cruelty takes a darker turn. In the heart of the underground tournament, you overhear ${enemy.boss} outlining a sadistic game: "Today, the ${vip.vip} fights for survival. If ${randFrom(["he","she"])} wins, you all go free." Revealing yourselves, you confront ${gPron(enemy, "object")}. "${gloat[0]}" ${gPron(enemy, "subject")} acknowledges your presence. "${gloat[1]}"',
                '${finalvar} but now the odds are stacked against you as ${possessiveSuffix(enemy.name)} sinister plans unfold. At the underground tournament, you catch wind of ${possessiveSuffix(enemy.boss)} twisted game: "Let the games begin. Last one standing earns freedom." As you step into the arena, the ${vip.vip} stands defiantly face to face with ${enemy.boss}, who, with a chilling gaze, acknowledges your presence but pays you no heed. A silent harbinger of impending doom, ${gPron(enemy, "subject")} anticipates the swift and brutal lesson of humility and pain for ${vip.vip}.<br><br>${laconicStatement(enemy)}'
            ])),
            strengtheningforces: _.template(randFrom([
                '${finalvar}. They<%= enemy.name == "Kingdom" ? " again" : `` %> play host to hundreds of fighters from all over the globe, and the media seems to have forgotten how the previous bout turned out. While the coverage of the tournament is again focused on the sold-out arenas that showcase the high profile fights, you learn of a network of underground street fights focused on bringing the most ruthless fighters and depraved killers out of the woodwork.<br><br>You once more enter the fight to shut down the ${possessiveSuffix(enemy.name)} efforts first hand.',
                '${finalvar}. ${enemy.name} once more gathers a legion of fighters, their influence spreading far and wide, drawing in contenders from across the globe.<br><br>Despite the previous debacle, the tournament gains fresh traction, drawing media attention oblivious to its dark underbelly. Amidst the glitzy arenas, whispers circulate about clandestine street fights, attracting the vilest combatants. Determined to quash ${possessiveSuffix(enemy.name)} ambitions, you plunge back into the fray, ready to confront evil head-on. ${bossDescription(enemy)} recognizes your arrival, and ${enemy.threat}.',
                '${finalvar}. As ${possessiveSuffix(enemy.name)} relentless pursuit of power is insatiable they convene a massive gathering of fighters, each more ruthless than the last.<br><br>While the public focuses on the spectacle, in the shadows the underground brawls recruit the most dangerous adversaries. You re-enter the fray, determined to dismantle ${possessiveSuffix(enemy.name)} machinations once and for all. "${gloat[0]}" ${gPron(enemy, "subject")} acknowledges your presence. "${gloat[1]}"<br><br>${laconicStatement(enemy)}'
            ])),
            illegalgains: _.template(randFrom([
                '${finalvar}. Amid the roar of the crowd and the clink of coins, the underground arena reveals itself as the jewel in ${possessiveSuffix(enemy.name)} criminal empire, a startling departure from the gritty fronts you\'ve encountered before. Clad in extravagant attire that belies a fighter\'s physique, ${enemy.boss} steps into the ring, both the star performer and cunning architect of this bloodsport. "Witness the spectacle that has lined my pockets beyond measure," ${enemy.boss} proclaims, gesturing to the lavish decorations funded by the arena\'s exorbitant profits. The fights, rigged in his favor, are broadcasted to an elite audience, their bets astronomical. "${gloat[0]}" ${gPron(enemy, "subject")} says, as you stand ready to challenge ${gPron(enemy, "object")} on his own turf, disrupt the flow of ${gPron(enemy, "possessive")} obscene wealth, and liberate the fighters ensnared by his greed. "${gloat[1]}"<br><br>${laconicStatement(enemy)}',
                '${trail}, you find yourself at a grand tournament that isn\'t at all what you expected. The atmosphere is electric in the clandestine arena where high society mingles with the underworld, all drawn by the allure of ${possessiveSuffix(enemy.name)} grandiose and deadly tournaments. Tonight, ${enemy.boss} himself headlines the event, basking in the dual roles of ringmaster and reigning champion, his victories a key draw for the obscenely rich bets placed in shadows. "Each drop of blood, a river of gold," ${enemy.boss} boasts, reveling in the spectacle that will make the ${enemy.name} fabulously wealthy on sheer brutality.<br><br>As ${gPron(enemy, "subject")} prepares to face another doomed challenger, you ready yourself for an intervention that will not only save lives but also aim to topple the perverse economic pillar ${enemy.boss} has built. "${gloat[0]}" ${gPron(enemy, "subject")} shouts over the roar of the crowd. "${gloat[1]}"<br><br>${laconicStatement(enemy)}'
            ]))
        },

        {
            name: "Supply & Demand", expansion: "riseofthekingdom", instory: 0, location: "neutral", bystander: "customer", pit: `a bottomless manhole`,
            stagebonus: { setup: `Any fighter may put this card in their play area. <b>Feint:</b> Remove this card from the game to choose one enemy to drop an objective token it is carrying.` },
            stagepenalty: { setup: `The boss gains 1 defense token of each type. Each fighter is dealt 1 direct damage.` },
            masterplan: randFrom(["strengtheningforces", "illegalgains", "personalpower"]), keywords: ["guns", "retrieval"],
            gunmen: "armed drug dealers", loot: "the drugs and the money", gun: randFrom(["uzi", "MAC-10", "AK-47", "Tec-9"]),
            gloat: [
                [`You think fighting me in some landfill is going to stop the downfall of Ransom?`, `I'm not your problem. I'm just doing business.`],
                [`Just like your plans, drugs lead nowhere but down. We're here to clean up the mess, starting with you," you tell it like it is. "Hah! You think you're the cure? I am the high that this world craves,`, `But you're about to hit rock bottom.`],
                [`This ends now. Your poison won't find its way to the streets anymore," you make your statement. "Ha! You think you can stop the tide?`, `I'm just a drop in the ocean, Gladiators.`],
                [`Dealing death in the shadows, you've just hit a wall. A Citadel wall," you state matter-of-factly. "Bold words for someone standing alone in the dark,`, `Let's see if you're as tough as you talk.`],
                [`This lot's about to be cleared, and I'm not talking about the rubble," you say and follow up with a smile. "You think you're the hero here?`, `I'm just a supplier; it's demand you should be fighting.`],
                [`The city's appetite is insatiable,`, `You think stopping me changes anything?`],
                [`You're a minor inconvenience in a thriving market,`, `This operation is bigger than you can imagine!`],
                [`Every empire has its foundation, and ours is built on supply and demand`, `You can't demolish what you can't see.`]
            ],
            rivaltext: _.template(', ${rival.name} standing with ${gPron(enemy,"object")} as the representative of the partner in trade<%=rivalboost ? `. ${rival.name} looks to have taken more than just a sample of the product.`: `.`%>'),
            hottrail: () => _.template('you work your way to the property'),
            coldtrail: () => _.template('you find out about an abandoned property where a drug deal is taking place. You work your way to the property'),
            clueless: () => _.template('you stumble upon an abandoned lot'),
            prologue: () => _.template(randFrom([
                '${trail}, ${stagevar} on outskirts of Ransom, where the air is thick with tension and the stench of illegal activity.<br><br>You burst onto the scene just as ${bossDescription(enemy)} oversees a massive drug deal<%=rivalpresence ? rivaltext : `.`%> Bullets fly as you dive into the fray, determined to take down the criminal mastermind and bring justice to the streets.',
                '${trail}, ${stagevar} to find a group of ${enemy.minions()} of the ${enemy.name} carrying large crates to their clients from the rear entrance. Standing nearby, ${enemy.boss} watches over the activity<%=rivalpresence ? rivaltext : ``%>.<br><br>During their work, one of the goons spots you and drops <%=randFrom(["his","her"])%> crate, a large amount of illegal drugs spilling out onto the concrete. You duck behind cover, and hear ${enemy.boss} roar in rage at the goon\'s clumsiness, yet it only takes a few exchanged words before you are given up. "${gloat[0]}" calls ${bossDescription(enemy)}. "${gloat[1]} Now face your opponent head-on!" The ensuing gunfire convinces you otherwise.',
                '${trail}, ${stagevar}.<br><br>There, amidst the chaos of a drug deal gone wrong, you confront ${bossDescription(enemy)}, and ${gPron(enemy,"possessive")} armed thugs<%=rivalpresence ? rivaltext : `.`%> Adrenaline pumping, you charge headfirst into the firefight, ready to unleash justice for every shot fired. "${gloat[0]}" calls ${enemy.boss}. "${gloat[1]}"',
                '${trail}, ${stagevar} where the night is shattered by the sound of gunfire and the roar of engines.<br><br>With instincts honed by years of training, you navigate the chaos to discover a deadly drug deal orchestrated by the notorious ${enemy.name}. Surrounded by danger and outnumbered, you face off against ${enemy.boss}, your pulse pounding as the dealers direct their guns at you<%=rivalpresence ? rivaltext : `.`%> "${gloat[0]}" calls ${enemy.boss}. "${gloat[1]}"'
            ])),
            captured: _.template('You awaken to find yourselves bound and gagged, held captive in the desolate surroundings of an abandoned junkyard. You catch sight of a shady transaction taking place nearby, as ${enemy.boss} oversees the exchange of illicit substances with a group of shadowy figures. The cold night air bites at your skin as you struggle against your restraints, knowing that time is running out. ${enemy.boss} notices you have come to your senses, and strides toward you a menacing grin spreading across ${gPron(enemy,"possessive")} face. "Well, well, well, look what the cat dragged in," ${gPron(enemy, "subject")} sneers. "It seems our esteemed guests have finally decided to join us."<br><br>With a gesture, ${gPron(enemy, "subject")} signals for the ${enemy.minions()} to bring you forward, the minions taunting you with promises of a painful demise. With a burst of strength, you manage to break free from your restraints, ready to take on ${enemy.name} and whoever would rise against you.'),
            finalvar: _.template('"${gloat[0]}" calls ${bossDescription(enemy)}<%=rivalpresence ? rivaltext : ``%>. "${gloat[1]}"'),
            strengtheningforces: _.template(
                randFrom([
                    '${trail}, your investigation unveils the ${getMasterPlan()} of ${enemy.boss}. The ${enemy.name} plans to unleash a potent strain of ${randFrom(["Dynasty", "Vandal", "Dark Matter"])} known as "Nexus" into Ransom\'s underworld, transforming addicts into loyal soldiers in their nefarious army. As you close in on their clandestine operation, you witness ${enemy.minions()} from the ${enemy.name} distributing vials of the deadly substance to their dealers<br><br>As you approach the scene with reinforcements from Ransom PD, chaos erupts. The dealers engage in a fierce firefight with the law enforcement, overwhelming them with sheer numbers and firepower. Amidst the chaos, ${bossDescription(enemy)} emerges unscathed, ${gPron(enemy,"object")} gaze locking onto you with a mix of malice and determination<%=rivalpresence ? rivaltext : ``%> "${gloat[0]}" ${enemy.boss} taunts, "${gloat[1]}" Now, you must confront ${possessiveSuffix(enemy.boss)} twisted ambitions and stop the spread of Nexus before it consumes the city.',
                    '${trail}, you have figured out the ${getMasterPlan()} of ${enemy.boss}. The ${enemy.name} will flood the black market with their modified strain of ${randFrom(["Dynasty", "Vandal", "Dark Matter"])}-enhanced drugs, and the users will join their ranks as thralls! You move in on their distribution center to find a group of ${enemy.minions()} of the ${enemy.name} carrying large crates to their clients from the rear entrance. Standing nearby, ${enemy.boss} watches over the activity<%=rivalpresence ? rivaltext : ``%>.<br><br>During their work, one of the goons spots you and drops <%=randFrom(["his","her"])%> crate, a large amount of the drugs spilling out onto the concrete. You duck behind cover, and hear ${enemy.boss} roar in rage at the goon\'s clumsiness, yet it only takes a few exchanged words before you are given up. "${gloat[0]}" calls ${bossDescription(enemy)}. "${gloat[1]} Now face your opponent head-on!" The ensuing gunfire convinces you otherwise.'
                ])),
            illegalgains: _.template(randFrom([
                '${trail}, your investigation unveils the ${getMasterPlan()} of ${enemy.boss}, revealing the ${possessiveSuffix(enemy.name)} extremely lucrative scheme to dominate the illicit drug trade with their potent strain of ${randFrom(["Dynasty", "Vandal", "Dark Matter"])}. This discovery sends shockwaves through law enforcement, sparking a city-wide manhunt for the criminal syndicate.<br><br>As you close in on their hideout, the streets erupt into chaos as rival gangs clash over territory. Amidst the gunfire and chaos, you and your team storm the junkyard where ${enemy.boss} and their ${enemy.minions()} have holed up with their stash, ready to put an end to their reign of terror once and for all. ${finalvar}',
                '${trail}, you have figured out the ${getMasterPlan()} of ${enemy.boss}. The ${enemy.name} has a contant in international drug trade for their modified strain of ${randFrom(["Dynasty", "Vandal", "Dark Matter"])}. This will make them wealthy beyond measure, and they will be able to expand their criminal operations without limits.<br><br>Agent Fletch sits behind the pilot\'s seat of the plane to Delta Keys as you lean in from the back. "We\'re coming up on the ${possessiveSuffix(enemy.name)} location," he says to you.  "I\'ll see if I can put her down over-" His words are interrupted as an explosion from ${getPropertyValue(enemy, stage, "antiair", "an anti-air shell")} shakes the plane.  "Nevermind, looks like you\'re jumping in!"  Grabbing a parachute, you leap from the plane as it peels off and heads toward safety.  You land just outside the camp that was firing at the Citadel aircraft, and you hear gunfire in the distance.  "We\'ve reached the camp," you say to Fletch via your radio. ${finalvar}'
            ])),
            personalpower: _.template(randFrom([
                '${trail}, as you infiltrate a seemingly nondescript lot, the scale of ${possessiveSuffix(enemy.name)} ${getMasterPlan()} is unfolding before you. Amidst a clandestine gathering, ${bossDescription(enemy)} <%=rivalpresence ? `and ${rival.name} are overseeing` : `oversees`%> the exchange of crates filled with vials of power: rare drugs and experimental steroids known only in whispered rumors among the underground elite. "Ah, the ${enemy.addressing} have arrived just in time for the grand unveiling," ${enemy.boss} cackles, ${gPron(enemy,"possessive")} voice echoing off the vacant lot with a melodramatic flourish<%=rivalpresence ? rivaltext : `.`%> "Behold, the elixir of the gods! With just a sip, I ascend beyond mere mortals. Who needs to lift weights when you can lift your very destiny?"<br><br>"Not on our watch," you mutter, realizing the fight ahead won\'t just be against a villain, but a being seeking to rewrite the very limits of human potential.',
                '${trail}, you come upon ${enemy.boss}, standing center stage in a spectacle of ${gPron(enemy,"possessive")} own design. Around him, a bizarre bazaar unfolds, showcasing the rarest of substances from various dealers: serums that promise strength beyond measure, steroids that defy nature, and concoctions that blur the line between a mortal and a myth. <%=rivalpresence ? rival.name : `A scientist`%> meticulously combines the various enhancers, each drop a potential key to untold power, crafting a special vial destined to change the course of history.<br><br>"Gone are the days of tedious training and discipline," ${enemy.boss} exclaims, hoisting a luminous flask. "Why chase after strength when you can simply... drink it?" ${ucInit(gPron(enemy,"subject"))} uncorks the flask, the liquid inside casting an ominous light on ${gPron(enemy,"possessive")} form. "Behold," ${gPron(enemy,"subject")} continues, a wicked grin splitting ${gPron(enemy,"possessive")} face, "The future of supremacy. With this, I shall become the paragon of destruction. Enjoy the front row seats to the rise of a god among insects."<br><br>As ${enemy.boss} raises the vial, you swiftly lob a stink bomb at ${gPron(enemy,"object")}. It bursts, engulfing ${gPron(enemy,"object")} momentarily in a vile stench, and in ${gPron(enemy,"possessive")} shock, the vial slips from ${gPron(enemy,"possessive")} grasp and smashes. Instantly, the area erupts into a chaotic firefight, allies turning on each other as the planned ascendancy falls apart in disarray.'
            ]))
        },

        {
            name: "Triage", expansion: "aftershock", instory: 0, location: "neutral", bystander: randFrom(["nurse", "doctor", "patient"]),
            stagebonus: { setup: `Any fighter may put this card in their play area. <b>Feint:</b> Remove this card from the game to heal 3 damage from an adjacent fighter.` },
            stagepenalty: { setup: `Each fighter takes 1 direct damage.` },
            masterplan: randFrom(["actsofterror", "kidnapping", "illegalgains"]), keywords: ["labyrinth", "hostages"], labyrinth: "endless dark hallways of the hospital", detonation: "Suddenly the boss produces a remote and presses a button. The hospital shudders with the force of an explosion",
            hostages: "helpless patients",
            pit: randFrom(["an out-of-commission elevator shaft", "a broken window of the hospital high rise"]),
            gloat: [
                [`I prescribed a cure for heroism,`, `And it’s a healthy dose of <span class = "emphasis">oblivion</span>.`],
                [`You’re here to save lives?`, `Good—stick around and watch how easily they’re lost.`],
                [`The sick, the wounded... perfect bait,`, `And now you're caught in the same trap.`],
                [`No emergency exit for you,`, `This ward is <span class = "emphasis">terminal</span>.`],
                [`You look worried, heroes,`, `Nobody will feel any pain after this blast.`],
                [`Tonight, even hope goes critical,`, `And you’re about to watch it detonate.`],
                [`You think blowing up a hospital proves strength?", you plead. "Strength? No,`, `It proves I can.`],
                [`You're a monster," you say through gritted teeth,`, `"And monsters don't wait for applause."`],
                [`You can't just erase people!" you yell. "Erase? No,`, `<span class = "emphasis">Liberate</span> them — from the pain of hope.`]
            ],
            rivaltext: _.template(', and ${rival.name} emerges from the shadows<%=rivalboost ? `, eyes glowing green from Vandal overdose` : ``%>.'),
            hottrail: () => _.template(
                randFrom(
                    ['${trail}, you realize the ${possessiveSuffix(enemy.name)} target is the hospital — and they’ve already started rigging it to blow. You rush toward the hospital’s lower levels, hearing distant alarms already wailing.',
                        '${trail}, you figure out that explosives are being placed inside the hospital’s infrastructure. You race to the hospital, through the abandoned parking deck, pushing past scattering staff as something terrible unfolds inside.',
                        '${trail}, the clues lead you right to the loading docks of the hospital, where you hear shouting and something breaking from deep within the building as you approach the doors.'
                    ]
                )),
            coldtrail: () => _.template(
                randFrom(
                    ['${trail}, you arrive to the city hospital to find patients fleeing into the streets and the hospital’s emergency generators failing — something is already terribly wrong.',
                        '${trail}, your leads bring you to a disaster in progress — emergency lights flicker and ${enemy.minions()} have sealed off the main entrances. Fortunately the cafeteria back door is unguarded.',
                        '${trail}, you zero in to the triage zone, which is collapsing into chaos as you arrive, survivors shouting about bombs in the wards.'
                    ]

                )),
            clueless: () => _.template(
                randFrom(
                    ['${trail}, you figure out that it is the hospital where the ${enemy.name} are at. You reach the hospital expecting a hostage crisis — only to realize too late the building itself is the target.',
                        '${trail}, you assumed ${enemy.boss} is making a move on the hospital, looking for experimental treatments or rare medical tech — until you spot the explosives wired across every wing of the building.'
                    ]

                )),
            prologue: () => _.template(randFrom(
                [
                    '<%=knowledge == "clueless" ? `You were supposed to be healing. After the chaos of your extraction, Citadel medbay was packed with battered agents — some sedated, others clinging to life. You were among the lucky ones: bruised, bandaged, barely upright... but walking. Then the lights cut out. The floor rumbles. And someone shouts the word no hospital should ever echo - \"Bomb\". A second later, the far wall erupts in fire and concrete, sending nurses diving and medbots sparking. The ${possessiveSuffix(enemy.name)} ${enemy.minions()} rush in through the smoke. You’re not healed yet... but you’re ready enough.` : `${stagevar}<br><br>You storm through the emergency entrance just as sirens wail inside the hospital. ${ucInit(enemy.minions())} are already moving supplies toward exit routes. In the chaos, ${enemy.boss} calmly oversees the operation. \"${gloat[0]}\" ${gPron(enemy,\"subject\")} says as you come into view. \"${gloat[1]}\" ${laconicStatement(enemy)}`%>',
                    '${stagevar}<br><br>You smash open the battered doors to find patients abandoned, halls rigged with explosives, and ${enemy.minions()} sweeping the final wards. ${enemy.boss} stands by the pediatric wing, hand resting on a remote detonator. "${gloat[0]}" ${gPron(enemy,"subject")} gloats. "${gloat[1]}" ${laconicStatement(enemy)}',
                    '${stagevar}<br><br>Alarms echo through the hospital as you sprint past overturned crash carts and darkened ICUs. ${ucInit(enemy.minions())} spot you and scatter for cover, but ${enemy.boss} waits calmly near the main surgical theater. "${gloat[0]}" ${gPron(enemy,"subject")} says without urgency. "${gloat[1]}" ${laconicStatement(enemy)}'
                ]

            )),
            captured: _.template(randFrom(
                [
                    'You rip free of the surgical straps just as ${enemy.minions()} scatter from the ICU. Across the broken ward, ${enemy.boss} stands at a mobile command unit, arming the final detonator. "${gloat[0]}" ${gPron(enemy,"subject")} says without looking up. "${gloat[1]}" You’ve got seconds to act before this whole place goes up.',
                    'You a knocked awake as restraints snap and you hit the floor hard, rolling behind a tipped-over gurney. ${ucInit(enemy.minions())} rush to lock down the hall, but it’s ${enemy.boss} who draws your eye — standing beside the critical care server banks, downloading something. "${gloat[0]}" ${gPron(enemy,"subject")} murmurs. "${gloat[1]}"',
                    'You tear the last IV lines free and stagger upright. ${enemy.boss} is right there — across the ER floor, overseeing the final evacuation of <span style="emphasis">${gPron(enemy, "possessive")}</span>  team. "${gloat[0]}" ${gPron(enemy,"subject")} shouts as ${gPron(enemy,"subject")} smashes the emergency release on a volatile chemical cache. "${gloat[1]}" Time to move <span style="emphasis">fast</span> or get buried.',
                    'The crash of falling beams snaps you fully awake. ${ucInit(enemy.desc())} retreat toward the service tunnels while ${enemy.boss} lingers, making sure of everything. "${gloat[0]}" ${gPron(enemy,"subject")} says, voice amplified through the hospital intercom. "${gloat[1]}" You weren’t just left behind — you’re the <span style="emphasis">final obstacle</span>.'
                ]


            )),
            finalvar: _.template(randFrom(
                [
                    'You pull up to the emergency entrance just in time to see the first explosions rip through the lower levels, sending smoke and debris into the night sky.<br><br>You slam through the last set of emergency doors, stepping into the shattered remains of the ICU. Monitors flicker, and the floor is littered with overturned gurneys. ${ucInit(enemy.minions())} scatter to cover positions while ${enemy.boss} calmly readies the detonator. "${gloat[0]}" ${gPron(enemy,"subject")} shouts from atop a pile of wreckage, detonator flashing red in ${gPron(enemy,"possessive")} hand. "${gloat[1]}"',
                    'You approach by helicopter, buffeted by smoke and crosswinds as the hospital looms below. ${ucInit(getPropertyValue(enemy, stage, "antiair", "crackling gunfire"))} forces the pilot to veer off and shout for you to jump.<br><br>You drop hard onto the rooftop helipad, scattering ${enemy.desc()} wiring explosives. In seconds, your fists clear the landing zone. Without waiting for backup, you cut through a battered access door and descend into the hospital’s burning upper floors — where ${enemy.boss} waits, ready for a final confrontation. "${gloat[0]}" ${gPron(enemy,"subject")} calls out from across the ruined surgical wing, voice calm over the chaos. "${gloat[1]}"',
                    'Agent Fletch skids to a stop outside the shattered ambulance bay, sirens wailing around you as terrified survivors stumble into the streets.<br><br>You fight your way through collapsing stairwells and crash into the generator room. Sparks shower from the walls — this isn’t just about bombs, ${enemy.boss} is trying to trigger a total structural collapse. Suddenly ${gPron(enemy, "subject")} is in front of you. "${gloat[0]}" ${gPron(enemy,"subject")} says, adjusting a detonator wired into the wall. "${gloat[1]}"',
                    'You reach the hospital perimeter as alarms scream and the emergency lights flicker ominously across the shattered facade.<br><br>You weave through burning hallways and crash carts until you emerge into the surgical wing. ${enemy.minions()} glance up in surprise—but ${enemy.boss} doesn’t flinch, standing atop a ruined gurney like a general surveying a battlefield. "${gloat[0]}" ${gPron(enemy,"subject")} grins, kicking over a medical supply cart as ${gPron(enemy,"subject")} circles toward you. "${gloat[1]}"',
                    'You arrive at the hospital’s battered front courtyard just as a secondary blast rocks the building, throwing glass and sparks across the pavement.<br><br>You break into the pediatric ward, barely recognizing it under the wreckage and emergency lighting. ${ucInit(enemy.minions())} have already wired the exits with explosives. ${enemy.boss} lingers near the center, watching with an expression that chills your blood. "${gloat[0]}" ${gPron(enemy,"subject")} snarls, stepping between flickering emergency lights. "${gloat[1]}"'
                ]
            )),
            actsofterror: _.template(randFrom([
                '${trail}, you uncover the grim ${getMasterPlan()} behind the hospital siege: ${enemy.boss} wants a spectacle of terror, a public symbol that nowhere — and no one — is safe. The detonators are armed, the exits trapped — only you can stop the ${enemy.name} now. ${finalvar}'

            ])),
            illegalgains: _.template(randFrom([
                '${trail}, you piece together the brutal simplicity of ${possessiveSuffix(enemy.boss)} ${getMasterPlan()}: loot priceless regenerative treatments, prototype biotech, and black-market cures worth fortunes to syndicates and warlords—and then erase the hospital to cover the crime. ${finalvar}',
                '${trail} you realize ${enemy.boss} has already stripped the hospital of forbidden technology, experimental cures, and priceless genetic blueprints. Blowing the building apart will erase every trace — and every witness. The perfect ${getMasterPlan()} to finance a new criminal empire. ${finalvar}'
            ])),
            kidnapping: _.template(randFrom([
                '${trail}, you finally understand the grim ${getMasterPlan()} — ${vip.vip} was only bait. The real plan has always been simple: destroy the hospital and the best of Citadel along it. You can only respond to the invitation: ${finalvar}'
            ]))
        },

        {
            name: "Under Destruction", expansion: "twintiger", instory: 0, location: "neutral", bystander: "construction worker", pit: "an out-of-commission elevator shaft",
            stagebonus: { persistent: `<b>Exhaust:</b> Move 1 power from a Time Bomb card to this card. Then, if there's 5 power on this card, remove it from the game.` },
            stagepenalty: { setup: `Each fighter chooses an objective card and places 1 power on that objective.` },
            masterplan: randFrom(["actsofterror"]), keywords: ["explosion", "labyrinth"], explosions: "timed bombs", labyrinth: "labyrinth-like construction area", detonation: "Suddenly the boss produces a remote and presses a button. The room shudders with the force of an explosion",
            gloat: [
                [`Cool guys don't look at explosions,`, `So gape all you want!`],
                [`Most problems can be solved with an appropriate charge of high explosives,`, `The trick is not to be around when they go off.`],
                [`Why do you have to nuke the whole building?" you ask. "Well, when you do something insignificant, you can just disappear,`, `When you do something big, they will find you unless they think you're dead.`],
                [`Enough bombs have been planted in this building so none survive,`, `You'll die with us," you answer. "Could be.`],
                [`Explosives, buzzsaws, a good old-fashioned beating.. There are so many alternatives,`, `How do you wish to die?`],
                [`Playing with explosives, huh? This isn't a game. Lives are at stake, and we're defusing your plans along with these bombs," you call out. "Games, Gladiators? This is about change, about demolishing the old to make way for the new. And you?`, `You're just debris waiting to be cleared.`],
                [`You think you can engineer destruction and walk away? Not on our watch. It's time to dismantle your plot brick by brick," you shout. "Oh, but destruction is just the first step to creation. You're merely an obstacle in the blueprint for a new order,`, `Tick-tock, Gladiators.`],
                [`Wiring this place to blow? That's a new low. But it's your ambitions that are about to implode, not this city," you say. "Low? We prefer 'foundational.' You see, every great construction begins with a clear site,`, `And you are part of the old structure to be razed.`]
            ],
            rivaltext: _.template(', and ${rival.name} emerges from the shadows<%=rivalboost ? `, eyes glowing green from Vandal overdose` : ``%>.'),
            hottrail: () => _.template(
                randFrom([
                    'The construction site looms before you, shrouded in darkness. As you approach, you hear the faint sounds of activity within. Inside, you find ${bossDescription(enemy)} caught off guard. "The Global Gladiators?! Arm the bombs and let\'s get out of here, quicly!" ${gPron(enemy,"subject")} commands ${gPron(enemy,"possessive")} minions<%=rivalpresence? rivaltext : `.`%>. "${gloat[0]}" ${enemy.boss} declares, locking eyes with you. "${gloat[1]}"',
                    'A tense silence fills the air as you step onto the site. Suddenly, ${enemy.boss} emerges from the shadows, a look of surprise on ${possessiveSuffix(enemy.boss)} face. "How did you find us?" ${gPron(enemy,"subject")} demands, readying for a confrontation<%=rivalpresence? `. ${enemy.boss} whistles${rivaltext}` : `.`%>',
                    'The entrance to the construction site is heavily guarded, but you manage to slip inside unnoticed. ${bossDescription(enemy)} looks startled as you confront ${possessiveSuffix(enemy.boss)} minions. "Arm the bombs and let\'s get out of here," ${gPron(enemy,"subject")} orders<%=rivalpresence? rivaltext : ``%>. "${gloat[0]}" ${enemy.boss} sneers, assessing the situation. "${gloat[1]}"',
                    'You arrive at the site, and inside you find surprised ${bossDescription(enemy)}. "Arm the bombs and let\'s get out of here," ${gPron(enemy,"subject")} commands ${gPron(enemy,"possessive")} goons<%=rivalpresence? rivaltext : `.`%> "${gloat[0]}" ${enemy.boss} says, eyeing you. "${gloat[1]}"'
                ])),
            coldtrail: () => _.template(
                randFrom([
                    'You navigate through the deserted site, a sense of unease growing with each step. Suddenly, ${enemy.boss} appears, looking surprised by your presence. "How did you find us?" ${gPron(enemy,"subject")} demands, preparing for a fight<%=rivalpresence? rivaltext : `.`%>.',
                    'The site seems eerily quiet as you explore its depths. ${ucInit(bossDescription(enemy))} steps out of the shadows, a mixture of shock and anger on  ${gPron(enemy,"possessive")} face. "How did you get past my guards?" ${gPron(enemy,"subject")} demands, ready to defend ${gPron(enemy,"possessive")} plan<%=rivalpresence? rivaltext : `.`%>',
                    'As you cautiously make your way through the site, you stumble upon ${bossDescription(enemy)}. "${gloat[0]}" ${gPron(enemy,"subject")} growls, preparing to confront you. "${gloat[1]}"',
                    'You arrive at the site, and beat the few ${enemy.minions()} guarding the area. Inside, you find ${bossDescription(enemy)}. "Arm the bombs and let\'s get out of here," ${gPron(enemy,"subject")} commands ${gPron(enemy,"possessive")} goons<%=rivalpresence? rivaltext : `.`%> "${gloat[0]}" ${enemy.boss} says, eyeing you. "${gloat[1]}"'
                ])),
            clueless: () => _.template(
                randFrom([
                    'Your heart sinks as you realize you may have arrived too late. "Arm the bombs and let\'s get out of here," a voice echoes from behind the scaffolds. ${ucInit(bossDescription(enemy))} steps into view<%=rivalpresence? rivaltext : `.`%>. ${possessiveSuffix(enemy.boss)} eyes narrow at the sight of you, and without hesitation, ${gPron(enemy, "subject")} attacks.',
                    'The site appears empty at first glance, but as you draw closer, you hear the faint sound of ticking. Suddenly, ${enemy.boss} steps out from the shadows, a menacing grin on ${gPron(enemy,"possessive")} face. "You\'re too late," ${gPron(enemy,"subject")} taunts, reveling in ${possessiveSuffix(enemy.name)} victory<%=rivalpresence? rivaltext : `.`%>',
                    'You cautiously explore the site, but it feels like a trap. ${enemy.boss} emerges from the darkness, ${gPron(enemy, "possessive")} gaze cold and calculating<%=rivalpresence? rivaltext : `.`%> "${gloat[0]}" ${gPron(enemy,"subject")} states, ready to eliminate any threats. "${gloat[1]}"',
                    'Unfortunately, you may have arrived too late.. "Arm the bombs and let\'s get out of here," a voice commands from behind a plastic sheet. When the sheet is thrown aside, ${bossDescription(enemy)} steps into view<%=rivalpresence? rivaltext : `.`%> ${possessiveSuffix(enemy.boss)} eyes immediately dart from the placed explosives. Without hesitation, ${gPron(enemy, "subject")} attacks.'
                ])),
            prologue: () => _.template(randFrom(
                [
                    '${trail}, you are led to a grim discovery: the ${enemy.name} has been orchestrating a sinister plot. The ${enemy.minions()} have toiled in secrecy, setting up an intricate web of explosives at a construction site shrouded in shadows and mystery. The air is thick with tension as you consider the magnitude of the impending disaster. How is the ${finalboss.name} connected to this nefarious scheme? The answers lie within the heart of the construction site, waiting to be uncovered.<br><br>${stagevar}<br><br>${laconicStatement(enemy)}',
                    '${trail}, it didn\'t take long to find out the ${enemy.name} had been busy setting up an intricate series of explosives at a construction site for a planned ${randFrom([`research facility`,`headquarters`,`manufacturing facility`])} of a ${randFrom([`cutting edge medical company`,`weapons manufacturer`,`chemical manufacturer`,`cybernetics research company`])}. How is the ${finalboss.name} connected? There is only one way to find out.<br><br>${stagevar}<br><br>${laconicStatement(enemy)}'
                ]
            )),
            captured: _.template(randFrom(
                [
                    'As you regain consciousness, the cold touch of concrete beneath you sends shivers down your spine. A chilling voice echoes through the darkness as ${enemy.boss} steps out from the shadows. "Welcome, ${enemy.addressing}! It seems fate has delivered you into our hands." The air grows thick with tension as you realize ${possessiveSuffix(enemy.name)} minions have blocked every escape route, leaving only one path - the one ${enemy.boss} guards<%=rivalpresence? rivaltext : `.`%> With explosives rigged around you, ${gPron(enemy,"subject")} has orchestrated your demise. "${gloat[0]}" ${enemy.boss} sneers, reveling in the ${possessiveSuffix(enemy.name)} victory. "${gloat[1]}" ${laconicStatement(enemy)}',
                    'You wake up on cold concrete floor and try to get your bearings. Suddenly, ${enemy.boss} steps out from the shadows. "Welcome, ${enemy.addressing}! Nice of you to join us!"<br><br>You note that ${enemy.minions()} are suddenly blocking every exit, except for the one ${enemy.boss} is guarding, and explosives are rigged everywhere<%=rivalpresence ? rivaltext : ``%>. ${ucInit(gPron(enemy,"subject"))} plans to bury you under tons of rubble! "${gloat[0]}" ${enemy.boss} says as you pick yourselves up to face them. "${gloat[1]}"<br><br>${laconicStatement(enemy)}'
                ]
            )),
            finalvar: _.template(randFrom([
                'that amidst the labyrinth of corridors destined for ${randFrom([`groundbreaking medical research`,`cutting-edge weapon prototypes`,`advanced chemical processing`,`state-of-the-art cybernetic laboratories`])}, they have meticulously concealed a network of explosives, each poised to unleash havoc upon activation.<br><br>As you infiltrate the site, tension hangs heavy in the air. "${gloat[0]}" a voice commands from the shadows. With a sudden rustle, ${bossDescription(enemy)} emerges from the darkness. "${gloat[1]}" A wicked grin plays upon ${possessiveSuffix(enemy.boss)} lips, as ${gPron(enemy, "subject")} gestures at an ominous array of rigged explosives. ${ucInit(gPron(enemy, "subject"))} locks eyes with you<%=rivalpresence? rivaltext : `.`%> With a swift motion, ${gPron(enemy, "subject")} readies for battle, the clash of wills about to erupt amidst the tumult of the construction site. ${laconicStatement(enemy)}',
                'they have been busy setting up an intricate series of explosives at a construction site for a planned ${randFrom([`research facility`,`headquarters`,`manufacturing facility`])} of a ${randFrom([`cutting edge medical company`,`weapons manufacturer`,`chemical manufacturer`,`cybernetics research company`])}.<br><br>Unfortunately, you may have arrived too late.. "Arm the bombs and let\'s get out of here," a voice commands from behind a plastic sheet. When the sheet is thrown aside, ${bossDescription(enemy)} steps into view<%=rivalpresence? rivaltext : `.`%> ${possessiveSuffix(enemy.boss)} eyes immediately dart from the placed explosives. Without hesitation, ${gPron(enemy, "subject")} attacks. ${laconicStatement(enemy)}'
            ])),
            actsofterror: _.template(randFrom([
                '${trail}, the sinister truth unravels before your eyes - ${possessiveSuffix(enemy.name)} ${getMasterPlan()} is to unleash unparalleled chaos upon the city. Their scheme involves setting explosives with enough force to decimate entire city blocks, leaving untold devastation in their wake. As you grapple with the enormity of their plan, the urgency to stop them grows. The city\'s fate hangs in the balance, and it is up to you to thwart their nefarious intentions. You know ${finalvar}',
                '${trail}, it didn\'t take long to find out the ${enemy.name} ${getMasterPlan()}: to set up bombs with enough force to level most of the city block, or possibly the whole city. You have no clue what the ${enemy.name} would gain from such orchestrated chaos, but you know ${finalvar}'
            ])),
            illegalgains: _.template(randFrom([
                '${trail}, the labyrinth of deception woven by ${enemy.name} has finally been unraveled by Citadel analysts. Their insidious scheme emerges as an extensive and convoluted insurance fraud plot, designed to funnel funds into their criminal enterprises for years to come. Through a web of agents and shell companies, ${enemy.name} seeks to exploit the vulnerabilities of the system for their illicit gains. While the full extent of their treachery remains veiled in shadows, you have unearthed the key to their operation: ${finalvar}',
                '${trail}, the Citadel analysts have finally determined the ${getMasterPlan()} of the ${enemy.name}: an extensive and complicated insurance fraud. The ${enemy.name} will fund their criminal enterprises for years to come by demolishing properties owned through an intricate network of agents and shell companies. You don\'t have concrete proof or even understanding of the whole scheme, but you have traced their key target: ${finalvar}'
            ]))
        }
    ];

    stages = expansionfilter === undefined ? stages : stages.filter(stage => expansionfilter.includes(stage.expansion))
    return stages

}