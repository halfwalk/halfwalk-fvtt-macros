
// opens and immediately closes all weapon items on selected token's actor
// this "initializes" them, so that they don't roll 0 damage

let mActor = token.actor;

const wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));
(async () => {
   for (let i of mActor.itemTypes.weapon) {
	await i.sheet.render(true);

}
    await wait(200)
    //continue to do things after a 200ms wait.
	for (let i of mActor.itemTypes.weapon) {	
	let toClose = Object.values(ui.windows).find(w => w.constructor.name === 'ItemSheetFFG' && w.title == i.name);
	if (toClose) toClose.close();
	}
})();