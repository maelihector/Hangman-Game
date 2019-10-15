// cosmosGuessTheWordGame object to hold all logic and variables
var cosmosGuessTheWordGame = {

  // Object of all words
  words: {
    "carl sagan": {
      picture: "CarlSagan.jpg",
      hint: "He was the host of the orginal Cosmos documentary.",
      imageAlt: "A male astronomer in mid speech with images of planets in the background."
    },
    "neil degrasse tyson": {
      picture: "neil.jpg",
      hint: "He is the current host of the Cosmos documentary.",
      imageAlt: "A male astronomer in black suit, inside a building with a James Webb Space Telescope poster hanging in the background."
    },
    "jupiter": {
      picture: "jupiter.jpg",
      hint: "This planet has the most mass of all the planets in our Solar System.",
      imageAlt: "A planet with blue lights on its north pole, and a large red storm near the center."
    },
    "milky way galaxy": {
      picture: "milkyway.jpg",
      hint: "The name of the galaxy we live in.",
      imageAlt: "A bright swirling galaxy."
    },
    "supernova": {
      picture: "supernova.jpg",
      hint: "The violent death of a giant star",
      imageAlt: "A large, bright and colorful celestial explosion."
    },
    "titan": {
      picture: "titan.jpg",
      hint: "Saturn's largest moon.",
      imageAlt: "A blue and light-green hued moon."
    },
    "asteroid": {
      picture: "asteroid.jpg",
      hint: "What is left of comets after their ice is evaporated by the sun.",
      imageAlt: "A massive gray rock-like object with craters, flying through space."
    },
    "halleys comet": {
      picture: "halley.jpg",
      hint: "The comet that rotates around the sun every 76 years.",
      imageAlt: "A bright comet against a starry background."
    },
    "proxima centauri": {
      picture: "proximaCentauri.jpg",
      hint: "The name of the star nearest to our sun",
      imageAlt: "A large bright star among many small dimmed stars."
    },
    "event horizon": {
      picture: "eventHorizon.jpg",
      hint: "The boundary that separates a black hole from the rest of the universe.",
      imageAlt: "A celestial body with two bright, intense lights shining from opposite sides."
    },
    "tardigrade": {
      picture: "tardigrade.jpg",
      hint: "A species on earth that has lived over 500 million years.",
      imageAlt: "A microscopic view of a gray mite-like species."
    },
    "tiktaalik": {
      picture: "tiktaalik.jpg",
      hint: "One of the first animals to venture onto land from the sea.",
      imageAlt: "A drawn depiction of a long fish-like animal, half inside the water and half on land."
    }
  },

  currentWord: null,
  wordItems: [],
  lettersGuessedArray: [],
  wins: 0,
  losses: 0,
  currentHint: null,
  wordsPlayed: [],

  hintDiv: document.querySelector("#hint"),

  // Method to play a new word
  newWord: function () {
    // Update score
    this.updateDOM();
    // Remove previous word's hint
    document.querySelector("#hint").innerHTML = "";
    // Reset for a new word
    this.currentWord = null,
      this.wordItems = [],
      this.lettersGuessedArray = [],
      this.currentHint = null,
      // Pick a random word to play
      this.currentWord = Object.keys(this.words)[Math.floor(Math.random() * Object.keys(this.words).length)];
    // Check if word has already been played in current 5-game set, if so pick a new word, else add the word to wordsPlayed array
    if (this.wordsPlayed.indexOf(this.currentWord) > -1) this.newWord();
    else this.wordsPlayed.push(this.currentWord);
    // Split the word string into an array
    this.wordItems = this.currentWord.split("");
    // Update word hint
    this.currentHint = this.words[this.currentWord].hint;
    // Update word image
    document.querySelector("#image").innerHTML = "<img class='hint-image' src='./assets/images/" + this.words[this.currentWord].picture + "' alt='" + this.words[this.currentWord].imageAlt + "' />"
    // Call method to build word blanks
    this.buildWordBlanks();
  },


  avoidRepeatWords: function (word) {
    if (this.wordsPlayed.indexOf(word) > -1) return;
  },

  // Method to build the current word at play
  buildWordBlanks: function () {
    // Start with an empty string, since outcome will be a string (of letters, whitespaces, and underscores)
    var wordBlanks = "";
    // Loop through word letters
    for (var i = 0; i < this.wordItems.length; i++) {
      // Replace whitespaces with a space
      if (this.wordItems[i] === " ") {
        wordBlanks += "  ";
        // Leave letters as is if they are in `lettersGuessedArray`
      } else if (this.lettersGuessedArray.indexOf(this.wordItems[i]) !== -1) {
        wordBlanks += this.wordItems[i];
      } else {
        // Replace unguessed letters with underscores
        wordBlanks += "&nbsp;_&nbsp;";
      }
    }
    // Dump the newly builded word to DOM
    document.querySelector("#currentWord").innerHTML = wordBlanks;

    this.checkTotalCorrectGuesses();
  },

  // Method that checks if player has guessed the entire word
  checkTotalCorrectGuesses: function (uniqueLettersOfTheWord, totalGuessedLetters) {
    // Remove whitespace from the word in play
    lettersOfTheWord = this.wordItems.filter(function (str) {
      return /\S/.test(str);
    });
    // Remove repeating letters of the word
    var uniqueLettersOfTheWord = lettersOfTheWord.filter(function (item, index) {
      return lettersOfTheWord.indexOf(item) >= index;
    });
    // Grab letters already guessed
    totalGuessedLetters = this.lettersGuessedArray;

    // Start with an empty array for correct letter guesses
    var correctGuesses = [];

    // Compare guessed letters and letters of the word
    totalGuessedLetters.forEach((guessedLetter) => uniqueLettersOfTheWord.forEach((uniqueLetter) => {
      // If a guessed letter is equal to a letter in the word AND has not been compared already (prevents ducplicates for words using the same letter more than once), push to correctGuesses array
      if (guessedLetter === uniqueLetter && correctGuesses.indexOf(guessedLetter) === -1) {
        correctGuesses.push(guessedLetter)
        return correctGuesses;
      }
    }));

    // Update the DOM with  wrong guesses amount
    var wrongGuesses = this.lettersGuessedArray.length - correctGuesses.length;
    document.querySelector("#numberOfIncorrectGuesses").innerHTML = wrongGuesses;

    // Call diff() function to get incorrect letters guessed.
    var incorrectGuesses = this.diff(this.lettersGuessedArray, correctGuesses);

    // Update the DOM to show the player right and wrong guessed letters.
    document.querySelector("#wrongLettersGuessed").innerHTML = incorrectGuesses;
    document.querySelector("#rightLettersGuessed").innerHTML = correctGuesses;

    // If player has reached their limit of wrong guesses
    if (wrongGuesses === 10) {
      // Increase losses by 1
      this.losses++;
      this.updateDOM();
      // Reset wrongGuesses to 0
      wrongGuesses = 0;
      this.checkGameOver();
      // Else if player has completed the word.
    } else if (correctGuesses.length === uniqueLettersOfTheWord.length) {
      // Increase wins by 1
      this.wins++;
      this.updateDOM();
      // Reset wrongGuesses to 0
      wrongGuesses = 0;
      this.checkGameOver();
    }
  },

  // Method that returns incorrectly guessed letters by comparing correct guesses array and total guesses array
  diff: function (totalGuessesArray, correctGuessesArray) {
    // Filter total guesses array and return only those that do not appear in correct guesses array
    return totalGuessesArray.filter(function (i) {
      return correctGuessesArray.indexOf(i) < 0;
    });
  },

  // Method to check if player has played 5 games and whether they got a perfect score or not
  checkGameOver: function () {
    var totalGames = this.wins + this.losses;

    // If player has played 5 games total, reset wins and losses to 0
    if (this.wins === 5) {
      this.wins = 0;
      this.losses = 0;
      // Congratulate if player won 5 of 5
      setTimeout(function () {
        $('#perfectScoreModal').modal('show');
      }, 1000);
      this.newWord();
    } else if (totalGames === 5) {
      this.wins = 0;
      this.losses = 0;
      // Tell player they did not get 5 of 5
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
    var alphabetOnly = key.match(/[a-z]/);
    // If player presses something other than an alphabet key, tell player to press only letters
    if (alphabetOnly === null || alphabetOnly.input.length > 1) {
      $('#lettersOnlyModal').modal('show');
    } else {
      // Else pass the guessed letter into the `checkForDuplicateLetters` method
      this.checkForDuplicateLetters(alphabetOnly.input);
    }
  },

  // Method that checks if the played letter is not already in `lettersGuessedArray` to keep the player from losing a guess
  checkForDuplicateLetters: function (letter) {
    // If letter is not in `lettersGuessedArray`, push the letter to `lettersGuessedArray` 
    if (this.lettersGuessedArray.indexOf(letter) === -1) {
      this.lettersGuessedArray.push(letter);
      // Build word
      this.buildWordBlanks();
    } else {
      // Else tell player that the letter has already been played
      $('#duplicate-letter').text(letter);
      $('#noDuplicatesModal').modal('show');
    }
  },

  // Method that displays text hint when player click on the 'hint button'
  getHint: function () {
    this.hintDiv.innerHTML = this.currentHint;
  },

  updateDOM: function () {
    // Update player's current scores
    document.querySelector("#wins").innerHTML = this.wins;
    document.querySelector("#totalWordsPlayed").innerHTML = this.wins + this.losses;
  }

}

// Start game at page load
cosmosGuessTheWordGame.newWord();

// Capture the players `onkeyup` letter key
document.onkeyup = function (event) {
  var keyPressed = event.key;
  // Check if key pressed is alpha
  cosmosGuessTheWordGame.acceptOnlyAlphabetkeys(keyPressed);
};

// Listen for hint button clicks
var btn = document.getElementById("getHint");
btn.onclick = function (event) {
  cosmosGuessTheWordGame.getHint(event);
};