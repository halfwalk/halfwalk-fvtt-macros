
// makes _num_ checkboxes of class _type_ 
function makeChecks(num,type) {
	let str = '';
	for (let i=0; i<num; i++) {
		str += `<input type="checkbox" class="${type}">`;
	}
	return str;
}