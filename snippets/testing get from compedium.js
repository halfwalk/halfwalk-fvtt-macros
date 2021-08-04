const comps = ["GenesysFantasyEquipment.FantasyMelee","GenesysFantasyEquipment.FantasyRanged","GenesysFantasyEquipment.FantasyArmor","GenesysFantasyEquipment.FantasyGear","GenesysFantasyEquipment.FantasyItemAttachments"];

for (let c of comps) {
	await game.packs.get(c).getIndex();
}

const melee = game.packs.get(comps[0]);
const ranged = game.packs.get(comps[1]);
const armor = game.packs.get(comps[2]);
const gear = game.packs.get(comps[3]);
const attach = game.packs.get(comps[4]);

let itemsToAdd = [];
const meleeList = await melee.index.filter(i => i);
const armorList = await armor.index.filter(i => i);
const gearList = await gear.index.filter(i => i);
const rangedList = await ranged.index.filter(i => i); 

/*meleeList.sort(function(a,b) {
		if (a.name < b.name) { return -1; }
		if (a.name > b.name) { return 1; }
		return 0;
});*/
	
let weaponHTML = populateList(meleeList);
let armorHTML = populateList(armorList);

console.log(itemsToAdd);

async function getFromComp(comp,thing) {

	let x = comp.index.find(i => i.name === thing);
	let y = await comp.getDocument(x._id);
	itemsToAdd.push(y);

}



function populateList(x) {
	
	// where x is an array of objects
	x.sort(function(a,b) {
		if (a.name < b.name) { return -1; }
		if (a.name > b.name) { return 1; }
		return 0;
});
	let y = ""
	
	
	x.forEach(a => {
		y += `<option value=${a._id}>${a.name}</option>`
	});
	return y;
}

let dialogEditor = new Dialog({
	title: `List of Weapons`,
	content: `
		<div class="form-group">
			<label>Weapons</label>
			<select id = "attacks" name="attacks">
			${weaponHTML}
			</select><br>
			<label>Armor</label>
			<select id = "defense" name="defense">
			${armorHTML}
			</select>
		</div>
		
	`,
	buttons: {
		okay: {
			label: "OK",
			callback: (html) => doTheThing(html)
		},
		cancel: {
			label: "Cancel"
		}
	},
	default: "okay"
}).render(true);

async function doTheThing(html) {
	const chosenWeapon = html.find('[name="attacks"]')[0].value;
	const chosenArmor = html.find('[name="defense"]')[0].value;
	await makeItem(melee,chosenWeapon);
	await makeItem(armor,chosenArmor);
	makeActor();
}

async function makeItem(comp,item) {
	let i = await comp.getDocument(item);
	i = i.toObject();
	i.data.equippable.equipped = true;
	itemsToAdd.push(i);
	console.log(itemsToAdd);
	console.log(i);
	return Promise.resolve(i);
}

async function makeActor() {
	
	await itemsToAdd.sort(function(a,b) {
		if (a.name < b.name) { return -1; }
		if (a.name > b.name) { return 1; }
		return 0;
	});
	let advData = {
		name: "Flogiston",
		type: "character",
		items: [ ...itemsToAdd ]
	};
	
	await Actor.create(advData);
}



/*

	let w = await melee.getDocument(chosenWeapon);
	w = w.toObject();
	w.data.equippable.equipped = true;
//	let we = new Item(w).prepareData();
	
//	let a = await armor.getDocument(chosenArmor)prepareData();
console.log(w);
itemsToAdd.push(w);
	// console.log(we);
	//let ar = new Item(a.data);
	//itemsToAdd.push(we,ar);
	// itemsToAdd.push(w,a);
	// console.log(itemsToAdd);
	
	*/