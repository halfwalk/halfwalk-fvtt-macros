// get selected token's actor (if any)
let mActor = canvas.tokens.controlled[0]?.actor

if (mActor) {

	// get data from all "weapon" type items
	let mWeapons = mActor.itemTypes.weapon.map(i=> {return {id:i.data._id,name:i.name,special:i.data.data.special.value,damage:i.data.data.damage.value,crit:i.data.data.crit.value,range:i.data.data.range.value,img:i.data.img}});

	// build the chat message data
	let messageData = `<h2>${mActor.data.token.name}</h2><table>`
	messageData += (mWeapons.reduce((acc, a) => acc += `<tr><td><h3 class = "rollableName" id="${a.id}">${a.name}</h3><b>Dmg:</b> ${a.damage}<br><b>Crit:</b> ${a.crit}<br><b>Range:</b> ${a.range}<br>${a.special}</td><td><img src="${a.img}" width="64" height="64"></td></tr>`,``));
	messageData += `</table>`

	// whisper the built message to GM
	let GM = game.users.find(i=>i.isGM);
	await ChatMessage.create({
		content: messageData,
	whisper: [GM.id]
	});
	
	// jQuery to handle clickable names in chat message
	$(document).ready(function() {
		$("h3.rollableName").click(function() {
			game.ffg.DiceHelpers.rollItem(this.id,mActor.id);
		});
		$("h3.rollableName").hover(function() {
		$(this).css({"background":"rgba(221,217,194,0.8"});
		}, function() {
			$(this).css({"background":"none"});
		});

	});
}