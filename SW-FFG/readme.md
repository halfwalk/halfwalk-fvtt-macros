## Genesys Spell Builder

Quickly build spells and their associated dice pools, then output the spell details to chat along with the roll results. To use, you need to edit the line near the top and assign the variable (`const skillToUse`) to the name of your magic character's skill. Otherwise, it defaults to Arcana.

Detects proper magic skill (based on presence of 'Dark Insight' talent).

Detects implement for casting (if any). Currently limited to 1; will change this soon! It picks the first implement it finds.

#### Implement Setup

To be detected, you must put the tag `[implement]` in your item's description.
To add a damage bonus, you must also put a tag `[+X]` (where X is an integer... e.g. `[+4]`)
To add free effects, each must be in its own tag `['Effect Name']`. e.g. `['Range'] ['Additional Target']`

So for example, a *Magic Staff* from Terrinoth should have the following somewhere in its description: `[implement] [+4] ['Range']`.

## Adversary Attack Menu

Creates a menu of the selected token's attacks as a chat message, which is whispered to the GM. In that chat message, the attack names are clickable; this rolls the attack.

## Plus/Minus One Minion

Quickly adjust the minion count of selected token actor.

## Apply Damage

Apply damage to selected token, with consideration for Soak and Pierce/Breach.

## Alphabetize Gear

Sort items/talents alphabetically **for player-owned actors.**

## Damage Last Used Weapon

Requires a selected token. Finds the most recent weapon roll from the selected token's actor, and damages the used weapon by one step.

## 
