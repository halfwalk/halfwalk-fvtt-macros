if (token && token.actor.type == "minion") {
let id = canvas.tokens.controlled[0].id;
let mActor = game.actors.tokens[id];
if (!mActor) mActor = game.actors.get(token.actor.id) 
await mActor.update({
	data:{
		quantity: {
			value: mActor.data.data.quantity.value + 1,
			max: mActor.data.data.quantity.max + 1
		}
	}
});
}