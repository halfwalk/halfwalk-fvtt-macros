var chars;
var challenge = [0,0,0];
var makeAdv;
var WT=0, ST=0, soak=0, mDef=0, rDef=0;
var armorName = "Defense";
var weaponName = "weapon", weaponName2 = "weapon 2";
var weaponDamage = 0;
var weaponCrit = 0;
var weaponChar = "";
var weaponRange = "Short";
var isMinion, isRival, isNemesis;
var advType, advName;
let weapons = [];
let talents = [];
let skillsArr = [];
let skillsToMake = [];
var skillsCS = [];
const alch=0,astr=1,athl=2,comp=3,cool=4,coor=5,disc=6,driv=7,mech=8,medi=9,oper=10,perc=11,pilo=12,resi=13,ridi=14,skul=15,stea=16,stre=17,surv=18,vigi=19,arca=20,divi=21,prim=22,braw=23,gunn=24,mell=25,melh=26,mele=27,rang=28,ranl=29,ranh=30,charm=31,coer=32,dece=33,lead=34,nego=35,know=36;
const skillsList = ["Alchemy","Astrocartography","Athletics","Computers","Cool","Coordination","Discipline","Driving","Mechanics","Medicine","Operating","Perception","Piloting","Resilience","Riding","Skulduggery","Stealth","Streetwise","Survival","Vigilance","Arcana","Divine","Primal","Brawl","Gunnery","Melee-Light","Melee-Heavy","Melee","Ranged","Ranged-Light","Ranged-Heavy","Charm","Coercion","Deception","Leadership","Negotiation","Knowledge"];
let skillScores = [];
let meleeHeavy,meleeLight,rangedHeavy,rangedLight;

let knockdown={
	name: "Knockdown",
	type: "itemmodifier",
	data: {
		description: `Spend [ad][ad] to knock the target prone.`,
		attributes: {},
		itemmodifier: [],
		type: "all"
	}
};
let stun2={
	name: "Stun 2",
	type: "itemmodifier",
	data: {
		description: `Can spend [ad][ad] to deal 2 strain to the target, which bypasses soak.`,
		attributes: {},
		itemmodifier: [],
		type: "all",
		rank: 2
	}
};
let concussive1={
	name: "Concussive",
	type: "itemmodifier",
	data: {
		description: `Spend [ad][ad] on hit to stagger target for 1 round.`,
		attributes: {},
		itemmodifier: [],
		type: "all"
	}
};
let cumbersome3={
	name: "Cumbersome 3",
	type: "itemmodifier",
	data: {
		description: `Requires Brawn 3. Add [di] for each point below 3.`,
		attributes: {},
		itemmodifier: [],
		type: "all",
		rank: 3
	}
};
let inferior={
	name: "Inferior 1",
	type: "itemmodifier",
	data: {
		description: `Add [th] to all attack checks.`,
		attributes: {
			attr1626316553135: {
				modtype: "Result Modifiers",
				value: 1,
				mod: "Add Threat"
			}
		},
		itemmodifier: [],
		type: "all"
	}
};
let disorient1={
	name: "Disorient 1",
	type: "itemmodifier",
	data: {
		description: `Spend [ad][ad] on hit to disorient target for 1 round.`,
		attributes: {},
		itemmodifier: [],
		type: "all"
	}
};
let disorient2={
	name: "Disorient 2",
	type: "itemmodifier",
	data: {
		description: `Spend [ad][ad] on hit to disorient target for 2 rounds.`,
		attributes: {},
		itemmodifier: [],
		type: "all",
		rank: 2
	}
};
let disorient3={
	name: "Disorient 3",
	type: "itemmodifier",
	data: {
		description: `Spend [ad][ad] on hit to disorient target for 3 rounds.`,
		attributes: {},
		itemmodifier: [],
		type: "all",
		rank: 3
	}
};
let defensive1={
	name: "Defensive 1",
	type: "itemmodifier",
	data: {
		description: `Increase melee defense by 1 (must add manually)`,
		attributes: {},
		itemmodifier: [],
		type: "all"
	}
};
let pierce2={
	name: "Pierce 2",
	type: "itemmodifier",
	data: {
		description: `Ignore up to 2 points of soak`,
		attributes: {},
		itemmodifier: [],
		type: "all",
		rank: 2
	}
};
let vicious1={
	name: "Vicious 1",
	type: "itemmodifier",
	data: {
		description: `+10 to critical injury rolls`,
		attributes: {},
		itemmodifier: [],
		type: "all"
	}
};
let vicious3={
	name: "Vicious 3",
	type: "itemmodifier",
	data: {
		description: `+30 to critical injury rolls`,
		attributes: {},
		itemmodifier: [],
		type: "all",
		rank: 3
	}
};
let deflection1={
	name: "Deflection 1",
	type: "itemmodifier",
	data: {
		description: `+1 to ranged defense (must be manually applied)`,
		attributes: {},
		itemmodifier: [],
		type: "all",
	}
};
let inaccurate1={
	name: "Inaccurate 1",
	type: "itemmodifier",
	data: {
		description: `Add [se] to all attack checks.`,
		attributes: {
			attr1626416553135: {
				modtype: "Roll Modifiers",
				value: 1,
				mod: "Add Setback"
			}
		},
		itemmodifier: [],
		type: "all"
	}
};
let stun4={
	name: "Stun 4",
	type: "itemmodifier",
	data: {
		description: `Can spend [ad][ad] to deal 4 strain to the target, which bypasses soak.`,
		attributes: {},
		itemmodifier: [],
		type: "all",
		rank: 4
	}
};
let stunDamage={
	name: "Stun Damage",
	type: "itemmodifier",
	data: {
		description: `This weapon can only deal strain damage (still reduced by soak)`,
		attributes: {},
		itemmodifier: [],
		type: "all",
	}
};
let accurate1={
	name: "Accurate 1",
	type: "itemmodifier",
	data: {
		description: `Add [bo] to all attack checks.`,
		attributes: {
			attr1626216553135: {
				modtype: "Roll Modifiers",
				value: 1,
				mod: "Add Boost"
			}
		},
		itemmodifier: [],
		type: "all"
	}
};
let ensnare3={
	name: "Ensnare 3",
	type: "itemmodifier",
	data: {
		description: `Spend [ad][ad] on hit to immobiliz target for 3 rounds. (escape [di][di][di] athletics)`,
		attributes: {},
		itemmodifier: [],
		type: "all",
		rank: 3
	}
};
let limitedAmmo1={
	name: "Limited Ammo 1",
	type: "itemmodifier",
	data: {
		description: `Weapon must be reloaded with a maneuver after 1 use (or is a single use item).`,
		attributes: {},
		itemmodifier: [],
		type: "all"
	}
};
let limitedAmmo2={
	name: "Limited Ammo 2",
	type: "itemmodifier",
	data: {
		description: `Weapon must be reloaded with a maneuver after 2 uses`,
		attributes: {},
		itemmodifier: [],
		type: "all",
		rank: 2
	}
};

skillsList.forEach(()=> {
	skillScores.push(0);
//	skillsCS.push(false);
});


async function makeSkill (skill, sRank) {
	let sName = skillsList[skill];
	let newSkill = {
		
		
				
				[sName]: {
					rank: sRank,
					groupskill: true,
					careerskill: true
				}
			
		
	};
		
		
	
	
	skillsToMake.push(newSkill);
}

let done;

async function fillChars(bra,agi,intel,cun,wil,pre) {
	chars = [bra,agi,intel,cun,wil,pre];
	return true;
}

function updateChallenge(com,soc,gen) {
	challenge[0] += com;
	challenge[1] += soc;
	challenge[2] += gen;
}

/*async function parseCS() {
	skillsList.forEach((element) => {
		if (minionCS.includes(element)) skillsCS.push(true);
		else skillsCS.push(false);
	});
}*/

function makeWeapon (wName,wDam,wCrit,wRange,wSkill,isBrawn,qualsList) {
	
	let newWeapon = {};
	let wChar = "";
	console.log(qualsList);
	let qualsText = "";
	if (qualsList.length > 0) {
		qualsList.forEach((i)=> {
			qualsText += " " + i.name;
		});
	}
			
	newWeapon = {
		name: wName,
		type: "weapon",
		data: {
			damage: {
				value: wDam,
				adjusted: wDam
			},
			crit: {
				value: wCrit,
				adjusted: wCrit
			},
			range: {
				value: wRange
			},
			special: {
				value: qualsText,
				type: "String",
				label: "Special"
			},
			skill: {
				value: wSkill
			},
			characteristic: {
				value: wChar
			},
			equippable: {
				equipped: true
			},
			itemmodifier: [
				...qualsList
			]
		}
	}
	weapons.push(newWeapon);
}

function updateSkill(skill,rank) {
	skillScores[skill] = Math.max(skillScores[skill],rank);
}

async function makeActor() {
	let STadj = 0;
	if (isMinion) advType = "minion";
	else advType = "character";
	
	if (isNemesis) STadj = ST;
	let tokenName = advName;
	advName = advName + " (" + challenge[0] + "/" + challenge[1] + "/" + challenge[2] + ")";
	
	skillScores.forEach((i)=> {
		if (i > 0) 
			//	makeSkill(j,i);
			skillsCS.push(true);
		else skillsCS.push(false);
		});

console.log(skillsToMake);
	let advData = {
		name: advName,
		type: advType,
		data: {
			stats: {
				wounds: {
					max: WT
				},
				strain: {
					max: ST,
					adjusted: STadj
				},
				defence: {
					ranged: rDef,
					melee: mDef
				}
			},
			characteristics: {
				Brawn: {
					value: chars[0]
				},
				Agility: {
					value: chars[1]
				},
				Intellect: {
					value: chars[2]
				},
				Cunning: {
					value: chars[3]
				},
				Willpower: {
					value: chars[4]
				},
				Presence: {
					value: chars[5]
				}
			},
			attributes: {
				"Defence-Melee": {
					value: mDef
				},
				"Defence-Ranged": {
					value: rDef
				}
			},
			unit_wounds: {
				value: WT
			},
			skills: {
				Brawl: {
					rank: skillScores[braw],
					careerskill: skillsCS[23],
					groupskill: skillsCS[23]
				},
				Gunnery: {
					rank: skillScores[gunn],
					careerskill: skillsCS[24],
					groupskill: skillsCS[24]
				},
				Melee: {
					rank: skillScores[mele],
					careerskill: skillsCS[27],
					groupskill: skillsCS[27]
				},
				"Melee-Heavy": {
					rank: skillScores[melh],
					careerskill: skillsCS[26],
					groupskill: skillsCS[26]
				},
				"Melee-Light": {
					rank: skillScores[mell],
					careerskill: skillsCS[25],
					groupskill: skillsCS[25]
				},
				Ranged: {
					rank: skillScores[rang],
					careerskill: skillsCS[28],
					groupskill: skillsCS[28]
				},
				"Ranged-Light": {
					rank: skillScores[ranl],
					careerskill: skillsCS[29],
					groupskill: skillsCS[29]
				},
				"Ranged-Heavy": {
					rank: skillScores[ranh],
					careerskill: skillsCS[30],
					groupskill: skillsCS[30]
				},
				Athletics: {
					rank: skillScores[athl],
					careerskill: skillsCS[2],
					groupskill: skillsCS[2]
				},
				Alchemy: {
					rank: skillScores[alch],
					careerskill: skillsCS[0],
					groupskill: skillsCS[0]
				},
				Astrocartography: {
					rank: skillScores[astr],
					careerskill: skillsCS[1],
					groupskill: skillsCS[1]
				},
				Computers: {
					rank: skillScores[comp],
					careerskill: skillsCS[3],
					groupskill: skillsCS[3]
				},
				Cool: {
					rank: skillScores[cool],
					careerskill: skillsCS[4],
					groupskill: skillsCS[4]
				},
				Coordination: {
					rank: skillScores[coor],
					careerskill: skillsCS[5],
					groupskill: skillsCS[5]
				},
				Discipline: {
					rank: skillScores[disc],
					careerskill: skillsCS[6],
					groupskill: skillsCS[6]
				},
				Driving: {
					rank: skillScores[driv],
					careerskill: skillsCS[7],
					groupskill: skillsCS[7]
				},
				Mechanics: {
					rank: skillScores[mech],
					careerskill: skillsCS[8],
					groupskill: skillsCS[8]
				},
				Medicine: {
					rank: skillScores[medi],
					careerskill: skillsCS[9],
					groupskill: skillsCS[9]
				},
				Operating: {
					rank: skillScores[oper],
					careerskill: skillsCS[10],
					groupskill: skillsCS[10]
				},
				Perception: {
					rank: skillScores[perc],
					careerskill: skillsCS[11],
					groupskill: skillsCS[11]
				},
				Piloting: {
					rank: skillScores[pilo],
					careerskill: skillsCS[12],
					groupskill: skillsCS[12]
				},
				Resilience: {
					rank: skillScores[resi],
					careerskill: skillsCS[13],
					groupskill: skillsCS[13]
				},
				Riding: {
					rank: skillScores[ridi],
					careerskill: skillsCS[14],
					groupskill: skillsCS[14]
				},
				Skulduggery: {
					rank: skillScores[skul],
					careerskill: skillsCS[15],
					groupskill: skillsCS[15]
				},
				Stealth: {
					rank: skillScores[stea],
					careerskill: skillsCS[16],
					groupskill: skillsCS[16]
				},
				Streetwise: {
					rank: skillScores[stre],
					careerskill: skillsCS[17],
					groupskill: skillsCS[17]
				},
				Survival: {
					rank: skillScores[surv],
					careerskill: skillsCS[18],
					groupskill: skillsCS[18]
				},
				Vigilance: {
					rank: skillScores[vigi],
					careerskill: skillsCS[19],
					groupskill: skillsCS[19]
				},
				Arcana: {
					rank: skillScores[arca],
					careerskill: skillsCS[20],
					groupskill: skillsCS[20]
				},
				Divine: {
					rank: skillScores[divi],
					careerskill: skillsCS[21],
					groupskill: skillsCS[21]
				},
				Primal: {
					rank: skillScores[prim],
					careerskill: skillsCS[22],
					groupskill: skillsCS[22]
				},
				Charm: {
					rank: skillScores[charm],
					careerskill: skillsCS[31],
					groupskill: skillsCS[31]
				},
				Coercion: {
					rank: skillScores[coer],
					careerskill: skillsCS[32],
					groupskill: skillsCS[32]
				},
				Deception: {
					rank: skillScores[dece],
					careerskill: skillsCS[33],
					groupskill: skillsCS[33]
				},
				Leadership: {
					rank: skillScores[lead],
					careerskill: skillsCS[34],
					groupskill: skillsCS[34]
				},
				Negotiation: {
					rank: skillScores[nego],
					careerskill: skillsCS[35],
					groupskill: skillsCS[35]
				},
				Knowledge: {
					rank: skillScores[know],
					careerskill: skillsCS[36],
					groupskill: skillsCS[36]
				},
				"Knowledge(Lore)": {
					rank: skillScores[know],
					careerskill: skillsCS[36],
					groupskill: skillsCS[36]
				}
			},
		},
		token: {
			name: tokenName
		},
		items: [
			...weapons,
			{
				name: armorName,
				type: "armour",
				data: {
					soak: {
						value: soak
					},
					equippable: {
						equipped: true
					}
				}
			},
		
		]
		
	};
	let actor = await Actor.create(advData);
		
} 

let dialogEditor = new Dialog({
    title: `Adversary Generator`,
    content: `
        <form>
			<div class="form-group">
				<label>Name</label>
				<input type="text" id="name" name="name">
			</div>
			<div class = "form-group">
				<label>Type</label>
				<input type="radio" id="minion" name="minion" value="minion">
				<label for "minion">Minion</label>
				<input type="radio" id="rival" name="minion" value="rival">
				<label for "rival">Rival</label>
				<input type="radio" id="nemesis" name="minion" value="nemesis">
				<label for "rival">Nemesis</label>
			</div>
            <div class = "form-group">
                <label>Characteristic Array</label>
                <select id = "charArray" name="charArray">
                    <option value="smallCreature">Small Creature (1,2,3,1,1,1)</option>
                    <option value="largeCreature">Large Creature (4,2,2,1,1,1)</option>
                    <option value="stealthyCreature">Stealthy Creature (2,3,3,1,1,1)</option>
                    <option value="hugeCreature">Huge Creature (5,1,1,1,1,1)</option>
                    <option value="averagePerson">Average Person (2,2,2,2,2,2)</option>
                    <option value="toughPerson">Tough Person (3,2,2,2,2,1)</option>
                    <option value="smartPerson">Smart Person (1,2,2,3,2,2)</option>
                    <option value="sociablePerson">Sociable Person (2,2,2,2,1,3)</option>
                    <option value="jack">Jack of All Trades (3,3,3,3,3,3)</option>
                    <option value="skilledWarrior">Skilled Warrior (4,3,2,2,3,1)</option>
                    <option value="savant">Savant (2,1,2,5,2,1)</option>
                    <option value="bornLeader">Born Leader (2,2,3,2,3,5)</option>
                    <option value="cunningFoe">Cunning Foe (2,4,4,2,2,2)</option>
                    <option value="mastermind">Mastermind (3,3,4,4,5,3)</option>
                </select>
            </div>
			<p>Note: Minions should choose a maximum of 1 defense type, which should only be "Tough Skin" or "Dodgy"</p>
			<div class="form-group">
				<label>Defense Type</label>
				<select id = "defType" name="defType">
					<option value="none">None</option>
					<option value="toughSkin">Tough Skin (+1 soak, +2 WT)</option>
					<option value="armoredHide">Armored Hide (+2 soak, +5 WT)</option>
					<option value="dodgy">Dodgy (+1 MDef, +1 RDef)</option>
					<option value="closeCombatant">Close Combatant (+2 MDef)</option>
					<option value="camouflaged">Camouflaged (+1 MDef, +2 Rdef)</option>
					<option value="hardy">Hardy (+5 WT)</option>
					<option value="veryTough">Very Tough (+10 WT)</option>
					<option value="giantBody">Giant Body (+25 WT)</option>
					<option value="savvy">Savvy (+5 ST)</option>
					<option value="mentalGiant">Mental Giant (+10 ST)</option>
				</select>
			</div>
			<div class="form-group">
				<label>Second Defense (optional)</label>
				<select id = "defType2" name="defType2">
					<option value="none">None</option>
					<option value="toughSkin">Tough Skin (+1 soak, +2 WT)</option>
					<option value="armoredHide">Armored Hide (+2 soak, +5 WT)</option>
					<option value="dodgy">Dodgy (+1 MDef, +1 RDef)</option>
					<option value="closeCombatant">Close Combatant (+2 MDef)</option>
					<option value="camouflaged">Camouflaged (+1 MDef, +2 Rdef)</option>
					<option value="hardy">Hardy (+5 WT)</option>
					<option value="veryTough">Very Tough (+10 WT)</option>
					<option value="giantBody">Giant Body (+25 WT)</option>
					<option value="savvy">Savvy (+5 ST)</option>
					<option value="mentalGiant">Mental Giant (+10 ST)</option>
				</select>
			</div>
			<p>Minions should have 1 skill package. Rivals should have up to 2. Major Nemeses can have up to 3.</p><br>
			<div class="form-group">
				<label>Skill Package (Primary)</label>
				<select id = "skillPack" name="skillPack">
					<option value="basicCreature">Basic Creature</option>
					<option value="ferociousCreature">Ferocious Creature</option>
					<option value="predatoryCreature">Predatory Creature</option>
					<option value="territorialCreature">Territorial Creature</option>
					<option value="soldier">Soldier</option>
					<option value="duelist">Duelist</option>
					<option value="scout">Scout/Sniper</option>
					<option value="brawler">Brawler/Laborer</option>
					<option value="gunslinger">Gunslinger</option>
					<option value="sailor">Sailor</option>
					<option value="spy">Spy/Con Arist</option>
					<option value="thief">Thief/Assassin</option>
					<option value="researcher">Researcher</option>
					<option value="philosopher">Natural Philosopher</option>
					<option value="doctor">Doctor</option>
					<option value="knight">Knight/Warrior Leader</option>
					<option value="captain">Captain of a Vessel</option>
					<option value="politician">Politician</option>
					<option value="mage">Mage</option>
					<option value="priest">Priest</option>
					<option value="druid">Druid</option>
					<option value="pilot">Pilot/Driver/Rider</option>
					<option value="merchant">Merchant</option>
					<option value="crimeBoss">Crime Boss</option>
					<option value="bureaucrat">Bureaucrat</option>
					<option value="mechanic">Mechanic</option>
					<option value="hacker">Hacker</option>
					<option value="criminal">Criminal Tough</option>
					<option value="investigator">Investigator</option>
					<option value="wrangler">Wranger/Survivalist</option>
					<option value="cop">Cop/Town Guard</option>
				</select>
			</div>
			<div class="form-group">
				<label>Skill Package 2</label>
				<select id = "skillPack2" name="skillPack2">
					<option value="none">None</option>
					<option value="basicCreature">Basic Creature</option>
					<option value="ferociousCreature">Ferocious Creature</option>
					<option value="predatoryCreature">Predatory Creature</option>
					<option value="territorialCreature">Territorial Creature</option>
					<option value="soldier">Soldier</option>
					<option value="duelist">Duelist</option>
					<option value="scout">Scout/Sniper</option>
					<option value="brawler">Brawler/Laborer</option>
					<option value="gunslinger">Gunslinger</option>
					<option value="sailor">Sailor</option>
					<option value="spy">Spy/Con Arist</option>
					<option value="thief">Thief/Assassin</option>
					<option value="researcher">Researcher</option>
					<option value="philosopher">Natural Philosopher</option>
					<option value="doctor">Doctor</option>
					<option value="knight">Knight/Warrior Leader</option>
					<option value="captain">Captain of a Vessel</option>
					<option value="politician">Politician</option>
					<option value="mage">Mage</option>
					<option value="priest">Priest</option>
					<option value="druid">Druid</option>
					<option value="pilot">Pilot/Driver/Rider</option>
					<option value="merchant">Merchant</option>
					<option value="crimeBoss">Crime Boss</option>
					<option value="bureaucrat">Bureaucrat</option>
					<option value="mechanic">Mechanic</option>
					<option value="hacker">Hacker</option>
					<option value="criminal">Criminal Tough</option>
					<option value="investigator">Investigator</option>
					<option value="wrangler">Wranger/Survivalist</option>
					<option value="cop">Cop/Town Guard</option>
				</select>
			</div>
			<div class="form-group">
				<label>Skill Package 3</label>
				<select id = "skillPack3" name="skillPack3">
					<option value="none">None</option>
					<option value="basicCreature">Basic Creature</option>
					<option value="ferociousCreature">Ferocious Creature</option>
					<option value="predatoryCreature">Predatory Creature</option>
					<option value="territorialCreature">Territorial Creature</option>
					<option value="soldier">Soldier</option>
					<option value="duelist">Duelist</option>
					<option value="scout">Scout/Sniper</option>
					<option value="brawler">Brawler/Laborer</option>
					<option value="gunslinger">Gunslinger</option>
					<option value="sailor">Sailor</option>
					<option value="spy">Spy/Con Arist</option>
					<option value="thief">Thief/Assassin</option>
					<option value="researcher">Researcher</option>
					<option value="philosopher">Natural Philosopher</option>
					<option value="doctor">Doctor</option>
					<option value="knight">Knight/Warrior Leader</option>
					<option value="captain">Captain of a Vessel</option>
					<option value="politician">Politician</option>
					<option value="mage">Mage</option>
					<option value="priest">Priest</option>
					<option value="druid">Druid</option>
					<option value="pilot">Pilot/Driver/Rider</option>
					<option value="merchant">Merchant</option>
					<option value="crimeBoss">Crime Boss</option>
					<option value="bureaucrat">Bureaucrat</option>
					<option value="mechanic">Mechanic</option>
					<option value="hacker">Hacker</option>
					<option value="criminal">Criminal Tough</option>
					<option value="investigator">Investigator</option>
					<option value="wrangler">Wranger/Survivalist</option>
					<option value="cop">Cop/Town Guard</option>
				</select>
			</div>
			<div class = "form-group">
				<label>Equipment Array</label>
				<select id="weaponPack" name="weaponPack">
					<option value="none">None</option>
					<option value="smallBeast">Small Beast or Creature</option>
					<option value="largeBeast">Large Beast or Creature</option>
					<option value="laborer">Manual Laborer</option>
					<option value="citizen">Basic Citizen</option>
					<option value="blueCollar">Blue-Collar Worker</option>
					<option value="traveler">Traveler</option>
					<option value="criminal">Criminal</option>
					<option value="doctor">Doctor</option>
					<option value="noble">Noble</option>
					<option value="basicRanged">Basic Ranged Warrior</option>
					<option value="heavyRanged">Heavy Ranged Warrior</option>
					<option value="basicMelee">Basic Melee Warrior</option>
					<option value="heavyMelee">Heavy Melee Warrior</option>
					<option value="versatileWarrior">Versatile Warrior</option>
					<option value="adventurer">Adventurer</option>
					<option value="bountyHunter">Bounty Hunter</option>
					<option value="gameHunter">Game Hunter</option>
					<option value="lawEnforcement">Law Enforcement Officer</option>
					<option value="pilot">Pilot</option>
					<option value="flashyOutlaw">Flashy Outlaw</option>
					<option value="defensiveMagic">Defensive Magic User</option>
					<option value="offensiveMagic">Offensive Magic User</option>
				</select>
			</div>
			<p>Does your setting split melee and/or ranged into heavy and light skills?</p>
			<div class="form-group">
				<label>Weapon Skills</label>
				<input type="checkbox" id="splitMelee" name="splitMelee" value="splitMelee">
				<label for "splitMelee">Melee</label>
				<input type="checkbox" id="splitRanged" name="splitRanged" value="splitRanged">
				<label for "splitRanged">Ranged</label>
			</div>
				
        </form>
        `,
        buttons: {
            okay: {
                label: `Create`,
                callback: () => {
                    makeAdv = true;
                }
            },
			cancel: {
				label: `Cancel`,
				callback: () => {
					makeAdv = false;
				}
			}
		},
	default: "okay",
	close: html => {
			
			if (makeAdv) {
			
				let chosenArray = html.find('[name="charArray"]')[0].value;
				let chosenDef = html.find('[name="defType"]')[0].value;
				let chosenDef2 = html.find('[name="defType2"]')[0].value;
				let chosenSkills1 = html.find('[name="skillPack"]')[0].value;
				let chosenSkills2 = html.find('[name="skillPack2"]')[0].value;
				let chosenSkills3 = html.find('[name="skillPack3"]')[0].value;
				let equipment = html.find('[name="weaponPack"]')[0].value;
				isMinion = html.find('[name="minion"]')[0].checked;
				isRival = html.find('[name="minion"]')[1].checked;
				isNemesis = html.find('[name="minion"]')[2].checked;
				advName = html.find('[name="name"]')[0].value;
				if (!isMinion && !isRival && !isNemesis) isRival = true;
				if (advName.length == 0 && isMinion) advName = "New Minion";
				else if (advName.length == 0 && isRival) advName = "New Rival";
				else if (advName.length == 0 && isNemesis) advName = "New Nemesis";
				
				switch (chosenArray) {
					case "smallCreature":
						fillChars(1,2,3,1,1,1);
						updateChallenge(-1,-1,0);
						break;
					case "largeCreature":
						fillChars(4,2,2,1,1,1);
						updateChallenge(1,-1,0);
						break;
					case "stealthyCreature":
						fillChars(2,3,3,1,1,1);
						updateChallenge(0,-1,0);
						break;
					case "hugeCreature":
						fillChars(5,1,1,1,1,1);
						updateChallenge(1,-1,-1);
						break;
					case "averagePerson":
						fillChars(2,2,2,2,2,2);
						updateChallenge(0,0,0);
						break;
					case "toughPerson":
						fillChars(3,2,2,2,2,1);
						updateChallenge(0,-1,0);
						break;
					case "smartPerson":
						fillChars(1,2,2,3,2,2);
						updateChallenge(-1,0,0);
						break;
					case "sociablePerson":
						fillChars(2,2,2,2,1,3);
						updateChallenge(0,0,0);
						break;
					case "jack":
						fillChars(3,3,3,3,3,3);
						updateChallenge(1,1,1);
						break;
					case "skilledWarrior":
						fillChars(4,3,2,2,3,1);
						updateChallenge(2,0,0);
						break;
					case "savant":
						fillChars(2,1,2,5,2,1);
						updateChallenge(-1,-1,1);
						break;
					case "bornLeader":
						fillChars(2,2,3,2,3,5);
						updateChallenge(0,2,0);
						break;
					case "cunningFoe":
						fillChars(2,4,4,2,2,2);
						updateChallenge(1,0,1);
						break;
					case "mastermind":
						fillChars(3,3,4,4,5,3);
						updateChallenge(1,2,2);
						break;
					default:
				}
				
				if (isMinion) {
					if (chars[0] == 1) {WT = 3;}
					else { WT = 5;}
				}
				else if (isRival) {
					WT = 8 + chars[0];
				}
				else if (isNemesis) {
					WT = 12 + chars[0];
					ST = 10 + chars[4];
				}
				
				
				let x = [];
				
				if (chosenDef != "none") {x.push(chosenDef);}
				if (chosenDef2 != "none") {x.push(chosenDef2);}
				
					for (let i = 0; i < x.length; i++)
					{
				
						switch (x[i]) {
							case "none":
								break;
							case "toughSkin":
								soak += 1;
								WT += 2;
								break;
							case "armoredHide":
								soak += 2;
								WT += 5;
								updateChallenge(1,0,0);
								break;
							case "dodgy":
								mDef +=1;
								rDef +=1;
								break;
							case "closeCombatant":
								mDef +=2;
								break;
							case "camouflaged":
								mDef +=1;
								rDef +=2;
								updateChallenge(1,0,0);
								break;
							case "hardy":
								WT +=5;
								break;
							case "veryTough":
								WT +=10;
								updateChallenge(1,0,0);
								break;
							case "giantBody":
								WT +=25;
								updateChallenge(2,0,0);
								break;
							case "savvy":
								if (!isMinion) {ST +=5;}
								else {
									ui.notifications.info("Minions cannot have this defense. No changes made.");
								}
								break;
							case "mentalGiant":
								if (!isMinion) {
									ST +=10;
									updateChallenge(0,1,0);
								}
								else {
									ui.notifications.info("Minions cannot have this defense. No changes made.");
								}
								break;
							default:
						}
						console.log("added " + x[i]);
				}
				
				let y = [];

				if (chosenSkills1 != "none") {y.push(chosenSkills1);}
				if (chosenSkills2 != "none") {y.push(chosenSkills2);}
				if (chosenSkills3 != "none") {y.push(chosenSkills3);}

				for (let i=0; i < y.length; i++)
				{
					switch (y[i]) {
						case "none":
							break;
						case "basicCreature":
							updateSkill(athl,1);
							updateSkill(braw,3);
							updateSkill(surv,2);
							updateSkill(vigi,2);
							break;
						case "ferociousCreature":
							updateSkill(athl,2);
							updateSkill(braw,4);
							updateSkill(perc,2);
							updateSkill(surv,3);
							updateSkill(vigi,1);
							updateChallenge(1,0,1);
							break;
						case "predatoryCreature":
							updateSkill(braw,3);
							updateSkill(coor,3);
							updateSkill(perc,4);
							updateSkill(surv,2);
							updateSkill(stea,3);
							updateChallenge(1,0,1);
							break;
						case "territorialCreature":
							updateSkill(braw,2);
							updateSkill(resi,3);
							updateSkill(surv,4);
							updateSkill(vigi,4);
							updateChallenge(0,0,2);
							break;
						case "soldier":
							updateSkill(athl,2);
							updateSkill(disc,1);
							updateSkill(mele,2);
							updateSkill(mell,2);
							updateSkill(melh,2);
							updateSkill(rang,2);
							updateSkill(ranl,2);
							updateSkill(ranh,2);
							updateSkill(resi,2);
							updateSkill(vigi,2);
							updateChallenge(1,0,1);
							break;
						case "duelist":
							updateSkill(cool,3);
							updateSkill(coor,3);
							updateSkill(mele,5);
							updateSkill(mell,5);
							updateSkill(stea,1);
							updateChallenge(1,0,0);
							break;
						case "scout":
							updateSkill(cool,2);
							updateSkill(perc,3);
							updateSkill(rang,5);
							updateSkill(ranh,5);
							updateSkill(stea,4);
							updateSkill(surv,3);
							updateSkill(vigi,3);
							updateChallenge(2,0,2);
							break;
						case "brawler":
							updateSkill(athl,3);
							updateSkill(braw,2);
							updateSkill(resi,2);
							break;
						case "gunslinger":
							updateSkill(cool,3);
							updateSkill(coor,2);
							updateSkill(rang,4);
							updateSkill(ranl,4);
							updateSkill(skul,3);
							updateChallenge(1,0,0);
							break;
						case "sailor":
							updateSkill(athl,2);
							updateSkill(oper,3);
							updateSkill(perc,2);
							updateSkill(rang,1);
							updateSkill(ranl,1);
							updateSkill(vigi,1);
							updateChallenge(0,0,1);
						case "spy":
							updateSkill(cool,2);
							updateSkill(charm,3);
							updateSkill(dece,4);
							updateSkill(know,1);
							updateSkill(skul,4);
							updateSkill(stea,3);
							updateChallenge(0,2,2);
							break;							
						case "thief":
							updateSkill(coor,3);
							updateSkill(dece,2);
							updateSkill(mele,3);
							updateSkill(mell,3);
							updateSkill(skul,4);
							updateSkill(stea,5);
							updateSkill(stre,3);
							updateSkill(vigi,1);
							updateChallenge(1,0,4);
							break;
						case "researcher":
							updateSkill(astr,5);
							updateSkill(comp,3);
							updateSkill(disc,2);
							updateSkill(know,5);
							updateSkill(perc,4);
							updateChallenge(0,0,5);
							break;
						case "philosopher":
							updateSkill(alch,4);
							updateSkill(know,4);
							updateSkill(medi,2);
							updateSkill(nego,1);
							updateSkill(perc,2);
							updateChallenge(0,0,3);
							break;
						case "doctor":
							updateSkill(cool,2);
							updateSkill(disc,2);
							updateSkill(lead,1);
							updateSkill(medi,4);
							updateSkill(mele,1);
							updateSkill(mell,1);
							updateChallenge(0,1,2);
							break;
						case "knight":
							updateSkill(athl,1);
							updateSkill(disc,2);
							updateSkill(driv,3);
							updateSkill(lead,3);
							updateSkill(mele,4);
							updateSkill(mell,4);
							updateSkill(melh,4);
							updateSkill(ridi,3);
							updateChallenge(1,2,2);
							break;
						case "captain":
							updateSkill(astr,4);
							updateSkill(coer,2);
							updateSkill(disc,3);
							updateSkill(lead,4);
							updateSkill(oper,4);
							updateSkill(rang,3);
							updateSkill(ranl,3);
							updateChallenge(1,2,3);
							break;
						case "politician":
							updateSkill(charm,4);
							updateSkill(coer,2);
							updateSkill(cool,2);
							updateSkill(lead,3);
							updateSkill(nego,5);
							updateSkill(vigi,1);
							updateChallenge(0,3,1);
							break;
						case "mage":
							updateSkill(alch,2);
							updateSkill(arca,4);
							updateSkill(coer,2);
							updateSkill(know,4);
							updateChallenge(2,0,2);
							break;
						case "priest":
							updateSkill(charm,2);
							updateSkill(disc,3);
							updateSkill(divi,4);
							updateSkill(know,4);
							updateChallenge(2,1,2);
							break;						
						case "druid":
							updateSkill(know,4);
							updateSkill(prim,4);
							updateSkill(surv,3);
							updateSkill(vigi,2);
							updateChallenge(2,0,2);
							break;						
						case "pilot":
							updateSkill(cool,2);
							updateSkill(coor,3);
							updateSkill(driv,4);
							updateSkill(pilo,4);
							updateSkill(rang,3);
							updateSkill(ranl,3);
							updateSkill(ridi,4);
							updateChallenge(1,0,3);
							break;						
						case "merchant":
							updateSkill(charm,2);
							updateSkill(dece,3);
							updateSkill(nego,3);
							updateSkill(perc,2);
							updateSkill(vigi,3);
							updateChallenge(0,3,0);
							break;
						case "crimeBoss":
							updateSkill(braw,4);
							updateSkill(coer,5);
							updateSkill(disc,2);
							updateSkill(lead,2);
							updateSkill(rang,2);
							updateSkill(ranl,2);
							updateSkill(stre,4);
							updateChallenge(2,3,1);
							break;
						case "bureaucrat":
							updateSkill(cool,3);
							updateSkill(disc,3);
							updateSkill(know,2);
							updateSkill(nego,2);
							updateSkill(vigi,3);
							updateChallenge(0,3,1);
							break;
						case "mechanic":
							updateSkill(athl,2);
							updateSkill(braw,1);
							updateSkill(comp,1);
							updateSkill(mech,4);
							updateSkill(resi,3);
							updateChallenge(0,0,3);
							break;
						case "hacker":
							updateSkill(comp,5);
							updateSkill(cool,2);
							updateSkill(dece,2);
							updateSkill(stre,2);
							updateChallenge(0,1,3);
							break;
						case "criminal":
							updateSkill(braw,2);
							updateSkill(coer,3);
							updateSkill(resi,3);
							updateSkill(skul,3);
							updateSkill(stre,2);
							updateChallenge(0,1,2);
							break;
						case "investigator":
							updateSkill(charm,2);
							updateSkill(coer,2);
							updateSkill(disc,3);
							updateSkill(perc,3);
							updateSkill(stre,3);
							updateSkill(surv,3);
							updateSkill(vigi,3);
							updateChallenge(0,2,3);
							break;
						case "wrangler":
							updateSkill(athl,4);
							updateSkill(coor,2);
							updateSkill(perc,3);
							updateSkill(rang,2);
							updateSkill(ranl,2);
							updateSkill(ridi,3);
							updateSkill(surv,4);
							updateChallenge(0,0,3);
						case "cop":
							updateSkill(coer,2);
							updateSkill(driv,2);
							updateSkill(lead,2);
							updateSkill(mele,2);
							updateSkill(mell,2);
							updateSkill(rang,2);
							updateSkill(ranl,2);
							updateChallenge(1,1,0);
							break; 
						
						default:
					}
				}
				
				switch (equipment) {
					case "smallBeast":
						makeWeapon("Teeth and claws",2+chars[0],3,"Engaged","Brawl",true,[accurate1,knockdown]);
						break;
					case "largeBeast":
						makeWeapon("Gaping maw or razor claws",4+chars[0],2,"Engaged","Brawl",true,[vicious3]);
						makeWeapon("Tentacles or thundering hooves",5+chars[0],4,"Engaged","Brawl",true,[knockdown,concussive1]);
						updateChallenge(1,0,0);
						break;
					case "laborer":
						makeWeapon("Large farming implement or tool",3+chars[0],5,"Engaged","Melee-Heavy",true,[cumbersome3]);
						soak +=1;
						break;
					case "citizen":
						makeWeapon("Fists",chars[0],6,"Engaged","Brawl",true,[disorient1,knockdown]);
						break;
					case "blueCollar":
						makeWeapon("Improvised brawling weapon",1+chars[0],5,"Engaged","Brawl",true,[disorient2,inferior]);
						soak += 1;
						updateChallenge(0,0,1);
						break;
					case "traveler":
						makeWeapon("Walking staff",2+chars[0],4,"Engaged","Melee-Heavy",true,[defensive1,disorient2]);
						mDef += 1;
						rDef += 1;
						break;
					case "criminal":
						makeWeapon("Concealable melee weapon",1+chars[0],2,"Engaged","Melee-Light",true,[pierce2]);
						mDef += 2;
						rDef += 2;
						updateChallenge(1,0,1);
						
					default:
				}
					
							
				if (isMinion) {console.log("Minion");}
				if (isRival) {console.log("Rival");}
				if (isNemesis) {console.log("Nemesis");}
				console.log("Name: " + advName);
				console.log("Characteristic Array: " + chars);
				console.log("Challenge: " + challenge);
				console.log("Soak: " + soak);
				console.log("WT: " + WT);
				console.log("ST: " + ST);
				console.log("Melee Defense: " + mDef);
				console.log("Ranged Defense: " + rDef);
				console.log(skillsToMake);
				makeActor();
				
				
			}
			
			
		}
}).render(true);