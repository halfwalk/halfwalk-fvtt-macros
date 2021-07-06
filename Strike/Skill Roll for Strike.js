// Skill roll for Strike! Rpg

let doRoll = false;

// prompt for the type of roll
let dialogEditor = new Dialog({
	title: `Roll parameters`,
	content: `
		<form>
			<div class="form-group">
				<label>Advantage?</label>
				<select id = "adv" name="adv">
					<option value="noAdv">None</option>
					<option value="adv">Advantage</option>
					<option value="disAdv">Disadvantage</option>
				</select>
			</div>
			<div class="form-group">
				<label>Skilled?</label>
				<select id="skilled" name="skilled">
					<option value="skill">Skilled</option>
					<option value="noSkill">Unskilled</option>
				</select>
			</div>
		</form>
		`,
	buttons: {
		yes: {
			icon: "<i class='fas fa-check'></i>",
			label: `Roll`,
			callback: () => doRoll = true
		},
		no: {
			icon: "<i class='fas fa-times'></i>",
			label: `Cancel`
		},
	},
	default: "yes",
	close: html => {
		// do the thing
		if (doRoll) {
			
			let rollText;					
			let resultText;
			
			let hasAdv = html.find('[name="adv"]')[0].value;
			let isSkilled = html.find('[name="skilled"]')[0].value;
						
			switch (hasAdv) {
				case "noAdv":
					rollText = "1d6";
					break;
				case "adv":
					rollText = "2d6kh1";
					break;
				case "disAdv":
					rollText = "2d6dh1";
					break;
				default:
			}
			
			let diceRoll = new Roll(rollText).evaluate();
			let r = diceRoll.total;
			
			if (r==1) { resultText="Twist with a Cost"; }
			else if (r==2) { resultText="Twist"; }
			else if (r==3) {
				if (isSkilled) { resultText="Success with a Cost"; }
				else { resultText="Twist"; }
			} else if (r==4) {
				if (isSkilled) { resultText="Success"; }
				else { resultText="Success with a Cost"; }
			} else if (r==5) { resultText="Success"; }
			else if (r==6) {
				if (isSkilled) { resultText="Success with a Bonus"; }
				else { resultText="Success; learn the Skill OR Bonus"; }
			}
			
			let rollMsg = {
				speaker: ChatMessage.getSpeaker(),
				content: `
					<div class="dice-roll">
						<div class="dice-result">
							<h4 class="dice-total">${r}</h4>
						</div>
						
					</div>
					<h2>${resultText}</h2>
					
				`
			};
			
			diceRoll.toMessage(rollMsg);		
			
		}
	}
}).render(true);