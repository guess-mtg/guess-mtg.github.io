export function getPlaceholderFromInfo(info_dict) {

    let string = ''

    Object.values(info_dict).forEach( (count) => {
        let tmp = '_ '.repeat(count)
        tmp += ' '
        string += tmp
    })

    return string.slice(0,string.length-2).split(' ')             

}

export function challengeIsAvailable(challengeId) {

    let guessed = localStorage.getItem('GuessMTG@guessed')

    if (guessed) {
        guessed = JSON.parse(guessed)
        if (guessed.indexOf(challengeId) != -1) {
            return false
        }
    }

    return true
}

export function saveChallengeLocalStorage(challenge) {
    if (typeof window != 'undefined') {
        if (localStorage.getItem('GuessMTG@date') != challenge.date) {
            localStorage.setItem('GuessMTG@guesses', "[]")
        }
    }
    localStorage.setItem('GuessMTG@date', challenge.date)
    localStorage.setItem('GuessMTG@challengeId', challenge._id)

    return true
}

export function getWrongLetters(guessResponse) {
    let wl = []
    for (const key in guessResponse.stats) {
        if (guessResponse.stats[key] < 0) wl.push(guessResponse.guess[key])
    }
    return wl
}

export function getGuesses(guessResponse) {
    const guesses = JSON.parse(localStorage.getItem('GuessMTG@guesses'))
    localStorage.setItem('GuessMTG@guesses', JSON.stringify(guesses.concat(guessResponse)))
    return guesses
}

export function saveSuccessToLocalStorage(guessResponse) {
    const guessed = localStorage.getItem('GuessMTG@guessed') ? JSON.parse(localStorage.getItem('GuessMTG@guessed')) : []
    guessed.push(guessResponse['_id'])
    localStorage.setItem('GuessMTG@guessed', JSON.stringify(guessed))
    localStorage.setItem('GuessMTG@guesses', "[]")
    return true
}

export function handleWrongGuess(response) {

}