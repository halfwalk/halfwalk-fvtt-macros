const su = `<span class='dietype genesys success'>s</span>`
const ad = `<span class='dietype genesys advantage'>a</span>`
const th = `<span class='dietype genesys threat'>h</span>`
const de = `<span class='dietype genesys despair'>d</span>`
const fa = `<span class='dietype genesys failure'>f</span>`
const tr = `<span class='dietype genesys triumph'>t</span>`


let checkboxes = `<h2>Total ${su}</h2>
	<table><tr><td>${makeChecks(24,"success")}</td></tr></table>
	<h2>Total ${ad}</h2>
	<table><tr><td>${makeChecks(24,"advantage")}</td></tr></table>
	<h2>Total ${tr}</h2>
	<table><tr><td>${makeChecks(12,"triumph")}</td></tr></table>
	<h2>Total ${fa}</h2>
	<table><tr><td>${makeChecks(24,"failure")}</td></tr></table>
	<h2>Total ${th}</h2>
	<table><tr><td>${makeChecks(24,"threat")}</td></tr></table>
	<h2>Total ${de}</h2>
	<table><tr><td>${makeChecks(12,"failure")}</td></tr></table>`

let dialog = new Dialog({
	title: "Result Threshold Tracker",
	content: checkboxes,
	buttons: {
			okay: {
				label: "Done"
			}
		}
}).render(true);

function makeChecks(num,type) {
	let str = '';
	for (let i=0; i<num; i++) {
		str += `<input type="checkbox" class="${type}">`;
	}
	return str;
}