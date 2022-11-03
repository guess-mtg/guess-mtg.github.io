import { useContext, useEffect, useRef } from "react"
import GuessContext from '../context'

const Panel = () => {

    const guessesEndRef = useRef(null)

    const { placeholder, updatePlaceholder, currentGuess, guesses } = useContext(GuessContext)

    useEffect( () => {
        scrollToBottom()
        fetch('https://guess-mtg-svc.herokuapp.com/wordle-challenge')
            .then( (response) => {
                return response.json()
            })
            .then( (result) => {
                let str = ''
                for (const count in result.info) {
                    str += '_ '.repeat(result.info[count])
                    str += ' '
                }

                if (typeof window != 'undefined') {
                    if (localStorage.getItem('GuessMTG@date') != result.date) {
                        localStorage.removeItem('GuessMTG@guesses')
                    }
                }
                localStorage.setItem('GuessMTG@date', result.date)
                updatePlaceholder(str.slice(0,str.length-2).split(' '))
                scrollToBottom()
            })
    }, [ guesses ] )

    const scrollToBottom = () => {
        guessesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="panel">
            {/* <GuessContext.Consumer>
                { ({ guesses }) => ( */}
                   { guesses.map( ({ guess, stats }, i) => {
                        return <div className="guess-container" key={i}>
                            { guess.split('').map( (char, index) => {
                                if (char === ' ') return <div className='blank-space' key={index}/>
                                return <div className="letter-space" score={stats[index]} key={index}>
                                    { index === 0 || !placeholder[index - 1] ? <span key={index} className='word-start' >&#x2022;</span> : null}
                                    { char }
                                </div>
                            })}
                        </div>
                    })}
                {/* )}
            </GuessContext.Consumer> */}

            <div className="guess-container">
            { placeholder.map( (space, index) => {
                if (!space) return <div className='blank-space' key={index}/>
                return <div className="letter-space" key={index}>
                    { index === 0 || !placeholder[index - 1] ? <span className='word-start' >&#x2022;</span> : null}
                    { currentGuess.length > (index) ? currentGuess[index] : '' }
                </div>
            })}
            </div>
            <div ref={guessesEndRef}/>
        </div>
    )

}


export default Panel