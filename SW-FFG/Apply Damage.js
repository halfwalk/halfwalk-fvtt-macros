if (token) {
let dialogContent = `
	<div class='form-group'>
		<label for="damage">Damage</label>
		<input type="text" id="damage" name="damage"><br>
		<label for="pierce">Pierce</label>
		<input type="text" id="pierce" name="pierce" value="0">
		<input type="checkbox" id="ignore" name="ignore">
		<label for="ignore">Ignore Soak</label><br>
		<input type="checkbox" id="strain" name="strain">
		<label for="strain">Strain</label>
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
	let isStrain = html.find('[name="strain"]')[0].checked;
	let ignoreSoak = html.find('[name="ignore"]')[0].checked;
	console.log(ignoreSoak);
	
	if (!damage) damage = 0;
	
	let target = "wounds";
	if (isStrain) target = "strain";
	console.log(token.actor.data.data.stats[target].value);
	
	let soak = token.actor.data.data.stats.soak.value;
	let addl = (ignoreSoak) ? 0 : Math.max((soak - pierce),0);
	
	let newWounds = token.actor.data.data.stats[target].value + (damage - addl);
	
	if (isStrain) await token.actor.update({"data.stats.strain.value":newWounds});
	else await token.actor.update({"data.stats.wounds.value":newWounds});
					
}
}