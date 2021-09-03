if (token) {
let dialogContent = `
	<div class='form-group'>
		<label for="damage">Damage</label>
		<input type="text" id="damage" name="damage"><br>
		<label for="pierce">Pierce</label>
		<input type="text" id="pierce" name="pierce" value="0">
	</div>
	`;

let dialog = new Dialog({
	title: "Apply Damage",
	content: dialogContent,
	buttons: {
		okay: {
			label: "Apply",
			callback: (html) => applyDamage(html)
		}
	},
	default: "okay"
	
}).render(true);

async function applyDamage(html) {
	let damage = parseInt(html.find('[name="damage"]')[0].value);
	let pierce = parseInt(html.find('[name="pierce"]')[0].value);
	let soak = token.actor.data.data.stats.soak.value;
	
	let newWounds = token.actor.data.data.stats.wounds.value + (damage - Math.max((soak - pierce),0));
	
	await token.actor.update({"data.stats.wounds.value":newWounds
		
	});
					
}
}