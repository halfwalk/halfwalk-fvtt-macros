// search tokens on canvas to see if they contain searchString; push token IDs to an array

const searchString = "Croc";
let tokensToUse = [];

for (const tok of canvas.tokens.objects.children) {
if (tok.data.name.includes(searchString)) tokensToUse.push(tok.id);
}