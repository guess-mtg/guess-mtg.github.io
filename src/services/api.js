import { 
    getPlaceholderFromInfo, 
    challengeIsAvailable , 
    saveChallengeLocalStorage, 
    saveSuccessToLocalStorage, 
    getWrongLetters,
    getGuesses
} from '../utils'


const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8000"


function getHeaders() {
    return {
        "Authorization": `Bearer ${localStorage.getItem("GuessMTG@token")}`
    }
}

export function authenticate({ username, password }) {

    const data = new FormData()
    data.append("username", username)
    data.append("password", password)

    const url = `${baseUrl}/auth`
    const config = { 
        method: "POST",
        body: data
    }

    return fetch(url, config)
        .then( (response) => {
            return response.json()
        })
        .then( (result) => {
            const { access_token } = result 
            localStorage.setItem("GuessMTG@token", access_token)
            return result
        })

}


export function createUser(payload) {

    const url = `${baseUrl}/users`
    const config = { 
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }

    return fetch(url, config)
        .then( (response) => {
            return response.json()
        })
        .then( (result) => {
            return result
        })


}

export function getChallenge() {

    return fetch(`${baseUrl}/challenge`, { headers: getHeaders() })
    .then( (response) => {
        return response.json()
    })
    .then( (results) => {
        for (let result of results) {
            if (challengeIsAvailable(result._id)) {
                const placeholder = getPlaceholderFromInfo(result.info)                    
                saveChallengeLocalStorage(result)                                       
                return [ result, placeholder ]
            }
        }
    })
}


export function postGuess(currentGuess) {

    const challenge_id = localStorage.getItem('GuessMTG@challengeId') 
    const url = `${baseUrl}/guess/${challenge_id}`
    const config = { 
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            ...getHeaders()
        },
        body: JSON.stringify({ 'string': currentGuess.join('')})
    }

    return fetch(url, config)
        .then( (response) => {
            return response.json()
        })
        .then( (result) => {
            if (result.success) {
                saveSuccessToLocalStorage(result)
                return {
                    success: true,
                    wrongLetters: [],
                    card: result.card
                }
            } else {
                const wrongLetters = getWrongLetters(result)
                const guesses = getGuesses(result)
                return {
                    success: false,
                    wrongLetters: wrongLetters,
                    guesses: guesses
                }
            }
        })

}

export function getMe() {

    const url = `${baseUrl}/users/me`
    const config = { 
        method: "POST",
        headers: getHeaders(),
        body: data
    }

    return fetch(url, config)
        .then( (response) => {
            return response.json()
        })
        .then( (result) => {
            const { access_token } = result 
            localStorage.setItem("GuessMTG@token", access_token)
            return result
        })
}
