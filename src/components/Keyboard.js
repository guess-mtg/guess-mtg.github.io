import { useContext } from 'react'
import GuessContext from '../context'

const letters = 'abcefghijklmnopqrstuvwxyz'.split('')

const Keyboard = () => {

    const { currentGuess, updateGuesses, guesses, updateCurrentGuess } = useContext(GuessContext)

    const submitGuess = () => {
        fetch('http://localhost:8000/guess', 
            { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'string': currentGuess.join('')})
            }
        )
        .then( (response) => {
            return response.json()
        })
        .then( (result) => {
            updateGuesses(guesses.concat(result))
            updateCurrentGuess([], true)
        })
    }

    return <GuessContext.Consumer>
        {({ updateCurrentGuess }) => (        
            <div className='keyboard'>
                <button 
                    className='keyboard_key del_key'
                    onClick={ () => updateCurrentGuess() }
                >
                    &#8592;
                </button>
                {
                    letters.map( (letter) => {
                        return (
                            <button 
                                className='keyboard_key' 
                                key={letter} 
                                onClick={ () => updateCurrentGuess(letter) }
                            >
                                { letter }
                            </button>
                        )
                    })
                }
                <button 
                    className='keyboard_key enter_key'
                    onClick={ () => submitGuess() }
                >
                    &#x2713;
                </button>
            </div>
        )}
    </GuessContext.Consumer>
}

export default Keyboard