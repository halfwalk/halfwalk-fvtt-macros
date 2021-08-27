const aType = "character";
//let moves = game.items.filter(i=>i.type == "move");

for (let p of game.items.filter(i=>i.type == "playbook")) {
	for (let a of game.actors.filter(i=>i.type == aType)) {
		if (a.data.data.details.playbook == p.name) {
			populateMoves(a,getPlaybookMoves(p.name));
		}
	}
}

await new Promise(resolve => {
    new Dialog({
        title: "Move Populator",
		content: dialogContent,
        buttons: {
            okay: {
                label: "Do It!",
                callback: (html) => doTheThing(html)
            }
		}
	},
    close: () => resolve()
    }).render(true);
});


// where playbook is an array of "move" type items
async function populateMoves (mActor, moveSet) {
	
	// get the actor's existing moves
	let aMoves = mActor.data.items.filter(i=>i.type=="move");
	
	// if the actor already has any of the moves to be added, then don't add them
	for (let m of aMoves) {
		for (let p of moveSet) {
			if (m.name == p.name) moveSet.splice(playbook.indexOf(p));
		}
	}	
	// add the moves to the actor
	await mActor.createEmbeddedDocuments("Item",moveSet);
}

// where playbookName a string of the playbook name
// returns an array of objects
function getPlaybookMoves (playbookName) {
	let pbm = game.items.filter(i=>i.type == "move" && i.data.data.playbook == playbookName);
	return pbm.map(i=>i.toObject());
}