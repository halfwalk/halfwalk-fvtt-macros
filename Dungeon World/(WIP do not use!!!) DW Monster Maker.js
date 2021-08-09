
var genHTML = "", bio, instinct,tags,moves;
var dam = "", hp = 0, ac = 0;

// ['damage die', HP, 'tag']
// [0] = large group, [1] = small group, [2] = lonesome
let mStyles = [['1d6',3,'swarm'],['1d8',6,'group'],['1d10',12,'solitary']]

// ['tag', 'tag', damage, HP]

let mSizes = [['tiny','hand',-2,''],['small','close',0,0],['','close',0,0],['close','reach',1,4],['huge','reach',3,8],['titanic','',6,12]]


genHTML = `
<div class = "form-group">
	<label for="mName">What is it called?</label>
	<input type="text" id="mName" name="mName"><br>
	<label for="mStyle">How does it usually hunt or fight?</label>
	<select id="mStyle" name="mStyle">
		<option value="0">In large groups</option>
		<option value="1">In small groups (2-5)</option>
		<option value="2">All by its lonesome</option>
	</select><br>
	<label for="mSize">How big is it?</label>
	<select id="mSize" name="mSize">
		<option value="0">Smaller than a house cat</option>
		<option value="1">Halfling-esque</option>
		<option value="2">About human size</option>
		<option value="3">As big as a cart</option>
		<option value="4">Much larger than a cart</option>
		<option value="5">Can devour ships or houses whole</option>
	</select>
</div>`




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
}).render(true);
	
	
async function monsterGen(html) {
	let name = html.find('[name="mName"]')[0].value;
	let style = html.find('[name="mStyle"]')[0].value;
	let size = html.find('[name="mSize"]')[0].value;
	
	hp += mStyles[style][1] + mSizes[size][3];
	dam += `${mStyles[style][0]}${mSizes[size][2]}`
	console.log(name);
	console.log(hp);
	console.log(dam);
	// console.log(`${mStyles[style][0]} damage, ${mStyles[style][1]} base HP, ${mStyles[style][2]} tag`);

}