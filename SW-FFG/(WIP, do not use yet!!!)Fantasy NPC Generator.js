// index the appropriate packs, if they aren't already

game.packs.filter(i=>i.collection.includes("Genesys") && !i.indexed).forEach(async f=> await f.getIndex());

// define dice symbols

var actorToMake = new Actor({name:'Temp',type:"character"}).toObject();

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

const melee = `GenesysFantasyEquipment.FantasyMelee`;
const armor = `GenesysFantasyEquipment.FantasyArmor`;
const ranged = `GenesysFantasyEquipment.FantasyRanged`;

// define some kit lists

const oneHandMelee = ["Sword","Axe","Mace","Military Pick","Scimitar","Spear",`Spear, Light (Javelin)`];
const twoHandMelee = ["Flail","Greataxe","Greatsword","Halberd","War Hammer","Staff"];
const shields = ["Shield", `Shield, Large`];
const brawl = ["Cestus", "Katar"];
const rogueMelee = ["Dagger", "Mace", "Blackjack"];
const bows = ["Bow","Crossbow","Longbow",`Crossbow, Heavy`];
const oneHandRanged = ["Bola", "Sling", "Throwing Axe", `Crossbow, Hand`];
const lightArmor = ["Brigandine","Heavy Robes","Leather","Padded"];
const heavyArmor = ["Chainmail", "Plate", "Scale"];
const magicImplements = ["Magic Staff", "Magic Wand", "Magic Scepter"];
const miscGear = ["Stamina Elixir", `Torches (3)`, "Utility Belt", "Rope", "Herbs of Healing", "Bottled Courage", "Health Elixir", "Ball Bearings", `Trail Rations (1 day)`, "Regeneration Elixir"];

// array of ['Name',br,ag,in,cu,wi,pr]
const humanoidArrays = [['Average Person',2,2,2,2,2,2],['Tough Person',3,2,2,2,2,1],['Smart Person',1,2,3,2,2,2],['Sociable Person',2,2,2,2,1,3],['Jack of All Trades',3,3,3,3,3,3],['Skilled Warrior',4,3,2,2,3,1],['Savant',2,1,2,5,2,1],['Leader',2,2,3,2,3,5],['Cunning Foe',2,4,4,2,2,2],['Mastermind',3,3,4,4,5,3]];

const beastArrays = [['Small Creature',1,2,3,1,1,1],['Large Creature',4,2,2,1,1,1],['Stealthy Creature',2,3,3,1,1,1],['Huge Creature',5,1,1,1,1,1]];

// ['name', ['skillName',skillRank],['skillName2',skillRank2], ...]
const skillPacks = [['Basic Creature',['Athletics',1],['Brawl',1],['Survival',2],['Vigilance',2]],
	['Ferocious Creature',['Athletics',3],['Brawl',4],['Perception',2],['Survival',3],['Vigilance',1]],
	['Predatory Creature',['Brawl',3],['Coordination',3],['Perception',4],['Survival',2],['Stealth',3]],
	['Soldier',['Athletics',2],['Discipline',1],['Melee-Heavy',2],['Melee-Light',2],['Ranged',2],['Resilience',2],['Vigilance',2]]
	];

let chosenPack="Basic Creature";

// populate actor's skills based on chosen pack

for (let pack of skillPacks) {
	if (pack[0] == chosenPack) {
		for (let i=1;i<pack.length;i++) {
			if (actorToMake.type == "minion") actorToMake.data.skills[pack[i][0]].groupskill = true;
			else actorToMake.data.skills[pack[i][0]].rank = pack[i][1];
		}
	}
}

// set actor's characteristics based on chosen stats pack
// where statArray = the type (humanoidArrays, beastArrays)


let statArray = humanoidArrays;

// define other variables
let items = [];

let archetypeList = populateList(humanoidArrays);
let dialogContent = `<label>Type</label>
				<select id = "archetype" name="archetype">
					${archetypeList}
				</select>`;

// create dialogs
await new Promise(resolve => {	
    let dialog = new Dialog({
        title: `NPC Generator 1`,
		content: dialogContent,
        buttons: {
			okay: {
				label: "Create!",
				callback: ()=> console.log("Let's do it!")
			}
		},
         close: (html) => doTheThing(html)
    },{width: 600, height: "auto"}).render(true);
});

async function doTheThing(html) {

	let chosenArchetype = html.find('[name="archetype"]')[0].value;
	console.log(chosenArchetype);
	actorToMake.data.characteristics['Brawn'].value=statArray[chosenArchetype][1];
	actorToMake.data.characteristics['Agility'].value=statArray[chosenArchetype][2];
	actorToMake.data.characteristics['Intellect'].value=statArray[chosenArchetype][3];
	actorToMake.data.characteristics['Cunning'].value=statArray[chosenArchetype][4];
	actorToMake.data.characteristics['Willpower'].value=statArray[chosenArchetype][5];
	actorToMake.data.characteristics['Presence'].value=statArray[chosenArchetype][6];
	
	if (actorToMake.type == "minion") {
		if (actorToMake.data.characteristics['Brawn'].value == 1) actorToMake.data.stats.wounds.max = 3;
		else actorToMake.data.stats.wounds.max = 5;
	} else actorToMake.data.stats.wounds.max = 8;
	
	// testContinue();
	
	
	
	
	console.log(actorToMake);
}


// get item from compendium
// where itemName and packName are strings
// packname should be something like "GenesysFantasyEquipment.FantasyMelee

async function getItem(itemName, packName) {
	let pack = game.packs.get(packName);
	let documentId = pack.index.getName(itemName)._id;
	let item = await pack.getDocument(documentId);
	console.log(item);
	return item.toObject();

}

// create actor


// generate personality
// returns an object
async function rollPersonality() {
	
}

// return array of buttons to populate dialog based on spells available to caster
function makeButtons(arr) {
	let buttons = {};
	for (let a of arr) {
		// if () {
			buttons[arr.indexOf(a)] = {
				label: "someLabel",
				id: a,
				callback: ()=>console.log(buttons[arr.indexOf(a)].id)
			}
		
	}
	return buttons;
}



async function testContinue() {

let item = await getItem("Sword","GenesysFantasyEquipment.FantasyMelee");
let item3 = await getItem("Greatsword","GenesysFantasyEquipment.FantasyMelee");
let item2 = await getItem("Padded", "GenesysFantasyEquipment.FantasyArmor");
actorToMake.items.push(item);
actorToMake.items.push(item2);
actorToMake.items.push(item3);


for (let i of actorToMake.items) {
	i.data.equippable.equipped=true;
}




let newActor = await Actor.create(actorToMake);

let mActor = game.actors.getName(actorToMake.name);
console.log(mActor);
let brawn = mActor.data.data.characteristics['Brawn'].value;
for (let i of mActor.itemTypes.weapon) {
	await i.sheet.render(true);
}

const wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));
(async () => {
   for (let i of mActor.itemTypes.weapon) {
	await i.sheet.render(true);

}
    await wait(200)
    //continue to do things after a 500ms wait.
	for (let i of mActor.itemTypes.weapon) {	
	let toClose = Object.values(ui.windows).find(w => w.constructor.name === 'ItemSheetFFG' && w.title == i.name);
	if (toClose) toClose.close();
	}
})();

}

	
	
// create html for a dropdown list from array of objects

function populateList(arr) {
	let y = "";
	arr.forEach(a => {
		y += `<option value="${arr.indexOf(a)}">${a[0]}</option>`
	});
	return y;
}