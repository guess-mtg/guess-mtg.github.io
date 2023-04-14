import Keyboard from './components/Keyboard'
import Panel from './components/Panel'
import GuessContext from './context'
import { useState } from 'react';

function Wordle() {

  const [ placeholder, updatePlaceholder ] = useState([])
  const [ currentGuess, updateCurrentGuess ] = useState([])
  const [ guesses, updateGuesses ] = useState([])
  const [ wrongLetters, updateWrongLetters ] = useState([])
  const [ card, updateResult ] = useState({})

  const handleGuessUpdate = (letter, clear = false) => {

    let newGuess = currentGuess
    
    if (clear) {
      newGuess = []
    }
    else if (letter) {
      // Don't add letter to guess if it already has the same length as the placeholder
      if (placeholder.length > 0) {
        if (currentGuess.length == placeholder.length) {
          return null 
        }
        else if (!placeholder[currentGuess.length]) {
          newGuess = currentGuess.concat(' ')
        }
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
        updateWrongLetters: updateWrongLetters,
        card: card,
        updateResult: updateResult
      }}
    >
      <article>        
        <Panel />
        <Keyboard />  
      </article>
    </GuessContext.Provider>
  );
}

export default Wordle;
