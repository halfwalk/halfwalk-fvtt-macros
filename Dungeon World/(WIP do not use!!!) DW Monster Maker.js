
let dialogOptions = {
	width: 600,
	height: 600,
	popOut: true,
	resizable: true,
	title: "Monster Generator"
};

var genQuals = [['devious',`It isn't dangerous because of the wounds it inflicts, but for other reasons: write a move about why it's dangerous`],['organized',`It organizes into larger groups that it can call on for support; write a move about calling on others for help`],['intelligent',`It's as smart as as human or thereabouts`],['cautious',`It actively defends itself with a shield or similar`],['hoarder',`It collects trinkets that humans would consider valuable (gold, gems, secrets)`],['planar',`It's from beyond this world; write a move about using its otherworldly knowledge and power`],['noBio',`It's kept alive by something beyond simple biology`],['construct',`It was made by someone; give it a special quality or two about its construction or purpose`],['terrifying',`Its appearance is disturbing, terrible, or horrible; write a special quality about why it's so horrendous`],['amorphous',`It doesn't have organs or discernible anatomy`],['ancient',`It (or its species) is ancient - older than men, elves, and dwarves`],['pacifist',`It abhors violence`]]

var atkQuals = [['vicious',`Its armaments are vicious and obvious`],['reach',`It lets the monster keep others at bay`],['weak',`Its armaments are small and weak`],['messy',`Its armaments can slice or pierce metal`],['ignores',`Armor doesn't help with the damage it deals (due to magic, size, etc.)`],['far',`It usually attacks at range (with arrows, spells, or other projectiles`];

var genHTML = "",instinct,moves;
var dam = "", name, hp, ac, atk, quals, pierce;
var tags = [], quals = [];
var tagsString = "", qualString = "";

// ['damage die', HP, 'tag']
// [0] = large group, [1] = small group, [2] = lonesome
let mStyles = [['1d6',3,'swarm'],['1d8',6,'group'],['1d10',12,'solitary']]

// ['tag', 'tag', damageBonus, HP]

let mSizes = [['tiny','hand',-2,''],['small','close',0,0],['','close',0,0],['close','reach',1,4],['huge','reach',3,8],['titanic','',6,12]]

genHTML = `
	<div class="flexcol">
		<li class="flexrow"><h5>What is it called?</h5>
		<input type="text" id="mName" name="mName">
	</div><div class="flexrow">
		<h5>How does it usually hunt or fight?</h5>
		<select id="mStyle" name="mStyle">
			<option value="0">In large groups</option>
			<option value="1">In small groups (2-5)</option>
			<option value="2">All by its lonesome</option>
		</select>
	</div><div class="flexrow">
		<h5>How big is it?</h5>
		<select id="mSize" name="mSize">
			<option value="0">Smaller than a house cat</option>
			<option value="1">Halfling-esque</option>
			<option value="2">About human size</option>
			<option value="3">As big as a cart</option>
			<option value="4">Much larger than a cart</option>
			<option value="5">Can devour ships or houses whole</option>
		</select>
	</div><div class="flexrow">
		<h5>What is its most important defense?</h5>
		<select id="mDef" name="mDef">
			<option value="0">Cloth or flesh</option>
			<option value="1">Leathers or thick hide</option>
			<option value="2">Mail or scales</option>
			<option value="3">Plate or bone</option>
			<option value="4">Permanent magical protection</option>
		</select>
	</div><div class="flexrow">
		<h5>What is its most common form of attack?</h5>
		<input type="text" id="atkName" name="atkName"></div>
	</div><div class="form-group">
		<h5 >Which of these describe it? (choose all that apply)</h5><br>
		${genBoxes(genQuals)}
	</div><h6>(optional:)</h6><div class="flexrow">
		<h5>Other tags/qualities:</h5>
		<input type="text" id="tag1" name="tag1">
		<input type="text" id="tag2" name="tag2">
		<input type="text" id="tag3" name="tag3">
	</div><div class="form-group">
		<h5>What's something interesting for the PCs to learn about this monster?</h5>
		<input type="text" id="interesting" name="interesting"><br>
		<h5>What's something useful for the PCs to learn about this monster?</h5>
		<input type="text" id="useful" name="useful">
	</div>
		
`

let d = new Dialog({
	title: "DW Monster Generator",
	content: genHTML,
	buttons: {
		okay: {
			icon: '<i class="fas fa-dragon"></i>',
			label: "Generate",
			callback: (html) => monsterGen(html)
		}
	},
	default: "okay"
},dialogOptions).render(true);
	
	
async function monsterGen(html) {

	// get all the html form elements (except checkboxes)
	
	name = html.find('[name="mName"]')[0].value;
	let style = html.find('[name="mStyle"]')[0].value;
	let size = html.find('[name="mSize"]')[0].value;
	let def = html.find('[name="mDef"]')[0].value;
	let useful = html.find('[name="useful"]')[0].value;
	let interesting = html.find('[name="interesting"]')[0].value;
	quals.push(html.find('[name="tag1"]')[0].value)
	quals.push(html.find('[name="tag2"]')[0].value)
	quals.push(html.find('[name="tag3"]')[0].value)
	qualString = populateTags(quals);
	atk = html.find('[name="atkName"]')[0].value;
	if (!atk) atk = "";
	if (!name) name = "New Monster";
	
	
	// assign the basic attributes
	
	dam = mStyles[style][0];
	hp = mStyles[style][1] + mSizes[size][3];
	ac = def;
	if (def == 4) tags.push('magical')
	tags.unshift(mStyles[style][2]);
	
	// build the description
	
	let desc = `<b>Primary Attack:</b>  ${atk}`
	if (interesting) desc+= `<p><b>Interesting Info:</b>  ${interesting}`
	if (useful) desc+= `<p><b>Useful Info:</b>  ${useful}`
	
	//get the checkbox values and do stuff accordingly
	
	var array = []
	var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
	for (var i = 0; i < checkboxes.length; i++) {
		let j = checkboxes[i].value;
		array.push(checkboxes[i].value)
		if (j != "noBio" && j != "pacifist" && j !="ancient" && j!= "vicious" && j != "weak" && j != "ignores") tags.push(checkboxes[i].value)
		if (checkboxes[i].value == 'cautious') ac+=1;
		if (checkboxes[i].value == 'noBio') hp +=4;
		if (checkboxes[i].value == 'amorphous') {ac+=1;hp+=3;}
		if (checkboxes[i].value == 'ancient') dam = dmgDieShift(dam);
		if (checkboxes[i].value == 'pacifist') dam = dmgDieDisadv(dam);
	}
	var tagString = "";
	for (let i of tags){
		tagString += i;
		if (tags.indexOf(i) < tags.length-1) tagString+=`,`
	}
	dam = `${dam}${addSign(mSizes[size][2])}`
	let mTags = populateTags(tags);
	consoleLogs();

	
	let actor = await Actor.create({
		"name": name,
		"type": "npc",
		"img": "icons/svg/mystery-man.svg",
		"data": {
			"details": {
				"biography": desc
			},
			"attributes": {
				"hp": {
					"value": hp,
					"max": hp
				},
				"ac": {
					"value": ac
				},
				"damage": {
					"value":dam
				},
				"specialQualities": {
					"value":qualString
				}
			},
			"tags": mTags,
			"tagsString": tagString
		}
	});
}

function addSign(num) {
	let stringNum = num.toString();
	if (num > 0) {
		return `+${stringNum}`
	} else if (num < 0) {
		return `${stringNum}`
	} else return ""
} 

function consoleLogs() {
	console.log(`Name: ${name}`);
	console.log(`HP: ${hp}`);
	console.log(`Damage: ${dam}`);
	console.log(`Armor: ${ac}`);
	console.log(tags);
	console.log(`Main attack: ${atk}`);
}

function genBoxes(arr) {
	let html = "";
	for (let i of arr) {
	html += `<li><input type="checkbox" id="${i[0]}" name="${i[0]}" value="${i[0]}">${i[1]}`
	}
	return html;
}

function dmgDieShift(die) {
	if (die == "1d4") return "1d6";
	else if (die == "1d6") return "1d8";
	else if (die == "1d8") return "1d10";
	else if (die == "1d10") return "1d12";
	else if (die == "1d12") return "1d8+1d6"
}

function dmgDieDisadv(die) {
	let newDie = die.substring(1);
	return `2${newDie}dh`
}

function populateTags(arr) {
	let newStr="";
	for (var i=0; i < arr.length;i++) {
		if (!arr[i]) arr[i]="";
		newStr+=arr[i];
		if (i < arr.length-1) newStr += `,`
	}
	return newStr;
}