let dialogOptions = {};
let okay;

/* monster data array

[0] = "name"
[1] = hp
[2] = ac
[3] = "damage" (d6)
[4] = "piercing"
[5] = "special qualities"
[6] = "biography"
[7] = tags "[{\"value\":\blahblah\"},{\"value\":\blahblah2\"}]
tagsString = blahblah, blahblah2 */


async function makeMonster(mData) {
	let formattedTags = "", formattedTagsString = "";
	let monster = {
		name: mData[0],
		type: "npc",
		img: "icons/svg/mystery-man.svg",
		data: {
			attributes: {
				hp: {
					value: data[1],
					min: 0,
					max: data[1]
				},
				ac: {
					value: data[2],
					base: data[2],
					min: 0
				},
				damage: {
					value: data[3],
					misc: "",
					piercing: data[4]
				},
				specialQualities: {
					value: data[5]
				}
			},
			details: {
				biography: data[6]
			},
			tags: formattedTags,
			tagsString: formattedTagsString
		},
		token: {
			name: data[0]
		}
	};
}

let dialogEditor = new Dialog({
    title: `Monster Maker`,
    content: `
	<div class="form-group">
	</div>
        `,
        buttons: {
            okay: {
                label: `Create`,
                callback: () => {
                    okay = true;
                }
            },
			cancel: {
				label: `Cancel`,
				callback: () => {
					okay = false;
				}
			}
		},
	default: "okay",
	close: html => {		
		if (okay) { makeMonster();}
	}
},dialogOptions).render(true);
			