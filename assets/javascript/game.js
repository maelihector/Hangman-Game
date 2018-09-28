// cosmosGuessTheWordGame object to hold all logic and variables
var cosmosGuessTheWordGame = {

    //Object of all words, plus their picture and hint that will be used in the game
    words: {
        "carl sagan": {
            picture: "../images/CarlSagan.tiff",
            hint: "He was the host of the orginal Cosmos documentary."
        },
        "neil degrasse tyson": {
            picture: "../images/neil.jpg",
            hint: "He is the current host of the Cosmos documentary."
        },
        "jupiter": {
            picture: "../images/jupiter.jpg",
            hint: "This planet has the most mass of all the planets in our Solar System."
        },
        "milky way galaxy": {
            picture: "../images/milkyway.jpg",
            hint: "The name of the galaxy we live in."
        },
        "supernova": {
            picture: "../images/supernova.jpg",
            hint: "The violent death of a giant star"
        },
        "titan": {
            picture: "../images/titan.jpg",
            hint: "Saturn's largest moon."
        },
        "asteroid": {
            picture: "../images/asteroid.jpg",
            hint: "What is left of comets after their ice is evaporated by the sun."
        },
        "halleys comet": {
            picture: "../images/halley.jpg",
            hint: "The comet that rotates around the sun every 76 years."
        },
        "proxima centauri": {
            picture: "../images/proximaCentauri.jpg",
            hint: "The name of the star nearest to our sun"
        },
        "event horizon": {
            picture: "../images/eventHorizon.jpg",
            hint: "The boundary that separates a black hole from the rest of the universe."
        }
    },

    currentWord: null,
    wordItems: [],

    letterGuess: null,
    lettersGuessedArray: [],

    newWord: function () {
        // Start playing game words by picking a random word
        // ** Be sure to add code that prevents the same word being played in a game set.
        var gameWords = Object.keys(this.words);
        console.log(gameWords); // check
        this.currentWord = gameWords[Math.floor(Math.random() * gameWords.length)];

        this.wordItems = this.currentWord.split("");

        this.buildWordBlanks();
    },

    buildWordBlanks: function () {
        console.log(this.wordItems); // check
        var wordBlanks = "";
        for (var i = 0; i < this.wordItems.length; i++) {
            // If there is a whitespace in the word/name, make sure to add a space to the DOM.
            if (this.wordItems[i] === " ") {
                wordBlanks += "  ";
            } else if (this.lettersGuessedArray.indexOf(this.wordItems[i]) !== -1) {
                wordBlanks += this.wordItems[i];
            } else {
                // Put underscores for evry unguessed letter of the current word.
                wordBlanks += "&nbsp;_&nbsp;";
            }
        }
        document.querySelector("#currentWord").innerHTML = wordBlanks;
    },

    // This method makes sure that users only play letter keys
    acceptAlphabetOnlyKeys: function (key) {
        alphabetOnly = key.match(/[a-z]/);
        console.log(alphabetOnly); // Check 
        // If player presses something other than an alphabet key,
        if (alphabetOnly === null || alphabetOnly.input.length > 1) {
            console.log("Press only letters please!"); // Check
            //  tell player to press a only letters via modal.
            $('#lettersOnlyModal').modal('show');
        } else {
            // If a letter is pressed, pass the guessed letter into the checkForDuplicateLetters method.
            this.checkForDuplicateLetters(alphabetOnly.input);
        }
    },

    // This method checks if the played letter is not already in the lettersGuessedArray to keep the player from losing a guess.
    checkForDuplicateLetters: function (letter) {
        // If letter is NOT in lettersGuessedArray,
        if (this.lettersGuessedArray.indexOf(letter) === -1) {
            // push the letter to lettersGuessedArray 
            this.lettersGuessedArray.push(letter);
            console.log(this.lettersGuessedArray); // Check
            this.buildWordBlanks();
        } else {
            console.log("You already guessed " + letter); // Check
            $('#noDuplicatesModal').modal('show');
        }
    }
}
cosmosGuessTheWordGame.newWord();

// Log lettersGuessedArray for inital reference
console.log(cosmosGuessTheWordGame.lettersGuessedArray); // check

// Capture the players 'onkeyup' letter key
document.onkeyup = function (event) {
    keyPressed = event.key;
    // Pass keyPressed value to our acceptAlphabetOnlyKeys method.
    cosmosGuessTheWordGame.acceptAlphabetOnlyKeys(keyPressed);
}

/* 

Hangman Pseudocode 

The player clicks on letters of their keyboard they think will complete the word in play.

What the page will show the player:
1. '0 0f 0' 'wins' of 'total words played'. Tell player there are only 10 words to play (10 of 10 is perfect score).
2. 10 as limit to 'number of incorrect guesses'. Will decrease -1 as player guesses a wrong letter.
3. List of ALL 'Letters Guessed'. *Will not allow the player to guess the same letter twice to as not lose a guess on duplicates.
4. Show the number of blanks as underscores( _ ) for every letter of the current word in play, 
   and a single white space for spaces in between words..
5.Show a hint button, and have it blink lightly when the player has only 2 guesses left.

For every letter clicked/guessed while word is in play:
    1. Check 'lettersGuessed' array for duplicates: 
        A. If negative match to 'lettersGuessed' array:
            1. Push letter to 'lettersGuessed' array.
            2. Check 'wordInPlay' array to see if there is a letter/item match.
                a. If positive match of a 'wordInPlay' array item:
                    1. Replace the appropriate _ with said letter.
                    2. Check 'wordInPlay' to see if word is complete:
                        I. If word is complete:
                            1. Have modal show player won that game by completing the word.
                            2. Show photo of corresponding word.
                            3. +1 on 'wins'.
                            4. +1 on 'totalWordsPlayed'.
                                a. If 'totalWordsPlayed' = 10:
                                    1. Show modal to tell player that all words have been played, show final score.
                                    2. Reset whole Game.
                                b. If 'totalWordsPlayed' < 10:
                                    1. Play next word.
                        II. If word not complete:
                            1. Wait for next guess.
                b. If negative match to 'wordInPlay' array item:
                    1. Decrease by -1 on 'incorrectGuesses'.
                        I. If 'incorrectGuesses' is < 0:
                            1. Wait for next guess.
                        II. If 'incorrectGuesses' < 3 && > 0:
                            1. Blink the Hint Button *if hint is not already displayed.
                            2. Wait for next guess.
                        III. If 'incorrectGuesses' = 0:
                            1. Have modal show player that they have 0 guesses left so they lost that game.
                            2. +1 on 'totalWordsPlayed'.
                                a. If 'totalWordsPlayed' = 10:
                                    1. Show modal to tell player that all words have been played, show final score.
                                    2. Reset whole Game.
                                b. If 'totalWordsPlayed' < 10:
                                    1. Play next word.
        B. If positive match to 'lettersGuessed' array:
            1. Have modal tell player 'You have already guessed _ , guess a new letter.'
            2. Wait for next guess.
 

















*/