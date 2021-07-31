const characters = game.actors.filter(a => a.data.type === "character" && a.hasPlayerOwner);
let charList = ""

console.log(characters);
/*
characters.forEach(a => {
	console.log(a.data.name);
	charList += `
		<option value=${a.id}>${a.data.name}</option>
		`
});
console.log(characters);
*/

populateList(characters, charList,3);

let dialogEditor = new Dialog({
	title: `Test`,
	content: `
	<div class="form-group">
		<label>Test</label>
		<select id = "charName" name="charName">
		${charList}
		</select>
	</div>
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
}).render(true);

function doTheThing(html) {
	const element = html.find('[name="charName"]')[0].value;
	console.log(element);
	
	for ( let i of game.actors ) {
		if (i.id === element) {
			console.log(i.data.name)
			i.sheet.render(true);
		}
	}
	
}

function populateList(x,y) {
	//console.log(arguments[arguments.length - 1]);
	y = ""
	x.forEach(a => {
		charList += `<option value=${a.id}>${a.data.name}</option>`
	});
}
	