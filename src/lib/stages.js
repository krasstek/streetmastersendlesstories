import _ from 'lodash';
import { randFrom, filterArray, getRandomMinions, random_template } from '$lib/story_utils';
import { getStages } from '$lib/getStages';

export function getEnemies(expansionfilter) {
    let enemies = [

        {
            name: "Abandoned", expansion: "aftershock", showdown: "aftershock", boss: "Project X", bosstitle: _.template('${randFrom(["mutating","vengeful","horrendous","tortured"])} ${randFrom(["experiment","creature","monster","bioweapon"])}'), gender: "female", desc: () => "irradiated mutants", addressing: "playthings", minions: _.template("${randFrom(['insane','unhinged'])} nurses and ${randFrom(['mutated','monstrous'])} ${randFrom(['experiments','patients'])}"), threat: "whips her creeping tendrils menacingly at you", minionnames: ["Stacey", "Amalgam", "The Baron"], preparedboss: [["Biological Mind Link", "and put it into play"]], execution: random_template("crushes ${gPron(contact,'sex')} with her tendrils"), brute: `${randFrom(["writhing", "twitching", "branching", "rope-like", "tangled mass of", "sinewy", "glistening", "massive"])} ${randFrom(["tendrils", "tentacles", "appendages"])}`,
            gloat: [
                [`I will not let you hurt me,`, `You will not hurt anyone anymore.`],
                [`You don't have to be what Jackal designed you to be,\" you say, hoping to bridge the gap with empathy. \"Intentions matter little in the face of survival,`, `I've been hunted, hurt... No more. I cannot trust. I cannot give in.`],
                [`Why continue running? There can be help, a way to control what you've become,\" you offer, searching for a sliver of hope in her tortured gaze. \"Control? There is no control, only the illusion of it. Mother made sure of that,`, `I am not a project to be fixed. I am not a mistake to be erased.`],
                [`Mother sought to play god, and she birthed a monster,`, `But I am no puppet. If this world refuses me peace, I will carve it out with my own hands.`],
                [`There's still a chance for understanding, to coexist,\" you suggest, seeking to penetrate the walls built by betrayal. \"Coexist? With a world that sees me as an abomination?`, `I've been the subject of their fears. I will give them a reason for that fear.`],
                [`Born from the shadows of mother's ambition, I was never meant to walk in the light,`, `You seek to extinguish what little freedom I've found, and you will find just why I was not meant to walk in the light.`]
            ], expression: _.template(`turning the pits she has for eyes toward you`), detonation: `she curls up, and in an instant arches out, emitting a blast of acid from her every pore`, keywords: ["swarm"], swarm: "horrifying growths",
            casino: {
                descriptor: ["Glass", "Porcelain", "Quiet", "Faded", "Lucid"],
                animal: ["Lamb", "Moth", "Rat", "Doll", "Whelp"]
            }
        },

        {
            name: "All-Heaven Gang", expansion: "tideofthedragon", showdown: "tideofthedragon", boss: "Train", bosstitle: _.template('${randFrom(["multibillionaire","hard-hearted","ruthless","determined"])} ${randFrom(["CEO","businessman","monk","dragon head","triad leader"])}'), gender: "male", desc: () => "the covert triad", addressing: "fools", minions: _.template("cultists, triads and convicts"), threat: "draws his finger under his chin", minionnames: ["Reina", "Big Dragon", "Goliath"], preparedboss: [["Heightened Reflexes", "and put it into play"]], execution: random_template("snaps the ${gPron(contact,'sex')}'s neck"),
            gloat: [
                [`Your methods betray the teachings of your masters. What happened to the path of peace?" you confront Train. "The path of peace? A noble but naive ideal. The world isn't changed from the sidelines,`, `True power demands sacrifice and shadows.`],
                [`You've taken the wisdom of your betters and twisted it into something unrecognizable. How do you justify this betrayal?" you confront Train, the tension palpable in the air between the stark lines of morality drawn. "Justify? There's no betrayal in utilizing every weapon at my disposal,`, ` The world operates on a simple principle — power.`],
                [`My empire, built on the pillars of fear and respect, stands as a testament to my will,`, `Those who cross me find themselves facing not a man, but a force of nature, relentless and unforgiving.`],
                [`True harmony can only be achieved through absolute control. My control. As for you who dare to stand against me,`, `In the end, you will bow to my will, or you will break.`]
            ], expression: _.template(`eyeing you with disdain`),
            casino: {
                descriptor: ["Heavenly", "Crimson", "Imperial", "Silken", "Ebon"],
                animal: ["Dragon", "Tiger", "Crane", "Phoenix", "Koi"]
            }
        },

        {
            name: "Atonement", expansion: "lamentofthebloodmoon", also: "twintiger", showdown: "none", boss: "Anja", bosstitle: _.template('${randFrom(["fallen","methodical","cold-hearted","rogue","meticulous"])} ${randFrom(["agent", "manipulator"])}'), gender: "female", desc: () => "cadre of hitmen", addressing: "agents", minions: _.template("${randFrom([`merciless`,`hardened`])} ${randFrom([`assassins`,`hitmen`,`killers`])}"), threat: "folds her coat with quiet care, like she’s preparing for something clinical — something final", minionnames: ["Jin", "Anastasia", "Veronica"], preparedboss: [["Teamwork", "and put it into play"]], execution: random_template("breaks ${gPron(contact,'possessive')} neck"), gunmen: "Atonement snipers",
            gloat: [
                ["Do you know how many threats I’ve ended with one kill and zero headlines?\" Anja's voice is calm, almost instructional. \"And how many futures you buried with them, Anja? That’s not justice. That’s silence.\" You pause to give her time to think. \"Sometimes silence is the only mercy we can still afford,", "Justice doesn’t always come with applause. Sometimes, it comes with precision."
                ],
                ["Your record used to be clean. Now it reads like a hit list.\" Your eyes burn — not with hate, but disappointment. \"It reads like results. Results you still haven’t delivered.\" \"The world doesn’t need martyrs. It needs closed files,", "Failure makes excuses. I don’t have time for either."
                ],
                ["You could’ve built something better. You had that chance,\" you try to reason. Her eyes remains cold, but something behind them eyes flinches — just briefly. \"And watch it fall apart like everything else? No. I’m done pretending the rules work. Hope is a luxury I can’t afford anymore,", "You believe the world needs heroes. It needs outcomes."
                ],
                ["They trained us to uphold what is right, not rewrite it,\" you say. Anja lets out a small breath — amusement, perhaps. Or bitterness. \"Then they trained us wrong.\" You let out a sigh. \"Or maybe we just failed to live up to it,\" you respond, feeling defeated. \"Speak for yourself. I’ve never stopped delivering results,", "Regret is for those who can afford hindsight. I don’t look back."
                ],
                ["I know you believe what you’re doing matters. That it keeps people safe,\" you try to reach her. Her silence hangs in the air like a verdict. \"But you’re not saving lives, Anja. You’re managing casualties.\" \"Call it what you want. Fewer people die when I make the decisions.", "Clean hands don’t stop bleeding."
                ],
                ["How many did you let walk free to keep this little empire running?\" Your eyes lock. Yours burns. Hers are unreadable. \"Fewer than you think. And all of them with purpose.\" \"You trade lives like poker chips now. What does that make you?\" you challenge her. \"It makes me the last person still trying to win,", "By any means necessary."
                ],
                ["You said the Citadel stood above corruption. Now you’re waist-deep in it.\" She doesn’t deny it — just nods once, like accepting an unfortunate truth. \"Then maybe the Citadel was naive. I’m not,", "The world’s broken. I just learned to stop flinching when I pull the trigger."],
                ["You’re working with the same monsters we swore to bring down. That’s not compromise. That’s betrayal.\" Her response comes with no hesitation, no regret: \"No. That’s survival. That’s results. That’s order,", "Keep your oaths. I’ll keep the world standing."
                ]
            ],
            expression: _.template(`her face composed, impassive — like she’s already weighed the cost and filed the obituary`), gun: "Citadel service gun",
            casino: {
                descriptor: ["Steel", "Iron", "Grey", "Shadow", "Redeemed"],
                animal: ["Hound", "Raven", "Jackal", "Wolf", "Owl"]
            }
        },

        {
            name: "Ayakashi", expansion: "essenceofevil", showdown: "essenceofevil", boss: "Ikuchi", bosstitle: _.template('${randFrom(["raging","tempestous","furious","mighty"])} ${randFrom(["monster lord","demon king"])}'), gender: "male", desc: () => randFrom([`soldiers of storm`, "servants of the tempest"]), addressing: "flotsam", minions: _.template(`${randFrom([`brooding`, `storm-born`, `grim`])} ${randFrom([`soldiers`, `ninja`, `warriors`, `sentinels`])}`), threat: "raises his fist while the ground at his feet begins to blacken and smoke, lightning rooting upward", minionnames: ["Envoy", "Naruguard", "Stormthrall"], preparedboss: [["Shrouded", "and play it"]], execution: random_template("summons a spear of lightning on the ${gPron(contact, 'sex')}, leaving only smoke and silence"),
            gloat: [
                [`You were supposed to protect people, Kyoryu! you shout. "Kyoryu drowned,`, `Only the storm remains.`],
                [`You can still turn back!" you plead desperately. "The tides are rising,`, `And there’s no shore left for me.`],
                [`You're lost, Ikuchi!" you cry out. "I am <span class  = "emphasis">found</span>,`, `Found in power, found in fury!`],
                [`Citadel believed in you <span class = "emphasis">I</span> believed in you!" you shout. "Then you were a fool,`, `I am what was buried beneath.`],
                [`This isn't strength — it's madness!" you shout through gritted teeth. "Madness? No. <span class = "emphasis">Clarity</span>,`, `You will understand as you fall.`],
                [`You were stronger when you had a heart!" you try to reach the humanity within the beast. "Hearts sink,`, `Only the storm floats.`],
                [`You don't have to do this!" you shout. "You don't have to breathe either,`, `And now here we are.`],
                [`If you are Kyoryu no longer, what are you?" you shout. "I am the rising storm,`, `And you are already drowning.`],
                [`You stand before the rising storm,`, `And it will drag you screaming into the abyss.`],
                [`Raijin tore away my weakness,`, `And I will tear yours from your bones.`],
                [`Hope is a house of straw,`, `And I am the thunder come to claim it.`],
                [`The storm does not bargain,`, `And neither do I.`],
                [`I offer no salvation,`, `Only the silence after the hurricane.`],
                [`Lightning answers only to rage,`, `And rage guides my every strike.`],
                [`I carved my soul from the storm itself,`, `And I will carve your ruin just as easily.`]
            ]
            , expression: _.template(randFrom([`eyes burning with a fury so raw it seems to crackle in the air between you`, `eyes blazing with the cold fire of the storm, lips curling into a snarl as sparks crackle along his skin`])), antiair: "a shriek of lightning", detonation: "he raises his arms to the clouds — the air above you ruptures, and a pillar of storm crashes down", keywords: ["swarm"], swarm: "echoes of the storm", ritual: "Raijin", brute: randFrom(["arms thick with knotted muscle, veined with lines of faintly glowing energy", "arms like slabs of coiled muscle, humming faintly with a storm’s fury trapped just beneath the skin"]),
            casino: {
                descriptor: ["Storm", "Tempest", "Thunder", "Howling", "Veiled"],
                animal: ["Tengu", "Wolf", "Crane", "Kitsune", "Dragon"]
            }
        },

        {
            name: "Brotherhood", expansion: "riseofthekingdom", showdown: "stretchgoals18", boss: "Dmitri", bosstitle: _.template('callous mercenary'), gender: "male", desc: () => randFrom(["the ruthless band of mercenaries","the soldiers of fortune for the highest bidder"]), addressing: "comrades", minions: _.template("mercenaries, soldiers and spies"), threat: "unsheaths his knife, running it along his fingers", minionnames: ["Anastasia", "Boris", "Drago"], preparedboss: [["Trusty Kevlar", "and put it into play"], ["N-40 Punisher", "and put it into play"]], execution: random_template("cuts the ${gPron(contact, 'sex')}'s neck","shoots the ${gPron(contact, 'sex')} dead"), brute: randFrom(["arms swollen with muscle", "arms with biceps like cannonballs, veined and hard a steel", "arms too big for the sleeves that dared try", "muscles so overbuilt they looked sculpted by an angry god", "arms glistening with sweat and menace"]),
            gloat: [
                [`Brute force isn't the end-all of conflict, you know," you say, meeting the gaze of your enemy. The tension in the air matches his demeanor, but your voice remains steady, challenging. "Strength is inevitability,`, `Like the inevitability of change, unavoidable. I will break you.`],
                [`All this firepower, for what? A shadow of a bygone era?" you ask, your determination illuminating the standoff. "The era never ended; the battlefield merely shifted,`, `And here, now, you face its relentless truth.`],
                [`They made us to be unbeatable. In my land, to show weakness is to already be dead,`, `Here, against you, I am the final test. I am the end of your journey.`],
                [`War is not sought; it is inherited,`, `And with it, the responsibility to wield its power judiciously. Against you, I wield not just weapons, but the weight of history.`],
                [`They trained me to be the best. In the motherland, weakness is the greatest sin,`, `Here, facing you, I am absolution. I am the judge and executioner, and my verdict is final.`],
                [`Your methods, Drago, your war... it's from another time. It's over," you say. "Over? The fight never ends.`, ` It merely waits for a worthy opponent. I've been waiting for you.`]
            ], expression: _.template(`baring his teeth as he recognizes you`), antiair: "a rocket-propelled grenade", keywords: ["blade", "explosion", "guns"], blade: "N-40 Punisher", explosions: `rocket-propelled grenades`, gunmen: "Brotherhood assassins", gun: "assault rifle",
            casino: {
                descriptor: ["Iron", "Crimson", "Obsidian", "Winter", "Ghost"],
                animal: ["Wolf", "Bear", "Viper", "Falcon", "Raven"]
            }
        },
        {
            name: "Cybertooth Crew", expansion: "stretchgoals18", showdown: "stretchgoals18", boss: "Miss Matrix", bosstitle: _.template(`${randFrom(["legendary", "unparalleled"])} ${randFrom(["ghost", "hacker", "slicer"])}`), gender: "female", desc: () => `${randFrom(["crew", "posse", "gang"])} of ${randFrom(["ruthless cyber-criminals", "glitch-riding anarchists", "datajackers, street punks and digital saboteurs"])}`, addressing: "flatliners", minions: _.template(`${randFrom(["neon-drenched", "wired", "amped", "dark web"])} ${randFrom(["thrashers", "freaks", "deckers"])}`), threat: "draws her blade, pointing at your heart", minionnames: ["Pux", "Lola", "Sin-D"], preparedboss: [["Neoplating", "and put it into play"]], execution: random_template("slices ${gPron(contact, 'possessive')} throat clean","glitches the ${gPron(contact, 'sex')}'s mind like a buggy app"),
            gloat: [
                ["You think a firewall makes you safe? You’re standing inside my code now.\" \"Then let’s see how you run on a clean reboot,\" you retort. Miss Matrix grins. \"You can’t uninstall a god,", "I debug people like you for sport."],
                ["I’ve been chasing your code across a dozen shattered servers. Found a lot of corpses along the way,\" you growl. Miss Matrix tilts her head. \"Each one a user who misunderstood the terms of service,", "You’re next to accept the license agreement."],
                ["You’re just a viral ghost in a dead city,\" you mock. \"Then why does your pulse spike every time I speak?", "Fear is the only language your kind understands."],
                ["You’ve infected every network in Ransom. What do you even want?\" you shout. \"Everything. Every byte. Every breath,", "Your bandwidth is about to drop to zero."],
                ["You’re not unbeatable. Everyone’s got a weak point,\" you say. Miss Matrix chuckles. \"True. Yours is the belief that you matter,", "Try harder next time."],
                ["You’re alone. All that power, and no one left to trust you,\" you narrow your eyes.\" She doesn’t flinch. \"I don’t need trust. I have control,", "And you just logged in to your own execution."],
                ["I liberate people from the burden of choice,", "Autonomy is such an outdated privilege."],
                ["This ends with you unplugged,\" you state firmly. She smirks. \"I’m already somewhere else,", "But your body? That still bleeds."]
            ], expression: _.template(`gaze loaded with silence and execution`), keywords: ["blade"], blade: "high-tech katana", antiair: "a burst of raw glitch-code",
            casino: {
                descriptor: ["Neon", "Chrome", "Emerald", "Ghost", "Quantum"],
                animal: ["Tiger", "Serpent", "Panther", "Mantis", "Kitsune"]
            }
        },
        {
            name: "Cartel", expansion: "riseofthekingdom", boss: "Juan", showdown: "stretchgoals18", bosstitle: _.template("ruthless gangster"), gender: "male", desc: () => randFrom(["the gang of vicious drug smugglers","the gang of street dealers"]), addressing: "gringos", minions: _.template("vicious gangers and hardened outcasts"), threat: "levels his shotgun straight at you", minionnames: ["Tyrone", "Ignacio", "Lucille"], preparedboss: [["On Alert", "and put it into play"]], execution: random_template("lifts the shotgun and blasts the ${gPron(contact,'sex')} point-blank","pulls the trigger and drops the ${gPron(contact,'sex')} instantly","lets the shotgun roar, and the ${gPron(contact,'sex')} is gone."
            ),
            gloat: [
                [`You cloak your actions in the guise of community service, but at what cost, Juan? How many lives have been ruined in your so-called protection?" you challenge, your voice firm, refusing to be swayed by his veneer of benevolence. "Ruined? No, you misunderstand. I've provided safety, opportunities where there were none,`, `Without me, the community faces chaos. I am not their oppressor; I am their savior.`],
                [`Your empire is built on suffering, no matter how you justify it. You're no hero to your community," you assert, stepping closer, the resolve in your eyes mirroring the strength of your words. "Suffering? You see only the surface. I've turned blood into the lifeblood of progress,`, `In this harsh world, I am the lesser evil, the shield against greater dangers.`],
                [`I've taken the reins where governments have failed. Who else but me has stood in the gap, faced the storm to protect our people?`, `Yes, I wield power, but for a cause greater than myself. I am the guardian this community neither chose nor knew it needed, but I am the guardian it has.`],
                [`You wield your shotgun like a scepter, Juan, ruling through fear under the guise of protection. How can you claim to serve the community with such violence in your hands?" you question, confronting the reality of his reign. "The shotgun is not just a tool of fear, but of order,`, `In the chaos that surrounds us, it's a beacon of justice. I have brought peace, stability. Can you say the same for your methods?`],
                [`Your so-called benevolence is a thin veil over the tyranny of your shotgun diplomacy. The community needs leaders, not tyrants," you assert, daring to challenge his narrative directly. "Ah, but leadership requires strength,`, `This weapon, it's a symbol—of the immediate consequences for those who threaten our way of life. I've used it to carve out a sanctuary in a world that offers none.`],
                [`In this hand, the shotgun represents more than power; it's a commitment to the people under my protection,`, `With every pull of the trigger, I've defended my community from chaos. Critics call it violence; I call it sacrifice.`],
                [`As you parade around, shotgun in hand, what's the endgame? To become a martyr for your so-called community?" you probe, challenging the narrative he's crafted around himself. "Martyr? No. Guardian. Protector. And when threats loom at our doorstep,`, `I say, 'Say hello to my little friend'.`],
                [`You claim to be the shield against chaos, but it's a thin line between protector and oppressor," you argue, the tension between you palpable. "Juan methodically loads each shell into his shotgun, savoring the anticipation. "Ah, but in times of peace, the protector rests.." With a decisive snap, he closes the weapon, the ominous click echoing through the surroundings. "In times of war,`, `Always ready to defend what's ours.`],
                [`This cycle of violence... when does it end?" you demand, seeking a crack in his facade. He smirks. "It ends when the threats do." He chambers a round, his resolve clear, "Okay,`, `I'm reloaded. Here comes the pain!`],
                [`What's the deal today? Two crimes for the price of one, or just a bargain on second-hand villainy?" you can't help but quip. "Ah, you've just walked onto the lot,`, `Let's see if you're ready to pay the price.`]
            ], expression: _.template(`flicking a cigar in your direction`), keywords: ["guns"], gunmen: "gun-toting gangsters", gun: "double-barreled shotgun",
            casino: {
                descriptor: ["Golden", "Black", "Burning", "Coyote", "Deadly"],
                animal: ["Jaguar", "Scorpion", "Hound", "Vulture", "Bull"]
            }
        },

        {
            name: "Cifarelli family", expansion: "stretchgoals18", showdown: "stretchgoals18", boss: "The Don", bosstitle: _.template('${randFrom(["street","merciless","cold-hearted","ruthless","crime", "mafia", "mob"])} ${randFrom(["kingpin", "godfather", "boss"])}'), gender: "male", desc: () => randFrom([
                "the empire of smugglers, fixers, and killers in fine shoes",
                "the syndicate of gamblers, enforcers, and people who never forget a slight",
                "the family of merchants, murderers, and people who never forget a debt",
                "the quiet rulers of streets, docks, and graves"
            ]), addressing: "mutts", minions: _.template("${randFrom([`menacing`,`stone-hearted`,`dangerous`])} ${randFrom([`mobsters`,`hitmen`,`suits`])}"), threat: "slowly adjusts his leather gloves while staring at you", minionnames: ["Tommy", "Bonnie", "The Plumber"], preparedboss: [["Increased Protection", "and put it into play"]], execution: random_template("pulls a sleek pistol from his coat, and fires once. The shot cracks like a closing door, and the ${gPron(contact, 'sex')} collapses sideways, lifeless before he hits the floor", "produces a boxcutter and slices the ${gPron(contact, 'sex')}'s throat"),
            gloat: [
                ["I gave you a chance. Hell, I gave this whole city a chance. No one took it,", "So now, I take everything."],
                ["Honor’s a funny thing. You break yourself trying to keep it, and the world laughs while you drown,", "Me? I stopped drowning years ago."],
                ["Part of me hopes you walk away. Really, I do,", "But the part that built an empire knows you won’t."],
                ["I tried doing things the clean way once. Built something with my own hands,", "But the world only respects the man who holds the gun."],
                ["I respect guts. Takes guts to walk in here.", "Pity I’m about to spill yours all over."],
                ["I don’t like getting my hands dirty,","But for you, I’ll make an exception."],
                ["Nothing personal,", "Just business."],
                ["I'm won't be making you an offer to refuse,","Dogs are given orders - or put down."]
            ], expression: _.template(randFrom([
                `scowling at you with a dead stare like he’s already decided where your grave will be`,
                `with the faintest twitch of disgust at the corner of his mouth`
            ])), keywords: ["gun"], gun: "worn black automatic",
            casino: {
                descriptor: ["Fortune's", "Black", "Sanctuary", "Shadow", "Majestic"],
                animal: ["Lion", "Snake", "Wolf", "Eagle", "Boar"]
            }
        },

        {
            name: "Davenport Manor", expansion: "stretchgoals18", showdown: "stretchgoals18", boss: "Selene", bosstitle: _.template('${randFrom(["insane","terrifying","maniac","masked", "Salem Street\'s"])} ${randFrom(["butcher","widow","witch"])}'), gender: "female", desc: () => randFrom(["the legion of darkness","the servitors of the Ashen Lord"]), addressing: "victim", minions: _.template(randFrom(["creatures of the night","children of dark","vile demons and cadavers","cursed hunters and killers"])), threat: randFrom(["she laughs, chainsaw teeth spinning to life","revs her chainsaw with a screech, spattering gore everywhere"]), minionnames: ["Bartholomew", "Ylfa", "Doloers"], preparedboss: [["Slaughterspell", "and play it"]], execution: random_template("tears through the ${gPron(contact, 'sex')} from shoulder to hip with the roaring chainsaw, a crimson fan painting the area","drives the chainsaw forward, dropping the ${gPron(contact,'sex')} instantly","revs the chainsaw, dashes in, and obliterates the ${gPron(contact,'sex')} with a single, unstoppable finisher"

            ),
            gloat: [
                [`This place reeks of death, doesn’t it?" You decline to answer. "Good. I brought enough for everyone,`, `Now let’s carve up the silence.`],               
                [`I killed my family, burned their dreams, and wore their screams as a crown," Selene says softly, tilting her head. "For what? Why.." you start, but get cut off. "And you think you’ll stop me with speeches?"`, `No, sweet fool. Only screams matter here.`],                
                [`Madness didn’t consume me. I devoured it, bone and all,`, `And you’re next on the menu.`],
                [`Behind this mask? Only truth remains — stripped raw and howling,`, `Let me show you.`], 
                [`Summon the Ashen Lord, raise the dead, shred the living — all paths lead to me. And you?`, `You're just decoration for the ruins.`], 
                [`It always ends the same, Gladiator. Screams, ashes, and silence beneath my feet,`, `You’ll be beautiful in ruin.`],                
                [`Fear the quiet, not the chaos," Selene grins, revving the chainsaw. "Because when it’s quiet, I’m already behind you,`, `And then your'e too late!`],
                [`You look surprised," Selene sneers. "I thought the Widow of Salem Street was just a story.." you mutter. "Then let me show you the final chapter,`, `It's written in blood.`],
                [`You think you can save this cursed place?" She tilts her mask, amused. "Someone has to try," you growl. "Then you’ll make a lovely failure,`, `The Ashen Lord will thank me for your bones.`],
                [`You shouldn't have come here," Selene says quietly, chainsaw thrumming in her grasp. "Neither should you," you snap. Her laughter cuts the air. "But only one of us is leaving,`, `Guess who holds the key.`],
                [`You still believe you’ll stop me?" Selene asks, voice velvet over steel. "If we don’t, who will?" you shout. She spins the chainsaw once, grinning behind her mask. "No one,`, `Not in this lifetime.`],
                [`You think this is all madness? No, this is purpose. The Scarab calls, and I answer." You shake your head, trying to steady yourself. "It'll destroy everything." She tilts her mask, smiling unseen. "Exactly,`, `Some things deserve to burn.`],
                [`The Scarab is the key. And I am the one who turns it. And this world will kneel or burn,`, `But you I'll carve apart first.`],
                [`One god beyond gods," Selene murmurs as the shadows coil around her. You try to cut through the madness. "Even you can't control something like that." She revs the chainsaw, grin wide beneath the mask. "No one controls gods,`, `But I can unleash Him.`]
            ],
            expression: _.template(randFrom([`her porcelain mask hiding all but the cruel tilt of her mouth and the gleam of savage delight in her eyes`,`her cold gaze and razor-thin smile radiating cruelty barely restrained by civility`, `her hollow stare and slow, unsettling grin hinting at a joyless hunger for destruction`])), antiair: `twisting mass of black fire rippling with ash and old blood`, keywords: ["blade","ritual"], ritual: "Ashen Lord", blade: randFrom(["a rusted chainsaw, teeth caked with dried blood and bone fragments","a brutal chainsaw vibrating with savage hunger, more butcher's tool than weapon"]),
            casino: {
                descriptor: ["Dead", "Bloody", "Cursed", "Black", "Midnight"],
                animal: ["Scarab", "Raven", "Wolf", "Bat", "Cat"]
            }
        },

        {
            name: "Empire", expansion: "lamentofthebloodmoon", boss: "Blood Moon", showdown: "none", bosstitle: _.template('${randFrom(["unearthly","harrowing","ethereal"])} ${randFrom(["queen", "goddess"])}'), gender: "female", desc: () => randFrom([
                "the cult of martial artists, shadows and businessmen","the fanatic followers of an ancient entity"
            ]), addressing: "interlopers", minions: _.template("${randFrom([`loyal`,`fanatical`])} ${randFrom([`contract killers`,`mirages`,`yakuza`])}"), threat: "rests her blade across her shoulder, eyes unreadable, like she’s already chosen where it will land", minionnames: ["Salaryman", "Mirage", "Jinrou"], preparedboss: [["Bolster Spirit", "and put it into play"]], execution: random_template("slices the ${gPron(contact, 'sex')} open from gut to throat"), swarm: "blood shades", pit: "a portal of supernatural blood", gunk: "a pool of unearthly blood",
            gloat: [
                ["I don’t hate you. That would make this easier.\" Blood Moon's voice is quiet. A little cracked. \"But you’re still in my way,", "So I’ll do what I have to. Like always."
                ],
                ["Do you think I want this? To walk through blood just to feel anything again?\" Blood Moon lowers her gaze for a moment. \"This isn’t who I was. But it’s who I am now,", "You don’t have to forgive me. Just fall."
                ],
                ["If I stop now, it was all for nothing. So I won’t.\" Blood Moon's shoulders tense, but her eyes stay tired. \"You’d understand, if you’d lost what I did,", "And if you don’t? Then you’ll die not knowing why."
                ],
                ["There’s always someone trying to stop me. Always someone with hope in their eyes.\" Blood Moon meets your gaze. There’s no cruelty there. Just silence. \"I used to look like that,", "Let’s end this before I remember too much."
                ],
                ["It’s not personal. Not anymore. Just the next name, the next obstacle.\" Blood Moon exhales slowly, as if trying to feel human again. \"I’m sorry it has to be you,", "But I can’t stop. And you won’t step aside."
                ]
            ], expression: _.template(`her eyes watching you with sadness, almost, like she’s already accepted your fate`), keywords: ["blade", "ritual"], ritual: "Blood Moon", blade: "pale katana, quiet as the snowfall",
            casino: {
                descriptor: ["Snow", "White", "Winter", "Sanguine", "Deadly"],
                animal: ["Jaguar", "Scorpion", "Hound", "Vulture", "Dragon"]
            }
        },

        {
            name: "Empire", expansion: "lamentofthebloodmoon", boss: "Swiftclaw", showdown: "none", bosstitle: _.template('${randFrom(["fiery","unstoppable","infernal","mythical"])} ${randFrom(["dragon", "priest", "monster"])}'), gender: "male", desc: () => randFrom(["the cult of martial artists, shadows and businessmen","the fanatic followers of an ancient entity"
            ]), addressing: "unbelievers", minions: _.template("${randFrom([`loyal`,`fanatical`])} ${randFrom([`contract killers`,`mirages`,`yakuza`])}"), threat: "scrapes his claws together, showering sparks as he stares without blinking", minionnames: ["Salaryman", "Mirage", "Jinrou"], preparedboss: [["Inferno", "and put it into play"]], execution: random_template("burns the ${gPron(contact, 'sex')} to a crisp in an instant"), swarm: "shades of the moon",
            //blade: "fist with razor-sharp claws", 
            brute: randFrom(["arms of scaled muscle layered like armor beneath cracked hide", "draconic limbs packed with corded strength and ancient fury", "reptilian muscle coiled over bone like forged steel"]),
            gloat: [
                ["You’re real... I thought you were a story,\" you stand in awe in front of the myth. The beast’s voice is low, reverent, as if delivering scripture. \"All truth begins as myth. Then it returns in flesh,", "Your blood will mark the page where story ends."
                ],
                ["Your body will not resist. Your spirit already knows,", "This judgment was carved long before your bones grew."
                ],
                ["You scream, you run, you bleed... and none of it matters.\" Swiftclaw twitches in anticipation, already halfway through this in his mind. \"You're just noise until you break,", "And I like the sound of breaking things."
                ],
                ["You came to test the myth. It will not break.\" Swiftclaw's talons flex once — like punctuation. \"You will,", "Let your charred bones carry the lesson to any who would come after."
                ],
                ["You reek of fear. Good.\" Razor talons flex as Swiftclaw leans forward, slow and deliberate.  \"That means your body understands,", "Now let’s teach the rest of you."
                ]
            ], expression: _.template(`exhaling through flared nostrils, misting the air`), ritual: "Blood Moon", antiair: "an infernal blast of unearthly fire", detonation: "He inhales slow and deep, chest rising like a drawn bow — then exhales a torrent of flame that swallows the world in burning light",
            casino: {
                descriptor: ["Black", "Snow", "Crowned", "Seared", "Feral"],
                animal: ["Dragon", "Viper", "Stallion", "Raptor", "Hydra"]
            }
        },

        {
            name: "Fire Cloud Gang", expansion: "tideofthedragon", showdown: "tideofthedragon", boss: "Tiger Ip", bosstitle: _.template('${randFrom(["vengeful","fallen","skilled"])} ${randFrom(["prodigy","martial artist","son of a legend","champion"])}'), gender: "male", desc: () => randFrom(["the gang of ruthless martial artists-turned criminals","the elite martial artists gone criminal","the skilled fighters ruling the streets"]), addressing: "weaklings", minions: _.template("${randFrom([`merciless`,`remorseless`,`cold`])} ${randFrom([`fighters`,`enforcers`,`soldiers`])} and ${randFrom([`unbreakable`,`vicious`,`violent`])} ${randFrom([`warriors`,`troopers`,`gangers`])}"), threat: "rolls his neck, slow and lazy, like the fight's already been decided", minionnames: ["Luke", "Oscar", "Lion"], preparedboss: [["Dragon Pole", "and put it into play"], ["Butterfly Swords", "and put it into play"]], execution: random_template("grips the ${gPron(contact, 'sex')}'s jaw, forces eye contact, and ends ${gPron(contact, 'possessive')} life with a swift, practiced strike", "places his palm against the ${gPron(contact, 'sex')}'s chest, exhales once, and strikes with a furious force, leaving the victim dead", "raises his butterfly sword in a controlled arc and ends the ${gPron(contact, 'sex')} with a single, flawless motion"),
            keywords: ["blade"], 
            blade: randFrom(["compact, heavy butterfly sword","wide-bladed heavy sword","short, wide and brutal blade"]),
            gloat: [
                [`You stand there thinking strength is loud. Real power is quiet - and absolute,`, `I'll show you the silence after a lesson is learned.`],
                [`I've faced better fighters than you... and buried them in memory, not the ground." "You'll remember us differently," you retort. "No,`, `You I'll just bury deeper.`],
                [`You have trained for victory. I have trained because losing isn't an option,`, `Today, you will learn the difference.`],
                [`You call yourselves 'Gladiators'? Titles don't make warriors.. scars do," Tiger Ip says coldly. "We've earned plenty!" you respond with certainty. "How quaint,`, `I will carve your last.`],
                [`You are not here to defeat me,`, `You're here to understand why you never could.`],
                [`You know of my past? The tournaments? The glory? Tell me, does the story frighten you?" Tiger Ip asks with unintelligible look. "You merely blame others for your fall," you shrug. "Blame is for the weak,`,`I prefer consequences.`]
            ], expression: _.template(randFrom([`tilting his head, a slow smirk forming`,`rolling his shoulders loose, cracking his neck, smiling`, `pressing his fist into his palm and bowing just enough to be insulting`])),
            casino: {
                descriptor: ["Fallen", "Iron", "Burning", "Red", "Broken"],
                animal: ["Tiger", "Crane", "Wolf", "Cobra", "Boar"]
            }
        },


        {
            name: "Golden Dragons", expansion: "riseofthekingdom", showdown: "stretchgoals18", boss: "Ah Long", bosstitle: _.template("unrelenting martial arts master"), gender: "male", desc: () => randFrom([
                "the enterprise of martial artists, thugs and businessmen",
                "the alliance of criminal organizations"
            ]), addressing: "interlopers", minions: _.template("ruthless triads and yakuza"), threat: "lifts his hand, dark, malevolent energy flaring on his fist", minionnames: ["Jin", "Dao", "Wan Bo"], preparedboss: [["Merciless Clutch", "and put it into play"]], execution: random_template("snaps the ${gPron(contact, 'sex')}'s neck"),
            gloat: [
                [`You've bound these criminals under one rule, but what's the cost to the innocent?" you challenge. "Dominion founded on intimidation is a hollow victory." Ah Long stares at you with oppressive aura emanating from him. "This consolidation is our fortitude,`, `Your interference is a mere echo against the monolith of my ambition.`],
                [`Admirable martial skill, yet it's wielded without honor. What legacy are you leaving behind?" you inquire, your voice steady. "Legacy? I am forging a legacy of power and prosperity,`, `My art is the axis upon which a new era will turn.`],
                [`Order from chaos, unity from strife — I delivered what the law could not." As he speaks, you assess the man before you — a ruler of shadows, yet undeniably a visionary in his own right. "My command of chi is but a testament to my rightful place at the helm,`, `My reign will be remembered as the dawn of true unity.`],
                [`Power respects power. Through the ancient art that I alone have perfected, I've demonstrated my worth beyond dispute,`, `You, an outsider, cannot comprehend the necessity of my rule. I stand at the zenith, not as a tyrant, but as a harbinger of the inevitable order.`],
                [`Your mastery of chi, does it justify the path you've chosen? The imposition of your will upon the city?" you press on. "Justify? It is not about justification,`, `It is destiny.`]
            ], expression: _.template(`his keen eyes and sly smirk reeking of confidence and self-importance`),
            casino: {
                descriptor: ["Heavenly", "Golden", "Imperial", "Shadowy", "Dark"],
                animal: ["Dragon", "Tiger", "Crane", "Phoenix", "Koi"]
            }
        },

        

        {
            name: "Kingdom", expansion: "riseofthekingdom", showdown: "stretchgoals18", boss: "Jackal", bosstitle: _.template("mad scientist"), gender: "female", desc: () => randFrom(["the mysterious criminal syndicate","the ancient shadowy sect"]), addressing: "test subjects", minions: _.template("${randFrom([`enhanced`,`monstrous`,`zombie`])} ${randFrom([`soldiers`,`ninja`,`creations`])} and ${randFrom([`clone`,`molded`,`genetic`])} ${randFrom([`dolls`,`marionettes`,`puppets`,`sisters`])}"), threat: "smiles, her eyes start to glow malevolently, and you feel pressure behind your eyes", minionnames: ["Power Soldier", "Marionette Doll", "Mountain General"], preparedboss: [["Neural Invasion", "and play it"]], execution: random_template("stares at the ${gPron(contact, 'sex')} who simply falls dead"), gunk: randFrom(['a slow-churning vat of Jackal’s mutagenic ooze', 'a vat of Jackal’s pulsing, toxic green fluid', 'a bubbling vat of green gel marked with Jackal’s insignia', 'a glowing container of Jackal’s bio-reactive gel']), lab: "clone",
            gloat: [
                [`How noble of you,`, `To donate your bodies for science.`],
                [`You won't get out of here,`, `I never turn down new specimens!`],
                [`You have played your part well,`, `But who do you think you really are?`],
                [`You always are so predictable,`, `Who do think you are working for?`],
                [`Children,`, `You should not have risen against your mother.`],
                [`Seems there is no shortage of new specimens these days,`, `But that is a positive problem.`],
                [`Your anger, Jackal, it's consuming you. Who are you trying to punish with this madness?" you ask, your voice cutting through the palpable tension, a direct challenge to the fury smoldering within her.  "Punish? This is not about punishment; it's about correction,`, ` My revenge is a gift, obsolescence of outdated morals that hold humanity back.`],
                [`This isn't evolution; it's manipulation on a global scale," you argue, taking a step forward, your determination casting a stark contrast to Jackal's madness. "Manipulation is just another tool for evolution,`, `You fail to see the beauty in the control I wield.`],
                [`As I stand at the precipice of a new era,`, `I can't help but marvel at the simplicity of my solution. A world free from the chaos of free will.`],
                [`Why stop at clones, Jackal? Why not reshape the entire cosmos with your madness?" you ask, sarcasm lacing your words. "Ah, you jest, but there's wisdom in your mockery. Why indeed?`, `Perhaps that will be my next masterpiece, once I've tired of this world.`],
                [`Your army, your powers, Jackal — it's all just a facade to hide how truly lost you are," you say, challenging not just her plans but her very purpose. "Lost? On the contrary, I've never been more found,`, `This chaos, this 'madness' you see, it's the clarity of purpose.`],
                [`The mind holds such delicate power, a plaything for those with the will to manipulate it. My abilities are a paintbrush, reality my canvas`, `Let's see what masterpieces I can create.`],
                [`Your clones, they're abominations, not advancements," you assert. "Abominations? My children, you lack vision. They are the next step in your evolution. And you? `, `You're just relics.`],
                [`How can you justify this? Playing god with lives avenging what?" you question, the weight of your moral conviction clashing against hers. "Justify? I have no need for justification. You see toys; I see the future,`, ` You perceive my actions as revenge, but I am merely setting the stage for a grand rebirth`],
                [`The beauty of cloning is not just the act itself, but the possibilities it unlocks. Each clone, a perfect soldier, ready to bend at my will. Gladiators?`, `Merely obstacles on my path to greatness.`],
                [`In your defiance, you prove your obsolescence,`, `In my creations, I see the future.`]
            ], expression: _.template(`her constricted pupils and demonic grin showing no humanity`), antiair: "an iridescent lance of psychic energy", keywords: ["swarmed"], swarm: "marionettes",
            casino: {
                descriptor: ["Silent", "Twilight", "Jade", "Shadow", "Blood"],
                animal: ["Viper", "Crane", "Wraith", "Dragon", "Jackal"]
            }
        },

        {
            name: "Kingdom", expansion: "riseofthekingdom", showdown: "stretchgoals18", boss: "Kemono", bosstitle: _.template('${randFrom(["imposing ","six-armed ",""])}green ${randFrom(["mutant","monster"])}'), gender: "male", desc: () => randFrom(["the mysterious criminal syndicate","the ancient shadowy sect"]), addressing: "insects", minions: _.template("mysterious ninja and martial arts masters"), threat: "lifts his mighty fists, lightning crackling", minionnames: ["Power Soldier", "Marionette Doll", "Mountain General"], preparedboss: [["Uncontrollable Surge", "and put it into play"]], execution: random_template("rips off the ${gPron(contact, 'sex')}'s head", "picks the ${gPron(contact, 'sex')} up and snaps ${gPron(contact, 'object')} like a twig"), brute: randFrom(["six massive arms knotted with muscle and tension", "six-fisted might", "six arms, each muscle carved in pain and power", "six arms bulging with raw, unnatural strength"]),
            gloat: [
                [`You fight with fury, but your eyes tell a different story. What are you truly fighting for?" you inquire, seeking the being within the beast. "What I fight for? Survival... not mine, but theirs," Kemono rumbles, a momentary glimpse of the sentient being trapped within the guise of a monster, but already you see the monster returning. "Freedom is a distant dream for the likes of me,`, `But you won't be dreaming again.`],
                [`Do you not dream of a life beyond this, beyond the commands of your masters?" you probe, attempting to peel back the layers of resignation that cloak Kemono's spirit. "Dreams... are dangerous," he mutters, a trace of melancholy weaving through his gruff exterior. "Once, perhaps, I dreamt of open skies and the earth beneath my feet, untainted by blood." The fury returns to Kemono's eyes. "But dreams are luxuries afforded to the free,`, `My reality is bound by duty and the will of those I serve.`],
                [`Our battle, though regrettable, is unavoidable,`, `I am bound to this path, as you are to yours.`],
                [`Is there no other way? Must we be enemies, bound by the whims of those you call masters?" you press, an effort to reach the being behind the beast. "Enemies? Perhaps in this arena, but not in spirit,`, `I challenge you not out of desire, but duty. Forgive me, for I cannot defy the hand that controls me.`], [`To you Gladiators, I extend my silent apologies, my regret not for the strength I wield, but for the freedom I lack,`, `May the day come when these chains break, not by the might of my arms, but by the strength of my will.`],
                [`Can't you see? This violence, it's what they want from you. Break free from their hold!" you shout. "Break free? If only it were so simple,`, `I am a creature of conflict, molded for battle!`],
                [`Your masters, they've made you a puppet. Fight back, Kemono, reclaim your will!" you urge. "Puppet? No, I am no one's puppet,`, `Know this: my spirit, though caged, is not broken.`],
                [`I am a warrior bound by blood and duty. In my savagery, I am unmatched, a force of nature unleashed,`, `Yet, in my heart, I harbor a regret as vast as the skies—regret for a path chosen not by me but for me.`]
            ], expression: _.template(`his demonic eyes and grim expression delivering a promise of violence`), antiair: "a brilliant shock of burning white lightning", detonation: `Suddenly, you feel your hair stand up, and in an instant Kemono explodes with electricity`, keywords: ["explosion"], explosions: "uncontrolled electrical surges",
            casino: {
                descriptor: ["Silent", "Twilight", "Jade", "Shadow", "Blood"],
                animal: ["Viper", "Crane", "Wraith", "Dragon", "Jackal"]
            }
        },

        {
            name: "Kingdom", expansion: "riseofthekingdom", showdown: "stretchgoals18", boss: "Shadow", bosstitle: _.template("ominous mastermind"), gender: "male", desc: () => randFrom(["the mysterious criminal syndicate","the ancient shadowy sect"]), addressing: "fools", minions: _.template("${randFrom([`mysterious`,`tireless`,`silent`])} ${randFrom([`soldiers`,`ninja`,`generals`])} and ${randFrom([`clone`,`identical`,`psychic`])} ${randFrom([`marionettes`,`puppets`,`martial artists`])}"), threat: "lifts his hand, and dark blades materialize out of thin air", minionnames: ["Power Soldier", "Marionette Doll", "Mountain General"], preparedboss: [["Fan of Blades", "and put it into play"]], execution: random_template("steps through the shadows — one precise strike ends the ${gPron(contact,'sex')} instantly","snaps forward, and the ${gPron(contact,'sex')} falls dead without any visible injury","moves like a viper, palm landing once, force rippling out, and the ${gPron(contact,'sex')} collapses without a sound","strikes with a  sliver of darkness flickers, and the ${gPron(contact,'sex')} is finished in a single motion"
            ),
            gloat: [
                [`My, what a brave, handsome group,`, `Perhaps it would interest you to see what fate has in store for you.`],
                [`You have interfered for the last time,`, `Now, you shall die.`],
                [`My children, you have come to me. For who now is your father if it is not me?`, `When I am gone, you will have never been. What would your world be without me?`],
                [`On its own, humanity is a destructive force,`, `It needs a master.`],
                [`Your meddling grows weary,`, `The time has come for us to end this, and it is my pleasure to grant you release from this foolish errand.`],
                [`Your manipulation ends now. People aren't pawns in your grand scheme," you assert, your stance embodying the defiance you feel. "Ah, but that's where you're mistaken,`, `Every move, every choice, it all leads back to the chessboard I've laid out.`],
                [`How can you justify this control? This isn't guidance; it's tyranny," you challenge, the air around you charged with tension. "Tyranny? A narrow perspective,`, `I offer a path to order, to purpose. My methods are not for the faint-hearted, but the results... undeniable.`],
                [`Humanity stands on the brink, teetering between enlightenment and oblivion,`, `They need a shepherd, someone who sees the grand picture. I've glimpsed what could be — a world remade.`],
                [`Your incessant meddling has become quite tiresome," Shadow says, his voice dripping with disdain. "You underestimate the will of those you seek to control," you retort, undeterred. "Your maze has an end, and we're here to find it." "Ah, such naiveté. It's almost... endearing,`, `My maze, as you call it, is infinite. Your persistence is futile.`],
                [`Why continue this charade? You know we'll never stop coming for you," you state boldly. "Charade? This is no mere game,`, `And that, Gladiator, is your folly. You see a villain to be defeated, but I am the architect of the future.`],
                [`You Gladiators and your Citadel.. you cling to your ideals like driftwood in a storm, unaware that I am the tempest. You disrupt the delicate balance, blind to the chaos you propagate in your ignorance,`, `But no matter. Your meddling is but a footnote in the grand scheme.`],
            ],
            expression: _.template(`his calculating eyes reflecting a cold, merciless intellect`), keywords: ["blade"], blade: "ephemeral blade",
            casino: {
                descriptor: ["Silent", "Twilight", "Jade", "Shadow", "Blood"],
                animal: ["Viper", "Crane", "Wraith", "Dragon", "Jackal"]
            }
        },

        {
            name: "Nahualli", expansion: "stretchgoals17", showdown: "rumblepack", boss: "Tlazolteotl", bosstitle: _.template('Aztec ${randFrom(["goddess of death", "empress", "sorcerer"])}'), gender: "female", desc: () => randFrom(["the ancient force of restless warriors","the reawakened dead of the Afflicted Realm"]), addressing: "mortals", minions: _.template('${randFrom(["necromancers", "ancient callers", "pale wizards"])} and ${randFrom(["shambling cadavers", "walking dead", "rotten corpses"])}'), threat: "reaches for you, fingers spread wide, purple arcane energy crackling between them", minionnames: ["Pale Caller", "Pale Caller"], preparedboss: [["Decaying Blast", "and play it"]], execution: random_template("touches the ${gPron(contact, 'sex')}, killing him instantly"), pit: "a yawning portal of purple energy",
            gloat: [
                [`You must be taught what has been forgotten,`, `You must be taught the wrath of the old gods.`],
                [`I will have your soul!`, `I will taste its sins!`],
                [`You have strayed from the cycle of life and death,`, `I will make you my next sacrifice.`],
                [`I have conquered this world before,`, `I will not be stopped by the likes of you children!`],
                [`Enough of these games!`, `I will take what I am due!`],
                [`You will pay your goddess her due respect!`, `I will make you my next sacrifice!`],
                [`Even the strongest warriors will fall!`, `Fall to the power of death!`],
                [`The world has changed. Your time has passed," you declare, standing firm in the face of this ancient power. "Changed? Time? Mortal concepts,`, `My dominion is eternal, as is my right to rule!`],
                [`Your army of the dead... It's an abomination. We'll stop you, no matter the cost," you vow, the resolve in your voice a beacon of hope in the gathering darkness. "Abomination? No, they are my faithful subjects, returned to enact my will,`, `As for stopping me — try, and you will find your place among them.`],
                [`The world trembles at the prospect of my return,`, `They remember, in their bones and their souls, the reign I once held.`],
                [`You build, you strive, you fight against the dying of the light,`, `Yet, in the end, all will return to dust under my gaze.`],
                [`The era of the living ends, and the age of the dead begins anew,`, `The cycle will complete, with me as its harbinger.`],
                [`Your arrogance blinds you. The world will not cower before you as it once might have," you assert, the courage in your voice defying the oppressive aura of decay that surrounds her. "Arrogance? I simply state the truth. I am a god, and my reign is preordained,`, `Your resistance is but a fleeting defiance against the tide of eternity, and all will kneel before my might.`]
            ], expression: _.template(`beautiful and terrible all at once`), antiair: `hurled magical spells`, detonation: `She touches the amulet around her neck. The world around you seems to blow away in a deafening explosion of arcane energy`, keywords: ["undead", "swarmed", "blade", "ritual"], ritual: "Afflicted Realm", blade: "ritual dagger", swarm: "zombies",
            casino: {
                descriptor: ["Obsidian", "Cenote", "Bloodied", "Sacred", "Nightborn"],
                animal: ["Jaguar", "Bat", "Serpent", "Coyote", "Buzzard"]
            }
        },

        {
            name: "New Brotherhood", expansion: "lamentofthebloodmoon", also: "twintiger", showdown: "none", boss: "Castle", bosstitle: _.template('${randFrom(["legendary","disciplined","silent"])} ${randFrom(["agent", "hitman", "director", "sniper"])}'), gender: "male", desc: () => "squad of mercenaries", addressing: "marks", minions: _.template("${randFrom([`elite`,`disciplined`,`hardened`])} ${randFrom([`sweepers`,`ghosts`,`killers`])}"), threat: "glances at his watch, then at you — like measuring the delay", minionnames: ["Power Soldier", "Lion", "Drago"], preparedboss: [["Ambush", "and put it into play"]], execution: random_template("puts a bullet between the ${gPron(contact, 'sex')}'s eyes"),
            gloat: [
                ["You’re Castle. Of course you are,\" you state matter-of-factly. Castle doesn’t blink. \"Then you know how this ends,", "Fast. Clean. Unavoidable."
                ],
                ["I thought you worked alone,\" you try to provoke Castle. His experssion doesn't shift. \"I do. They’re just insurance,", "I don’t take chances. I remove them."],
                ["I’ve trained for this,\" you affirm, attempting to cover your unease in the presence of the legend. Castle steps into range without hesitation. \"Then let’s test the training,", "Hope you studied the part where you lose."],
                ["You’re not walking away from this,\" you tell the renowned assassin. Castle tilts his head slightly. \"Never before the job is done,", "No unfinished business."],
                ["No speeches?\" you try to find something to latch on. Castle tightens his gloves. \"Why waste your last moments yapping, Gladiator?", "I don’t talk people down. I put them down."
                ]
            ],
            expression: _.template(`gaze moving slow and exact, like lining up the shot before the trigger is even pulled`), keywords: ["guns", "blade"], blade: "custom-built combat knife", antiair: `shot from a powerful sniper rifle`, gun: "silenced pistol",
            casino: {
                descriptor: ["Slate", "Silent", "Carbon", "Ivory", "Precision"],
                animal: ["Hound", "Viper", "Falcon", "Raven", "Panther"]
            }
        },

        {
            name: "Nomads", expansion: "lamentofthebloodmoon", also: "tideofthedragon", showdown: "none", boss: "Butler", bosstitle: _.template('${randFrom(["charismatic","grinning","reckless"])} ${randFrom(["vagrant","wildcard","warlord","juggernaut"])}'), gender: "male", desc: () => "the ragtag band of outcasts", addressing: "buddies", minions: _.template("${randFrom([`ragged`,`hardened`])} ${randFrom([`nomads`,`outcasts`,`drifters`])}"), threat: "raises one hand, palm out, then slowly clenches it into a fist — without breaking eye contact", minionnames: ["Goliath", "Felicia Salt", "Mountain General"], preparedboss: [["Juggernaut", "and put it into play"]], execution: random_template("breaks ${gPron(contact, 'sex')}'s neck"), brute: randFrom(["arms carved from pure muscle", "arms thick as tree trunks", "sweat-slicked arms coiled like springs"]),
            gloat: [
                ["You think I'm what’s wrong with the world? Buddy, I’m what’s <span class = 'emphasis'>left</span> of it.\" Butler's grin is too wide, too calm, like he’s already counted your bones. \"Try and fix me, and I’ll show you how much worse broken can get,", "You don’t stop storms - you drown in them."
                ],
                ["Justice? That’s a bedtime story for people who haven’t lost anything real.\" Butler wipes blood off his knuckles like he's cleaning paint. \"You came looking for answers — I'll give you a beating instead,", "Some people heal. I found something better."
                ],
                ["I was the guy who begged for help once. Know what that got me? Buried friends and a one-way ticket to reality.\" Butler takes a step forward, not fast - but heavy. \"You’re next in line for the wake-up call,", "Hope’s just fear with a nicer haircut."],
                ["Nice posture. Bet you still believe in clean fights too,\" Butler calls out and shrugs, rolling his shoulder like he’s shaking off morality. \"Come on then. Teach me something before I ruin your day,", "Heroism’s cute. Messy, but cute."
                ],
                ["You’re here to stop me? Please. I’ve been off the rails so long, I built my own tracks.\" Butler's voice is low, friendly, like he might just invite you for drinks — after he breaks your jaw. \"If you’re lucky, I’ll leave you teeth to lie with,", "This isn't rebellion. It's recreation."
                ]
            ],
            expression: _.template(`his smirk is lazy and lopsided, but his eyes stay locked`),
            casino: {
                descriptor: ["Rusty", "Dusty", "Bruised", "Wild", "Broken"],
                animal: ["Dog", "Boar", "Crocodile", "Kangaroo", "Dingo"]
            }
        },

        {
            name: "Oni", expansion: "legendofoni", showdown: "rumblepack", boss: "Yokai", bosstitle: _.template('${randFrom(["cursed, powerful warrior","warrior born of mystery and fire"])}'), gender: "male", desc: () => randFrom(["the group of cursed spirits","the servitors of hellfire"]), addressing: "mortals", minions: _.template('${randFrom([`ancient`,`immortal`,`lost`,`undead`,`cursed`,`shadow`])} ${randFrom([`warriors`,`ninja`,`doppelgangers`])} and ${randFrom([`powerful`,`seductive`,`nine-tailed`])} ${randFrom([`spirits`,`fox spirits`,`shapeshifters`])}'), threat: "lifts his mighty fist, suddenly engulfed in eldritch flames", minionnames: ["Yurei Ninja", "Kitsune"], preparedboss: [["Eldritch Strike", "and play it"]], execution: random_template("snaps the ${gPron(contact, 'sex')}'s neck"), brute: randFrom(["arms with muscles drawn tight like cables over a forge-warmed frame", "sinewy arms coiled with the weight of something ancient and burning", "arms with flesh hardened by centuries of pressure, pulsing with smoldering strength", "arms of power bound in brute form"]),
            gloat: [
                [`Are you prepared to face the wrath of Shin Yokai?`, `No, you’re not prepared!`],
                [`The hunger of the Oni is insatiable!`, `And you will be the food!`],
                [`Your quest for power will consume you. There's more to existence than the destruction you seek," you assert, the heat of the Oni's presence a tangible force. "Consume me? It fuels me. Existence is but a series of challenges to be overcome, enemies to be crushed,`, `I do not seek to rule over ashes; I seek the flame, the fight, the undeniable proof of my strength!`],
                [`You believe yourself invincible, but every fire can be quenched," you challenge. "Quenched? By what? Your hope? Your defiance?`, `Hope withers in the face of true power. Defiance evaporates into despair. I am the unquenchable fire, the apex of strength.`],
                [`In my wake, nothing stands — only the echoes of the battles fought, the adversaries defeated,`, `Power is not a means to an end; it is the end. `],
                [`You fail to understand, all of you mortals, that domination is fleeting, but power — power is eternal.  I do not desire your lands or your allegiance,`, `I desire your spirit, fueling my hunger!`],
                [`Your hunger will lead you to solitude. What victory is there in a world left in ruins?" you ask. "Victory is not in the aftermath but in the moment,`, `My hunger is boundless, as is my might!`],
                [`Bound by no realm, hindered by no moral, my hunger is the forge upon which my power is tempered,`, `In the end, you will see: to hunger is to live, and to feed is to conquer.`]
            ], expression: _.template(`his fiery stare and gritted teeth sending a message of barely contained fury`), antiair: `hurled bolts of eldritch energy`, detonation: `With one enraged scream, he explodes with a tremendous flash of energy from within, causing a blazing ring of fire to spread outwards`, keywords: ["oni", "swarm", "ritual"], ritual: "Oni", swarm: "shadow ninja",
            casino: {
                descriptor: ["Burning", "Ashen", "Blighted", "Molten", "Dread"],
                animal: ["Oni", "Fox", "Crow", "Wyrm", "Spirit"]
            }
        },

        {
            name: "Onyx League", expansion: "twintiger", showdown: "stretchgoals18", boss: "Mack", bosstitle: _.template('${randFrom(["black-hearted","mysterious"])} overlord'), gender: "male", desc: () => "the league of street gangs", addressing: "sheeple", minions: _.template("vicious gangers and street criminals"), threat: "levels his gun straight at you", minionnames: ["Abolo", "Felicia Salt", "Veronica Pepper"], preparedboss: [["Taking Aim", "and put it into play"]], execution: random_template("shoots the ${gPron(contact, 'sex')} dead"),
            gloat: [
                [`Fists versus bullets?`, `I will use your butts as target practice!`],
                [`What's the end game with all this madness, Mack? You're tearing the community apart," you challenge, your posture ready for whatever may come. "Madness? This is clarity. Strip away rules, and what's left?`, `Freedom. Pure and simple.`],
                [`People are getting hurt. You call this freedom?" you push, trying to reach the man behind the mayhem. "Hurt? Maybe. But it's like hitting reset. Sometimes, things gotta burn to build something better,`, `You see chaos; I see change.`],
                [`Let it all come crashing down. From the ashes, we'll see what's really worth saving,`, `Society's a joke. I'm just the guy brave enough to point it out. And you? You're in the punchline.`],
                [`Seems we are outgunned," you say, clenching your fists, the determination in your stance a stark contrast to the arsenal at his disposal. He chuckles, admiring the audacity. "Fists against guns? That's either bravery or madness. But I like the style,`, `Still, you can forget a fair fight.`],
                [`You really think you can intimidate us with that?" you ask, nodding towards the machine gun in his hands, your fists clenched not in fear, but in defiance. "Intimidate? No, this is about making a statement,`, `And trust me, nothing speaks louder than a few well-placed bullets. But, by all means, let's see what those fists can do.`],
                [`Bringing a gun to a fistfight, Mack, that's your idea of control?" you challenge, stepping closer, the resolve in your eyes unwavering. "Control is an illusion,`, `But fear, now that's real. And very, very persuasive. Let's just call this an insurance policy.`],
                [`Here we stand, the ultimate showdown. You come with fists in a world ruled by steel,`, `Let's see if courage alone can withstand the storm I'm about to unleash. This is the chaos I live for.`],
                [`Does it ever weigh on you, the chaos you've chosen? Or is that gun your only answer to everything?" you inquire, your voice steady. "A gun answers more questions than you'd think. But it's not about the chaos; it's about what comes after. As for weighing on me?`, `Let's just say I sleep just fine.`]
            ],
            expression: _.template(`his keen eyes and predatory sneer reeking of confidence and ruthlessness`), antiair: `hail of machine-gun fire`, keywords: ["guns"], gun: "machine gun",
            casino: {
                descriptor: ["Onyx", "Savage", "Velvet", "Chrome", "Midnight"],
                animal: ["Rat", "Cobra", "Hawk", "Hound", "Cat"]
            }
        },

        {
            name: "Parasol", expansion: "aftershock", showdown: "aftershock", boss: "The Proxy", bosstitle: _.template('mysterious agent'), gender: "male", desc: () => "the evil pharmaseutical business", addressing: "you fools", minions: _.template('${randFrom([`corporate`,`efficient`])} ${randFrom([`killers`,`sweepers`])} and ${randFrom([`ruthless`,`calculating`])} ${randFrom([`assassins`,`suits`])}'), threat: "pulls up his sleeves", minionnames: ["Executive", "Clean Sweep", "Mr. Russo"], preparedboss: [["Unshceluded Meeting", "and play it"]], execution: random_template("breaks the ${gPron(contact, 'sex')}'s neck"), lab: "drugs",
            gloat: [
                [`Innovation doesn't pause for ethics,`, `We're writing the future, not reading history,`],
                [`Profit is not a dirty word in my office,`, `It's the only word.`],
                [`There has to be a limit to what you're willing to do for success,\" you question his morality. \"Limits are for those lacking vision,`, `My eyes are set on the horizon, not the ground at my feet.`],
                [`Your actions have consequences beyond the boardroom,\" you remind him. \"Every action drives profit, and progress, Gladiator,`, `Consequences are just the cost of doing business.`],
                [`Your pursuit of progress disregards the very essence of our humanity,\" you say, stepping forward. \"Humanity is not static; it's ever-evolving,`, `To hesitate is to stagnate. I prefer to lead us into the future, regardless of the cost.`],
                [`There's a moral responsibility you're blatantly ignoring,\" you argue, your gaze unwavering. \"Moral responsibility? That's a luxury of the spectator, not the player,`, `In this arena, my only responsibility is to the profits. Everything else is secondary.`],
                [`Profit at the expense of people—is that the legacy you want?\" you question, the disappointment clear in your tone. \"Legacy is determined by the victors, and those who innovate stand triumphant,`, `Profit, power, progress—they're all intertwined. People will remember the breakthroughs, not the sacrifices it took to achieve them.`],
                [`How can you justify this relentless push, knowing the harm it causes?\" you demand, your stance firm.  \"Justify? It's not about justification; it's about inevitability,`, `Change is coming, with or without our actions. I choose to be at the helm of that change.`],
                [`Progress demands sacrifice — a truth as old as time, yet it falls to me to remind the world of its validity,`, `My critics see a cold-hearted executive, but I am a visionary.`]
            ],
            expression: _.template(`his calculating stare making the chills run up your spine`), keywords: ["guns"], gunmen: "armed executives",
            casino: {
                descriptor: ["Sterile", "Ivory", "Vitrified", "Silent", "Hollow"],
                animal: ["Leech", "Wasp", "Lamb", "Drone", "Moth"]
            }
        },

        {
            name: "Recyclord", expansion: "stretchgoals18", showdown: "none", boss: "Recyclord", bosstitle: _.template(`${randFrom(["toxic", "sewer-born", "mutated", "biohazard"])} ${randFrom(["mutant", "abomination", "juggernaut", "ecoterrorist"])}`), gender: "male", desc: () => "sludge-born horrors shaped from decay", addressing: "polluters", minions: _.template(`${randFrom(["crawling", "runoff", "toxic"])} ${randFrom(["spawn", "remnants", "abominations"])}`), threat: "extends a sludge-caked limb, mass shifting like boiling tar", minionnames: ["Grasping Garbage", "Trashmouth", "Shielding Rubbish"], preparedboss: [["Waste Not, Want Not", "and play it"]], execution: random_template("crushes the ${gPron(contact, 'sex')} in one squeeze"),
            gloat: [
                ["What… what are you?\", you ask in horror. Recyclord shifts, wet and massive. \"I’m the consequence you threw in the gutter,", "Now I’m throwing it back."],
                ["Your weapons won’t work here. This whole place feeds me.\" \"Then we’ll starve you,\" you answer with determination. Recyclord laughs, low and slow. \"You’ll run dry long before I do,", "Even your bones are recyclable."],
                ["Steel. Plastic. Flesh. All trash when I’m through.\" \"I don’t go down easy,\" you sneer. Recyclord’s body pulses. \"You don’t go anywhere. You get processed,", "You're already part of the waste stream."],
                ["You think this city still belongs to you? I’ve repurposed it. And you will be reclaimed,", "All things return to the Earth — screaming."],
                ["Every step you take leaks poison. Every breath you waste costs the world. I’m the bill come due.", "And you're the last receipt I’ll burn."],
                ["You call me a monster. I call myself efficient,", "Welcome to the reclamation chamber."],
                ["The sewers were my grave. Now they're my cathedral,", "Let’s see how well you compost."]
            ],
            expression: _.template(`oozing a slow grin across his maw`), keywords: ["swarm", "gunk"], swarm: "undulating appendages", brute: randFrom(["thick, elastic tendrils rippling with refuse", "tentacles of wax and waste, hungry for contact", "writhing like sludge-formed tentacles"]), antiair: "eruption of chemical filth", gunk: `${randFrom(["bubbling", "undulating", "seething"])} ${randFrom(["ooze", "refuse"])} ${randFrom(["mire", "pool"])}`, detonation: randFrom(["he convulses once, then ruptures outward, blasting scalding waste in all directions", "his body swells, then collapses inward with a wet crunch — and a violent refuse explosion follows"]),
            casino: {
                descriptor: ["Verdigris", "Lost", "Repurposed", "Rustborne", "Forgotten"],
                animal: ["Gull", "Toad", "Wurm", "Golem", "Rat"]
            }
        },
        {
            name: "Silver Phoenix", expansion: "lamentofthebloodmoon", also: "tideofthedragon", showdown: "none", boss: "Caitlyn", bosstitle: _.template('${randFrom(["vengeful","tenacious","patient"])} empress'), gender: "female", desc: () => "the legacy of syndicates reborn as one", addressing: "pawn", minions: _.template("${randFrom([`elite`,`ruthless`,`trained`])} ${randFrom([`killers`,`soldiers`])}"), threat: "draws a line through the air with her finger — across her throat, just for you", minionnames: ["Reina", "Marionette Doll", "Lucille"], preparedboss: [["Blade Shield", "and put it into play"]], execution: random_template("slices the ${gPron(contact, 'sex')}'s throat"), gloat: [
                ["You don’t have to do this. There’s still a way back,\" you try to reason with Caitlyn. Her eyes narrow, unreadable, but there's a glint of something buried—anger, or maybe memory. \"Back to what? Scraps? Graves? Empty ideals? I’ve built something. And I won’t let you break it,", "Vengeace renewed me."],
                ["You act like I lost my way. But I know exactly where I’m going.\" Her gaze is razor-sharp, her mouth a tight line — cool control with no room for doubt. \"And if you can’t accept that — then you’re just another obstacle,", "You don’t stop a storm by telling it who it used to be."],
                ["You want a fight? I run a syndicate. I don't swing fists — I *erase* problems.\" Her eyes never blink. \"But if you insist... I’ll make an example of you,", "When you're gone, no one will admit they knew you."
                ],
                ["I don’t raise my voice. I don't make threats. And I *never* give second chances.\" Her tone could be mistaken for compassion — until you look in her eyes. \"So take a breath. It'll be your last one with teeth,", "My mercy is the silence after."
                ],
                ["People think power's about violence. But real power? It's who *gets to decide* when the violence ends.\" She straightens her dress like the fight’s already over. \"And today, I decide you disappear,", "You'll vanish like smoke, and not a soul will ask why."
                ]
            ],
            expression: _.template(`her presence radiating absolute authority`), keywords: ["blade"], blade: "bladed fan",
            casino: {
                descriptor: ["Silver", "Ashen", "Crimson", "Gilded", "Broken"],
                animal: ["Phoenix", "Crane", "Fox", "Blade", "Tiger"]
            }
        }
    ];

    enemies = expansionfilter === undefined
        ? enemies
        : enemies.filter(enemy => {
            const matchesExpansion = expansionfilter.includes(enemy.expansion);
            const matchesAlso = !enemy.also || expansionfilter.includes(enemy.also);
            return matchesExpansion && matchesAlso;
        });

    return enemies

}

export function getGladiators(expansionfilter, enemies = getEnemies(), stages = getStages()) {

    let gladiators = [
        {
            name: "Ah Long", expansion: "redemption", enemy: [filterArray(enemies, "boss", "Ah Long")[0], randFrom(filterArray(enemies, "name", "Kingdom"))], ally: ["Wan Bo"], rival: ["Shadow", "Jackal", "Wan Bo"], stage: "Steel Memories",
            dialogue: [
                [`I walked a path few dare to tread, uniting under my banner what once was divided. Your interference in my affairs is a misstep you'll regret," you state with a commanding presence. "Misstep? Your empire, your Golden Dragons have a new leadership. What can a lone master do against the might I wield?`, `But go ahead, show me the strength of your Heavenly Dragon, if it still answers to you. I'm eager to see if legends truly die hard.`],
                [`The unity I built was not just of power, but of purpose. You, who sow discord for petty gains, cannot fathom the strength that comes from true allegiance," you say, your voice a blend of lament and resolve. "True allegiance? Your Golden Dragons have a new head, and stand stronger for it. Your time has passed, old 'master',`, `Let's put your so-called mastery to the test then. The Golden Dragons no longer heed your call. What hope do you have?`],
                [`You mistake my absence for weakness, my silence for surrender. The Golden Dragons were more than a symbol of power; they were a testament to honor and strength. I will reclaim what was usurped, starting with dismantling your ambitions," your voice resonating with a calm threat. "Ambitious words for a fallen leader. Your era is over, Ah Long. The winds of change have swept through, and your Golden Dragons have evolved beyond you,`, `Evolve or perish, that is the law of nature. Let's see if your Heavenly Dragon still has any fire left, or if it's merely smoke and ashes.`]
            ],
            get instructions() { return `If you choose to use <i>${this.name}</i>, select ${this.enemy.boss} as the boss in part 2B of your personal story.` }
        },
        {
            name: "Anja", expansion: "lamentofthebloodmoon", enemy: "", ally: [""], rival: ["random"], stage: "",
            dialogue: [
                ["This won't take long. You're not the first to think they could outrun the Citadel,\" your voice is calm, clipped. \"And you won't be the first they bury, either, agent Andersson,", "Justice is just a word. I prefer outcomes."],
                ["You're expanding fast. That’s sloppy. <%=enemy.name == `Shadow` ? `your underlings were` : `Shadow was`%> was better hidden than this.\" You adjust your gloves, one last time — every motion practiced, deliberate. \"Then come see what we’re hiding, agent Andersson,", "Let’s test how well precision bleeds."],
                ["Your pattern was easy to follow. Too easy,\" you say flatly. \"That’s the funny thing about hunters. Eventually, they get hunted too,", "You should’ve stayed behind the desk, agent Andersson."],
                ["You’ve left a trail of bodies and broadcasts. You wanted attention. Now you’ve got mine,\" you state with finality. \"Good. I like to make eye contact when they fall,", "Let’s see how clean your exit strategy really is, agent Andersson."],
                ["If you surrender now, I don’t have to break your ribs. But I will,\" your words are ice. \"Tempting offer. Let me return the favor,", "All that training, Anja - can I call you Anja? And you still think this is a negotiation."]
            ]
        },
        {
            name: "Axel", expansion: "twintiger", enemy: filterArray(enemies, "boss", "Mack")[0], ally: ["Mary Ann"], rival: ["Mary Ann"], stage: "Under Destruction",
            dialogue: [
                [`My defiance wasn't just against the Onyx League; it's against anyone who dares to corrupt this city. For my daughter, for us all, I stand ready," you say with determination evident in your eyes. "Such gallantry, Axel. But righteousness alone doesn't win wars,`, `Your stand ends with me. Let's see how ready you truly are.`],
                [`In the force, I learned the cost of integrity. Now, as a father and a fighter, I know what I'm fighting for," you say, the fire or your commitment burning bright. "And you think you can shield them from the storm with your integrity, Alex?`, `I'll show you the true cost of your so-called 'fight'.`],
                [`I've refused to bend, to break, to falter under the weight of corruption. My battles now are not just for justice, but for the future of those I hold dear," your say as your gaze remains fixed. "Refuse all you want, Axel. But everyone has a breaking point,`, `I look forward to finding yours.`]
            ]
        },
        { name: "Blood Moon", expansion: "redemption3", enemy: "", ally: [""], rival: [""], stage: "" },
        {
            name: "Brandon", expansion: "riseofthekingdom", enemy: filterArray(enemies, "boss", "Ah Long")[0], ally: ["Isabella"], rival: ["Isabella"], stage: ["Cashed Out", "Steel Memories"],
            dialogue: [
                [`Behind the facade of fame, I carry a quest for truth. The lights of the stage won't blind me from the darkness that took her away," you say as a man on a mission. "A noble pursuit shadowed by naivety. The truth has many layers, Brandon,`, `Peel them back, and you might just find your own undoing.`],
                [`This journey, it's more than personal vengeance. It's a search for clarity, for closure. My audience awaits not just my performance, but my story's next chapter," you say, your eyes hardened by loss. "Closure? An elusive end, especially for those entangled with entities like us,`, `Your next chapter could well be your last, 'superstar'.`],
                [`Every script I've read, every character I've become, none were as complex as my own story. Now, I'm the protagonist in a tale of truth and retribution," you say with shadows cast on your determined face. "You think life follows a script, Brandon? That your search will lead to a tidy resolution?`, `This isn't cinema. There are no guarantees of a happy ending, no promise of applause. Only the harsh reality that some stories end in silence.`]
            ]
        },
        { name: "Bruce", expansion: "tideofthedragon", enemy: filterArray(enemies, "boss", "All-Heaven Gang")[0], ally: [""], rival: ["random", "Luke"], stage: "Market Crash" },
        {
            name: "Butler", expansion: "lamentofthebloodmoon", enemy: "", ally: ["random"], rival: ["random"], stage: "",
            dialogue: [
                ["I don't care who you are. I’ve bled worse than you out behind a ramen shop,\" you put weight behind every syllable. \"Then let’s see if you leave a prettier stain,", "You're not here to fight. You're here to break like your buddies."],
                ["I’m not angry anymore. I’m just... ready,\" you say. \"Ready? For what — your final lesson?", "Pain makes for an excellent teacher, Butler."],
                ["Say whatever you want. I already walked out of one grave.\" Your fists hang low and loose — but your eyes never blink. \"So you're that Butler boy they are talking about? You think that makes you special? You can get right back in,", "Survivors talk too much."],
                ["You're standing between me and closure. That's your only mistake,\" you say with a flat tone. \"Then let me show you what a second mistake looks like, Joshua,", "Closure’s just what losers call losing on their terms."],
                ["I’ve got nothing left to prove. Just someone to shut up,\" you sound entirely unshaken. \"That could just as well be you, Butler,", "Confidence always tastes better before the fall."],
                ["You’re not the first thug I’ve followed into a fight — and you won’t be the last to regret it,\" you say with shine in your eyes. You're ready. \"I don’t regret anything but wasting time on you,", "You chase shadows, Butler. I leave bodies."]
            ]
        },
        {
            name: "Caitlyn", expansion: "lamentofthebloodmoon", enemy: "", ally: [""], rival: [""], stage: "",
            dialogue: [
                ["All the people I cared about died screaming, <%=enemy.boss%>. I’ve got room for one more.\" your voice is steady, but something dark flickers in your eyes. \"You're welcome to join them, Richards. I promise you'll scream last,", "You chase ghosts. I make corpses."],
                ["I built a life in blood and fire. You think you can take that from me again?\" your hands twitch, just once. \"I won’t take it, Caitlyn. I’ll erase it like it was never there,", "You’ve survived the past. You won’t survive me."],
                ["You've picked a fight with someone who’s already lost everything.\" you step forward like the world weighs nothing. \"Then I guess you won’t mind losing one more thing, Caitlyn — your life,", "Let’s see what a broken soul bleeds like."],
                ["Your kind left a crater where my future used to be.\" your voice is low, deliberate. \"Now I’m here to return the favor.\" \"Your future was a joke, Caitlyn. I’m just finishing the punchline,", "It’s not revenge if you don’t live to enjoy it."],
                ["I stopped believing in happy endings a long time ago, <%=enemy.boss%>. But I believe in endings.\" your tone is razor-flat. \"Then step into mine, Richards. You’ll fit perfectly in the grave I dug,", "Your story ends where mine begins."]
            ]
        },
        {
            name: "Castle", expansion: "lamentofthebloodmoon", enemy: "", ally: ["random"], rival: [""], stage: "",
            dialogue: [
                ["You?\" <%=enemy.boss%> says as you step from the shadows with the silence of a falling leaf, their hand freezing mid-reach. \"I was wondering when the ghost would show himself,", "You should've stayed a rumor."],
                ["You’re Castle, aren’t you? THE Castle? I thought you'd be taller.\" You say nothing — only tilt your head, slow as a trigger squeeze. \"No matter. Tall or not, you bleed like the rest,", "Let's find out how real your legend is."],
                ["They told me you were a ghost. You don’t look like one.\" you stand still like you own the silence. \"I’ll make you one just the same", "That’s a party trick they'll remember."],
                ["You’re not the first killer they sent for me,\" <%=enemy.boss%> says. You reload with a calm that feels surgical. \"You brought silence with you. Let’s see if it keeps you alive,", "Legends die quieter than they’re made."],
                ["That look in your eyes… like you’ve already planned this through,\" <%=enemy.boss%> says. Your gaze is steady, measuring <%=possessiveSuffix(enemy.boss)%> body weight, the breath timing. \"You thought you'd see the end of me,", "Keep watching. You'll miss it anyway."],
                ["You think just because you don’t speak, you scare people more.\" You don't answer — you just adjust your tie with bruised, disciplined hands, observing every detail about <%=enemy.boss%>. \"But fear’s a waste on someone already marked,", "You walked in like a shadow. I’ll leave you in pieces."],
                ["I heard about you. Castle. Precision. Restraint. No mess.\" You say nothing. You simply straighten your jacket. \"So what’s with the look? Planning to break your streak?", "I’ll make the cleanup worth it."]
            ]

        },
        {
            name: "Chan Chan", expansion: "stretchgoals18", enemy: randFrom(filterArray(enemies, "name", "Kingdom")), ally: ["random"], rival: ["Ume", "Tora", "Kenshin"], stage: "Original Copy",
            dialogue: [
                ["You don’t even know who you are, do you? Just teeth, claws, and a broken little brain.\" \"I remember enough,\" you growl. \"Then you know it always ends the same,", "You wake up, you eat, you sleep. That’s all you’re good for."],
                ["They told me you were a weapon, but you’re just a tantrum with fur.\" \"Say that again when you’re bleeding,\" you say. \"You’re already broken — I’m just pulling pieces,", "Animals don’t win wars. They get put down."],
                ["I’ve seen you before. I’ve seen what you do,\" you growl. <%=enemy.boss%> raises an eyebrow. \"Have you? Or did someone stitch that memory into your head for fun?", "If it hurts, it's because it’s true."],
                ["You are responsible for Hara,\" you say with a voice low, flat, shaking with rage. \"You think so.. well, he lasted longer than most,", "You’ll be joining him soon enough."],
                ["You were their perfect creation once. You broke. They threw you away,\" <%=enemy.boss%> scoffs. \"And now I’m yours to deal with,\" you rebuke. \"No… you’re no one’s anymore,", "You just need to be put down."
                ],
                ["Look at you — breathing heavy, shaking, barely holding it in. Want me to scream? Like the monks did?\" <%=enemy.boss%> asks with a cruel smile. \"You should run,\" you say, claws twitching. \"Good. The beast remembers.", "Let’s see what’s left of the girl."],
                ["You think freedom means peace?", "I'll put you back in your cage."]
            ], get instructions() { return `If you choose to use <i>${this.name}</i>, select ${this.enemy.boss} as the boss and ${getRandomMinions(this.enemy, false, enemies = enemies)} in part 2 of your personal story.` }


        },
        {
            name: "Clint", expansion: "stretchgoals17", enemy: randFrom(filterArray(enemies, "name", "Kingdom")), ally: [""], rival: ["random","random"], stage: [randFrom(stages).name],
            dialogue: [
                [`You prey on the innocent, the vulnerable. You remind me of a darkness I've known too well. It ends here, with me," you say, eyes steady and unwavering. "You think you're some kind of hero, Clint? Taking justice into your own hands?`, `You're just a man, Clint. A man playing at being a ghost.`],
                [`I was taken, lost everything to a tale as old as fear itself. Now, I'm the story to fear — the one that comes for you in the night," you say, resolute despite the odds. "A ghost story, Clint? We deal in realities, and the reality is, you're outnumbered,`, `But every story has an end, Clint. Let's write yours.`],
                [`This path I walk, it's not for redemption or glory. It's for those who've suffered as I have, for the children who deserve a chance at a different story," you voice a deadly whisper. "Noble intentions for a gunman. How quaint. But you're in over your head,`, `This place will be your grave, Clint. Your legend ends in the dust.`]
            ],
            get instructions() {
                return `If you choose to use <i>${this.name}</i>, select ${this.enemy.boss} as the boss and ${this.stage} as the stage in part 3 of your personal story.`
            }
        },
        {
            name: "Crunk", expansion: "stretchgoals18", enemy: filterArray(enemies, "name", "Davenport Manor"), ally: [""], rival: ["random"], stage: "Triage",
            dialogue: [
                ["Look at you — scales, tail, and a sword? What are you, a Saturday morning cartoon?\" \"Better than being the punchline of a bad crime drama,\" comes your answer steadily. \"Keep talking, gecko,", "I’ll skin you for boots."],
                ["You smell that? That’s sewer funk and cold blood.\" \"That’s the scent of your last mistake,\" you grin. <%=enemy.boss%> gags mockingly. \"Then let’s flush you back where you came from,", "Lizards belong in cages."],
                ["You think kung fu’s gonna save you, freak?\" You answer with silence. \"Fine. Let’s see if you can parry a <%=enemy.gun ? 'a bullet' : enemy.blade ? 'a blade' : 'my might'%>,", "Your chi’s about to leak out."],
                ["A tail, claws, a sword... what did the lab mix you with?\" \"Purpose,\" you answer bluntly, narrowing your eyes. \"I’ll cut that out of you first,", "Let’s see what your guts look like."],
                ["You’re a walking biology problem.\" \"I’m the answer you don’t want,\" you reply. \"Then I’ll rewrite the equation,", "Math this — you die screaming."
                ],
                ["You used to be a nobody. A loser. Now you’re just uglier. Let’s fix that,", "Bleed like the human you used to be."],
                ["I’ve killed gods, machines, and monsters. You’re a lizard with a hobby.\" \"And you’re a thug with a death wish,\" you exhale. \"I'll grant yours,", "Kung fu this, freak."]
            ]

        },
        {
            name: "Darius", expansion: "newchallengers", enemy: filterArray(enemies, "boss", "Shadow")[0], ally: [""], rival: ["Kemono"], stage: "Steel Memories",
            dialogue: [
                [`I've walked through time, a specter from an age when honor and valor dictated the fate of men. Freed from one form of bondage, I refuse to shackle myself to the whims of another," you declare with a resolve of centuries. "Ah, Darius, the ancient warrior, thinks he can defy the currents of time. Your ancient values have no place in this new world order,`, `The world you fought for is gone. Welcome to your nightmare.`],
                [`I am no one's pawn, no mere relic to be wielded for a cause. My allegiance is to principles that have outlasted empires," your say, tone as steady as a phalax. "Principles? Your adherence to such outdated concepts will be your undoing. The world is not black and white, Darius. It's time you learned that,`, `Your defiance only seals your fate.`],
                [`I've fought against darker tides than you can fathom. Your threats are but whispers in the wind," you declare, your legacy a shield against <%=possessiveSuffix(enemy.boss)%> ambition. "Whispers that will become roars,`, `You may have outlasted time, Darius, but you won't outlast us!`]
            ]
        },
        {
            name: "Dmitri", expansion: "redemption", enemy: randFrom(enemies), ally: [""], rival: ["Anastasia"], stage: "Right to Remain Silent",
            dialogue: [
                [`Betrayal forged me in its fire. I've outlived those who sought my end. You think you can use me? I am no one's pawn," you say, your voice cold as winters of your youth. "No pawn, you say? Perhaps not. But even kings fall, Dmitri. And when you do, it will be by my hand. Your defiance only marks you for a swifter demise,`, `The shadows you have embraced will consume you.`],
                [`I've danced with death more times than I can count. Each step was a defiance of fate. You're just another shadow in a long night," you declare, defiance blazing in your eyes. "Dance, then, Dmitri. Dance until your legs give out and you collapse into the grave we've prepared for you. Your defiance has been noted,`, `You will not see the dawn.`],
                [`For every shadow that falls, I stand taller. I am the retribution that comes at the end of the night. Your empire of fear ends with me," you vow. "Retribution? How dramatic. But it's not your stand that interests us, Dmitri — it's your fall, and fall you will,`, `Your war ends, not with a victory, but with your silent submission.`]
            ],
            get instructions() { return `If you choose to use <i>${this.name}</i>, select ${["Kingdom", "Empire"].includes(this.enemy.name) ? `${this.enemy.boss} from the ${this.enemy.name} as the boss` : `${this.enemy.name} as the enemy`} in part 1 of your personal story.` }
        },
        {
            name: "Gabriel", expansion: "riseofthekingdom", enemy: filterArray(enemies, "boss", "Jackal")[0], ally: ["Drago"], rival: ["Drago"], stage: "Original Copy",
            dialogue: [
                [`My journey through shadows isn't to seek vengeance, but to reunite what was torn apart, and you stand in my way," you state, determination in your eyes. "Your past, however tragic, does not elevate you to my level. Your quest, noble as it may seem, ends here. The Kingdom, your mentor.. it's all connected in ways you can't fathom,`, `But go ahead Gabriel, fight for what you believe in. It makes no difference. In the grand scheme, you're just another pawn.`],
                [`This search has led me through darkness, molded me into a warrior for those I've lost. You stand before me, embodying the very essence of what I've fought against," you declare with a mixture of resolve and pain. "A warrior, Santos? You flatter yourself. Your struggles, your loss — they make for a touching tale but offer no protection against the reality of power,`, `Let's see if your 'warrior's spirit' can withstand the storm that's coming. I doubt you'll find what you're searching for, especially not through me!`],
                [`I've been a shadow among shadows, searching for a light that seems ever elusive. You, and all you represent, are the darkness I've vowed to dispel," you state, your determination unshaken. "Dispelling darkness? You're more delusional than I thought. The world thrives in shades of grey, Santos. Your quest for light is but a fool's errand,`, `But by all means, try to prove me wrong. It will be amusing to watch you try and fail, just as you've failed to find those you seek.`]
            ],
            get instructions() { return `If you choose to use <i>${this.name}</i>, ${getRandomMinions(this.enemy, false, enemies = enemies)} in part 3 of your personal story.` }
        },
        {
            name: "Glam", expansion: "stretchgoals18", enemy: filterArray(enemies, "name", "Cirafelli family")[0], ally: ["random"], rival: ["Tommy", "The Proxy", "random"], stage: "",
            dialogue: [
                ["Nice outfit. What is that, rave reject meets swamp monster?\" \"It’s called range, darling. Look it up,\" you quip with a wink. \"I’ll look down on you soon enough,", "Let’s see how well you spin in pieces."],
                ["Used to be a pop star, huh? Now you’re just a backup dancer in a sewer.\" \"Better than headlining your funeral,\" you retort and blow a bubblegum bubble. \"Keep flapping that mouth,", "I’ll drop the mic myself."],
                ["You always move like that, or are you just showing off?\" you smirk. \"You keeping up or falling behind?\" <%=possessiveSuffix(enemy.boss)%> eye flash darkly. \"You’ll be flat on beat one,", "Let’s turn this stage into a grave."],
                ["All that grace. All that spin. Still just a freak. Let's make this your final performance,", "Time to drop the curtain."],
                ["You dance, you dodge, you pose. What are you, a cartoon?\" \"Aww. Jealous much?\" you pout dramatically. \"Jealous of roadkill?", "I'll rip the glam right off you."],
                ["They said you used to light up the stage. Now you’re glowing green and hiding underground.\" \"Still getting applause, though,\" you smile. \"This one’s a standing ovation — over your body,", "Final act’s gonna be messy."],
                ["What’s your weapon supposed to be? A ribbon? A leash?\" \"It’s whatever I need it to be,\" you roll your eyes. <%=enemy.boss%> chuckles. \"You’ll need a leash where you're going,", "I'm walking out with your pride."],
                ["You're all flash, no fight.\" \"Wanna test that theory,\" you say raising a brow. \"Sure. Let’s watch you break in style,", "I’m about to remix your face."]
            ]

        },
        {
            name: "Grill", expansion: "stretchgoals18", enemy: filterArray(enemies, "boss", "Parasol")[0], ally: ["Juan"], rival: ["Juan"], stage: "Compromised",
            dialogue: [
                ["What are you supposed to be, a frog? \"Gecko, actually,\" you shrug. <%=enemy.boss%> grins. \"Good — easier to crush,", "Hope your tongue can catch fists."],
                ["Heard you used to roll with a proper crowd. What happened? \"I evolved,\" you smirk. <%=enemy.boss%> chuckles. Then I’ll stomp you back to basics,", "This ain’t art class — it’s demolition."
                ],
                ["No weapons? What, forget your gear, lizard boy?\" \"I brought enough,\" you say, stretching your tongue. <%=enemy.boss%> raises an eyebrow. Then come get stuck,", "Let’s see how far that tongue really goes."],
                ["You stick to walls? Cute. Maybe I’ll peel you off one.\" \"Try it. I bounce,\" you chuckle. \"Good — I like a challenge,", "Let’s smear you across the rafters."],
                ["You talk like a clown and fight like a cartoon.\" \"Funny. You look like last week’s bad idea,\" you respond, tilting your head. \"Then laugh while you can,", "You’ll croak on your own punchline."],
                ["This is no place for art kids and lizards.\" \"Good thing I’m both,\" you return with a smile. \"Then you’re double dead,", "Gonna hang your skin like graffiti."],
                ["You ain’t a gangster. Never were.\" Grill breathes in slow. \"No — I’m better.\" <%=enemy.boss%> narrows his eyes. \"Then let’s see you prove it, punk,", "Your soft side’s getting split open."],
                ["You heroes always show up with fancy names and sad stories.\" \"Want me to spell yours next?\" you return. <%=enemy.boss%> laughs. \"Sure — in blood,", "You’re gonna leave here in pieces, Grill."]
            ]

        },
        {
            name: "Hanzo", expansion: "essenceofevil", enemy: randFrom(enemies), ally: [""], rival: ["Kyoryu", "Ikuchi"], stage: "Ring of Fire",
            dialogue: [
                [`I emerge from the shadows not as a savior but as the storm itself. My battle is with the unworthy who dare to disrupt the balance," you state, your voice a low rumble. "So, the ghost decides to walk among us once more. Your ancient codes and prideful posturing will find no purchase here. The world has moved on,`, `Let us see if your so-called mastery can weather the storm we bring. You are a relic, Hanzo.`],
                [`Your arrogance blinds you to the true nature of strength. I have faced down empires, seen dynasties rise and fall. Your ambition is but a footnote in the annals of combat," your words slicing through the air with the sharpness of a blade. "A relic speaking of relevance? You'll find that the world cares little for your philosophies. Strength rules, and you, Hanzo, are an anachronism,`, `Your end approaches, ancient one. We will bury you and your outdated honor beneath the foundations of our new order.`],
                [`You view me as an echo of the past, yet fail to see the lessons it teaches. I am the culmination of centuries of warfare, a force of nature that your fleeting power cannot comprehend," you say with the weight of history. "A force of nature? We are the cataclysm that will sweep you away. Your history ends with me,`, ` Prepare for oblivion, Hanzo. This is where your legend dies.`]
            ]
        },
        {
            name: "Ikuchi", expansion: "redemption2", enemy: filterArray(enemies, "boss", "Jackal")[0], ally: ["Megan"], rival: [""], stage: "Original Copy",
            get instructions() { return `If you choose to use <i>${this.name}</i>, ${getRandomMinions(this.enemy, false, enemies = enemies)} in part 2 of your personal story.` }
        },
        { name: "Isabella", expansion: "newchallengers", enemy: filterArray(enemies, "boss", "Juan")[0], ally: [""], rival: ["random"], stage: "Compromised" },
        {
            name: "Jack", expansion: "stretchgoals18", enemy: filterArray(enemies, "name", "Golden Dragons")[0], ally: ["random", "random"], rival: ["random", "Genesis"], stage: "Right to Remain Silent",
            dialogue: [
                [`You prey on the weak because you see them as easy targets. I've been where they are, and I'll be their shield if that's what it takes," you say with conviction in your voice steadfast. "A shield? Noble, but futile, Jack. You're just one man against the tide,`, `Let's see how long you can stand before you're swept away.`],
                [`This city taught me the cost of indifference. I lost Jen to these streets, and I won't stand by and watch others suffer the same fate," you say, each word tinged with pain of loss. "Lost? Or just another casualty to your misguided crusade?`, `Your quest for redemption is a path littered with despair, Gatsby. Ready to add more names to your conscience?`],
                [`I've seen the best and worst of what this city has to offer. I chose to stand for something more, to be the difference Jen believed we could all be," you declare, determination lighting up the shadows. "Belief? In this city, belief is as cheap as the lives you're trying to save,`, `But every beacon eventually burns out, Gatsby. Yours is no different.`]
            ]
        },
        { name: "Jackal", expansion: "redemption", enemy: filterArray(enemies, "boss", "Shadow")[0], ally: ["Project X"], rival: ["Kemono", "Project X"], stage: "Steel Memories" },
        { name: "Jirou", expansion: "tideofthedragon", enemy: filterArray(enemies, "name", "All-Heaven Gang")[0], ally: ["Phoenix"], rival: ["random", "Lion"], stage: "Sky High" },
        {
            name: "Juan", expansion: "redemption", enemy: randFrom(enemies), ally: ["Tiger Azules"], rival: ["Tiger Azules"], stage: "Compromised",
            get instructions() { return `If you choose to use <i>${this.name}</i>, select ${["Kingdom", "Empire"].includes(this.enemy.name) ? `${this.enemy.boss} from the ${this.enemy.name} as the boss` : `${this.enemy.name} as the enemy`} in part 1 of your personal story.` }
        },
        {
            name: "Kemono", expansion: "redemption", enemy: randFrom(filterArray(enemies, "boss", "Shadow", true)), ally: ["Darius"], rival: ["Shadow", "Darius"], stage: "Sudden Death",
            dialogue: [
                [`You see a beast, a relic of past games, but within me burns a desire for more than servitude," you declare, your voice resonating with determination- "Desire? A beast like you knows only loyalty to those who wield power over you,`, `But freedom? It's an illusion, Kemono. You'll always be a monster, bound by your nature.`],
                [`I've fought in arenas, spilled blood for entertainment. My loyalty was to a warrior's honor, not to the chains of The Kingdom," you say, your gaze unwavering. "Honor? Your kind knows only the thrill of the fight, the rush of bloodlust,`, `You may seek freedom, but the shadow of your past will always follow you, Kemono.`],
                [`My loyalty was earned through respect, not fear. And now, I seek a freedom that respects my strength, not exploits it," each of your words measured.  "Freedom? You're a weapon, Kemono. Weapons don't control — they're controlled,`, `Try as you might, the beast within can never truly be free. You'll find no peace in your quest, only more chains.`]
            ],
            get instructions() { return `If you choose to use <i>${this.name}</i>, select ${this.enemy.boss} as the boss in part 2 of your personal story.` }
        },
        {
            name: "Kenshin", expansion: "redemption2", enemy: filterArray(enemies, "boss", "Ah Long")[0], ally: ["Brandon"], rival: randFrom(["Shadow", "Jackal", "Kemono"]), stage: "Cashed Out",
            dialogue: [
                [`You carry the weight of many sins, Kenshin," <%=enemy.boss%> says, voice dripping with disdain. "Do you really think you can wash them away by playing the hero?" "My path is one of atonement, not redemption," you respond, the legacy of Hattori flowing through you. "I will stop you and any like you, not for forgiveness, but because it is right." "Atonement? There's no atonement in this life, only power and those too weak to seek it,`, `Let's see if your resolve holds as firm as your convictions.`],
                [`Kenshin Hattori, the legendary warrior turned peacemaker," <%=enemy.boss%> taunts, circling you like a predator. "Have you finally realized the futility of your quest?" "I realized long ago the price of my actions," you reply, calm and resolute. "It's a price I pay willingly to ensure others don't suffer as I have." "Noble words for a killer,`, `Let's see if your skills are as sharp as your tongue!`],
                [`You seek to cleanse this place with your blood and blade?" <%=enemy.boss%> mocks. "You are but one man against the tide of darkness." "One man with a will to make a difference," you state, resolve in your voice. "Your darkness ends here." "Then come, Kenshin Hattori,`, `Let us see if your light can outshine the darkness we embrace.`]
            ],
            get instructions() { return `If you choose to use <i>${this.name}</i>, select ${this.rival} as the rival in your personal story.` }
        },
        {
            name: "Kyoryu", expansion: "riseofthekingdom", enemy: randFrom(enemies), ally: ["Hanzo"], rival: ["Hanzo"], stage: ["Steel Memories", "Sudden Death"],
            get instructions() { return `If you choose to use <i>${this.name}</i>, select ${this.enemy.boss} as the boss in part 2A of your personal story.` }
        },
        {
            name: "Leeta", expansion: "aftershock", enemy: enemies.filter(e => e.name == "Parasol")[0], ally: ["Jade"], rival: ["Jade"], stage: ["Derailed", "Triage"],
            dialogue: [
                [`You're far from your old haunts, Leeta," <%=enemy.boss%> begins. "Old haunts, new battles," you retort. "Vengeance is a volatile motivator. It burns hot, consumes much, and leaves little but ash. Are you sure you're prepared for the fire?" comes the amused response. "My fire's been burning long before Parasol decided to fan the flames," you snap back with fierce defiance. "Bold words, Leeta. But you seek to dismantle what you don't fully understand. And that,`, `Is a path to self-destruction.`],
                [`You've strayed from your roots, Leeta," <%=enemy.boss%> observes. "Roots can be replanted," you reply, the edge in your voice sharp. "Especially when the soil's been poisoned." The smirk in response barely masks the threat beneat. "But not all things thrive in toxic ground,`, `Some legacies end up buried.`],
                [`Turning against your own kind, Leeta?" <%=enemy.boss%> taunts, the contempt in the voice mirroring the decay surrounding them. "Kind?" you scoff, your stance firm and your spirit unyielding. "My kind are those who stand for justice, not those who hide behind it." A laugh devoid of true amusement accompanies the answer. "Justice? In this city, justice is just another word for revenge,`, `Seeking revenge, you might just find your own end.`]
            ]
        },
        { name: "Mack", expansion: "redemption2", enemy: filterArray(enemies, "boss", "Juan")[0], ally: ["Leeta"], rival: ["Shadow"], stage: "Sudden Death" },
        { name: "Mary Ann", expansion: "newchallengers", enemy: filterArray(enemies, "boss", "Dmitri")[0], ally: ["random","random"], rival: ["random"], stage: "Sudden Death" },
        {
            name: "Max", expansion: "stretchgoals17", enemy: randFrom(enemies), ally: ["random"]/*random ally*/, rival: ["random"]/*random rival*/, stage: "Compromised",
            dialogue: [
                [`You thought you could break me, but every attempt only forged me stronger. I stand here, not just for Ransom City, but for all who seek justice," you say, your voice carrying the weight of your convictions. "Strength? You're a man pieced back together, a project of science. What can you possibly hope to achieve?`, `We'll dismantle you again, Max. Piece by piece if we must.`],
                [`The Onyx League, The Kingdom... You all underestimate the power of unwavering resolve. My commitment to justice has only deepened," you declare, your determination undimmed by the scars of your past. "Commitment? Your idealism is outdated, Governor. The world has changed,`, `But sure, let's see how far your resolve takes you in our new world order.`],
                [`I've faced down your kind before, stood firm against your storms of terror. With the Global Gladiators, I bring not just my resolve but a united front against your tyranny," you say, igniting hope in those who stand with you. "A united front? You bring together a band of broken toys to face us? Amusing,`, `Your new limbs won't save you, Max. Nor will your little team. We'll see you broken again.`]
            ],
            get instructions() { return `If you choose to use <i>${this.name}</i>, select ${["Kingdom", "Empire"].includes(this.enemy.name) ? `${this.enemy.boss} from the ${this.enemy.name} as the boss` : `${this.enemy.name} as the enemy`} in part 2A of your personal story.` }
        },
        {
            name: "Megan", expansion: "riseofthekingdom", enemy: filterArray(enemies, "boss", "Dmitri")[0], ally: ["Sera O'Quinn"], rival: ["Sera O'Quinn"], stage: ["Gone Ballistic", "Compromised"],
            dialogue: [
                [`I once thought martial arts was about rhythm and show. That night I learned it's about survival," you say, eyes reflecting the resolve of a warrior shaped by betrayal. "Ah, the heiress turned fighter. Do you think you've found your rhythm now?`, `Let's see if you have learned enough to dance with death.`],
                [`You target the innocent, exploit the vulnerable. I've seen your kind before. I survived," you say with cold determination. "Survived? You were thrown away, forgotten. What makes you think you can stand against me?`, `This city will break you, just like it did your sensei.`],
                [`Every villain I face, every shadow I chase, brings me one step closer to the justice my family was denied," you say, resolve unwavering. "Justice? In Ransom City? You're chasing ghosts, girl,`, `Let's see if your ghosts can save you now.`]
            ]

        },
        {
            name: "Micky", expansion: "stretchgoals18", enemy: filterArray(enemies, "name", "Cybertooth Crew")[0], ally: ["Axel", "Rhys"], rival: ["Miss Matrix", "random"], stage: "Meltdown",
            dialogue: [
                [`Look at you, trying to script Ransom's downfall like it's some sorta sellout pop ballad. Me? I'm the punk rock chaos that rips up the setlist and spits on the rulebook. Your plan's just another track I'm gonna skip," you sneer. "Your so-called 'chaos' is nothing but a minor disturbance. Ransom will march to my rhythm, not your discordant noise,`, `We'll snuff out your rebellion, Scott. Your final encore is at hand.`],
                [`You're just another mindless drone masquerading as a big bad. I've brought down bigger with nothing but a guitar and a sneer. You? You're just roadkill on my highway to infamy," you taunt. "Infamy? You're a footnote in my grand design. Prepare to be erased,`, `This city will forget you, Scott. Your rebellion dies here.`],
                [`You think you've got the city in your grip, but all you've got is a ticket to the mosh pit where I'm king. My rebellion isn't just noise; it's the anthem for every soul you tried to silence," you say with a raw edge in your voice. "An anthem? I'll turn your so-called rebellion into a silent disco no one attends. You're outmatched, Scott,`, `I'll have you singing a swan song before this night is over,`]
            ]
        },
        { name: "Miss Matrix", expansion: "redemption2", enemy: filterArray(enemies, "boss", "Ah Long")[0], ally: ["Ying Hua"], rival: ["Ah Long", "Kemono"], stage: "Cashed Out" },
        { name: "Mr. Apple", expansion: "newchallengers", enemy: randFrom(filterArray(enemies, "name", "Kingdom")), ally: ["random"], rival: ["Isabella"], stage: "Cashed Out",  get instructions() { return `If you choose to use <i>${this.name}</i>, select ${this.enemy.boss} as the boss in part 2B of your personal story.`} },
        {
            name: "Murphy", expansion: "aftershock", enemy: filterArray(enemies, "name", "Abandoned")[0], ally: [""], rival: [""], stage: "",
            dialogue: [
                [`Looks can be deceiving. Beneath this uniform, there's something you wouldn't want to face. Best keep it that way," you say, your tone even but your gaze steady. "Threats from a janitor? You're out of your depth. This city has no room for your kind of 'cleanup',`, `We'll see how tough you talk when you're scrubbing away your failure. This is where your story ends, Murphy.`],
                [`Every shadow hides potential, every silence a storm. I'm no exception. It's your choice whether to force my hand," you hint with a low rumble. "Dramatic, aren't we? Hide behind your metaphors, janitor. It won't save you from the reality we're shaping,`, `But indulge your fantasies if it amuses you. In the end, it's not your potential I fear, but your obsolescence!`],
                [`Don't underestimate the quiet ones," you advice in a steady tone. "A philosopher janitor? How quaint. Your sage advice falls on deaf ears here. We're beyond warnings and veiled threats,`, `Continue with your mopping, Murphy. It's the only storm you'll be brewing. As for quiet ones? Silence is easily broken.`]
            ],
            get instructions() {
                return `If you choose to use <i>${this.name}</i>, ${getRandomMinions(this.enemy, false, enemies = enemies)} in part 2 of your personal story.`
            }
        },
        {
            name: "Natalia", expansion: "riseofthekingdom", enemy: filterArray(enemies, "boss", "Dmitri")[0], ally: ["Zane"], rival: ["Zane"], stage: ["Gone Ballistic", "Original Copy"],
            get instructions() { return `If you choose to use <i>${this.name}</i>, ${getRandomMinions(this.enemy, false, enemies = enemies)} in part 2B of your personal story.` }
        },
        { name: "Phoenix", expansion: "tideofthedragon", enemy: filterArray(enemies, "name", "All-Heaven Gang")[0], ally: [""], rival: ["random", "random", "random"], stage: "Market Crash" },
        {
            name: "Project X", expansion: "redemption2", enemy: randFrom(filterArray(enemies, "name", "Kingdom")), ally: ["Natalia"], rival: ["Natalia", "Jackal"], stage: "Original Copy",
            get instructions() { return `If you choose to use <i>${this.name}</i>, select ${this.enemy.boss} as the boss and ${getRandomMinions(this.enemy, false, enemies = enemies)} in part 3 of your personal story.` }
        },
        {
            name: "Raven", expansion: "stretchgoals18", enemy: filterArray(enemies, "name", "Davenport Manor")[0], ally: ["random"], rival: ["Selene"], stage: "Reel Terror",
            dialogue: [
                [`You dare tread where shadows reign supreme?" <%=enemy.boss%> hisses. "I dare more than tread," you respond, your voice steady, infused with the power of your lineage and destiny. "I come to banish the darkness you spread." "Foolish Hallower, do you not realize? Each victory you claim only draws more attention, more enemies,`, `Your path is one of endless night!`],
                [`You think you can stop what's already in motion?" <%=enemy.boss%> taunts. "My fight is against all who ally with darkness," you reply, resolve in your voice. "Then prepare yourself, Hallower. For every shadow you dispel, a dozen more will rise,`, `You're fighting a losing battle.`],
                [`Another challenger," <%=enemy.boss%> growls. "I'm no mere challenger," you state, your presence a beacon of light in the enveloping darkness. "I am the Hallower, and I will not be deterred." "Then you will fall like all before you,`, `The darkness is endless, and your light will eventually flicker and die.`]
            ]
        },
        {
            name: "Renae", expansion: "stretchgoals18", enemy: filterArray(enemies, "name", "Cybertooth Crew")[0], ally: ["Miss Matrix"], rival: ["Miss Matrix"], stage: "Pounding Pavement",
            dialogue: [
                ["Well, well... if it isn’t Brook City’s bionic badge. I was wondering how long it would take you to find me. Still limping along on government-grade firmware? I expected better from the so-called tech genius,", "Let’s see how your fancy arm handles a full system crash."],
                ["You should’ve stayed behind your desk, Renae. This isn’t some training sim. Out here? You lose one misstep at a time — until something important blows up again,", "Try not to explode this time."],
                ["Funny thing about revenge — when you live and breathe it, you stop fixing anything that’s still worth saving. You didn’t come all the way here from Brook City for justice, you came to <span class = 'emphasis'>feel</span> something again,", "Let me help with that."],
                ["I traced the signal, triangulated the source, and watched you walk right into your own net,\" you say with steely resolve. \"You tracked a ghost, detective,", "And now you’re standing in its haunt."],
                ["I don’t need backup. I don’t need permission. All I need is you in cuffs,\" you state flatly. \"You crossed the wrong city — and the wrong cop.\" \"Please, Renae. You’re not a cop anymore,", "You’re a lab experiment with a badge."],
                ["Every trap you left, I dismantled,” you declare. \"You’re not some criminal mastermind. You’re predictable. \"Then predict this: I'm not going down without taking you apart, piece by piece,", "Starting with that ridiculous arm."],
                ["You don’t scare me,\" you say with determination in your eyes. \"I’ve already walked through fire to get here — and I came out forged.\" \"Forged? You were <span class = 'emphasis'>replaced</span>, Renae, and replacements tend to break under pressure", "Time to test the welds!"]
            ]
        },

        {
            name: "Rhys", expansion: "twintiger", enemy: filterArray(enemies, "boss", "Mack")[0], ally: ["Leeta"], rival: ["Leeta"], stage: "Poison the Well",
            dialogue: [
                [`Life threw its worst at me, thought it could break me. Here I stand, forged from those fires," you smirk, and edge of defiance in your eyes. "Ah, the prodigal son turned hero. Think you're untouchable now?`, `I'll enjoy reminding you of your place, Murdock.`],
                [`I've danced with death more times than I can count. For family, I'll waltz into hell itself," you say, barely able to hold your rage. "Such melodrama. You think love makes you strong?`, `It makes you vulnerable, Rhys. And I'll exploit every weakness.`],
                [`This city, its shadows, I know them better than anyone. Used to be part of them. Now, I'm its guardian," you say, your resolve unshaken. "From shadow to guardian? You're playing a dangerous game, Rhys.`, `Let's see how long you can keep playing.`]
            ]

        },
        {
            name: "Ronny", expansion: "aftershock", enemy: randFrom(enemies.filter(e => e.name != "Abandoned")), ally: ["Stacey"], rival: ["Stacey"], stage: "Original Copy",
            dialogue: [
                [`What's your stake in this city's pain? In its fights?" you question. "The city's agony is my arena, and its despair, my prize. Fighters like you, like your father, are merely pawns in a larger game.`, `Challenge the order and you'll find yourself in a fight with no referee, no rules, and no mercy. Just like your father.`],
                [`You've built an empire on sorrow," the weight of your accusation heavy. "Sorrow? It's the foundation of strength. Your strength, Ronny, born of loss and honed in grief,`, `Pursue this path, and the sorrow that made you will also undo you. Like father, like daughter.`],
                [`Chasing ghosts, Ronny?" <%=enemy.boss%> taunts, <%=gPron(enemy,"possessive")%> voice a sinister whisper. "Chasing justice," you reply, unwavering. "Justice is a luxury in Ransom City,`, `Seek it at your peril, for many have fallen on less treacherous quests.`]
            ],
            get instructions() { return `If you choose to use <i>${this.name}</i>, select ${["Kingdom", "Empire"].includes(this.enemy.name) ? `${this.enemy.boss} from the ${this.enemy.name} as the boss` : `${this.enemy.name} as the enemy`} and ${getRandomMinions(this.enemy, false, enemies = enemies)} in part 2 of your personal story.` }

        },
        { // shadow needs the stage 2B enemy handling
            name: "Shadow", expansion: "redemption", enemy: filterArray(enemies, "boss", "Juan")[0], ally: ["Shin Yokai"], rival: ["Ah Long", "Dmitri", "Shin Yokai", "Kemono"], stage: [randFrom(stages).name],
            dialogue: [
                [`You stand before me, thinking you know power, thinking you understand control. You know nothing,\" you say, your voice an eye of a storm. \"Shadow, the myth, the legend. Do you think your ancient tricks scare us?`, `We'll see how your arrogance fares against real strength.`],
                [`Humility is not your strength, I see. Let me teach you its value — the hard way,\" you say with an aura of danger. \"Teach me? You're one man,`, `Your empire crumbles today, Shadow. We no longer bow to phantoms.`],
                [`The path I've walked is paved with the lessons of the ancients, the whispers of the wind, and the fury of the dragon. You, however, have strayed,\" you say, your gaze piercing through the soul of <%=enemy.boss%>.  \"Strayed? We've risen in the vacuum you left behind. Your time has passed, Shadow,`, `This world has no place for relics. Your teachings die with you.`]
            ],
            get instructions() { return `If you choose to use <i>${this.name}</i>, select ${this.stage} as the stage in part 2 of your personal story.` }
        },
        { name: "Selene", expansion: "redemption2", enemy: filterArray(enemies, "boss", "Dmitri")[0], ally: [""], rival: ["Genesis"], stage: "Estate of Decay" },
        { name: "Sera O'Quinn", expansion: "newchallengers", enemy: filterArray(enemies, "boss", "Dmitri")[0], ally: [""], rival: [""], stage: "Supply and Demand" },
        { name: "Swiftclaw", expansion: "redemption3", enemy: "", ally: [""], rival: [""], stage: "" },
        { name: "The Don", expansion: "redemption2", enemy: filterArray(enemies, "boss", "Juan")[0], ally: ["Gabriel"], rival: ["Juan", "Gabriel"], stage: "Gone Ballistic" },
        { name: "The Proxy", expansion: "redemption2", enemy: filterArray(enemies, "boss", "Juan")[0], ally: ["Power Soldier"], rival: ["Power Soldier"], stage: "Compromised" },
        {
            name: "Tiger Azules", expansion: "stretchgoals17", enemy: randFrom(enemies), ally: ["random"], rival: [""], stage: "Supply and Demand",
            dialogue: [
                [`In the ring of this city, I am the champion who fights for the forgotten and the fallen. You face Tiger Azules, a spirit reborn to cleanse these streets," you bellow, bold and defiant. "Ah, the famed Tiger Azules. Your theatrics amuse me. Let's see if your moves are as sharp as your words,`, `Dance, luchador, but know this: I will unmask you and reveal the mortality beneath your legend.`],
                [`You dare defile the honor of these streets with your vile deeds? As the mask I wear channels the ancient powers, I vow to restore peace. Beware, for Tiger Azules stands ready to strike," you growl with intensity in your eyes. "Tiger Azules, the masked avenger. Your 'ancient powers' are no match for the new world order we bring,`, `We'll strip away your power, piece by piece, starting with that mask you hide behind.`],
                [`This mask is not just a mask; it's a symbol — a symbol of justice, strength, and the indomitable will of the people. You face not just a man, but an idea. And ideas, señor, are bulletproof," you declare. "An idea? How quaint. But even ideas can be corrupted, destroyed. You will learn that the hard way,`, `Your idealism will be your downfall. We'll see how long you can keep up this charade, 'Tiger'.`]
            ],
            get instructions() { return `If you choose to use <i>${this.name}</i>, select ${["Kingdom", "Empire"].includes(this.enemy.name) ? `${this.enemy.boss} from the ${this.enemy.name} as the boss` : `${this.enemy.name} as the enemy`} in part 2 of your personal story.` }
        },
        { name: "Tiger Ip", expansion: "redemption3", enemy: "", ally: [""], rival: ["random","random"], stage: "" },
        { name: "Train", expansion: "redemption3", enemy: "", ally: [""], rival: [""], stage: "" },
        {
            name: "Tlazolteotl", expansion: "stretchgoals17", enemy: filterArray(enemies, "boss", "Jackal")[0], ally: ["Kemono"], rival: ["Kemono", "Tlazolteotl"], stage: "Original Copy",
            get instructions() { return `If you choose to use <i>${this.name}</i>, ${getRandomMinions(this.enemy, false, enemies = enemies)} in part 3 of your personal story.` }
        },
        {
            name: "Vada", expansion: "aftershock", enemy: randFrom(filterArray(enemies, "name", "Kingdom").filter(e => e.boss != "Jackal")), ally: ["Jackal"], rival: ["Jackal"], stage: ["Right to Remain Silent"],
            dialogue: [
                [`You're treading on dangerous ground," you say, your voice steady. <%=enemy.boss%> leans in slightly to reply. "And you, Vada, dance on the edge of a knife. Brave, or perhaps foolhardy." "I've danced with danger longer than you might think," you reply, your tone firm. "Then perhaps it's time you learned the steps can be fatal,`, `For in this dance, the music can stop at any moment, and not all dancers rise again.`],
                [`Seems we're at an impasse," <%=enemy.boss%> muses aloud, dripping threat. "An impasse suggests equality," you counter, words slicing through the air. "I'm not here to negotiate." "Bold girl. But boldness without caution is recklessness,`, `In Ransom City, recklessness is punished by more than just harsh words.`],
                [`You've caught my attention, which is no small feat," <%=enemy.boss%> acknowledges, tone laced with intrigue and danger. "And yet, attention was not what I sought," you reply. "Careful, Vada. Ambition drives us all,`, `But it can also drive one to ruin.`]
            ],
            get instructions() { return `If you choose to use <i>${this.name}</i>, select ${this.enemy.boss} from the ${this.enemy.name} as the boss in part 2 of your personal story.` }
        },
        { name: "Viktoria", expansion: "tideofthedragon", enemy: filterArray(enemies, "name", "Fire Cloud Gang")[0], ally: ["Bruce"], rival: ["random", "Reina", "random", "random"], stage: "Sky High" },
        {
            name: "Wicked", expansion: "stretchgoals18", enemy: "", ally: [""], rival: [""], stage: "",
            dialogue: [
                ["Nice knives, sweetheart. You bring those for decoration?\" <%=enemy.boss%> laughs. \"No, just for you,\" you grin.The laugh turns to a scowl. \"Then come carve your last mistake,", "I’ll bury those blades in your spine."],
                ["You got a mouth on you. What happens when I shut it?\" \"I growl louder,\" you smirk. \"Then let’s hear you scream,", "I like my goths quiet and broken."],
                ["They say you’re fast. I say you’re overrated,\" <%=gPron(enemy, 'subject')%> says. \"And I say you’re leaking soon,\" you snap back. <%=enemy.boss%> laughs. \"Talk is cheap — your blood’s not,", "Let’s see if lizards scream like humans."],
                ["All that attitude. All that eyeliner. None of it scares me.\"  <%=enemy.boss%> eyes you.. cautiously. \"I’m not here to scare you,\" you roll your eyes. \"I’m here to cut you. \"Then make it quick — I hate waiting,", "Pretty sure you’ll look better in red."],
                ["You're just a meatbag about to get ventilated,\" you chuckle. \"You're just a hissy little mutant with sharp toys- Let’s see who pops first,", "Hope your skin’s tougher than your ego."],
                ["I know your type. Loud. Mad. Broken,\" <%=gPron(enemy, 'subject')%> says. \"And still sharper than you,\" you retort and sharpen your eyes. \"Not for long,", "I break blades and brats alike."],
                ["You come out the sewer like you’re royalty,", "Back into the gutter with you."],
                ["You ain't scary. Just weird,\" you smirk. \"Weird enough to ruin your day. Let’s end it on something memorable,", "I’ll carve ‘FAILURE’ into your cold-blooded chest."
                ]
            ]
        },
        {
            name: "Wildfire", expansion: "stretchgoals18", enemy: "", ally: [""], rival: [""], stage: "",
            dialogue: [
                ["You never finished what they trained you for, spirit girl. You're not a leader, Wildfire. You're not even a real protector\". You fold your arms. \"I protect what matters\". <%=enemy.boss%> sneers, \"Then you'll die for nothing,", "Your spirit will break before your body does."],
                ["Still listening to invisible voices, Biskane? Some things never change. You feel the spirits stir in your pendant. \"Better voices than the monsters you serve,\" you retort. <%=enemy.boss%> laughs low. \"Spirits won’t save you from me,", "I’ll silence them for good."
                ],
                ["You think you're the first to underestimate me?\" you ask and smirk. \"No. But I'll be the last,", "Time to snuff out your wildfire."],
                ["Your ancestors weep for you, Wildfire. Not even their memories can carry your shame.\" You lift your gaze, steady. \"I don't carry their shame. I carry their strength.\" <%=enemy.boss%> growls. \"Strength crumbles under fire,", "And you’re about to burn out."
                ],
                ["You were meant to guide your people, and here you are — alone, abandoned.\" \"I'm exactly where I'm needed,\" your voice cuts like a blade. \"Then you're right where you'll fall,", "No one’s coming to save you, 'Wildfire'."
                ],
                ["Belief doesn’t stop <%=enemy.gun ? `bullets` : (enemy.blade ? `a blade` : `my power`)%>, little spirit,", "But fear will make you kneel."],
                ["They kicked you off the force, 'Wildfire', didn’t they? Or did you run before they could?\" \"I chose a path that matters,\" you answer, unflinching. \"And it led you right to me,", "That badge was the only thing keeping you relevant."],
                ["Nowhere to go, no one to call. Just dust, spirits, and bad choices. \"I go where I’m needed,\" you answer, squaring your shoulders. <%=enemy.boss%> scoffs. \"Keep telling yourself that.", "The world forgot you long ago, officer Biskane."],
                ["I’ve seen what you’ve done to this place — it ends now,\" you say with fire in your eyes. \"Then come try, Wildfire. Let’s see what the spirits taught you,", "You’ll leave this place in ashes either way."],
                ["You think this is power?\" your voice rings clear. \"All you’ve built is fear and rot.\" <%=enemy.boss%> tilts <%=gPron(enemy, 'possessive')%> head. \"And you think fire and feathers will tear it down?", "Belief burns faster than buildings."],
                ["You’ve had your moment. Now face someone who fights for more than ego,\" you say with a steady voice. \"Then let’s see how far faith gets you against me,", "Your spirits won’t hold the line."]
            ]


        },
        {
            name: "Ying Hua", expansion: "riseofthekingdom", enemy: filterArray(enemies, "boss", "Ah Long")[0], ally: ["Jin"], rival: ["Jin"], stage: ["Cashed Out"],
            dialogue: [
                [`You underestimate the light I carry within me. My fight is for those silenced by fear, not for the glory of victors in hidden arenas," you state.  "Light? Noble, but naive. We seek to test your limits, Ying Hua,`, `See this as an opportunity. An opportunity to truly understand the depth of your convictions.`],
                [`You lure me with challenges, thinking it will sway my path. Know this — I walk the path of righteousness, and no invitation, no challenge, can deter me," you stand for your principles.  "Righteousness? A flimsy shield against the storm we bring,`, `We'll see how long your shield holds, Ying Hua. The storm approaches.`],
                [`The invitation through the gateway to the world of shadows and deceit I accept as a herald of justice. Your games end with me," you say, spirit unbroken. "Justice? A quaint concept in our world. But entertain us, Ying Hua. Entertain us with your futile attempts at heroism,`, `Perhaps you'll provide a lesson in futility, or maybe, just maybe, you'll surprise us.`]
            ]
        },
        {
            name: "Yokai", expansion: "redemption2", enemy: filterArray(enemies, "boss", "Shadow")[0], ally: ["Marionette Doll"], rival: ["Marionette Doll"], stage: "Steel Memories",
            dialogue: [
                [`This curse, this power, it was awoken by the same cruelty that now festers in the hearts of those like you," you say with a low rumble. "A curse? To us, it's just another tool for chaos. Your vengeance, Yokai, is just a game to keep us entertained,`, `And we'll watch with delight as you burn out, consumed by your own fire.`],
                [`I've seen the world through the eyes of a monster, and it's the likes of you who have made me this way," you say with a somber force. "Made you this way? Oh, you were merely provided a spark. It's you who've relished the flames, Shin Yokai. Embraced the destruction,`, `Keep blazing your trail of vengeance. It only makes our work easier, as you leave nothing but despair in your wake.`],
                [`They once called me Yuuto, a name meant for a life of peace. Now, Yokai is all that remains — an echo of vengeance in a world that turned its back on me," your voice a mixture of sorrow and resolve. "Yuuto, Yokai — it matters not. You're a puppet in a grand design. Your 'vengeance' is just another scene in a grander play,`, `Dance, puppet, dance! Your fury serves us well, fueling the chaos that is our lifeblood.`]
            ]
        },
        { name: "Zane", expansion: "newchallengers", enemy: filterArray(enemies, "boss", "Juan")[0], ally: [""], rival: ["random","random"], stage: "Original Copy",
        get instructions() {
            return `If you choose to use <i>${this.name}</i>, ${getRandomMinions(this.enemy, false, enemies = enemies)} in part 2 of your personal story.`
        } },
    ]

    gladiators = expansionfilter === undefined ? gladiators : gladiators.filter(gladiator => expansionfilter.includes(gladiator.expansion))
    return gladiators

}
