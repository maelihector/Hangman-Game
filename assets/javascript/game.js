// Hangman object to hold all logic and variables
var cosmosGuessTheWordGame = {

    //Object of all words, plus their picture and hint that will be used in the game
    words: {
        carlSagan: {
            word: "Carl Sagan",
            picture: "../images/CarlSagan.tiff",
            hint: "He was the host of the orginal Cosmos documentary."
        },
        neilTyson: {
            word: "Neil deGrasse Tyson",
            picture: "../images/neil.jpg",
            hint: "He is the current host of the Cosmos documentary."
        },
        jupiter: {
            word: "Jupiter",
            picture: "../images/jupiter.jpg",
            hint: "This planet has the most mass of all the planets in our Solar System."
        },
        milkyWay: {
            word: "Milky Way Galaxy",
            picture: "../images/milkyway.jpg",
            hint: "The name of the galaxy we live in."
        },
        supernova: {
            word: "Supernova",
            picture: "../images/supernova.jpg",
            hint: "The violent death of a giant star"
        },
        titan: {
            word: "Titan",
            picture: "../images/titan.jpg",
            hint: "Saturn's largest moon."
        },
        asteroid: {
            word: "Asteroid",
            picture: "../images/asteroid.jpg",
            hint: "What is left of comets after their ice is evaporated by the sun."
        },
        halley: {
            word: "Halley's Comet",
            picture: "../images/halley.jpg",
            hint: "The comet that rotates around the sun every 76 years."
        },
        proximaCentauri: {
            word: "Proxima Centauri",
            picture: "../images/proximaCentauri.jpg",
            hint: "The name of the star nearest to our sun"
        },
        eventHorizon: {
            word: "Event Horizon",
            picture: "../images/eventHorizon.jpg",
            hint: "The boundary that separates a black hole from the rest of the universe."
        }
    }
}