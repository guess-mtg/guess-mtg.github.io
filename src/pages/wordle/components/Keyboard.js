import { useContext, useEffect, useState } from 'react'
import GuessContext from '../context'
import { IoBackspaceOutline, IoSend } from 'react-icons/io5'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import { postGuess } from '../../../src/services/api';

const letters_1 = 'QWERTYUIOP'.split('')
const letters_2 = 'ASDFGHJKL'.split('')
const letters_3 = 'ZXCVBNM'.split('')

const all_letter = letters_1.concat(letters_2).concat(letters_3)

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000/"

const Keyboard = () => {

    const { 
        currentGuess, 
        placeholder,
        updateGuesses, 
        guesses, 
        updateCurrentGuess,
        wrongLetters,
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
        postGuess(currentGuess)
            .then( (result) => {
                if (result.success) {
                    toggleModal(true)
                    updateResult(result.card)
                    updateWrongLetters([])
                    updateGuesses([])
                } else {
                    updateWrongLetters(wrongLetters.concat(result.wrongLetters))
                    updateGuesses(result.guesses)
                }
                updateCurrentGuess([], true)
            })
    }

    const renderKey = (letter, disabled = false) => {

        return (
            <Button 
                variant='light'
                className='keyboard_key' 
                disabled={disabled}
                onClick={ () => disabled || currentGuess.length == placeholder.lenght ? null : updateCurrentGuess(letter) }
            >
                { letter }
            </Button>
        )
    }

    
    return <GuessContext.Consumer>
        {({ updateCurrentGuess, card, guesses }) => {
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
                                letters_1.map( (letter) => {
                                    return (
                                        <div key={letter}>
                                            { renderKey(letter, wrongLetters.includes(letter)) }
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <div className="d-flex justify-content-center">
                            {
                                letters_2.map( (letter) => {
                                    return (
                                        <div key={letter}>
                                            { renderKey(letter, wrongLetters.includes(letter)) }
                                        </div>
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
                                    letters_3.map( (letter) => {
                                        return (
                                            <div key={letter}>
                                                { renderKey(letter, wrongLetters.includes(letter)) }
                                            </div>
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