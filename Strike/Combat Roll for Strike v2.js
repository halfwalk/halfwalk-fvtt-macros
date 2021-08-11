// Skill roll for Strike! Rpg

let doRoll = false;

// prompt for the type of roll
let dialogEditor = new Dialog({
	title: `Roll parameters`,
	content: `
		<form>
			<div class="form-group">
				<label>Spend Miss Token?</label>
				<select id = "missToken" name="missToken">
					<option value="noToken">No</option>
					<option value="yesToken">Yes</option>
				</select>
			</div>			
		</form>
		`,
	buttons: {
		rollNormal: {
			label: `Roll`,
			callback: () => {
				doRoll = true;
				hasAdv = "noAdv";
			}
		},
		rollAdv: {
			label: `Roll with Advantage`,
			callback: () => {
				doRoll = true;
				hasAdv = "adv";
			}
		},
		rollDisadv: {
			label: `Roll with Disadvantage`,
			callback: () => {
				doRoll = true;
				hasAdv ="disAdv";
			}
		}
	},
	default: "yes",
	close: html => {
		// do the thing
		if (doRoll) {
			
			let rollText;					
			let resultText;
			let miss;
					
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
			
			let spendMiss = html.find('[name="missToken"]')[0].value;
			
			let diceRoll = new Roll(rollText).evaluate(async=true);
			
				
			let r = diceRoll.total;
			if (spendMiss == "yesToken") {
				r += 1;
			}
			
			switch (r) {
				case 1:
					resultText = "Miss and you gain a Strike";
					miss = true;
					break;
				case 2:
					resultText = "Miss";
					miss = true;
					break;
				case 3:
					resultText = `Glancing Hit: <i class="fas fa-tint"></i> or Effect (player's choice)`;
					break;
				case 4:
					resultText = `Solid Hit: <i class="fas fa-tint"></i> and Effect`;
					break;
				case 5:
					resultText = `Solid Hit: <i class="fas fa-tint"></i> and Effect`;
					break;
				case 6:
					resultText = `Critical Hit: Effect and 2 times <i class="fas fa-tint"></i>`;
					break;
				case 7:
					resultText = `Critical Hit: Effect and 2 times <i class="fas fa-tint"></i>`;
					break;
				default:
			}
			
			
			let rollMsg = {
				flavor: `Combat Check`,
				content: `
					<div class="dice-roll">
						<div class="dice-result">
							<h4 class="dice-total">${r}</h4>
						</div>
						
					</div><br>
					<h3>${resultText}</h3>		
				`
			};
			
			diceRoll.toMessage(rollMsg);		
			
			if (miss) {
				ChatMessage.create({
					content: `When you miss, take a Miss Token. Spend after a future attack roll for +1 (or turn a 1 into a 3 with a Strike).`
				});
			}
		}
		}
	
}).render(true);