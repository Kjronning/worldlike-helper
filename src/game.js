const scorer = require('./scorer')
const solver = require('./solver')

class Game {
    constructor(words, length) {
        this.words = words;
        this.length = length;
        this.guesses = []
        this.wordLength = words[0].length
    }

    run() {
        const validWords = solver.getValidWords(this.guesses, this.words, this.wordLength)
        const topWords = scorer.getTopFiveWords(validWords)
        return {topWords, guesses: this.guesses}
    }

    validateGuess(guess) {
        const letters = guess[0].split("")
        const colors = guess[1].split("")
        return letters.length === this.wordLength && colors.length === this.wordLength && guess[1].match('^[gwy]+$')
    }

    addGuess(guess) {
        const isValid = this.validateGuess(guess);
        if (isValid){
            this.guesses.push(guess)
        }
        return isValid
    }
}

module.exports = Game