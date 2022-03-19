//< >

const getAllIncluded = (included) => included.map(l => l.join("")).join("").split("")

//avoids marking non-repeat yellow letters as excluded 
const getActualExcluded = (allIncluded, excluded) => excluded.filter( x => !allIncluded.includes(x))

const getRegexString = (ordered, excluded, included) => {
    const actualExcluded = getActualExcluded(getAllIncluded(included), excluded);
    let s = ""
    for (let i=0; i< ordered.length; i++) {
        if (ordered[i] !== '*'){
            s += ordered[i]
        } else {
            const localExcluded = Array.from(new Set((actualExcluded.join("")+included[i].join("")).split(""))).join("")
            s += `[^${localExcluded}]`
        }
    }
    console.log({s})
    return s;
}

const createLists = (guesses, wordLength) => {
    const ordered = new Array(wordLength).fill('*')
    const unordered = Array.from({length: wordLength}, () => [])
    const excluded = []
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
                    excluded.push(letter)
                    break;
                default:
                    console.log("WHAT THE FUCK")
            }
        }
    })
    return {ordered, unordered, excluded}
}

const search = (lists, words)  => {
    const regex = getRegexString(lists.ordered, lists.excluded, lists.unordered);
    return words.filter(word => word.match(regex) &&
     getAllIncluded(lists.unordered).every(letter => word.includes(letter)))
}

const getValidWords = (guesses, words, wordLength) => {
    const lists = createLists(guesses, wordLength);
    return search(lists, words);
}

module.exports = {getValidWords}
