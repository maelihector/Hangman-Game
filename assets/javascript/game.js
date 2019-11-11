// cosmosGuessTheWordGame object to hold all logic and variables
var cosmosGuessTheWordGame = {

  // Object of all words objects
  words: {
    "carl sagan": {
      image: "CarlSagan.jpg",
      hint: "He was the host of the orginal Cosmos documentary.",
      imageAlt: "A man with images of planets in the background."
    },
    "neil degrasse tyson": {
      image: "neil.jpg",
      hint: "He is the current host of the Cosmos documentary.",
      imageAlt: "A man with a James Webb Space Telescope poster."
    },
    "jupiter": {
      image: "jupiter.jpg",
      hint: "The planet with the most mass in our Solar System.",
      imageAlt: "A planet with a large red storm near the center."
    },
    "milky way galaxy": {
      image: "milkyway.jpg",
      hint: "The name of the galaxy we live in.",
      imageAlt: "A bright swirling galaxy."
    },
    "supernova": {
      image: "supernova.jpg",
      hint: "The violent death of a giant star",
      imageAlt: "A large, bright and colorful celestial explosion."
    },
    "titan": {
      image: "titan.jpg",
      hint: "Saturn's largest moon.",
      imageAlt: "A blue and light-green hued moon."
    },
    "asteroid": {
      image: "asteroid.jpg",
      hint: "What is left of comets after their ice is evaporated by the sun.",
      imageAlt: "A massive rock-like object flying through space."
    },
    "halleys comet": {
      image: "halley.jpg",
      hint: "The comet that rotates around the sun every 76 years.",
      imageAlt: "A bright comet against a starry background."
    },
    "proxima centauri": {
      image: "proximaCentauri.jpg",
      hint: "The name of the star nearest to our sun",
      imageAlt: "A large bright star among many small dimmed stars."
    },
    "event horizon": {
      image: "eventHorizon.jpg",
      hint: "The boundary that separates a black hole from the universe.",
      imageAlt: "A celestial body with lights shining from opposite sides."
    },
    "tardigrade": {
      image: "tardigrade.jpg",
      hint: "A species on earth that has lived over 500 million years.",
      imageAlt: "A microscopic view of a gray mite-like species."
    },
    "tiktaalik": {
      image: "tiktaalik.jpg",
      hint: "One of the first animals to venture onto land from the sea.",
      imageAlt: "A fish-like animal, half inside the water and half on land."
    }
  },

  // Current word in play and its hint in play
  currentWord: null,
  currentHint: null,
  // Word as is, with spaces
  wordString: [],
  // Word without spaces or duplicate letters
  wordLetters: [],
  // All letters the player has guessed for the current word
  lettersGuessed: [],
  // Letters the player has guessed right
  correctGuesses: [],
  // Letters the player has guessed wrong
  wrongGuesses: [],
  // Number of times the player has guessed wrong
  numberWrongGuesses: 0,
  // All words that have been played in the 5-set game (prevents re-playing them)
  wordsPlayed: [],

  // Number of wins and losses per 5-set game
  wins: 0,
  losses: 0,

  // Prevent keys from playing when game is finished
  inPlay: true,

  // HTML element to show word on DOM
  hintDiv: document.querySelector("#hint"),

  // Method to start the game or play a new word
  newWord: function () {
    this.inPlay = true;
    // Reset for a new word
    this.currentWord = null;
    this.currentHint = null;
    this.wordString = [];
    this.wordLetters = [];
    this.lettersGuessed = [];
    this.correctGuesses = [];
    this.wrongGuesses = [];
    this.numberWrongGuesses = 0;
    this.hintDiv.innerHTML = "";

    // Pick a random word to play
    var gameWords = Object.keys(this.words);
    this.currentWord = gameWords[Math.floor(Math.random() * gameWords.length)];

    // Check if chosen word has been played in 5-set game yet, if so, use recursion to pick new word
    if (this.wordsPlayed.indexOf(this.currentWord) > -1) this.newWord();
    else {
      // Add current to wordsPlayed array
      this.wordsPlayed.push(this.currentWord);

      // Set `wordString` to value of current word split into an array
      this.wordString = this.currentWord.split("");

      // Remove spaces and duplicate letters from current word
      var letters = this.wordString.filter(function (str) {
        return /\S/.test(str);
      });
      this.wordLetters = letters.filter(function (item, index) {
        return letters.indexOf(item) >= index;
      });

      // Update word hint value
      this.currentHint = this.words[this.currentWord].hint;

      // Update image on DOM
      document.querySelector("#image").innerHTML = "<img class='hint-image' src='./assets/images/" + this.words[this.currentWord].image + "' alt='" + this.words[this.currentWord].imageAlt + "' />";

      // Call method to build word blanks
      this.buildWordBlanks();
    }
  },

  // Method to build the current word at play
  buildWordBlanks: function () {

    // Start with an empty string, since outcome will be a string (of letters, whitespaces, and underscores)
    var wordBlanks = "";

    // Loop through current word string
    for (var i = 0; i < this.wordString.length; i++) {
      // Replace whitespaces with a space
      if (this.wordString[i] === " ") {
        wordBlanks += "  ";
        // Leave letters as is if they are in `correctGuesses`
      } else if (this.correctGuesses.indexOf(this.wordString[i]) !== -1) {
        wordBlanks += this.wordString[i];
      } else {
        // Replace unguessed letters with underscores
        wordBlanks += "&nbsp;_&nbsp;";
      }
    }
    // Dump the newly built word to DOM
    document.querySelector("#currentWord").innerHTML = wordBlanks;
  },

  // Method to check if letter guessed is part of the game word
  checkLetterGuessed: function (letter) {
    // If letter is correct, push to correct guesses array
    if (this.wordLetters.indexOf(letter) > -1) {
      this.correctGuesses.push(letter);
      // Else push to wrong guesses array
    } else {
      this.wrongGuesses.push(letter);
      // Increase the number of wrong guesses
      this.numberWrongGuesses++;
    }
    // Check if player has played entire word
    this.checkTotalCorrectGuesses();
    this.buildWordBlanks();
    // Update DOM
    this.updateDOM();
  },

  // Method that checks if player has guessed the entire word
  checkTotalCorrectGuesses: function () {
    // If player has completed the word
    if (this.correctGuesses.length === this.wordLetters.length) {
      this.inPlay = false;
      this.wins++;
      setTimeout(function () {
        cosmosGuessTheWordGame.checkGameOver();
      }, 1000);
    }
    // If player has reached their limit of wrong guesses
    else if (this.numberWrongGuesses === 10) {
      this.inPlay = false;
      this.losses++;
      setTimeout(function () {
        cosmosGuessTheWordGame.checkGameOver();
      }, 1000);
    } else {
      // Rebuild word
      this.buildWordBlanks();
    }

  },

  // Method to check if player has played 5 games and whether they got a perfect score or not
  checkGameOver: function () {
    // Check if 5 games have been played
    var totalGames = this.wins + this.losses;
    if (totalGames === 5) {
      // Congratulate if player won 5 of 5
      if (this.wins === 5) {
        setTimeout(function () {
          $("#perfectScoreModal").modal("show");
        }, 1000);
        cosmosGuessTheWordGame.wins = 0;
        // Tell player they did not get 5 of 5
      } else {
        $("#wrong").text(cosmosGuessTheWordGame.wins);
        setTimeout(function () {
          $("#fiveWordsPlayedModal").modal("show");
        }, 1000);
        cosmosGuessTheWordGame.losses = 0;
        cosmosGuessTheWordGame.wins = 0;
      }
      this.wordsPlayed = [];
    }
    // else this.newWord();
    this.newWord();
    this.updateDOM();
  },

  // Method to make sure that the player only plays letter keys
  acceptOnlyAlphabetkeys: function (key) {
    var alphabetOnly = key.match(/[a-z]/);
    // If player presses something other than an alphabet key return false
    if (alphabetOnly === null || alphabetOnly.input.length > 1) {
      return false;
    } else {
      // Else pass the guessed letter into the `checkForDuplicateLetters` method
      this.checkForDuplicateLetters(alphabetOnly.input);
    }
  },

  // Method that checks if letter is not already in `lettersGuessed` to keep the player from losing a guess
  checkForDuplicateLetters: function (letter) {
    // If letter is not already in `lettersGuessed` array, push the letter to `lettersGuessed`
    if (this.lettersGuessed.indexOf(letter) === -1) {
      this.lettersGuessed.push(letter);
      // Check if letter is part of the current word
      this.checkLetterGuessed(letter);
    } else return false;
  },

  // Method that displays text hint when player click on the 'hint button'
  getHint: function () {
    this.hintDiv.innerHTML = this.currentHint;
  },

  // Method to update game stats to the DOM
  updateDOM: function () {
    // Update player's current scores
    document.querySelector("#wins").innerHTML = this.wins;
    document.querySelector("#totalWordsPlayed").innerHTML = this.wins + this.losses;
    document.querySelector("#numberOfIncorrectGuesses").innerHTML = this.numberWrongGuesses;
    // Update the DOM to show the player right and wrong guessed letters.
    document.querySelector("#wrongLettersGuessed").innerHTML = this.wrongGuesses;
    document.querySelector("#rightLettersGuessed").innerHTML = this.correctGuesses;

  }
};

// Start game at page load
cosmosGuessTheWordGame.newWord();

// Capture the players `onkeyup` letter key
document.onkeyup = function (event) {
  var keyPressed = event.key;
  // Check if key pressed is alpha and that a word is in play
  if (cosmosGuessTheWordGame.inPlay) cosmosGuessTheWordGame.acceptOnlyAlphabetkeys(keyPressed);
  else return false;
};

// Listen for hint button clicks
var btn = document.getElementById("getHint");
btn.onclick = function (event) {
  cosmosGuessTheWordGame.getHint(event);
};