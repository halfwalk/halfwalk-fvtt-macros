/*

// BUILD A COMPENDIUM INDEX AND GET A SPECIFIC ITEM FROM IT

let armor = await game.packs.get("world.test");
const armorIndex = await game.packs.get('world.test').getIndex();

async function getItem(name,pack) {
	let index = pack.find(i => i.name === name);
	let item = await pack.getDocument(index.id);
	return item;
}

let leather = await getItem("Baazrag Leather",armorComp);
console.log(leather);

*/

var chars;
var challenge = [0,0,0];
var makeAdv;
var WT=0, ST=0, soak=0, mDef=0, rDef=0;
var isMinion, isRival, isNemesis;
var advType, advName;
let weapons = [];
let talents = [];
let gear = [];
let armor = [];
let skillsArr = [];
let skillsToMake = [];
var skillsCS = [];
let appendChallenge = true;
const alch=0,astr=1,athl=2,comp=3,cool=4,coor=5,disc=6,driv=7,mech=8,medi=9,oper=10,perc=11,pilo=12,resi=13,ridi=14,skul=15,stea=16,stre=17,surv=18,vigi=19,arca=20,divi=21,prim=22,braw=23,gunn=24,mell=25,melh=26,mele=27,rang=28,ranl=29,ranh=30,charm=31,coer=32,dece=33,lead=34,nego=35,know=36;
const skillsList = ["Alchemy","Astrocartography","Athletics","Computers","Cool","Coordination","Discipline","Driving","Mechanics","Medicine","Operating","Perception","Piloting","Resilience","Riding","Skulduggery","Stealth","Streetwise","Survival","Vigilance","Arcana","Divine","Primal","Brawl","Gunnery","Melee-Light","Melee-Heavy","Melee","Ranged","Ranged-Light","Ranged-Heavy","Charm","Coercion","Deception","Leadership","Negotiation","Knowledge"];
let skillScores = [];
let meleeHeavy,meleeLight,rangedHeavy,rangedLight;

skillsList.forEach(()=> {skillScores.push(0);});

let dialogOptions = { width: 600, resizable: true }




      "effects": []
};

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
*/

function makeTalent(tName, tDesc, tAct, tRank) {
	
	let newTalent = {};
	let isRanked = false;
	
	if (tRank > 0) 
		isRanked = true;
	
	newTalent = {
		name: tName,
		type: "talent",
		data: {
			description: tDesc,
			attributes: {},
			activation: {
				value: tAct,
				type: "String",
				label: "Activation"
			},
			ranks: {
				ranked: isRanked,
				current: tRank,
				min: 0
			},
			isForceTalent: false,
			isConflictTalent: false,
			tier: "1",
			trees: []
		},
		effects: [],
		sort: 0
	};
	
	talents.push(newTalent);
}

// challenge rating of adversary

function updateChallenge(com,soc,gen) {
	challenge[0] += com;
	challenge[1] += soc;
	challenge[2] += gen;
}

// build armor/defensive object and push to array for actor creation

function makeArmor (aName,aSoak,mDef,rDef) {
	
	let newArmor = {};
	
			
	newArmor = {
		name: aName,
		type: "armour",
		data: {
			description: "",
			attributes: {
				"attr1626293881743": {
					modtype: "Stat",
					value: mDef,
					mod: "Defence-Melee"
				},
				"attr1626293881854": {
					modtype: "Stat",
					value: rDef,
					mod: "Defence-Ranged"
				}
			},				
			soak: {
				value: aSoak,
			},
			equippable: {
				equipped: true
			},
			itemmodifier: []
		}
	}
	armor.push(newArmor);
}

// build weapon object and push to array for actor creation

function makeWeapon (wName,wDam,wCrit,wRange,wSkill,isBrawn,qualsList) {
	let wDamMod = 0;
	let wChar = "";
	if (isBrawn) {
		wChar = "Brawn";
		wDamMod = wDam;
	}
	
	let newWeapon = {};
	console.log(qualsList);
	let qualsText = "";
	if (qualsList.length > 0) {
		qualsList.forEach((i)=> {
			qualsText += " " + i.name;
			i.name = i.name.replace(/\d+$/,'');
		});
	}
	
			
	newWeapon = {
		name: wName,
		type: "weapon",
		data: {
			attributes: {
				"attr1626299161112": {
					"modtype": "Weapon Stat",
					value: wDamMod,
					mod: "damage"
				}
			},
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

// check if actor already has rank in a skill, and if so, keep the highest rank

function updateSkill(skill,rank) {
	skillScores[skill] = Math.max(skillScores[skill],rank);
}

// create an actor sheet

async function makeActor() {
	
	let STadj = 0;
	if (isMinion) advType = "minion";
	else advType = "character";
	
	if (isNemesis) STadj = ST;
	let tokenName = advName;
	
	if (appendChallenge) 
		advName = advName + " (" + challenge[0] + "/" + challenge[1] + "/" + challenge[2] + ")";
	
	// if actor has ranks in a skill, mark it as a career skill (for minion purposes)
	
	skillScores.forEach((i)=> {
		if (i > 0) 
			//	makeSkill(j,i);
			skillsCS.push(true);
		else skillsCS.push(false);
		});
			
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
			...talents,
			...gear,
			...armor
		]
		
	};
	
	let actor = await Actor.create(advData);
		
} 

let dialogEditor = new Dialog({
    title: `Adversary Generator`,
    content: `
	<style>
	.row {
		display: flex;
	}
	.column {
		flex: 50%;
		padding: 10px;
	}
	</style>
	<div class="row">
	<div class="column">
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
		</div>
		<div class="column">
			<div class="row">
			<div class="column">
			<h2>Talents & Abilities</h2>
			<div class = "form-group">
				<input type="checkbox" id="adversary1" name="adversary1" value"yes">
				<label for "adversary1">Adversary 1</label><br>
				<input type="checkbox" id="adversary2" name="adversary2" value"yes">
				<label for "adversary1">Adversary 2</label><br>
				<input type="checkbox" id="adversary3" name="adversary3" value"yes">
				<label for "adversary1">Adversary 3</label><br>
				<input type="checkbox" id="animalCompanion" name="animalCompanion" value"yes">
				<label for "adversary1">Animal Companion</label><br>
				<input type="checkbox" id="barrelRoll" name="barrelRoll" value"yes">
				<label for "adversary1">Barrel Roll</label><br>
				</div>
			</div>
			</div>
		</div>
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
				let p = "Passive", aa = "Active (Action)", ai = "Active (Incidental)", am = "Active (Maneuver)", ao = "Active (Incidental, Out of Turn)";
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
				
				// set variables for determining melee and ranged skill names based on user input
				
				let useSplitMelee = html.find('[name="splitMelee"]')[0].checked;
				let useSplitRanged = html.find('[name="splitMelee"]')[0].checked;
				
				if ( html.find('[name="adversary1"]')[0].checked ) makeTalent("Adversary 1", talentAdversary, p,1); 
				if ( html.find('[name="adversary2"]')[0].checked ) {makeTalent("Adversary 2", talentAdversary, p,2);updateChallenge(1,0,0);}
				if ( html.find('[name="adversary3"]')[0].checked ) {makeTalent("Adversary 3", talentAdversary, p,3);updateChallenge(2,0,0);}
				if ( html.find('[name="animalCompanion"]')[0].checked ) {
					makeTalent("Animal Companion", talentAnimalCompanion, p,0);
				updateChallenge(1,0,1); }
				
				if ( html.find('[name="barrelRoll"]')[0].checked ) {makeTalent("Barrel Roll", talentBarrelRoll, ai,0);updateChallenge(1,0,0);}
				/*if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked )
				if ( html.find('[name="adversary1"]')[0].checked ) */
					
				if (!useSplitMelee) {
					meleeHeavy = "Melee";
					meleeLight = "Melee";
				} else {
					meleeHeavy = "Melee-Heavy";
					meleeLight = "Melee-Light";
				}
				if (!useSplitRanged) {
					rangedHeavy = "Ranged";
					rangedLight = "Ranged";
				} else {
					rangedHeavy = "Ranged-Heavy";
					rangedLight = "Ranged-Light";
				}
				
				// set characteristics based on chosen characteristic array
				
				switch (chosenArray) {
					case "smallCreature":
						chars = [1,2,3,1,1,1];
						updateChallenge(-1,-1,0);
						break;
					case "largeCreature":
						chars = [4,2,2,1,1,1];
						updateChallenge(1,-1,0);
						break;
					case "stealthyCreature":
						chars = [2,3,3,1,1,1];
						updateChallenge(0,-1,0);
						break;
					case "hugeCreature":
						chars = [5,1,1,1,1,1];
						updateChallenge(1,-1,-1);
						break;
					case "averagePerson":
						chars = [2,2,2,2,2,2];
						updateChallenge(0,0,0);
						break;
					case "toughPerson":
						chars = [3,2,2,2,2,1];
						updateChallenge(0,-1,0);
						break;
					case "smartPerson":
						chars = [1,2,2,3,2,2];
						updateChallenge(-1,0,0);
						break;
					case "sociablePerson":
						chars = [2,2,2,2,1,3];
						updateChallenge(0,0,0);
						break;
					case "jack":
						chars = [3,3,3,3,3,3];
						updateChallenge(1,1,1);
						break;
					case "skilledWarrior":
						chars = [4,3,2,2,3,1];
						updateChallenge(2,0,0);
						break;
					case "savant":
						chars = [2,1,2,5,2,1];
						updateChallenge(-1,-1,1);
						break;
					case "bornLeader":
						chars = [2,2,3,2,3,5];
						updateChallenge(0,2,0);
						break;
					case "cunningFoe":
						chars = [2,4,4,2,2,2];
						updateChallenge(1,0,1);
						break;
					case "mastermind":
						chars = [3,3,4,4,5,3];
						updateChallenge(1,2,2);
						break;
					default:
				}
				
				// set WT and ST based on type of adversary
				
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
				
				
				// set defenses
				
				 
				let x = [];
				
				if (chosenDef != "none") {x.push(chosenDef);}
				if (chosenDef2 != "none") {x.push(chosenDef2);}
				
					for (let i = 0; i < x.length; i++) {
				
						switch (x[i]) {
							case "none":
								break;
							case "toughSkin":
								makeArmor("Tough Skin",1,0,0);
								WT += 2;
								break;
							case "armoredHide":
								makeArmor("Armored Hide",2,0,0);
								WT += 5;
								updateChallenge(1,0,0);
								break;
							case "dodgy":
								makeArmor("Dodgy",0,1,1);
								break;
							case "closeCombatant":
								makeArmor("Close Combatant",0,2,0);
								break;
							case "camouflaged":
								makeArmor("Camouflaged",0,1,2);
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
				
				
				// set skill packages 
				
				let y = [];

				if (chosenSkills1 != "none") {y.push(chosenSkills1);}
				if (chosenSkills2 != "none") {y.push(chosenSkills2);}
				if (chosenSkills3 != "none") {y.push(chosenSkills3);}

				for (let i=0; i < y.length; i++) {
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
				
				// build item objects from equipment pack
				
				switch (equipment) {
					case "smallBeast":
						makeWeapon("Teeth and claws",2,3,"Engaged","Brawl",true,[accurate1,knockdown]);
						break;
					case "largeBeast":
						makeWeapon("Gaping maw or razor claws",4,2,"Engaged","Brawl",true,[vicious3]);
						makeWeapon("Tentacles or thundering hooves",5+chars[0],4,"Engaged","Brawl",true,[knockdown,concussive1]);
						updateChallenge(1,0,0);
						break;
					case "laborer":
						makeWeapon("Large farming implement or tool",3,5,"Engaged",meleeHeavy,true,[cumbersome3]);
						makeArmor("Heavy Clothes",1,0,0);
						break;
					case "citizen":
						makeWeapon("Fists",chars[0],6,"Engaged","Brawl",true,[disorient1,knockdown]);
						break;
					case "blueCollar":
						makeWeapon("Improvised brawling weapon",1,5,"Engaged","Brawl",true,[disorient2,inferior]);
						makeArmor("Heavy clothing",1,0,0);
						updateChallenge(0,0,1);
						break;
					case "traveler":
						makeWeapon("Walking staff",2,4,"Engaged",meleeHeavy,true,[defensive1,disorient2]);
						makeArmor("Heavy cloak",0,1,1);
						gear.push(gearTraveler);
						break;
					case "criminal":
						makeWeapon("Concealable melee weapon",1,2,"Engaged",meleeLight,true,[pierce2]);
						makeArmor("Dark clothing",0,2,2);
						gear.push(gearCriminal);
						updateChallenge(1,0,1);
						break;
					case "doctor":
						makeWeapon("Sharp medical tool",0,1,"Engaged",meleeLight,true,[]);
						gear.push(gearDoctor);
						updateChallenge(0,0,1);
						break;
					case "noble":
						makeWeapon("Dueling weapon",2,3,"Engaged",meleeLight,true,[defensive1]);
						gear.push(gearNoble);
						updateChallenge(0,1,0);
						break;
					case "basicRanged":
						makeWeapon("Two-handed ranged weapon",8,3,"Long",rangedHeavy,false,[]);
						makeWeapon("One-handed melee weapon",2,3,"Engaged",meleeLight,true,[vicious1]);
						makeArmor("Reinforced uniform or light armor",1,0,0);
						gear.push(gearBasicRanged);
						updateChallenge(2,0,0);
						break;
					case "heavyRanged":
						makeWeapon("Heavy rapid-firing ranged weapon",12,3,"Long","Gunnery",false,[autoFire,cumbersome3,vicious2]);
						makeWeapon("Powerful single-shot ranged weapon",20,2,"Extreme","Gunnery",false,[blast10,breach2,cumbersome4,limitedAmmo1,prepare1]);
						makeArmor("Heavy Defensive Armor",3,0,0);
						gear.push(gearHeavyRanged);
						updateChallenge(4,0,0);
						break;
					case "basicMelee":
						makeWeapon("One-handed defensive melee weapon",2,4,"Engaged",meleeLight,true,[defensive1]);
						makeWeapon("Shield",0,6,"Engaged",meleeLight,true,[defensive1,deflection1,inaccurate1,knockdown]);
						makeArmor("Medium Armor",2,0,0);
						makeArmor("Defensive Weapon",0,1,0);
						makeArmor("Shield",0,1,1);
						updateChallenge(1,0,0);
						break;
					case "heavyMelee":
						makeWeapon("Two-handed Melee Weapon",4,3,"Engaged",meleeHeavy,true,[cumbersome3,pierce2,vicious1]);
						makeWeapon("One-handed Versatile Weapon",3,2,"Engaged",meleeLight,true,[defensive1]);
						makeWeapon("Shield",chars[0],6,"Engaged",meleeLight,true,[defensive1,deflection1,inaccurate1,knockdown]);
						makeArmor("Defensive Weapon",0,1,0);
						makeArmor("Shield",0,1,1);
						makeArmor("Heavy Armor",2,1,1);
						updateChallenge(2,0,0);
						break;
					case "versatileWarrior":
						makeWeapon("One-handed Versatile Weapon",3,2,"Engaged",meleeLight,true,[defensive1]);
						makeWeapon("One-handed Ranged Weapon",5,3,"Medium",rangedLight,false,[]);
						makeArmor("Reinforced Clothing",1,1,1);
						updateChallenge(1,0,0);
						break;
					case "adventurer":
						makeWeapon("One-handed Ranged Weapon",6,3,"Medium",rangedLight,false,[accurate1]);
						makeWeapon("Backup Brawling Weapon",1,4,"Engaged","Brawl",true,[disorient3]);
						makeArmor("Leather Vest",1,0,0);
						updateChallenge(1,0,0);
						break;
					case "bountyHunter":
						makeWeapon("Short-ranged Entangling Weapon",4,5,"Short",rangedHeavy,false,[disorient3,ensnare3,limitedAmmo1]);
						makeWeapon("Stunning Melee Weapon",3,5,"Engaged",meleeLight,true,[stun4,stunDamage]);
						makeArmor("Medium Armor",2,0,0);
						updateChallenge(1,0,0);
						break;
					case "gameHunter":
						makeWeapon("Long-ranged Hunting Weapon",9,3,"Extreme",rangedHeavy,false,[accurate1,limitedAmmo2]);
						makeArmor("Camouflage",0,2,2);
						gear.push(gearGameHunter);
						updateChallenge(2,0,0);
						break;
					case "pilot":
						makeWeapon("Concealable Ranged Weapon",5,4,"Short",rangedLight,false,[]);
						gear.push(gearPilot);
						break;
					case "lawEnforcement":
						makeWeapon("One-handed Ranged Weapon",5,3,"Medium",rangedLight,false,[]);
						makeWeapon("One-handed bludgeoning weapon",3,4,"Engaged",meleeLight,true,[disorient2]);
						makeArmor("Light Armor",1,0,0);
						gear.push(gearLEO);
						updateChallenge(1,0,0);
						break;
					case "outlaw":
						makeWeapon("Intimidating Ranged Weapon",7,3,"Medium",rangedLight,false,[inaccurate1]);
						makeArmor("Dashing Coat",1,0,0);
						gear.push(gearOutlaw);
						updateChallenge(1,1,0);
						break;
					case "defensiveMagic":
						makeArmor("Magically Enhanced Robes",0,3,3);
						gear.push(gearDefensiveMagic);
						updateChallenge(1,0,2);
						break;
					case "offensiveMagic":
						makeWeapon("One-handed Melee Weapon",3,2,"Engaged",meleeLight,true,[defensive1]);
						makeArmor("Defensive Weapon",0,1,0);
						gear.push(gearOffensiveMagic);
						updateChallenge(1,0,1);
					default:
				}
				makeActor();
			}
		}
},dialogOptions).render(true);