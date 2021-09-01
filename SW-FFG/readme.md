## Genesys Spell Builder

Detects proper magic skill (based on presence of 'Dark Insight' talent).

Detects implement for casting (if any). Currently limited to 1 (multiple implements will be combined; yikes! will change this to add implement selection to the first dialog)

### Implement Setup

To be detected, you must put the tag `[implement]` in your item's description.
To add a damage bonus, you must also put a tag `[+X]` (where X is an integer... e.g. `[+4]`)
To add free effects, each must be in its own tag `['Effect Name']`. e.g. `['Range'] ['Additional Target']`

## Item Alphabetize
