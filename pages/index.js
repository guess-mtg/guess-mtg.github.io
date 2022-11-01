import 'bootstrap/dist/css/bootstrap.min.css';
import Keyboard from '../src/components/Keyboard'
import Panel from '../src/components/Panel'
import GuessContext from '../src/context'
import { useEffect, useState } from 'react';
import { IoInformationCircleOutline, IoLogoInstagram, IoMenu } from 'react-icons/io5';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Image from 'next/image'
import Head from 'next/head'


function App() {

  const [ placeholder, updatePlaceholder ] = useState([])
  const [ currentGuess, updateCurrentGuess ] = useState([])
  const [ guesses, updateGuesses ] = useState([])
  const [ wrongLetters, updateWrongLetters ] = useState([])
  const [ card, updateResult ] = useState({})
  const [ isInfoOpen, toggleInfo ] = useState(false)
  const [ height, updateHeight ] = useState('100%')


  useEffect( () => {
    console.log(window)
    if (typeof window != 'undefined') {
      updateHeight(window.innerHeight)
    }
  })

  const addWrongLetter = (letters) => {
    updateWrongLetters(wrongLetters.concat(letters))
  }

  const handleGuessUpdate = (letter, clear = false ) => {

    let newGuess = currentGuess
    
    if (clear) {
      newGuess = []
    }
    else if (letter) {
      if (!placeholder[currentGuess.length]) {
        newGuess = currentGuess.concat(' ')
      }
      newGuess = newGuess.concat(letter)
    }
    else {
      newGuess = currentGuess.slice(0, currentGuess.length - 1)
      if (!placeholder[newGuess.length - 1]) {
        newGuess = newGuess.slice(0, newGuess.length - 1)
      }
    }

    updateCurrentGuess(newGuess)
  }

  return (
    <GuessContext.Provider 
      value={{ 
        placeholder: placeholder, 
        updatePlaceholder: updatePlaceholder,
        currentGuess: currentGuess, 
        updateCurrentGuess: handleGuessUpdate,
        guesses: guesses,
        updateGuesses: updateGuesses,
        wrongLetters: wrongLetters,
        updateWrongLetters: addWrongLetter,
        card: card,
        updateResult: updateResult
      }}
    >
      <div className="App" style={{ 'height': height}}>
        <Head>
          <title>GuessMTG</title>
          <meta name="description" content="Guess the name of the 'Magic, The Gathering' card of the day!" />
          <meta property="og:title" content="GuessMTG - Wordle" />
          <meta property="og:image" content="https://instagram.fldb1-1.fna.fbcdn.net/v/t51.2885-19/277247889_1325386221205931_6828213806774211948_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fldb1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=KvhNxiOZAvAAX8U1rtv&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfBWnw4x4QeO66fSobVNZVz0Mb7RUt4sp7xJpOWkAPs6Rw&oe=63666559&_nc_sid=6136e7" />
          <meta property="og:description" content="Guess the name of the 'Magic, The Gathering' card of the day" />
          <meta property="og:url" content="https://guess-mtg-app.herokuapp.com/" />
          <meta property="og:type" content="website" />
        </Head>
        <div className="header w-100 d-flex justify-content-between align-items-center border-bottom mb-3">
          <Button onClick={ () => toggleInfo(!isInfoOpen) } variant='link'>
            <IoInformationCircleOutline color="#eee" size={40} />
          </Button>
          <Image src='/assets/logo.jpg' alt='GuessMTG logo' height={80} width={100}/> 
          <a className="header-link" href="https://instagram.com/guessmtg" target="_blank" rel='noopener'>
            <IoLogoInstagram color="#eee" size={20}/> &nbsp;Follow @GuessMTG
          </a>
        </div>
        <Panel />
        <Keyboard />
        
        <Modal show={isInfoOpen} onHide={() => toggleInfo(false)} size='lg'>
          <Modal.Header closeButton>
          <Modal.Title>GuessMTG - Guess the card!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>For each card you'll have 10 guesses</p>
            <p> The color of the tiles will change to show how close your guess was to the word.</p>
            <p>Examples:</p>
            <div className='d-flex'>
              {
                'TWO WORDS'.split('').map( (letter, index) => {
                  if (index === 0) {
                    return <div key={index} className='letter-space' score='1'>{letter}</div>
                  }
                  if (letter === " ") {
                    return <div  key={index} className='blank-space info'>{letter}</div>
                  }
                  return <div  key={index} className='letter-space'>{letter}</div>
                })
              }
            </div>
            <p>
              The letter <strong>T</strong> is in the word and in the correct spot.
            </p>
            <div className='d-flex'>
              {
                'OTHER WORDS'.split('').map( (letter, index) => {
                  if (index === 9) {
                    return <div key={index} className='letter-space' score='0'>{letter}</div>
                  }
                  if (letter === " ") {
                    return <div key={index} className='blank-space info'>{letter}</div>
                  }
                  return <div key={index} className='letter-space'>{letter}</div>
                })
              }
            </div>
            <p>
              The letter <strong>D</strong> is in the words, but in the correct spot.
            </p>
            <div className='d-flex'>
              {
                'LAST TWO'.split('').map( (letter, index) => {
                  if (index === 2) {
                    return <div key={index} className='letter-space' score='-1'>{letter}</div>
                  }
                  if (letter === " ") {
                    return <div key={index} className='blank-space info'>{letter}</div>
                  }
                  return <div key={index} className='letter-space'>{letter}</div>
                })
              }
            </div>
            <p>
              The letter <strong>S</strong> is not in the words.
            </p>
          </Modal.Body>
        </Modal>

      </div>
    </GuessContext.Provider>
  );
}

export default App;
