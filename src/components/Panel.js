import { useContext, useEffect, useRef, useState } from "react"
import GuessContext from '../context'

const Panel = () => {

    const guessesEndRef = useRef(null)

    const { placeholder, updatePlaceholder, currentGuess, guesses } = useContext(GuessContext)

    const [ challenge, updateChallenge ] = useState({})

    const [ finished, toggleFinished ] = useState(false)

    useEffect( () => {
        scrollToBottom()
        fetch('https://w9byt1.deta.dev/wordle-challenge')
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

                    let string = ''

                    Object.values(result.info).forEach( (count) => {
                        let tmp = '_ '.repeat(count)
                        tmp += ' '
                        string += tmp
                    })
                    

                    if (typeof window != 'undefined') {
                        if (localStorage.getItem('GuessMTG@date') != result.date) {
                            localStorage.removeItem('GuessMTG@guesses')
                        }
                    }
                    localStorage.setItem('GuessMTG@date', result.date)
                    localStorage.setItem('GuessMTG@challengeId', result._id)
                    const placeholder = string.slice(0,string.length-2).split(' ')

                    console.log('Result', result)

                    updateChallenge(result)
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
        <div className="panel-container">
            <h5 className='text-light'> Card {challenge.order} of 3</h5>
            <p className='text-light'> Hint: {challenge.hint }</p>
            
            <div className="panel">
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
            
        </div>
    )

}


export default Panel