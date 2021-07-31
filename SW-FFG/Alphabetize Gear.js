// This macro only works with one token selected
// It alphabetizes all the items in the "gear" category in their inventory

let tokens = canvas.tokens.controlled;
let gearToSort = [];

if (tokens.length != 1) ui.notifications.error("Select a single token before running this macro");

else {
    let tActor = token.actor;
    let gearList = tActor.items;

	for (let element of gearList.filter(i => i.data.type === "gear")) {
		gearToSort.push(element);
		await element.delete();
	}
	
// sort the items in the array alphabetically by item name
	gearToSort.sort(function(a,b) {
		if (a.name < b.name) { return -1; }
		if (a.name > b.name) { return 1; }
		return 0;
	});
	
// now put the sorted array back on the actor
	tActor.update({
		"items": gearToSort
	});
}