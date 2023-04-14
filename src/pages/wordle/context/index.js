import React from 'react'

const defaultContext = {
    placeholder: [],
    updatePlaceholder: () => {},
    currentGuess: [],
    updateCurrentGuess: () => {},
    guesses: [],
    updateGuesses: () => {},
    wrongLetters: [],
    updateWrongLetters: () => {},
    result: {},
    updateResult: () => {}
  }
  
export default React.createContext(defaultContext)

