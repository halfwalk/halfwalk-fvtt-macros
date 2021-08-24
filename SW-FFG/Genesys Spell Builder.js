// args[0] = 'name'
// args[1] = 'description'
// args[2] = difficulty

let areaMods = [['Reverse',`Instead of creating difficult terrain, this spell makes difficult terrain into normal terrain. If the terrain is impassible it becomes difficult instead. This effect may be applied twice to turn impassible into normal terrain.`,1],['Concealment',`Creates concealment that adds a number of [se] or [bo] (depending on the skill check) up to the caster's ranks in Knowledge(Lore).`,1],['Entangle',`Any character must use their action to make an Average([di][di]) Athletics or Coordination check (GM choice based on the PC's style of magic) in order to perform the move maneuver int he affected area of the spell. The caster may spend [ad] to add [se] to that check.`,1],['Range',`Increase or reduce the distance in which the spell is targeted by one range band. This may be added multiple times.`,1],['Size',`Increase the range band the area covers by 1. This may be added multiple times, increasing the range band by one each time.`,1],['Wall',`Instead of difficult terrain, the area affected by this spell is considered impassible terrain.`,2],['Dangerous Atmosphere',`When choosing this effect also choose fire, acid, or corrosive. The affected area is considered an atmosphere of that type as per page 111 of the Genesys Core Rulebook, with a rating equal to the number of uncancelled [su].`,2]];

let attackMods = [];
let augmentMods = [];
let barrierMods = [];
let conjureMods = [];
let curseMods = [];
let dispelMods = [];
let healMods = [];
let maskMods = [];
let mindMods = [];
let moveMods = [];
let predictMods = [];
let transformMods = [];

let magicType;
let spells=[];

await new Promise(resolve => {
    new Dialog({
        title: "What type of spell are you casting?",
		content: "[bo] test",
        buttons: {
            arcane: {
                label: "Arcane",
                callback: () => {
					magicType = "arcane";
					spells = ['area','attack','barrier','conjure','curse','dispel','mask','move'];
				}
            },
            divine: {
                label: "Divine",
                callback: () => {
					magicType = "divine";
					spells = ['area','attack','augment','barrier','curse','heal','predict'];
				}
            },
            primal: {
                label: "Primal",
                callback: () => {
					magicType = "primal";
					spells = ['area','attack','augment','conjure','heal','transform'];
				}
            },
			verse: {
				label: "Verse",
				callback: () => {
					magicType = "verse";
					spells = ['augment','curse','dispel','heal','mask','mind','predict'];
				}
			}
        },
        close: () => resolve()
    }).render(true);
});




if (magicType) {
			
	await new Promise(resolve => {
		new Dialog({
			title: "Which action?",
			buttons: {
				arcane: {
					label: "Arcane",
					callback: () => {
					}
				},
				divine: {
					label: "Divine",
					callback: () => {
					}
				},
				primal: {
					label: "Primal",
					}
				},
				verse: {
					label: "Verse",
					callback: () => {
					}
				}
			},
			close: () => resolve()
		}).render(true);
	});

}

