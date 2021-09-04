//a  dialog box that passes its html to a callback function

// await new Promise(resolve => {	
let dialog = new Dialog({
	title: "A Dialog Box",
	content: checkboxes,
	buttons: {
			okay: {
				label: "Done",
				callback: (html) => callbackFunction(html)
			}
		}
},).render(true);
// });