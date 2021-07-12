var chars;
var challenge = [0,0,0];
var makeAdv;
var WT=0;
let ST=0;
let soak=0;
let mDef=0;
let rDef=0;
var isMinion;
var advType;
var alch=0,astr=0,athl=0,comp=0,cool=0,coor=0,disc=0,driv=0,mech=0,medi=0,oper=0,perc=0,pilo=0,resi=0,ridi=0,skul=0,stea=0,stre=0,surv=0,vigi=0;
var arca=0,divi=0,prim=0;
var braw=0,gunn=0,mell=0,melh=0,mele=0,rang=0,ranl=0,ranh=0;
var char=0,coer=0,dece=0,lead=0,nego=0;
var know=0;

var minionCS = [];

async function fillChars(bra,agi,intel,cun,wil,pre) {
    chars = [bra,agi,intel,cun,wil,pre];
}

async function updateChallenge(com,soc,gen) {
	challenge[0] += com;
	challenge[1] += soc;
	challenge[2] += gen;
}

let dialogEditor = new Dialog({
    title: `Adversary Generator`,
    content: `
        <form>
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
			// do the thing
			
			if (makeAdv) {
			
				let chosenArray = html.find('[name="charArray"]')[0].value;
				let chosenDef = html.find('[name="defType"]')[0].value;
				let chosenDef2 = html.find('[name="defType2"]')[0].value;
				let chosenSkills1 = html.find('[name="skillPack"]')[0].value;
				let chosenSkills2 = html.find('[name="skillPack2"]')[0].value;
				let chosenSkills3 = html.find('[name="skillPack3"]')[0].value;
				isMinion = html.find('[name="minion"]')[0].checked;
				let isRival = html.find('[name="minion"]')[1].checked;
				let isNemesis = html.find('[name="minion"]')[2].checked;
				
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
				
				soak = chars[0];
				
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
							if (isMinion)
								minionCS = ["athl", "braw", "surv", "vigi"];
							else {
								athl = Math.max(athl,1);
								braw = Math.max(braw,1);
								surv = Math.max(surv, 2);
								vigi = Math.max(vigi, 2);
							}
							break;
						case "ferociousCreature":
							if (isMinion)
								minionCS = ["athl", "braw", "perc", "surv", "vigi"];
							else {
								athl = Math.max(athl,2);
								braw = Math.max(braw,4);
								perc = Math.max(perc,2);
								surv = Math.max(surv,3);
								vigi = Math.max(vigi,1);
							}
							break;
						case "predatoryCreature":
							if (isMinion)
								minionCS = ["braw", "coor", "perc", "surv", "stea"];
							else {
								braw = Math.max(braw,3);
								coor = Math.max(coor,3);
								perc = Math.max(perc,4);
								surv = Math.max(surv,2);
								stea = Math.max(stea,3);
							}
							break;
						case "territorialCreature":
							if (isMinion)
								minionCS = ["braw", "resi", "surv", "vigi"];
							else {
								braw = Math.max(braw,2);
								resi = Math.max(resi,3);
								surv = Math.max(surv,4);
								vigi = Math.max(vigi,4);
							}
							break;
						case "soldier":
							if (isMinion)
								minionCS = ["athl", "disc", "mele", "mell", "melh", "rang", "ranh", "ranl", "resi", "vigi"];
							else {
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
							}
							break;
						case "duelist":
							if (isMinion)
								minionCS = ["cool", "coor", "mele", "mell", "stea"];
							else {
								cool = Math.max(cool,3);
								coor = Math.max(coor,3);
								mele = Math.max(mele,5);
								mell = Math.max(mell,5);
								stea = Math.max(stea,1);
							}
							break;
						case "scout":
							if (isMinion)
								minionCS = ["cool", "perc", "rang", "ranh", "stea", "surv", "vigi"];
							else {
								cool = Math.max(cool,2);
								perc = Math.max(perc,3);
								rang = Math.max(rang,5);
								ranh = Math.max(ranh,5);
								stea = Math.max(stea,4);
								surv = Math.max(surv,3);
								vigi = Math.max(vigi,3);
							}
							break;
						case "brawler":
							if (isMinion)
								minionCS = ["athl", "braw", "resi"];
							else {
								athl = Math.max(athl,3);
								braw = Math.max(braw,2);
								resi = Math.max(resi,2);
							}
							break;
						case "gunslinger":
							if (isMinion)
								minionCS = ["cool", "coor", "rang", "ranl", "skul"];
							else{
								cool = Math.max(cool,3);
								coor = Math.max(coor,2);
								rang = Math.max(rang,4);
								ranl = Math.max(ranl,4);
								skul = Math.max(skul,3);
							}
							break;
						case "sailor":
						if (isMinion)
								minionCS = ["athl", "oper", "perc", "rang", "ranl", "vigi"];
							else {
								athl = Math.max(athl,2);
								oper = Math.max(oper,3);
								perc = Math.max(perc,2);
								rang = Math.max(rang,1);
								ranl = Math.max(ranl,1);
								vigi = Math.max(vigi,1);
							}
							
						default:
					}
				}
							
				if (isMinion) {console.log("Minion");}
				if (isRival) {console.log("Rival");}
				if (isNemesis) {console.log("Nemesis");}
				console.log("Characteristic Array: " + chars);
				console.log("Challenge: " + challenge);
				console.log("Soak: " + soak);
				console.log("WT: " + WT);
				console.log("ST: " + ST);
				console.log("Melee Defense: " + mDef);
				console.log("Ranged Defense: " + rDef);
				console.log("Athletics: " + athl);
				console.log("Brawl: " + braw);
			}
		}
}).render(true);
