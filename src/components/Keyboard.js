import { useContext, useEffect, useState } from 'react'
import GuessContext from '../context'
import { IoBackspaceOutline, IoSend } from 'react-icons/io5'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'

const letters_1 = 'QWERTYUIOP'.split('')
const letters_2 = 'ASDFGHJKL'.split('')
const letters_3 = 'ZXCVBNM'.split('')

const all_letter = letters_1.concat(letters_2).concat(letters_3)

const Keyboard = () => {

    const { 
        currentGuess, 
        placeholder,
        updateGuesses, 
        guesses, 
        updateCurrentGuess,
        updateWrongLetters,
        updateResult
    } = useContext(GuessContext)

    const [ modalIsOpen, toggleModal] = useState(false)

    useEffect( () => {
        const handleKeyPress = (e) => {
            const letter = e.key.toUpperCase()
            if (all_letter.includes(letter)) {
                updateCurrentGuess(letter)
            }
            else if (letter == 'ENTER') {
                if (currentGuess.length > 0) submitGuess()
            }
            else if (letter == 'BACKSPACE') {
                updateCurrentGuess()
            }
        }

        if (typeof window != 'undefined') {
            window.addEventListener('keydown', handleKeyPress)
            if (localStorage.getItem('GuessMTG@guesses')) {
                updateGuesses(JSON.parse(localStorage.getItem('GuessMTG@guesses')))
            }
        }
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [ currentGuess ] )

    const submitGuess = () => {
        const challenge_id = localStorage.getItem('GuessMTG@challengeId') 

        fetch(`https://guess-mtg-svc.herokuapp.com/guess/${challenge_id}`, 
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
            if (result.success) {
                const guessed = localStorage.getItem('GuessMTG@guessed') ? JSON.parse(localStorage.getItem('GuessMTG@guessed')) : []
                guessed.push(result['_id'])
                localStorage.setItem('GuessMTG@guessed', JSON.stringify(guessed))
                localStorage.removeItem('GuessMTG@guesses')
                updateGuesses([])
                toggleModal(true, updateResult(result.card))
            } else {
                let wl = []
                for (const key in result.stats) {
                    if (result.stats[key] < 0) wl.push(result.guess[key])
                }
                updateWrongLetters(wl)
                updateGuesses(guesses.concat(result))
                localStorage.setItem('GuessMTG@guesses', JSON.stringify(guesses.concat(result)))
            }
            updateCurrentGuess([], true)
        })
    }

    const renderKey = (letter, wrongLetters) => {

        const disabled = wrongLetters.includes(letter)

        return (
            <Button 
                variant='light'
                className='keyboard_key' 
                key={letter} 
                disabled={disabled}
                onClick={ () => disabled || currentGuess.length == placeholder.lenght ? null : updateCurrentGuess(letter) }
            >
                { letter }
            </Button>
        )
    }
    
    return <GuessContext.Consumer>
        {({ updateCurrentGuess, wrongLetters, card, guesses }) => {
                if (guesses.length == 10) {
                    return (
                        <div className='keyboard d-flex align-items-center justify-content-center'>
                            <p> You haved used all your 10 chances.<br/>Come back tomorrow for more! </p>
                        </div>
                    )
                } else {
                    return (
                        <div className='keyboard'>
                            <div className="d-flex justify-content-center">
                            {
                                letters_1.map( (letter, index) => {
                                    return (
                                        renderKey(letter, wrongLetters)
                                    )
                                })
                            }
                            </div>
                            <div className="d-flex justify-content-center">
                            {
                                letters_2.map( (letter, index) => {
                                    return (
                                        renderKey(letter, wrongLetters)
                                    )
                                })
                            }
                            </div>
                            <div className="d-flex justify-content-center">
                                <Button 
                                    className='keyboard_key del_key'
                                    variant='light'
                                    onClick={ () => updateCurrentGuess() }
                                >
                                    <IoBackspaceOutline size={30}/>
                                </Button>
                                {
                                    letters_3.map( (letter, index) => {
                                        return (
                                            renderKey(letter, wrongLetters)
                                        )
                                    })
                                }                       
                                <Button 
                                    className='keyboard_key enter_key'
                                    variant='light'
                                    onClick={ () => submitGuess() }
                                >
                                    <IoSend size={20}/>
                                </Button>
                            </div>
                            
                            <Modal show={modalIsOpen} onHide={() => toggleModal(false)} className='result-modal'>
                                <Modal.Header closeButton>
                                <Modal.Title>Well done!</Modal.Title>
                                </Modal.Header>
                                <Image src={card?.image_links?.large} width={320} className="card"/>
                            </Modal>
                        </div>
                    )
                }            
        }}
    </GuessContext.Consumer>
}

export default Keyboard