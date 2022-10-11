import React from 'react'

const defaultContext = {
    placeholder: [],
    updatePlaceholder: () => {},
    currentGuess: [],
    updateCurrentGuess: () => {},
    guesses: [],
    updateGuesses: () => {}
  }
  
export default React.createContext(defaultContext)