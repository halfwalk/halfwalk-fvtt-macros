const mActor = game.actors.getName("Actor");
const knowledge = mActor.data.data.attributes["Knowledge(Lore)"].value;
const skill = mActor.data.data.skills["Arcana"];
const stat = mActor.data.data.attributes["Intellect"];
var addedDiff = '';
var dmgBonus = 0;

const gear = mActor.items.filter(i=>i.type=="gear").map(x=>x.name);
if (gear.includes("Magic Staff")) dmgBonus = 4;
else if (gear.includes("Magic Wand")) dmgBonus = 3;
else if (gear.includes("Magic Scepter")) dmgBonus = 2;

const di = `<span class='dietype starwars difficulty'>d</span>` 
const su = `<span class='dietype genesys success'>s</span>`
const ad = `<span class='dietype genesys advantage'>a</span>`

let checkBoxes = "";

// spellMods[0] = 'Name'
// spellMods[1] = 'Description'
// spellMods[2] = difficulty
// spellMods[3] = activeCost
let spellMods = [['Blast',`Blast ${knowledge}`,1,2],['Close',`Engaged range`,1],['Deadly',`Crit 2, Vicious ${knowledge}`,1],['Fire',`Burn ${knowledge}`,1,2],[`Holy`,`Each ${su} is +2 dmg vs bane`,1],['Ice',`Ensnare ${knowledge}`,1,2],['Impact',`Knockdown, Disorient ${knowledge}` ,1,2],['Lightning',`Stun ${knowledge}, Auto-Fire`,1],['Manipulative',`Move target 1 band`,1,1],['Non-Lethal',`Stun Damage`,1],['Range',`+1 Range Band`,1],['Destructive',`Sunder, Pierce ${knowledge}`,2],['Empowered',`+${stat.value} damage (increase blast to short)`,2],['Poisonous',`Save (${di+di+di}) Resilience, ${knowledge} Wounds/Strain`,2]];

for (let mod of spellMods) {
	checkBoxes += `	
		<tr><td>
		<input class='spellBox' type="checkbox" name="myCheckboxes" id="${mod[0]}" value="${mod[0]}"></td>
		<td><b>${mod[0]}</b></td><td>${mod[1]}</td> <td>+${difficulty(mod[2])}</td>
		</tr>`;
}

$(document).ready(function(){
	$('.spellBox input[type="checkbox"]').click(function(){
		if($(this).prop("checked") == true) {
			if (getData(this.id)[2] > 1) addedDiff = `${di}`;
			else addedDiff = '';
			 $(".diffTracker").append(`<span class="${this.id}">${di}${addedDiff}</span>`);
		} else {
			$(`.${this.id}`).remove();
		}
	});
});

let dialogContent = `<center>Total Difficulty:<span class="diffTracker">${di}</span></center><br>
<form class="spellBox"><table style="width:100%"><th></th><th>Effect</th><th>Description</th><th>Difficulty</th>
	${checkBoxes} </table></form>`
	
// await new Promise(resolve => {
    new Dialog({
        title: "Attack Spell Generator",
		content: dialogContent,
        buttons: {
            cast: {
                label: "Cast",
                callback: (html) => createSpell(html)
            }
        },
        // close: () => resolve()
    }).render(true);
// });

async function createSpell(data) {
console.log("Kazaam!");
	// get used effects
	let activeMods = [];
	let difficulty = 1;
	let areChecked = document.getElementsByName('myCheckboxes');
	for (let c of areChecked) {
		let data = getData(c.id);
		if (c.checked) activeMods.push([data[1],data[3],data[2]]);
	}
	
	console.log(activeMods);
	for (let a of activeMods) difficulty += a[2];
	
	// await game.ffg.DiceHelpers.rollSkillDirect(skill,stat,difficulty);
	await rollTempSpell();
	
	
	let message = createMessageData(activeMods);
	await ChatMessage.create({
		speaker: {actor: mActor.id},
		content: message
	});
}

function difficulty(num) {
	let str = `<span class='dietype starwars difficulty'>`;
	for (let i=0;i<num;i++) {
		str += 'd';
	}
	str += `</span>`;
	return str;
}

// a[0]: effect name
// a[1]: effect cost

function createMessageData(arr) {
	let cost = '';
	let str = `<h4>Base Damage: ${stat.value + dmgBonus}</h4><table><tr><th>Effects</th><th>Activation</th></tr>`;
	for (let a of arr) {
		if (a[1]) {
			console.log(a[1]);
			cost = `(`
			for (let i=0; i<a[1];i++) {
				cost += `${ad}`;
			}
			cost += `)`
		} else cost = ` `;
		str += `<tr><td>${a[0]}</td><td>${cost}</td></tr>`;
	}
	str += `</table>`;
	return str;
}

function getData(name) {
	for (let i of spellMods) {
		if (i.includes(name)) return i;
	}
	return 0;
}

async function rollTempSpell(data) {
	let specText = activeMods.reduce((acc, str) => acc + " " + str);
	let crit = 1;
	let range = "Medium";
	let spell = new Item({
		name: "AttackSpell",
		type: "weapon",
		data: {
			skill: {
				value: ${skill.name}
			},
			range: {
				value: ${range}
			},
			damage: {
				value: ${stat.value + dmgBonus}
			},
			crit: {
				value: ${crit}
			},
			special: {
				value: "Ensnare 2"
			}
		},
		img: "icons/svg/sword.svg"
	}).toObject();

	await mActor.createEmbeddedDocuments("Item",[spell]);
	let item = mActor.data.items.find(i=>i.name=="AttackSpell");

	await game.ffg.DiceHelpers.rollItem(item.id,mActor.id);

	await mActor.deleteEmbeddedDocuments("Item",[item.id]);
}