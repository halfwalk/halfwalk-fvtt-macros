// search tokens on canvas to see if they contain searchString; push token objects to array

const searchString = "Croc";
let tokensToUse = canvas.tokens.objects.children.filter (i => i.data.name.includes(searchString));

for (let t of tokensToUse) {
	// do something to each token, E.G.:
	// await t.document.update({"hidden":false});
}