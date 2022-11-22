import { useContext, useEffect, useRef, useState } from "react"
import GuessContext from '../context'

const Panel = () => {

    const guessesEndRef = useRef(null)

    const { placeholder, updatePlaceholder, currentGuess, guesses } = useContext(GuessContext)

    const [ challengeOrder, updateOrder ] = useState(1)

    const [ finished, toggleFinished ] = useState(false)

    useEffect( () => {
        scrollToBottom()
        fetch('https://guess-mtg-svc.herokuapp.com/wordle-challenge')
            .then( (response) => {
                return response.json()
            })
            .then( (results) => {

                for (let result of results) {

                    let guessed = localStorage.getItem('GuessMTG@guessed')

                    if (guessed) {
                        guessed = JSON.parse(guessed)
                        if (guessed.indexOf(result['_id']) != -1) {
                            continue
                        }
                    }                        
                    let _string = ''

                    Object.values(result.info).forEach( (count) => {
                        _string += '_ '.repeat(count)
                        _string += ' '
                    })

                    if (typeof window != 'undefined') {
                        if (localStorage.getItem('GuessMTG@date') != result.date) {
                            localStorage.removeItem('GuessMTG@guesses')
                        }
                    }
                    localStorage.setItem('GuessMTG@date', result.date)
                    localStorage.setItem('GuessMTG@challengeId', result._id)
                    const placeholder = _string.slice(0,_string.length-2).split(' ')

                    updateOrder(result.order)
                    updatePlaceholder(placeholder)
                    scrollToBottom()
                    return true
                }
                toggleFinished(true)
            })
    }, [ guesses ] )

    const scrollToBottom = () => {
        guessesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="panel">
            <h5 className='text-light'> Card {challengeOrder} of 3</h5>
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
            { !finished && placeholder.map( (space, index) => {
                if (!space) return <div className='blank-space' key={index}/>
                return <div className="letter-space" key={index}>
                    { index === 0 || !placeholder[index - 1] ? <span className='word-start' >&#x2022;</span> : null}
                    { currentGuess.length > (index) ? currentGuess[index] : '' }
                </div>
            })}
            { finished && 
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    You answered all of today's challenges. Comeback tomorrow for more!
                </div>
            }
            </div>
            <div ref={guessesEndRef}/>
            
        </div>
    )

}


export default Panel