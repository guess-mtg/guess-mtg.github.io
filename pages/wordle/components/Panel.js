import { useContext, useEffect, useRef, useState } from "react"
import GuessContext from '../context'
import { getChallenge } from "../../../src/services/api"

const Panel = () => {

    const guessesEndRef = useRef(null)

    const { 
        placeholder, 
        updatePlaceholder, 
        currentGuess, 
        guesses 
    } = useContext(GuessContext)

    const [ challenge, updateChallenge ] = useState({})
    const [ finished, toggleFinished ] = useState(false)

    useEffect( () => {
        scrollToBottom()
        getChallenge()
            .then( ([ result, placeholder ]) => {
                updateChallenge(result)
                updatePlaceholder(placeholder)
                scrollToBottom()
                if (!placeholder) toggleFinished(true)
            })
    }, [ guesses ] )

    const scrollToBottom = () => {
        guessesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    console.log(guesses)

    return (
        <div className="panel-container">
            <h5 className='text-light card-indicator'> Card {challenge.order} of 3</h5>
            <p className='text-light card-hint'> Hint: {challenge.hint }</p>
            
            <div className="panel">
                { 
                    guesses.map( ({ guess, stats }, i) => {
                        return <div className="guess-container" key={i}>
                            { guess.split('').map( (char, index) => {
                                if (char === ' ') return <div className='blank-space' key={index}/>
                                return <div className="letter-space" score={stats[index]} key={index}>
                                    { index === 0 || !placeholder[index - 1] ? <span key={index} className='word-start' >&#x2022;</span> : null}
                                    { char }
                                </div>
                            })}
                        </div>
                    })
                }

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