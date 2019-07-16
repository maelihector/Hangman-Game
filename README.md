# Guess The Word

## A Cosmos Themed Word Guessing Game

### What is this?

Guess The Word is a Hangman-like computer game where a player tries to guess a word letter by letter until they complete the word. 

The game plays a total of 5 words for the player. The player is allowed 10 wrong letter guesses per word before the player looses their chance of completing that word. The game keeps track of completed words and loses and shows these to the player throughout the game. 

The game is over when the player has played 5 words. 

### How does it work?

Guess The Word uses Object Oriented Programming, and has all of its code (except for events) organized inside an object with several methods that power the game. 

The game methods are called with Global Event Handlers;  `onkeyup` to capture the player's letter guess, and `onclick` to signal mouse events.

Using the DOM method `querySelector()` to find HTML elements, and `innerHTML` to get and/or set the HTML within the specified element, the game is able to keep the player updated with the game's progression. 

### What does it do?

Upon loading, the game chooses a word at random to play and builds a `string` of underscores that represent each letter of the word. The `string` is placed on the DOM for the user to see.

When the `onkeyup` event handler captures an event the game  checks if the event refers to an alphabet letter key, and if it is an alphabet key, that it is a *new* guess and not a duplicate to avoid taking points from the player if they've already guessed that letter.

Each time a correct letter is guessed, the game re-builds the previously mentioned word `string` by replacing the underscore with the correctly guessed letter. 

If a player uses up all of the 10 allowed wrong guesses, the game chooses a new word. If a player builds the entire word by replacing all of the underscores with the correct letters, the game chooses a new word.

The game also has an `onclick` event to display a hint to help players who are stuck on a word.

### Technologies Used

HTML

CSS

[Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

JavaScript

  

### Credits

[NASA Images](https://www.nasa.gov/multimedia/imagegallery/index.html)