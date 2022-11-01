import { useContext, useState } from 'react'
import GuessContext from '../context'
import { IoBackspaceOutline, IoSend } from 'react-icons/io5'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'

const letters_1 = 'QWERTYUIOP'.split('')
const letters_2 = 'ASDFGHJKL'.split('')
const letters_3 = 'ZXCVBNM'.split('')

const Keyboard = () => {

    const { 
        currentGuess, 
        updateGuesses, 
        guesses, 
        updateCurrentGuess,
        updateWrongLetters,
        updateResult
    } = useContext(GuessContext)

    const [ modalIsOpen, toggleModal] = useState(false)

    const submitGuess = () => {
        fetch('https://guess-mtg-svc.herokuapp.com/guess', 
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
            console.log(result)
            if (result.success) toggleModal(true, updateResult(result.card))

            let wl = []
            for (const key in result.stats) {
                if (result.stats[key] < 0) wl.push(result.guess[key])
            }
            updateWrongLetters(wl)
            updateGuesses(guesses.concat(result))
            updateCurrentGuess([], true)
        })
    }

    const renderKey = (letter, disabled = false) => {

        return (
            <Button 
                variant='light'
                className='keyboard_key' 
                key={letter} 
                disabled={ disabled }
                onClick={ () => updateCurrentGuess(letter) }
            >
                { letter }
            </Button>
        )
    }

    return <GuessContext.Consumer>
        {({ updateCurrentGuess, wrongLetters, card }) => (        
            <div className='keyboard'>
                <div className="d-flex justify-content-center">
                {
                    letters_1.map( (letter, index) => {
                        return (
                            renderKey(letter, wrongLetters.includes(letter))
                        )
                    })
                }
                </div>
                <div className="d-flex justify-content-center">
                {
                    letters_2.map( (letter, index) => {
                        return (
                            renderKey(letter, wrongLetters.includes(letter))
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
                                renderKey(letter, wrongLetters.includes(letter))
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
                
                <Modal show={modalIsOpen} onHide={() => toggleModal(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Well done!</Modal.Title>
                    </Modal.Header>
                    <Image src={card?.image_links?.large} width={320} className="card"/>
                </Modal>
            </div>
        )}
    </GuessContext.Consumer>
}

export default Keyboard