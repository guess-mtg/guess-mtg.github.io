import logo from './assets/logo.jpg';
import './App.css';
import Keyboard from './components/Keyboard'
import Panel from './components/Panel'
import GuessContext from './context'
import { useState } from 'react';


function App() {

  const [ placeholder, updatePlaceholder ] = useState([])
  const [ currentGuess, updateCurrentGuess ] = useState([])
  const [ guesses, updateGuesses ] = useState([])
  const [ wrongLetters, updateWrongLetters ] = useState([])

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

  console.log(wrongLetters)

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
        updateWrongLetters: addWrongLetter
      }}
    >
      <div className="App">
        <img src={logo} alt='GuessMTG logo'/> 
        <Panel />
        <Keyboard />
      </div>
    </GuessContext.Provider>
  );
}

export default App;
