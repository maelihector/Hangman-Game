// cosmosGuessTheWordGame object to hold all logic and variables
var cosmosGuessTheWordGame = {

  //Object of all words, plus their picture and hint that will be used in the game
  words: {
    "carl sagan": {
      picture: "CarlSagan.jpg",
      hint: "He was the host of the orginal Cosmos documentary."
    },
    "neil degrasse tyson": {
      picture: "neil.jpg",
      hint: "He is the current host of the Cosmos documentary."
    },
    "jupiter": {
      picture: "jupiter.jpg",
      hint: "This planet has the most mass of all the planets in our Solar System."
    },
    "milky way galaxy": {
      picture: "milkyway.jpg",
      hint: "The name of the galaxy we live in."
    },
    "supernova": {
      picture: "supernova.jpg",
      hint: "The violent death of a giant star"
    },
    "titan": {
      picture: "titan.jpg",
      hint: "Saturn's largest moon."
    },
    "asteroid": {
      picture: "asteroid.jpg",
      hint: "What is left of comets after their ice is evaporated by the sun."
    },
    "halleys comet": {
      picture: "halley.jpg",
      hint: "The comet that rotates around the sun every 76 years."
    },
    "proxima centauri": {
      picture: "proximaCentauri.jpg",
      hint: "The name of the star nearest to our sun"
    },
    "event horizon": {
      picture: "eventHorizon.jpg",
      hint: "The boundary that separates a black hole from the rest of the universe."
    },
    "tardigrade": {
      picture: "tardigrade.jpg",
      hint: "A species on earth that has lived over 500 million years."
    },
    "tiktaalik": {
      picture: "tiktaalik.jpg",
      hint: "One of the first animals to venture onto land from the sea."
    }
  },

  currentWord: null,
  wordItems: [],
  lettersGuessedArray: [],
  wins: 0,
  losses: 0,
  currentHint: null,
  wordsAlreadyPlayed: [],

  // Method to play a new word.
  newWord: function () {
    // Update player's current scores.
    document.querySelector("#wins").innerHTML = this.wins;
    document.querySelector("#totalWordsPlayed").innerHTML = this.wins + this.losses;
    // Hide last hint if need be.
    document.querySelector("#hint").innerHTML = "";
    // Reset for a new word.
    this.currentWord = null,
      this.wordItems = [],
      this.lettersGuessedArray = [],
      this.currentHint = null,

      // Set value of 'gameWords' variable to 'words' in our 'cosmosGuessTheWordGame' object.
      gameWords = Object.keys(this.words);
    // Pick a random word to play and set the result as the value of 'this.currentWord'.
    this.currentWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    // Check if word has already been played, of so pick a new word.
    if (this.wordsAlreadyPlayed.indexOf(this.currentWord) > -1) this.newWord();
    // else add the word to wordsAlreadyPlayed array.
    else this.wordsAlreadyPlayed.push(this.currentWord);
    // Slpit the string into an array and set the result as the value of 'this.wordItems'.
    this.wordItems = this.currentWord.split("");
    // Give the global var the current hint.
    this.currentHint = this.words[this.currentWord].hint;
    // Update the image of the word.
    document.querySelector("#image").innerHTML = "<img class='hint-image' src='./assets/images/" + this.words[this.currentWord].picture + "' alt='image of hidden word' />"

    this.buildWordBlanks();
  },

  avoidRepeatWords: function (word) {

    if (this.wordsAlreadyPlayed.indexOf(word) > -1) return;
  },

  // Method to build the current word at play on the DOM. 
  buildWordBlanks: function () {
    // Start with an empty string, since outcome will be a string (of letters, whitespaces, and underscores).
    var wordBlanks = "";
    // Loop through 'this.wordItems' array.
    for (var i = 0; i < this.wordItems.length; i++) {
      // If there is a whitespace, make sure to add a space.
      if (this.wordItems[i] === " ") {
        wordBlanks += "  ";
        // Check 'this.lettersGuessedArray' against 'this.wordItems' for matches to fill correctly guessed letters.
      } else if (this.lettersGuessedArray.indexOf(this.wordItems[i]) !== -1) {
        wordBlanks += this.wordItems[i];
      } else {
        // Put underscores for every item left of 'this.wordItems'.
        wordBlanks += "&nbsp;_&nbsp;";
      }
    }
    // Access the DOM to 'draw' our wordBlanks.
    document.querySelector("#currentWord").innerHTML = wordBlanks;
    // Call 'checkTotalCorrectGuesses' method
    this.checkTotalCorrectGuesses();
  },

  // Method that checks if player has guessed the entire word.
  // Pass the method two arguments, one being the letters of the word in play, the other being the player's guesses.
  checkTotalCorrectGuesses: function (uniqueLettersOfTheWord, totalGuessedLetters) {
    // First filter/remove whitespace from the word in play
    lettersOfTheWord = this.wordItems.filter(function (str) {
      return /\S/.test(str);
    });
    // Then filter repeating letters of the word and place new array in var 'uniqueletterOfTheWord'.
    var uniqueLettersOfTheWord = lettersOfTheWord.filter(function (item, index) {
      return lettersOfTheWord.indexOf(item) >= index;
    });
    // Grab the value of global var 'this.lettersGuessedArray'.  
    totalGuessedLetters = this.lettersGuessedArray;

    // Start with an empty array for 'correctGuesses'
    var correctGuesses = [];

    // Compare the 'totalGuessedLetters' and  'uniqueletterOfTheWord' arrays
    totalGuessedLetters.forEach((guessedLetter) => uniqueLettersOfTheWord.forEach((uniqueLetter) => {
      // If a guessed letter is equal to a unique letter in the word AND if it's not in there already (to prevent ducplicates if a word has more than one of the same letter),
      if (guessedLetter === uniqueLetter && correctGuesses.indexOf(guessedLetter) === -1) {
        // push to correctGuesses array
        correctGuesses.push(guessedLetter)
        return correctGuesses;
      }
    }));

    // Update the DOM with  wrong guesses amount.
    wrongGuesses = this.lettersGuessedArray.length - correctGuesses.length;
    document.querySelector("#numberOfIncorrectGuesses").innerHTML = wrongGuesses;

    // Call diff() function to get incorrect letters guessed.
    var incorrectGuesses = this.diff(this.lettersGuessedArray, correctGuesses);
    // Update the DOM to show the player right and wrong guessed letters.
    document.querySelector("#wrongLettersGuessed").innerHTML = incorrectGuesses;
    document.querySelector("#rightLettersGuessed").innerHTML = correctGuesses;

    // Check if player has reached their limit to wrong guesses.
    if (wrongGuesses === 10) {
      // increase losses by +1
      this.losses++;
      // reset wrongGuesses to 0
      wrongGuesses = 0;
      this.checkGameOver();
      // Or if player has completed the word.
    } else if (correctGuesses.length === uniqueLettersOfTheWord.length) {
      // increase wins by +1
      this.wins++;
      // reset wrongGuesses to 0
      wrongGuesses = 0;
      this.checkGameOver();
    }
  },

  // Method that returns incorrectly guessed letters by comparing correct guesses array and total guesses array
  diff: function(totalGuessesArray, correctGuessesArray) {
    // filter total guesses array and return only those that do not appear in correct guesses array.
    return totalGuessesArray.filter(function(i) {return correctGuessesArray.indexOf(i) < 0;});
  },

  // Method to check if player has played 5 games and whether they got a perfect score or not.
  checkGameOver: function () {
    totalGames = this.wins + this.losses;

    // If player has played 5 games total, reset wins and losses to 0;
    if (this.wins === 5) {
      this.wins = 0;
      this.losses = 0;
      // Congratulate if player won 5 of 5.
      setTimeout(function () {
        $('#perfectScoreModal').modal('show');
      }, 1000);
      this.newWord();
    } else if (totalGames === 5) {
      this.wins = 0;
      this.losses = 0;
      // Tell player they did not get 5 of 5.
      setTimeout(function () {
        $('#fiveWordsPlayedModal').modal('show');
      }, 1000);
      this.newWord();
    } else {
      this.newWord();
    }
  },

  // This method makes sure that player's only play letter keys
  acceptOnlyAlphabetkeys: function (key) {
    alphabetOnly = key.match(/[a-z]/);
    // If player presses something other than an alphabet key,
    if (alphabetOnly === null || alphabetOnly.input.length > 1) {
      //  tell player to press a only letters via modal.
      $('#lettersOnlyModal').modal('show');
    } else {
      // If a letter is pressed, pass the guessed letter into the checkForDuplicateLetters method.
      this.checkForDuplicateLetters(alphabetOnly.input);
    }
  },

  // This method checks if the played letter is not already in the lettersGuessedArray to keep the player from losing a guess.
  checkForDuplicateLetters: function (letter) {
    // If letter is not (-1) in our lettersGuessedArray,
    if (this.lettersGuessedArray.indexOf(letter) === -1) {
      // push the letter to lettersGuessedArray 
      this.lettersGuessedArray.push(letter);
      // call 'buildWordBlanks' metthod.
      this.buildWordBlanks();
    } else {
      // Tell player that letter has already been played.
      $('#duplicate-letter').text(letter);
      $('#noDuplicatesModal').modal('show');
    }
  },

  // Method that displays text hint when player click on the 'hint button'
  getHint: function () {
    // Access the target aread of the DOM
    var hintDiv = document.querySelector("#hint");
    // Display text in target area.
    hintDiv.innerHTML = this.currentHint;
  },

}

// Start game at page load.
cosmosGuessTheWordGame.newWord();


// Capture the players 'onkeyup' letter key
document.onkeyup = function (event) {
  keyPressed = event.key;
  // Pass keyPressed value to our acceptOnlyAlphabetkeys method.
  cosmosGuessTheWordGame.acceptOnlyAlphabetkeys(keyPressed);
}

// Listen for hint button clicks
var btn = document.getElementById("getHint");
btn.onclick = function (event) {
  cosmosGuessTheWordGame.getHint(event);
};

/* 

Hangman Pseudocode 

The player clicks on letters of their keyboard they think will complete the word in play.

What the page will show the player:
1. '0 0f 0' 'wins' of 'total words played'. Tell player they will only play 5 games (5 of 5 is perfect score).
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