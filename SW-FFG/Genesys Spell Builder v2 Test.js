if (token) {

// ** CHANGE THIS to the name of your magic skill **
const skillToUse = `Arcana`;

const mActor = token.actor;

// ** CHANGE THIS to the name of the knowledge skill used for magic **
let knowledgeSkill = `Knowledge(Lore)`;
for (let t of mActor.itemTypes.talent) {
	if (t.name == "Dark Insight") knowledgeSkill = `Knowledge(Forbidden)`;
	else if (t.name == "Natural Insight") knowledgeSkill = `Knowledge(Natural)`;
}

// define variables used

var knowledge = mActor.data.data.attributes[knowledgeSkill].value;
const skill = mActor.data.data.skills[skillToUse];
const stat = mActor.data.data.attributes[skill.characteristic];
var addedDiff = '';
var dmgBonus = 0;
var activeMods = [];
var spellMods, spellInfo;
var freeEffects = [];
var disabledEffects = [];
const spellRanges = ['Engaged','Short','Medium','Long','Extreme'];

// check gear for magic implements
const gear = mActor.items.filter(i=>i.type=="gear" && i.data.data.description.includes(`[implement]`))


// get bonuses from implement
// implement description must have: [implement] and [+X], where X is damage bonus
// if there are free effects, must have: ['Effect Name']



	

/*
if (gear.includes("Magic Staff")) dmgBonus = 4;
else if (gear.includes("Magic Wand")) dmgBonus = 3;
else if (gear.includes("Magic Scepter")) dmgBonus = 2; */

// define dice symbol shorthand
const pr = `<span class='dietype starwars proficiency'>c</span>`
const di = `<span class='dietype starwars difficulty'>d</span>` 
const su = `<span class='dietype genesys success'>s</span>`
const ad = `<span class='dietype genesys advantage'>a</span>`
const se = `<span class='dietype starwars setback'>b</span>`
const bo = `<span class='dietype starwars boost'>b</span>`
const th = `<span class='dietype genesys threat'>h</span>`
const de = `<span class='dietype genesys despair'>d</span>`
const fa = `<span class='dietype genesys failure'>f</span>`
const tr = `<span class='dietype genesys triumph'>t</span>`
const ab = `<span class='dietype starwars ability'>d</span>`

let attackInfo = {
	name: 'Attack',
	desc: `<b>Range: </b> Short (not engaged)<p>Attack has no set Critical rating; must use a ${tr} to inflict Critical.<p>Base Damage: ${stat.value + dmgBonus}, +1 per uncanceled ${su}<br>(casting stat + implement bonus)`,
	diff: 1,
	callback: (html) => {spellMods=attackMods;spellInfo=attackInfo;},
	skills: ['Arcana','Divine','Primal'],
	range: 1
}
let areaInfo = {
	name: 'Area',
	desc: `<b>Range: </b>Medium<p><b>Concentration</b><p> If successful, until end of next turn, all terrain within short range of target point is considered difficult terrain.`,
	diff: 2,
	callback: (html) => {spellMods=areaMods;spellInfo=areaInfo;},
	skills: ['Arcana','Divine','Primal'],
	range: 2
}
let augmentInfo = {
	name: 'Augment',
	desc: `<b>Range: </b>Engaged or Self<p><b>Concentration</b><p> If successful, until end of next turn, target increases ability of all skill checks by one. (in effect, add +${ab})`,
	diff: 2,
	callback: (html) => {spellMods=augmentMods;spellInfo=augmentInfo;},
	skills: ['Divine','Primal','Verse'],
	range: 0
}
let barrierInfo = {
	name: 'Barrier',
	desc: `<b>Range: </b>Engaged or Self<p><b>Concentration</b><p> If successful, until end of next turn, reduce damage of all hits the target suffers by one, plus one per uncanceled ${su + su} beyond the first.`,
	diff: 1,
	callback: (html) => {spellMods=barrierMods;spellInfo=barrierInfo;},
	skills: ['Arcana','Divine'],
	range: 0
}
let conjureInfo = {
	name: 'Conjure',
	desc: `<b>Range: </b>Engaged<p><b>Concentration</b><p>If successful, target summons a simple tool with no moving parts, a one-handed melee weapon with no moving parts, or a minion no bigger than Silhouette 1. This appaers engaged with caster, and remains until end of caster's next turn.<p>If creature, it behaves in the best approximation of its natural instincts. It is not controlled by caster, and may even be hostile to them. It takes its turn immediately after caster.`,
	diff: 1,
	callback: (html) => {spellMods=conjureMods;spellInfo=conjureInfo;},
	skills: ['Arcana','Primal'],
	range:0
}
let curseInfo = {
	name: 'Curse',
	desc: `<b>Range: </b>Short<p><b>Concentration</b><p> If successful, until end of next turn, target decreases ability of all checks by one (in effect, remove ${ab} or downgrade).`,
	diff: 2,
	skills: ['Arcana','Divine','Verse'],
	callback: (html) => {spellMods=curseMods;spellInfo=curseInfo;},
	range:1
}
let dispelInfo = {
	name: 'Dispel',
	desc: `<b>Range: </b>Short<p>Select one target within short range that is under effects of a spell. If successful, the spell effects end immediately.`,
	diff: 3,
	skills: ['Arcana','Verse'],
	callback: (html) => {spellMods=dispelMods;spellInfo=dispelInfo;},
	range:1
}
let healInfo = {
	name: 'Heal',
	desc: `<b>Range: </b>Engaged<p>Select one engaged target who is not incapacitated. If successful, heal 1 wound per uncanceled ${su} and 1 strain per uncanceled ${ad}.`,
	diff: 1,
	skills: ['Divine','Primal','Verse'],
	callback: (html) => {spellMods=healMods;spellInfo=healInfo;},
	range:0
}
let maskInfo = {
	name: 'Mask',
	desc: `<b>Range: </b>Short<p><b>Concentration</b><p>If successful, create illusion of a creature or object of Silhouette 1 or smaller. It appears within short range. Alternatively, the illusion changes the apperance of the caster or one Silhouette 1 (or smaller) target they are engaged with. The illusion cannot obscure the basic size and shape of target.<p>Illusions can generate light and sound, but cannot cause harm or interact with their environment in any way. They can be animated and move, as long as they are in range of the spell.<p>A keen observer can attempt to spot the false nature of an illusion with an <b>Average (${di+di}) Vigilance check</b> (or Perception, if they suspect they are being fooled), recognizing the illusion's nature upon success.`,
	diff:1,
	skills: ['Arcana','Verse'],
	callback: (html) => {spellMods=maskMods;spellInfo=maskInfo;},
	range:1
}
let mindInfo = {
	name: 'Mind',
	desc: `<b>Range:</b> Engaged<p>If successful, learn the simple surface thoughts of the target. The GM will determine what those thoughts are. The info may not be words that are easy to decipher, but could instead be feelings or flashes of imagery. At the end of spell's duration, target becomes aware they were under the effect of a spell, though not necessarily who cast it. They are aware someone is doing something to their mind, but how much they understand depends on the setting and the target.`,
	diff: 3,
	skills: ['Verse'],
	callback: (html) => {spellMods=mindMods;spellInfo=mindInfo;},
	range:0
}
let moveInfo = {
	name: 'Move',
	desc: `<b>Range:</b> Short<p><b>Concentration</b><p> Select target of Silhouette 0 or 1 (or self). If successful, move the target in one direction toward or away from your character up to one range band per uncanceled ${su+su}.`,
	diff: 1,
	skills: ['Arcana'],
	callback: (html) => {spellMods=moveMods;spellInfo=moveInfo;},
	range:1
}
let predictInfo = {
	name: 'Predict',
	desc: `Ask one question about events that will unfold in the next 24 hours. If successful, GM must provide a truthful answer. However, the answer could be one that can be interpreted in multiple ways or is somewhat enigmatic. Whether the check succeeds or fails, the character may not make another prediction check about the same events for the remainder of the session.`,
	diff: 2,
	skills: ['Divine','Verse'],
	callback: (html) => {spellMods=predictMods;spellInfo=predictInfo;},
}
let transformInfo = {
	name: 'Transform',
	desc: `<b>Range: </b>Engaged (Self)<p><b>Concentration</b><p>If successful, caster transforms into a Silhouette 0 animal. It must be a natural creature, subject to GM approval. <p> While transformed, adopt the physical appearance of the animal and gain the animal's characteristics, soak, wound threshold, and defense. The caster also gains the animal's abilities, equipment, and attacks.<p>Caster retains their own skills, talents, and strain threshold. They drop any gear they were carrying or wearing when they transformed.<p>If incapacitated, caster reverts back to normall form, healing all wounds suffered while transformed, but they do not heal any strain or Critical Injuries they suffered while transformed. If they were incapacitated while transformed, they are no longer incapacitated.`,
	diff: 2,
	skills: ['Primal'],
	callback: (html) => {spellMods=transformMods;spellInfo=transformInfo;}
}

var spellsList = [areaInfo,attackInfo,augmentInfo,barrierInfo,conjureInfo,curseInfo,dispelInfo,healInfo,maskInfo,mindInfo,moveInfo,predictInfo,transformInfo];

// spellMods[0] = 'Name'
// spellMods[1] = 'Description'
// spellMods[2] = difficulty (integer, optional)
// spellMods[3] = activationCost (integer, optional)
// spellMods[4] = 'NameNoSpace' (serves as ID)
// spellMods[5] = (optional: if exclusive to a skill)'Skill'

// EXAMPLE: ['Blast',`Blast ${knowledge}`,1,2,,]

let attackMods = [['Blast',`Blast ${knowledge}`,1,2],['Close',`Engaged range`,1],['Deadly',`Crit 2, Vicious ${knowledge}`,1],['Fire',`Burn ${knowledge}`,1,2],[`Holy`,`Each ${su} is +2 dmg vs bane`,1,,,'Divine'],['Ice',`Ensnare ${knowledge}`,1,2],['Impact',`Knockdown, Disorient ${knowledge}` ,1,2],['Lightning',`Stun ${knowledge}, Auto-Fire`,1,2],['Manipulative',`Move target 1 band`,1,1],['Non-Lethal',`Stun Damage`,1],['Range',`+1 Range Band`,1],['Destructive',`Sunder, Pierce ${knowledge}`,2],['Empowered',`+${stat.value} damage (increase blast to short)`,2],['Poisonous',`Save (${di+di+di}) Resilience, ${knowledge} Wounds/Strain`,2]];

let areaMods = [['Reverse',`Turn difficult terrain into normal terrain, or impassable into difficult.`,1],['Concealment',`Create ${knowledge} concealment`,1],['Entangle',`Must make Average (${di + di}) Athletics or Coordination (GM choice) to move thru; caster can spend ${ad} to add ${se} to check`,1],['Range',`+1 range band`,1],['Size',`Area size is +1 range band`,1],['Wall',`Area becomes impassible`,2],['Dangerous Atmosphere',`Choose fire, acid, or corrosive. Area has that atmosphere, rating equal to ${su}`,2,,'DangerousAtmosphere']];

let augmentMods = [['Divine Health',`Increase WT by ${knowledge} for duration`,1,,'DivineHealth','Divine'],['Haste',`Can perform 2nd maneuver (but still max 2/turn)`,1],['Primal Fury',`Add +${knowledge} to unarmed attacks, and gain Crit 3`,1,,'PrimalFury','Primal'],['Range',`+1 range band`,1],['Swift',`Ignore difficult terrain, cannot be immobilized`,1,1],['Additional Target',`One extra target, plus one per ${ad} spent`,2,,'AdditionalTarget']];

let barrierMods = [['Range',`+1 range band`,1],['Additional Target', `One extra target, plus one per ${ad} spent`,1,,'AdditionalTarget'],['Add Defense',`Target gains +${knowledge} melee/ranged defense`,2,,'AddDefense'],['Empowered',`Reduce damage per ${su} (instead of ${su+su})`,2],['Sanctuary', `Opponents automatically disengage, and may not engage for duration`,2,,,'Divine'],['Reflection',`Spend ${th+th+th} or ${de} from opponent's ranged weapon/spell attack to have opponent take damage from attack. Cannot use Additional Target`,3,,,'Arcana'],['Reinforced',`Target's soak immune to Pierce and Breach`,3]]

let conjureMods = [['Additional Summon',`Summon 1 more item, plus one extra per ${ad+ad}`,1,'AdditionalSummon'],['Medium Summon',`Complicated tool (with moving parts), rival up to Silhouette 1, or two-handed melee weapon`,1,,'MediumSummon'],['Range',`+1 range band`,1],['Greater Summon',`Rival or animated object up to Silhouette 2; cannot use Additional Summon`,2,,'GreaterSummon'],['Summon Ally',`Summoned creature is friendly, obeys commands. Spend maneuver to direct (determine its action and maneuver)`,2,,'SummonAlly'],['Grand Summon', `Rival or animated object up to Silhouette 3; cannot use Additional summon`,3,,'GrandSummon','Primal']]

let curseMods = [['Enervate',`If target suffers strain, suffers +1 strain`,1],['Marked',`Attacks against target do +1 damage`,1],['Misfortune',`After target makes check, change one ${se} to a face displaying ${fa}`,1],['Range',`+1 range band`,1],['Slow',`Target must spend 2 maneuvers to move a range band`,1],['Additional Target',`One extra target, plus one per ${ad+ad} spent`,2,,'AdditionalTarget'],['Despair',`Target's WT and ST reduced by ${knowledge}; cannot use Additional Target`,2,,,'Divine'],['Doom',`After target makes check, change any die not displaying ${tr} or ${de} to a different face`,2,,,'Arcana'],['Paralyzed',`Target is staggered; cannot use Additional Target`,3]];

let dispelMods = [['Range',`+1 range band`,1],['Additional Target',`One extra target, plus one per ${ad} spent`,1,,'AdditionalTarget'],['Nullify',`Remove a magic item's magical properties for ${knowledge} rounds`,2]]

let healMods = [['Additional Target',`One extra target, plus one per ${ad} spent`,1,,'AdditionalTarget'],['Range',`+1 range band`,1],['Restoration',`End one ongoing status effect (disoriented, staggered, immobilized, poisoned)`,1],['Heal Critical',`Heal one critical injury`,2,,'HealCritical'],['Reciprocal Heal',`Caster also heals the same amount of wounds/strain as target`,2,,'ReciprocalHeal'],['Revive Incapacitated',`Can target incapacitated character`,2,,'ReviveIncapacitated'],['Transferrence',`Caster can suffer up to ${knowledge} strain to heal 1 extra wound per strain`,2],['Resurrection',`Can target character who died during this encounter. On success, target has wounds equal to WT; if failure, no more attempts allowed`,4,,,'Divine']]

let maskMods = [['Additional Illusion',`Create one extra illusion, plus one per ${ad+ad} spent`,1,,'AdditionalIllusion'],['Blur',`Add ${th} to combat checks against character`,1],['Mirror Image',`Create multiple images. Target may spend ${th+th+th} or ${de} from combat checks targeting them to have the attack harmlessly hit mirror image instead`,1,,'MirrorImage'],['Range',`+1 range band`,1],['Realism',`+1 difficulty to determine false nature of illusion, +1 extra per ${ad+ad} spent. Can also fool smell, taste, or touch`,1],['Size',`+1 Silhouette`,1],['Disguise',`Alter target's entire appearance. Can spend ${ad+ad} to alter sounds or smells as well`,2],['Terror',`Characters who don't know it's an illusion make <b>Hard (${di+di+di}) Discipline</b> (Fear) check. Suffer 2 strain per ${th} and, if failure, unable to approach illusion`,2],['Invisibility',`Target becomes invisible`,3]]

let mindMods = [['Gentle',`Target unaware`,1],['Intense Emotions',`Target filled with overwhelming emotion; may spend ${tr} to downgrade target's social checks once for duration`,1,,'IntenseEmotions'],['LearnMotivation',`Learn one fear, flaw, strength, or desire of GM's choice`,1,,'LearnMotivation'],['Range',`+1 range band`,1],['Learn Memory',`Experience one relevant memory of target, GM choice`,1,,'LearnMemory'],['Guide',`Target performs incidental of your choosing`,2],['Modify Memory',`Target forgets up to 1 hour per uncanceled ${su}. Can spend ${tr} to implant a different memory in its place`,2,,'ModifyMemory'],['Strain Attack',`Target suffers 1 strain per uncancelled ${su}`,2,,'StrainAttack'],['Dominate',`You determine target's next action and maneuvers. Must be defined when spell is cast`,3]]

let moveMods = [['Additional Target',`One extra target, plus one per ${ad}`,1,,'AdditionalTarget'],['Range',`+1 range band`,1],['Size',`+1 Silhouette`,1],['Levitate',`Target hovers 1ft (~30cm) for duration`,1],['Adversary',`Target can be unwilling; upgrade check once for every rank in Athletics`,2],['Teleport',`Target does not move through path, but instead instantly appears; cannot appear inside something (appear on other side instead)`,2]]

let predictMods = [['Quicksilver Reflexes',`Instead of asking question, add ${su+su} to Initiative checks next encounter`,0,,'QuicksilverReflexes'],['Scry',`Instead of asking question, learn location of one known Silhouette 0 object within long range`,1],['Empowered',`Ask about events within next 7 days`,1],['Additional Questions',`One extra question, plus one per ${ad+ad}`,1,,'AdditionalQuestions'],['Flash of Precognition',`Add ${su} to results of a check before end of encounter. Also, may add ${fa} to results of check targeting caster. Or may spend ${ad+ad+ad} to add ${su+su} or ${fa+fa} instead`,2,,'FlashofPrecognition'],['Cheat Death',`Forsee possible doom for caster within next 24 hours. Once before end of session, if caster is incapacitated orkilled, spend story point to set wounds/strain to WT and ST instead`,2,,'CheatDeath']]

let transformMods = [['Silhouette Increase',`+1 silhouette`,1,,'SilhouetteIncrease'],['Characteristic Retention',`Caster retains Intellect and Willpower while transformed`,1,,'CharacteristicRetention'],['Transform Gear',`Worn gear & wielded items change into natural markings (no benefit); when revert, gear is equipped as normal`,1,,'TransformGear'],['Dire Form',`+3 attack damage, +1 soak, +6 WT, +1 silhouette`,1,,'DireForm'],['Curse of the Wild',`Can target adversary instead of self`,3,,'CurseoftheWild']]


let y = "";
// let implementList = gear.reduce((acc, val,i) => acc += `<option value="${gear[i].id}">${gear[i].name}</option>`);
for (let g of gear) {
	y += `<option value="${g.id}">${g.name}</option>`
}

let firstDialogContent = `
	<center><label>Implement: </label><center>
	<select id="implement" name= "implement">
		${y}
	</select><br><br>`

// show spell selection menu and wait for response
await new Promise(resolve => {	
    let dialog = new Dialog({
        title: `${skill.value} Spells`,
		content: firstDialogContent,
        buttons: makeButtons(skill.value),
		close: (html) => {
			let chosenImplementId = html.find('[name="implement"]')[0].value;
			let g = mActor.getEmbeddedDocument("Item",chosenImplementId);
			getImplementBonuses(g);
			resolve(html); }
    },{width: 600, height: "auto"}).render(true);
});

attackInfo.desc = `<b>Range: </b> Short (not engaged)<p>Attack has no set Critical rating; must use a ${tr} to inflict Critical.<p>Base Damage: ${stat.value + dmgBonus}, +1 per uncanceled ${su}<br>(casting stat + implement bonus)`;

// if a spell was chosen
if (spellMods) {

	// jquery
	$(document).ready(function(){
		// update difficulty display based on chosen effects
		$('.spellBox input[type="checkbox"]').click(function(){
			if($(this).prop("checked") == true) {
				if (getData(this.id,spellMods)[2] == 0) addedDiff = ``;
				else if (this.id == "range2" || this.id == "range3") addedDiff = `${di}`;
				else if (this.id == "size2" || this.id == "size3") addedDiff = `${di}`;
				else if (this.id == "sil2" || this.id == "sil3") addedDiff = `${di}`;
				else if (getData(this.id,spellMods)[2] == 1) addedDiff = `${di}`;
				else if (getData(this.id,spellMods)[2] == 2) addedDiff = `${di+di}`;
				else if (getData(this.id,spellMods)[2] == 3) addedDiff = `${di+di+di}`;
				else if (getData(this.id,spellMods)[2] == 4) addedDiff = `${di+di+di+di}`;
				else addedDiff = '';
				 $(".diffTracker").append(`<span class="${this.id}">${addedDiff}</span>`);
			} else {
				$(`.${this.id}`).remove();
			}
		});
	});

	let checkBoxes = makeCheckBoxes(spellMods);

	let dialogContent = `
		<style>
			.spellDesc {
				border-style: outset;
				border-width: thin;
				border-color: black;
				padding: 10px;
				font-size: 13px;
			} </style>
		<center><div class='spellDesc'>${spellInfo.desc}</div><br><h2>Total Difficulty:<span class="diffTracker">${difficulty(spellInfo.diff)}</span></h2></center><br>
		<form class="spellBox"><table style="text-align:center" border="solid"><th>Free</th><th>Add</th><th>Effect</th><th>Description</th><th>Difficulty</th>
			${checkBoxes} </table></form>`
		
		new Dialog({
			title: `${spellInfo.name} Options`,
			content: dialogContent,
			buttons: {
				cast: {
					label: "Cast",
					callback: (html) => createSpell(html)
				}
			},
		},{width: 600, height: "auto",jQuery:true}).render(true);

}

// create spell
async function createSpell(html) {
	// get used effects
	let data;
	let difficulty = spellInfo.diff;
	let areChecked = document.getElementsByName('myCheckboxes');
	for (let c of areChecked) {
		if (c.checked) {
			if (c.id != "range2" && c.id != "range3" && c.id != "size2" && c.id != "size3" && c.id != "sil2" && c.id != "sil3") {
				data = getData(c.id,spellMods);
				activeMods.push([data[1],data[3],data[2],data[0]]);
			} else if (c.id == "range2" || c.id == "range3" ){
				activeMods.push([`+1 range rand`,,1,'Range']);
			} else if (c.id == "size2" || c.id == "size3" ) {
				activeMods.push([`+1 size of effect`,,1,'Size']);
			} else if (c.id == "sil2" || c.id == "sil3" ) {
				activeMods.push([`+1 silhouette`,,1,'Silhouette Increase']);
			}
		}
		
	}
	let areCheckedFree = document.getElementsByName('myFreeCheckboxes');
	for (let c of areCheckedFree) {
		if (c.checked) {data = getData(c.id.slice(4),spellMods);
		activeMods.push([data[1],data[3],0,data[0]]);}
	}
	
	// add empowered damage bonus
	
	for (let a of activeMods) { 
		difficulty += a[2];
		if (a[0].includes("blast to short")) dmgBonus += stat.value;
	}
	
	
	// dice pool builder dialog
	await new Promise(async resolve => {
		await game.ffg.DiceHelpers.rollSkillDirect(skill,stat,difficulty);
		resolve();
	});

	// create chat message with spell data
	let message = createMessageData(activeMods);
	await ChatMessage.create({
		speaker: {alias: spellInfo.name},
		content: message
	});
	
	/*
	// deduct 2 strain from caster if PC or Nemesis
	// otherwise deduct 2 wounds
	if (mActor.hasPlayerOwner || mActor.data.data.stats.strain.max > 5)
		await mActor.update({"data.stats.strain.value": mActor.data.data.stats.strain.value+2});
	else await mActor.update({"data.stats.wounds.value": mActor.data.data.stats.wounds.value+2});
	*/
}

// convert num (integer) into string of difficulty symbols
function difficulty(num) {
	let str = `<span class='dietype starwars difficulty'>`;
	for (let i=0;i<num;i++) {
		str += 'd';
	}
	str += `</span>`;
	return str;
}

// create chat message data for chosen spell + effects
function createMessageData(arr) {
	// a[0]: effect name
	// a[1]: effect cost
	
	let str = spellInfo.desc;
	if (arr.length>0) {
		let cost = '';
		if (spellInfo.name=='Attack') {
		
			str += `<table style="text-align:center" border="solid"><tr><th>Effects</th><th>Activation</th></tr>`;
			for (let a of arr) {
				if (a[1]) {
					cost = `(`
					for (let i=0; i<a[1];i++) {
						cost += `${ad}`;
					}
					cost += `)`
				} else cost = ` `;
				str += `<tr><td>${a[0]}</td><td>${cost}</td></tr>`;
			}
			
		} else {
			str += `<table style="text-align:center" border="solid"><tr><th>Effects</th></tr>`
			for (let a of arr) {
				str += `<tr><td>${a[0]}</td></tr>`
			}
		}
		str += `</table>`;
	}
	return str;
}

// get the data for a specific spell mod
function getData(name,arr) {
	let nameNoSpace = name.replace(/\s/g, '');
	for (let i of arr) {
		if (i.includes(nameNoSpace)) return i;
	}
	return 0;
}

// make checkboxes based on chosen spell
function makeCheckBoxes(arr) {
	let checkBoxes = '';
	let multiples;
	for (let mod of arr) {
		let check="";
		let disabled="";
		if (!mod[5] || mod[5] == skill.value) {
			if (mod[0] == 'Range') {
				multiples = `<input class='spellBox' type="checkbox" name="myCheckboxes" id="range2" value="range2"><input class='spellBox' type="checkbox" name="myCheckboxes" id="range3" value="range3">`
			} else if (mod[0] == 'Size') {
				multiples = `<input class='spellBox' type="checkbox" name="myCheckboxes" id="size2" value="size2"><input class='spellBox' type="checkbox" name="myCheckboxes" id="size3" value="size3">`
			} else if (mod[0] == 'Silhouette Increase') {
				multiples = `<input class='spellBox' type="checkbox" name="myCheckboxes" id="sil2" value="sil2"><input class='spellBox' type="checkbox" name="myCheckboxes" id="sil3" value="sil3">`
			} else	multiples = ``;
			let modNoSpace = mod[0].replace(/\s/g, '');
			for (let f of freeEffects) {
				if (mod[0] == f) check="checked";
			}
			for (let f of disabledEffects) {
				if (mod[0] == f) disabled="disabled";
			}
			checkBoxes += `	
				<tr><td><input class='freeSpellBox' type="checkbox" name="myFreeCheckboxes" id="${'free'+modNoSpace}" value = "${'free'+modNoSpace}" ${check} ${disabled}></td><td>
				<input class='spellBox' type="checkbox" name="myCheckboxes" id="${modNoSpace}" value="${modNoSpace}" ${disabled}>${multiples}</td>
				<td><b>${mod[0]}</b></td><td>${mod[1]}</td> <td>+${difficulty(mod[2])}</td>
				</tr>`;
		}
	}
	return checkBoxes;
}

// return array of buttons to populate dialog based on spells available to caster
function makeButtons(magicSkill) {
	let buttons = {};
	for (let spell of spellsList) {
		if (spell.skills.includes(magicSkill)) {
			buttons[spellsList.indexOf(spell)] = {
				label: spell.name,
				id: spell.name,
				callback: spell.callback
			}
		}
	}
	return buttons;
}

function getImplementBonuses(g) {
	// calc damage bonus, if any
	 let bonus = (g.data.data.description.match(/(\[\+)\d*/g));
	 if (bonus) {
		dmgBonus = parseInt(bonus[0].slice(2));
	 }
	
	let effMatches = (g.data.data.description.match(/(\['\w+\s?\w+'\])/g));
	if (effMatches) {
		for (let e of effMatches) {
		
			freeEffects.push(e.slice(2,e.length-2));
		}
	}
		
}


}