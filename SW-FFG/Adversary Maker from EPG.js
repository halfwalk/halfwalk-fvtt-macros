var chars;
var challenge = [0,0,0];
var makeAdv;
var WT=0;
let ST=0;
let soak=0;
let mDef=0;
let rDef=0;
var armorName = "Defense";
var weaponName = "weapon", weaponName2 = "weapon 2";
var weaponDamage = 0;
var weaponCrit = 0;
var weaponChar = "";
var weaponRange = "Short";
var isMinion, isRival, isNemesis;
var advType, advName;
var alch=0,astr=0,athl=0,comp=0,cool=0,coor=0,disc=0,driv=0,mech=0,medi=0,oper=0,perc=0,pilo=0,resi=0,ridi=0,skul=0,stea=0,stre=0,surv=0,vigi=0;
var arca=0,divi=0,prim=0;
var braw=0,gunn=0,mell=0,melh=0,mele=0,rang=0,ranl=0,ranh=0;
var charm=0,coer=0,dece=0,lead=0,nego=0;
var know=0;
let weapons = [];
let talents = [];

const skillsList = ["alch","astr","athl","comp","cool","coor","disc","driv","mech","medi","oper","perc","pilo","resi","ridi","skul","stea","stre","surv","vigi","arca","divi","prim","braw","gunn","mell","melh","mele","rang","ranl","ranh","charm","coer","dece","lead","nego","know"];

var skillsCS = [];
var minionCS = [];



async function fillChars(bra,agi,intel,cun,wil,pre) {
    chars = [bra,agi,intel,cun,wil,pre];
}

async function updateChallenge(com,soc,gen) {
	challenge[0] += com;
	challenge[1] += soc;
	challenge[2] += gen;
}

async function parseCS() {
	skillsList.forEach((element) => {
		if (minionCS.includes(element)) skillsCS.push(true);
		else skillsCS.push(false);
	});
}


async function makeActor()
{
	if (isMinion) advType = "minion";
	else advType = "character";
	let tokenName = advName;
	advName = advName + " (" + challenge[0] + "/" + challenge[1] + "/" + challenge[2] + ")";
	
	let advData = {
		name: advName,
		type: advType,
		data: {
			stats: {
				wounds: {
					max: WT
				},
				strain: {
					max: ST
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
			skills: {
				Brawl: {
					rank: braw,
					careerskill: skillsCS[23],
					groupskill: skillsCS[23]
				},
				Gunnery: {
					rank: gunn,
					careerskill: skillsCS[24],
					groupskill: skillsCS[24]
				},
				Melee: {
					rank: mele,
					careerskill: skillsCS[27],
					groupskill: skillsCS[27]
				},
				"Melee-Heavy": {
					rank: melh,
					careerskill: skillsCS[26]
				},
				"Melee-Light": {
					rank: mell,
					careerskill: skillsCS[25]
				},
				Ranged: {
					rank: rang,
					careerskill: skillsCS[28],
					groupskill: skillsCS[28]
				},
				"Ranged-Light": {
					rank: ranl,
					careerskill: skillsCS[29],
					groupskill: skillsCS[29]
				},
				"Ranged-Heavy": {
					rank: ranh,
					careerskill: skillsCS[30],
					groupskill: skillsCS[30]
				},
				Athletics: {
					rank: athl,
					careerskill: skillsCS[2],
					groupskill: skillsCS[2]
				},
				Alchemy: {
					rank: alch,
					careerskill: skillsCS[0],
					groupskill: skillsCS[0]
				},
				Astrocartography: {
					rank: astr,
					careerskill: skillsCS[1],
					groupskill: skillsCS[1]
				},
				Computers: {
					rank: comp,
					careerskill: skillsCS[3],
					groupskill: skillsCS[3]
				},
				Cool: {
					rank: cool,
					careerskill: skillsCS[4],
					groupskill: skillsCS[4]
				},
				Coordination: {
					rank: coor,
					careerskill: skillsCS[5],
					groupskill: skillsCS[5]
				},
				Discipline: {
					rank: disc,
					careerskill: skillsCS[6],
					groupskill: skillsCS[6]
				},
				Driving: {
					rank: driv,
					careerskill: skillsCS[7],
					groupskill: skillsCS[7]
				},
				Mechanics: {
					rank: mech,
					careerskill: skillsCS[8],
					groupskill: skillsCS[8]
				},
				Medicine: {
					rank: medi,
					careerskill: skillsCS[9],
					groupskill: skillsCS[9]
				},
				Operating: {
					rank: oper,
					careerskill: skillsCS[10],
					groupskill: skillsCS[10]
				},
				Perception: {
					rank: perc,
					careerskill: skillsCS[11],
					groupskill: skillsCS[11]
				},
				Piloting: {
					rank: pilo,
					careerskill: skillsCS[12],
					groupskill: skillsCS[12]
				},
				Resilience: {
					rank: resi,
					careerskill: skillsCS[13],
					groupskill: skillsCS[13]
				},
				Riding: {
					rank: ridi,
					careerskill: skillsCS[14],
					groupskill: skillsCS[14]
				},
				Skulduggery: {
					rank: skul,
					careerskill: skillsCS[15],
					groupskill: skillsCS[15]
				},
				Stealth: {
					rank: stea,
					careerskill: skillsCS[16],
					groupskill: skillsCS[16]
				},
				Streetwise: {
					rank: stre,
					careerskill: skillsCS[17],
					groupskill: skillsCS[17]
				},
				Survival: {
					rank: surv,
					careerskill: skillsCS[18],
					groupskill: skillsCS[18]
				},
				Vigilance: {
					rank: vigi,
					careerskill: skillsCS[19],
					groupskill: skillsCS[19]
				},
				Arcana: {
					rank: arca,
					careerskill: skillsCS[20],
					groupskill: skillsCS[20]
				},
				Divine: {
					rank: divi,
					careerskill: skillsCS[21],
					groupskill: skillsCS[21]
				},
				Primal: {
					rank: prim,
					careerskill: skillsCS[22],
					groupskill: skillsCS[22]
				},
				Charm: {
					rank: charm,
					careerskill: skillsCS[31],
					groupskill: skillsCS[31]
				},
				Coercion: {
					rank: coer,
					careerskill: skillsCS[32],
					groupskill: skillsCS[32]
				},
				Deception: {
					rank: dece,
					careerskill: skillsCS[33],
					groupskill: skillsCS[33]
				},
				Leadership: {
					rank: lead,
					careerskill: skillsCS[34],
					groupskill: skillsCS[34]
				},
				Negotiation: {
					rank: nego,
					careerskill: skillsCS[35],
					groupskill: skillsCS[35]
				},
				Knowledge: {
					rank: know,
					careerskill: skillsCS[36],
					groupskill: skillsCS[36]
				},
				"Knowledge(Lore)": {
					rank: know,
					careerskill: skillsCS[36],
					groupskill: skillsCS[36]
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
			}
		},
		token: {
			name: tokenName
		},
		items: [
		{
			name: weaponName,
			type: "weapon",
			data: {
				damage: {
					value: weaponDamage
				},
				crit: {
					value: weaponCrit
				},
				range: {
					value: weaponRange
				},
				characteristic: {
					value: weaponChar
				},
				equippable: {
					equipped: true
				}
			}
		},
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
		}
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
				<label>Is a minion?</label>
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
				<label>Skill Package</label>
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
							minionCS = ["athl", "braw", "surv", "vigi"];
							athl = Math.max(athl,1);
							braw = Math.max(braw,1);
							surv = Math.max(surv, 2);
							vigi = Math.max(vigi, 2);
							break;
						case "ferociousCreature":
							minionCS = ["athl", "braw", "perc", "surv", "vigi"];
							athl = Math.max(athl,2);
							braw = Math.max(braw,4);
							perc = Math.max(perc,2);
							surv = Math.max(surv,3);
							vigi = Math.max(vigi,1);
							updateChallenge(1,0,1);
							break;
						case "predatoryCreature":
							minionCS = ["braw", "coor", "perc", "surv", "stea"];
							braw = Math.max(braw,3);
							coor = Math.max(coor,3);
							perc = Math.max(perc,4);
							surv = Math.max(surv,2);
							stea = Math.max(stea,3);
							updateChallenge(1,0,1);
							break;
						case "territorialCreature":
							minionCS = ["braw", "resi", "surv", "vigi"];
							braw = Math.max(braw,2);
							resi = Math.max(resi,3);
							surv = Math.max(surv,4);
							vigi = Math.max(vigi,4);
							updateChallenge(0,0,2);
							break;
						case "soldier":
							minionCS = ["athl", "disc", "mele", "mell", "melh", "rang", "ranh", "ranl", "resi", "vigi"];
							athl = Math.max(athl,2);
							disc = Math.max(disc,1);
							mele = Math.max(mele,2);
							mell = Math.max(mell,2);
							melh = Math.max(melh,2);
							rang = Math.max(rang,2);
							ranl = Math.max(ranl,2);
							ranh = Math.max(ranh,2);
							resi = Math.max(resi,2);
							vigi = Math.max(vigi,2);
							updateChallenge(1,0,1);
							break;
						case "duelist":
							minionCS = ["cool", "coor", "mele", "mell", "stea"];
							cool = Math.max(cool,3);
							coor = Math.max(coor,3);
							mele = Math.max(mele,5);
							mell = Math.max(mell,5);
							stea = Math.max(stea,1);
							updateChallenge(1,0,0);
							break;
						case "scout":
							minionCS = ["cool", "perc", "rang", "ranh", "stea", "surv", "vigi"];
							cool = Math.max(cool,2);
							perc = Math.max(perc,3);
							rang = Math.max(rang,5);
							ranh = Math.max(ranh,5);
							stea = Math.max(stea,4);
							surv = Math.max(surv,3);
							vigi = Math.max(vigi,3);
							updateChallenge(2,0,2);
							break;
						case "brawler":
							minionCS = ["athl", "braw", "resi"];
							athl = Math.max(athl,3);
							braw = Math.max(braw,2);
							resi = Math.max(resi,2);
							break;
						case "gunslinger":
							minionCS = ["cool", "coor", "rang", "ranl", "skul"];
							cool = Math.max(cool,3);
							coor = Math.max(coor,2);
							rang = Math.max(rang,4);
							ranl = Math.max(ranl,4);
							skul = Math.max(skul,3);
							updateChallenge(1,0,0);
							break;
						case "sailor":
							minionCS = ["athl", "oper", "perc", "rang", "ranl", "vigi"];
							athl = Math.max(athl,2);
							oper = Math.max(oper,3);
							perc = Math.max(perc,2);
							rang = Math.max(rang,1);
							ranl = Math.max(ranl,1);
							vigi = Math.max(vigi,1);
							updateChallenge(0,0,1);
						case "spy":
							minionCS = ["cool","charm","dece","know","skul","stea"];
							cool = Math.max(cool,2);
							charm = Math.max(charm,3);
							dece = Math.max(dece,4);
							know = Math.max(know,1);
							skul = Math.max(skul,4);
							stea = Math.max(stea,3);
							updateChallenge(0,2,2);
							break;							
						case "thief":
							minionCS = ["coor","dece","mele","mell","skul","stea","stre","vigi"];
							coor = Math.max(coor,3);
							dece = Math.max(dece,2);
							mele = Math.max(mele,3);
							mell = Math.max(mell,3);
							skul = Math.max(skul,4);
							stea = Math.max(stea,5);
							stre = Math.max(stre,3);
							vigi = Math.max(vigi,1);
							updateChallenge(1,0,4);
							break;
						case "researcher":
							minionCS = ["astr","comp","disc","know","perc"];
							astr = Math.max(astr,5);
							comp = Math.max(comp,3);
							disc = Math.max(disc,2);
							know = Math.max(know,5);
							perc = Math.max(perc,4);
							updateChallenge(0,0,5);
							break;
						case "philosopher":
							minionCS = ["alch","know","medi","nego","perc"];
							alch = Math.max(alch,4);
							know = Math.max(know,4);
							medi = Math.max(medi,2);
							nego = Math.max(nego,1);
							perc = Math.max(perc,2);
							updateChallenge(0,0,3);
							break;
						case "doctor":
							minionCS = ["cool","disc","lead","medi","mele","mell"];
							cool = Math.max(cool,2);
							disc = Math.max(disc,2);
							lead = Math.max(lead,1);
							medi = Math.max(medi,4);
							mele = Math.max(mele,1);
							mell = Math.max(mell,1);
							updateChallenge(0,1,2);
							break;
						case "knight":
							minionCS = ["athl","disc","driv","lead","mele","melh","ridi"];
							athl = Math.max(athl,1);
							disc = Math.max(disc,2);
							driv = Math.max(driv,3);
							lead = Math.max(lead,3);
							mele = Math.max(mele,4);
							melh = Math.max(melh,4);
							ridi = Math.max(ridi,3);
							updateChallenge(1,2,2);
							break;
						case "captain":
							minionCS = ["astr","coer","disc","lead","mele","mell","oper","rang","ranl"];
							astr = Math.max(astr,4);
							coer = Math.max(coer,2);
							disc = Math.max(disc,3);
							lead = Math.max(lead,4);
							oper = Math.max(oper,4);
							rang = Math.max(rang,3);
							ranl = Math.max(ranl,3);
							updateChallenge(1,2,3);
							break;
						case "politician":
							minionCS = ["charm","coer","cool","lead","nego","vigi"];
							charm = Math.max(charm,4);
							coer = Math.max(coer,2);
							cool = Math.max(cool,2);
							lead = Math.max(lead,3);
							nego = Math.max(nego,5);
							vigi = Math.max(vigi,1);
							updateChallenge(0,3,1);
							break;
						case "mage":
							minionCS = ["alch","arca","coer","know"];
							alch = Math.max(alch,2);
							arca = Math.max(arca,4);
							coer = Math.max(coer,2);
							know = Math.max(know,4);
							updateChallenge(2,0,2);
							break;
						case "priest":
							minionCS = ["charm","disc","divi","know"];
							charm = Math.max(charm,2);
							disc = Math.max(disc,3);
							divi = Math.max(divi,4);
							know = Math.max(know,4);
							updateChallenge(2,1,2);
							break;						
						case "druid":
							minionCS = ["know","prim","surv","vigi"];
							know = Math.max(know,4);
							prim = Math.max(prim,4);
							surv = Math.max(surv,3);
							vigi = Math.max(vigi,2);
							updateChallenge(2,0,2);
							break;						
						case "pilot":
							minionCS = ["cool","coor","driv","pilo","rang","ranl","ridi"];
							cool = Math.max(cool,2);
							coor = Math.max(coor,3);
							driv = Math.max(driv,4);
							pilo = Math.max(pilo,4);
							rang = Math.max(rang,3);
							ranl = Math.max(ranl,3);
							ridi = Math.max(ridi,4);
							updateChallenge(1,0,3);
							break;						
						case "merchant":
							minionCS = ["charm","dece","nego","perc","vigi"];
							charm = Math.max(charm,2);
							dece = Math.max(dece,3);
							nego = Math.max(nego,3);
							perc = Math.max(perc,2);
							vigi = Math.max(vigi,3);
							updateChallenge(0,3,0);
							break;
						case "crimeBoss":
							minionCS = ["braw","coer","disc","lead","rang","ranl","stre"];
							braw = Math.max(braw,4);
							coer = Math.max(coer,5);
							disc = Math.max(disc,2);
							lead = Math.max(lead,2);
							rang = Math.max(rang,2);
							ranl = Math.max(ranl,2);
							stre = Math.max(stre,4);
							updateChallenge(2,3,1);
							break;
						case "bureaucrat":
							minionCS = ["cool","disc","know","nego","vigi"];
							cool = Math.max(cool,3);
							disc = Math.max(disc,3);
							know = Math.max(know,2);
							nego = Math.max(nego,2);
							vigi = Math.max(vigi,3);
							updateChallenge(0,3,1);
							break;
						case "mechanic":
							minionCS = ["athl","braw","comp","mech","resi"];
							athl = Math.max(athl,2);
							braw = Math.max(braw,1);
							comp = Math.max(comp,1);
							mech = Math.max(mech,4);
							resi = Math.max(resi,3);
							updateChallenge(0,0,3);
							break;
						case "hacker":
							minionCS = ["comp","cool","dece","stre"];
							comp = Math.max(comp,5);
							cool = Math.max(cool,2);
							dece = Math.max(dece,2);
							stre = Math.max(stre,2);
							updateChallenge(0,1,3);
							break;
						case "criminal":
							minionCS = ["braw","coer","resi","skul","stre"];
							braw = Math.max(braw,2);
							coer = Math.max(coer,3);
							resi = Math.max(resi,3);
							skul = Math.max(skul,3);
							stre = Math.max(stre,2);
							updateChallenge(0,1,2);
							break;
						case "investigator":
							minionCS = ["charm","coer","disc","perc","stre","surv","vigi"];
							charm = Math.max(charm,2);
							coer = Math.max(coer,2);
							disc = Math.max(disc,3);
							perc = Math.max(perc,3);
							stre = Math.max(stre,3);
							surv = Math.max(surv,3);
							vigi = Math.max(vigi,3);
							updateChallenge(0,2,3);
							break;
						case "wrangler":
							minionCS = ["athl","coor","perc","rang","ranl","ridi","surv"];
							athl = Math.max(athl,4);
							coor = Math.max(coor,2);
							perc = Math.max(perc,3);
							rang = Math.max(rang,2);
							ranl = Math.max(ranl,2);
							ridi = Math.max(ridi,3);
							surv = Math.max(surv,4);
							updateChallenge(0,0,3);
						case "cop":
							minionCS = ["coer","driv","lead","mele","mell","rang","ranl"];
							coer = Math.max(coer,2);
							driv = Math.max(driv,2);
							lead = Math.max(lead,2);
							mele = Math.max(mele,2);
							mell = Math.max(mell,2);
							rang = Math.max(rang,2);
							ranl = Math.max(ranl,2);
							updateChallenge(1,1,0);
							break;
						
						default:
					}
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
				console.log(minionCS);
				parseCS();
				console.log(skillsCS);
				makeActor();
				
			}
			
			
		}
}).render(true);