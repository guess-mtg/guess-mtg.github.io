import GuessContext from '../context'

const letters = 'abcefghijklmnopqrstuvwxyz'.split('')

const Keyboard = () => {

    return <GuessContext.Consumer>
        {({ currentGuess, updateCurrentGuess }) => (        
            <div className='keyboard'>
                <button 
                    className='keyboard_key del_key'
                    onClick={ () => updateCurrentGuess(currentGuess.slice(0,currentGuess.length - 1)) }
                >
                    &#8592;
                </button>
                {
                    letters.map( (letter) => {
                        return (
                            <button 
                                className='keyboard_key' 
                                key={letter} 
                                onClick={ () => updateCurrentGuess(currentGuess.concat([letter])) }
                            >
                                { letter }
                            </button>
                        )
                    })
                }
                <button 
                    className='keyboard_key enter_key'
                    onClick={ () => updateCurrentGuess(currentGuess.slice(0,currentGuess.length)) }
                >
                    &#x2713;
                </button>
            </div>
        )}
    </GuessContext.Consumer>
}

export default Keyboard