## task list 

### (first-priority/to-do)




### (bugs)
- if user spams click during countdown additional numbers will continue to pop up inside the 'ring'
- sometimes text result object ('home run!/out') will clip into an invisible object
    - might be fixable with changing logic from conditional opacity, to conditional visibility, due to the way react three fiber and react component unmounting works but idk
- if user clicks too soon after play ends (I think? ) isPlayStarted remains true while the even though it's not. so user is soft locked.

### (secondary-priority/to-do-after-first-priority)
- increased difficulty over time (game speed etc. ?)
- code cleanup (@dev, @todo)
- settings QOL tweaks (pitch speed, cursor, hit velocity, etc.)
- increase difficulty as rounds go on
- HUD (lives, score, difficulty(???))
- type all state pulls (currently set as any for everything)
- settings menu 
    - graphics settings
    - other stuff maybe 
- canvas stylization rework? 
    - simplify everything, to be more "aesthetic", brutalistic.
    - get rid of mound and ugly ball texture
    - nix the pseudo realism in favor of brutalistic color scheme that grows more intense the longer the user remains alive.


### (wants/maybes)
- rogue-lite elements?
    - can buy upgrades every 10 rounds or something
- cosmetic tweaks?
    - purchases from a shop or something, stored to your "account/username" type of thing
- strictly type EVERYTHING
    - is a want/maybe because this is obviously the ideal case for every repository but typescript can be fucky sometimes so not holding any attachment to this.
    - main objective right now is just to make the thing work!!



