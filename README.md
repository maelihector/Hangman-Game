# Cosmos Hangman

## What is Cosmos Hangman?

Cosmos Hangman is a [JavaScript](https://en.wikipedia.org/wiki/JavaScript), [Cosmos TV Show](https://en.wikipedia.org/wiki/Cosmos:_A_Spacetime_Odyssey) themed game application, that runs in the browser.

The game application uses Object Oriented Programming (OOP), and has most of its code organized inside a [JavaScript](https://en.wikipedia.org/wiki/JavaScript) object.


## How does Cosmos Hangman work?

Cosmos Hangman uses [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) Web API [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document)'s methods to manipulate the HTML displayed on the browser throughout the game.

- The `querySelector()`  method is used to find HTML elements, and the
-  `innerHTML` is used to get and/or set the HTML within the specified element

Cosmos Hangman also uses some event handlers defined on the [GlobalEventHandlers](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers) mixin and implemented by [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document).

- The   `onkeyup` event handler is used to capture the player's letter guess, and the

- `onclick`  event handler is used to tell the application to display the game word's hint to the player

## What does Cosmos Hangman do?

Upon loading, the game chooses a new word at random to play, builds a string of underscores that represent each letter of the word, and then dumps the string on the DOM.

When the `onkeyup` event handler triggers, the game  checks if the event refers to a *new* alphabet letter key, if the player pressed a letter than has already been played, or pressed a non-alphabet key, it returns false, else the new letter key gets evaluated to see if it belongs to part of the word in play.

Each time a correct letter is guessed, the game re-builds the word string by replacing the underscores with the correctly guessed letter.

If a player uses up all of the 10 allowed wrong guesses, or guesses the entire word, the scores are updated and a new word is chosen to be in play.

The game ends and resets after five words have been played.

The game also has an option to display a hint to help players who are stuck on a word.

## Technologies Used

HTML

CSS

[Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

JavaScript

## Credits

### Images

[NASA Images](https://www.nasa.gov/multimedia/imagegallery/index.html)

[tiktaalik](https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2018/walkingfishh.jpg)

[tardigrade](https://media.mnn.com/assets/images/2018/03/3Dstock%20tardigrade%20shutter%20cc.jpg.653x0_q80_crop-smart.jpg)
