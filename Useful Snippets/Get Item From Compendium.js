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