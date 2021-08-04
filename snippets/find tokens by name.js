// search tokens on canvas to see if they contain searchString; push token objects to array

const searchString = "Croc";
let tokensToUse = canvas.tokens.objects.children.filter (i => i.data.name.includes(searchString));

for (let t of tokensToUse) {
	// do something to each token, E.G.:
	// let hide = !t.data.hidden;
	// await t.document.update({"hidden":hide});
}


// find a single token with a specific name:

const tokenName = "Croc";
const tok = canvas.tokens.placeables.find(i => i.data.name === tokenName);

// then do something with the token like:
// await tok.actor.sheet.render(true);