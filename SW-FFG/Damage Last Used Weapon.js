// Looks for selected token's most recent weapon attack in the chat log
// Damages the used weapon by one step

let attacker = token.actor;
let result = game.messages.filter(m => m.data.speaker.actor === attacker._id);
let messageNum = result.length - 1;
let message = result[messageNum];
let usedWeapon = message._roll.data;

let weapon = attacker.getEmbeddedDocument("Item",usedWeapon._id);

let status;
let currentStatus = weapon.data.data.status;

if (currentStatus == "None") status = "Minor";
else if (currentStatus == "Minor") status = "Moderate";
else if (currentStatus == "Moderate") status = "Major";
else if (currentStatus == "Major") {
	ui.notifications.warn("Weapon already has Major damage");
	return;
}

await ChatMessage.create({
	"speaker.alias": "Gamemaster",
	content:`<h2>${attacker.name}'s ${weapon.name} now has ${status} Damage!</h2>`
});

if (status == "Minor" || status == "Moderate") {
	await attacker.updateEmbeddedDocuments("Item", [{_id:weapon._id, "data.status":status}]);
}
else if (status == "Major") await attacker.updateEmbeddedDocuments("Item", [{_id:weapon._id, "data.status":status,name: `(Busted) ${weapon.name}`}]);

