//< >

const getAll = (doubleArray) => doubleArray.map(l => l.join("")).join("").split("")

//avoids marking non-repeat yellow letters as excluded 
const getTotallyExcluded = (included, excluded) => excluded.filter( x => !included.includes(x))

//creates a regex string to match words to.
const getRegexString = (ordered, excluded, included) => {
    const totallyExcluded = getTotallyExcluded(getAll(included), getAll(excluded));
    let s = ""
    for (let i=0; i< ordered.length; i++) {
        if (ordered[i] !== '*'){
            s += ordered[i]
        } else {
            //This should avoid having excluded repeat letters from appearing in the specific spaces where they're not doubled 
            const localExcluded = Array.from(new Set(totallyExcluded.concat(...included[i]).concat(...excluded[i]))).join("")
            s += `[^${localExcluded}]`
        }
    }
    console.log({s})
    return s;
}

const createLists = (guesses, wordLength) => {
    const ordered = new Array(wordLength).fill('*')
    const unordered = Array.from({length: wordLength}, () => [])
    const excluded = Array.from({length: wordLength}, () => [])
    guesses.forEach(guess => {
        const letters = guess[0].split("")
        const colors = guess[1].split("")

        for(let i=0; i < wordLength; i++) {
            const letter = letters[i]
            switch(colors[i]){
                case 'g':
                    ordered[i] = letter;
                    break;
                case 'y':
                    unordered[i].push(letter)
                    break;
                case 'w':
                    excluded[i].push(letter)
                    break;
                default:
                    console.log("WHAT THE HECK")
            }
        }
    })
    return {ordered, unordered, excluded}
}

const search = (lists, words)  => {
    const regex = getRegexString(lists.ordered, lists.excluded, lists.unordered);
    return words.filter(word => word.match(regex) &&
     getAll(lists.unordered).every(letter => word.includes(letter)))
}

const getValidWords = (guesses, words, wordLength) => {
    const lists = createLists(guesses, wordLength);
    return search(lists, words);
}

module.exports = {getValidWords}
