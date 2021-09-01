// index the appropriate packs

game.packs.filter(i=>i.collection.includes("Genesys")).forEach(async f=> await f.getIndex());

/* for (let i of toIndex) {
	console.log(i);
}*/

// define dice symbols

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


const 

// define other variables
let items = [];

let someArray = [1,2,3];

// create dialogs
await new Promise(resolve => {	
    let dialog = new Dialog({
        title: `NPC Generator 1`,
        buttons: makeButtons(someArray),
         close: (html) => resolve(html)
    },{width: 600, height: "auto"}).render(true);
});




// get item from compendium
// where itemName and packName are strings
// packname should be something like "GenesysFantasyEquipment.FantasyMelee

async function getItem(itemName, packName) {
	let pack = game.packs.get(packName);
	let documentId = pack.index.getName(itemName)._id;
	let item = await pack.getDocument(documentId);
	items.push(item);
	return item;

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
				id: "someId",
				// callback: 
			}
		
	}
	return buttons;
}





let item = await getItem("Sword","GenesysFantasyEquipment.FantasyMelee");
console.log(items);