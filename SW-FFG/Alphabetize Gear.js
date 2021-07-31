const characters = game.actors.filter(a => a.data.type === "character" && a.hasPlayerOwner);
let charList = "", toDo = ""
const itemTypes = ["Weapon","Armour","Talent","Gear"];

for (let item of itemTypes) {
	toDo += `
		
		<input type="checkbox" name="${item}" id="${item}" value="${item}">
		<label for="${item}">${item}</label>
		`
}

populateList(characters, charList,3);

let dialogEditor = new Dialog({
	title: `Sort Items Alphabetically`,
	content: `
	<div class="form-group">
		<label>Character</label>
		<select id = "charName" name="charName">
		${charList}
		</select>
	</div>
	<hr>
	<br>
	<div class="form-group">
	<label>Things to sort</label>
		${toDo}
	</div>
	<br>
	`,
	buttons: {
		okay: {
			label: "Okay",
			callback: (html) => doTheThing(html)
		},
		cancel: {
			label: "Cancel"
		}
	},
	default: "okay"
}).render(true);

async function doTheThing(html) {
	let itemsToDo = []
	const element = html.find('[name="charName"]')[0].value;
	
	// see which types are checked
	for (let i of itemTypes) {
		if (html.find(`[id="${i}"]`)[0].checked) itemsToDo.push(i.toLowerCase());
	}
	
	// find the desired actor and perform the sorting
	
	for ( let i of game.actors ) {
		if (i.id === element) {
			for (let j of itemsToDo) {
				await sortItems (i,j);
			}
		}
	}
	
}

function populateList(x,y) {
	y = ""
	x.forEach(a => {
		charList += `<option value=${a.id}>${a.data.name}</option>`
	});
}
	
async function sortItems (actor,itemType) {

    let gearList = actor.items;
	let gearToSort = [];

	for (let element of gearList.filter(i => i.data.type === itemType)) {
		gearToSort.push(element);
		await element.delete();
	}
	
	gearToSort.sort(function(a,b) {
		if (a.name < b.name) { return -1; }
		if (a.name > b.name) { return 1; }
		return 0;
	});
	
	actor.update({
		"items": gearToSort
	});
}