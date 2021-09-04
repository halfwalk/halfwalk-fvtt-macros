let checkboxes = `<h2>Total Successes</h2>
<table style="text-align:center"><tr><th>Easy</th><th>Moderate</th><th>Hard</th></tr>
<tr> <td bgcolor="AEF6C1"> ${makeChecks(5,"easyCheck")}</td> 
<td bgcolor="E0ECA8">${makeChecks(3,"modCheck")}</td> 
<td bgcolor="E2AC8C">${makeChecks(3,"hardCheck")}</td></tr></table>
<h2>Total Failures</h2><table style="text-align:center"><tr> <td bgcolor="A05F99">${makeChecks(3,"failChecks")}</td></tr> </table>`


let dialog = new Dialog({
	title: "Skill Challenge Tracker",
	content: checkboxes,
	buttons: {
			okay: {
				label: "Done",
				callback: ()=> console.log("Let's do it!")
			}
		},
         close: (html) => {}
}).render(true);

function makeChecks(num,type) {
	let str = '';
	for (let i=0; i<num; i++) {
		str += `<input type="checkbox" class="${type}">`;
	}
	return str;
}