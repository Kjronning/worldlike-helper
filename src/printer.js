const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const WHITE = '\x1b[37m'
const NORMAL = '\x1b[0m'

const getColor = (colorCode)  => {
    switch(colorCode) {
        case 'y':
            return YELLOW;
        case 'g':
            return GREEN;
        case 'w': 
            return WHITE;
        default:
            return NORMAL;
    }
} 

const getPrintableGuess = (guess)  => {
    const letters = guess[0].split("")
    const colors = guess[1].split("").map(c  => getColor(c))
    let printable = ""
    for (let i=0; i < letters.length; i++) {
        printable += colors[i] + letters[i]
    }
    return printable+NORMAL
}

module.exports = {getPrintableGuess}