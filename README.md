# Project 2 

## [Dice Fight](https://jacksnowdon.github.io/die-hard/)

Dice Fight is a browser turn based combat game for fans of all types of gaming. It is an interactive project, which responds to the users clicks and dynamically displays game information.

This project is the interactieve front end project for my Code Institute Full Stack Web Dev course. However moving forward I aim to combine the project with my [Spellfinder General](https://spellbookfinder.herokuapp.com/) project to create a full DND app.

Note: Users will be referred to as players, HP refers to hit points and DND referring to Dungeons and Dragons 5e edition from here on out.

## UX

The game has been designed for players looking for a new game experience within their browser, allowing them to play endlessly with every game being a different experience and save their progress for bragging rights, who can get the most kills?! 

The Navbar doubles as your players profile, displaying overall kills and current gold level, as well as offering navigation to both the home screen, and a dedicated “dice” screen offering commonly found dice rolls for players of DND (Mostly for me when I forget my dice!)

To navigate the games content, icons have been used in lieu of buttons, to offer an enjoyable user experience and to present the themes of the game. The game is fully responsive down to 320pxs.

### User Stories

#### User Journey 
* New users enter their player name
* Returning players click on the load icon to restore progress
* Player is taken to shop or fight
* Player heads to shop
* Can exchange gold for HP or Power upgrade
* Once finished, back button to shop or fight
* Player chooses fight and attacks using sword button
* Turn based combat (10% Critical change)
* Results displayed and taken to restart screen
* Players can save content, or be taken back to the shop or fight screen

### Wireframes

As all gameflow is handled on a single html page, the wireframes reflect the flow of the game

* [Start](static/wireframes/start.png)
* [Middle](static/wireframes/middle.png)
* [End](static/wireframes/end.png)

## Features
### Existing Features

#### Name Entry
* Allows user to create a player object

#### Combat
* Turn based combat using attack icon
* Updates and renders player/enemy HP
* Uses an open ended die function to set parameters
* End of game content (Winner/gold dropped) displayed at the end of combat

#### Navbar/Profile
* Displays player name/gold/kills when player object exists
* Navigation between game screen and dice screen

#### Shop
* Allows player to exchange gold for permanent HP or Power boosts 

#### Save/Load
* Save button post combat allows player to save Kills, gold and upgrades
* Load button on name entry screen bypasses name entry and sets player object using save from local storage

### Future Features

#### Combat Improvements 
* Multi enemy combat
* Implement MP (Magic Points) system for more powerful attacks or healing spells

#### System Improvements 
* Allow player to set stats upon first creation, setting HP/Power/MP from a “pot” of points.
* Items and weapons in shops
* Create dudgeons with an end boss dropping bigger rewards

#### UX Improvements
* A player and enemy icon during combat

## Technologies used 

- HTML5
  - The project uses HTML5 to build and style.
- CSS3
  - The project uses CSS3 to further style and hide/show content for game flow 
- Javascript 
  - The project uses Javascript for an interactive user experience and to set objects
- [Bootstrap](https://getbootstrap.com/)
  - The project uses Bootstrap, helpers and the grid system
- [Google fonts](https://fonts.google.com/)
  - The project uses Google fonts for fonts
- [JQuery](https://jquery.com)
  - The project uses **JQuery** to simplify DOM manipulation and create the game flow

## Testing

I have done manual testing for the game. I have created a testing tickbox spreadsheet which I have used throughout the dev process to keep track of what features and responsive design. The app has displayed properly being testing on multiple devices and screen sizes.


* [Testing](static/wireframes/Testing.png) 

* For each feature, I click through on every link possible and make sure there are no dead links. 
* If user tries to input a blank name, the alert “You surely must have a name!” fires and the if loop is returned to the start.
* Save/Load messages are handled through if loops passing alert and confirm messages to the user.
* If a player doesn’t have enough gold, this is handled through an alert passed to the user.

There was an issue with the Fight or Shop buttons not hiding when combat began, but changing these to icons has resolved the issue.

## Deployment

The code is hosted on [Github](https://github.com/JackSnowdon/die-hard) with a live version being hosted on [GitHub Pages](https://jacksnowdon.github.io/die-hard/) 

I built the code on AWS Cloud9, originally facing issues pushing to github, however I have used the following commands to overcome any issues:

* git config --global user.name "JackSnowdon"     
* git config --global user.email jacksnowdondrums@gmail.com
* git push --set-upstream origin master

To deploy locally:

* Clone repository or use git pull
* On AWS Cloud 9 preview index.html
* Elsewhere, view index.html

## Credits

### Media
* Icons are from the free source site [Game Icons](https://game-icons.net/)

### Content
* Initial project inspiration came from creating DND Dice Rolls (D4, D6, D8, D10, D12 & D20)
* Useful article for keeping the scope of the project in mind can be found [Here](https://www.freecodecamp.org/news/learning-javascript-by-making-a-game-4aca51ad9030/)


### Acknowledgements 
* As ever the Code Institute Team for listening to rants
* Brian Macharia for jumping onboard as my mentor and helping my head focus
* DND for inspiring every RPG game ever
