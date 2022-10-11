import { useContext, useEffect, useState } from "react"
import GuessContext from '../context'

const Panel = () => {

    const { placeholder, updatePlaceholder, currentGuess } = useContext(GuessContext)

    useEffect( () => {
        fetch('http://localhost:8000/wordle-challenge')
            .then( (response) => {
                return response.json()
            })
            .then( (result) => {
                let str = ''
                for (const count in result.info) {
                    str += '_ '.repeat(result.info[count])
                    str += ' '
                }
                console.log(str)
                updatePlaceholder(str.split(' '))
            })
    }, [])

    return (
        <>
            <GuessContext.Consumer>
                { ({ guesses }) => (
                    guesses.map( ({ guess, stats }, i) => {
                        return <div className="guess-container" key={i}>
                            { guess.split('').map( (char, index) => {
                                if (char == ' ') return <div className='blank-space'/>
                                return <div className="letter-space" score={stats[index]}>
                                    { char }
                                </div>
                            })}
                        </div>
                    })
                )}
            </GuessContext.Consumer>

            <div className="guess-container">
            { placeholder.map( (space, index) => {
                if (!space) return <div className='blank-space'/>
                return <div className="letter-space">
                    { currentGuess.length > (index) ? currentGuess[index] : '' }
                </div>
            })}
            </div>
        </>
    )

}


export default Panel