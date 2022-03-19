const generateLetterScoreMaps = (l) =>  {
    return Array.from({length: l}, () =>  new Map())
}

const countWord = (word, scoreMaps) => {
    const letters = word.split("")
    for (let i = 0; i < letters.length; i++) {
        const score = scoreMaps[i].get(letters[i])
        scoreMaps[i].set(letters[i], score ? score + 1 : 1)
    }
}

const getWordScore = (word, scoreMaps) => {
    const letters = word.split("")
    let total = 0
    for (let i = 0; i < letters.length; i++) {
        total += scoreMaps[i].get(letters[i])
    }
    return total
}

const getWordsScore = (words, scoreMaps) => {
    words.forEach(word => countWord(word, scoreMaps))
    const unorderedMap = new Map(words.map(word => {
        const score = getWordScore(word, scoreMaps)
        return [word, score]
    }))
    return new Map([...unorderedMap.entries()].sort((a, b) => b[1] - a[1]));
}

const getTopFiveWords = words => {
    const scoreMaps = generateLetterScoreMaps(words[0].length)
    const wordScoreMap = getWordsScore(words, scoreMaps)
    return Array.from(wordScoreMap.keys()).slice(0,5)
}

module.exports = {getTopFiveWords}
