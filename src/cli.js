const ordlig5 = require('./../assets/ordlig5.json')
const ordlig6 = require('./../assets/ordlig6.json')
const wordle = require('./../assets/wordle.json')
const Game = require('./game')
const inquirer = require('inquirer')
const printer = require('./printer')
const { exit } = require('process')

const init = isWeekend => {
    //TODO: Create list of games, select the game.
    inquirer.prompt([
        {
            name: 'whichGame',
            message: 'What game do you want to play? (use arrow key)',
            type: 'list',
            choices: ["ordlig", "wordle"]
          },
    ]).then(answers => {
        let game;
        switch(answers.whichGame) {
            case "ordlig":
                game = new Game(isWeekend ? ordlig6 : ordlig5, isWeekend ? 6 : 5)
                break;
            case "wordle":
                game = new Game(wordle, 5)
                break;
            default:
        }
        return game;
    }).then(game => {
        if (game) {
            askGuessInput(game)
        } else {
            exit(1)
        }
    })
}

const askGuessInput = (game) => {
    inquirer.prompt([
        {
            name: 'guessWord',
            message: `please enter a ${game.wordLength} letter word`,
            type: 'input',
        },
        {
            name: 'guessColors',
            message: `please enter the colors for each letter (g = Green, y = Yellow, w = Gray)`,
            type: 'input',
        },        
    ]).then(answers => {
        if(answers.guessColors.length === game.wordLength && answers.guessColors.match(/\b(g)\1+\b/)){
            console.log("You won!")
            exit(0)
        }
        const valid = game.addGuess([answers.guessWord, answers.guessColors])
        if (valid) {
            const {topWords, guesses} = game.run();
            console.log("your guesses so far:")
            guesses.forEach(guess => console.log(printer.getPrintableGuess(guess)))
            console.log("\ntop five words:")
            topWords.forEach(word  => console.log(word))
        } else {
            console.log("Invalid guess. Try again.")
        }
        askGuessInput(game)
     })
}

module.exports = { init }