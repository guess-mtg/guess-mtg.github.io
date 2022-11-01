import { useContext, useEffect } from "react"
import GuessContext from '../context'

const Panel = () => {

    const { placeholder, updatePlaceholder, currentGuess } = useContext(GuessContext)

    useEffect( () => {
        fetch('http://localhost:3002/wordle-challenge')
            .then( (response) => {
                return response.json()
            })
            .then( (result) => {
                let str = ''
                for (const count in result.info) {
                    str += '_ '.repeat(result.info[count])
                    str += ' '
                }
                updatePlaceholder(str.slice(0,str.length-2).split(' '))
            })
    }, [ updatePlaceholder ] )

    return (
        <div className="panel">
            <GuessContext.Consumer>
                { ({ guesses }) => (
                    guesses.map( ({ guess, stats }, i) => {
                        return <div className="guess-container" key={i}>
                            { guess.split('').map( (char, index) => {
                                if (char === ' ') return <div className='blank-space'/>
                                return <div className="letter-space" score={stats[index]}>
                                    { index === 0 || !placeholder[index - 1] ? <span className='word-start' >&#x2022;</span> : null}
                                    { char }
                                </div>
                            })}
                        </div>
                    })
                )}
            </GuessContext.Consumer>

            <div className="guess-container">
            { placeholder.map( (space, index) => {
                if (!space) return <div className='blank-space' key={index}/>
                return <div className="letter-space" key={index}>
                    { index === 0 || !placeholder[index - 1] ? <span className='word-start' >&#x2022;</span> : null}
                    { currentGuess.length > (index) ? currentGuess[index] : '' }
                </div>
            })}
            </div>
        </div>
    )

}


export default Panel