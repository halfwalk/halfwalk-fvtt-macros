if (token && token.actor.type == "minion") {
	let id = canvas.tokens.controlled[0].id;
	let mActor = game.actors.tokens[id];
	if (!mActor) mActor = game.actors.get(token.actor.id) 
		await mActor.update({
			data:{
				quantity: {
					value: Math.max(0,mActor.data.data.quantity.value - 1),
					max: Math.max(0,mActor.data.data.quantity.max- 1)
				}
			}
		});
}