//
// Auto rename combat slots
// based on macro from Wiki, updated for 0.8.x
// todo:
//    - update images to make system-agnostic

if (game.user.isGM) {
  const cmbt = game.combat;

  function hasPlayer(c){
    console.log(c);
    if (c.token == null) { return {_id: c._id}; }
    if (c.token.data.disposition === 1) {
        return {_id: c._id,img: "systems/starwarsffg/images/dice/starwars/lightside.png",name:"PC"}

    } else if(c.token.data.disposition === -1) {
        return {_id: c._id,img: "systems/starwarsffg/images/dice/starwars/darkside.png",name:"NPC"}
    }
    return {_id: c.id};
  }

  if (cmbt != null) {
    let updates = cmbt.data.combatants.map(c => { return hasPlayer(c) });
    cmbt.updateEmbeddedDocuments("Combatant", updates);
  }
}